/**
 * @module       Service
 * @file         notes.js
 * @description  It is work as a middleware between models and controller
 * @author       Niharika
 */
const { logger } = require('../../logger/logger');
const noteModel = require('../models/notes');
// const nodemailer = require('../Utilities/nodeemailer.js');
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

  getNote = (id, resolve, reject) => {
    noteModel
      .getNote(id)
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  getNoteById = async (id) => {
    try {
      return await noteModel.getNoteById(id);
    } catch (err) {
      return err;
    }
  }

  /**
     * @description this function is written to trigger or call the models function
     * @returns error if it has error else data
     */
  updateNoteById = (updateNote, resolve, reject) => {
    noteModel
      .updateNoteById(updateNote)
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  /**
     * @description deleting notes by id
     * @param {*} notesId
     * @returns
     */

  deleteNoteById = async (id) => {
    try {
      return await noteModel.deleteNoteById(id);
    } catch (err) {
      return err;
    }
  }

  /**
     * @description function written to add label to note
     * @param {*} a valid noteId is expected
     * @param {*} a valid labelId is expected
     * @returns
     */

  addLabelById = async (id) => {
    try {
      const data = await noteModel.addLabelById(id);
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
 * @description function written to delete label from note
 * @param {*} a valid noteId is expected
 * @param {*} a valid labelId is expected
 * @returns
 */

  deleteLabel = async (id) => {
    try {
      const data = await noteModel.deleteLabel(id);
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
 * @description function written to Collaborate the user to the note
 * @param {*} a valid noteId is expected
 * @param {*} a valid emailData is expected
 * @returns
 */

  async noteCollaborator (notesId, emailData) {
    try {
      const data = await noteModel.noteCollaborator(notesId, emailData);
      console.log('NoteService' + data);
      return data;
    } catch (error) {
      return error;
    }
  }

   addCollaborator = async (id, collabUser) => {
     const data = await noteModel.getByIdForColl(id);
     for (let i = 0; i < data.collaborator.length; i++) {
       if (JSON.stringify(data.collaborator[i]) === JSON.stringify(collabUser.collabUser)) {
         return true;
       }
     }
     return false;
   }
}
module.exports = new Service();
