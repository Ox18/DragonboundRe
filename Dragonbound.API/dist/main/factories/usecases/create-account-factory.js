"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDbCreateAccount = void 0;

var _dbCreateAccount = require("../../../data/usecases/db-create-account");

var _accountRepository = require("../../../infra/db/sequelize/repositories/account-repository");

const makeDbCreateAccount = () => {
  return new _dbCreateAccount.DbCreateAccount(new _accountRepository.AccountRepository());
};

exports.makeDbCreateAccount = makeDbCreateAccount;