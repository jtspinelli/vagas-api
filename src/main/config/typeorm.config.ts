// import 'dotenv/config';
import dotenv from 'dotenv';
import { VagaCandidatoEntity } from './../../app/shared/database/entities/vagaCandidato.entity';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../app/shared/database/entities/user.entity';
import { VagaEntity } from '../../app/shared/database/entities/vaga.entity';
import { GenerateDb1685063138896 } from '../../app/shared/database/migrations/1685063138896-GenerateDb';
import { CreateVagasTable1685571391859 } from '../../app/shared/database/migrations/1685571391859-CreateVagasTable';

dotenv.config();

const typeormconfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
	synchronize: false,
	entities: [UserEntity, VagaEntity, VagaCandidatoEntity],
	migrations: [GenerateDb1685063138896, CreateVagasTable1685571391859]
};

export default typeormconfig;