/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../main/config/dataSource';
import { Repository } from 'typeorm';
import { VagaEntity } from '../../shared/database/entities/vaga.entity';

export class VagaRepository {
	private vagaRepository: Repository<VagaEntity>;

	constructor() {
		this.vagaRepository = db.getRepository(VagaEntity);
	}

	listAllVagas(): Promise<VagaEntity[]> {
		return this.vagaRepository.find();
	}
}