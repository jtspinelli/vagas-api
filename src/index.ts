import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import db from './database/dataSource';

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json(), cors());

app.get('', (req, res) => {
	res.send('Hello!');
});

db.initialize().then(() => {
	app.listen(port, () => {
		console.log(`App running at port ${port}`);
	});
});