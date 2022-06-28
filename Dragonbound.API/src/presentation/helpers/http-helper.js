import { ServerError } from "../errors/server-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

export const badRequest = (error) => ({
    statusCode: 400,
    body: error,
});

export const forbidden = (error) => ({
    statusCode: 403,
    body: error,
});

export const unauthorized = () => ({
    statusCode: 401,
    body: new UnauthorizedError(),
});

export const serverError = (error) => ({
    statusCode: 500,
    body: new ServerError(error.stack),
});

export const ok = (data) => ({
    statusCode: 200,
    body: data,
});

export const noContent = () => ({
    statusCode: 204,
    body: null,
});