import { Router } from 'express';
import { createUserController, getUsersController } from './controller';
import { checkGetUsersQueryParams, validateCreateUser } from './validators';

const userRouter = Router();

userRouter.get('/', checkGetUsersQueryParams, getUsersController);
userRouter.post('/', validateCreateUser, createUserController);

export { userRouter };