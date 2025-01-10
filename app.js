const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./routes");
const app = express();

// Configurer CORS
app.use(cors({
  // origin: "http://myaddressesbook.com

  origin: "https://myaddressesbook.com",
  credentials: true,
}));

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api", apiRoutes);

// Importation de Swagger
require("./doc/swagger")(app);

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
