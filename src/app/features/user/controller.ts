import { UserRepository } from './repository';
import { Request, Response } from 'express';
import { CreateUserUsecase } from './usecases/createUser/createUserUsecase';

export const createUserController = async (req: Request, res: Response) => {	
	const userData = req.body;
	
	const userRepository = new UserRepository();
	const createUserUsecase = new CreateUserUsecase(userRepository);
	const createdUser = await createUserUsecase.execute(await userData);

	return res.status(201).send(createdUser);
};