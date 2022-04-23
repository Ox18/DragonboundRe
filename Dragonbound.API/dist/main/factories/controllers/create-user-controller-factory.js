"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUserController = void 0;
const controllers_1 = require("@/presentation/controllers");
const usecases_1 = require("../usecases");
const makeCreateUserController = () => {
    const controller = new controllers_1.CreateUserController((0, usecases_1.makeDbCreateUser)());
    return controller;
};
exports.makeCreateUserController = makeCreateUserController;
//# sourceMappingURL=create-user-controller-factory.js.map