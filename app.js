const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");
const app = express();

const cors = require('cors');

// Configuration CORS
const allowedOrigins = ['https://myaddressesbook.com', 'https://www.myaddressesbook.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Si tu utilises des cookies ou des tokens
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
