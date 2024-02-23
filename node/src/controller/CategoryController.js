import { CategoriesServices } from '../services/CategoriesServices';

export class CategoryController {
  async create(request, response) {
    try {
      const category = request.body;
      const service = new CategoriesServices();
      const result = await service.createCategory(category);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.category });
    }
  }

  async update(request, response) {
    try {
      const category = request.body;
      const { categoryId } = request.params;

      const service = new CategoriesServices();
      const result = await service.updatedCategory(category, categoryId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.category });
    }
  }

  async show(request, response) {
    try {
      const { categoryId } = request.params;

      const service = new CategoriesServices();
      const result = await service.showCategory(categoryId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.category });
    }
  }

  async index(request, response) {
    try {
      const service = new CategoriesServices();
      const userId = (request.headers.userid)

      const result = await service.showCategories(userId);
      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.category });
    }
  }

  async destroy(request, response) {
    try {
      const { categoryId } = request.params;

      const service = new CategoriesServices();
      const result = await service.deletedCategory(categoryId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.category });
    }
  }
}

export { CategoryController };
