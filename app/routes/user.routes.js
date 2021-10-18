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
const redis = require('../middleware/redis');

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
  app.get('/getnotes', middleware.validateToken, redis.redis_port, noteController.getNote);
  app.get('/getnotes/:id', middleware.validateToken, redis.redis_NOteById, noteController.getNoteById);
  app.put('/updatenotes/:id', middleware.validateToken, noteController.updateNoteById);
  app.delete('/deletenotes/:id', middleware.validateToken, noteController.deleteNoteById);

  // label CRUD api
  app.post('/createlabel', middleware.validateToken, label.createLabel);
  app.get('/getlabels', middleware.validateToken, redis.redis_Label, label.getLabel);
  app.get('/getlabel/:id', middleware.validateToken, label.getLabelById);
  app.put('/updatelabel/:id', middleware.validateToken, label.updateLabel);
  app.delete('/deletelabel/:id', middleware.validateToken, label.deleteLabelById);

  // label to note api
  app.post('/addlabel/:id', middleware.validateToken, noteController.addLabelById);
  app.post('/deleteLabelFromNote/:id', middleware.validateToken, noteController.deleteLabel);
};
