import { Router } from 'express';
import Token from '@helpers/Token';
import UserController from '@controllers/users';

const profileRoutes = Router();

profileRoutes.post('/:username/follow', Token.authorize, UserController.follow);

export default profileRoutes;
