import models from '@models';
import { validateArticle } from '@validations/auth';
import { validationResponse } from '@helpers/validationResponse';

const { Article } = models;

/**
 * @exports ArticlesController
 * @class ArticlesController
 * @description Handles creation, modification, reading and deletion of Articles
 * */
class ArticlesController {
  /**
  * Create a new user
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async create(req, res, next) {
    try {
      const articleDetails = await validateArticle(req.body);
      const { id: userId } = req.decoded;
      const { title } = articleDetails;
      const createArticleDetails = {
        slug: title, userId, ...articleDetails
      };

      const createdArticle = await Article.create(createArticleDetails);
      const { dataValues: article } = createdArticle;
      return res.status(201).json({ status: 'success', message: 'Article created successfully', article });
    } catch (err) {
      if (err.isJoi && err.name === 'ValidationError') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err)
        });
      }
      next(err);
    }
  }
}

export default ArticlesController;
