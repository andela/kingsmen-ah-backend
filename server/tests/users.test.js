import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import models from '@models';
import app from '../app';
import generateToken from './factory/user-factory';

let userToken;
const { User } = models;
chai.use(chaiHttp);
const { expect } = chai;
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjZDAwNDBmLTI3MDktNGU0Yi05YjU2LWYzZDk3MmRhNjk4OTg5IiwiZW1haWwiOiJqdXN0c2luZUBzbnF3c3QuY29tIiwiaWF0IjoxNTYwMjA3NTAyLCJleHAiOjE1NjAyOTM5MDJ9.FpXu8SrboezKr57MNcrEA_pGhsMRm0G5ptUGqQje12I';

let authToken;

describe('TESTS TO SIGNUP A USER', () => {
  before(async () => {
    const newUser = await User.create({
      id: faker.random.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    authToken = await generateToken({ id: newUser.id });
  });
  it('should return `username is required` if username is absent ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/register')
        .send({
          email: 'justsine@snqwst.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.username).to.eql('username is required');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return email is required if email is absent ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/register')
        .send({
          username: 'Sanchezqwst',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.email).to.eql('email is required');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success status 201', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/register')
        .send({
          username: 'Sanchezqwst',
          email: 'justsine@snqwst.com',
          password: '1234567'
        })
        .end((err, res) => {
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

  it('should return a duplicate signup', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/register')
        .send({
          username: 'Sanchezqwst',
          email: 'justsine@snqwst.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          const returnStatus = 400;
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return an empty entry error', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/register')
        .send({
          username: '',
          email: '',
          password: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.an('object');
          expect(res.body).to.have.property('status');
          const returnStatus = 400;
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO LOGIN A USER', () => {
  it('should login with status 200', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/login')
        .send({
          email: 'justsine@snqwst.com',
          password: '1234567'
        })
        .end((err, res) => {
          userToken = res.body.user.token;
          expect(res.status).to.equal(200);
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

  it('should return an invalid login', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/login')
        .send({
          email: 'justsine@snqwfssst.com',
          password: '1234d567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.equal('Invalid email or password');
          expect(res.body).to.have.property('status');
          const returnStatus = 400;
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return an invalid login when password does not match', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/login')
        .send({
          email: 'justsine@snqwst.com',
          password: '11224b'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.equal('Invalid email or password');
          expect(res.body).to.have.property('status');
          const returnStatus = 400;
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return `email is required` if email is absent ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/login')
        .send({
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.email).to.eql('email is required');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should create a dropped token', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/logout')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          expect(res.body).to.have.property('message');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return error for empty token', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/logout')
        .set('Authorization', '')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.global).to.be.equal('Invalid token supplied: format Bearer <token>');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return error for invalid token', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/logout')
        .set('Authorization', `Bearer ${invalidToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.global).to.be.equal('Invalid Token');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TEST TO GET ALL USERS', () => {
  it('should return all users', (done) => {
    try {
      chai.request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('array');
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
