/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from 'typeorm';
import { CandidaturaEntity } from '../../shared/database/entities/candidatura.entity';
import { appEnv } from '../../env/appEnv';
import { Page } from '../../helpers/Page';
import { VagaDTO } from '../vaga/usecases/getVagasUsecase/VagaDTO';
import { VagaComCandidatosDTO } from '../vaga/usecases/getVagasUsecase/VagaComCandidatosDTO';
import { UserEntity } from '../../shared/database/entities/user.entity';
import { UserDTO } from '../user/usecases/getUsers/UserDTO';
import { CacheRedisRepository } from '../cache/repository';
import db from '../../../main/config/dataSource';
import mapper from '../../helpers/mapper';
import redisConn from '../../../main/config/redis';

export class CandidaturaRepository {
	private candidaturaRepository: Repository<CandidaturaEntity>;
	private cacheRedisRepository: CacheRedisRepository;
	constructor() {
		this.candidaturaRepository = db.getRepository(CandidaturaEntity);
		this.cacheRedisRepository = new CacheRedisRepository(redisConn);
	}

	async getAll() {
		return await this.candidaturaRepository.find();
	}

	async getByCandidato(candidatoUuid: string) {
		return await this.candidaturaRepository.createQueryBuilder('candidatura')
			.leftJoinAndSelect('candidatura.candidato', 'candidato')
			.leftJoinAndSelect('candidatura.vaga', 'vaga')
			.where('candidatura.candidato_uuid = :candidatoUuid', {candidatoUuid})
			.getMany();
	}

	async getVagasAplicadasByCandidatoPagedList(queryParams: any, candidatoUuid: string) {
		const page = Number(queryParams.page) || 1;
		const limit = Number(queryParams.limit || appEnv.paginationLimit);

		const query = this.candidaturaRepository.createQueryBuilder('candidatura')
			.orderBy('candidatura.criadoEm', 'DESC')
			.leftJoinAndSelect('candidatura.candidato', 'candidato')
			.leftJoinAndSelect('candidatura.vaga', 'vaga')
			.where('candidatura.candidato_uuid = :candidatoUuid', {candidatoUuid});
		
		query.skip(page * limit - limit);
		query.take(limit);

		const totalPages = Math.ceil(await query.getCount() / limit);
		const count = await query.getCount();
		const vagas = (await query.getMany()).map(c => c.vaga.toJson());

		return new Page<VagaDTO>(
			page, totalPages, count, vagas
		);
	}

	async getByVaga(vagaUuid: string) {
		return await this.candidaturaRepository
			.createQueryBuilder('candidatura')
			.orderBy('candidatura.criadoEm', 'DESC')
			.leftJoinAndSelect('candidatura.candidato', 'candidato')
			.leftJoinAndSelect('candidatura.vaga', 'vaga')
			.where('vaga.uuid = :vagaUuid', {vagaUuid})
			.getMany();
	}

	async getByVagaPagedList(queryParams: any, vagaUuid: string) {
		const page = Number(queryParams.page) || 1;
		const limit = Number(queryParams.limit || appEnv.paginationLimit);

		const query = this.candidaturaRepository.createQueryBuilder('candidatura')
			.leftJoinAndSelect('candidatura.candidato', 'candidato')
			.leftJoinAndSelect('candidatura.vaga', 'vaga')
			.where('candidatura.vaga_uuid = :vagaUuid', {vagaUuid});			

		query.skip(page * limit - limit);
		query.take(limit);

		const totalPages = Math.ceil(await query.getCount() / limit);
		const count = await query.getCount();
		const candidaturas = await query.getMany();

		return new Page<CandidaturaEntity>(
			page, totalPages, count, candidaturas
		);
	}

	async getByVagaCreatedByRecrutadorPagedList(queryParams: any, vagaUuid: string, recrutadorUuid: string) {
		const page = Number(queryParams.page) || 1;
		const limit = Number(queryParams.limit || appEnv.paginationLimit);

		const query = this.candidaturaRepository.createQueryBuilder('candidatura')
			.leftJoinAndSelect('candidatura.candidato', 'candidato')
			.leftJoinAndSelect('candidatura.vaga', 'vaga')
			.where('vaga.recrutador_uuid = :recrutadorUuid', {recrutadorUuid})
			.andWhere('candidatura.vaga_uuid = :vagaUuid', {vagaUuid});			

		query.skip(page * limit - limit);
		query.take(limit);

		const totalPages = Math.ceil(await query.getCount() / limit);
		const count = await query.getCount();
		const candidaturas = await query.getMany();

		return new Page<CandidaturaEntity>(
			page, totalPages, count, candidaturas
		);
	}

	async getVagasCreatedByRecrutadorComCandidatosPagedList(queryParams: any, recrutadorUuid: string) {
		const page = Number(queryParams.page) || 1;
		const limit = Number(queryParams.limit || appEnv.paginationLimit);

		const query = this.candidaturaRepository.createQueryBuilder('candidatura')
			.leftJoinAndSelect('candidatura.candidato', 'candidato')
			.leftJoinAndSelect('candidatura.vaga', 'vaga')
			.where('vaga.recrutador_uuid = :recrutadorUuid', {recrutadorUuid});	

		query.skip(page * limit - limit);
		query.take(limit);

		const totalPages = Math.ceil(await query.getCount() / limit);
		const candidaturas = await query.getMany();

		const vagas = candidaturas.reduce((acc, curr) => {
			const vagaComCandidato = acc.find(x => x.id === curr.vaga.uuid);
			if(vagaComCandidato) {
				vagaComCandidato.candidatos.push(mapper.map(curr.candidato, UserEntity, UserDTO));
				return acc;
			}

			acc.push({
				...curr.vaga.toJson(),
				candidatos: [mapper.map(curr.candidato, UserEntity, UserDTO)]
			});

			return acc;
		}, [] as VagaComCandidatosDTO[]);

		return new Page<VagaComCandidatosDTO>(
			page, totalPages, vagas.length, vagas
		);
	}

	async invalidateGetVagasCachedQueries() {
		this.cacheRedisRepository.invalidateGetVagasCachedQueries();
	}

	async save(candidatura: CandidaturaEntity) {
		this.invalidateGetVagasCachedQueries();
		return await this.candidaturaRepository.save(candidatura);
	}

	async remove(candidatura: CandidaturaEntity) {
		this.invalidateGetVagasCachedQueries();
		return await this.candidaturaRepository.remove(candidatura);
	}
}