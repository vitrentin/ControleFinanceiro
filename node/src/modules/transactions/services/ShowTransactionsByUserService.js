import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class ShowTransactionsByUserService {
  async execute(userId) {
    const transactions = await prismaCLient.transactions.findMany({
      where: {
        userId,
      },
    });

    if (!transactions) {
      throw new AppError('Something went wrong');
    }

    return transactions;
  }
}

export { ShowTransactionsByUserService };
