import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateCandidaturasTable1685993203025 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'candidaturas',
				columns: [
					new TableColumn({ name: 'uuid', type: 'varchar', isPrimary: true }),
					new TableColumn({ name: 'criado_em', type: 'timestamp' }),
					new TableColumn({ name: 'atualizado_em', type: 'timestamp' }),
					new TableColumn({ name: 'vaga_descricao', type: 'varchar' }),
					new TableColumn({ name: 'data_cadastro', type: 'timestamp' }),
					new TableColumn({ name: 'sucesso', type: 'boolean', isNullable: true }),
					new TableColumn({ name: 'candidato_uuid', type: 'varchar' }),
					new TableColumn({ name: 'vaga_uuid', type: 'varchar' }),
				],
				foreignKeys: [
					{
						columnNames: ['candidato_uuid'],
						referencedTableName: 'users',
						referencedColumnNames: ['uuid']
					},
					{
						columnNames: ['vaga_uuid'],
						referencedTableName: 'vagas',
						referencedColumnNames: ['uuid'],
						onDelete: 'CASCADE'
					},
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('candidaturas');
	}

}
