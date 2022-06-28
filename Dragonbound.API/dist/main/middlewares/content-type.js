"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (_req, res, next) => {
  res.type("json");
  next();
};

exports.default = _default;