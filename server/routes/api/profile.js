import { Router } from 'express';
import Token from '@helpers/Token';
import UserController from '@controllers/users';

const profileRoutes = Router();

profileRoutes.post('/:username/follow', Token.authorize, UserController.follow);
profileRoutes.delete('/:username/follow', Token.authorize, UserController.unfollow);

export default profileRoutes;
