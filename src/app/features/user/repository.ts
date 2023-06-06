/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../main/config/dataSource';
import mapper from '../../helpers/mapper';
import { UserEntity } from '../../shared/database/entities/user.entity';
import { Repository } from 'typeorm';
import { appEnv } from '../../env/appEnv';
import { Page } from '../../helpers/Page';
import { RecrutadorUserDTO } from './usecases/getUsers/RecrutadorUserDTO';
import { UserDTO } from './usecases/getUsers/UserDTO';
import { Request } from 'express';

export class UserRepository {
	private userRepository: Repository<UserEntity>;

	constructor() {
		this.userRepository = db.getRepository(UserEntity);
	}

	async getAll(req: Request): Promise<Page<UserDTO | RecrutadorUserDTO>> {
		const { name, tipo } = req.query;
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit || appEnv.paginationLimit);

		const query = this.userRepository
			.createQueryBuilder('userEntity')
			.orderBy('userEntity.criadoEm', 'DESC');

		if(name){
			query.where('lower(userEntity.name) like :name', {name: `%${name}%`});
		}

		if(tipo){
			query.where('lower(userEntity.tipo) = :tipo', {tipo: (tipo as string).toLowerCase()});
		}

		if(req.body.authenticatedUser.isCandidato) {
			query.where('lower(userEntity.tipo) = :tipo', {tipo: 'candidato'});
		}

		if(req.body.authenticatedUser.isRecrutador) {
			query.where('lower(userEntity.tipo) = :tipo', {tipo: 'recrutador'});
		}
		
		query.skip(page * limit - limit);
		query.take(limit);

		const totalPages = Math.ceil(await query.getCount() / limit);
		const count = await query.getCount();	
		const users = (await query.getMany()).map(user => {
			return user.nomeEmpresa === null
				? mapper.map(user, UserEntity, UserDTO)
				: mapper.map(user, UserEntity, RecrutadorUserDTO);
		});

		return new Page<UserDTO | RecrutadorUserDTO>(
			page,
			totalPages,
			count,
			users
		);
	}

	async create(userToCreate: UserEntity): Promise<UserEntity> {
		return await this.userRepository.save(userToCreate);
	}

	async findByUuid(uuid: string) {
		return await this.userRepository.findOneBy({uuid});
	}

	async findByEmail(email: string) {
		return await this.userRepository.findOneBy({email});
	}
}