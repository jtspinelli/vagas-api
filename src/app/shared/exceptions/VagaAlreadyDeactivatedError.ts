import { Response } from 'express';

export class VagaAlreadyDeactivatedError extends Error {
	constructor() {
		super('A vaga já está desativada.');
	}

	respond(res: Response) {
		return res.status(400).send({message: this.message});
	}
}