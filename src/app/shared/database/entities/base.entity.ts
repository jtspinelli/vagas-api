/* eslint-disable indent */

import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export abstract class BaseEntity {
	@PrimaryColumn()
	uuid?: string;

	@Column({name: 'created_at'})
	createdAt?: Date;

	@BeforeInsert()
	createId(){
		this.uuid = uuid();
		this.createdAt = new Date();
	}
}