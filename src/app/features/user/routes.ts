import { Router } from 'express';
import { createUserController, getUsersController, getVagasAplicadasController } from './controller';
import { checkGetUsersQueryParams, validateCreateUser, validateGetVagasAplicadas } from './validators';
import { authenticationMiddleware } from '../../shared/middlewares/authenticationMiddleware';

const userRouter = Router();

userRouter.use('/', authenticationMiddleware);
userRouter.get('/', checkGetUsersQueryParams, getUsersController);
userRouter.post('/', validateCreateUser, createUserController);
userRouter.get('/:id/vagasaplicadas', validateGetVagasAplicadas, getVagasAplicadasController);

export { userRouter };