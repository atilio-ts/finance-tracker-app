import { Request, Response } from 'express';
import { TransactionService } from '../services/transactions';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import * as TransactionValidator from "../validators/transactions";

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        const AccountId = +req.params.accountId;
        await TransactionValidator.getTransactionsSchema.validate({ UserId, AccountId }, validatorOptions);
        const transactions = await TransactionService.getTransactionsByAccountId({ UserId, AccountId });
        res.status(200).send({ transactions });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getTransactionById = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        const AccountId = +req.params.accountId;
        const id = +req.params.transactionId;
        await TransactionValidator.getTransactionByIdSchema.validate({ UserId, AccountId, id }, validatorOptions);
        const transaction = await TransactionService.getTransactionById({ UserId, AccountId, id });
        res.status(200).send({ transaction });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        req.body.date = new Date(req.body.date);
        const transactionData = { AccountId: +req.params.accountId, ...req.body };
        await TransactionValidator.createTransactionSchema.validate({ UserId , ...transactionData }, validatorOptions);
        await TransactionService.createTransaction(UserId, transactionData);
        res.status(200).send({ message: 'Transaction created succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        req.body.date = new Date(req.body.date);
        const updatedTransactionData = { id: +req.params.transactionId, AccountId: +req.params.accountId, ...req.body };
        await TransactionValidator.updateTransactionSchema.validate({ UserId, ...updatedTransactionData }, validatorOptions);
        await TransactionService.updateTransaction(UserId, updatedTransactionData);
        res.status(200).send({ message: 'Transaction updated succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const UserId = +req.params.UserId;
        const AccountId = +req.params.accountId;
        const id = +req.params.transactionId;
        await TransactionValidator.deleteTransactionSchema.validate({ UserId, AccountId, id }, validatorOptions);
        await TransactionService.deleteTransaction({ UserId, AccountId, id });
        res.status(200).send({ message: 'Transaction deleted succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};