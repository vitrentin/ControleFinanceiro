import { Router } from 'express';
import { CreateUserController } from '../controller/UserController';
import { AuthenticateUserController } from '../controller/AuthenticateUserController';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '../middleware/ensureAuthenticate';
const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  createUserController.create
);

userRoutes.post(
  '/authenticate',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle
);

userRoutes.use(ensureAuthenticated);

userRoutes.delete('/', createUserController.destroy);
userRoutes.get('/', createUserController.show);

userRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  createUserController.update
);

export { userRoutes };
