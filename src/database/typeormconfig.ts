import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const typeormconfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
	entities: [],
	migrations: []
};

export default typeormconfig;