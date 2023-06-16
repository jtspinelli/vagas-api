import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateDb1686789291223 implements MigrationInterface {
	name = 'GenerateDb1686789291223';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE TABLE "users" ("uuid" varchar PRIMARY KEY NOT NULL, "criado_em" datetime NOT NULL, "atualizado_em" datetime NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "nome_empresa" varchar, "tipo" varchar NOT NULL)');
		await queryRunner.query('CREATE TABLE "vagas" ("uuid" varchar PRIMARY KEY NOT NULL, "criado_em" datetime NOT NULL, "atualizado_em" datetime NOT NULL, "descricao" varchar NOT NULL, "recrutador_uuid" varchar NOT NULL, "nome_empresa" varchar NOT NULL, "data_limite" varchar NOT NULL, "max_candidatos" integer NOT NULL, "ativa" boolean NOT NULL)');
		await queryRunner.query('CREATE TABLE "candidaturas" ("uuid" varchar PRIMARY KEY NOT NULL, "criado_em" datetime NOT NULL, "atualizado_em" datetime NOT NULL, "vaga_descricao" varchar NOT NULL, "data_cadastro" datetime NOT NULL, "sucesso" boolean, "candidato_uuid" varchar, "vaga_uuid" varchar)');
		await queryRunner.query('CREATE TABLE "temporary_candidaturas" ("uuid" varchar PRIMARY KEY NOT NULL, "criado_em" datetime NOT NULL, "atualizado_em" datetime NOT NULL, "vaga_descricao" varchar NOT NULL, "data_cadastro" datetime NOT NULL, "sucesso" boolean, "candidato_uuid" varchar, "vaga_uuid" varchar, CONSTRAINT "FK_ec862ce1db5845441effc8a962d" FOREIGN KEY ("candidato_uuid") REFERENCES "users" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ee852f2d7132d67311d2bbea02a" FOREIGN KEY ("vaga_uuid") REFERENCES "vagas" ("uuid") ON DELETE CASCADE ON UPDATE NO ACTION)');
		await queryRunner.query('INSERT INTO "temporary_candidaturas"("uuid", "criado_em", "atualizado_em", "vaga_descricao", "data_cadastro", "sucesso", "candidato_uuid", "vaga_uuid") SELECT "uuid", "criado_em", "atualizado_em", "vaga_descricao", "data_cadastro", "sucesso", "candidato_uuid", "vaga_uuid" FROM "candidaturas"');
		await queryRunner.query('DROP TABLE "candidaturas"');
		await queryRunner.query('ALTER TABLE "temporary_candidaturas" RENAME TO "candidaturas"');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "candidaturas" RENAME TO "temporary_candidaturas"');
		await queryRunner.query('CREATE TABLE "candidaturas" ("uuid" varchar PRIMARY KEY NOT NULL, "criado_em" datetime NOT NULL, "atualizado_em" datetime NOT NULL, "vaga_descricao" varchar NOT NULL, "data_cadastro" datetime NOT NULL, "sucesso" boolean, "candidato_uuid" varchar, "vaga_uuid" varchar)');
		await queryRunner.query('INSERT INTO "candidaturas"("uuid", "criado_em", "atualizado_em", "vaga_descricao", "data_cadastro", "sucesso", "candidato_uuid", "vaga_uuid") SELECT "uuid", "criado_em", "atualizado_em", "vaga_descricao", "data_cadastro", "sucesso", "candidato_uuid", "vaga_uuid" FROM "temporary_candidaturas"');
		await queryRunner.query('DROP TABLE "temporary_candidaturas"');
		await queryRunner.query('DROP TABLE "candidaturas"');
		await queryRunner.query('DROP TABLE "vagas"');
		await queryRunner.query('DROP TABLE "users"');
	}

}
