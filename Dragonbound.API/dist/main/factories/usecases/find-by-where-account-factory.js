"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDbFindByWhereAccount = void 0;

var _dbFindByWhereAccount = require("../../../data/usecases/db-find-by-where-account");

var _accountRepository = require("../../../infra/db/sequelize/repositories/account-repository");

const makeDbFindByWhereAccount = () => {
  return new _dbFindByWhereAccount.DbFindByWhereAccount(new _accountRepository.AccountRepository());
};

exports.makeDbFindByWhereAccount = makeDbFindByWhereAccount;