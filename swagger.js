const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Note API',
  },
  host: 'localhost:3000/api',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'JWT Token',
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/auth.routes.js', './src/note.routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
