/***
 * Purpose          : to create the service for business logic of labels Api.
 *                  : its a middleware between controller and models
 *
 * @file            : label.js
 * @author          : Niharika
 *
**/
const labelModel = require('../models/label');
class Service {
    /**
      * @param {data}  : data will come from the controller body.
      * @description   : createLabel will takes the data from controller and send it to models
     */
    createLabel = (label, resolve, reject) => {
      labelModel.createLabel(label)
        .then((data) => resolve(data))
        .catch(() => reject());
    }
    /**
      * @description function written to get all labels
      * @returns data else returns error
      */

    getLabel =(id, callback) => {
      labelModel.getLabel(id).then((data) => { callback(data, null); })
        .catch((err) => { callback(null, err); });
    }

    /**
      * @description function written to get label by ID
      * @param {*} a valid id is expected
      * @returns data else returns error
      */
    getLabelById = (id, callback) => {
      labelModel.getLabelById(id).then((data) => { callback(data, null); })
        .catch((err) => { callback(null, err); });
    }

    /**
     * @description   : createLabel will takes the data from controller and send it to models
      * @param {*} a valid label is expected
      * @returns
      */

    async updateLabel (label) {
      try {
        return await labelModel.updateLabel(label);
      } catch (error) {
        return error;
      }
    }
}
module.exports = new Service();
