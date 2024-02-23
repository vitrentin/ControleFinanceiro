import { Router } from 'express';
import { TransactionsController } from '../controller/TransactionsController';

const transactionRoutes = Router();

const transactionController = new TransactionsController();

transactionRoutes.post(
  '/',

  transactionController.create
);


transactionRoutes.put(
  '/:transactionId',

  transactionController.update
);

transactionRoutes.delete(
  '/:transactionId',

  transactionController.destroy
);

transactionRoutes.get(
  '/:transactionId',

  transactionController.show
);

transactionRoutes.get('/', transactionController.index);

export { transactionRoutes };
