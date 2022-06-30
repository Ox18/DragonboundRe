"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAuthRegisterController = void 0;

var _authRegister = require("../../../presentation/controllers/auth-register");

var _findByWhereUserFactory = require("../usecases/find-by-where-user-factory");

var _findByWhereAccountFactory = require("../usecases/find-by-where-account-factory");

var _createAccountFactory = require("../usecases/create-account-factory");

var _createUserFactory = require("../usecases/create-user-factory");

const makeAuthRegisterController = () => {
  const controller = new _authRegister.AuthRegisterController((0, _findByWhereAccountFactory.makeDbFindByWhereAccount)(), (0, _findByWhereUserFactory.makeDbFindByWhereUser)(), (0, _createAccountFactory.makeDbCreateAccount)(), (0, _createUserFactory.makeDbCreateUser)());
  return controller;
};

exports.makeAuthRegisterController = makeAuthRegisterController;