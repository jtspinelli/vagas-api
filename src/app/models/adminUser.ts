import { AutoMap } from '@automapper/classes';
import { User } from './user';

export class AdminUser extends User {
	@AutoMap()
	private nomeEmpresa: string;
}