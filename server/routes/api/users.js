import express from 'express';
import Token from '@helpers/Token';
import UserController from '@controllers/users';
import trim from '../../middlewares/trim';

const userRoutes = express.Router();

userRoutes.get('/user', UserController.getUserDetails);
userRoutes.put('/user', trim, UserController.updateUser);
userRoutes.post('/login', trim, UserController.login);
userRoutes.post('/register', trim, UserController.create);
userRoutes.post('/logout', Token.authorize, UserController.logout);
userRoutes.get('/users', Token.authorize, UserController.getUsers);

export default userRoutes;
