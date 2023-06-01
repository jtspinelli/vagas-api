/* eslint-disable indent */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { AutoMap } from '@automapper/classes';

@Entity('vagas')
export class VagaEntity extends BaseEntity {
	@Column()
	@AutoMap()
	descricao: string;

	@Column({ name: 'recrutador_uuid' })
	@AutoMap()
	recrutadorUuid: string;

	@Column({ name: 'nome_empresa' })
	@AutoMap()
	nomeEmpresa: string;

	@Column({ name: 'data_limite' })
	@AutoMap()
	dataLimite: string;

	@Column()
	@AutoMap()
	ativo: boolean;

	@Column({ name: 'max_candidatos' })
	@AutoMap()
	maxCandidatos: number;

	// @ManyToOne(() => UserEntity)
	// @JoinColumn({ name: 'recrutador_uuid' })
	// recrutador: UserEntity;	
}