import sinon from 'sinon';
import chai from 'chai';
import { validateArticle } from '@validations/auth';
import validateRatings from '@validations/rating';
import { findAllArticle, extractArticle } from '@helpers/articlePayload';
import ArticleController from '@controllers/articles';

const { expect } = chai;


describe('ArticleController', () => {
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should handle creation of new articles', async () => {
    const stubFunc = { validateArticle };
    sandbox.stub(stubFunc, 'validateArticle').rejects('Oops');

    const next = sinon.spy();
    await ArticleController.create({}, {}, next);
    sinon.assert.calledOnce(next);
  });

  it('should handle update of articles', async () => {
    const stubFunc = { validateArticle };
    sandbox.stub(stubFunc, 'validateArticle').rejects('Oops');

    const next = sinon.spy();
    await ArticleController.update({}, {}, next);
    sinon.assert.calledOnce(next);
  });

  it('should handle rating of articles', async () => {
    const stubFunc = { validateRatings };
    sandbox.stub(stubFunc, 'validateRatings').rejects('Oops');

    const next = sinon.spy();
    await ArticleController.rate({}, {}, next);
    sinon.assert.calledOnce(next);
  });

  it('should handle no slug passed to delete article', async () => {
    const next = sinon.spy();
    await ArticleController.delete({}, {}, next);
    sinon.assert.calledOnce(next);
  });

  it('should handle no slug passed to get one article', async () => {
    const next = sinon.spy();
    await ArticleController.getOne({}, {}, next);
    sinon.assert.calledOnce(next);
  });

  it('should handle cannot get all articles', async () => {
    const stubFunc = { findAllArticle };
    sandbox.stub(stubFunc, 'findAllArticle').rejects('Oops');

    const next = sinon.spy();
    await ArticleController.getAll({}, {}, next);
    sinon.assert.calledOnce(next);
  });

  it('should handle error for getting all ratings', async () => {
    const next = sinon.spy();
    await ArticleController.getArticleRatings({}, {}, next);
    sinon.assert.calledOnce(next);
  });

  it('should return specified article attributes', (done) => {
    const articleMock = {
      id: '47a4169a-925e-4fca-a3f2-74e44f4aa2c7',
      slug: 'test-article-7570a315',
      title: 'Title Changed',
      body: 'Body Changed',
      image: null,
      createdAt: '2019-06-20T20:11:18.314Z',
      updatedAt: '2019-06-20T20:15:20.598Z',
      averageRating: null,
      author: {
        id: 'fcdb7cb7-4adf-426f-bcbc-58f808c85146',
        username: 'gerrardezeugwa',
        profile: {
          firstname: null,
          lastname: null,
          bio: null,
          avatar: null
        }
      },
      invalidKey: 'This should not be returned',
    };
    const get = () => articleMock;
    const articles = [{ ...articleMock, get }];

    const filteredArticle = extractArticle(articles);
    expect(filteredArticle[0]).to.be.an('object');
    expect(filteredArticle[0]).to.have.property('id');
    expect(filteredArticle[0]).to.not.have.property('invalidKey');
    done();
  });
});
