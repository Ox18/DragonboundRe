"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeOnlineServersController = void 0;

var _onlineServers = require("../../../presentation/controllers/online-servers");

var _findAllServerFactory = require("../usecases/find-all-server-factory");

const makeOnlineServersController = () => {
  const controller = new _onlineServers.OnlineServersController((0, _findAllServerFactory.makeDbFindAllServer)());
  return controller;
};

exports.makeOnlineServersController = makeOnlineServersController;