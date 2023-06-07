/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from './repository';
import { badRequest, unauthorized } from '../../helpers/httpResponses';
import { UserTipo } from './enums/userTipo';
import { ForbiddenError } from '../../shared/exceptions/ForbiddenError';
import { handleError } from '../../shared/exceptions';
import { CandidatoOnlyError } from '../../shared/exceptions/CandidatoOnlyError';
import { CandidatoNotFoundError } from '../../shared/exceptions/CandidatoNotFoundError';

function isValidString(value: any) {
	return typeof value == 'string' && value.trim().length > 0;
}

function isValidTipo(value: string) {
	return Object.values(UserTipo).map(userTipo => userTipo.toLowerCase()).includes(value.toLowerCase());
}

function isValidNomeEmpresa(value: any) {
	return ['undefined', 'string'].includes(typeof value);
}

export const checkGetUsersQueryParams = (req: Request, res: Response, next: NextFunction) => {
	if(req.query.limit && (isNaN(Number(req.query.limit)) || Number(req.query.limit) > 10)){
		return res.status(400).send('Propriedade limit inválida.');
	}

	if(req.query.page && isNaN(Number(req.query.page))){
		return res.status(400).send('Propriedade page inválida.');
	}

	if(req.query.tipo && !isValidTipo(req.query.tipo as string)){
		return res.status(400).send('Propriedade tipo inválida.');
	}

	next();
};

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, senha, tipo, nomeEmpresa } = req.body;
		let message;
		
		const invalidField = [
			{name: 'Name', value: name}, 
			{name: 'Email', value: email}, 
			{name: 'Senha', value: senha}
		].find(field => !isValidString(field.value));

		if(invalidField) {
			message = invalidField.name + (typeof invalidField.value !== 'string' ? ' inválido ou ausente' : ' não pode estar em branco');
			return badRequest(res, message);
		}

		if (!isValidTipo(tipo)) return badRequest(res, 'Tipo inválido');
	
		if(!isValidNomeEmpresa(nomeEmpresa)) return badRequest(res, 'nomeEmpresa inválido');
	
		const userRepository = new UserRepository();
		const anotherUserWithThisEmail = await userRepository.findByEmail(email) !== null;
		if(anotherUserWithThisEmail) return unauthorized(res, 'Email indiponível');
	
		if(req.body.tipo === 'Recrutador' && !req.body.authenticatedUser.isAdmin){
			throw new ForbiddenError('Apenas usuário Admin pode criar Recrutadores.');
		}

		if(req.body.tipo === 'Admin' && !req.body.authenticatedUser.isAdmin){
			throw new ForbiddenError('Apenas usuário Admin pode criar outro Admin');
		}
	
		next();
	} catch (error: any) {
		handleError(error, res);
	}
};

export const validateGetVagasAplicadas = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userRepository = new UserRepository();
		const candidato = await userRepository.findByUuid(req.params.id);

		if(!candidato) throw new CandidatoNotFoundError();
		if(!req.body.authenticatedUser.isCandidato) throw new CandidatoOnlyError();
		next();
	} catch (error: any) {
		handleError(error, res);
	}	
};