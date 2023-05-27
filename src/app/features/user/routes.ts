import { Router } from 'express';
import { createUserController, getUsersController } from './controller';
import { validateCreateUser } from './validators';

const userRouter = Router();

userRouter.get('/', getUsersController);
userRouter.post('/', validateCreateUser, createUserController);

export { userRouter };