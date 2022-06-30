"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDbCreateUser = void 0;

var _dbCreateUser = require("../../../data/usecases/db-create-user");

var _userRepository = require("../../../infra/db/sequelize/repositories/user-repository");

const makeDbCreateUser = () => {
  return new _dbCreateUser.DbCreateUser(new _userRepository.UserRepository());
};

exports.makeDbCreateUser = makeDbCreateUser;