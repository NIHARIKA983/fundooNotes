/* eslint-disable node/handle-callback-err */
/**
 * @description   : Taking the request from the client and gives the response
 * @author        : Niharika
*/

const userService = require('../service/user.service.js');
const validation = require('../utilities/validation.js');
const { logger } = require('../../logger/logger');
// const utilities = require('../utilities/helper.js');
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

    confirmRegister = (req, res) => {
      try {
        const data = {
          token: req.params.token
        };
        console.log("con 65: ",req.params.token)
      userService.confirmRegister(data, (error, data) => {
        console.log("con 67: ")
        if (error) {
            return res.json({
            success: false,
            message: "error",
          });
        } else {
          return res.json({
            success: true,
            message: "Email Successfully Verified",
            data: data
          });
        }
      })
      } catch {
        return res.json({
          success: false,
          data: null,
          message: "server-error",
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
         const userLoginInfo = {
           email: req.body.email,
           password: req.body.password
         };
        //  const loginValidation = validation.authLogin.validate(userLoginInfo);
        //  if (loginValidation.error) {
        //    logger.error(loginValidation.error);
        //    res.status(400).send({
        //      success: false,
        //      message: loginValidation.error.message
        //    });
        //  }
         userService.userLogin(userLoginInfo, (error, token) => {
           if (error) {
             logger.error(error);
             return res.status(400).json({
               success: false,
               message: 'Unable to login. Please enter correct info',
               error
             });
           }
           logger.info('User logged in successfully');
           return res.status(200).json({
             success: true,
             message: 'User logged in successfully',
             token: token
           });
         });
       } catch (error) {
         return res.status(500).json({
           success: false,
           message: 'Error while Login',
           data: null
         });
       }
     };

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
         const inputData = {
           email: req.user.dataForToken.email,
           password: req.body.password
         };
         const loginValidation = validation.resetSchema.validate(inputData);
         if (loginValidation.error) {
           logger.error('Invalid password');
           res.status(422).send({
             success: false,
             message: 'Invalid password'
           });
           return;
         }
         userService.resetPassword(inputData, (error, userData) => {
           if (error) {
             logger.error('Failed to reset password');
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

     /**
   * description socialLogin controller function for login user using google
   * @param {*} req req shoul have req.user
   * @param {*} res should have user log in succefully
   * @returns
   */
     socialLogin = (req, res) => {
       const googleProfile = req.user.profile;
       const googleInfo = {
         firstName: googleProfile.name.givenName,
         lastName: googleProfile.name.familyName,
         email: googleProfile.emails[0].value,
         password: null,
         googleId: googleProfile.id,
         googleLogin: true
       };
       userService.socialLogin(googleInfo).then((data) => {
         return res
           .status(200)
           .send({
             success: true,
             message: 'Login Successfully...!',
             token: data
           });
       })
         .catch((error) => {
           return res.status(500).send({
             success: false,
             message: "Login Failed...!'"
           });
         });
     };
}

module.exports = new Controller();
