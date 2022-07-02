"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineServersController = void 0;

var _httpHelper = require("../helpers/http-helper");

class OnlineServersController {
  constructor(findAllArrayServers) {
    this.findAllArrayServers = findAllArrayServers;
  }

  async handle() {
    try {
      const response = await this.findAllArrayServers.findAllArray();
      return (0, _httpHelper.ok)([133, 9022, 83276, ...response, Date.now()]);
    } catch (ex) {
      return serverError(ex);
    }
  }

}

exports.OnlineServersController = OnlineServersController;