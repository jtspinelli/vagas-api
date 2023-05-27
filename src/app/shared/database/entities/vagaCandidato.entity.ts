/* eslint-disable indent */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { VagaEntity } from './vaga.entity';

@Entity('vaga_candidato')
export class VagaCandidatoEntity {
	@PrimaryColumn()
	uuid: string;

	@Column({ name: 'vaga_descricao'})
	vagaDescricao: string;

	@Column({ name: 'data_cadastro' })
	dataCadastro: Date;

	@Column()
	sucesso: boolean;

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'candidato_uuid' })
	candidato: UserEntity;

	@ManyToOne(() => VagaEntity)
	@JoinColumn({ name: 'vaga_uuid' })
	vaga: VagaEntity;
}