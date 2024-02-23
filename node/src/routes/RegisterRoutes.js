import { Router } from 'express';
import { RegisterController } from '../controller/RegisterController';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '../middleware/ensureAuthenticate';
const registerRoutes = Router();

const registerController = new RegisterController();

registerRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  registerController.create
);
userRoutes.use(ensureAuthenticated);

registerRoutes.put(
  '/:registerId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  registerController.update
);

registerRoutes.delete(
  '/:registerId',

  registerController.destroy
);

registerRoutes.get(
  '/:registerId',

  registerController.show
);

registerRoutes.get('/', registerController.index);

export { registerRoutes };
