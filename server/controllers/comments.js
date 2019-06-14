import models from '@models';
import validateComment from '@validations/index';

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
      const body = await validateComment(req.body);
      const { slug, articleId } = req.params;
      const { userId } = req.decoded;

      const article = await Article.findOne({
        where: { slug }
      });

      if (!article) return Response.error(res, 404, 'Article does not exist');

      const comment = { userId, articleId, body };

      const result = await Article.createComment(comment);

      if (result) {
        return res.status(201).json({
          status: 201,
          message: 'Comment added successfully.',
          result
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default CommentController;
