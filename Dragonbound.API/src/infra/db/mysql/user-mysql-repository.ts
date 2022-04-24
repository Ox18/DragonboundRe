import { MySQLHelper } from "@/infra/db";

import { GetUsersRepository } from "@/data/protocols/db";

export class UserMysqlRepository implements GetUsersRepository {
	async get(
		params: GetUsersRepository.Params
	): Promise<GetUsersRepository.Result> {
		const users = await MySQLHelper.query("SELECT * FROM users", []);
		console.log(users)
		return {
			resources: [],
			pagination: {
				totalResults: Number(users.length),
				count: Number(users.length),
				offset: 0,
			},
		};
	}
}
