import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', ensureAuthenticated, specificationsRoutes);
router.use('/users', ensureAuthenticated, usersRoutes);
router.use(authenticateRoutes);
router.use('/cars', carsRoutes);

export { router };
