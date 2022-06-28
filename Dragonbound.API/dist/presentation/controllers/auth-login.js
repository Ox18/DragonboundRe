"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthLoginController = void 0;

var _httpHelper = require("../helpers/http-helper");

class AuthLoginController {
  constructor(findByWhereAccount) {
    this.findByWhereAccount = findByWhereAccount;
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
        return (0, _httpHelper.ok)(["Account not found", "Please check your username and password"]);
      } // this.user_id = a;
      // this.user_rank = b;
      // this.user_auth_key = d;
      // this.user_country = c;


      return (0, _httpHelper.ok)([1, 24, "zwpeoriewrwemflwe", "PE"]);
    } catch (ex) {
      return (0, _httpHelper.ok)(["Error", ex.message]);
    }
  }

}

exports.AuthLoginController = AuthLoginController;