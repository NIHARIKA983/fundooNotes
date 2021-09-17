const controller = require('../controllers/user.controller.js');

module.exports=(app) => {
    app.post('/register',controller.register);
    app.post('/login',controller.login)
} 