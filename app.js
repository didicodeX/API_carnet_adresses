const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");
const swaggerSetup = require("./swagger/");
const app = express();

const cors = require('cors');

// Configuration CORS

// mon api heroku doit acepter les domaines localhost et myaddressesbook.com
app.use(cors({
  origin: "*", // Frontend local + production
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

module.exports = app;
