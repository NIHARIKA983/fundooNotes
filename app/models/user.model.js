/**
 * @module       Models
 * @file         user.model.js
 * @description Taking the request from the client and gives the response
 * @author       Niharika
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const utilities = require("../utilities/helper.js");

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
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    })

const user = mongoose.model('user', userSchema);

class userModel {
    /**
     * @description register user in the database
     * @param user
     * @param callback 
     */

    registerUser = (userDetails,callback) => {

        const newUser = new user({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
        });
        try {
            utilities.hashing(userDetails.password, (error, hash) => {
              if (hash) {
                newUser.password = hash;
                newUser.save();
                return callback(null, newUser);
              } else {
                throw err;
              }
            });
          } catch (error) {
            return callback("Internal error", null);
          }
        };
        
    /**
     * @description login user from the database
     * @param loginData 
     * @param callback for service
     */

    loginUser = (loginData, callBack) => {
        user.findOne({ email: loginData.email }, (error, data) => {
            if (error) {
                return callBack(error, null);
            } else if (!data) {
                return callBack("Invalid Credentials", null);
            } else{
                return callBack(null, data);
            }
        });
    }
}
module.exports = new userModel(); 