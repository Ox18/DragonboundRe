"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbFindAllArrayServer = void 0;

class DbFindAllArrayServer {
  constructor(ServerRepository) {
    this.ServerRepository = ServerRepository;
  }

  async findAll() {
    const response = await this.ServerRepository.findAllArray();
    return response;
  }

}

exports.DbFindAllArrayServer = DbFindAllArrayServer;