import mapper from '../../../../helpers/mapper';
import { UserEntity } from '../../../../shared/database/entities/user.entity';
import { UserRepository } from '../../repository';
import { RecrutadorUserDTO } from './RecrutadorUserDTO';
import { UserDTO } from './UserDTO';

export class GetUsersUsecase {
	constructor(private repository: UserRepository){		
	}

	async execute(): Promise<(UserDTO | RecrutadorUserDTO)[]>{
		return (await this.repository.getAll()).map(user => {
			return user.nomeEmpresa === null
				? mapper.map(user, UserEntity, UserDTO)
				: mapper.map(user, UserEntity, RecrutadorUserDTO);
		});
	}
}