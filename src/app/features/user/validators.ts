/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from './repository';
import { badRequest, unauthorized } from '../../helpers/httpResponses';
import { UserTipo } from './enums/userTipo';

function isValidString(value: any) {
	return typeof value == 'string' && value.trim().length > 0;
}

function isValidTipo(value: any) {
	return Object.values(UserTipo).includes(value);
}

function isValidNomeEmpresa(value: any) {
	return ['undefined', 'string'].includes(typeof value);
}

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
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

	next();
};