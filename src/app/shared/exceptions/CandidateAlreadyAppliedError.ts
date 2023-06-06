import { Response } from 'express';

export class CandidatoAlreadyAppliedError extends Error {
	constructor() {
		super('Candidato já aplicou a esta vaga.');
	}

	respond(res: Response) {
		return res.status(409).send({message: this.message});
	}
}