import { AutoMap } from '@automapper/classes';

export class User {
	@AutoMap()
	private uuid: string;

	@AutoMap()
	private name: string;

	@AutoMap()
	private email: string;

	@AutoMap()
	private senha: string;

	@AutoMap()
	private nomeEmpresa: string;

	@AutoMap()
	private tipo: 'candidato' | 'admin' | 'recrutador';
}