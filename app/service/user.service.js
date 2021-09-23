/**
 * @module       Service
 * @file         user.service.js
 * @description  Service class holds the callback method for controller 
 * @author       Niharika
 */

const userModel = require('../models/user.model.js')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const utilities = require('../utilities/helper.js');

class userService {
  /**
     * @description Create and save user then send response to controller
     * @method registerUser to save the user
     * @param callback callback for controller
     */
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
               return callback(err, null);
            } else {
               return callback(null, data);
            }
        });
    }; 

    /**
     * @description sends the data to loginApi in the controller
     * @method loginUser
     * @param callback callback for controller
     */

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