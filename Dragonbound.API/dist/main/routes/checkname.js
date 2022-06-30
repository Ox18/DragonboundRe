"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressRouteAdapter = _interopRequireDefault(require("../adapters/express-route-adapter"));

var _checknameControllerFactory = require("../factories/controllers/checkname-controller-factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = router => {
  router.get("/checkName", (0, _expressRouteAdapter.default)((0, _checknameControllerFactory.makeChecknameController)()));
};

exports.default = _default;