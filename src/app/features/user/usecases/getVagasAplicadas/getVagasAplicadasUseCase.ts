/* eslint-disable @typescript-eslint/no-explicit-any */
import { CandidaturaRepository } from '../../../candidatura/repository';

export class GetVagasAplicadasUsecase {
	private candidaturaRepository: CandidaturaRepository;

	constructor(candidaturaRepository: CandidaturaRepository) {
		this.candidaturaRepository = candidaturaRepository;
	}

	async execute(queryparams: any, candidatoUuid: string) {
		return (await this.candidaturaRepository.getVagasAplicadasByCandidatoPagedList(queryparams, candidatoUuid));

	}
}