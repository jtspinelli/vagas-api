import { NextFunction, Request, Response } from 'express';
import { UserRepository } from './repository';
import { badRequest, unauthorized } from '../../helpers/httpResponses';

export const validatePostUser = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, senha, tipo, nomeEmpresa } = req.body;

	if(typeof name !== 'string' || !name.trim().length) {
		return badRequest(res, typeof name !== 'string' ? 'Nome inválido ou ausente' : 'Nome não pode estar em branco');
	}

	if(typeof senha !== 'string' || !senha.trim().length) {
		return badRequest(res, typeof senha !== 'string' ? 'Senha inválida ou ausente' : 'Senha não pode estar em branco');
	}

	if (tipo !== 'candidato' &&
		tipo !== 'admin' &&
		tipo !== 'recrutador'
	) {
		return badRequest(res, 'Tipo inválido');
	}

	if(!['undefined', 'string'].includes(typeof nomeEmpresa)) return badRequest(res, 'nomeEmpresa inválido');

	const userRepository = new UserRepository();
	const anotherUserWithThisEmail = await userRepository.findByEmail(email) !== null;
	if(anotherUserWithThisEmail) return unauthorized(res, 'Email indiponível');	

	next();
};