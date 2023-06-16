import { UserTipo } from '../../../../../src/app/features/user/enums/userTipo';
import { UserRepository } from '../../../../../src/app/features/user/repository';
import { UserDTO } from '../../../../../src/app/features/user/usecases/getUsers/UserDTO';
import { Page } from '../../../../../src/app/helpers/Page';
import { GetUsersUsecase } from './../../../../../src/app/features/user/usecases/getUsers/getUsersUsecase';

describe.skip('get users', () => {
	test('retorna uma lista paginada de UserDTO', async () => {
		jest.mock('../../../../../src/app/features/user/repository.ts');
	
		const userList: UserDTO[] = [
			{
				uuid: 'dsasadasd',
				name: 'Jonas',
				createdAt: new Date(),
				updatedAt: new Date(),
				email: 'jo@nas.com',
				tipo: UserTipo.Candidato
			},
			{
				uuid: 'dsasadasd',
				name: 'Jonas',
				createdAt: new Date(),
				updatedAt: new Date(),
				email: 'jo@nas.com',
				tipo: UserTipo.Candidato
			},
			{
				uuid: 'dsasadasd',
				name: 'Jonas',
				createdAt: new Date(),
				updatedAt: new Date(),
				email: 'jo@nas.com',
				tipo: UserTipo.Candidato
			},
			{
				uuid: 'dsasadasd',
				name: 'Jonas',
				createdAt: new Date(),
				updatedAt: new Date(),
				email: 'jo@nas.com',
				tipo: UserTipo.Candidato
			}
		];	
		const page = new Page<UserDTO>(1, 2, 4, userList);
	
		const repository = new UserRepository();
	
		jest.spyOn(repository, 'getPagedList').mockResolvedValue(page);
	
		const result = await new GetUsersUsecase(repository).execute(
			1, 10, undefined, undefined, { 
				sub: 'asddasd2313sd',
				isCandidato: false,
				isAdmin: true,
				isRecrutador: false
			}
		);
	
		expect(result).toBeInstanceOf(Page);
		expect(result.data.length).toBe(4);
	});
});