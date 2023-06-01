/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { RecrutadorRequiredError } from '../../shared/exceptions/RecrutadorNotFoundError';
import { handleControllerError } from '../../shared/exceptions';

export const checkGetVagasQueryParams = (req: Request, res: Response, next: NextFunction) => {
	if(req.query.limit && (isNaN(Number(req.query.limit)) || Number(req.query.limit) > 10)){
		return res.status(400).send('Propriedade limit inválida.');
	}

	if(req.query.page && isNaN(Number(req.query.page))){
		return res.status(400).send('Propriedade page inválida.');
	}

	next();
};

export const validateCreateVaga = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authenticatedUser, descricao, nomeEmpresa, maxCandidatos, dataLimite } = req.body;
		
		// if(!authenticatedUser.isRecrutador) return res.status(403).send('Apenas Recrutadores podem criar vagas.');
		if(!authenticatedUser.isRecrutador) throw new RecrutadorRequiredError();
	
		if(typeof descricao !== 'string') return res.status(400).send('Propriedade descrição inválida');
		if(typeof nomeEmpresa !== 'string') return res.status(400).send('Propriedade nomeEmpresa inválida');
		if(maxCandidatos && typeof maxCandidatos !== 'number') return res.status(400).send('Propriedade maxCandidatos inválida');
		if(typeof dataLimite !== 'string') return res.status(400).send('Propriedade dataLimite inválida');
		
		next();		
	} catch (error: any) {
		handleControllerError(error, res);
	}
};