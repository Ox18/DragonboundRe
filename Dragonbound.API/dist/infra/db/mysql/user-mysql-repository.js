"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMysqlRepository = void 0;
const db_1 = require("@/infra/db");
class UserMysqlRepository {
    async get(params) {
        const users = await db_1.MySQLHelper.query("SELECT * FROM users", []);
        console.log(users);
        return {
            resources: [],
            pagination: {
                totalResults: Number(users.length),
                count: Number(users.length),
                offset: 0,
            },
        };
    }
}
exports.UserMysqlRepository = UserMysqlRepository;
//# sourceMappingURL=user-mysql-repository.js.map