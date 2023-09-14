import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import * as UserValidator from "../validators/users";

export const login = async (req: Request, res: Response) => {
    try {
        await UserValidator.loginUserSchema.validate(req.body, validatorOptions);
        const token = await UserService.login(req.body);
        res.status(200).send(token);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        req.body.dateOfBirth = new Date(req.body.dateOfBirth);
        await UserValidator.registerUserSchema.validate(req.body, validatorOptions);
        await UserService.register(req.body);
        res.status(200).send({ message: 'User created succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const updateUserData = async (req: Request, res: Response) => {
    try {
        const updatedUserData = { id: +req.params.UserId, ...req.body };
        await UserValidator.updateUserSchema.validate(updatedUserData, validatorOptions);
        await UserService.updateUserData(updatedUserData);
        res.status(200).send({ message: 'User updated succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

