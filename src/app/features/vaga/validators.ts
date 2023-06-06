/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { RecrutadorRequiredError } from '../../shared/exceptions/RecrutadorRequiredError';
import { handleError } from '../../shared/exceptions';
import db from '../../../main/config/dataSource';
import { UserEntity } from '../../shared/database/entities/user.entity';
import { RecrutadorNotFoundError } from '../../shared/exceptions/RecrutadorNotFoundError';

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
		
		if(!authenticatedUser.isRecrutador) throw new RecrutadorRequiredError();

		const recrutador = await db.getRepository(UserEntity).findOneBy({uuid: authenticatedUser.sub});
		if(!recrutador) throw new RecrutadorNotFoundError();
	
		if(typeof descricao !== 'string') return res.status(400).send('Propriedade descrição inválida');
		if(typeof nomeEmpresa !== 'string') return res.status(400).send('Propriedade nomeEmpresa inválida');
		if(maxCandidatos && typeof maxCandidatos !== 'number') return res.status(400).send('Propriedade maxCandidatos inválida');
		if(typeof dataLimite !== 'string') return res.status(400).send('Propriedade dataLimite inválida');
		
		next();		
	} catch (error: any) {
		handleError(error, res);
	}
};