import { Response } from 'express';

export class VagaExpiredError extends Error {
	constructor() {
		super('Data limite para candidatura expirada.');
	}

	respond(res: Response) {
		return res.status(400).send({message: this.message});
	}
}