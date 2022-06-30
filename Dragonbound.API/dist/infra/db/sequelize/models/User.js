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
      allowNull: false,
      defaultValue: 0
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    game_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'm'
    }
  });
  return User;
};

exports.default = _default;