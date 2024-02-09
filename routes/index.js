const routes = require('express').Router();
const controllers = require('../controllers/index')
const sneaker = require('./sneakers');

routes.use('/sneakers', sneaker);
routes.get('/', controllers.homeRoute);


module.exports = routes;