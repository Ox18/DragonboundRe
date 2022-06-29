"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDbFindAllServer = void 0;

var _dbFindAllServer = require("../../../data/usecases/db-find-all-server");

var _serverRepository = require("../../../infra/db/sequelize/repositories/server-repository");

const makeDbFindAllServer = () => {
  return new _dbFindAllServer.DbFindAllServer(new _serverRepository.ServerRepository());
};

exports.makeDbFindAllServer = makeDbFindAllServer;