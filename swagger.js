const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 02',
        description: 'Week 5-8 Personal Project'
    },
    host: 'localhost:4003',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endPointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endPointFile, doc);