"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("@/main/middlewares");
exports.default = (app) => {
    app.use(middlewares_1.bodyParser);
    app.use(middlewares_1.cors);
    app.use(middlewares_1.contentType);
};
//# sourceMappingURL=middlewares.js.map