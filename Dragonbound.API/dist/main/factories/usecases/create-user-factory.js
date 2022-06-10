"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbCreateUser = void 0;
const usecases_1 = require("@/data/usecases");
const db_1 = require("@/infra/db");
const makeDbCreateUser = () => {
    return new usecases_1.DbCreateUser(new db_1.UserMysqlRepository());
};
exports.makeDbCreateUser = makeDbCreateUser;
//# sourceMappingURL=create-user-factory.js.map