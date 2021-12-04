/**
 * @description used to send email to the user
 * @param {*} email
 * @param {*} subject
 * @returns
 */
const nodemailer = require('nodemailer');
require('dotenv').config();
const helper = require('../utilities/helper.js');
const { logger } = require('../../logger/logger');

class noemiler{
  sendEmail = (data) => {
    console.log("sendmail nodemailer",data," ",process.env.EMAIL,process.env.PASSWORD)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false
    }
    });
  
    const token = helper.token(data);
    const mailOption = {
      from: process.env.EMAIL,
      to: data.email,
      subject: 'Reset your password',
      text: 'This mail is just for testing',
      html: `
                <h2>please click on the link to change password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>    `
  
    };
  
    transporter.sendMail(mailOption, (err, info) => {
      console.log("transpoter",err)
      const sendEmailInfo = err ? logger.log('error', err) : logger.log('info', info);
      return sendEmailInfo;
    });
  
  
   
  };

  sendConfirmMail = (token, data) => {
    console.log("nodemail",token +"+"+data.email)
    const link = `http://localhost:${process.env.PORT}/confirmregister/${token}`;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: '"Fundoo Notes" <no-reply@fundoonotes.com>', // sender address
      to: data.email, // list of receivers
      subject: "Verify Mail - Fundoo notes account", // Subject line
      text: `Hello ${data.firstName}.`, // plain text body
      html: `<b>Hello ${data.firstName}. Here is your link to Verify Mail: <button href="${link}"> <a href="${link}">confirm mail</a></button></b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

module.exports = new noemiler();
