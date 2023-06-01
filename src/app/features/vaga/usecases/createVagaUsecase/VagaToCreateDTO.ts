/* eslint-disable indent */
import { AutoMap } from '@automapper/classes';

export class VagaToCreateDTO {
	@AutoMap()
	descricao: string;

	@AutoMap()
	nomeEmpresa: string; 

	@AutoMap()
	maxCandidatos: number; 

	@AutoMap()
	dataLimite: string;
}