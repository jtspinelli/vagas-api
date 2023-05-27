import { AutoMap } from '@automapper/classes';
import { UserTipo } from '../features/user/enums/userTipo';

export class User {
	@AutoMap()
	private uuid: string;

	@AutoMap()
	private createdAt: Date;

	@AutoMap()
	private updatedAt: Date;

	@AutoMap()
	private name: string;

	@AutoMap()
	private email: string;

	@AutoMap()
	private senha: string;

	// @AutoMap()
	// private nomeEmpresa: string;
	
	private _tipo: UserTipo;

	public get tipo(){
		return this._tipo;
	}

	public set tipo(value:UserTipo) {
		this._tipo = value;
	}
}