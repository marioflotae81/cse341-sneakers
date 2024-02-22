const express = require('express');
const cors = require('cors');
const app = express();
const { connectToMongoDB } = require('./db/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require('express-session');
const passport = require('passport');
require('./passport');
require('dotenv').config();

const port = process.env.PORT || 4003;

app
    .use(cors())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use('/', require('./routes'))

connectToMongoDB()
    .then(() => {
        
        app.listen(port, () => {
            console.log('Listening on port: ' + (process.env.PORT || port));
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB', error);
    });

