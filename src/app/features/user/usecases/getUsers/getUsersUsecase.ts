import { UserRepository } from '../../repository';

export class GetUsersUsecase {
	constructor(private repository: UserRepository){		
	}

	async execute(query: any) {
		return await this.repository.getAll(query);
	}
}