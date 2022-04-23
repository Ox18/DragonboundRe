"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbCreateUser = void 0;
const db_create_user_1 = require("@/data/usecases/db-create-user");
const makeDbCreateUser = () => {
    return new db_create_user_1.DbCreateUser();
};
exports.makeDbCreateUser = makeDbCreateUser;
//# sourceMappingURL=create-user-factory.js.map