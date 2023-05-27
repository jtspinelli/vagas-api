import { UserToCreateDTO } from './usecases/createUser/UserToCreateDTO';
import { Repository } from 'typeorm';
import { UserEntity } from '../../shared/database/entities/user.entity';
import db from '../../../main/config/dataSource';
import mapper from '../../helpers/mapper';

export class UserRepository {
	private userRepository: Repository<UserEntity>;

	constructor() {
		this.userRepository = db.getRepository(UserEntity);
	}

	async getAll() {
		return await this.userRepository.find();
	}

	async create(userToCreate: UserEntity): Promise<UserEntity> {
		return await this.userRepository.save(userToCreate);
	}

	async findByEmail(email: string) {
		return await this.userRepository.findOneBy({email});
	}
}