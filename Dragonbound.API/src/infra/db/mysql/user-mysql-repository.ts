import { MySQLHelper } from "@/infra/db";

import { CreateUserRepository, GetUsersRepository } from "@/data/protocols/db";
import { QueryBuilder } from "./query-builder";
import { UserModel } from "@/domain/models";

export class UserMysqlRepository
	implements GetUsersRepository, CreateUserRepository
{
	private readonly tableName = "users";

	async get(
		params: GetUsersRepository.Params
	): Promise<GetUsersRepository.Result> {
		const queryTotal = new QueryBuilder()
			.select("count(*) as total")
			.from(this.tableName)
			.generate();

		const responseTotal = await MySQLHelper.query(queryTotal);
		const total = responseTotal[0].total;

		const query = new QueryBuilder()
			.selectAll()
			.from(this.tableName)
			.limit(params.offset, params.limit)
			.generate();

		const users = await MySQLHelper.query(query);

		const processedUsers = users.map((user) => user as UserModel);

		return {
			resources: processedUsers,
			pagination: {
				totalResults: Number(total),
				count: Number(users.length),
				offset: Number(params.offset),
			},
		};
	}

	async create(
		params: CreateUserRepository.Params
	): Promise<CreateUserRepository.Result> {
		const query = new QueryBuilder().insert(this.tableName, params).generate();

		const response = await MySQLHelper.query(query);

		return true;
	}
}
