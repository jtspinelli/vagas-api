/* eslint-disable @typescript-eslint/no-explicit-any */
import { CandidaturaRepository } from '../../../candidatura/repository';
import { UserEntity } from '../../../../shared/database/entities/user.entity';
import { UserDTO } from '../../../user/usecases/getUsers/UserDTO';
import { Page } from '../../../../helpers/Page';
import mapper from '../../../../helpers/mapper';

export class GetCandidatosUsecase {
	private candidaturaRepository: CandidaturaRepository;

	constructor(candidaturaRepository: CandidaturaRepository) {
		this.candidaturaRepository = candidaturaRepository;
	}
	
	async execute(queryParams: any, vagaUuid: string, recrutadorUuid: string) {
		const candidaturas = await this.candidaturaRepository.getByVagaCreatedByRecrutadorPagedList(queryParams, vagaUuid, recrutadorUuid);
		const candidatos = candidaturas.data.map(c => mapper.map(c.candidato, UserEntity, UserDTO));			

		return new Page<UserDTO>(
			candidaturas.page, 
			candidaturas.totalPages, 
			candidaturas.count, 
			candidatos
		);
	}
}