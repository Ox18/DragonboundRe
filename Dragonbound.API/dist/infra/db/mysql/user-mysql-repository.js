"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMysqlRepository = void 0;
const db_1 = require("@/infra/db");
const query_builder_1 = require("./query-builder");
class UserMysqlRepository {
    constructor() {
        this.tableName = "users";
    }
    async get(params) {
        const queryTotal = new query_builder_1.QueryBuilder()
            .select("count(*) as total")
            .from(this.tableName)
            .generate();
        const responseTotal = await db_1.MySQLHelper.query(queryTotal);
        const total = responseTotal[0].total;
        const query = new query_builder_1.QueryBuilder()
            .selectAll()
            .from(this.tableName)
            .limit(params.offset, params.limit)
            .generate();
        const users = await db_1.MySQLHelper.query(query);
        const processedUsers = users.map((user) => user);
        return {
            resources: processedUsers,
            pagination: {
                totalResults: Number(total),
                count: Number(users.length),
                offset: Number(params.offset),
            },
        };
    }
}
exports.UserMysqlRepository = UserMysqlRepository;
//# sourceMappingURL=user-mysql-repository.js.map