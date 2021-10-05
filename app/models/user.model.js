/* eslint-disable node/no-callback-literal */
/**
 * @module       Models
 * @file         User.model.js
 * @description Taking the request from the client and gives the response
 * @author       Niharika
 */

const mongoose = require('mongoose');
const utilities = require('../utilities/helper.js');
const { logger } = require('../../logger/logger');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

class UserModel {
  /**
      * @description register User in the database
      * @param User
      * @param callback
      */

     registerUser = (userDetails, callback) => {
       const newUser = new User({
         firstName: userDetails.firstName,
         lastName: userDetails.lastName,
         email: userDetails.email,
         password: userDetails.password
       });
       try {
         utilities.hashing(userDetails.password, (error, hash) => {
           if (hash) {
             newUser.password = hash;
             newUser.save((error, data) => {
               if (error) {
                 callback(error, null);
               } else {
                 callback(null, data);
               }
             });
           } else {
             throw error;
           }
         });
       } catch (error) {
         logger.error('Find error in model');
         return callback('Internal error', null);
       }
     };

     /**
      * @description login User from the database
      * @param loginData
      * @param callback for service
      */

     loginUser = (loginData, callBack) => {
       User.findOne({ email: loginData.email }, (error, data) => {
         if (error) {
           logger.error('Find error while loggin user');
           return callBack(error, null);
         } else if (!data) {
           logger.error('Invalid User');
           return callBack('Invalid Credentials', null);
         } else {
           logger.info('Email id found');
           return callBack(null, data);
         }
       });
     }

     /**
     * @description mongoose function for forgot password
     * @param {*} email
     * @param {*} callback
     */
     forgotPassword = (data, callback) => {
       User.findOne({ email: data.email }, (err, data) => {
         if (err) {
           logger.error('User with email id doesnt exists');
           return callback('User with email id doesnt exists', null);
         } else {
           return callback(null, data);
         }
       });
     };

     /**
     * @description mongooose method for reseting the password
     * @param {*} userData
     * @param {*} callback
     * @returns
     */

     resetPassword = async (userData, callback) => {
       const hashPass = bcrypt.hashSync(userData.password, 10);
       const data = await User.findOne({ email: userData.email });
       User.findByIdAndUpdate(data.id, { firstName: data.firstName, lastName: data.lastName, password: hashPass }, { new: true }, (error, data) => {
         if (error) {
           logger.error(error);
           return callback(error, null);
         } else {
           return callback(null, data);
         }
       });
     };
}
module.exports = new UserModel();
