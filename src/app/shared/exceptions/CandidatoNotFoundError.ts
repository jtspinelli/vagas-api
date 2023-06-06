import { Response } from 'express';

export class CandidatoNotFoundError extends Error {
	constructor() {
		super('Candidato não encontrado.');
	}

	respond(res: Response) {
		return res.status(404).send({message: this.message});
	}
}