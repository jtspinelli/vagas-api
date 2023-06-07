import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateVagasTable1685571391859 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'vagas',
				columns: [
					new TableColumn({ name: 'uuid', type: 'varchar', isPrimary: true }),
					new TableColumn({ name: 'criado_em', type: 'timestamp' }),
					new TableColumn({ name: 'atualizado_em', type: 'timestamp' }),
					new TableColumn({ name: 'recrutador_uuid', type: 'varchar' }),
					new TableColumn({ name: 'descricao', type: 'varchar' }),
					new TableColumn({ name: 'nome_empresa', type: 'varchar' }),
					new TableColumn({ name: 'data_limite', type: 'timestamp' }),
					new TableColumn({ name: 'ativa', type: 'boolean', default: true }),
					new TableColumn({ name: 'max_candidatos', type: 'int', isNullable: true })
				],
				foreignKeys: [
					{
						columnNames: ['recrutador_uuid'],
						referencedTableName: 'users',
						referencedColumnNames: ['uuid']
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('vagas');
	}

}
