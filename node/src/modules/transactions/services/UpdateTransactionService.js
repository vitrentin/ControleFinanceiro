import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class UpdateTransactionService {
  async execute(transaction, id) {
    const checkIfTransactionExists = await prismaCLient.transactions.findFirst({
      where: {
        id,
      },
    });

    if (!checkIfTransactionExists) {
      throw new AppError('Transaction does not exist');
    }

    const updatedTransactions = await prismaCLient.transactions.update({
      where: {
        id,
      },
      data: {
        title: transaction.title,
        value: transaction.value,
        transactionType: transaction.transactionType,
        category: transaction.category,
      },
    });

    return updatedTransactions;
  }
}

export { UpdateTransactionService };
