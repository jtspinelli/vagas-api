import { Express } from 'express';

export function registerRoutes(app: Express) {
	app.get('/health-check', (_, res) => res.send('Okay!'));
}