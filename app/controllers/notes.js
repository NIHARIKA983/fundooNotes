/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @author        : Niharika
*/
const noteService = require('../service/notes');
const { logger } = require('../../logger/logger');
const validation = require('../utilities/validation.js');

class Note {
  /**
     * @description function written to create notes into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
  createNote =(req, res) => {
    try {
      const note = {
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      // console.log('note for controller :: ' + note);
      const createNoteValidation = validation.notesCreationValidation.validate(note);
      if (createNoteValidation.error) {
        console.log(createNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: createNoteValidation
        });
      }

      noteService.createNote(note, (error, data) => {
        if (error) {
          logger.error('failed to post note');
          return res.status(400).json({
            message: 'failed to post note',
            success: false
          });
        } else {
          logger.info('Successfully inserted note');
          return res.status(201).send({
            message: 'Successfully inserted note',
            success: true,
            data: data
          });
        }
      });
    } catch {
      logger.error('Internal server error');
      return res.status(500).json({
        message: 'Error occured',
        success: false
      });
    }
  }

  /**
     * @description function written to get all the notes from the database
     * @param {*} req
     * @param {*} res
     * @returns response
     */

  getNote = (req, res) => {
    try {
      const id = { id: req.user.dataForToken.id };
      const getNoteValidation = validation.getNoteValidation.validate(id);
      if (getNoteValidation.error) {
        console.log(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }
      noteService.getNote(id, resolve, reject);
      function resolve (data) {
        logger.info('Get All Notes successfully');
        return res.status(201).json({
          message: 'Get All Notes successfully',
          success: true,
          data: data
        });
      }
      function reject () {
        logger.error('Failed to get all notes');
        return res.status(400).json({
          message: 'failed to get all notes',
          success: false
        });
      }
    } catch {
      logger.error('Internal Error');
      return res.status(500).json({
        message: 'Internal Error'
      });
    }
  };

  getNoteById = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };

      const getNoteValidation = validation.notesdeleteValidation.validate(id);
      if (getNoteValidation.error) {
        console.log(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }
      const data = await noteService.getNoteById(id);
      if (data.message) {
        return res.status(404).json({
          message: 'Note not found',
          success: false
        });
      }
      return res.status(200).json({
        message: 'Note retrieved succesfully',
        success: true,
        data: data

      });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal Error',
        success: false,
        data: err
      });
    }
  }

  /**
     * @description function written to update notes using ID from the database
     * @param {*} req
     * @param {*} res
     * @returns response
     */
  updateNoteById = (req, res) => {
    try {
      const updateNote = {
        id: req.params.id,
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      const updateNoteValidation = validation.notesUpdateValidation.validate(updateNote);
      if (updateNoteValidation.error) {
        console.log(updateNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: updateNoteValidation
        });
      }
      noteService.updateNoteById(updateNote, resolve, reject);
      function resolve (data) {
        logger.info('Note Updated Successfully');
        return res.status(201).send({
          message: 'Note Updated Successfully',
          success: true,
          data: data
        });
      }
      function reject () {
        logger.error('Note Not Updated or NoteId Is Not Match');
        return res.status(400).json({
          message: 'Note Not Updated or NoteId Is Not Match',
          success: false
        });
      }
    } catch {
      logger.error('Internal Server Error');
      return res.status(500).json({
        message: 'Internal server error',
        success: false
      });
    }
  };

  /**
     * @description function written to delete note by ID
     * @param {*} req
     * @param {*} res
     * @returns response
     */
  deleteNoteById = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };

      const deleteNoteValidation = validation.notesdeleteValidation.validate(id);
      if (deleteNoteValidation.error) {
        console.log(deleteNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: deleteNoteValidation
        });
      }
      const data = await noteService.deleteNoteById(id);
      if (data.message) {
        return res.status(404).json({
          message: 'Note not found',
          success: false
        });
      }
      return res.status(200).json({
        message: 'Note Deleted succesfully',
        success: true,
        data: data
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Note not deleted',
        success: false,
        data: err
      });
    }
  }
}
module.exports = new Note();
