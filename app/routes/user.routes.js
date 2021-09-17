const controller = require('../controllers/user.controller.js');

module.exports=(app) =>{
    app.post('/users',controller.register);
} 