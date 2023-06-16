/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRepository } from '../../../../../src/app/features/user/repository';
import { CreateUserUsecase } from '../../../../../src/app/features/user/usecases/createUser/createUserUsecase';
import { RecrutadorUserDTO } from '../../../../../src/app/features/user/usecases/getUsers/RecrutadorUserDTO';
import { UserDTO } from '../../../../../src/app/features/user/usecases/getUsers/UserDTO';
import db from '../../../../../src/main/config/dataSource';

describe.skip('createUserUsecase retorna ', () => {
	jest.mock('../../../../../src/app/features/user/repository.ts');

	const makeSut = () => {
		return new CreateUserUsecase(new UserRepository());
	};	

	beforeAll(async() => await db.initialize());
	afterAll(async() => await db.close());
	beforeEach(() => jest.clearAllMocks());

	test('cria usuario Admin e retorna um UserDTO', async () => {
		const sut = makeSut();
		const result = await sut.execute({
			name: 'Jaja',
			email: 'agaga@aga.com',
			senha: 'umdois3',
			tipo: 'Admin',
			nomeEmpresa: undefined
		});

		expect(result).toBeInstanceOf(UserDTO);
	});

	test('cria usuario Recrutador e retorna um RecrutadorUserDTO', async () => {
		const sut = makeSut();
		const result = await sut.execute({
			name: 'Jaja',
			email: 'agaga@aga.com',
			senha: 'umdois3',
			tipo: 'Recrutador',
			nomeEmpresa: 'Empresa Corp'
		});

		expect(result).toBeInstanceOf(RecrutadorUserDTO);
	});
});