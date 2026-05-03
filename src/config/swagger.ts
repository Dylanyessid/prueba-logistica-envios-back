import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Prueba Logistica Envios API",
    version: "1.0.0",
    description: "Documentacion base de la API para la prueba tecnica de logistica y envios.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/dto/request/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
