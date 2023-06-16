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
import { CacheRedisRepository } from '../cache/repository';
import { IAuthenticatedUser } from '../../shared/middlewares/IAuthenticatedUser';
import { Request } from 'express';
import mapper from '../../helpers/mapper';

export class VagaRepository {
	private vagaRepository: Repository<VagaEntity>;
	private cacheRedisRepository: CacheRedisRepository;

	constructor() {
		this.vagaRepository = db.getRepository(VagaEntity);
		this.cacheRedisRepository = new CacheRedisRepository();
	}

	resolveCacheKey(req: Request) {
		const { limit, page, descricao, criadoEm, recrutadorId, ativa } = req.query;
		const userTipo = req.body.authenticatedUser.isAdmin
			? ':userIs=Admin'
			: req.body.authenticatedUser.isRecrutador
				? ':userIs=Recrutador'
				: ':userIs=Candidato';

		let key = `getvagas${userTipo}:`;

		if(limit) key += `limit=${limit}&`;
		if(page) key += `page=${page}&`;
		if(descricao) key += `&descricao=${descricao}&`;
		if(criadoEm) key += `&criadoEm=${criadoEm}&`;
		if(recrutadorId) key += `&recrutadorId=${recrutadorId}&`;
		if(ativa) key += `&ativa=${ativa}&`;

		if(key.endsWith('&')) key = key.substring(0,key.length - 1);

		return key;
	}

	async get(uuid: string) {
		const cacheKey = `getvaga:${uuid}`;
		const cachedQuery = await this.cacheRedisRepository.get(cacheKey);
		if(cachedQuery) return cachedQuery;

		const vaga = await this.vagaRepository.findOneBy({uuid});

		this.cacheRedisRepository.set(cacheKey, vaga as VagaEntity);

		return vaga;
	}	

	async getPagedList(req: Request, filterSemCandidaturas: boolean = false, filterFullCandidaturas: boolean = false): Promise<Page<VagaDTO>> {
		const resolvedKey = this.resolveCacheKey(req);
		const cachedQuery = await this.cacheRedisRepository.get(resolvedKey);
		if(cachedQuery) return cachedQuery;
		
		const { descricao, criadoEm, recrutadorId, ativa } = req.query;
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit || appEnv.paginationLimit);
		const authenticatedUser: IAuthenticatedUser = req.body.authenticatedUser;

		const query = this.vagaRepository
			.createQueryBuilder('vagaEntity')
			.leftJoinAndSelect('vagaEntity.candidaturas', 'candidaturas')
			.orderBy('vagaEntity.criadoEm', 'DESC');

		if(descricao){
			query.where('lower(vagaEntity.descricao) like :descricao', {descricao: `%${descricao}%`});
		}

		if(authenticatedUser.isAdmin && criadoEm) {
			query.where('vagaEntity.criadoEm <= :criadoEm', {criadoEm});
		}

		if(authenticatedUser.isAdmin && recrutadorId) {
			query.where('vagaEntity.recrutador_uuid = :recrutadorId', {recrutadorId});
		}

		if(authenticatedUser.isAdmin && ativa) {
			query.where('vagaEntity.ativa = :ativa', {ativa});
		}

		if(authenticatedUser.isAdmin && filterSemCandidaturas) {
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

		if(authenticatedUser.isAdmin && filterFullCandidaturas) {
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
		const pagedList = new Page<VagaDTO>(
			page, totalPages, count, vagas
		);

		this.cacheRedisRepository.set(resolvedKey, pagedList);

		return pagedList;
	}

	async getVagasSemCandidaturas(req: Request) {
		return await this.getPagedList(req, true, false);
	}

	async getVagasFullCandidaturas(req: Request) {
		return await this.getPagedList(req, false, true);
	}

	async getVagasFromRecrutador(req: Request) {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit || appEnv.paginationLimit);
		const authenticatedUser: IAuthenticatedUser = req.body.authenticatedUser;

		const query = this.vagaRepository
			.createQueryBuilder('vaga')
			.leftJoinAndSelect('vaga.candidaturas', 'candidaturas')
			.leftJoinAndSelect('candidaturas.candidato', 'candidaturaCandidato')
			.orderBy('vaga.criadoEm', 'DESC')
			.where('vaga.recrutadorUuid = :recrutadorUuid', {recrutadorUuid: authenticatedUser.sub});
		
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

	async invalidateGetVagasCachedQueries() {
		await this.cacheRedisRepository.invalidateGetVagasCachedQueries();
	}

	async create(vagaToCreate: VagaEntity) {	
		this.invalidateGetVagasCachedQueries();
		return this.vagaRepository.save(vagaToCreate);
	}

	async remove(vaga: VagaEntity) {
		this.invalidateGetVagasCachedQueries();
		return await this.vagaRepository.remove(vaga);
	}

	async updateAtiva(vaga: VagaEntity, value: boolean) {
		vaga.ativa = value;
		await this.vagaRepository.save(vaga);
		this.invalidateGetVagasCachedQueries();
	}

	invalidate(key: string) {
		this.cacheRedisRepository.invalidate(key);
	}
}