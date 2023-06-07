import { Response } from 'express';

export class VagaActivationForbiddenError extends Error {
	constructor() {
		super('A vaga não pode ser ativada pois o prazo para candidaturas já expirou.');
	}

	respond(res: Response) {
		return res.status(403).send({message: this.message});
	}
}