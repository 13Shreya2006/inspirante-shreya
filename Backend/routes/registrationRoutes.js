const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/register", (req, res) => {
  const { student_id, event_id } = req.body;

  if (!student_id || !event_id) {
    return res.status(400).json({ message: "Student ID and Event ID are required" });
  }

  const capacitySql = `
    SELECT 
      e.capacity,
      COUNT(r.id) AS registered_count
    FROM events e
    LEFT JOIN registrations r ON e.id = r.event_id
    WHERE e.id = ?
    GROUP BY e.id
  `;

  db.query(capacitySql, [event_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to check event capacity" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const event = results[0];

    if (event.registered_count >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    const insertSql = `
      INSERT INTO registrations (student_id, event_id)
      VALUES (?, ?)
    `;

    db.query(insertSql, [student_id, event_id], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "You are already registered for this event" });
        }

        return res.status(500).json({ message: "Failed to register for event" });
      }

      res.status(201).json({ message: "Registered successfully" });
    });
  });
});
router.get("/my-registrations/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  const sql = `
    SELECT 
      e.event_name,
      e.event_date,
      e.venue
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    WHERE r.student_id = ?
    ORDER BY e.event_date ASC
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch registrations" });
    }

    res.json(results);
  });
});
module.exports = router;