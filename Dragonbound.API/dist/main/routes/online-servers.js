"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressRouteAdapter = _interopRequireDefault(require("../adapters/express-route-adapter"));

var _onlineServersControllerFactory = require("../factories/controllers/online-servers-controller-factory");

var _onlineServerItemControllerFactory = require("../factories/controllers/online-server-item-controller-factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = router => {
  router.get("/online-servers", (0, _expressRouteAdapter.default)((0, _onlineServersControllerFactory.makeOnlineServersController)()));
  router.get("/online-servers/:id", (0, _expressRouteAdapter.default)((0, _onlineServerItemControllerFactory.makeOnlineServerItemController)()));
};

exports.default = _default;