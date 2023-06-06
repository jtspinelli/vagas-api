/* eslint-disable indent */

import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AutoMap } from '@automapper/classes';

@Entity()
export abstract class BaseEntity {
	@PrimaryColumn()
	@AutoMap()
	uuid: string;

	@Column({name: 'criado_em'})
	@AutoMap()
	criadoEm: Date;

	@Column({name: 'atualizado_em'})
	@AutoMap()
	atualizadoEm: Date;

	@BeforeInsert()
	createId(){
		this.uuid = uuid();
		this.criadoEm = new Date();
		this.atualizadoEm = new Date();
	}

	@BeforeUpdate()
	setUpdatedAt(){
		this.atualizadoEm = new Date();
	}
}