const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AddressBook API',
      version: '1.0.0',
      description: 'API pour gérer un carnet d\'adresses.',
    },
    servers: [
      {
        url: 'https://myaddressesbook.com/api', // Remplace par ton URL
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000/api', // Remplace par ton URL
        description: 'Development server',
      }
    ],
  },
  apis: ['./routes/*.js'], // Indique où Swagger doit chercher les définitions d’endpoint
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger disponible sur http://localhost:3000/api-docs');
};
