import { ErrorTypes, HttpStatusCode } from "../types/error";
import { HttpStatus } from "../types/httpStatus";
import { ValidationError } from "yup";
import { Response } from "express";

/**
 * Handles the error response from the server.
 *
 * @param {Response} res - The response object.
 * @param {any} error - The error object.
 * @return {Promise<void>} - A promise that resolves to void.
 */
export const handleErrorResponse = async (res: Response, error: any): Promise<void> => {
    console.log(`${handleErrorResponse.name}: `, error);
    switch (true) {
        case error instanceof ValidationError:
            res.status(HttpStatusCode.BAD_REQUEST).send({ status: HttpStatus.ERROR, error: error.errors });
            break;
        case error instanceof Error:
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ status: HttpStatus.ERROR, error });
            break;
        case error === HttpStatusCode.BAD_REQUEST:
            res.status(HttpStatusCode.BAD_REQUEST).send({ status: HttpStatus.ERROR, error: ErrorTypes.BAD_REQUEST });
            break;
        case error === HttpStatusCode.UNAUTHORIZED:
            res.status(HttpStatusCode.UNAUTHORIZED).send({ status: HttpStatus.ERROR, error: ErrorTypes.UNAUTHORIZED });
            break;
        case error === HttpStatusCode.FORBIDDEN:
            res.status(HttpStatusCode.FORBIDDEN).send({ status: HttpStatus.ERROR, error: ErrorTypes.FORBIDDEN });
            break;
        case error === HttpStatusCode.NOT_FOUND:
            res.status(HttpStatusCode.NOT_FOUND).send({ status: HttpStatus.ERROR, error: ErrorTypes.NOT_FOUND });
            break;
        case error === HttpStatusCode.CONFLICT:
            res.status(HttpStatusCode.CONFLICT).send({ status: HttpStatus.ERROR, error: ErrorTypes.CONFLICT });
            break;
        default:
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ status: HttpStatus.ERROR, error: ErrorTypes.INTERNAL_ERROR });
            break;
    }
};