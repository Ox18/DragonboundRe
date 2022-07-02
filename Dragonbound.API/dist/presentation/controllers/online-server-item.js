"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineServerItemController = void 0;

var _httpHelper = require("../helpers/http-helper");

class OnlineServerItemController {
  constructor(findByWhereServer) {
    this.findByWhereServer = findByWhereServer;
  }

  async handle({
    params
  }) {
    try {
      const {
        id
      } = params;
      const response = await this.findByWhereServer.findByWhere({
        id
      });

      if (response) {
        return (0, _httpHelper.ok)(response);
      }

      return (0, _httpHelper.serverError)('Server not found');
    } catch (ex) {
      return (0, _httpHelper.serverError)(ex);
    }
  }

}

exports.OnlineServerItemController = OnlineServerItemController;