import { Request, Response } from 'express';
import { AccountService } from '../services/accounts';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import * as AccountValidator from "../validators/accounts";

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