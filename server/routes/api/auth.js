import express from 'express';
import authorizeAccess from '@middlewares/authorizeAccess';
import trim from '@middlewares/trim';
import UserController from '@controllers/users';


const authRouter = express.Router();

authRouter.post('/login', trim, UserController.login);

authRouter.post('/logout', authorizeAccess, UserController.logout);

export default authRouter;
