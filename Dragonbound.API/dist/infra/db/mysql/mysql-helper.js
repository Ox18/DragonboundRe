"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLHelper = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const mysql_config_1 = require("./mysql-config");
exports.MySQLHelper = {
    async query(sql, params = []) {
        const connection = await promise_1.default.createConnection(mysql_config_1.CONFIG);
        const [results] = await connection.execute(sql, params);
        return results;
    },
};
//# sourceMappingURL=mysql-helper.js.map