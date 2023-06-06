import { Request, Response } from 'express';
import { CreateUserUsecase } from './usecases/createUser/createUserUsecase';
import { GetUsersUsecase } from './usecases/getUsers/getUsersUsecase';
import { ForbiddenError } from '../../shared/exceptions/ForbiddenError';
import { UserRepository } from './repository';
import { QueryFailedError } from 'typeorm';

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
		const users = await getUsersUsecase.execute(req);
		return res.status(200).send(users);
	} catch(error: any) {
		if(error instanceof QueryFailedError){
			console.log(error.message);	
			console.log(error.parameters);	
		}
		return res.status(500).send({});
	}	
};