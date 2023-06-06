import { Response } from 'express';
import { RecrutadorRequiredError } from './RecrutadorRequiredError';
import { QueryFailedError } from 'typeorm';
import { CandidatoOnlyError } from './CandidatoOnlyError';
import { ForbiddenError } from './ForbiddenError';
import { VagaNotFoundError } from './VagaNotFoundError';
import { VagaExpiredError } from './VagaExpiredError';
import { RecrutadorNotFoundError } from './RecrutadorNotFoundError';
import { CandidatoNotFoundError } from './CandidatoNotFoundError';

export function handleError(error: Error, res: Response) {
	if(error instanceof ForbiddenError 
		|| error instanceof VagaNotFoundError 
		|| error instanceof VagaExpiredError 
		|| error instanceof RecrutadorRequiredError 
		|| error instanceof CandidatoOnlyError
		|| error instanceof RecrutadorNotFoundError
		|| error instanceof CandidatoNotFoundError){
		return error.respond(res);
	}

	if(error instanceof QueryFailedError && error.message.includes('invalid input syntax for type timestamp')){
		return res.status(400).send('Formato de data inválido.');		
	}

	return res.status(500).send({message: 'Ocorreu um erro.'});
}