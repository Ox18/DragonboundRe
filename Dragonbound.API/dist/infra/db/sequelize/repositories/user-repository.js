"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;

var _connection = require("../lib/connection");

class UserRepository {
  constructor() {
    this.userModel = _connection.db.User;
  }

  async findByWhere(where) {
    const user = await this.userModel.findOne({
      where
    });
    return user?.get();
  }

}

exports.UserRepository = UserRepository;