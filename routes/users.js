const routes = require('express').Router();
const controllers = require('../controllers/index');

// Get All
routes.get('/', controllers.getAllUsers);

// Get Single Doc
routes.get('/:id', controllers.getOneUser);

// Post doc
routes.post('/', controllers.postUser);

// Update doc
routes.put('/:id', controllers.updateOneUser);

// Delete ONE doc
routes.delete('/:id', controllers.deleteOneUser);


module.exports = routes;