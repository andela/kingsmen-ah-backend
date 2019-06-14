import express from 'express';
import ArticlesController from '@controllers/articles';
import Token from '@helpers/Token';

const articlesRoutes = express.Router();

articlesRoutes.get('/articles', ArticlesController.getAll);
articlesRoutes.post('/articles', Token.authorize, ArticlesController.create);
articlesRoutes.put('/articles/:slug', Token.authorize, ArticlesController.update);
articlesRoutes.delete('/articles/:slug', Token.authorize, ArticlesController.delete);

export default articlesRoutes;
