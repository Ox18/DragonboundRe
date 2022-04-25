"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbCreateUser = void 0;
class DbCreateUser {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository;
        this.create = async (params) => {
            const response = await this.createUserRepository.create(params);
            return response;
        };
    }
}
exports.DbCreateUser = DbCreateUser;
//# sourceMappingURL=db-create-user.js.map