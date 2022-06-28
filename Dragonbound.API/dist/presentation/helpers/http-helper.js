"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unauthorized = exports.serverError = exports.ok = exports.noContent = exports.forbidden = exports.badRequest = void 0;

var _serverError = require("../errors/server-error");

var _unauthorizedError = require("../errors/unauthorized-error");

const badRequest = error => ({
  statusCode: 400,
  body: error
});

exports.badRequest = badRequest;

const forbidden = error => ({
  statusCode: 403,
  body: error
});

exports.forbidden = forbidden;

const unauthorized = () => ({
  statusCode: 401,
  body: new _unauthorizedError.UnauthorizedError()
});

exports.unauthorized = unauthorized;

const serverError = error => ({
  statusCode: 500,
  body: new _serverError.ServerError(error.stack)
});

exports.serverError = serverError;

const ok = data => ({
  statusCode: 200,
  body: data
});

exports.ok = ok;

const noContent = () => ({
  statusCode: 204,
  body: null
});

exports.noContent = noContent;