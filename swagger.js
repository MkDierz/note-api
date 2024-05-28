const swaggerAutogen = require('swagger-autogen')();

const doc = {
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//       },
//     },
//   },
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
