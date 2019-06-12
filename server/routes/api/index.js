import express from 'express';
import userRoutes from './users';
import Token from '../../helpers/Token';
import UserController from '../../controllers/users';

const apiRoutes = express.Router();

apiRoutes.use('/auth', userRoutes);
apiRoutes.use('/users/:followid/follow', Token.authorize, UserController.follow);

export default apiRoutes;
