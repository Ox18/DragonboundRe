"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressRouteAdapter = _interopRequireDefault(require("../adapters/express-route-adapter"));

var _authLoginControllerFactory = require("../factories/controllers/auth-login-controller-factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = router => {
  router.post("/auth/login", (0, _expressRouteAdapter.default)((0, _authLoginControllerFactory.makeAuthLoginController)()));
};

exports.default = _default;