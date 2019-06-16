import express from 'express';
import userRouter from './users';
import authRouter from './auth';
import profileRoute from './profile';
import articleRouter from './article';

const apiRouter = express.Router();

apiRouter.get('/', (request, response) => response.status(200).send('Welcome to the Authors Haven API'));

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/profiles', profileRoute);

export default apiRouter;
