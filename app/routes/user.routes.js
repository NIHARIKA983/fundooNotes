/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Niharika
 */

const controller = require('../controllers/user.controller.js');
const middleware = require('../utilities/helper.js');
const noteController = require('../controllers/notes');
const label = require('../controllers/label');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  // api for forgot pasword
  app.post('/forgotPassword', controller.forgotPassword);
  // api for Reset pasword
  app.put('/reset-Password', middleware.validateToken, controller.resetPassword);

  // notes CRUD api
  app.post('/createnotes', middleware.validateToken, noteController.createNote);
  app.get('/getnotes', middleware.validateToken, noteController.getNote);
  app.get('/getnotes/:id', middleware.validateToken, noteController.getNoteById);
  app.put('/updatenotes/:id', middleware.validateToken, noteController.updateNoteById);
  app.delete('/deletenotes/:id', middleware.validateToken, noteController.deleteNoteById);

  // label CRUD api
  app.post('/createlabel', middleware.validateToken, label.createLabel);
  app.get('/getlabels', middleware.validateToken, label.getLabel);
  app.get('/getlabel/:id', middleware.validateToken, label.getLabelById);
  app.put('/updatelabel/:id', middleware.validateToken, label.updateLabel);
};
