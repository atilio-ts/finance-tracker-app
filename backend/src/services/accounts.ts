import { Account, AccountIdData } from '../types/accounts';
import { AccountModel } from '../../database/models'
import { HttpStatusCode } from '../types/error';

export class AccountService {

  /**
   * Retrieves accounts for a given user ID.
   *
   * @param {number} UserId - The ID of the user.
   * @return {Promise<AccountModel[]>} A promise that resolves to an array of Account objects.
   */
  static async getAccounts(UserId: number) {
    try{
      return await AccountModel.findAll({ where: { UserId: UserId } });
    }catch (error){
      throw error;
    }
  }

  /**
   * Retrieves an account by its ID.
   *
   * @param {AccountIdData} getAccountByIdData - The data for retrieving the account by ID.
   * @return {Promise<Account>} The retrieved account.
   */
  static async getAccountById(getAccountByIdData: AccountIdData) {
    try{
      const foundAccount = await AccountModel.findOne({ where: { UserId: getAccountByIdData.UserId, id: getAccountByIdData.id} });
      const account = foundAccount?.dataValues as Account;
      return account;
    }catch (error){
      throw error;
    }
  }

  /**
   * Creates an account using the provided account data.
   *
   * @param {Account} createAccountData - The account data used to create the account.
   * @return {Promise<void>} A promise that resolves when the account is created successfully.
   */
  static async createAccount(createAccountData: Account) {
    try{
      await AccountModel.create({...createAccountData});
    }catch (error){
      throw error;
    }
  }

  /**
   * Updates an account with the provided data.
   *
   * @param {Account} updatedAccountData - The updated account data.
   * @return {Promise<void>} - A promise that resolves when the account is updated.
   */
  static async updateAccount(updatedAccountData: Account) {
    try{
      const account = await AccountService.getAccountById({ id: updatedAccountData.id, UserId: updatedAccountData.UserId } as AccountIdData);
      if(account) {
        await AccountModel.update(updatedAccountData, { where: { id: updatedAccountData.id, UserId: updatedAccountData.UserId } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  /**
   * Delete an account.
   *
   * @param {AccountIdData} deleteAccountData - The data needed to delete the account.
   * @return {Promise<void>} - A promise that resolves when the account is deleted successfully.
   */
  static async deleteAccount(deleteAccountData: AccountIdData) {
    try{
      const account = await AccountService.getAccountById({ id: deleteAccountData.id, UserId: deleteAccountData.UserId } as AccountIdData);
      if(account) {
        await AccountModel.destroy({ where: { UserId: deleteAccountData.UserId, id: deleteAccountData.id } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }
}