import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json(), cors());

app.get('', (req, res) => {
	res.send('Hello!');
});

app.listen(port, () => {
	console.log(`App running at port ${port}`);
});

console.log('hey');