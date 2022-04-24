"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    constructor() {
        this.query = [];
    }
    addStep(step, data) {
        this.query.push({
            [step]: data,
        });
        return this;
    }
    select(data) {
        return this.addStep("select", data);
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
    limit(data) {
        return this.addStep("limit", data);
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
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=query-builder.js.map