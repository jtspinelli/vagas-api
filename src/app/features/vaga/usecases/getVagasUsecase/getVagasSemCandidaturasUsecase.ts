/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { VagaRepository } from '../../repository';

export class GetVagasSemCandidaturasUsecase {
	private vagaRepository: VagaRepository;

	constructor(vagaRepository: VagaRepository) {
		this.vagaRepository = vagaRepository;
	}

	async execute(req: Request) {
		const vagas = await this.vagaRepository.getVagasSemCandidaturas(req);
		return vagas;
	}
}