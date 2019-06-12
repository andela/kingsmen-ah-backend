import express from 'express';
import ArticlesController from '@controllers/articles';
import Token from '@helpers/Token';

const articlesRoutes = express.Router();

articlesRoutes.post('/articles', Token.authorize, ArticlesController.create);

export default articlesRoutes;
