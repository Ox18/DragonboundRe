"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("@/main/adapters");
const get_users_controller_factory_1 = require("@/main/factories/controllers/get-users-controller-factory");
exports.default = (router) => {
    router.get("/users", (0, adapters_1.adaptRoute)((0, get_users_controller_factory_1.makeGetUsersController)()));
};
//# sourceMappingURL=users-routes.js.map