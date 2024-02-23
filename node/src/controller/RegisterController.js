import { RegisterServices } from '../services/RegisterServices';

export class RegisterController {
    async create(request, response) {
      try {
        const register = request.body;
  
        const service = new RegisterServices();
        const result = await service.createregister(register);
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  
    async update(request, response) {
      try {
        const register = request.body;
        const { registerId } = request.params;
  
        const service = new RegisterServices();
        const result = await service.updateregister(register, registerId);
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  
    async show(request, response) {
      try {
        const { registerId } = request.params;
  
        const service = new RegisterServices();
        const result = await service.showregister(registerId);
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  
    async index(request, response) {
      try {
        const service = new RegisterServices();
        const result = await service.showAllregister();
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  
    async destroy(request, response) {
      try {
        const { registerId } = request.params;
  
        const service = new RegisterServices();
        const result = await service.deleteregister(registerId);
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  }
  
  export { RegisterController };