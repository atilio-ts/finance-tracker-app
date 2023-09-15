import { Account, AccountIdData } from '../types/accounts';
import { AccountModel } from '../../database/models'
import { HttpStatusCode } from '../types/error';

export class AccountService {

  static async getAccounts(UserId: number) {
    try{
      return await AccountModel.findAll({ where: { UserId: UserId } });
    }catch (error){
      throw error;
    }
  }

  static async getAccountById(getAccountByIdData: AccountIdData) {
    try{
      const foundAccount = await AccountModel.findOne({ where: { UserId: getAccountByIdData.UserId, id: getAccountByIdData.id} });
      const account = foundAccount?.dataValues as Account;
      return account;
    }catch (error){
      throw error;
    }
  }

  static async createAccount(createAccountData: Account) {
    try{
      await AccountModel.create({...createAccountData});
    }catch (error){
      throw error;
    }
  }

  static async updateAccount(updatedAccountData: Account) {
    try{
      const foundAccount = await AccountModel.findOne({ where: { id: updatedAccountData.id, UserId: updatedAccountData.UserId } });
      const account = foundAccount?.dataValues as Account;
      if(account) {
        await AccountModel.update(updatedAccountData, { where: { id: updatedAccountData.id, UserId: updatedAccountData.UserId } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  static async deleteAccount(deleteAccountData: AccountIdData) {
    try{
      const foundAccount = await AccountModel.findOne({ where: { id: deleteAccountData.id, UserId: deleteAccountData.UserId } });
      const account = foundAccount?.dataValues as Account;
      if(account) {
        await AccountModel.destroy({ where: { UserId: deleteAccountData.UserId, id: deleteAccountData.id } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }
}