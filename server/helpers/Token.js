import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
/**
 * @class Token
 */
class Token {
  /**
   * @static
   * @param {payload} payload object
   * @returns {string} returns the token
   * @memberof Token
   */
  static async create(payload) {
    const { id, email } = payload;
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
      const verifiedToken = await jwt.verify(token, process.env.SECRET);
      if (!verifiedToken) {
        return res.status(401).json({
          status: 401,
          errors: {
            global: 'Token cannot be verified!',
          }
        });
      }
      req.decoded = verifiedToken;
      return next();
    } catch (err) {
      next(err);
    }
  }
}
export default Token;
