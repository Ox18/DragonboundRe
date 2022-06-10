"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("@/main/config/routes"));
const middlewares_1 = __importDefault(require("@/main/config/middlewares"));
const setupApp = async () => {
    const app = (0, express_1.default)();
    (0, middlewares_1.default)(app);
    (0, routes_1.default)(app);
    app.use(express_1.default.json());
    return app;
};
exports.setupApp = setupApp;
//# sourceMappingURL=app.js.map