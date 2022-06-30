"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbCreateUser = void 0;

class DbCreateUser {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async create(user) {
    const response = await this.UserRepository.create(user);
    return response;
  }

}

exports.DbCreateUser = DbCreateUser;