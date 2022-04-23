import { CreateUser } from "@/domain/usecases";

export class DbCreateUser implements CreateUser {
	constructor() {}

	async create(userData: CreateUser.Params): Promise<CreateUser.Result> {
		return new Promise((resolve) => {
			resolve(true);
		})
	}
}
