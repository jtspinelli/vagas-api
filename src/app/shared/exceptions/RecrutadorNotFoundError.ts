import { Response } from 'express';

export class RecrutadorRequiredError extends Error {
	constructor() {
		super('Apenas Recrutadores tem permissão para esta ação.');
	}

	respond(res: Response) {
		return res.status(403).send({message: this.message});
	}
}