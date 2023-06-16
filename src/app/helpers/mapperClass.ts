import { Mapper } from '@automapper/core';
import { RecrutadorUserDTO } from '../features/user/usecases/getUsers/RecrutadorUserDTO';
import { UserToCreateDTO } from '../features/user/usecases/createUser/UserToCreateDTO';
import { UserEntity } from '../shared/database/entities/user.entity';
import { UserDTO } from '../features/user/usecases/getUsers/UserDTO';

export class MapperClass {
	private mapper: Mapper;

	constructor(mapper: Mapper) {
		this.mapper = mapper;
	}

	userToCreateDto_to_userEntity(dto: UserToCreateDTO) {
		return this.mapper.map(dto, UserToCreateDTO, UserEntity);
	}

	userEntity_to_userDto(entity: UserEntity) {
		return this.mapper.map(entity, UserEntity, UserDTO);
	}

	userEntity_to_RecrutadorUserDto(entity: UserEntity) {
		return this.mapper.map(entity, UserEntity, RecrutadorUserDTO);
	}
}