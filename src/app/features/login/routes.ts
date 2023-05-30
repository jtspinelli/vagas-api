import { Router } from 'express';
import { validateLoginData } from './validators';
import { loginController } from './controller';

const loginRouter = Router();

loginRouter.post('/', validateLoginData, loginController);

export { loginRouter };