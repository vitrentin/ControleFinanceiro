import { Router } from 'express';
import { MessageController } from '../controller/MessageController';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '../middleware/ensureAuthenticate';

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
      email: Joi.string().required().email(),
    },
  }),
  messageController.show
);

messageRoutes.get('/', messageController.index);

export { messageRoutes };
