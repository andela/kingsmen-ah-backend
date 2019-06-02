import swaggerJSDoc from 'swagger-jsdoc';

// Swagger Definitions
const swaggerDefinition = {
  info: {
    title: 'Author\'s Haven',
    version: '1.0.0',
    description: 'A Social platform for the creative at heart',
  },
  host: 'https://kingsmen-ah-backend-staging.herokuapp.com/',
  basePath: 'api/api-docs'
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['swagger.yaml']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
