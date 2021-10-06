/**
 * @module       utilities
 * @file         helper.js
 * @description  it contains the Hashing and Token
 * @author       Niharika
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        throw err;
      } else {
        return callback(null, hash);
      }
    });
  };

  token = (data) => {
    const dataForToken = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET);
  }

  getEmailFromToken = (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (data) {
      return data;
    } else {
      return 'couldnt verify';
    }
  }

  validateToken = (req, res, next) => {
    try {
      console.log('authorization is sucessfull');
      const header = req.headers.authorization;
      const myArr = header.split(' ');
      const token = myArr[1];
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      if (verify) {
        console.log('seccess');
        next();
      } else {
        return res.status(400).send({
          message: 'Invalid Token',
          success: false
        });
      }
    } catch {
      return res.status(401).send({
        message: 'Invalid Token',
        success: false
      });
    }
  }
}

module.exports = new Helper();
