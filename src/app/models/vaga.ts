export class Vaga {
	constructor(
		private uuid: string,
		private createdAt: string,
		private descricao: string,
		private nomeEmpresa: string,
		private ativo: boolean,
		private dataLimite: string,
		private recrutadorUuid: string,
		private maxCandidatos?: number
	) {}
}