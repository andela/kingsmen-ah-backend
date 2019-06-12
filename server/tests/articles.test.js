import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import models from '@models';
import generateToken from './factory/userFactory';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

let userToken;

describe('TESTS TO CREATE AN ARTICLES', () => {
  before(async () => {
    const newUser = await models.User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });
    userToken = await generateToken({ id: newUser.id });
  });

  it('should create an article successfully', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: faker.lorem.words(),
          body: faker.lorem.sentences()
        })
        .end((err, res) => {
          const returnStatus = 'success';
          expect(res.status).to.equal(201);
          expect(res.body.article).to.be.an('object');
          expect(res.body.article.title).to.be.a('string');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.eql(returnStatus);
          expect(res.body).to.have.property('status', returnStatus);
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return body is not allowed to be empty ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: faker.lorem.words(),
          body: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.body).to.eql('body is not allowed to be empty');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return title is not allowed to be empty ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: '',
          body: faker.lorem.sentences()
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.title).to.eql('title is not allowed to be empty');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
