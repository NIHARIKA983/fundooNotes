/***
 *
 * @file            : label.js
 * @author          : Niharika
 *
**/
const mongoose = require('mongoose');
const labelSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  noteId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NoteRegister' }]
  },

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

    labelGetById = async (id) => {
      try {
        return await LabelRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
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

    /**
      * @description function written to delete label
      * @param {*} id
      * @returns error in the case of error occurrence
      */
    deleteLabelById = async (id) => {
      try {
        return await LabelRegister.findOneAndDelete({ $and: [{ _id: id.labelId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    }

    async addNoteId (id) {
      try {
        const data = await LabelRegister.findByIdAndUpdate(id.labelId, { $push: { noteId: id.noteId } }, { new: true });
        console.log(data);
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Model();
