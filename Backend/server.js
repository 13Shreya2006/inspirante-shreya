const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

require("./db");

const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", eventRoutes);
app.use("/api", authRoutes);
app.use("/api", registrationRoutes);

app.get("/", (req, res) => {
    res.send("Backend Working");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});