"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const helpers_1 = require("@/presentation/helpers");
class CreateUserController {
    constructor(validation, createUser) {
        this.validation = validation;
        this.createUser = createUser;
    }
    async handle(request) {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return (0, helpers_1.badRequest)(error);
            }
            await this.createUser.create({
                ...request,
            });
            return (0, helpers_1.noContent)();
        }
        catch (error) {
            return (0, helpers_1.serverError)(error);
        }
    }
}
exports.CreateUserController = CreateUserController;
//# sourceMappingURL=create-user-controller.js.map