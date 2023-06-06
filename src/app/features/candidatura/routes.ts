import { Router } from 'express';
import { createCandidaturaController } from './controller';
import { validateCreateCandidatura } from './validators';
import { authenticationMiddleware } from '../../shared/middlewares/authenticationMiddleware';

const candidaturaRouter = Router();

candidaturaRouter.use('/', authenticationMiddleware);
candidaturaRouter.post('/', validateCreateCandidatura, createCandidaturaController);

export { candidaturaRouter };