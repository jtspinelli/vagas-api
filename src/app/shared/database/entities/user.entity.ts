/* eslint-disable indent */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AutoMap } from '@automapper/classes';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
	@Column()
	@AutoMap()
	name: string;

	@Column()
	@AutoMap()
	email: string;

	@Column()
	@AutoMap()
	senha: string;
	
	@Column({ name: 'nome_empresa', nullable: true })
	@AutoMap()
	nomeEmpresa: string;

	@Column()
	tipo: string;	
}