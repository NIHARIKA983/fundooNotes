const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

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

    registerUser = (userDetails,callback) => {

        const newUser = new user({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
        });
        try {
             bcrypt.genSalt(saltRounds, function (err, salt) {
                        if (err) {
                            throw err;
                        }
                        else {
                            bcrypt.hash(userDetails.password, salt, function (err, hash) {
                                if (err) {
                                    throw err;
                                } else {
                                    newUser.password = hash;
                                    newUser.save();
                                    return callback(null, newUser);
                                }
                            })
                        }
                    })
         }
        catch (error) {
            return callback('Internal Error', null)
        }
    }

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