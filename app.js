const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");
const swaggerSetup = require("./swagger");
const app = express();

const cors = require('cors');

// Configuration CORS

// mon api heroku doit acepter les domaines localhost et myaddressesbook.com
app.use(cors({
  origin: ["http://localhost:5173/", "https://www.myaddressesbook.com/", "http://127.0.0.1:5500"], // Frontend local + production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
  credentials: true // Si tu utilises des cookies
}));

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use(apiRoutes);

// Configuration de Swagger
swaggerSetup(app);

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
