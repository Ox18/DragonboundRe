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
    insert(table, data) {
        const columns = Object.keys(data).map(key => "`" + key + "`");
        const values = Object.values(data).map((value) => `'${value}'`);
        const query = `${table} (${columns.join(", ")}) values (${values.join(", ")})`;
        return this.addStep("insert into", query);
    }
    generate() {
        return this.query.slice(0, -1);
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=query-builder.js.map