import { Router } from "express";
import * as transactionController from '../controllers/transactions';
import { getAndVerifyToken } from '../middlewares/token';
export const transactionRoutes = Router();

transactionRoutes.get('/accounts/:accountId/transactions/', getAndVerifyToken, transactionController.getTransactions);
transactionRoutes.get('/accounts/:accountId/transactions/:transactionId', getAndVerifyToken, transactionController.getTransactionById);
transactionRoutes.post('/accounts/:accountId/transactions/', getAndVerifyToken, transactionController.createTransaction);
transactionRoutes.put('/accounts/:accountId/transactions/:transactionId', getAndVerifyToken, transactionController.updateTransaction);
transactionRoutes.delete('/accounts/:accountId/transactions/:transactionId', getAndVerifyToken, transactionController.deleteTransaction);