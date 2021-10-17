/**
 * @module       Models
 * @file         notes.js
 * @description to save find update and delete in the database
 * @author       Niharika
 */
const { logger } = require('../../logger/logger');
const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  labels: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LabelRegister' }]
  },
  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  // generates the time stamp the data is been added
  timestamps: true

});

const NoteRegister = mongoose.model('NoteRegister', noteSchema);

// created a class to write functions
class Model {
  /**
   * @description function written to create notes into database
   * @param {*} a valid info is expected
   * @returns saved data or if error returns error
   */
  createNote = (info, callback) => {
    const note = new NoteRegister({
      userId: info.userId,
      title: info.title,
      description: info.description
    });
    note.save((error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  /**
   * @description function written to get all notes from database
   * @returns retrieved notes or if error returns error
   */

  getNote = (id) => {
    return new Promise((resolve, reject) => {
      NoteRegister.find({ userId: id.id })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  /**
   * @description function written to get notes by Id into database
   * @param {*} valid notesId is expected
   * @returns notes of particular Id or if any error return error
   */

  getNoteById = async (id) => {
    try {
      return await NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
    } catch (err) {
      return err;
    }
  }
  /**
   * @description function written to update notes by Id into database
   * @returns notes of particular Id or if any error return error
   */

  updateNoteById = (updatedNote) => {
    return new Promise((resolve, reject) => {
      NoteRegister.findByIdAndUpdate(
        updatedNote.id,
        { title: updatedNote.title, description: updatedNote.description },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  /**
   * @description function written to update isDeleted to true
   * @param {*} notesId
   * @param {*} userId
   * @returns data else if error returns error
   */
  deleteNoteById = async (id) => {
    try {
      return await NoteRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
    } catch (err) {
      return err;
    }
  }

  addLabelById = async (id) => {
    try {
      const data = await NoteRegister.findByIdAndUpdate(id.noteId, { $push: { labelId: id.labelId } });
      console.log(data);
    } catch (error) {
      return error;
    }
  }

  deleteLabel = async (id) => {
    try {
      return await NoteRegister.findByIdAndUpdate(id.noteId,
        { $pull: { labelId: id.labelId } }, { new: true });
    } catch (error) {
      return error;
    }
  }
}
module.exports = new Model();
