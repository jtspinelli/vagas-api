/* eslint-disable @typescript-eslint/no-explicit-any */
import { VagaComCandidatosDTO } from './VagaComCandidatosDTO';
import { UserEntity } from '../../../../shared/database/entities/user.entity';
import { CandidaturaRepository } from '../../../candidatura/repository';
import { UserDTO } from '../../../user/usecases/getUsers/UserDTO';
import { VagaRepository } from '../../repository';
import { VagaDTO } from './VagaDTO';
import { Request } from 'express';
import mapper from '../../../../helpers/mapper';
import { IAuthenticatedUser } from '../../../../shared/middlewares/IAuthenticatedUser';

export class GetVagasUsecase {
	private vagaRepository: VagaRepository;
	private candidaturaRepository: CandidaturaRepository;

	constructor(vagaRepository: VagaRepository, candidaturaRepository: CandidaturaRepository) {
		this.vagaRepository = vagaRepository;
		this.candidaturaRepository = candidaturaRepository;
	}

	async getCandidatos(vaga: VagaDTO): Promise<VagaComCandidatosDTO> {
		const candidatos =(await this.candidaturaRepository.getByVaga(vaga.id))
			.map(c => mapper.map(c.candidato, UserEntity, UserDTO));

		return {...vaga, candidatos};
	}

	async execute(req: Request) {
		const authenticatedUser: IAuthenticatedUser = req.body.authenticatedUser;

		if(authenticatedUser.isRecrutador) {
			return await this.vagaRepository.getVagasFromRecrutador(req.query, authenticatedUser.sub);
		}
		
		const vagas = await this.vagaRepository.getPagedList(req);
		return vagas;
	}
}