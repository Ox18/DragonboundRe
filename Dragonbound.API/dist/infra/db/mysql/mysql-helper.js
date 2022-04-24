"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLHelper = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const mysql_config_1 = require("./mysql-config");
exports.MySQLHelper = {
    getOffset(currentPage = 1, listPerPage) {
        return (currentPage - 1) * listPerPage;
    },
    emptyOrRows(rows) {
        if (!rows) {
            return [];
        }
        return rows;
    },
    async query(sql, params = []) {
        const connection = await promise_1.default.createConnection(mysql_config_1.CONFIG);
        const [results] = await connection.execute(sql, params);
        return results;
    },
    async getMultiple(page = 1) {
        const offset = exports.MySQLHelper.getOffset(page, 10);
        const rows = await exports.MySQLHelper.query(`SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
        FROM programming_languages LIMIT ${offset},${10}`);
        const data = exports.MySQLHelper.emptyOrRows(rows);
        const meta = { page };
        return {
            data,
            meta,
        };
    },
};
//# sourceMappingURL=mysql-helper.js.map