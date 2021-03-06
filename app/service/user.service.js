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
const rabit = require('../utilities/rabitmq');
const jwt = require('jsonwebtoken');
// const { validate } = require('../models/user.model.js');
const helper = require('../utilities/helper.js');
const sendLinkMail = require('../utilities/nodeemailer');


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
         // Send Welcome Mail to User on his Mail
        helper.sendWelcomeMail(user);

        const secretkey = process.env.SECRET_KEY_FOR_CONFIRM;
        helper.jwtTokenGenerateforConfirm(data, secretkey, (err, token) =>{
          if(token){
            console.log("service forget id and token : ",data.id," ",token);
            // Send mail
            rabit.sender(data,data.email);
            sendLinkMail.sendConfirmMail(token,data);
            return callback(null, token);
          }
          else {
            return callback(err, null);
          }
        });

        return callback(null, data);
      }
    });
  };

  confirmRegister = (data, callback) => {
    console.log("con 44: ",data.token)
    const decode = jwt.verify(data.token, process.env.SECRET_KEY_FOR_CONFIRM);
    if(decode){
      console.log("con :: 47: ",decode.email);

      rabit.receiver(decode.email).then((val)=>{

        console.log("rabit serv: ",val);
        userModel.confirmRegister(JSON.parse(val), (error, data) => {
          if (data) {
            return callback(null, data);
          } else {
            return callback(error, null);
          }
        })
        }).catch(()=>{console.log('failed');})

      // rabit.receiver(decode.email).then((rdata)=>{


      // }).catch(()=>{console.log("error");})
    }
  }

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

   /**
   * @description it acts as a middleware between controller and model for socail login using google
   * @param {*} googleInfo shoul have user info from google
   * @returns token with help of jwt
   */
   socialLogin (googleInfo) {
     return new Promise((resolve, reject) => {
       userModel.socialLogin(googleInfo).then((data) => {
         const token = utilities.token(data);
         resolve(token);
       }).catch((err) => {
         reject(err);
       });
     });
   };
}
module.exports = new UserService();
