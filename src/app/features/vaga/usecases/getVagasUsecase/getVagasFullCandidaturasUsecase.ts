/* eslint-disable @typescript-eslint/no-explicit-any */
import { VagaRepository } from '../../repository';

export class GetVagasFullCandidaturasUsecase {
	private vagaRepository: VagaRepository;

	constructor(vagaRepository: VagaRepository) {
		this.vagaRepository = vagaRepository;
	}

	async execute(queryParams: any) {
		const vagas = await this.vagaRepository.getVagasFullCandidaturas(queryParams);
		return vagas;
	}
}