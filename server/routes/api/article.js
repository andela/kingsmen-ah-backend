import express from 'express';
import trim from '@middlewares/trim';
import Token from '@helpers/Token';
import CommentController from '@controllers/comments';

const articleRouter = express.Router();

articleRouter.post('article/:slug/comment', trim, Token.authorize, CommentController.create);

export default articleRouter;
