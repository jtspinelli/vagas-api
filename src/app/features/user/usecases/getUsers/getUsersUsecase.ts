/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { UserRepository } from '../../repository';

export class GetUsersUsecase {
	constructor(private repository: UserRepository){		
	}

	async execute(req: Request) {
		return this.repository.getAll(req);
	}
}