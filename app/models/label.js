/***
 *
 * @file            : label.js
 * @author          : Niharika
 *
**/
const mongoose = require('mongoose');
const labelSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  //   noteId: {
  //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  //   },

  labelName: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const LabelRegister = mongoose.model('labelRegister', labelSchema);

class Model {
    /**
      * @description function written to create label
      * @param {*} data
      * @returns data else if returns error
      */
    createLabel = (data) => {
      return new Promise((resolve, reject) => {
        const label = new LabelRegister({
          userId: data.userId,
          labelName: data.labelName
        });
        label.save().then((data) => resolve(data))
          .catch((error) => reject(error));
      });
    }

    /**
      * @description function written to get all labels
      * @returns data else if returns error
      *
      *
      */
    getLabel = (id) => {
      return new Promise((resolve, reject) => {
        LabelRegister.find({ userId: id }).then((data) => {
          resolve(data);
        })
          .catch((error) => reject(error));
      });
    }

    /**
      *
      * @param {*} id
      * @description retrieve all the label created
      */
    getLabelById = (id) => {
      return new Promise((resolve, reject) => {
        LabelRegister.findById(id).then((data) => {
          resolve(data);
        }).catch((err) => reject(err));
      });
    }

    /**
      * @description : updating the label
      * @param {*} labelId
      * @param {*} label
      * @returns data else if returns error
      */

    async updateLabel (label) {
      try {
        return await LabelRegister.findByIdAndUpdate(label.labelId, { labelName: label.labelName }, { new: true });
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Model();
