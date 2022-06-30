"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbCreateAccount = void 0;

class DbCreateAccount {
  constructor(AccountRepository) {
    this.AccountRepository = AccountRepository;
  }

  async create(user) {
    const response = await this.AccountRepository.create(user);
    return response;
  }

}

exports.DbCreateAccount = DbCreateAccount;