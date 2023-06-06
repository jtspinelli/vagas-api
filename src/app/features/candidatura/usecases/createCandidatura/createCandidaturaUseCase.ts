import { CandidaturaRepository } from './../../repository';
import { CandidaturaEntity } from './../../../../shared/database/entities/candidatura.entity';
import { VagaEntity } from '../../../../shared/database/entities/vaga.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../shared/database/entities/user.entity';
import db from '../../../../../main/config/dataSource';

export class CreateCandidaturaUseCase {
	private candidaturaRepository: CandidaturaRepository;
	private userRepository: Repository<UserEntity>;
	private vagaRepository: Repository<VagaEntity>;
	
	constructor(candidaturaRepository: CandidaturaRepository) {
		this.candidaturaRepository = candidaturaRepository;
		this.userRepository = db.getRepository(UserEntity);
		this.vagaRepository = db.getRepository(VagaEntity);
	}

	async execute(authenticatedUser: { sub: string }, vagaUuid: string) {
		const candidato = await this.userRepository.findOneBy({uuid: authenticatedUser.sub});
		const vaga = await this.vagaRepository.findOneBy({uuid: vagaUuid});
		if(!candidato || !vaga) return;

		const candidatura = new CandidaturaEntity();
		candidatura.vagaDescricao = vaga.descricao;
		candidatura.candidato = candidato;
		candidatura.vaga = vaga;
		candidatura.dataCadastro = new Date();

		return await this.candidaturaRepository.save(candidatura);

	}
}