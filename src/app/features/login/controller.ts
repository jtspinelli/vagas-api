/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserNotFoundException } from '../../shared/exceptions/UserNotFoundException';
import { Request, Response } from 'express';
import { UserRepository } from '../user/repository';
import { LoginData, LoginUsecase } from './usecases/loginUsecase';

export const loginController = async (req: Request, res: Response) => {
	const userRepository = new UserRepository();
	const loginUsecase = new LoginUsecase(userRepository);

	try {
		const accessToken = await loginUsecase.execute(req.body as LoginData);

		if(!accessToken) return res.status(401).send('Usuário e/ou senha incorretos.');

		return res.json({accessToken});
	} catch (error: any) {
		if(error instanceof UserNotFoundException) return res.status(404).send(error.message);	
		return res.status(500).send({});	
	}
};