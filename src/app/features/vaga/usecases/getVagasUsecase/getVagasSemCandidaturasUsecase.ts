/* eslint-disable @typescript-eslint/no-explicit-any */
import { VagaRepository } from '../../repository';

export class GetVagasSemCandidaturasUsecase {
	private vagaRepository: VagaRepository;

	constructor(vagaRepository: VagaRepository) {
		this.vagaRepository = vagaRepository;
	}

	async execute(queryParams: any) {
		const vagas = await this.vagaRepository.getVagasSemCandidaturas(queryParams);
		return vagas;
	}
}