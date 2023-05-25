import { UserToCreateDTO } from './usecases/createUser/UserToCreateDTO';
import { Repository } from 'typeorm';
import { UserEntity } from '../../shared/database/entities/user.entity';
import { User } from '../../models/user';
import db from '../../../main/config/dataSource';
import mapper from '../../helpers/mapper';

export class UserRepository {
	private userRepository: Repository<UserEntity>;

	constructor() {
		this.userRepository = db.getRepository(UserEntity);
	}

	async create(userToCreate: UserToCreateDTO): Promise<User> {
		const createdUser = await this.userRepository.save(mapper.map(userToCreate, UserToCreateDTO, UserEntity));

		return mapper.map(createdUser, UserEntity, User);
	}

	async findByEmail(email: string) {
		return await this.userRepository.findOneBy({email});
	}
}