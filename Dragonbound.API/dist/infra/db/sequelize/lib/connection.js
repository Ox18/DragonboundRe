"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.connection = void 0;

var _sequelize = require("sequelize");

var _mysqlConfig = require("./mysql-config");

var _Account = _interopRequireDefault(require("../models/Account"));

var _User = _interopRequireDefault(require("../models/User"));

var _Server = _interopRequireDefault(require("../models/Server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Models
const connection = new _sequelize.Sequelize(..._mysqlConfig.mysqlConfig);
exports.connection = connection;
const db = {};
exports.db = db;
db.Sequelize = _sequelize.Sequelize;
db.connection = connection;
db.Account = (0, _Account.default)(connection, _sequelize.Sequelize);
db.User = (0, _User.default)(connection, _sequelize.Sequelize);
db.Server = (0, _Server.default)(connection, _sequelize.Sequelize);