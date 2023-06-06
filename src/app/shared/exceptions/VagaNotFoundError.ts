import { Response } from 'express';

export class VagaNotFoundError extends Error {
	constructor() {
		super('Vaga não encontrada.');
	}

	respond(res: Response) {
		return res.status(404).send({message: this.message});
	}
}