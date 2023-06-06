// import 'dotenv/config';
import dotenv from 'dotenv';
import { CandidaturaEntity } from '../../app/shared/database/entities/candidatura.entity';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../app/shared/database/entities/user.entity';
import { VagaEntity } from '../../app/shared/database/entities/vaga.entity';
import { GenerateDb1686065383652 } from '../../app/shared/database/migrations/1686065383652-GenerateDb';

dotenv.config();

const typeormconfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
	synchronize: false,
	entities: [UserEntity, VagaEntity, CandidaturaEntity],
	migrations: [GenerateDb1686065383652]
};

export default typeormconfig;