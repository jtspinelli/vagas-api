/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { RecrutadorRequiredError } from '../../shared/exceptions/RecrutadorNotFoundError';
import { handleError } from '../../shared/exceptions';
import { CandidatoOnlyError } from '../../shared/exceptions/CandidatoOnlyError';
import { VagaRepository } from './repository';
import { VagaNotFoundError } from '../../shared/exceptions/VagaNotFoundError';
import { VagaExpiredError } from '../../shared/exceptions/VagaExpiredError';

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
	
		if(typeof descricao !== 'string') return res.status(400).send('Propriedade descrição inválida');
		if(typeof nomeEmpresa !== 'string') return res.status(400).send('Propriedade nomeEmpresa inválida');
		if(maxCandidatos && typeof maxCandidatos !== 'number') return res.status(400).send('Propriedade maxCandidatos inválida');
		if(typeof dataLimite !== 'string') return res.status(400).send('Propriedade dataLimite inválida');
		
		next();		
	} catch (error: any) {
		handleError(error, res);
	}
};

export const validateApplyToVaga = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if(!req.body.authenticatedUser.isCandidato) throw new CandidatoOnlyError();

		const vagaRepository = new VagaRepository();
		const vaga = await vagaRepository.get(req.params.vaga_id);

		if(!vaga) throw new VagaNotFoundError();

		if(new Date(vaga.dataLimite) < new Date()) {
			throw new VagaExpiredError();
		}

		next();
	} catch (error:any) {
		handleError(error, res);
	}	
};