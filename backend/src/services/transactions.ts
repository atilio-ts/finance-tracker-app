import { Transaction, TransactionByIdData, TransactionByAccountIdData, transactionTypes } from '../types/transactions';
import { TransactionModel } from '../../database/models';
import { AccountService } from './accounts';
import { HttpStatusCode } from '../types/error';
import { Account } from '../types/accounts';

export class TransactionService {
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

  static async updateTransaction(UserId: number, updatedTransactionData: Transaction) {
    try{
      const account = await AccountService.getAccountById({ UserId: UserId, id: updatedTransactionData.AccountId});
      if(account && account.id) {
        const foundTransaction = await TransactionModel.findOne({ where: { id: updatedTransactionData.id, AccountId: updatedTransactionData.AccountId } });
        const transaction = foundTransaction?.dataValues as Transaction;
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

  static async deleteTransaction(deleteTransactionData: TransactionByIdData) {
    try{
      const account = await AccountService.getAccountById({ id: deleteTransactionData.AccountId, UserId: deleteTransactionData.UserId });
      if(account && account.id) {
        const foundTransaction = await TransactionModel.findOne({ where: { id: deleteTransactionData.id, AccountId: deleteTransactionData.AccountId } });
        const transaction = foundTransaction?.dataValues as Transaction;
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