import prismaClient from '../../../databases/prismaClient';

class CreateTransactionService {
  async execute(transaction, userId) {
    const newTransaction = await prismaClient.transactions.create({
      data: {
        title: transaction.title,
        value: transaction.value,
        transactionType: transaction.transactionType,
        category: transaction.category,
        userId,
      },
    });

    return newTransaction;
  }
}

export { CreateTransactionService };
