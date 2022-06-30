"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthRegisterController = void 0;

var _httpHelper = require("../helpers/http-helper");

class AuthRegisterController {
  constructor(findByWhereAccount, findByWhereUser, createAccount, createUser) {
    this.findByWhereAccount = findByWhereAccount;
    this.findByWhereUser = findByWhereUser;
    this.createAccount = createAccount;
    this.createUser = createUser;
  }

  async handle({
    body
  }) {
    const {
      name,
      password,
      gender
    } = body;

    try {
      const account = await this.findByWhereAccount.findByWhere({
        username: name
      });

      if (account) {
        return (0, _httpHelper.ok)({
          type: "ACCOUNT_ALREADY_EXISTS"
        });
      }

      const user = await this.findByWhereUser.findByWhere({
        game_id: name
      });

      if (user) {
        return (0, _httpHelper.ok)({
          type: "USER_ALREADY_EXISTS"
        });
      }

      const accountResponse = await this.createAccount.create({
        username: name,
        password
      });
      const userResponse = await this.createUser.create({
        account_id: accountResponse.id,
        game_id: name,
        country: '',
        rank: 0,
        gender
      });
      return (0, _httpHelper.ok)({
        type: "REGISTER_SUCCESS",
        data: {
          account: accountResponse,
          user: userResponse
        }
      });
    } catch (ex) {
      return (0, _httpHelper.serverError)(ex);
    }
  }

}

exports.AuthRegisterController = AuthRegisterController;