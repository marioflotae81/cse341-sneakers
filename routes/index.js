const routes = require('express').Router();
const passport = require('passport');
const controllers = require('../controllers/index')
const sneaker = require('./sneakers');
require('../passport');


routes.get('/home', controllers.home);
routes.get('/failed', controllers.failedRoute);
routes.get('/success', controllers.isLoggedIn, controllers.successRoute);
routes.get('/google',
passport.authenticate('google', {
    scope: ['email', 'profile']
})
);

routes.get('/google/callback',
passport.authenticate('google', {
    failureRedirect: '/failed',
}),
controllers.googleCallbackRoute
);

routes.get('/logout', controllers.logoutRoute);

routes.use('/sneakers', controllers.isLoggedIn, sneaker);
routes.get('/', controllers.homeRoute);

module.exports = routes;