import { UserRepository } from './repository';
import { Request, Response } from 'express';
import { validateCreateUser } from './validators';
import { CreateUserUsecase } from './usecases/createUser/createUserUsecase';

export const createUserController = async (req: Request, res: Response) => {
	try {
		const userData = validateCreateUser(req.body);
		
		const userRepository = new UserRepository();
		const createUserUsecase = new CreateUserUsecase(userRepository);
		const createdUser = await createUserUsecase.execute(userData);

		return res.status(201).send(createdUser);

	} catch (error) {
		console.log(error);
		return res.status(500).send({});
	}
};