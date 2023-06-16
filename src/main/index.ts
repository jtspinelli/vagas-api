import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import db from './config/dataSource';
import { registerRoutes } from './config/httpRoutes.config';
import { registerMappings } from './config/mappings.config';
import { appEnv } from '../app/env/appEnv';
import { RedisConnection } from './config/RedisConnection';

export const app = express();
app.use(express.json(), cors());

app.get('', (_, res) => res.send('Hello!'));

registerRoutes(app);
registerMappings();

db.initialize().then(() => {
	RedisConnection.initConnection();
	app.listen(appEnv.port, () => {
		console.log(`App running at port ${appEnv.port}`);
	});
});