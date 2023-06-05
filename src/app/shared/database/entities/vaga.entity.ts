/* eslint-disable indent */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { VagaDTO } from '../../../features/vaga/usecases/getVagasUsecase/VagaDTO';

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

	@Column({ name: 'max_candidatos' })
	@AutoMap()
	maxCandidatos: number;

	public get ativa() {
		return new Date(this.dataLimite) > new Date();
	}

	public toJson(): VagaDTO {
		return {
			id: this.uuid,
			criadaEm: this.criadoEm,
			dataLimite: this.dataLimite,
			maxCandidatos: this.maxCandidatos,
			nomeEmpresa: this.nomeEmpresa,
			idRecrutador: this.recrutadorUuid,
			ativa: this.ativa
		};
	}

	// @ManyToOne(() => UserEntity)
	// @JoinColumn({ name: 'recrutador_uuid' })
	// recrutador: UserEntity;	
}