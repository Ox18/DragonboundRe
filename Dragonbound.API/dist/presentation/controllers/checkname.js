"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChecknameController = void 0;

var _httpHelper = require("../helpers/http-helper");

var _checknameValidator = _interopRequireDefault(require("../../main/factories/validators/checkname-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChecknameController {
  constructor(findByWhereAccount, findByWhereUser) {
    this.findByWhereAccount = findByWhereAccount;
    this.findByWhereUser = findByWhereUser;
  }

  async handle({
    query
  }) {
    const {
      name
    } = query;

    try {
      try {
        await _checknameValidator.default.validate({
          name
        });
      } catch (ex) {
        console.log(ex.message);
        return (0, _httpHelper.ok)("Bad Name");
      }

      const account = await this.findByWhereAccount.findByWhere({
        username: name
      });

      if (account) {
        return (0, _httpHelper.ok)("Name Exists");
      }

      const user = await this.findByWhereUser.findByWhere({
        game_id: name
      });

      if (user) {
        return (0, _httpHelper.ok)("Name Exists");
      }

      return (0, _httpHelper.ok)("OK");
    } catch (ex) {
      return (0, _httpHelper.serverError)(ex);
    }
  }

}

exports.ChecknameController = ChecknameController;