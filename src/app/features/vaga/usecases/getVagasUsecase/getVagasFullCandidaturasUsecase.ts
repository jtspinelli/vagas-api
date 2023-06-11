/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { VagaRepository } from '../../repository';

export class GetVagasFullCandidaturasUsecase {
	private vagaRepository: VagaRepository;

	constructor(vagaRepository: VagaRepository) {
		this.vagaRepository = vagaRepository;
	}

	async execute(req: Request) {
		const vagas = await this.vagaRepository.getVagasFullCandidaturas(req);
		return vagas;
	}
}