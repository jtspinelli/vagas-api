import { Express } from 'express';
import { userRouter } from '../../app/features/user/routes';
import { loginRouter } from '../../app/features/login/routes';

export function registerRoutes(app: Express) {
	app.get('/health-check', (_, res) => res.send('Okay!'));
	app.use('/users', userRouter);
	app.use('/login', loginRouter);
}