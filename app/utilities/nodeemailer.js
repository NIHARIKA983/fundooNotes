/**
 * @description used to send email to the user
 * @param {*} email
 * @param {*} subject
 * @returns
 */
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const message = {
    from: process.env.EMAIL,
    to: data.email,
    subject: 'Hello',
    text: 'This mail is just for testing'

  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email has been sent', info.response);
      return info.response;
    }
  });
};
