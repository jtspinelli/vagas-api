import mapper from '../../../../helpers/mapper';
import { VagaRepository } from '../../repository';
import { VagaEntity } from '../../../../shared/database/entities/vaga.entity';
import { VagaToCreateDTO } from './VagaToCreateDTO';

export class CreateVagaUsecase {
	constructor(private repository: VagaRepository) {
	}

	async execute(vagaToCreate: VagaToCreateDTO, authenticatedUser: { sub: string }){
		const vagaToCreateEntity = mapper.map(vagaToCreate, VagaToCreateDTO, VagaEntity);		
		vagaToCreateEntity.recrutadorUuid = authenticatedUser.sub;

		const savedVaga = await this.repository.create(vagaToCreateEntity);

		return savedVaga.toJson();
	}
}