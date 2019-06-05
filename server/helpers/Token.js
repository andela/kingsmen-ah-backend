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
    }, process.env.SECRET);
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
    const { token } = req.headers;
    if (typeof token === 'undefined') return res.status(400).json();
    const validToken = await jwt.verify(token, process.env.SECRET);
    if (!validToken) return res.status(401).json();
    req.validToken = validToken;
    return next();
  }
}
export default Token;
