"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeOnlineServersController = void 0;

var _onlineServers = require("../../../presentation/controllers/online-servers");

var _findAllArrayServerFactory = require("../usecases/find-all-array-server-factory");

const makeOnlineServersController = () => {
  const controller = new _onlineServers.OnlineServersController((0, _findAllArrayServerFactory.makeDbFindAllArrayServer)());
  return controller;
};

exports.makeOnlineServersController = makeOnlineServersController;