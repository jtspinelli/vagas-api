import { Response } from 'express';
import { RecrutadorRequiredError } from './RecrutadorNotFoundError';
import { QueryFailedError } from 'typeorm';

export function handleControllerError(error: Error, res: Response) {
	if(error instanceof RecrutadorRequiredError){
		return error.respond(res);
	}

	if(error instanceof QueryFailedError && error.message.includes('invalid input syntax for type timestamp')){
		return res.status(400).send('Formato de data inválido.');		
	}

	return res.status(500).send({message: 'Ocorreu um erro.'});
}