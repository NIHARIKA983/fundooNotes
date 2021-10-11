/**
 * @module       Service
 * @file         notes.js
 * @description  It is work as a middleware between models and controller
 * @author       Niharika
 */
const { logger } = require('../../logger/logger');
const noteModel = require('../models/notes');
class Service {
  /**
     * @description this function is written to send data models
     * @param {*} A valid note is expected
     * @returns error if it has error else data
     */
  createNote = (note, callback) => {
    noteModel.createNote(note, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    }
    );
  }

  /**
     * @description this function is written to trigger or call the models function
     * @returns error if it has error else data
     */
  getNote = (id, callback) => {
    noteModel.getNote(id, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  }

  getNoteById = async (id) => {
    try {
      return await noteModel.getNoteById(id);
    } catch (err) {
      return err;
    }
  }

  updateNoteById = (updateNote, callback) => {
    noteModel.updateNoteById(updateNote, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    }
    );
  }
}
module.exports = new Service();
