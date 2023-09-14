import { Router } from "express";
import * as accountController from '../controllers/accounts';
import { getAndVerifyToken } from '../middlewares/token';
export const accountRoutes = Router();

accountRoutes.get('/accounts/', getAndVerifyToken, accountController.getAccounts);
accountRoutes.get('/accounts/:AccountId', getAndVerifyToken, accountController.getAccountById);
accountRoutes.post('/accounts/', getAndVerifyToken, accountController.createAccount);
accountRoutes.put('/accounts/:AccountId', getAndVerifyToken, accountController.updateAccount);
accountRoutes.delete('/accounts/:AccountId', getAndVerifyToken, accountController.deleteAccount);