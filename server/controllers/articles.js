import models from '@models';
import { validateArticle } from '@validations/auth';
import { validationResponse } from '@helpers/validationResponse';
import Response from '@helpers/Response';
import articlePayload from '@helpers/articlePayload';

const { Article, User } = models;

/**
 * @exports ArticleController
 * @class ArticleController
 * @description Handles creation, modification, reading and deletion of Articles
 * */
class ArticleController {
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
      const { slug } = createdArticle.dataValues;
      const payload = await ArticleController.findArticle({ slug });

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
      const { slug: updatedSlug } = req.params;

      const user = await User.findByPk(userId);
      const getArticle = await Article.findOne({ where: { slug: updatedSlug } });

      const canUpdate = await user.hasArticle(getArticle);


      if (!getArticle) {
        return Response.error(res, 404, 'Article does not exist');
      }

      if (!canUpdate) {
        return Response.error(res, 401, 'You do not have permission to update this article!');
      }

      const updateArticle = await getArticle.update(articleDetails);
      const { slug } = updateArticle.dataValues;
      const payload = await ArticleController.findArticle({ slug });

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
      const { id: userId } = req.decoded;

      const getArticle = await Article.findOne({ where: { slug } });

      if (!getArticle) {
        return Response.error(res, 404, 'Article does not exist');
      }

      const deletedArticle = await Article.destroy({ where: { slug, userId } });

      if (!deletedArticle) {
        return Response.error(res, 401, 'You do not have permission to delete this article!');
      }

      return res.status(200).json({ status: 'success', message: 'Article successfully deleted' });
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
      const getAllArticles = await ArticleController.findAllArticle();
      const payload = getAllArticles;
      return res.status(200).json({ status: 'success', message: 'Articles successfully retrieved', payload });
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
  static async getOne(req, res, next) {
    try {
      const { slug } = req.params;
      const payload = await ArticleController.findArticle({ slug });
      return res.status(200).json({ status: 'success', message: 'Article successfully retrieved', payload });
    } catch (err) {
      next(err);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} { articleId, slug }
   * @returns {object} article details
   * @memberof ArticleController
   */
  static async findArticle({ articleId, slug }) {
    articlePayload.where = articleId || slug;

    return Article.findOne({
      articlePayload
    });
  }

  /**
 *
 *
 * @static
 * @param {*} { articleId, slug }
 * @returns {object} finds all articles
 * @memberof ArticleController
 */
  static async findAllArticle() {
    delete articlePayload.where;
    return Article.findAll({
      articlePayload
    });
  }
}

export default ArticleController;
