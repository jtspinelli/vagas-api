import { UserRepository } from './repository';
import { Request, Response } from 'express';
import { CreateUserUsecase } from './usecases/createUser/createUserUsecase';
import { GetUsersUsecase } from './usecases/getUsers/getUsersUsecase';

export const createUserController = async (req: Request, res: Response) => {	
	const userData = req.body;
	
	const userRepository = new UserRepository();
	const createUserUsecase = new CreateUserUsecase(userRepository);
	const createdUser = await createUserUsecase.execute(userData);

	return res.status(201).send(createdUser);
};

export const getUsersController = async (_: Request, res: Response) => {
	const userRepository = new UserRepository();
	const getUsersUsecase = new GetUsersUsecase(userRepository);
	const users = await getUsersUsecase.execute();

	return res.status(200).send(users);
};