import models from '@models';
import { validateArticle } from '@validations/auth';
import { validationResponse } from '@helpers/validationResponse';
import Response from '@helpers/Response';

const { Article, User } = models;

/**
 * @exports ArticlesController
 * @class ArticlesController
 * @description Handles creation, modification, reading and deletion of Articles
 * */
class ArticlesController {
  /**
  * Create a new article
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
      const { dataValues: payload } = createdArticle;
      return res.status(201).json({ status: 'success', message: 'Article created successfully', payload });
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

  /**
  * Updates an article
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async update(req, res, next) {
    try {
      const articleDetails = await validateArticle(req.body);
      const { id: userId } = req.decoded;
      const { slug } = req.params;

      const user = await User.findByPk(userId);
      const getArticle = await Article.findOne({ where: { slug } });

      const canUpdate = await user.hasArticle(getArticle);


      if (!getArticle) {
        return Response.error(res, 404, 'Article does not exist');
      }

      if (!canUpdate) {
        return Response.error(res, 401, 'You do not have permission to update this article!');
      }

      const updateArticle = await getArticle.update(articleDetails);

      const { dataValues: payload } = updateArticle;
      return res.status(200).json({ status: 'success', message: 'Article successfully updated', payload });
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

  /**
  * Deletes an article
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async delete(req, res, next) {
    try {
      const { slug } = req.params;

      const deletedArticle = await Article.destroy({ where: { slug } });

      if (!deletedArticle) {
        return Response.error(res, 404, 'Article does not exist');
      }
      const { dataValues: payload } = deletedArticle;
      return res.status(200).json({ status: 'success', message: 'Article successfully deleted', payload });
    } catch (err) {
      next(err);
    }
  }

  /**
  * Gets an article
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async getAll(req, res, next) {
    try {
      const getAllArticles = await Article.findAll();
      const payload = getAllArticles;
      return res.status(200).json({ status: 'success', message: 'Articles successfully retrieved', payload });
    } catch (err) {
      next(err);
    }
  }
}

export default ArticlesController;
