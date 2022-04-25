"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("@/main/adapters");
const controllers_1 = require("@/main/factories/controllers");
exports.default = (router) => {
    router.get("/users", (0, adapters_1.adaptRoute)((0, controllers_1.makeGetUsersController)()));
    router.post("/users", (0, adapters_1.adaptRoute)((0, controllers_1.makeCreateUserController)()));
};
//# sourceMappingURL=users-routes.js.map