/* eslint-disable indent */
import { AutoMap } from '@automapper/classes';

export class VagaDTO {
	@AutoMap()
	uuid: string;

	@AutoMap()
	createdAt: Date;

	@AutoMap()
	updatedAt: Date;

	@AutoMap()
	descricao: string;

	@AutoMap()
	nomeEmpresa: string; 

	@AutoMap()
	maxCandidatos: number; 

	@AutoMap()
	dataLimite: string;

	@AutoMap()
	recrutadorUuid: string;
}