/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { appEnv } from '../../env/appEnv';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.headers.authorization;
	if(!accessToken) return res.status(401).send('AccessToken não encontrado.');

	try{
		const decoded = jwt.verify(accessToken, appEnv.jwtSecret as string);
		
		req.body.authenticatedUser = decoded;
	} catch (error: any) {
		if(error instanceof JsonWebTokenError){
			return res.status(401).send('AcessToken inválido.');
		}
		return res.status(500).send({});
	}
	
	next();
};