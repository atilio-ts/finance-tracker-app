import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { handleErrorResponse } from "../helpers/errorHandler";
import * as UserValidator from "../validators/users";

export const login = async (req: Request, res: Response) => {
    try {
        await UserValidator.loginUserSchema.validate(req.body);
        const token = await UserService.login(req.body);
        res.status(200).send(token);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        await UserValidator.registerUserSchema.validate(req.body);
        await UserService.register(req.body);
        res.status(200).send({ message: 'User created succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


