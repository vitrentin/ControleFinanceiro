import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../users/middleware/ensureAuthenticate';
import { MessageController } from './controller/MessageController';

const messageRoutes = Router();

const messageController = new MessageController();

messageRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      message: Joi.string().required(),
    },
  }),
  messageController.create
);

messageRoutes.use(ensureAuthenticated);

messageRoutes.put(
  '/:messageId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      message: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      messageId: Joi.string().required().uuid(),
    },
  }),
  messageController.update
);

messageRoutes.get(
  '/email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().required().email(),
    },
  }),
  messageController.indexByEmail
);
messageRoutes.delete(
  '/:messageId',
  celebrate({
    [Segments.PARAMS]: {
      messageId: Joi.string().required().uuid(),
    },
  }),
  messageController.destroy
);

messageRoutes.get(
  '/:messageId',
  celebrate({
    [Segments.PARAMS]: {
      messageId: Joi.string().required().uuid(),
    },
  }),
  messageController.show
);

messageRoutes.get('/', messageController.index);

export { messageRoutes };
