import express from 'express';
import ArticleController from '@controllers/articles';
import Token from '@helpers/Token';
import trim from '@middlewares/trim';
import CommentController from '@controllers/comments';
import articleFinder from '@middlewares/articleFinder';
import isUserVerified from '@middlewares/isVerified';
import { find, commentFinder } from '@middlewares/commentFinder';

const articlesRouter = express.Router();

articlesRouter.post('/:slug/rate', trim, Token.authorize, isUserVerified, ArticleController.rate);
articlesRouter.post('/:slug/comments', Token.authorize, isUserVerified, trim, articleFinder, CommentController.create);
articlesRouter.get('/:slug/comments', Token.authorize, articleFinder, CommentController.getComments);
articlesRouter.put('/:slug/comments/:id', Token.authorize, isUserVerified, trim, commentFinder, CommentController.updateComment);
articlesRouter.delete('/:slug/comments/:id', Token.authorize, isUserVerified, commentFinder, CommentController.deleteComment);

articlesRouter.post('/:slug/comments/:id/like', Token.authorize, find, CommentController.likeComment);
articlesRouter.delete('/:slug/comments/:id/like', Token.authorize, find, CommentController.unlikeComment);

articlesRouter.get('/', ArticleController.getAll);
articlesRouter.get('/:slug', ArticleController.getOne);
articlesRouter.post('/', Token.authorize, isUserVerified, ArticleController.create);
articlesRouter.put('/:slug', Token.authorize, isUserVerified, ArticleController.update);
articlesRouter.delete('/:slug', Token.authorize, isUserVerified, ArticleController.delete);

articlesRouter.get('/:slug/rate', ArticleController.getArticleRatings);
articlesRouter.post('/:slug/rate', trim, Token.authorize, ArticleController.rate);

export default articlesRouter;
