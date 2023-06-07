/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { RecrutadorRequiredError } from '../../shared/exceptions/RecrutadorRequiredError';
import { handleError } from '../../shared/exceptions';
import { UserEntity } from '../../shared/database/entities/user.entity';
import { RecrutadorNotFoundError } from '../../shared/exceptions/RecrutadorNotFoundError';
import { VagaEntity } from '../../shared/database/entities/vaga.entity';
import { VagaNotFoundError } from '../../shared/exceptions/VagaNotFoundError';
import { VagaAlreadyDeactivatedError } from '../../shared/exceptions/VagaAlreadyDeactivatedError';
import { VagaAlreadyActiveError } from '../../shared/exceptions/VagaAlreadyActiveError';
import { VagaActivationForbiddenError } from '../../shared/exceptions/VagaActivationForbiddenError';
import db from '../../../main/config/dataSource';
import { ForbiddenError } from '../../shared/exceptions/ForbiddenError';

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

export const validateGetCandidatos = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if(!req.body.authenticatedUser.isRecrutador) throw new RecrutadorRequiredError();
		
		const vaga = await db.getRepository(VagaEntity).findOneBy({uuid: req.params.id});
		if(!vaga) throw new VagaNotFoundError();	
		next();
	} catch (error: any) {
		handleError(error, res);
	}	
};

export const requireRecrutador = (req: Request) => {	
	if(!req.body.authenticatedUser.isRecrutador) throw new RecrutadorRequiredError();	
};

export const requireValidVagaId = async (req: Request) => {
	const vaga = await db.getRepository(VagaEntity).findOne({where: {uuid: req.params.id}, relations: { candidaturas: true }});
	if(!vaga) throw new VagaNotFoundError();

	return vaga;
};

export const validateDesativarVaga = async (req: Request, res: Response, next: NextFunction) => {
	try {
		requireRecrutador(req);
		req.body.vaga = await requireValidVagaId(req);
		if(!req.body.vaga.ativa) throw new VagaAlreadyDeactivatedError();
		
		next();
	} catch (error: any) {
		handleError(error, res);
	}	
};

export const validateAtivarVaga = async (req: Request, res: Response, next: NextFunction) => {
	try {
		requireRecrutador(req);
		req.body.vaga = await requireValidVagaId(req);
		if(req.body.vaga.ativa) throw new VagaAlreadyActiveError();

		const passedDataLimite = new Date(req.body.vaga.dataLimite) < new Date();
		if(passedDataLimite) throw new VagaActivationForbiddenError();
		next();
	} catch (error: any) {
		handleError(error, res);
	}
};

export const validateDeleteVaga = async (req: Request, res: Response, next: NextFunction) => {
	try {
		requireRecrutador(req);
		req.body.vaga = await requireValidVagaId(req);
		if((req.body.vaga as VagaEntity).recrutadorUuid !== req.body.authenticatedUser.sub) throw new ForbiddenError('Acesso negado.');

		next();
	} catch(error: any) {
		handleError(error, res);
	}
};