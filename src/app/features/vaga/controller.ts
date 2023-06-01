/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { VagaRepository } from './repository';
import { CreateVagaUsecase } from './usecases/createVagaUsecase/createVagaUsecase';
import { handleControllerError } from '../../shared/exceptions';

export const listVagasController = async (req: Request, res: Response) => {
	try {
		const repository = new VagaRepository();
		const vagas = await repository.getAll(req.query);

		res.status(200).send(vagas);
	} catch (error) {
		res.status(500).send({message: 'Ocorreu um erro.'});
	}
};

export const createVagaController = async (req: Request, res: Response) => {
	try {
		const {authenticatedUser} = req.body;
		const vagaRepository = new VagaRepository();
		const createVagaUsecase = new CreateVagaUsecase(vagaRepository);
		const createdVaga = await createVagaUsecase.execute(req.body, authenticatedUser);

		return res.send(createdVaga);
	} catch (error: any) {
		handleControllerError(error, res);
	}
};