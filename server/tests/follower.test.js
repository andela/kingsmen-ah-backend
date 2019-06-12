import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

let firstUserToken, secondUserToken, firstUserId, secondUserId;
const fakerObject = () => {
  const username = faker.random.alphaNumeric(6);
  const email = faker.internet.email();
  const password = faker.internet.password();
  return { username, email, password };
};

describe('TESTS TO CREATE USERS', () => {
  const sendObject1 = fakerObject();
  const sendObject2 = fakerObject();

  it('should create a user', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/register')
        .send(sendObject1)
        .end((err, res) => {
          firstUserToken = res.body.user.token;
          firstUserId = res.body.user.id;
          expect(res.status).to.equal(201);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.token).to.be.a('string');
          expect(res.body).to.have.property('status');
          const returnStatus = 'success';
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should create a user', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/register')
        .send(sendObject2)
        .end((err, res) => {
          secondUserToken = res.body.user.token;
          secondUserId = res.body.user.id;
          expect(res.status).to.equal(201);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.token).to.be.a('string');
          expect(res.body).to.have.property('status');
          const returnStatus = 'success';
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO FOLLOW A USER', () => {
  it('first-user should follow second-user', (done) => {
    try {
      chai.request(app)
        .post(`/api/v1/users/${secondUserId}/follow`)
        .set('authorization', `Bearer ${firstUserToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('User followed successfully');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('second-user should follow first-user', (done) => {
    try {
      chai.request(app)
        .post(`/api/v1/users/${firstUserId}/follow`)
        .set('authorization', `Bearer ${secondUserToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('User followed successfully');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('second-user cannot follow first-user more than once', (done) => {
    try {
      chai.request(app)
        .post(`/api/v1/users/${firstUserId}/follow`)
        .set('authorization', `Bearer ${secondUserToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('user was followed already!');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return user not found when wrong userid is passed', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/users/99c7c9a9-9c2d-4228-b429-e76c1c3b2164/follow')
        .set('authorization', `Bearer ${firstUserToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.eql('User not found');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('first-user cannot follow himself', (done) => {
    try {
      chai.request(app)
        .post(`/api/v1/users/${firstUserId}/follow`)
        .set('authorization', `Bearer ${firstUserToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.eql('you cannot follow yourself');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
