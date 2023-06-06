import { Router } from 'express';
import { createVagaController, listVagasController } from './controller';
import { checkGetVagasQueryParams, validateCreateVaga } from './validators';
import { authenticationMiddleware } from '../../shared/middlewares/authenticationMiddleware';

const vagaRouter = Router();

vagaRouter.use('/', authenticationMiddleware);
vagaRouter.get('/', checkGetVagasQueryParams, listVagasController);
vagaRouter.post('/', validateCreateVaga, createVagaController);
// vagaRouter.post('/apply/:vaga_id', validateApplyToVaga, applyToVaga);

export { vagaRouter };