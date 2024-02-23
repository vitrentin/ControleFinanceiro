const db = require('../databases/db')
class TransactionsServices{
    async createTransaction(transaction) {
        const newTransaction =  await db.query("INSERT INTO transactions(title,value,transactionType,category,user_id)VALUES(?,?,?,?,?)", 
        [transaction.title,transaction.value,transaction.transactionType,transaction.category,transaction.userId])
    
        let newTransacted =  await db.query("SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 1",transaction.userId)
        newTransacted = newTransacted[0]
        
        return newTransacted;
      }
      async deleteTransaction(id) {
        const checkIfTransactionExists = await db.query("SELECT * FROM transactions WHERE id = ?", [id])
    
        if (checkIfTransactionExists.length == 0) {
          throw new AppError('Transaction does not exist');
        }
    
    
        const deletedTransaction = await db.query("DELETE FROM transactions WHERE id = ?", [id])
    
        const deleted = checkIfTransactionExists[0]
    
        return deleted;
      }
      async showAllTransaction(user_id) {
        const transactions = await db.query("SELECT * FROM transactions WHERE user_id = ?",user_id);
        return transactions;
      }
      async showTransaction(id) {
        const transaction = await db.query("SELECT * FROM transactions WHERE id = ?", id)
    
        if (transaction.length === 0) {
          throw new AppError('Transaction does not exist');
        }
    
        return transaction;
      }
      async showTransaction(transaction, id) {
        const checkIfTransactionExists = await db.query("SELECT * FROM transactions WHERE id = ?", id)
    
        if (checkIfTransactionExists.length == 0) {
          throw new AppError('Transaction does not exist');
        }
    
        let updatedTransactions = await db.query("UPDATE transactions SET title = ?,value = ?, transactionType = ?, category = ? WHERE id = ?",
        [transaction.title,parseFloat(transaction.value),transaction.transactionType,transaction.category, id])
        
        updatedTransactions = await db.query("SELECT * FROM transactions WHERE id = ?", id)
        const updatedTransaction = updatedTransactions[0]
        return updatedTransaction;
      }
      async updateTransaction(transaction, id) {
        const checkIfTransactionExists = await db.query("SELECT * FROM transactions WHERE id = ?", [id])
    
        if (checkIfTransactionExists.length == 0) {
          throw new AppError('Transaction does not exist');
        }
    
        let updatedTransactions = await db.query("UPDATE transactions SET title = ?,value = ?, transactionType = ?, category = ? WHERE id = ?",
        [transaction.title,parseFloat(transaction.value),transaction.transactionType,transaction.category, id])
        
        updatedTransactions = await db.query("SELECT * FROM transactions WHERE id = ?", [id])
        const updatedTransaction = updatedTransactions[0]
        return updatedTransaction;
      }
}
export{TransactionsServices}