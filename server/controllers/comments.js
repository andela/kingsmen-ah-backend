import models from '@models';
import validateComment from '@validations/index';
import { validationResponse } from '@helpers/validationResponse';
import Response from '@helpers/Response';

const { Comment, Article } = models;

/**
 * @exports CommentController
 * @class CommentController
 * @description Handles the comment section
 */
class CommentController {
  /**
   * Create new comment
   * @static
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Middleware
   * @return {json} - Returns json Object
   * @memberof CommentController
   * @static
   */
  static async create(req, res, next) {
    try {
      const data = await validateComment(req.body);
      const body = data.comment;
      const { slug } = req.params;
      const userId = req.decoded.id;

      const article = await Article.findOne({ where: { slug } });

      if (!article) return Response.error(res, 404, 'Article does not exist');

      const comment = await article.createComment({ userId, slug, body });

      const payload = await Comment.findOne({
        attributes: ['id', 'createdAt', 'updatedAt', 'body'],
        where: {
          id: comment.id
        },
        include: [{
          model: models.User,
          attributes: ['username'],
          where: { id: userId },
          include: [{
            model: models.Profile,
            as: 'profile',
            attributes: ['bio', 'avatar']
          }]
        }]
      });

      if (comment) {
        return res.status(201).json({
          status: 201,
          message: 'Comment added successfully.',
          payload
        });
      }
    } catch (error) {
      if (error.isJoi && error.name === 'ValidationError') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(error)
        });
      }

      return next(error);
    }
  }

  /**
   * Get all comments
   * @static
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Middleware
   * @return {json} - Returns json Object
   * @memberof CommentController
   * @static
   */
  static async getComments(req, res, next) {
    try {
      const { slug } = req.params;
      const userId = req.decoded.id;

      const article = await Article.findOne({ where: { slug } });

      if (!article) return Response.error(res, 404, 'Article does not exist');

      const payload = await Comment.findAndCountAll({
        attributes: ['id', 'createdAt', 'updatedAt', 'body'],
        where: {
          articleId: article.id
        },
        include: [{
          model: models.User,
          attributes: ['username'],
          where: { id: userId },
          include: [{
            model: models.Profile,
            as: 'profile',
            attributes: ['bio', 'avatar']
          }]
        }]
      });

      if (payload) {
        return res.status(200).json({
          status: 200,
          message: 'Comments retrieved successfully.',
          payload
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update a comment
   * @static
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Middleware
   * @return {json} - Returns json Object
   * @memberof CommentController
   * @static
   */
  static async updateComment(req, res, next) {
    try {
      const data = await validateComment(req.body);
      const body = data.comment;
      const { articleId, id } = req.params;

      const userId = req.decoded.id;

      const oldComment = await Comment.findOne({
        where: { id, userId, articleId }
      });

      if (!oldComment) return Response.error(res, 404, 'Comment does not exist');

      const comment = await Comment.update(
        { body },
        { returning: true, where: { id, userId, articleId } }
      );

      const payload = await Comment.findOne({
        attributes: ['id', 'createdAt', 'updatedAt', 'body'],
        where: { id },
        include: [{
          model: models.User,
          attributes: ['username'],
          where: { id: userId },
          include: [{
            model: models.Profile,
            as: 'profile',
            attributes: ['bio', 'avatar']
          }]
        }]
      });

      if (comment) {
        return res.status(200).json({
          status: 200,
          message: 'Comment updated successfully.',
          payload
        });
      }
    } catch (error) {
      if (error.isJoi && error.name === 'ValidationError') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(error)
        });
      }
      return next(error);
    }
  }

  /**
   * Delete a comment
   * @static
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Middleware
   * @return {json} - Returns json Object
   * @memberof CommentController
   * @static
   */
  static async deleteComment(req, res, next) {
    try {
      const { articleId, id } = req.params;
      const userId = req.decoded.id;

      const oldComment = await Comment.findOne({
        where: { id, userId, articleId }
      });

      if (!oldComment) return Response.error(res, 404, 'Comment does not exist');

      const comment = await Comment.destroy({
        where: { id, userId, articleId }
      });

      if (comment) {
        return res.status(200).json({
          status: 200,
          message: 'Comment deleted successfully.'
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default CommentController;
