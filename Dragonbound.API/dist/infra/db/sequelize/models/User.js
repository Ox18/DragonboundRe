"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (connection, Sequelize) => {
  const User = connection.define("users", {
    account_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    rank: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    game_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });
  return User;
};

exports.default = _default;