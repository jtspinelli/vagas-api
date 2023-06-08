import { Response } from 'express';

export class AdminRequiredError extends Error {
	constructor() {
		super('Apenas Admin tem permissão para esta ação.');
	}

	respond(res: Response) {
		return res.status(403).send({message: this.message});
	}
}