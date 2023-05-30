export class UserNotFoundException extends Error {
	constructor(){
		super();
		this.message = 'Usuário não encontrado.';
	}
}