module.exports=(app) =>{
    const controller = require('../controllers/user.controller.js');

    app.post('/users',controller.register);
} 