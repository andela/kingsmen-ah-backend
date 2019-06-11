import bcrypt from 'bcrypt';
import models from '../models';
import { validateLogin, validateSignup, updateDetails } from '../validations/auth';
import Token from '../helpers/Token';
import userExtractor from '../helpers/userExtractor';
import { validationResponse, validateUniqueResponse } from '../helpers/validationResponse';
import Response from '../helpers/Response';

const { User, Follower } = models;

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
      const payload = {
        id: user.id,
        email: user.email
      };
      const token = await Token.create(payload);
      return res.status(201).json({ status: 'success', message: 'User created successfully', user: userExtractor(user, token) });
    } catch (err) {
      if (err.isJoi && err.name === 'ValidationError') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err)
        });
      }

      if (err.errors && err.errors[0].type === 'unique violation') {
        return res.status(400).json({
          status: 400,
          errors: validateUniqueResponse(err)
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
    try {
      const logindetails = await validateLogin(req.body);
      const { email, password } = logindetails;
      const user = await User.findOne({
        where: {
          email,
        }
      });
      if (!user) return Response.error(res, 400, 'Invalid email or password');
      const match = await bcrypt.compare(password, user.password);
      if (!match) return Response.error(res, 400, 'Invalid email or password');
      const payload = {
        id: user.id,
        email: user.email
      };
      const token = await Token.create(payload);
      return res.status(200).json({ status: 'success', message: 'User successfully logged in', user: userExtractor(user, token) });
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

  /**
   * Users can follow each other
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof UserController
   * @returns {json} Returns json object
   */
  static async follow(req, res, next) {
    try {
      const { followid } = req.params;
      const { id } = req.decoded;
      if (followid === id) {
        return res.status(400).json({
          status: 400,
          error: 'you cannot follow yourself',
        });
      }
      const userToFollow = await User.findByPk(followid);
      if (!userToFollow) {
        return res.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }
      const [followed, created] = await Follower.findOrCreate({
        where: {
          followerId: id,
          followingId: followid
        },
        defaults: {
          followerId: id,
          followingId: followid
        }
      });
      if (!created) {
        return res.status(400).json({
          status: 400,
          message: 'user was followed already!',
        });
      }
      if (followed) {
        return res.status(201).json({
          status: 201,
          message: 'User followed successfully',
        });
      }
    } catch (err) {
      return next(err);
    }
  }
}

export default UserController;
