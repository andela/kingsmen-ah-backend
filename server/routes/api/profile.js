import { Router } from 'express';
import Token from '@helpers/Token';
import UserController from '@controllers/users';
import ProfileController from '@controllers/profile';

const profileRoute = Router();

profileRoute.post('/:username/follow', Token.authorize, UserController.follow);
profileRoute.delete('/:username/follow', Token.authorize, UserController.unfollow);
profileRoute.get('/:username', ProfileController.getProfile);

export default profileRoute;
