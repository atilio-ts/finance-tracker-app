
import { Request, Response, NextFunction } from 'express';
import { handleErrorResponse } from "../helpers/errorHandler";
import { HttpStatusCode } from "../types/error";
import { UserService } from '../services/users'

export const getAndVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.headers.authorization)   {
            const hasAccess = await UserService.verifyToken(req.headers.authorization.replace('Bearer ', ''));
            if(hasAccess)
                next();
            else handleErrorResponse(res, HttpStatusCode.FORBIDDEN);
        }else handleErrorResponse(res, HttpStatusCode.BAD_REQUEST);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};