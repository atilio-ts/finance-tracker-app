import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import * as UserValidator from "../validators/users";


/**
 * Authenticates a user and sends back the user data upon successful login.
 *
 * @param {Request} req - the request object containing the user credentials
 * @param {Response} res - the response object to send back the user data
 * @return {Promise<userData>} - a promise that resolves when the login process is complete and returns userData with the jwt token
 */
export const login = async (req: Request, res: Response) => {
    try {
        await UserValidator.loginUserSchema.validate(req.body, validatorOptions);
        const userData = await UserService.login(req.body);
        res.status(200).send(userData);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Registers a new user.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
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

/**
 * Updates the user data.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - A promise that resolves to void.
 */
export const updateUserData = async (req: Request, res: Response) => {
    try {
        req.body.dateOfBirth = new Date(req.body.dateOfBirth);
        const updatedUserData = { id: +req.params.UserId, ...req.body };
        await UserValidator.updateUserSchema.validate(updatedUserData, validatorOptions);
        await UserService.updateUserData(updatedUserData);
        res.status(200).send({ message: 'User updated succesfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

