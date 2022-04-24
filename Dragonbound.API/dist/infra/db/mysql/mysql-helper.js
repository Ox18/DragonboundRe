"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLHelper = void 0;
exports.MySQLHelper = {
    getOffset(currentPage = 1, listPerPage) {
        return (currentPage - 1) * listPerPage;
    },
    emptyOrRows(rows) {
        if (!rows) {
            return [];
        }
        return rows;
    },
};
//# sourceMappingURL=mysql-helper.js.map