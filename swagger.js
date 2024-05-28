const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Note REST API',
  },
  host: 'localhost:3000',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/auth.routes.js', './src/note.routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
