import { Response } from 'express';

export class CandidatoOnlyError extends Error {
	constructor() {
		super('Ação permitida apenas para Candidatos');
	}

	respond(res: Response) {
		return res.status(403).send({message: this.message});
	}
}