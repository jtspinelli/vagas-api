export class User {
	constructor(
		private uuid: string,
		private name: string,
		private email: string,
		private senha: string,
		private nomeEmpresa: string,
		private tipo: 'candidato' | 'admin' | 'recrutador'
	){	}
}