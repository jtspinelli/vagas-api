import { Router } from 'express';
import { createUserController, getUsersController } from './controller';
import { checkGetUsersQueryParams, validateCreateUser } from './validators';
import { authenticationMiddleware } from '../../shared/middlewares/authenticationMiddleware';

const userRouter = Router();

userRouter.use('/', authenticationMiddleware);
userRouter.get('/', checkGetUsersQueryParams, getUsersController);
userRouter.post('/', validateCreateUser, createUserController);

export { userRouter };