import { Router } from 'express';
import { listVagasController } from './controller';

const vagaRouter = Router();

// vagaRouter.use('/', authenticationMiddleware);
vagaRouter.get('/', listVagasController);

export { vagaRouter };