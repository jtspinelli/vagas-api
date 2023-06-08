/* eslint-disable @typescript-eslint/no-inferrable-types */
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

	async getPagedList(queryParams: any, isAdmin: boolean, filterSemCandidaturas: boolean = false, filterFullCandidaturas: boolean = false): Promise<Page<VagaDTO>> {
		const { descricao, criadoEm, recrutadorId, ativa } = queryParams;
		const page = Number(queryParams.page) || 1;
		const limit = Number(queryParams.limit || appEnv.paginationLimit);

		const query = this.vagaRepository
			.createQueryBuilder('vagaEntity')
			.leftJoinAndSelect('vagaEntity.candidaturas', 'candidaturas')
			.orderBy('vagaEntity.criadoEm', 'DESC');

		if(descricao){
			query.where('lower(vagaEntity.descricao) like :descricao', {descricao: `%${descricao}%`});
		}

		if(isAdmin && criadoEm) {
			query.where('vagaEntity.criadoEm <= :criadoEm', {criadoEm});
		}

		if(isAdmin && recrutadorId) {
			query.where('vagaEntity.recrutador_uuid = :recrutadorId', {recrutadorId});
		}

		if(isAdmin && ativa) {
			query.where('vagaEntity.ativa = :ativa', {ativa});
		}

		if(isAdmin && filterSemCandidaturas) {
			query.where(qb => {	
				const subQuery = qb
					.subQuery()
					.select('vagaEntity.uuid')
					.from(VagaEntity, 'vagaEntity')
					.where('candidaturas.uuid is null')
					.getQuery();
				return 'vagaEntity.uuid IN ' + subQuery;
			});

			query.loadRelationCountAndMap('vagaEntity.candidaturasCount', 'vagaEntity.candidaturas');
		}

		if(isAdmin && filterFullCandidaturas) {
			query.where(qb => {
				const subQuery = qb
					.subQuery()
					.select('vagaEntity.uuid')
					.from(VagaEntity, 'vagaEntity')
					.groupBy('vagaEntity.uuid')
					.having('COUNT(*) = vagaEntity.max_candidatos')
					.getQuery();
				return 'vagaEntity.uuid IN ' + subQuery;
			});

			query.loadRelationCountAndMap('vagaEntity.candidaturasCount', 'vagaEntity.candidaturas');
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

	async getVagasSemCandidaturas(queryParams: any) {
		return await this.getPagedList(queryParams, true, true);
	}

	async getVagasFullCandidaturas(queryParams: any) {
		return await this.getPagedList(queryParams, true, false, true);
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