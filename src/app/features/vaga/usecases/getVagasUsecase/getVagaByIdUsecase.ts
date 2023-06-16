import { VagaRepository } from '../../repository';

export class GetVagaByIdUsecase {
	private vagaRepository: VagaRepository;

	constructor(vagaRepository: VagaRepository) {
		this.vagaRepository = vagaRepository;
	}
	
	async execute(vagaId: string) {
		return await this.vagaRepository.get(vagaId);
	}
}