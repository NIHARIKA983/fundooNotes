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

    loginUser = (loginInfo, callback) => {
        userModel.loginUser(loginInfo, (err, data) => {
            if (data) {
                bcrypt.compare(loginInfo.password,data.password,(error,validate) => {
                
                    if (error)
                     {
                        callback('Invalid Password', null);
                    }
                    else
                     {
                        callback(null, data);
                    }                 
                });
            } else {
                callback('Please check your email id and password');
            }
        });
    }
}
module.exports = new userService(); 