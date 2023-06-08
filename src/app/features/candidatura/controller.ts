import { Request, Response } from 'express';
import { CandidaturaRepository } from './repository';
import { CreateCandidaturaUseCase } from './usecases/createCandidatura/createCandidaturaUseCase';

export const createCandidaturaController = async (req: Request, res: Response) => {
	const candidaturaRepository = new CandidaturaRepository();
	const createCandidaturaUsecase = new CreateCandidaturaUseCase(candidaturaRepository);
	
	const savedCandidatura = await createCandidaturaUsecase.execute(req.body.authenticatedUser, req.body.vagaId);

	return savedCandidatura
		? res.status(201).json(savedCandidatura.toJson())
		: res.status(500).send({message: 'Ocorreu algum erro.'});
};