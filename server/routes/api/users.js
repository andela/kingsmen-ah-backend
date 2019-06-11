import express from 'express';
import UserController from '../../controllers/users';
import Token from '../../helpers/Token';
import trim from '../../middlewares/trim';

const userRoutes = express.Router();

userRoutes.get('/user', UserController.getUserDetails);
userRoutes.put('/user', trim, UserController.updateUser);
userRoutes.post('/auth/login', trim, UserController.login);
userRoutes.post('/auth/register', trim, UserController.create);

// Get all users and their corresponding profile
userRoutes.get('/users', Token.verifyToken, UserController.getUsers);

export default userRoutes;
