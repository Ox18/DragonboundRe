import { CreateUser } from "@/domain/usecases";
import { CreateUserRepository } from "../protocols/db";

export class DbCreateUser implements CreateUser {
	constructor(private readonly createUserRepository: CreateUserRepository) {}

	create: (params: CreateUser.Params) => Promise<CreateUser.Result> = async (
		params: CreateUser.Params
	) => {
		const response = await this.createUserRepository.create(params);
		return response;
	};
}
