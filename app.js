const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./routes");
const app = express();

// middlewares cors
app.use(
  cors({
    origin: "*",
  })
);

// Middlewares
app.use(bodyParser.json()); // Analyse les requêtes JSON

// Routes
app.use("/api", apiRoutes);

// Middleware de base pour gérer les erreurs 404
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Middleware pour gérer les erreurs 500
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
