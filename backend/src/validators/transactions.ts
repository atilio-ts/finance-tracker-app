import { object, string, number, date } from 'yup';
import { transactionTypes, transactionCategories} from '../types/transactions'

export const getTransactionsSchema = object().shape({
    UserId: number().required(),
    AccountId: number().required()
}).noUnknown(true);

export const getTransactionByIdSchema = object().shape({
    UserId: number().required(),
    AccountId: number().required(),
    id: number().required()
}).noUnknown(true);

export const createTransactionSchema = object().shape({
    UserId: number().required(),
    AccountId: number().required(),
    type: string().oneOf(Object.values(transactionTypes)).required(),
    category: string().oneOf(Object.values(transactionCategories)).required(),
    date: date().required(),
    description: string().required(),
    amount: number().required()
}).noUnknown(true);

export const updateTransactionSchema = object().shape({
    id: number().required(),
    UserId: number().required(),
    AccountId: number().required(),
    type: string().oneOf(Object.values(transactionTypes)).required(),
    category: string().oneOf(Object.values(transactionCategories)).required(),
    date: date(),
    description: string(),
    amount: number()
}).noUnknown(true);

export const deleteTransactionSchema = getTransactionByIdSchema;
