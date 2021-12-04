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
  googleId: { type: String },
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
  },
  googleLogin: { type: Boolean },
  verified: {
    type: Boolean,
    default: false
  }
},

{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
// module.exports = User;

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

     confirmRegister = (data, callback) => {
      console.log("con mod 78: ",data.firstName);
      User.findOneAndUpdate({ email: data.email },{
        verified: true
        }, (error, data) => {
        if (error) {
          logger.error('data not found in database');
          return callback(error, null);
        } else {
          logger.info('data found in database');
          return callback(null, data);
        }
      });
    }

     /**
      * @description login User from the database
      * @param loginInfo
      * @param callback for service
      */

      loginModel = (loginInfo, callback) => {
          User.findOne({ email: loginInfo.email }, (error, data) => {
            if (error) {
              logger.error('data not found in database');
              return callback(error, null);
            } else {
              console.log("104: verified: ", data.verified);

           if(data.verified == true){
           logger.info('data found in database');
           return callback(null, data);
          } else {
          logger.info('data found in database but not verified');
          return callback('not verified mail', null);
         }

        }
       });
      };


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

     userExists = async (collabUser) => {
       const data = await User.findOne({ _id: collabUser.collabUser });
       return data;
     };

     /**
   * @description mongooose method for reseting the password
   * @param {*} userData has email of user to find user and if user exist return data
   *        else register user using mongoose save function and then return data to service
   *        to generate token
   * @returns
   */
     socialLogin = async (userData) => {
       return await User.findOne({ email: userData.email }).then(data => {
         if (data !== null) {
           return data;
         } else {
           const data = new User({
             firstName: userData.firstName,
             lastName: userData.lastName,
             email: userData.email,
             password: userData.password,
             googleId: userData.googleId,
             googleLogin: userData.googleLogin
           });
           const datauser = async () => {
             await data.save();
           };
           datauser();
           console.log(data);
           return data;
         }
       }).catch(err => {
         return ('Something went wrong', err);
       });
     };
}
module.exports = new UserModel();
