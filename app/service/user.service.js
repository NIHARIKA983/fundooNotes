const userModel = require('../models/user.model.js')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');


const JWT_SECRET='yourfavoritecolor'
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
                        const token=jwt.sign({
                            username:data.firstName
                        },JWT_SECRET)
                        return callback(null, token);
                    }
                })
            } else {
                callback('Please check your email id and password');
            }
        });
    }
}
module.exports = new userService(); 