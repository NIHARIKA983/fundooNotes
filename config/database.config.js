const mongoose = require('mongoose');
const url = process.env.URL;
const { logger } = require('../logger/logger');

class Connection {
  database = () => {
    mongoose.Promise = global.Promise;
    // mongoose connect method help us to connect with DB
    mongoose.connect(url, {
      useNewUrlParser: true
    }).then(() => {
      logger.info('SucceSssfully connected to the database');
      console.log('sucessfully connected to the database');
    }).catch(err => {
      logger.error(`Could not connect to the database. Exiting now... ${err}`);
      console.log('Could not connect to the database. Exiting now..', err);
      process.exit();
    });
  }
}
module.exports = new Connection();
