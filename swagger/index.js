const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

// Charger et fusionner les fichiers JSON
const swagger = JSON.parse(fs.readFileSync(path.join(__dirname, "swagger.json")));
// const userSwagger = JSON.parse(fs.readFileSync(path.join(__dirname, "user.swagger.json")));
// const contactSwagger = JSON.parse(fs.readFileSync(path.join(__dirname, "contact.swagger.json")));

// Combiner les définitions (ou simplement charger un seul fichier principal)
const swaggerDocument = {
  ...swagger,
  // ...userSwagger,
  // ...contactSwagger
};

module.exports = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
