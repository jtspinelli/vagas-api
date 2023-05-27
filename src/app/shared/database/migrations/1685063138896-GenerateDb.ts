import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateDb1685063138896 implements MigrationInterface {
	name = 'GenerateDb1685063138896';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE TABLE "users" ("uuid" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "nome_empresa" character varying, "tipo" character varying NOT NULL, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))');
		await queryRunner.query('CREATE TABLE "vagas" ("uuid" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "descricao" character varying NOT NULL, "empresa_nome" character varying NOT NULL, "dataLimite" TIMESTAMP NOT NULL, "ativo" boolean NOT NULL, "max_candidatos" integer NOT NULL, "recrutador_uuid" character varying, CONSTRAINT "PK_9348d9fcc3376c109247fe5000b" PRIMARY KEY ("uuid"))');
		await queryRunner.query('CREATE TABLE "vaga_candidato" ("uuid" character varying NOT NULL, "vaga_descricao" character varying NOT NULL, "data_cadastro" TIMESTAMP NOT NULL, "sucesso" boolean NOT NULL, "candidato_uuid" character varying, "vaga_uuid" character varying, CONSTRAINT "PK_11e4e74a3b5f2d88f6176f17feb" PRIMARY KEY ("uuid"))');
		await queryRunner.query('ALTER TABLE "vagas" ADD CONSTRAINT "FK_9c6cb12b1f61a188a67d5ef1a36" FOREIGN KEY ("recrutador_uuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
		await queryRunner.query('ALTER TABLE "vaga_candidato" ADD CONSTRAINT "FK_30f44a0d8b7e4bd59169e156bdd" FOREIGN KEY ("candidato_uuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
		await queryRunner.query('ALTER TABLE "vaga_candidato" ADD CONSTRAINT "FK_d986040d9aa72d5ad256209786b" FOREIGN KEY ("vaga_uuid") REFERENCES "vagas"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "vaga_candidato" DROP CONSTRAINT "FK_d986040d9aa72d5ad256209786b"');
		await queryRunner.query('ALTER TABLE "vaga_candidato" DROP CONSTRAINT "FK_30f44a0d8b7e4bd59169e156bdd"');
		await queryRunner.query('ALTER TABLE "vagas" DROP CONSTRAINT "FK_9c6cb12b1f61a188a67d5ef1a36"');
		await queryRunner.query('DROP TABLE "vaga_candidato"');
		await queryRunner.query('DROP TABLE "vagas"');
		await queryRunner.query('DROP TABLE "users"');
	}

}
