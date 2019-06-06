import swaggerJsdoc from 'swagger-jsdoc';
import { config } from 'dotenv';

// Initialize dotenv
config();

// define host url
const host = process.env.HOST_NAME || 'localhost:3000';

// Swagger Definitions
const swaggerDefinition = {
  info: {
    title: 'Author\'s Haven',
    version: '1.0.0',
    description: 'A Social platform for the creative at heart',
  },
  host,
  basePath: '/api'
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['swagger.yaml']
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
