const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 02',
        description: 'Week 5-8 Personal Project'
    },
    host: 'cse341-sneakers.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endPointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endPointFile, doc);