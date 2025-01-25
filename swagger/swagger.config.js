module.exports = {
  openapi: "3.0.0",
  info: {
    title: "AddressBook API",
    version: "1.0.0",
    description: "API RESTful pour gérer un carnet d'adresses.",
  },
  servers: [
    { url: "http://localhost:3000", description: "Serveur local" },
    { url: "https://api.myaddressesbook.com", description: "Serveur de production" }
  ]
};
