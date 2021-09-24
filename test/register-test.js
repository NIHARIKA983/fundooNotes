const connection = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("registration API", () => {
  it("givenRegistrationDetails whenProper shouldSaveInDB", (done) => {
    let registrationDetails = {
      firstName: "Arpitha",
      lastName: "KV",
      email: "arpitha8@gmail.com",
      password: "arpitha11@@",
    };

    chai
      .request(connection)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


describe("registration API", () => {
  it("givenRegistrationDetails when ImProper shouldNotSaveInDB", (done) => {
    let registrationDetails = {
      firstName: "arpith",
      lastName: "k",
      email: "arpitha8@gmail.com",
      password: "arpitha11@@",
    };

    chai
      .request(connection)
      .post("/register")
      .send(registrationDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

