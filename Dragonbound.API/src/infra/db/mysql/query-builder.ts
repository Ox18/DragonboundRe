export class QueryBuilder {
	private query = "";

	private addStep(step: string, data: any): QueryBuilder {
		this.query += `${step} ${data} `;
		return this;
	}

	public select(data: string): QueryBuilder {
		return this.addStep("select", data);
	}

	public selectMultiple(data: string[]): QueryBuilder {
		return this.addStep("select", data.join(", "));
	}

	public selectAll(): QueryBuilder {
		return this.addStep("select", "*");
	}

	public from(data: string): QueryBuilder {
		return this.addStep("from", data);
	}

	public where(data: string): QueryBuilder {
		return this.addStep("where", data);
	}

	public orderBy(data: string): QueryBuilder {
		return this.addStep("orderBy", data);
	}

	public limit(data: number, listPerPage: number): QueryBuilder {
		return this.addStep("limit", `${data},${listPerPage}`);
	}

	public offset(data: number): QueryBuilder {
		return this.addStep("offset", data);
	}

	public groupBy(data: string): QueryBuilder {
		return this.addStep("groupBy", data);
	}

	public having(data: string): QueryBuilder {
		return this.addStep("having", data);
	}

	public join(data: string): QueryBuilder {
		return this.addStep("join", data);
	}
	

	public generate(): string {
		return this.query.slice(0, -1);
	}
}
