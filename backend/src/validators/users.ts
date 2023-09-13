import { object, string, number } from 'yup';

export const loginUserSchema = object().shape({
    email: string().required(),
    password: string().required()
});

export const registerUserSchema = object().shape({
    name: string().required(),
    password: string().required(),
    address: string().required(),
    phone: number().required(),
    email: string().required(),
    profession: string().required()
});