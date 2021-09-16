const userModel = require('../models/user.model.js')
const bcrypt = require('bcryptjs');

class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
               return callback(err, null);
            } else {
               return callback(null, data);
            }
        });
    }; 
}
module.exports = new userService(); 