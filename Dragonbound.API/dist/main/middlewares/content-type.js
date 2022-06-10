"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentType = void 0;
const contentType = (_req, res, next) => {
    res.type("json");
    next();
};
exports.contentType = contentType;
//# sourceMappingURL=content-type.js.map