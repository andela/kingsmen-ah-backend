import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

let firstUserToken, secondUserToken, firstUserId, secondUserId;

describe('TESTS TO CREATE USERS', () => {
  it('should create a user', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'FirstUser',
          email: 'email1@andela.com',
          password: '1234567'
        })
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
        .send({
          username: 'SecondUser',
          email: 'email2@andela.com',
          password: '1234567'
        })
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
        .set('token', firstUserToken)
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
        .set('token', secondUserToken)
        .end((err, res) => {
          console.log(res.body);
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
        .set('token', secondUserToken)
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
        .set('token', secondUserToken)
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
});
