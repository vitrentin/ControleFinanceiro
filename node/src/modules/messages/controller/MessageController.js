import { CreateMessageService } from '../services/CreateMessageService';
import { UpdateMessageService } from '../services/UpdateMessageService';
import { ShowMessageService } from '../services/ShowMessageService';
import { ShowAllMessagesService } from '../services/ShowAllMessagesService';
import { ShowMessagesByEmailService } from '../services/ShowMessagesByEmailService';
import { DeleteMessageService } from '../services/DeleteMessageService';

export class MessageController {
  async create(request, response) {
    try {
      const message = request.body;

      const service = new CreateMessageService();
      const result = await service.execute(message);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async update(request, response) {
    try {
      const message = request.body;
      const { messageId } = request.params;

      const service = new UpdateMessageService();
      const result = await service.execute(message, messageId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async show(request, response) {
    try {
      const { messageId } = request.params;

      const service = new ShowMessageService();
      const result = await service.execute(messageId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async index(request, response) {
    try {
      const service = new ShowAllMessagesService();
      const result = await service.execute();

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async indexByEmail(request, response) {
    try {
      const email = request.headers.email;

      const service = new ShowMessagesByEmailService();
      const result = await service.execute(email);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async destroy(request, response) {
    try {
      const { messageId } = request.params;

      const service = new DeleteMessageService();
      const result = await service.execute(messageId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export { MessageController };
