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
    return await this.accountModel.create(account);
  }

}

exports.AccountRepository = AccountRepository;