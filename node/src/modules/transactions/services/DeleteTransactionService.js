import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class DeleteTransactionService {
  async execute(id) {
    const checkIfTransactionExists = await prismaCLient.transactions.findFirst({
      where: {
        id,
      },
    });

    if (!checkIfTransactionExists) {
      throw new AppError('Transaction does not exist');
    }

    const deletedTransaction = await prismaCLient.transactions.delete({
      where: {
        id,
      },
    });

    return deletedTransaction;
  }
}

export { DeleteTransactionService };
