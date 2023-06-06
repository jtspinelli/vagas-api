import { Response } from 'express';

export class MaxCandidaturasReachedError extends Error {
	constructor() {
		super('Número máximo de candidaturas para esta vaga já foi alcançado.');
	}

	respond(res: Response) {
		return res.status(404).send({message: this.message});
	}
}