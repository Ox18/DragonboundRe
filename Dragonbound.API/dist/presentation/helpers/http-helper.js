"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noContent = exports.ok = exports.serverError = exports.unauthorized = exports.forbidden = exports.badRequest = void 0;
const errors_1 = require("@/presentation/errors");
const badRequest = (error) => ({
    statusCode: 400,
    body: error,
});
exports.badRequest = badRequest;
const forbidden = (error) => ({
    statusCode: 403,
    body: error,
});
exports.forbidden = forbidden;
const unauthorized = () => ({
    statusCode: 401,
    body: new errors_1.UnauthorizedError(),
});
exports.unauthorized = unauthorized;
const serverError = (error) => ({
    statusCode: 500,
    body: new errors_1.ServerError(error.stack),
});
exports.serverError = serverError;
const ok = (data) => ({
    statusCode: 200,
    body: data,
});
exports.ok = ok;
const noContent = () => ({
    statusCode: 204,
    body: null,
});
exports.noContent = noContent;
//# sourceMappingURL=http-helper.js.map