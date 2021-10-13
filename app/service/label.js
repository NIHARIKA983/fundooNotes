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
}
module.exports = new Service();
