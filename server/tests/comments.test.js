import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { createTestUser, generateToken } from './factory/user-factory';
import createTestArticle from './factory/article-factory';
import createTestComment from './factory/comment-factory';

let userToken, slug, articleId, testArticle, testComment;
chai.use(chaiHttp);
const { expect } = chai;

describe('TESTS TO CREATE A COMMENT', () => {
  before(async () => {
    const testUser = await createTestUser({});
    const { id } = testUser;
    userToken = await generateToken({ id });

    testArticle = await createTestArticle(id, {});
    slug = testArticle.slug;
    articleId = testArticle.id;

    testComment = await createTestComment({}, id, articleId);
  });
  it('should return `comment is required` if comment is blank ', (done) => {
    try {
      chai.request(app)
        .post(`/api/v1/articles/${slug}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.comment).to.eql('commentis required');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return `Article does not exist` if article doesnt exist', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/articles/book/comment')
        .send({ comment: 'This is beautiful' })
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.eql('Article does not exist');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return `Comment added successfully.` ', (done) => {
    try {
      chai.request(app)
        .post(`/api/v1/articles/${slug}/comment`)
        .send({ comment: testComment.body })
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Comment added successfully.');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO GET ALL COMMENTS ON AN ARTICLE', () => {
  it('should return `Comments retrieved successfully.` ', (done) => {
    try {
      chai.request(app)
        .get(`/api/v1/articles/${slug}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Comments retrieved successfully.');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO UPDATE A COMMENT', () => {
  it('should return `comment is required` if comment is blank ', (done) => {
    try {
      chai.request(app)
        .put(`/api/v1/articles/${articleId}/comment/${testComment.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.comment).to.eql('commentis required');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return `Comment does not exist` if comment doesnt exist', (done) => {
    try {
      chai.request(app)
        .put(`/api/v1/articles/book/comment/${testComment.id}`)
        .send({ comment: 'This is beautiful' })
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.eql('Comment does not exist');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return `Comment updated successfully.` ', (done) => {
    try {
      chai.request(app)
        .put(`/api/v1/articles/${articleId}/comment/${testComment.id}`)
        .send({ comment: 'This is not beautiful' })
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.an('object');
          expect(res.body.message).to.eql('Comment updated successfully.');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO DELETE A COMMENT', () => {
  it('should return `Comment deleted successfully.` ', (done) => {
    try {
      chai.request(app)
        .delete(`/api/v1/articles/${articleId}/comment/${testComment.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.eql('Comment deleted successfully.');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
