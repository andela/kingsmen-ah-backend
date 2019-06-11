import express from 'express';
import UserController from '../../controllers/users';
import trim from '../../middlewares/trim';
import Authorization from '../../middlewares/Authorization';
const userRoutes = express.Router();

userRoutes.get('/user', UserController.getUserDetails);
userRoutes.put('/user', trim, UserController.updateUser);
userRoutes.post('/login', trim, UserController.login);
userRoutes.post('/register', trim, UserController.create);
userRoutes.post('/logout', Authorization.authorize, UserController.logout);

export default userRoutes;
