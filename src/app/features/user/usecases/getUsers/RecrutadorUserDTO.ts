/* eslint-disable indent */
import { AutoMap } from '@automapper/classes';
import { UserDTO } from './UserDTO';

export class RecrutadorUserDTO extends UserDTO {
	@AutoMap()
	nomeEmpresa: string;
}