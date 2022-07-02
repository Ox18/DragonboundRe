"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDbFindAllArrayServer = void 0;

var _dbFindAllArrayServer = require("../../../data/usecases/db-find-all-array-server");

var _serverRepository = require("../../../infra/db/sequelize/repositories/server-repository");

const makeDbFindAllArrayServer = () => {
  return new _dbFindAllArrayServer.DbFindAllArrayServer(new _serverRepository.ServerRepository());
};

exports.makeDbFindAllArrayServer = makeDbFindAllArrayServer;