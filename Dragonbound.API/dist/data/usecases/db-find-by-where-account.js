"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbFindByWhereAccount = void 0;

class DbFindByWhereAccount {
  constructor(AccountRepository) {
    this.AccountRepository = AccountRepository;
  }

  async findByWhere(where) {
    const response = await this.AccountRepository.findByWhere(where);
    return response;
  }

}

exports.DbFindByWhereAccount = DbFindByWhereAccount;