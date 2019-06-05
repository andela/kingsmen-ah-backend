import bcrypt from 'bcrypt';
import models from '../models';
import { validateLogin, validateSignup, updateDetails } from '../validations/auth';
import Token from '../helpers/Token';
import userExtractor from '../helpers/userExtractor';

const { User } = models;

/**
 * @exports UserController
 * @class UserController
 * @description Handles Social Users
 * */
class UserController {
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
      const userDetails = await validateSignup(req.body);
      const user = await User.create(userDetails);
      // Create a token off the payload
      const token = await Token.create(user);
      return res.status(201).json({ status: 'success', message: 'User created successfully', user: userExtractor(user, token) });
    } catch (err) {
      if (err.isJoi && err.name === 'ValidationError') {
        return res.status(400).json({
          status: 400,
          errors: err.details.reduce((result, currentValue) => {
            if (!Object.hasOwnProperty.call(result, currentValue.context.key)) {
              result[currentValue.context.key] = currentValue.message;
            }
            return result;
          }, {})
        });
      }

      if (err.errors && err.errors[0].type === 'unique violation') {
        return res.status(400).json({
          status: 400,
          errors: err.errors.reduce((result, currentValue) => {
            if (result.type === 'unique violation') {
              result[currentValue.path] = `${currentValue.path} has already been taken`;
            } else if (currentValue.path) {
              result[currentValue.path] = currentValue.message;
            } else {
              result.global = currentValue.message;
            }
            return result;
          }, {})
        });
      }
      next(err);
    }
  }

  /**
  * Login and Authenticate user.
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async login(req, res, next) {
    const { error } = validateLogin(req.body);
    if (error !== null) {
      const errorValue = error.details[0].message.replace(/\"/g, '');
      return res.status(400).json({ status: 400, error: errorValue });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        }
      });
      if (!user) return res.status(400).json({ status: 400, error: 'Invalid email or password' });
      // verify password
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ status: 400, error: 'Invalid email or password' });
      const token = await Token.create(user);
      return res.status(200).json({ status: 'success', message: 'User successfully logged in', user: userExtractor(user, token) });
    } catch (err) {
      next(err);
    }
  }

  /**
  * Update user details
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async updateUser(req, res, next) {
    try {
      const { error } = updateDetails(req.body);
      if (error !== null) {
        const errorValue = error.details[0].message.replace(/\"/g, '');
        return res.status(400).json({ status: 400, error: errorValue });
      }

      const {
        username, email, bio, image, password
      } = req.body;

      const user = await User.findByPk(req.payload.id);

      if (!user) return res.status(400).json({ status: 400, message: 'User does not exists' });

      const updatedUserDetails = await user.update({
        username: username || user.username,
        email: email.toLowerCase() || user.email,
        bio: bio || user.bio,
        image: image || user.image,
        password: password || user.password
      });

      return res.send({ status: 'success', user: updatedUserDetails });
    } catch (err) {
      next(err);
    }
  }

  /**
  * Get user details
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async getUserDetails(req, res, next) {
    try {
      const user = await User.findByPk(req.payload.id);

      if (!user) {
        return res.sendStatus(400);
      }

      return res.send({ status: 'success', user });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
