import { GetUsers } from "../../../../domain/usecases";

export interface GetUsersRepository {
	get(params: GetUsers.Params): Promise<GetUsers.Result>;
}

export namespace GetUsersRepository {
	export type Params = GetUsers.Params;

	export type Result = GetUsers.Result;
}
