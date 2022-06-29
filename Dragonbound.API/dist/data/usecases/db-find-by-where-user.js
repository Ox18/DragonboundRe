"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbFindByWhereUser = void 0;

class DbFindByWhereUser {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async findByWhere(where) {
    const response = await this.UserRepository.findByWhere(where);
    return response;
  }

}

exports.DbFindByWhereUser = DbFindByWhereUser;