"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersController = void 0;
const helpers_1 = require("@/presentation/helpers");
class GetUsersController {
    constructor(getUsers) {
        this.getUsers = getUsers;
    }
    async handle(request) {
        try {
            const { limit = 10, offset = 0 } = request;
            const users = await this.getUsers.get({
                limit,
                offset,
            });
            return (0, helpers_1.ok)(users);
        }
        catch (error) {
            return (0, helpers_1.serverError)(error);
        }
    }
}
exports.GetUsersController = GetUsersController;
//# sourceMappingURL=get-users-controller.js.map