import { Router } from 'express';
import { createVagaController, getCandidatosController, listVagasController } from './controller';
import { checkGetVagasQueryParams, validateCreateVaga, validateGetCandidatos } from './validators';
import { authenticationMiddleware } from '../../shared/middlewares/authenticationMiddleware';

const vagaRouter = Router();

vagaRouter.use('/', authenticationMiddleware);
vagaRouter.get('/', checkGetVagasQueryParams, listVagasController);
vagaRouter.post('/', validateCreateVaga, createVagaController);
vagaRouter.get('/:id/candidatos', validateGetCandidatos, getCandidatosController);

export { vagaRouter };