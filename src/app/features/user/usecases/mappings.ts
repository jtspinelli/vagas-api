import mapper from '../../../helpers/mapper';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { RecrutadorUserDTO } from './getUsers/RecrutadorUserDTO';
import { UserToCreateDTO } from './createUser/UserToCreateDTO';
import { UserEntity } from '../../../shared/database/entities/user.entity';
import { UserTipo } from '../enums/userTipo';
import { UserDTO } from './getUsers/UserDTO';
import { User } from '../../../models/user';

function getTipo(value: string){
	const index = Object.values(UserTipo).indexOf(value as UserTipo);
	return Object.values(UserTipo)[index];
}

const registerUserMappings = () => {
	createMap(mapper, UserToCreateDTO, UserEntity, forMember(u => u.tipo, mapFrom(s => getTipo(s.tipo))));
	createMap(mapper, UserEntity, User, forMember(u => u.tipo, mapFrom(s => getTipo(s.tipo))));
	createMap(mapper, UserEntity, UserDTO, forMember(u => u.tipo, mapFrom(s => getTipo(s.tipo))));
	createMap(mapper, UserEntity, RecrutadorUserDTO, forMember(u => u.tipo, mapFrom(s => getTipo(s.tipo))));
};

export default registerUserMappings;