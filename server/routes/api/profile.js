import { Router } from 'express';
import Token from '@helpers/Token';
import ProfileController from '@controllers/profile';
import isUserVerified from '@middlewares/isVerified';

const profileRoute = Router();

profileRoute.post('/:username/follow', Token.authorize, isUserVerified, ProfileController.follow);
profileRoute.delete('/:username/follow', Token.authorize, isUserVerified, ProfileController.unfollow);
profileRoute.get('/:username', ProfileController.getProfile);

export default profileRoute;
