"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeChecknameController = void 0;

var _checkname = require("../../../presentation/controllers/checkname");

var _findByWhereUserFactory = require("../usecases/find-by-where-user-factory");

var _findByWhereAccountFactory = require("../usecases/find-by-where-account-factory");

const makeChecknameController = () => {
  const controller = new _checkname.ChecknameController((0, _findByWhereAccountFactory.makeDbFindByWhereAccount)(), (0, _findByWhereUserFactory.makeDbFindByWhereUser)());
  return controller;
};

exports.makeChecknameController = makeChecknameController;