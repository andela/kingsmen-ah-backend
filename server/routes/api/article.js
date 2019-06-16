import express from 'express';
import trim from '@middlewares/trim';
import Token from '@helpers/Token';
import CommentController from '@controllers/comment';

const articleRouter = express.Router();

articleRouter.post('/:slug/comment', Token.authorize, trim, CommentController.create);
articleRouter.get('/:slug/comment', Token.authorize, CommentController.getComments);
articleRouter.put('/:articleId/comment/:id', Token.authorize, trim, CommentController.updateComment);
articleRouter.delete('/:articleId/comment/:id', Token.authorize, CommentController.deleteComment);

export default articleRouter;
