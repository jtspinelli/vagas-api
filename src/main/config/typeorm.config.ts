import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../app/shared/database/entities/user.entity';
import { CreateUsersTable1684975171579 } from '../../app/shared/database/migrations/1684975171579-CreateUsersTable';

const typeormconfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
	synchronize: false,
	entities: [UserEntity],
	migrations: [CreateUsersTable1684975171579]
};

export default typeormconfig;