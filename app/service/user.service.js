const userModel = require('../models/user.model.js')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const utilities = require('../utilities/helper.js');

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
                const check = bcrypt.compare(loginInfo.password, data.password);
                
                if (check == false) {
                    return callback("invalid Password", null);
                  } else {
                    utilities.token(loginInfo, (error, token) => {
                      if (error) {
                        throw error;
                      } else {
                        return callback(null, token);
                      }
                    });
                }
            } else {
              return callback("Please check your email and password ");
            }
        });
    };
}
module.exports = new userService(); 