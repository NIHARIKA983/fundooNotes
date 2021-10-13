/***
 *
 * @file            : label.js
 * @author          : Niharika
 *
**/
const validation = require('../utilities/validation.js');
const { logger } = require('../../logger/logger');
const labelService = require('../service/label');
class Label {
    /**
     * @description function writt
     * en to create label into database
     * @param {*} a valid req body is expected
     * @param {*} res
     */
    createLabel = (req, res) => {
      try {
        const valid = validation.validateLabel.validate(req.body);
        if (valid.error) {
          logger.error('Invalid label body');
          return res.status(400).send({
            message: 'Please enter valid label',
            success: false,
            error: valid.error
          });
        } else {
          const label = {
            labelName: req.body.labelName,
            userId: req.user.dataForToken.id
          };
          labelService.createLabel(label, resolve, reject);
          function resolve (data) {
            logger.info('Label inserted');
            res.status(201).send({
              message: 'Label created successfully',
              success: true,
              data: data
            });
          }
          function reject () {
            logger.error('Label not created');
            res.status(500).send({
              message: 'Label not created',
              success: false
            });
          }
        }
      } catch {
        logger.error('Label not created error occured');
        return res.status(500).send({
          message: 'Error occured',
          success: false
        });
      }
    }
}
module.exports = new Label();
