import { Request, Response } from 'express';
import { AccountService } from '../services/accounts';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import * as AccountValidator from "../validators/accounts";

/**
 * Retrieves the accounts associated with a specific user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} Returns a promise that resolves with the retrieved accounts.
 */
export const getAccounts = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        await AccountValidator.getAccountsSchema.validate({ UserId }, validatorOptions);
        const accounts = await AccountService.getAccounts(UserId);
        res.status(200).send({ accounts });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Retrieves an account by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<account>} A promise that resolves with the retrieved account.
 */
export const getAccountById = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        const id = +req.params.AccountId;
        await AccountValidator.getAccountByIdSchema.validate({ UserId, id }, validatorOptions);
        const account = await AccountService.getAccountById({ UserId, id });
        res.status(200).send({ account });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Creates an account for the specified user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - A promise that resolves with no value.
 */
export const createAccount = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        await AccountValidator.createAccountSchema.validate({ UserId , ...req.body, currentBalance: req.body.initialBalance }, validatorOptions);
        await AccountService.createAccount({ UserId , ...req.body, currentBalance: req.body.initialBalance });
        res.status(200).send({ message: 'Account created succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Updates an account.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves with no value.
 */
export const updateAccount = async (req: Request, res: Response) => {
    try {
        const updatedAccountData = { UserId: +req.params.UserId, id: +req.params.AccountId, ...req.body };
        await AccountValidator.updateAccountSchema.validate(updatedAccountData, validatorOptions);
        await AccountService.updateAccount(updatedAccountData);
        res.status(200).send({ message: 'Account updated succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Deletes an account.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} - A promise that resolves when the account is deleted.
 */
export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        const id = +req.params.AccountId;
        await AccountValidator.deleteAccountSchema.validate({ UserId, id }, validatorOptions);
        await AccountService.deleteAccount({ UserId, id });
        res.status(200).send({ message: 'Account deleted succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};