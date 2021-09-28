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
        utilities.hashing(userDetails.password, (_error, hash) => {
          if (hash) {
            newUser.password = hash;
            newUser.save();
            return callback(null, newUser);
          } else {
            throw _error;
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
}
module.exports = new UserModel();
