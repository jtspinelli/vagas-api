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

	async save(candidatura: CandidaturaEntity) {
		return await this.candidaturaRepository.save(candidatura);
	} 
}