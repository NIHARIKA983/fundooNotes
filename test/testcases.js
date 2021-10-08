/* eslint-disable node/handle-callback-err */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const registrationData = require('./user.json');
const loginData = require('./user.json');
const userInputs = require('./user.json');
const userDB = require('./user.json');

chai.should();

describe('registartion', () => {
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registration;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithImproperDetails;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it('givenRegistrationDetails_whenImpProper_Validation_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithImproperValidation;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it('givenRegistrationDetails_withOut_email_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithOutEmail;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
  it('givenRegistrationDetails_withOut_firstName_shouldNotSaveInDB', (done) => {
    const registartionDetails = registrationData.user.registrationWithOutfirstName;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe('login', () => {
  it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
    const loginDetails = loginData.user.login;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  // it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
  //   const loginDetails = loginData.user.loginWithImproperDetails;
  //   chai
  //     .request(server)
  //     .post('/login')
  //     .send(loginDetails)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       res.should.have.status(400);
  //       done();
  //     });
  // });
  // it('givenLoginDetails_whenImproperPassword_shouldUnableToLogin', (done) => {
  //   const loginDetails = loginData.user.loginWithImproperPassword;
  //   chai
  //     .request(server)
  //     .post('/login')
  //     .send(loginDetails)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       res.should.have.status(400);
  //       done();
  //     });
  // });
  // it('givenLoginDetails_whenImproperEmail_shouldUnableToLogin', (done) => {
  //   const loginDetails = loginData.user.loginWithImproperEmail;
  //   chai
  //     .request(server)
  //     .post('/login')
  //     .send(loginDetails)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       res.should.have.status(400);
  //       done();
  //     });
  // });
});

describe('forgotPassword', () => {
  it('givenValidData_whenProper_souldAbleToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.userForgotPasswordPos;
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done('Invalid details received instead of valid');
        }
        res.should.have.status(200);
        return done();
      });
  });
  it('givenInValidEmail_shouldNotAbleToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.userForgotPasswordNegNonRegistered;
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done('email-id is empty or unable to fetch details');
        }
        return done();
      });
  });
});

describe('reset Password API', () => {
  it('givenresetdetails_whenproper_shouldberesetlinkSent', (done) => {
    const token = userDB.user.userResetPasswordToken;
    const reset = userDB.user.validDetailss;
    chai
      .request(server)
      .put('/reset-Password')
      .set({ authorization: token })
      .send(reset)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenresetdetails_whenNotproper_shouldberesetlinkSent', (done) => {
    const token = userDB.user.userResetPasswordToken;
    const reset = userDB.user.invalidDetailss;
    chai
      .request(server)
      .put('/reset-Password')
      .set({ authorization: token })
      .send(reset)
      .end((error, res) => {
        res.should.have.status(422);
        done();
      });
  });

  it('givenresetdetails_whenNotProper_shouldberesetlinkNotSent', (done) => {
    const token = userDB.user.userResetPasswordInvalidToken;
    const reset = userDB.user.validDetailss;
    chai
      .request(server)
      .put('/reset-Password')
      .set({ authorization: token })
      .send(reset)
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
