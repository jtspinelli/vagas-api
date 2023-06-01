import { Response } from 'express';

export class RecrutadorNotFoundError extends Error {
	constructor() {
		super('Recrutador não encontrado.');
	}

	respond(res: Response) {
		return res.status(403).send({message: this.message});
	}
}