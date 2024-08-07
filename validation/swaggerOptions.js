// swaggerOptions.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API documentation for User management'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['*.js'],  // Đường dẫn tới các tệp có JSDoc
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
