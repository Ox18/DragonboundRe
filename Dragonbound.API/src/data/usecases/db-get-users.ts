import { GetUsers } from "@/domain/usecases";
import { GetUsersRepository } from "../protocols/db";

export class DbGetUsers implements GetUsers {
	constructor(private readonly getUsersRepository: GetUsersRepository) {}

	get: (params: GetUsers.Params) => Promise<GetUsers.Result> = async (
		params: GetUsers.Params
	) => {
		const response = await this.getUsersRepository.get(params);
		return response;
	};
}
