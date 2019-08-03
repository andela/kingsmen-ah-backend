import express from 'express';
import Token from '@helpers/Token';
import userRouter from './users';
import authRouter from './auth';
import articleRouter from './articles';
import profileRoute from './profile';
import tagsRoute from './tags';

const apiRouter = express.Router();

apiRouter.get('/', (request, response) => response.status(200).send('Welcome to the Authors Haven API'));

apiRouter.use(Token.authorize);

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/profiles', profileRoute);
apiRouter.use('/tags', tagsRoute);

export default apiRouter;
