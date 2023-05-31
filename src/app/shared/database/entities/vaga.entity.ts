/* eslint-disable indent */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('vagas')
export class VagaEntity extends BaseEntity {
	@Column()
	descricao: string;

	@Column({ name: 'recrutador_uuid' })
	recrutadorUuid: string;

	@Column({ name: 'nome_empresa' })
	nomeEmpresa: string;

	@Column({ name: 'data_limite' })
	dataLimite: string;

	@Column()
	ativo: boolean;

	@Column({ name: 'max_candidatos' })
	maxCandidatos: number;

	// @ManyToOne(() => UserEntity)
	// @JoinColumn({ name: 'recrutador_uuid' })
	// recrutador: UserEntity;	
}