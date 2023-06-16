import { app } from './../../../../../src/main/index';
import { randomUUID } from 'crypto';
import { UserDTO } from '../../../../../src/app/features/user/usecases/getUsers/UserDTO';
import request from 'supertest';
import db from '../../../../../src/main/config/dataSource';
import dotenv from 'dotenv';

dotenv.config();

describe('[integration - user routes]', () => {
	const accessToken = process.env.ADMIN_TOKEN_EXAMPLE as string;
	const candidatoAccessToken = process.env.CANDIDATO_TOKEN_EXAMPLE as string;
	const recrutadorAccessToken = process.env.RECRUTADOR_TOKEN_EXAMPLE as string;

	describe('[POST /users] [CREATE USER]', () => {
		beforeAll(async() => {
			await db.initialize();
		});

		afterAll(async() => {
			await db.destroy();
		});

		test('retorna 401 (não autorizado) se Token ausente', async () => {
			const result = await request(app).post('/users');

			expect(result.statusCode).toBe(401);
			expect(result.text).toBe('AccessToken não encontrado.');
		});

		test('retorna 401 (não autorizado) se Token inválido', async () => {
			const result = await request(app).post('/users').set('Authorization', 'abc123');

			expect(result.statusCode).toBe(401);			
			expect(result.text).toBe('AcessToken inválido.');
		});

		test('retorna 400 (bad request) se propriedade \'name\' não for string', async () => {
			const result = await request(app)
				.post('/users')
				.set('Authorization', accessToken)
				.send({name: 123});

			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('Name inválido ou ausente');
				
		});

		test('retorna 400 (bad request) se propriedade \'email\' não for string', async () => {
			const result = await request(app)
				.post('/users')
				.set('Authorization', accessToken)
				.send({name: 'João', email: true});

			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('Email inválido ou ausente');			
		});

		test('retorna 400 (bad request) se propriedade \'senha\' não for string', async () => {
			const result = await request(app)
				.post('/users')
				.set('Authorization', accessToken)
				.send({name: 'João', email: 'joao@g.com', senha: {secure: true}});

			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('Senha inválido ou ausente');			
		});

		test('retorna 400 (bad request) se propriedade \'tipo\' for iválida', async () => {
			const result = await request(app)
				.post('/users')
				.send({name: 'João', email: 'joao@g.com', senha: 'joao123*', tipo: 'Forte Candidato'})
				.set('Authorization', accessToken);

			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('Tipo inválido');			
		});

		test('retorna 400 (bad request) se propriedade \'nomeEmpresa\' for iválida', async () => {
			const result = await request(app)
				.post('/users')
				.send({name: 'João', email: 'joao@g.com', senha: 'joao123*', tipo: 'Candidato', nomeEmpresa: true})
				.set('Authorization', accessToken);

			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('nomeEmpresa inválido');			
		});

		test('retorna 401 (não autorizado) se já houver cadastro com o email informado', async () => {
			const result = await request(app)
				.post('/users')
				.send({name: 'João Pedro', email: 'joao@g.com', senha: 'joao123*', tipo: 'Candidato'})
				.set('Authorization', accessToken);
			
			expect(result.statusCode).toBe(401);
			expect(result.text).toBe('Email indiponível');			
		});

		test('retorna 403 (forbidden) ao tentar criar Recrutador sem accessToken de Admin', async () => {
			const result = await request(app)
				.post('/users')
				.send({name: 'Isabella', email: 'bella@g.com', senha: 'joao123*', tipo: 'Recrutador'})
				.set('Authorization', candidatoAccessToken);

			expect(result.statusCode).toBe(403);
			expect(result.body.message).toBe('Apenas usuário Admin pode criar Recrutadores.');			
		});

		test('retorna 403 (forbidden) ao tentar criar Admin sem accessToken de Admin', async () => {
			const result = await request(app)
				.post('/users')
				.send({name: 'Isabella', email: 'bella@g.com', senha: 'joao123*', tipo: 'Admin'})
				.set('Authorization', candidatoAccessToken);

			expect(result.statusCode).toBe(403);
			expect(result.body.message).toBe('Apenas usuário Admin pode criar outro Admin');			
		});

		test('retorna um UserDTO quando create realizado com sucesso', async () => {
			const result = await request(app)
				.post('/users')
				.set('Authorization', accessToken)
				.send({name: 'Mariana', email: randomUUID(), senha: 'mari123*', tipo: 'Recrutador'});

			expect(result.statusCode).toBe(201);
			expect(result.body.name).toBe('Mariana');			
		});
	});

	describe('[GET /users] [GET USERS]', () => {
		beforeAll(async() => {
			await db.initialize();
		});

		afterAll(async() => {
			await db.destroy();
		});

		test('retorna 401 (não autorizado) se Token ausente', async () => {
			const result = await request(app)
				.get('/users');

			expect(result.status).toBe(401);
			expect(result.text).toBe('AccessToken não encontrado.');
		});

		test('retorna 400 (bad request) se queryParam \'limit\' for maior que 10', async () => {
			const result = await request(app)
				.get('/users')
				.set('Authorization', accessToken)
				.query({limit: 15});

			expect(result.status).toBe(400);
			expect(result.text).toBe('Propriedade limit inválida.');
		});

		test('retorna 400 (bad request) se queryParam \'limit\' não for número', async () => {
			const result = await request(app)
				.get('/users')
				.set('Authorization', accessToken)
				.query({limit: false});
			
			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('Propriedade limit inválida.');
		});

		test('retorna 400 (bad request) se queryParam \'page\' for menor que 0', async () => {
			const result = await request(app)
				.get('/users')
				.set('Authorization', accessToken)
				.query({page: -2});
			
			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('Propriedade page inválida.');
		});

		test('retorna 400 (bad request) se queryParam \'page\' não for número', async () => {
			const result = await request(app)
				.get('/users')
				.set('Authorization', accessToken)
				.query({page: 'hello'});
			
			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('Propriedade page inválida.');
		});

		test('retorna 400 (bad request) se queryParam \'tipo\' for inválido', async () => {
			const result = await request(app)
				.get('/users')
				.set('Authorization', accessToken)
				.query({tipo: 'Candidate'});
			
			expect(result.statusCode).toBe(400);
			expect(result.text).toBe('Propriedade tipo inválida.');
		});

		test('retorna 200 (OK) com lista paginada de todos os usuários se autorização de Admin', async () => {
			const result = await request(app)
				.get('/users')
				.set('Authorization', accessToken)
				.query({limit: 4});
			
			expect(result.statusCode).toBe(200);
			expect(result.body.data.length).toBeLessThanOrEqual(4);
		});

		test('retorna 200 (OK) com lista paginada de usuários do tipo \'Candidato\' se autorização de \'Candidato\'', async () => {
			const result = await request(app)
				.get('/users')
				.set('Authorization', candidatoAccessToken)
				.query({limit: 10, page: 0});
			
			expect(result.statusCode).toBe(200);
			expect(result.body.data.length).toBeLessThanOrEqual(10);
			result.body.data.forEach((user: UserDTO) => {
				expect(user.tipo === 'Candidato');
			});
		});

		test('retorna 200 (OK) com lista paginada de usuários do tipo \'Recrutador\' se autorização de \'Recrutador\'', async () => {
			const result = await request(app)
				.get('/users')
				.set('Authorization', recrutadorAccessToken)
				.query({limit: 10, page: 0});
			
			expect(result.statusCode).toBe(200);
			expect(result.body.data.length).toBeLessThanOrEqual(10);
			result.body.data.forEach((user: UserDTO) => {
				expect(user.tipo === 'Recrutador');
			});
		});
	});
});