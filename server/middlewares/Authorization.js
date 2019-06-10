import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import models from '../models';

config();

const { User, DroppedToken } = models;

/**
 * Middleware to check user access
 * @exports UserController
 * @class Authorization
 */
class Authorization {
  /**
    * Get token from req
    * @param  {object} req - Request object
    * @returns {string} token
    * @static
    */
  static getToken(req) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.replace('Bearer ', '');

    return token;
  }

  /**
    * Handles authorization of users
    * @async
    * @param  {object} req - Request object
    * @param {object} res - Response object
    * @param {object} next The next middleware
    * @return {json} Returns json object
    * @static
    */
  static async authorize(req, res, next) {
    const token = Authorization.getToken(req);

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid Token Provided'
        });
      }

      const droppedToken = await DroppedToken.findOne({
        where: {
          token
        }
      });
      if (droppedToken) {
        return res.status(401).json({
          status: 401,
          error: 'This token has been dropped'
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error
      });
    }
  }
}

export default Authorization;
