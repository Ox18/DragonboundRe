"use strict";

var _env = _interopRequireDefault(require("./config/env"));

var _connection = require("../infra/db/sequelize/lib/connection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  await _connection.db.connection.authenticate();
  console.log("Connection has been established successfully.");
  await _connection.db.connection.sync();
  console.log("Tables has been synced successfully.");
  const {
    setupApp
  } = await require("./config/app");
  const app = await setupApp();
  app.listen(_env.default.port, () => {
    console.log(`Server is running on port ${_env.default.port}`);
  });
})();