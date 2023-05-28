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
	createMap(mapper, UserToCreateDTO, UserEntity, forMember(entity => entity.tipo, mapFrom(dto => getTipo(dto.tipo))));
	createMap(mapper, UserEntity, User, forMember(model => model.tipo, mapFrom(entity => getTipo(entity.tipo))));
	createMap(mapper, UserEntity, UserDTO, forMember(dto => dto.tipo, mapFrom(entity => getTipo(entity.tipo))));
	createMap(mapper, UserEntity, RecrutadorUserDTO, forMember(dto => dto.tipo, mapFrom(entity => getTipo(entity.tipo))));
};

export default registerUserMappings;