import { User } from '../../../../models/user';
import { UserRepository } from '../../repository';
import { UserToCreateDTO } from './UserToCreateDTO';

export class CreateUserUsecase {
	constructor(private repository: UserRepository) {}

	async execute(userToCreate: UserToCreateDTO): Promise<User> {
		return this.repository.create(userToCreate);
	}
}