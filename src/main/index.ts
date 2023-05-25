import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import db from './config/dataSource';
import mapper from '../app/helpers/mapper';
import { UserToCreateDTO } from '../app/features/user/usecases/createUser/UserToCreateDTO';
import { registerRoutes } from './config/httpRoutes.config';
import { UserEntity } from '../app/shared/database/entities/user.entity';
import { createMap } from '@automapper/core';
import { User } from '../app/models/user';

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json(), cors());

app.get('', (_, res) => {
	res.send('Hello!');
});

registerRoutes(app);

createMap(mapper, UserToCreateDTO, UserEntity);
createMap(mapper, UserEntity, User);

db.initialize().then(() => {
	app.listen(port, () => {
		console.log(`App running at port ${port}`);
	});
});