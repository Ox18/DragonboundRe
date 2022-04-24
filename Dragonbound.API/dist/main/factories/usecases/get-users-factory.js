"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbGetUsers = void 0;
const db_get_users_1 = require("@/data/usecases/db-get-users");
const makeDbGetUsers = () => {
    return new db_get_users_1.DbGetUsers();
};
exports.makeDbGetUsers = makeDbGetUsers;
//# sourceMappingURL=get-users-factory.js.map