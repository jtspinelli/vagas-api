import { NextFunction, Request, Response } from 'express';

export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
	const { email, senha } = req.body;

	if(!email || typeof email !== 'string'){
		return res.status(400).send('Email não informado ou com formato inválido');
	}

	if(!senha || typeof senha !== 'string'){
		return res.status(400).send('Senha não informada ou com formato inválido');
	}

	next();
};