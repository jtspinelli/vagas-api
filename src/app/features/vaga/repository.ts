/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../main/config/dataSource';
import { Repository } from 'typeorm';
import { VagaEntity } from '../../shared/database/entities/vaga.entity';
import { appEnv } from '../../env/appEnv';
import { VagaDTO } from './usecases/getVagasUsecase/VagaDTO';
import { Page } from '../../helpers/Page';
import { UserEntity } from '../../shared/database/entities/user.entity';
import { UserDTO } from '../user/usecases/getUsers/UserDTO';
import { VagaComCandidatosDTO } from './usecases/getVagasUsecase/VagaComCandidatosDTO';
import mapper from '../../helpers/mapper';

export class VagaRepository {
	private vagaRepository: Repository<VagaEntity>;

	constructor() {
		this.vagaRepository = db.getRepository(VagaEntity);
	}

	async get(uuid: string) {
		return this.vagaRepository.findOneBy({uuid});
	}

	async getPagedList(queryParams: any): Promise<Page<VagaDTO>> {
		const { descricao } = queryParams;
		const page = Number(queryParams.page) || 1;
		const limit = Number(queryParams.limit || appEnv.paginationLimit);

		const query = this.vagaRepository
			.createQueryBuilder('vagaEntity')
			.orderBy('vagaEntity.criadoEm', 'DESC');

		if(descricao){
			query.where('lower(vagaEntity.descricao) like :descricao', {descricao: `%${descricao}%`});
		}

		query.skip(page * limit - limit);
		query.take(limit);

		const totalPages = Math.ceil(await query.getCount() / limit);
		const count = await query.getCount();
		const vagas = (await query.getMany()).map(vaga =>vaga.toJson());

		return new Page<VagaDTO>(
			page, totalPages, count, vagas
		);
	}

	async getVagasFromRecrutador(queryParams: any, recrutadorUuid: string) {
		const page = Number(queryParams.page) || 1;
		const limit = Number(queryParams.limit || appEnv.paginationLimit);

		const query = this.vagaRepository
			.createQueryBuilder('vaga')
			.leftJoinAndSelect('vaga.candidaturas', 'candidaturas')
			.leftJoinAndSelect('candidaturas.candidato', 'candidaturaCandidato')
			.orderBy('vaga.criadoEm', 'DESC')
			.where('vaga.recrutadorUuid = :recrutadorUuid', {recrutadorUuid});
		
		query.skip(page * limit - limit);
		query.take(limit);

		const totalPages = Math.ceil(await query.getCount() / limit);
		const count = await query.getCount();
		const vagas: VagaComCandidatosDTO[] = (await query.getMany()).map(vaga => {
			return {
				...vaga.toJson(),
				candidatos: vaga.candidaturas.map(c => mapper.map(c.candidato, UserEntity, UserDTO))
			};
		});

		return new Page<VagaComCandidatosDTO>(page, totalPages, count, vagas);
	}

	async create(vagaToCreate: VagaEntity) {		
		return this.vagaRepository.save(vagaToCreate);
	}

	async remove(vaga: VagaEntity) {
		return await this.vagaRepository.remove(vaga);
	}
}