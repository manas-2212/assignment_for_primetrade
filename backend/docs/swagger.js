const swaggerUi = require("swagger-ui-express");

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "API",
    version: "1.0.0",
  },
};

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};