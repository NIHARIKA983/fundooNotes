const connection = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Login API", () => {
  it("givenLoginDetails when Proper should able to login", (done) => {
    let loginDetails = {
      email: "arpitha8@gmail.com",
      password: "arpitha11@@",
    };

    chai
      .request(connection)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


describe("Login API", () => {
  it("givenLoginDetails when Improper should unable to login", (done) => {
    let loginDetails = {
      email: "ar@gmail.com",
      password: "arpitha11@",
    };

    chai
      .request(connection)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});