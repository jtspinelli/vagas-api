/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { CandidatoAlreadyAppliedError } from '../../shared/exceptions/CandidateAlreadyAppliedError';
import { MaxCandidaturasReachedError } from '../../shared/exceptions/MaxCandidaturasReachedError';
import { CandidatoNotFoundError } from '../../shared/exceptions/CandidatoNotFoundError';
import { CandidaturaRepository } from './repository';
import { CandidatoOnlyError } from '../../shared/exceptions/CandidatoOnlyError';
import { VagaNotFoundError } from '../../shared/exceptions/VagaNotFoundError';
import { VagaExpiredError } from '../../shared/exceptions/VagaExpiredError';
import { VagaRepository } from '../vaga/repository';
import { handleError } from '../../shared/exceptions';
import { UserEntity } from '../../shared/database/entities/user.entity';
import db from '../../../main/config/dataSource';

export const validateCreateCandidatura = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const candidaturaRepository = new CandidaturaRepository();
		if(!req.body.authenticatedUser.isCandidato) throw new CandidatoOnlyError();

		const candidato = await db.getRepository(UserEntity).findOneBy({uuid: req.body.authenticatedUser.sub});
		if(!candidato) throw new CandidatoNotFoundError();
		
		const vagaRepository = new VagaRepository();
		const vaga = await vagaRepository.get(req.body.vagaId);

		if(!vaga) throw new VagaNotFoundError();
		if(!vaga.ativa) throw new VagaExpiredError();

		const candidaturasFromVaga = await candidaturaRepository.getByVaga(req.query, vaga.uuid);

		if(candidaturasFromVaga.data.find(c => c.vaga.uuid === vaga.uuid)) {
			throw new CandidatoAlreadyAppliedError();
		}

		if(candidaturasFromVaga.data.length === vaga.maxCandidatos) {
			throw new MaxCandidaturasReachedError();
		}

		next();
	} catch (error:any) {

		handleError(error, res);
	}
};