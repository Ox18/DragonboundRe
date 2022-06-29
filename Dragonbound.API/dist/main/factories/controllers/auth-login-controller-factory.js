"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAuthLoginController = void 0;

var _authLogin = require("../../../presentation/controllers/auth-login");

var _findByWhereAccountFactory = require("../usecases/find-by-where-account-factory");

var _findByWhereUserFactory = require("../usecases/find-by-where-user-factory");

const makeAuthLoginController = () => {
  const controller = new _authLogin.AuthLoginController((0, _findByWhereAccountFactory.makeDbFindByWhereAccount)(), (0, _findByWhereUserFactory.makeDbFindByWhereUser)());
  return controller;
};

exports.makeAuthLoginController = makeAuthLoginController;