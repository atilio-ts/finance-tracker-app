import { object, string, number } from 'yup';
import { currencies, accountType} from '../types/accounts'

export const createAccountSchema = object().shape({
    name: string().required(),
    currentBalance: number().required(),
    initialBalance: number().required(),
    currency: string().oneOf(Object.values(currencies)).required(),
    accountType: string().oneOf(Object.values(accountType)).required(),
    UserId: number().required()
}).noUnknown(true);

export const getAccountByIdSchema = object().shape({
    id: number().required(),
    UserId: number().required()
}).noUnknown(true);

export const getAccountsSchema = object().shape({
    UserId: number().required()
}).noUnknown(true);

export const updateAccountSchema = object().shape({
    id: number().required(),
    name: string(),
    initialBalance: number(),
    currency: string().oneOf(Object.values(currencies)).required(),
    accountType: string().oneOf(Object.values(accountType)).required(),
    UserId: number().required()
}).noUnknown(true);

export const deleteAccountSchema = object().shape({
    UserId: number().required(),
    id: number().required()
}).noUnknown(true);
