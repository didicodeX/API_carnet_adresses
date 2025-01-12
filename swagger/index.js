const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

// Charger et fusionner les fichiers JSON
const userSwagger = JSON.parse(fs.readFileSync(path.join(__dirname, "user.swagger.json")));
const contactSwagger = JSON.parse(fs.readFileSync(path.join(__dirname, "contact.swagger.json")));

// Combiner les définitions (ou simplement charger un seul fichier principal)
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "AddressBook API",
    version: "1.0.0",
    description: "API RESTful pour gérer un carnet d'adresses.",
  },
  servers: [
    {
      url: "https://api.myaddressesbook.com",
      description: "Serveur de production",
    },
    {
      url: 'http://localhost:3000',
      description: 'Serveur local',
    }
  ],
  paths: {
    ...userSwagger.paths,
    ...contactSwagger.paths,
  },
};

module.exports = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
