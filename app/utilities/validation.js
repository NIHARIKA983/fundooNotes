/* eslint-disable prefer-regex-literals */
/**
 * @module       utilities
 * @file         validation.js
 * @description  it contains the validation for register and login
 * @author       Niharika
 */

const Joi = require('joi');

class Validation {
    authRegister =
        Joi.object({
          firstName: Joi.string()
            .min(3)
            .required()
            .pattern(new RegExp('^[A-Z]{1}[a-z]{3,}$')),

          lastName: Joi.string()
            .min(2)
            .required(),

          email: Joi.string()
            .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
            .required(),

          password: Joi.string()
            .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}'))
            .required()
        });

        authLogin =
        Joi.object({
          email: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$'))
            .required(),

          password: Joi.string()
            .required()
            .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}'))
        });

        authenticateLogin = Joi.object({
          email: Joi.string()
            .pattern(new RegExp('^[a-z0-9.+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$'))
            .required()
        })

        validateReset = Joi.object({
          token: Joi.string().required(),
          password: Joi.string().min(8)
            .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}'))
            .required()
        })

        resetSchema = Joi.object({
          email: Joi.string().required(),
          password: Joi.string()
            .min(8)
            .max(20)
            .pattern(
              new RegExp(
                '[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}'
              )
            )
            .required()
        });

        notesCreationValidation = Joi.object({
          userId: Joi.string().required(),
          title: Joi.string().min(5)
            .required(),

          description: Joi.string().min(5)
            .required()
        });

        getNoteValidation = Joi.object({
          id: Joi.string().required()
        });

        notesUpdateValidation = Joi.object({
          id: Joi.string().required(),
          userId: Joi.string().required(),
          title: Joi.string().min(5)
            .required(),

          description: Joi.string().min(5)
            .required()
        });

        notesdeleteValidation = Joi.object({
          userId: Joi.string().required(),
          noteId: Joi.string().required()
        });

        validateLabel = Joi.object({
          labelName: Joi.string()
            .required()
        })

         validateLabel = Joi.object({
           labelName: Joi.string()
             .required()
         })
}
module.exports = new Validation();
