"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthLoginController = void 0;

var _httpHelper = require("../helpers/http-helper");

class AuthLoginController {
  constructor(findByWhereAccount, findByWhereUser) {
    this.findByWhereAccount = findByWhereAccount;
    this.findByWhereUser = findByWhereUser;
  }

  async handle(params) {
    const {
      body
    } = params;
    const {
      u: username,
      p: password
    } = body;

    try {
      const account = await this.findByWhereAccount.findByWhere({
        username,
        password
      });

      if (account === undefined) {
        return (0, _httpHelper.ok)({
          type: "ACCOUNT_NOT_FOUND"
        });
      }

      const user = await this.findByWhereUser.findByWhere({
        account_id: account.id
      });

      if (user === undefined) {
        return (0, _httpHelper.ok)({
          type: "USER_NOT_FOUND"
        });
      }

      return (0, _httpHelper.ok)({
        type: "LOGIN_SUCCESS",
        data: {
          user,
          account
        }
      });
    } catch (ex) {
      return (0, _httpHelper.serverError)(ex);
    }
  }

}

exports.AuthLoginController = AuthLoginController;