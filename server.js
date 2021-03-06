require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const { logger } = require('./logger/logger');
const passport = require('passport');

const port = process.env.PORT;
// create express app
const app = express();

app.use(require('cookie-parser')());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
dbConfig.database();

// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FundooNotesApp.' });
});
require('./app/utilities/auth');
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// ........

// Require Users routes
require('./app/routes/user.routes.js')(app);

// ........

// listen for requests
app.listen(port, () => {
  console.log('Server is listening on port 3000');
  logger.info(`Server is listening on port : ${process.env.PORT}`);
  logger.error(' Something is wrong ');
});

module.exports = app;
