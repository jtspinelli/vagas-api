import { Router } from 'express';
import { createUserController } from './controller';

const userRouter = Router();

userRouter.post('/', createUserController);

export { userRouter };