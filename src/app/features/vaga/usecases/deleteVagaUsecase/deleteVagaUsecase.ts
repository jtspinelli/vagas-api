import { VagaEntity } from '../../../../shared/database/entities/vaga.entity';
import { VagaRepository } from '../../repository';

export class DeleteVagaUsecase {
	private vagaRepository: VagaRepository;

	constructor(vagaRepository: VagaRepository){
		this.vagaRepository = vagaRepository;
	}

	async execute(vaga: VagaEntity) {
		return await this.vagaRepository.remove(vaga);
	}
}