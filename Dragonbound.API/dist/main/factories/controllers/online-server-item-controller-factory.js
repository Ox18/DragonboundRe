"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeOnlineServerItemController = void 0;

var _onlineServerItem = require("../../../presentation/controllers/online-server-item");

var _findByWhereServerFactory = require("../usecases/find-by-where-server-factory");

const makeOnlineServerItemController = () => {
  const controller = new _onlineServerItem.OnlineServerItemController((0, _findByWhereServerFactory.makeDbFindByWhereServer)());
  return controller;
};

exports.makeOnlineServerItemController = makeOnlineServerItemController;