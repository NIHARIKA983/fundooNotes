/* eslint-disable node/handle-callback-err */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const noteDB = require('./notes.json');
chai.should();

describe('create notes api', () => {
  it('notes', (done) => {
    const token = noteDB.notes.validToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    console.log(createNotes);
    chai
      .request(server)
      .post('/createnotes')
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenCreateNotes_whenInvalidToken_shouldNotbeCreated', (done) => {
    const token = noteDB.notes.invalidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    console.log(createNotes);
    chai
      .request(server)
      .post('/createnotes')
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get note test cases
describe('get notes api', () => {
  it('notes', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get('/getnotes')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenCreateNotes_whenInvalidToken_shouldNotbeGet', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .get('/getnotes')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// update note test cases
describe('Update notes api', () => {
  it('givenPoperDetails_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put('/updatenotes/6165357e39139e12b1b2986f')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenInvalidToken_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put('/updatenotes/6163a92b4ec773015a13abb0')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// delete note test cases
describe('delete notes api', () => {
  it('givenPoperDetails_ShouldDeleteNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .delete('/deletenotes/61653c4e458259447e4e225f')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('givenInvalidToken_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .delete('/deletenotes/6165357e39139e12b1b2986f')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get data by id
describe('Get notes by ID api', () => {
  it('givenPoperDetails_ShouldGetNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get('/getnotes/6165357e39139e12b1b2986f')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// add lebel in note and add note in label
describe('Add label in notes api', () => {
  it('givenPoperDetails_ShouldAddLabelInNote', (done) => {
    const token = noteDB.addLebel.validToken;
    const note = noteDB.addLabelBodyData;
    console.log(note);
    chai
      .request(server)
      .post('/addlabel/616584e253d5c4f5dece512a')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// Delete Label in Note
describe('Delete label in notes api', () => {
  it('givenPoperDetails_ShouldDeleteLabelInNote', (done) => {
    const token = noteDB.addLebel.validToken;
    const note = noteDB.deleteLabelBodyData;
    console.log(note);
    chai
      .request(server)
      .delete('/deleteLabelFromNote/616584e253d5c4f5dece512a')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

// NoteCollaborate
describe('collaborate Note withUser', () => {
  it('givenImPoperDetails_ShouldNotCollaborateWithNote', (done) => {
    const token = noteDB.addUser.validToken;
    const note = noteDB.NoteCollaborator;
    console.log(note);
    chai
      .request(server)
      .post('/notecollaborator/616c2b372efeaa26cf4f0fc1')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
