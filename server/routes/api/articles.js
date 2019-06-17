import express from 'express';
import Token from '@helpers/Token';
import ArticleController from '@controllers/articles';
import trim from '@middlewares/trim';
import CommentController from '@controllers/comment';

const articleRoutes = express.Router();

articleRoutes.post('/:slug/rate', trim, Token.authorize, ArticleController.rate);
articleRoutes.post('/:slug/comment', Token.authorize, trim, CommentController.create);
articleRoutes.get('/:slug/comment', Token.authorize, CommentController.getComments);
articleRoutes.put('/:articleId/comment/:id', Token.authorize, trim, CommentController.updateComment);
articleRoutes.delete('/:articleId/comment/:id', Token.authorize, CommentController.deleteComment);

export default articleRoutes;
