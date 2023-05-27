/* eslint-disable indent */
import { AutoMap } from '@automapper/classes';
import { UserTipo } from '../../enums/userTipo';

export class UserDTO {
	@AutoMap()
	uuid: string;

	@AutoMap()
	createdAt: Date;

	@AutoMap()
	updatedAt: Date;

	@AutoMap()
	name: string;

	@AutoMap()
	email: string;

	tipo: UserTipo;
}