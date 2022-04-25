"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    constructor() {
        this.query = "";
    }
    addStep(step, data) {
        this.query += `${step} ${data} `;
        return this;
    }
    select(data) {
        return this.addStep("select", data);
    }
    selectMultiple(data) {
        return this.addStep("select", data.join(", "));
    }
    selectAll() {
        return this.addStep("select", "*");
    }
    from(data) {
        return this.addStep("from", data);
    }
    where(data) {
        return this.addStep("where", data);
    }
    orderBy(data) {
        return this.addStep("orderBy", data);
    }
    limit(data, listPerPage) {
        return this.addStep("limit", `${data},${listPerPage}`);
    }
    offset(data) {
        return this.addStep("offset", data);
    }
    groupBy(data) {
        return this.addStep("groupBy", data);
    }
    having(data) {
        return this.addStep("having", data);
    }
    join(data) {
        return this.addStep("join", data);
    }
    generate() {
        return this.query.slice(0, -1);
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=query-builder.js.map