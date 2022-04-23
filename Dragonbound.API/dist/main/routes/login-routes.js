"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("../adapters");
const create_user_controller_factory_1 = require("../factories/controllers/create-user-controller-factory");
exports.default = (router) => {
    router.get("/", (0, adapters_1.adaptRoute)((0, create_user_controller_factory_1.makeCreateUserController)()));
};
//# sourceMappingURL=login-routes.js.map