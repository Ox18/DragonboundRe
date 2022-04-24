"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetUsers = void 0;
class DbGetUsers {
    constructor(getUsersRepository) {
        this.getUsersRepository = getUsersRepository;
        this.get = async (params) => {
            const response = await this.getUsersRepository.get(params);
            return response;
        };
    }
}
exports.DbGetUsers = DbGetUsers;
//# sourceMappingURL=db-get-users.js.map