import { Request, Response } from 'express';
import { VagaRepository } from './repository';

export const listVagasController = async (req: Request, res: Response) => {
	try {
		const repository = new VagaRepository();
		const vagas = await repository.listAllVagas();

		res.status(200).send(vagas);
	} catch (error) {
		console.log(error);
		res.status(500).send({message: 'Ocorreu um erro.'});
	}	
};