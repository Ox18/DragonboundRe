"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbFindAllServer = void 0;

class DbFindAllServer {
  constructor(ServerRepository) {
    this.ServerRepository = ServerRepository;
  }

  async findAll() {
    const response = await this.ServerRepository.findAll();
    return response;
  }

}

exports.DbFindAllServer = DbFindAllServer;