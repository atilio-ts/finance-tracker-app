import { object, string, number, date } from 'yup';

export const loginUserSchema = object().shape({
    email: string().email().required(),
    password: string().required()
}).noUnknown(true);

export const registerUserSchema = object().shape({
    name: string().required(),
    password: string().min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password must have a number')
        .matches(/[a-z]/, 'Password must have a lowercase letter')
        .matches(/[A-Z]/, 'Password must have an uppercase letter')
        .matches(/[^\w]/, 'Password must have a symbol'),
    address: string().required(),
    phone: number().required(),
    gender: string().required(),
    dateOfBirth: date().required(),
    email: string().email().required(),
    profession: string().required()
}).noUnknown(true);

export const updateUserSchema = object().shape({
    id: number().required(),
    name: string(),
    password: string().min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password must have a number')
        .matches(/[a-z]/, 'Password must have a lowercase letter')
        .matches(/[A-Z]/, 'Password must have an uppercase letter')
        .matches(/[^\w]/, 'Password must have a symbol'),
    address: string(),
    phone: number(),
    gender: string(),
    dateOfBirth: date(),
    email: string().email(),
    profession: string()
}).noUnknown(true);