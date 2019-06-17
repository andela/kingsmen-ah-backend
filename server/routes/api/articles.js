import express from 'express';
import ArticleController from '@controllers/articles';
import Token from '@helpers/Token';
import trim from '@middlewares/trim';
import CommentController from '@controllers/comment';

const articlesRouter = express.Router();

articlesRouter.post('/:slug/rate', trim, Token.authorize, ArticleController.rate);
articlesRouter.post('/:slug/comment', Token.authorize, trim, CommentController.create);
articlesRouter.get('/:slug/comment', Token.authorize, CommentController.getComments);
articlesRouter.put('/:articleId/comment/:id', Token.authorize, trim, CommentController.updateComment);
articlesRouter.delete('/:articleId/comment/:id', Token.authorize, CommentController.deleteComment);
articlesRouter.get('/', ArticleController.getAll);
articlesRouter.get('/:slug', ArticleController.getOne);
articlesRouter.post('/', Token.authorize, ArticleController.create);
articlesRouter.put('/:slug', Token.authorize, ArticleController.update);
articlesRouter.delete('/:slug', Token.authorize, ArticleController.delete);
articlesRouter.post('/:slug/rate', trim, Token.authorize, ArticleController.rate);

export default articlesRouter;
