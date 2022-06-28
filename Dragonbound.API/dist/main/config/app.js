"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupApp = void 0;

var _express = _interopRequireDefault(require("express"));

var _middlewares = _interopRequireDefault(require("./middlewares"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setupApp = async () => {
  const app = (0, _express.default)();
  (0, _middlewares.default)(app);
  (0, _routes.default)(app);
  return app;
};

exports.setupApp = setupApp;