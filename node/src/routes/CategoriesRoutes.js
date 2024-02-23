import { Router } from 'express';
import { CategoryController } from '../controller/CategoryController';

const categoryRoutes = Router();

const categoryController = new CategoryController();

categoryRoutes.post(
  '/',

  categoryController.create
);

categoryRoutes.put('/:categoryId', categoryController.update);

categoryRoutes.delete(
  '/:categoryId',

  categoryController.destroy
);

categoryRoutes.get(
  '/:categoryId',

  categoryController.show
);

categoryRoutes.get('/', categoryController.index);

export { categoryRoutes };
