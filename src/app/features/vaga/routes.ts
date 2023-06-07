import { Router } from 'express';
import { ativarVagaController, createVagaController, deleteVagaController, desativarVagaController, getCandidatosController, listVagasController } from './controller';
import { checkGetVagasQueryParams, validateAtivarVaga, validateCreateVaga, validateDeleteVaga, validateDesativarVaga, validateGetCandidatos } from './validators';
import { authenticationMiddleware } from '../../shared/middlewares/authenticationMiddleware';

const vagaRouter = Router();

vagaRouter.use('/', authenticationMiddleware);
vagaRouter.get('/', checkGetVagasQueryParams, listVagasController);
vagaRouter.post('/', validateCreateVaga, createVagaController);
vagaRouter.get('/:id/candidatos', validateGetCandidatos, getCandidatosController);
vagaRouter.patch('/:id/desativar', validateDesativarVaga, desativarVagaController);
vagaRouter.patch('/:id/ativar', validateAtivarVaga, ativarVagaController);
vagaRouter.delete('/:id', validateDeleteVaga, deleteVagaController);

export { vagaRouter };