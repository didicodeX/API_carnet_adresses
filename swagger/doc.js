const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./index");

module.exports = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
