export interface IAuthenticatedUser {
	sub: string;	
	isCandidato: boolean;
	isAdmin: boolean;
	isRecrutador: boolean;
}