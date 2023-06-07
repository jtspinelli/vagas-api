/* eslint-disable indent */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { VagaEntity } from './vaga.entity';
import { BaseEntity } from './base.entity';

interface Candidatura {
	uuid: string;
	vagaDescricao: string;
	dataCadastro: Date;
	sucesso: boolean;	
	candidatoId: string;	
	vagaId: string;
}

@Entity('candidaturas')
export class CandidaturaEntity extends BaseEntity {
	@Column({ name: 'vaga_descricao'})
	vagaDescricao: string;

	@Column({ name: 'data_cadastro' })
	dataCadastro: Date;

	@Column({ nullable: true })
	sucesso: boolean;

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'candidato_uuid' })
	candidato: UserEntity;

	@ManyToOne(() => VagaEntity, (vaga) => vaga.candidaturas, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'vaga_uuid' })
	vaga: VagaEntity;

	toJson(): Candidatura {
		return {
			uuid: this.uuid,
			vagaDescricao: this.vaga.descricao,
			dataCadastro: this.dataCadastro,
			sucesso: this.sucesso,
			candidatoId: this.candidato.uuid,
			vagaId: this.vaga.uuid
		};
	}
}