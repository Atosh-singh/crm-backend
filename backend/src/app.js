const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS allow frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use(express.json());

const routes = require("./routes");
app.use("/api/v1", routes);

app.get("/", (req, res) => res.send("Server Running ✅"));

module.exports = app;
