"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetUsers = void 0;
class DbGetUsers {
    constructor() {
        this.get = async (params) => {
            return new Promise((resolve) => {
                resolve({
                    resources: [],
                    pagination: {
                        offset: params.offset,
                        count: 0,
                        totalResults: 0,
                    },
                });
            });
        };
    }
}
exports.DbGetUsers = DbGetUsers;
//# sourceMappingURL=db-get-users.js.map