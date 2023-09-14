import { object, string, number } from 'yup';

export const createAccountSchema = object().shape({
    name: string().required(),
    currentBalance: number().required(),
    initialBalance: number().required(),
    currency: string().required(),
    accountType: string().required(),
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
    currency: string(),
    accountType: string(),
    UserId: number().required()
}).noUnknown(true);

export const deleteAccountSchema = object().shape({
    UserId: number().required(),
    id: number().required()
}).noUnknown(true);
