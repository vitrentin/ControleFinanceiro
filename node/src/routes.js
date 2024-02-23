import { Router } from 'express';
import { categoryRoutes } from './routes/CategoriesRoutes';
import { transactionRoutes } from './routes/TransactionsRoutes';
import { userRoutes } from './routes/UserRoutes';

import {messageRoutes} from './routes/MessageRoutes';

const routes = Router();

routes.use('/transactions', transactionRoutes);
routes.use('/messages', messageRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/users', userRoutes);
export { routes };
