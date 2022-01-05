import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateUserController = new AuthenticateUserController();

const authenticateRoutes = Router();

authenticateRoutes.post('/session', authenticateUserController.handle);

export { authenticateRoutes };
