import { AutoMap } from '@automapper/classes';

export class UserToCreateDTO {
	@AutoMap()
	public name: string;

	@AutoMap()
	public email: string;

	@AutoMap()
	public senha: string;

	@AutoMap()
	public nomeEmpresa: string;

	@AutoMap()
	public tipo: 'Candidato' | 'Admin' | 'Recrutador';
}