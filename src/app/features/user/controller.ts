/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CreateUserUsecase } from './usecases/createUser/createUserUsecase';
import { GetUsersUsecase } from './usecases/getUsers/getUsersUsecase';
import { ForbiddenError } from '../../shared/exceptions/ForbiddenError';
import { UserRepository } from './repository';
import { CandidaturaRepository } from '../candidatura/repository';
import { GetVagasAplicadasUsecase } from './usecases/getVagasAplicadas/getVagasAplicadasUseCase';
import { appEnv } from '../../env/appEnv';

export const createUserController = async (req: Request, res: Response) => {
	try {
		const userData = req.body;
		
		const userRepository = new UserRepository();
		const createUserUsecase = new CreateUserUsecase(userRepository);
		const createdUser = await createUserUsecase.execute(userData);
		
		return res.status(201).send(createdUser);
	} catch(error) {
		if(error instanceof ForbiddenError){
			return error.respond(res);
		}
		return res.status(500).send({});
	}	
};

export const getUsersController = async (req: Request, res: Response) => {
	const userRepository = new UserRepository();
	const getUsersUsecase = new GetUsersUsecase(userRepository);
	
	try {
		const { name, tipo } = req.query;
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit || appEnv.paginationLimit);
		const users = await getUsersUsecase.execute(page, limit, name as string | undefined, tipo as string | undefined, req.body.authenticatedUser);
		
		return res.status(200).send(users);
	} catch(error: any) {
		return res.status(500).send({});
	}	
};

export const getVagasAplicadasController = async (req: Request, res: Response) => {
	const candidaturaRepository = new CandidaturaRepository();
	const getvagasAplicadasUsecase = new GetVagasAplicadasUsecase(candidaturaRepository);

	return res.send(await getvagasAplicadasUsecase.execute(req.query, req.params.id));
};