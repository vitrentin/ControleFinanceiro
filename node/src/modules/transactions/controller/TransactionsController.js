import { CreateTransactionService } from '../services/CreateTransactionService';
import { UpdateTransactionService } from '../services/UpdateTransactionService';
import { ShowTransactionService } from '../services/ShowTransactionService';
import { ShowAllTransactionsService } from '../services/ShowAllTransactionsService';
import { ShowTransactionsByUserService } from '../services/ShowTransactionsByUserService';
import { DeleteTransactionService } from '../services/DeleteTransactionService';

export class TransactionsController {
  async create(request, response) {
    try {
      const transaction = request.body;
      const userId = request.headers.userid;

      const service = new CreateTransactionService();
      const result = await service.execute(transaction, userId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async update(request, response) {
    try {
      const transaction = request.body;
      const { transactionId } = request.params;

      const service = new UpdateTransactionService();
      const result = await service.execute(transaction, transactionId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async show(request, response) {
    try {
      const { transactionId } = request.params;

      const service = new ShowTransactionService();
      const result = await service.execute(transactionId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async index(request, response) {
    try {
      const service = new ShowAllTransactionsService();
      const result = await service.execute();

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async indexByUser(request, response) {
    try {
      const userId = request.headers.userid;
      const service = new ShowTransactionsByUserService();
      const result = await service.execute(userId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async destroy(request, response) {
    try {
      const { transactionId } = request.params;

      const service = new DeleteTransactionService();
      const result = await service.execute(transactionId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export { TransactionsController };
