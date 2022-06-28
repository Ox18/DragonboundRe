"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bodyParser = _interopRequireDefault(require("../middlewares/body-parser"));

var _contentType = _interopRequireDefault(require("../middlewares/content-type"));

var _cors = _interopRequireDefault(require("../middlewares/cors"));

var _morgan = _interopRequireDefault(require("../middlewares/morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => {
  app.use(_bodyParser.default[0]);
  app.use(_bodyParser.default[1]);
  app.use(_contentType.default);
  app.use(_cors.default);
  app.use(_morgan.default);
};

exports.default = _default;