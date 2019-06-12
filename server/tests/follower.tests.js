import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import models from '@models';
import Token from '@helpers/Token';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

let firstUserToken, secondUserToken, firstUsername, secondUsername;
const fakerObject = () => {
  const username = faker.random.alphaNumeric(6);
  const email = faker.internet.email();
  const password = faker.internet.password();
  return { username, email, password };
};
const userOne = fakerObject();
const userTwo = fakerObject();

describe('TESTS TO FOLLOW A USER', () => {
  before(async () => {
    const user1 = await models.User.create(userOne);
    const user2 = await models.User.create(userTwo);
    const payload1 = {
      id: user1.dataValues.id,
      email: user1.dataValues.email
    };
    firstUsername = user1.dataValues.username;
    secondUsername = user2.dataValues.username;
    firstUserToken = await Token.create(payload1);
    const payload2 = {
      id: user2.dataValues.id,
      email: user2.dataValues.email
    };
    secondUserToken = await Token.create(payload2);
  });

  it('first-user should follow second-user', (done) => {
    try {
      chai.request(app)
        .post(`/api/v1/profile/${secondUsername}/follow`)
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
        .post(`/api/v1/profile/${firstUsername}/follow`)
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
        .post(`/api/v1/profile/${firstUsername}/follow`)
        .set('authorization', `Bearer ${secondUserToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.global).to.eql('user was followed already!');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return user not found when wrong username is passed', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/profile/nhhg/follow')
        .set('authorization', `Bearer ${firstUserToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.global).to.eql('User not found');
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
        .post(`/api/v1/profile/${firstUsername}/follow`)
        .set('authorization', `Bearer ${firstUserToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.global).to.eql('you cannot follow yourself');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
