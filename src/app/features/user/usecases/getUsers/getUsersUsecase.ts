/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRepository } from '../../repository';
import { IAuthenticatedUser } from '../../../../shared/middlewares/IAuthenticatedUser';

export class GetUsersUsecase {
	constructor(private repository: UserRepository){		
	}

	async execute(page: number, limit: number, name: string | undefined, tipo: string | undefined, user: IAuthenticatedUser) {
		return this.repository.getPagedList(page, limit, name, tipo, user);
	}
}