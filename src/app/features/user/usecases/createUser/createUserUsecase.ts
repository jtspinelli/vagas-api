import mapper from '../../../../helpers/mapper';
import { RecrutadorUserDTO } from '../getUsers/RecrutadorUserDTO';
import { UserToCreateDTO } from './UserToCreateDTO';
import { UserRepository } from '../../repository';
import { UserEntity } from '../../../../shared/database/entities/user.entity';
import { UserDTO } from '../getUsers/UserDTO';
import bcrypt from 'bcrypt';

export class CreateUserUsecase {
	constructor(private repository: UserRepository) {}

	async execute(userToCreate: UserToCreateDTO): Promise<UserDTO | RecrutadorUserDTO> {
		const newUser = mapper.map(userToCreate, UserToCreateDTO, UserEntity);
		newUser.senha = await bcrypt.hash(newUser.senha, 10);

		const savedUser = await this.repository.create(newUser);

		return savedUser.nomeEmpresa === null 
			? mapper.map(savedUser, UserEntity, UserDTO)
			: mapper.map(savedUser, UserEntity, RecrutadorUserDTO);
	}
}