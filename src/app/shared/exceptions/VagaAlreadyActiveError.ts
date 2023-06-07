import { Response } from 'express';

export class VagaAlreadyActiveError extends Error {
	constructor() {
		super('A vaga já está ativa.');
	}

	respond(res: Response) {
		return res.status(400).send({message: this.message});
	}
}