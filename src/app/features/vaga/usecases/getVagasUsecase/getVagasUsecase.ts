/* eslint-disable @typescript-eslint/no-explicit-any */
import { VagaComCandidatosDTO } from './VagaComCandidatosDTO';
import { UserEntity } from '../../../../shared/database/entities/user.entity';
import { CandidaturaRepository } from '../../../candidatura/repository';
import { UserDTO } from '../../../user/usecases/getUsers/UserDTO';
import { VagaRepository } from '../../repository';
import { VagaDTO } from './VagaDTO';
import mapper from '../../../../helpers/mapper';

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

	async execute(authenticatedUser: {sub: string, isRecrutador: boolean }, queryParams: any) {
		if(authenticatedUser.isRecrutador) {
			const vagas = await this.candidaturaRepository.getVagasCreatedByRecrutadorComCandidatosPagedList(queryParams, authenticatedUser.sub);
			return vagas;
		}
		
		const vagas = await this.vagaRepository.getPagedList(queryParams);
		return vagas;
	}
}