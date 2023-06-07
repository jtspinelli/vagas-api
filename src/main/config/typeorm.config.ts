// import 'dotenv/config';
import dotenv from 'dotenv';
import { CandidaturaEntity } from '../../app/shared/database/entities/candidatura.entity';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../app/shared/database/entities/user.entity';
import { VagaEntity } from '../../app/shared/database/entities/vaga.entity';
import { CreateUsersTable1684975171579 } from '../../app/shared/database/migrations/1684975171579-CreateUsersTable';
import { CreateVagasTable1685571391859 } from '../../app/shared/database/migrations/1685571391859-CreateVagasTable';
import { CreateCandidaturasTable1685993203025 } from '../../app/shared/database/migrations/1685993203025-CreateCandidaturasTable';

dotenv.config();

const typeormconfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
	synchronize: false,
	entities: [UserEntity, VagaEntity, CandidaturaEntity],
	migrations: [CreateUsersTable1684975171579, CreateVagasTable1685571391859, CreateCandidaturasTable1685993203025]
};

export default typeormconfig;