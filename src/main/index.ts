import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import db from './config/dataSource';
import { registerRoutes } from './config/httpRoutes.config';
import { registerMappings } from './config/mappings.config';

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json(), cors());

app.get('', (_, res) => {
	res.send('Hello!');
});

registerRoutes(app);
registerMappings();

db.initialize().then(() => {
	app.listen(port, () => {
		console.log(`App running at port ${port}`);
	});
});