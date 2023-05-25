/* eslint-disable indent */

import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AutoMap } from '@automapper/classes';

@Entity()
export abstract class BaseEntity {
	@PrimaryColumn()
	@AutoMap()
	uuid?: string;

	@Column({name: 'created_at'})
	@AutoMap()
	createdAt?: Date;

	@BeforeInsert()
	createId(){
		this.uuid = uuid();
		this.createdAt = new Date();
	}
}