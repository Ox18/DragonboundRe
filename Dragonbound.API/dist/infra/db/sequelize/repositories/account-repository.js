"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountRepository = void 0;

var _connection = require("../lib/connection");

class AccountRepository {
  constructor() {
    this.accountModel = _connection.db.Account;
  }

  async findByWhere(where) {
    const account = await this.accountModel.findOne({
      where
    });
    return account?.get();
  }

  async create(account) {
    const response = await this.accountModel.create(account);
    return response?.get();
  }

}

exports.AccountRepository = AccountRepository;