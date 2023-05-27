/* eslint-disable indent */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('vagas')
export class VagaEntity extends BaseEntity {
	@Column()
	descricao: string;

	@Column({ name: 'empresa_nome' })
	empresaNome: string;

	@Column()
	dataLimite: Date;

	@Column()
	ativo: boolean;

	@Column({ name: 'max_candidatos' })
	maxCandidatos: number;

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'recrutador_uuid' })
	recrutador: UserEntity;	
}