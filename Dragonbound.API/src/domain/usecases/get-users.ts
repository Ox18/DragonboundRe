import { Pagination, UserModel } from "../models";

export interface GetUsers {
	get: (params: GetUsers.Params) => Promise<GetUsers.Result>;
}

export namespace GetUsers {
	export type Params = {
		offset?: number;
		limit?: number;
	};

	export type Result = Pagination<UserModel>;
}
