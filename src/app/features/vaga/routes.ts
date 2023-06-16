import { Router } from 'express';
import { ativarVagaController, createVagaController, deleteVagaController, desativarVagaController, getCandidatosController, getVagaByIdController, getVagasFullCandidaturasController, getVagasSemCandidaturasController, listVagasController } from './controller';
import { checkGetVagasQueryParams, validateAdminGetVagas, validateAtivarVaga, validateCreateVaga, validateDeleteVaga, validateDesativarVaga, validateGetCandidatos, validateGetVagaById } from './validators';
import { authenticationMiddleware } from '../../shared/middlewares/authenticationMiddleware';

const vagaRouter = Router();

vagaRouter.use('/', authenticationMiddleware);
vagaRouter.get('/', checkGetVagasQueryParams, listVagasController);
vagaRouter.get('/:id', validateGetVagaById, getVagaByIdController);
vagaRouter.get('/semcandidaturas', validateAdminGetVagas, getVagasSemCandidaturasController);
vagaRouter.get('/candidaturasfull', validateAdminGetVagas, getVagasFullCandidaturasController);
vagaRouter.post('/', validateCreateVaga, createVagaController);
vagaRouter.get('/:id/candidatos', validateGetCandidatos, getCandidatosController);
vagaRouter.patch('/:id/desativar', validateDesativarVaga, desativarVagaController);
vagaRouter.patch('/:id/ativar', validateAtivarVaga, ativarVagaController);
vagaRouter.delete('/:id', validateDeleteVaga, deleteVagaController);

export { vagaRouter };