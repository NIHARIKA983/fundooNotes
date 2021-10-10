/* eslint-disable node/handle-callback-err */
/* eslint-disable node/no-callback-literal */
/**
 * @module       Service
 * @file         user.service.js
 * @description  Service class holds the callback method for controller
 * @author       Niharika
 */
const userModel = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const utilities = require('../utilities/helper.js');
const { logger } = require('../../logger/logger');
const nodemailer = require('../Utilities/nodeemailer.js');
// const { validate } = require('../models/user.model.js');
// const helper = require('../utilities/helper.js');

class UserService {
  /**
     * @description Create and save user then send response to controller
     * @method registerUser to save the user
     * @param callback callback for controller
     */
    registerUser = (user, callback) => {
      userModel.registerUser(user, (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    };

    /**
     * @description sends the data to loginApi in the controller
     * @method userLogin
     * @param callback callback for controller
     */

     userLogin = (InfoLogin, callback) => {
       userModel.loginModel(InfoLogin, (error, data) => {
         if (data) {
           bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
             if (!validate) {
               logger.error(error);
               return callback(error + 'Invalid Password', null);
             } else {
               logger.info(' token generated ');
               const token = utilities.token(data);
               return callback(null, token);
             }
           });
         } else {
           logger.error(error);
           return callback(error);
         }
       });
     }

  forgotPassword = (email, callback) => {
    userModel.forgotPassword(email, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, nodemailer.sendEmail(data));
      }
    });
  }

  /**
     * @description it acts as a middleware between controller and model for reset password
     * @param {*} inputData
     * @param {*} callback
     * @returns
     */
   resetPassword = (inputData, callback) => {
     userModel.resetPassword(inputData, (error, data) => {
       if (error) {
         logger.error('password not update in model');
         return callback(error, null);
       } else {
         logger.info('getting upadated password in data');
         return callback(null, data);
       }
     });
   }
}
module.exports = new UserService();
