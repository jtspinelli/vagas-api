import { Response } from 'express';

export const badRequest = (res: Response, message: string) => {
	return res.status(400).send(message);
};

export const unauthorized = (res: Response, message: string) => {
	return res.status(401).send(message);
};