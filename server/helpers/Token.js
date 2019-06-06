import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
/**
 * @class Token
 */
class Token {
  /**
   * @static
   * @param {user} user object from the database
   * @returns {string} returns thetoken
   * @memberof Token
   */
  static async create(user) {
    const { id, email } = user;
    const token = await jwt.sign({
      userId: id,
      email,
    }, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE || '1d'
    });
    return token;
  }

  /**
   * @static
   * @param {*} req the request object
   * @param {*} res the response object
   * @param {*} next middleware
   * @returns {function} next
   * @memberof Token
   */
  static async verifyToken(req, res, next) {
    try {
      const { token } = req.headers;
      if (typeof token === 'undefined') {
        return res.status(400).json({
          status: 400,
          errors: {
            global: 'No token provided!',
          }
        });
      }
      const validToken = await jwt.verify(token, process.env.SECRET);
      if (!validToken) {
        return res.status(401).json({
          status: 401,
          errors: {
            global: 'Token cannot be verified!',
          }
        });
      }
      req.decoded = validToken;
      return next();
    } catch (err) {
      next(err);
    }
  }
}
export default Token;
