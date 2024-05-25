// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API Documentation',
    version: '1.0.1',
  },
  host: 'localhost:5500',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/appRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
