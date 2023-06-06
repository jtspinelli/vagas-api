import { Repository } from 'typeorm';
import { CandidaturaEntity } from '../../shared/database/entities/candidatura.entity';
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