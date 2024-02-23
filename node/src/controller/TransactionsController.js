import { TransactionsServices } from '../services/TransactionsServices';

export class TransactionsController {
  async create(request, response) {
    try {
      const transaction = request.body;

      const service = new TransactionsServices();
      const result = await service.createTransaction(transaction);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async update(request, response) {
    try {
      const transaction = request.body;
      const { transactionId } = request.params;

      const service = new TransactionsServices();
      const result = await service.updateTransaction(transaction, transactionId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async show(request, response) {
    try {
      const { transactionId } = request.params;

      const service = new TransactionsServices();
      const result = await service.showTransaction(transactionId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async index(request, response) {
    try {
      const userid  = request.headers.userid

      const service = new TransactionsServices();
      const result = await service.showAllTransaction(userid);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async destroy(request, response) {
    try {
      const { transactionId } = request.params;

      const service = new TransactionsServices();
      const result = await service.deleteTransaction(transactionId);

      return response.status(200).json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export { TransactionsController };