import express from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import userRouter from './users';

const apiRouter = express.Router();

apiRouter.get('/', (request, response) => response.status(200).send('Welcome to the Authors Haven API'));

apiRouter.use('/auth', authRouter);
apiRouter.use('/profiles', profileRouter);
apiRouter.use('/users', userRouter);

export default apiRouter;
