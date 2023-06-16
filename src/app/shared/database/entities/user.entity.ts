import { UserToCreateDTO } from './../../../features/user/usecases/createUser/UserToCreateDTO';
/* eslint-disable indent */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { UserDTO } from '../../../features/user/usecases/getUsers/UserDTO';
import { UserTipo } from '../../../features/user/enums/userTipo';
import { RecrutadorUserDTO } from '../../../features/user/usecases/getUsers/RecrutadorUserDTO';

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

	toUserDto(): UserDTO {
		const a = new UserDTO();
		a.name = this.name;
		a.uuid = this.uuid;
		a.email = this.email;
		a.createdAt = this.criadoEm;
		a.updatedAt = this.atualizadoEm;
		a.tipo = this.tipo === 'Admin'
		? UserTipo.Admin
		: this.tipo === 'Recrutador'
		? UserTipo.Recrutador
		: UserTipo.Candidato;

		return a;
	}

	toRecrutadorUserDto(): RecrutadorUserDTO {
		const a = new RecrutadorUserDTO();
		a.uuid = this.uuid;
		a.email = this.email;
		a.createdAt = this.criadoEm;
		a.updatedAt = this.atualizadoEm;
		a.tipo = UserTipo.Recrutador;
		a.nomeEmpresa = this.nomeEmpresa;

		return a;
	}
}