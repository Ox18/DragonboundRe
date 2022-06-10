import { CreateUser } from "@/domain/usecases";

export interface CreateUserRepository {
	create(
		params: CreateUserRepository.Params
	): Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
	export type Params = CreateUser.Params;

	export type Result = CreateUser.Result;
}
