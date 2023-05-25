/* eslint-disable indent */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	senha: string;
	
	@Column({ name: 'nome_empresa' })
	nomeEmpresa: string;

	@Column()
	tipo: string;	
}