import { Transaction, TransactionByIdData, TransactionByAccountIdData, transactionTypes } from '../types/transactions';
import { TransactionModel } from '../../database/models';
import { AccountService } from './accounts';
import { HttpStatusCode } from '../types/error';
import { Account } from '../types/accounts';

export class TransactionService {
  /**
   * Retrieves transactions by account ID.
   *
   * @param {TransactionByAccountIdData} getTransactionsByAccountIdData - The data for retrieving transactions by account ID.
   * @return {Promise<TransactionModel[]>} A promise that resolves to an array of transactions.
   */
  static async getTransactionsByAccountId(getTransactionsByAccountIdData: TransactionByAccountIdData) {
    try{
      const account = await AccountService.getAccountById({ UserId: getTransactionsByAccountIdData.UserId, id: getTransactionsByAccountIdData.AccountId});
      if(account) {
        return await TransactionModel.findAll({ where: { AccountId: getTransactionsByAccountIdData.AccountId } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  /**
   * Retrieves a transaction by its ID.
   *
   * @param {TransactionByIdData} getTransactionByIdData - The data containing the user ID and account ID of the transaction to retrieve.
   * @return {Promise<TransactionModel | HttpStatusCode>} Returns a Promise that resolves to the transaction
   */
  static async getTransactionById(getTransactionByIdData: TransactionByIdData) {
    try{
      const account = await AccountService.getAccountById({ UserId: getTransactionByIdData.UserId, id: getTransactionByIdData.AccountId});
      if(account) {
        return await TransactionModel.findOne({ where: { AccountId: getTransactionByIdData.AccountId, id: getTransactionByIdData.id } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  /**
   * Creates a new transaction for a user.
   *
   * @param {number} UserId - The ID of the user.
   * @param {Transaction} createTransactionData - The data for creating the transaction.
   * @return {Promise<void>} - A promise that resolves when the transaction is created.
   */
  static async createTransaction(UserId: number, createTransactionData: Transaction) {
    try{
      const account = await AccountService.getAccountById({ UserId: UserId, id: createTransactionData.AccountId });
      if(account && account.id) {
        await TransactionModel.create({...createTransactionData});
        await TransactionService.updateAccountCurrentBalance(UserId, account.id, account.initialBalance);
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  
  /**
   * Updates a transaction for a given user.
   *
   * @param {number} UserId - The ID of the user.
   * @param {Transaction} updatedTransactionData - The updated transaction data.
   * @return {Promise<void>} - A promise that resolves when the transaction is updated.
   */
  static async updateTransaction(UserId: number, updatedTransactionData: Transaction) {
    try{
      const account = await AccountService.getAccountById({ UserId: UserId, id: updatedTransactionData.AccountId});
      if(account && account.id) {
        const transaction = await TransactionService.getTransactionById({ id: updatedTransactionData.id, AccountId: updatedTransactionData.AccountId, UserId: UserId } as TransactionByIdData);
        if(transaction) {
          await TransactionModel.update(updatedTransactionData,{ where: { AccountId: updatedTransactionData.AccountId, id: updatedTransactionData.id } });
          await TransactionService.updateAccountCurrentBalance(UserId, account.id, account.initialBalance);
        }
        else throw HttpStatusCode.NOT_FOUND;
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  /**
   * Deletes a transaction.
   *
   * @param {TransactionByIdData} deleteTransactionData - The data needed to delete a transaction.
   * @return {Promise<void>} - Resolves when the transaction is deleted.
   */
  static async deleteTransaction(deleteTransactionData: TransactionByIdData) {
    try{
      const account = await AccountService.getAccountById({ id: deleteTransactionData.AccountId, UserId: deleteTransactionData.UserId });
      if(account && account.id) {
        const transaction = await TransactionService.getTransactionById(deleteTransactionData);
        if(transaction) {
          await TransactionModel.destroy({ where: { AccountId: deleteTransactionData.AccountId, id: deleteTransactionData.id } });
          await TransactionService.updateAccountCurrentBalance(deleteTransactionData.UserId, account.id, account.initialBalance);
        }
        else throw HttpStatusCode.NOT_FOUND;
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  static async getAllExpensesFromAccount(getAllIncomesData: TransactionByAccountIdData): Promise<number> {
    try{
      const account = await AccountService.getAccountById({ UserId: getAllIncomesData.UserId, id: getAllIncomesData.AccountId});
      if(account) {
        return await TransactionModel.sum('amount',{ where: { AccountId: getAllIncomesData.AccountId, type: transactionTypes.EXPENSE } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  static async getAllIncomesFromAccount(getAllIncomesData: TransactionByAccountIdData): Promise<number> {
    try{
      const account = await AccountService.getAccountById({ UserId: getAllIncomesData.UserId, id: getAllIncomesData.AccountId});
      if(account) {
        return await TransactionModel.sum('amount',{ where: { AccountId: getAllIncomesData.AccountId, type: transactionTypes.INCOME } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  static async updateAccountCurrentBalance(UserId: number, AccountId: number, initialBalance: number) {
    try{
      const totalExpenses = await TransactionService.getAllExpensesFromAccount({ UserId, AccountId });
      const totalIncomes = await TransactionService.getAllIncomesFromAccount({ UserId, AccountId });
      const currentBalance = initialBalance - totalExpenses + totalIncomes;
      await AccountService.updateAccount({ UserId: UserId, id: AccountId , currentBalance } as Account);
    }catch (error){
      throw error;
    }
  }
}