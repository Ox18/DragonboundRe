"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDbFindByWhereUser = void 0;

var _dbFindByWhereUser = require("../../../data/usecases/db-find-by-where-user");

var _userRepository = require("../../../infra/db/sequelize/repositories/user-repository");

const makeDbFindByWhereUser = () => {
  return new _dbFindByWhereUser.DbFindByWhereUser(new _userRepository.UserRepository());
};

exports.makeDbFindByWhereUser = makeDbFindByWhereUser;