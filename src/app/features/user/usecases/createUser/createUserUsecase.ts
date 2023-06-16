import mapper from '../../../../helpers/mapper';
import { RecrutadorUserDTO } from '../getUsers/RecrutadorUserDTO';
import { UserToCreateDTO } from './UserToCreateDTO';
import { UserRepository } from '../../repository';
import { UserEntity } from '../../../../shared/database/entities/user.entity';
import { UserDTO } from '../getUsers/UserDTO';
import bcrypt from 'bcrypt';
import { MapperClass } from '../../../../helpers/mapperClass';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

export class CreateUserUsecase {
	constructor(private repository: UserRepository) {}

	async execute(userToCreate: UserToCreateDTO): Promise<UserDTO | RecrutadorUserDTO> {	
		const newUser = new UserEntity();
		newUser.name = userToCreate.name;
		newUser.email = userToCreate.email;
		newUser.senha = await bcrypt.hash(userToCreate.senha, 10);
		if(userToCreate.nomeEmpresa) {
			newUser.nomeEmpresa = userToCreate.nomeEmpresa;
		}		
		newUser.tipo = userToCreate.tipo;

		// const newUser = mapper.map(userToCreate, UserToCreateDTO, UserEntity);

		const savedUser = await this.repository.create(newUser);

		return savedUser.nomeEmpresa === null
			? savedUser.toUserDto()
			: savedUser.toRecrutadorUserDto();
		
		// return savedUser.nomeEmpresa === null
		// 	? mapper.map(savedUser, UserEntity, UserDTO)
		// 	: mapper.map(savedUser, UserEntity, RecrutadorUserDTO);
	}
}