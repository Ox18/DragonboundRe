"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const cors = (_req, res, next) => {
    res.set("access-control-allow-origin", "*");
    res.set("access-control-allow-headers", "*");
    res.set("access-control-allow-methods", "*");
    next();
};
exports.cors = cors;
//# sourceMappingURL=cors.js.map