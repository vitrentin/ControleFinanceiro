import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class ShowAllTransactionsService {
  async execute() {
    const transactions = await prismaCLient.transactions.findMany();

    if (!transactions) {
      throw new AppError('Something went wrong');
    }

    return transactions;
  }
}

export { ShowAllTransactionsService };
