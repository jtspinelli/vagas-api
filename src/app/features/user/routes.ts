import { Router } from 'express';
import { createUserController } from './controller';
import { validatePostUser } from './validators';

const userRouter = Router();

userRouter.post('/', validatePostUser, createUserController);

export { userRouter };