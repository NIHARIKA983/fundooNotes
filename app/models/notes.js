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
  getNote = (id, callback) => {
    NoteRegister.find({ userId: id.id })
      .then((data) => {
        callback(null, data);
      }).catch((err) => {
        callback(err, null);
      });
  }

  getNoteById = async (id) => {
    try {
      return await NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
    } catch (err) {
      return err;
    }
  }

  updateNoteById = (updatedNote, callback) => {
    try {
      NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (err) {
      return callback(err, null);
    }
  }

  deleteNoteById = async (id) => {
    try {
      return await NoteRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
    } catch (err) {
      return err;
    }
  }
}
module.exports = new Model();
