"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contentType = _interopRequireDefault(require("../middlewares/content-type"));

var _cors = _interopRequireDefault(require("../middlewares/cors"));

var _morgan = _interopRequireDefault(require("../middlewares/morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => {
  app.use(_bodyParser.default.json()); // in latest body-parser use like below.

  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_contentType.default);
  app.use(_cors.default);
  app.use(_morgan.default);
};

exports.default = _default;