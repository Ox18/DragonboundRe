"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbFindByWhereServer = void 0;

class DbFindByWhereServer {
  constructor(ServerRepository) {
    this.ServerRepository = ServerRepository;
  }

  async findByWhere(where) {
    const response = await this.ServerRepository.findByWhere(where);
    return response;
  }

}

exports.DbFindByWhereServer = DbFindByWhereServer;