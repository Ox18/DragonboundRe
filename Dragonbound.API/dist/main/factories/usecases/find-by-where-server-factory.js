"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDbFindByWhereServer = void 0;

var _dbFindByWhereServer = require("../../../data/usecases/db-find-by-where-server");

var _serverRepository = require("../../../infra/db/sequelize/repositories/server-repository");

const makeDbFindByWhereServer = () => {
  return new _dbFindByWhereServer.DbFindByWhereServer(new _serverRepository.ServerRepository());
};

exports.makeDbFindByWhereServer = makeDbFindByWhereServer;