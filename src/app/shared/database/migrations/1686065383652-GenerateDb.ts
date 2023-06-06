import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateDb1686065383652 implements MigrationInterface {
	name = 'GenerateDb1686065383652';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE TABLE "users" ("uuid" character varying NOT NULL, "criado_em" TIMESTAMP NOT NULL, "atualizado_em" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "nome_empresa" character varying, "tipo" character varying NOT NULL, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))');
		await queryRunner.query('CREATE TABLE "vagas" ("uuid" character varying NOT NULL, "criado_em" TIMESTAMP NOT NULL, "atualizado_em" TIMESTAMP NOT NULL, "descricao" character varying NOT NULL, "recrutador_uuid" character varying NOT NULL, "nome_empresa" character varying NOT NULL, "data_limite" character varying NOT NULL, "max_candidatos" integer NOT NULL, CONSTRAINT "PK_9348d9fcc3376c109247fe5000b" PRIMARY KEY ("uuid"))');
		await queryRunner.query('CREATE TABLE "candidaturas" ("uuid" character varying NOT NULL, "criado_em" TIMESTAMP NOT NULL, "atualizado_em" TIMESTAMP NOT NULL, "vaga_descricao" character varying NOT NULL, "data_cadastro" TIMESTAMP NOT NULL, "sucesso" boolean NOT NULL, "candidato_uuid" character varying, "vaga_uuid" character varying, CONSTRAINT "PK_e73e1a336b7e335c197c1a97a96" PRIMARY KEY ("uuid"))');
		await queryRunner.query('ALTER TABLE "candidaturas" ADD CONSTRAINT "FK_ec862ce1db5845441effc8a962d" FOREIGN KEY ("candidato_uuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
		await queryRunner.query('ALTER TABLE "candidaturas" ADD CONSTRAINT "FK_ee852f2d7132d67311d2bbea02a" FOREIGN KEY ("vaga_uuid") REFERENCES "vagas"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "candidaturas" DROP CONSTRAINT "FK_ee852f2d7132d67311d2bbea02a"');
		await queryRunner.query('ALTER TABLE "candidaturas" DROP CONSTRAINT "FK_ec862ce1db5845441effc8a962d"');
		await queryRunner.query('DROP TABLE "candidaturas"');
		await queryRunner.query('DROP TABLE "vagas"');
		await queryRunner.query('DROP TABLE "users"');
	}

}
