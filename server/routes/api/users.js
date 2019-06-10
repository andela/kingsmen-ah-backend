import express from 'express';
import UserController from '../../controllers/users';
import trim from '../../middlewares/trim';

const userRoutes = express.Router();

userRoutes.get('/user', UserController.getUserDetails);
userRoutes.put('/user', trim, UserController.updateUser);
userRoutes.post('/login', trim, UserController.login);
userRoutes.post('/register', trim, UserController.create);

// Get all Users and their corresponding profile
userRoutes.get('/users', UserController.getUsers);

export default userRoutes;
