"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetUsersController = void 0;
const controllers_1 = require("@/presentation/controllers");
const usecases_1 = require("@/main/factories/usecases");
const makeGetUsersController = () => {
    const controller = new controllers_1.GetUsersController((0, usecases_1.makeDbGetUsers)());
    return controller;
};
exports.makeGetUsersController = makeGetUsersController;
//# sourceMappingURL=get-users-controller-factory.js.map