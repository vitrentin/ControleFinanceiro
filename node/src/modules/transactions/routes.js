import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../users/middleware/ensureAuthenticate';
import { TransactionsController } from './controller/TransactionsController';

const transactionRoutes = Router();

const transactionController = new TransactionsController();

transactionRoutes.use(ensureAuthenticated);

transactionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      value: Joi.required(),
      transactionType: Joi.string().required(),
      category: Joi.string().required(),
    },
  }),
  transactionController.create
);

transactionRoutes.put(
  '/:transactionId',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      value: Joi.required(),
      transactionType: Joi.string().required(),
      category: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      transactionId: Joi.string().required().uuid(),
    },
  }),
  transactionController.update
);
transactionRoutes.get('/user', transactionController.indexByUser);

transactionRoutes.delete(
  '/:transactionId',
  celebrate({
    [Segments.PARAMS]: {
      transactionId: Joi.string().required().uuid(),
    },
  }),
  transactionController.destroy
);

transactionRoutes.get(
  '/:transactionId',
  celebrate({
    [Segments.PARAMS]: {
      transactionId: Joi.string().required().uuid(),
    },
  }),
  transactionController.show
);

transactionRoutes.get('/', transactionController.index);

export { transactionRoutes };
