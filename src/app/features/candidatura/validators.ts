/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { CandidatoNotFoundError } from '../../shared/exceptions/CandidatoNotFoundError';
import { CandidatoOnlyError } from '../../shared/exceptions/CandidatoOnlyError';
import { VagaNotFoundError } from '../../shared/exceptions/VagaNotFoundError';
import { VagaExpiredError } from '../../shared/exceptions/VagaExpiredError';
import { VagaRepository } from '../vaga/repository';
import { handleError } from '../../shared/exceptions';
import { UserEntity } from '../../shared/database/entities/user.entity';
import db from '../../../main/config/dataSource';

export const validateCreateCandidatura = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if(!req.body.authenticatedUser.isCandidato) throw new CandidatoOnlyError();

		const candidato = await db.getRepository(UserEntity).findOneBy({uuid: req.body.authenticatedUser.sub});
		if(!candidato) throw new CandidatoNotFoundError();
		
		const vagaRepository = new VagaRepository();
		const vaga = await vagaRepository.get(req.body.vagaId);

		if(!vaga) throw new VagaNotFoundError();
		if(!vaga.ativa) throw new VagaExpiredError();

		next();
	} catch (error:any) {
		handleError(error, res);
	}
};