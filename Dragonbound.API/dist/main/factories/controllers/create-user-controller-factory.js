"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUserController = void 0;
const create_user_controller_1 = require("@/presentation/controllers/create-user-controller");
const create_user_factory_1 = require("../usecases/create-user-factory");
const makeCreateUserController = () => {
    const controller = new create_user_controller_1.CreateUserController((0, create_user_factory_1.makeDbCreateUser)());
    return controller;
};
exports.makeCreateUserController = makeCreateUserController;
//# sourceMappingURL=create-user-controller-factory.js.map