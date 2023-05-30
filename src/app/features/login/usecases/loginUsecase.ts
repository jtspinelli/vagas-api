import { UserNotFoundException } from '../../../shared/exceptions/UserNotFoundException';
import { UserRepository } from '../../user/repository';
import { appEnv } from '../../../env/appEnv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserTipo } from '../../user/enums/userTipo';

export interface LoginData {
	email: string;
	senha: string;
}

export class LoginUsecase {
	constructor(private repository: UserRepository){}

	async execute(loginData: LoginData) {
		const user = await this.repository.findByEmail(loginData.email);
		if(!user) throw new UserNotFoundException();

		const authenticated = await bcrypt.compare(loginData.senha, user.senha);

		if(!authenticated) return null;

		return jwt.sign({
			sub: user.uuid,
			name: user.name,
			email: user.email,
			isAdmin: user.tipo === UserTipo.Admin
		}, appEnv.jwtSecret as string, {algorithm: 'HS256'});
	}
}