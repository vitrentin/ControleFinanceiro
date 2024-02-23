import { Router } from 'express';

import { userRoutes } from '../../modules/users/routes';
import { transactionRoutes } from '../../modules/transactions/routes';
import { messageRoutes } from '../../modules/messages/routes';


const routes = Router();

routes.use('/users', userRoutes);
routes.use('/transactions', transactionRoutes);
routes.use('/messages', messageRoutes);

export { routes };