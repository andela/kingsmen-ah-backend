import express from 'express';
import userRoutes from './users';
import profileRoutes from './profile';

const apiRoutes = express.Router();

apiRoutes.use('/auth', userRoutes);
apiRoutes.use('/profile', profileRoutes);

export default apiRoutes;
