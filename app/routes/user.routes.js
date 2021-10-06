/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Niharika
 */

const controller = require('../controllers/user.controller.js');
const utilities = require('../utilities/helper.js');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  // api for forgot pasword
  app.post('/forgotPassword', controller.forgotPassword);
  // api for Reset pasword
  app.put('/reset-Password', utilities.validateToken, controller.resetPassword);
};
