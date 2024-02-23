import { MessageServices } from '../services/MessageServices';

export class MessageController {
    async create(request, response) {
      try {
        const message = request.body;
  
        const service = new MessageServices();
        const result = await service.createMessage(message);
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  
    async update(request, response) {
      try {
        const message = request.body;
        const { messageId } = request.params;
  
        const service = new MessageServices();
        const result = await service.updatemessage(message, messageId);
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  
    async show(request, response) {
      try {
        const { messageId } = request.params;
  
        const service = new MessageServices();
        const result = await service.showmessage(messageId);
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  
    async index(request, response) {
      try {
        const service = new MessageServices();
        const result = await service.showAllmessage();
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  
    async destroy(request, response) {
      try {
        const { messageId } = request.params;
  
        const service = new MessageServices();
        const result = await service.deleteMessage(messageId);
  
        return response.status(200).json(result);
      } catch (err) {
        return response.json({ error: err.message });
      }
    }
  }
  
  export { MessageController };