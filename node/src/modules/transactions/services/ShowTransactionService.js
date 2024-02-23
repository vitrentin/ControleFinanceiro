import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class ShowTransactionService {
  async execute(id) {
    const transaction = await prismaCLient.transactions.findFirst({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new AppError('Transaction does not exist');
    }

    return transaction;
  }
}

export { ShowTransactionService };
