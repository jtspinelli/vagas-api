import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateUsersTable1684975171579 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					new TableColumn({ name: 'uuid', type: 'varchar', isPrimary: true }),
					new TableColumn({ name: 'criado_em', type: 'timestamp' }),
					new TableColumn({ name: 'atualizado_em', type: 'timestamp' }),
					new TableColumn({ name: 'name', type: 'varchar' }),
					new TableColumn({ name: 'email', type: 'varchar' }),
					new TableColumn({ name: 'senha', type: 'varchar' }),
					new TableColumn({ name: 'nome_empresa', type: 'varchar', isNullable: true }),
					new TableColumn({ name: 'tipo', type: 'varchar' })
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
