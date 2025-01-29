const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

// Charger et fusionner les fichiers JSON
const swagger = JSON.parse(fs.readFileSync(path.join(__dirname, "swagger.json")));

const swaggerDocument = {
  ...swagger,
};

module.exports = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
