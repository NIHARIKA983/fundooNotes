/**
 * @description   : Taking the request from the client and gives the response
 * @author        : Niharika
*/

const userService = require('../service/user.service.js');
const validation = require('../utilities/validation.js');
const { logger } = require('../../logger/logger');
const utilities = require('../utilities/helper.js');
require('dotenv').config();

class Controller {
  /**
     * @description Create and save user and sending response to service
     * @method register to save the user
     * @param req,res for service
     */

    register = (req, res) => {
      try {
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        };

        const registerValidation = validation.authRegister.validate(user);

        if (registerValidation.error) {
          console.log(registerValidation.error);
          return res.status(400).send({
            success: false,
            message: 'Wrong Input Validations',
            data: registerValidation
          });
        }

        userService.registerUser(user, (error, data) => {
          if (error) {
            return res.status(409).json({
              success: false,
              message: 'User already exist'
            });
          } else {
            logger.info('User registered');
            return res.status(200).json({
              success: true,
              message: 'User Registered',
              data: data
            });
          }
        });
      } catch (error) {
        logger.error('Internal server error');
        return res.status(500).json({
          success: false,
          message: 'Error While Registering',
          data: null
        });
      }
    }
    /**
     * @description retrieving login info from user by email and password
     * @method login
     * @param req,res for service
     */

    login = (req, res) => {
      try {
        const loginInfo = {
          email: req.body.email,
          password: req.body.password
        };

        const loginValidation = validation.authLogin.validate(loginInfo);

        if (loginValidation.error) {
          return res.status(400).send({
            success: false,
            message: 'Wrong Input Validations',
            data: loginValidation
          });
        }
        userService.loginUser(loginInfo, (error, data) => {
          if (error) {
            return res.status(400).json({
              success: false,
              message: 'Incorrect Email And Password!',
              error
            });
          } else {
            return res.status(200).json({
              success: true,
              message: 'User successfully logged In',
              token: data

            });
          }
        });
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: 'Internal server error'

        });
      }
    }

    /**
     * description controller function for forgot password
     * @param {*} req
     * @param {*} res
     * @returns
     */

    forgotPassword = (req, res) => {
      try {
        const userCredential = {
          email: req.body.email
        };
        const validationforgotPassword =
        validation.authenticateLogin.validate(userCredential);

        if (validationforgotPassword.error) {
          logger.error('Wrong Input Validations');
          return res.status(400).send({
            success: false,
            message: 'Wrong Input Validations',
            data: validationforgotPassword
          });
        }
        userService.forgotPassword(userCredential, (error, result) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: 'failed to send email',
              error
            });
          } else {
            return res.status(200).send({
              success: true,
              message: 'Email sent successfully',
              result
            });
          }
        });
      } catch (error) {
        logger.error('Internal server error');
        return res.status(500).send({
          success: false,
          message: 'Internal server error',
          result: null
        });
      }
    }

    /**
     * description controller function for reset password
     * @param {*} req
     * @param {*} res
     * @returns
     */

     resetPassword = (req, res) => {
       try {
         const loginValidation = validation.resetSchema.validate(req.body.inputData);
         if (loginValidation.error) {
           logger.error('Invalid password');
           res.status(422).send({
             success: false,
             message: 'Invalid password'
           });
           return;
         }

         console.log(req.headers.authorization);
         const header = req.headers.authorization;
         const myArr = header.split(' ');
         const token = myArr[1];
         const tokenData = utilities.getEmailFromToken(token);
         const inputData = {
           email: tokenData.dataForToken.email,
           password: req.body.password
         };

         userService.resetPassword(inputData, (error, userData) => {
           if (error) {
             logger.error('did not data from service to controller');
             return res.status(400).send({
               message: error,
               success: false
             });
           } else {
             logger.info('Password reset succesfully');
             return res.status(200).json({
               success: true,
               message: 'Password reset succesfully',
               data: userData
             });
           }
         });
       } catch (error) {
         logger.error('Internal server error');
         return res.status(500).send({
           success: false,
           message: 'Internal server error',
           data: null
         });
       }
     };
}

module.exports = new Controller();
