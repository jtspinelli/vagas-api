import { Repository } from 'typeorm';
import { CandidaturaEntity } from '../../shared/database/entities/candidatura.entity';
import { appEnv } from '../../env/appEnv';
import { Page } from '../../helpers/Page';
import { VagaDTO } from '../vaga/usecases/getVagasUsecase/VagaDTO';
import db from '../../../main/config/dataSource';

export class CandidaturaRepository {
	private candidaturaRepository: Repository<CandidaturaEntity>;

	constructor() {
		this.candidaturaRepository = db.getRepository(CandidaturaEntity);
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

	async getVagasAplicadasByCandidato(queryParams: any, candidatoUuid: string) {
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
		return await this.candidaturaRepository.createQueryBuilder('candidatura')
			.leftJoinAndSelect('candidatura.candidato', 'candidato')
			.leftJoinAndSelect('candidatura.vaga', 'vaga')
			.where('candidatura.vaga_uuid = :vagaUuid', {vagaUuid})
			.getMany();
	}

	async save(candidatura: CandidaturaEntity) {
		return await this.candidaturaRepository.save(candidatura);
	} 
}