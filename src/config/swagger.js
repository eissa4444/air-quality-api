const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Air Quality API', 
    version: '1.0.0',          
    description: 'API documentation for the Air Quality service',  
  },
  servers: [
    {
      url: 'http://localhost:3000/api',  
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],  
}
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
