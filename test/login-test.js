const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const loginData = require('./user.json');

chai.should();

describe('login', () => {
  it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
    const loginDetails = loginData.user.login;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
    const loginDetails = loginData.user.loginWithImproperDetails;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});