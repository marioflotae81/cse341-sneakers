const routes = require('express').Router();
const controllers = require('../controllers/index');

// Get All
routes.get('/', controllers.getAllRoute);

// Get Single Doc
routes.get('/:id', controllers.getOneRoute);

// Post doc
routes.post('/', controllers.postRoute);

// Update doc
routes.put('/:id', controllers.updateRoute);

// Delete ONE doc
routes.delete('/:id', controllers.deleteOneRoute);

// Delete All docs
routes.delete('/', controllers.deleteAllRoute)

module.exports = routes;