import { Router } from 'express';
import { createVagaController, listVagasController } from './controller';
import { validateCreateVaga } from './validators';
import { authenticationMiddleware } from '../../shared/middlewares/authenticationMiddleware';

const vagaRouter = Router();

vagaRouter.use('/', authenticationMiddleware);
vagaRouter.get('/', listVagasController);
vagaRouter.post('/', validateCreateVaga, createVagaController);

export { vagaRouter };