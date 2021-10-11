/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @author        : Niharika
*/
const noteService = require('../service/notes');
const { logger } = require('../../logger/logger');

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
      noteService.getNote((id), (err, data) => {
        if (err) {
          logger.error('Failed to get all notes');
          return res.status(400).json({
            message: 'failed to get note',
            success: false
          });
        } else {
          logger.info('All notes retrived');
          return res.status(201).json({
            message: 'Notes retrived successfully',
            success: true,
            data: data
          });
        }
      });
    } catch {
      logger.error('Error occured while retrieving notes');
      return res.status(500).json({
        message: 'Internal Error'
      });
    }
  }

  getNoteById = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };
      const data = await noteService.getNoteById(id);
      if (data.message) {
        return res.status(404).json({
          message: 'Note not found',
          success: false
        });
      }
      console.log(data);
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
}
module.exports = new Note();
