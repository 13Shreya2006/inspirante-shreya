const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/events", (req, res) => {
  const sql = `
    SELECT 
      e.id,
      e.event_name,
      e.event_date,
      e.venue,
      e.capacity,
      COUNT(r.id) AS registered_count
    FROM events e
    LEFT JOIN registrations r ON e.id = r.event_id
    GROUP BY e.id, e.event_name, e.event_date, e.venue, e.capacity
    ORDER BY e.event_date ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch events" });
    }

    res.json(results);
  });
});

router.post("/events", (req, res) => {
  const { event_name, event_date, venue, capacity } = req.body;

  if (!event_name || !event_date || !venue || !capacity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO events (event_name, event_date, venue, capacity)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [event_name, event_date, venue, capacity], (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create event" });
    }

    res.status(201).json({ message: "Event created successfully" });
  });
});

router.delete("/events/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM events WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete event" });
    }

    res.json({ message: "Event deleted successfully" });
  });
});
router.get("/events/:id/registrations", (req, res) => {
  const eventId = req.params.id;

  const sql = `
    SELECT 
      u.name,
      u.username
    FROM registrations r
    JOIN users u ON r.student_id = u.id
    WHERE r.event_id = ?
  `;

  db.query(sql, [eventId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch registrations" });
    }

    res.json(results);
  });
});
module.exports = router;