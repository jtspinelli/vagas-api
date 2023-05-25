import { DataSource } from 'typeorm';
import typeormconfig from './typeormconfig';

const db: DataSource = new DataSource(typeormconfig);

export default db;