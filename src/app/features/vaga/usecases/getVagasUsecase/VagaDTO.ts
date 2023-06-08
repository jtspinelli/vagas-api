export interface VagaDTO {
	id: string;
	criadaEm: Date;
	descricao: string;
	nomeEmpresa: string;
	maxCandidatos: number;
	dataLimite: string;
	idRecrutador: string;
	ativa: boolean;
	candidaturas?: number;
}