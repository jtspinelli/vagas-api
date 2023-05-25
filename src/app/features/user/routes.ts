import { Router } from 'express';
import { createUserController } from './controller';
import { validateCreateUser } from './validators';

const userRouter = Router();

userRouter.post('/', validateCreateUser, createUserController);

export { userRouter };