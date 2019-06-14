import express from 'express';
import ArticleController from '@controllers/articles';
import Token from '@helpers/Token';

const articlesRoutes = express.Router();

articlesRoutes.get('/', ArticleController.getAll);
articlesRoutes.get('/:slug', ArticleController.getOne);
articlesRoutes.post('/', Token.authorize, ArticleController.create);
articlesRoutes.put('/:slug', Token.authorize, ArticleController.update);
articlesRoutes.delete('/:slug', Token.authorize, ArticleController.delete);

export default articlesRoutes;
