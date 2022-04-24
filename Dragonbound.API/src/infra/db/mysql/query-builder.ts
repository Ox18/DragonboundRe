export class QueryBuilder {
	private readonly query = [];

	private addStep(step: string, data: object): QueryBuilder {
		this.query.push({
			[step]: data,
		});
		return this;
	}

	public select(data: object): QueryBuilder {
		return this.addStep("select", data);
	}

	public from(data: object): QueryBuilder {
		return this.addStep("from", data);
	}

	public where(data: object): QueryBuilder {
		return this.addStep("where", data);
	}

	public orderBy(data: object): QueryBuilder {
		return this.addStep("orderBy", data);
	}

	public limit(data: object): QueryBuilder {
		return this.addStep("limit", data);
	}

	public offset(data: object): QueryBuilder {
		return this.addStep("offset", data);
	}

	public groupBy(data: object): QueryBuilder {
		return this.addStep("groupBy", data);
	}

	public having(data: object): QueryBuilder {
		return this.addStep("having", data);
	}

	public join(data: object): QueryBuilder {
		return this.addStep("join", data);
	}
}
