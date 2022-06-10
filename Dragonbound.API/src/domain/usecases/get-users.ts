import { UserModel } from "../models";

export interface GetUsers {
	get: (params: GetUsers.Params) => Promise<GetUsers.Result>;
}

export namespace GetUsers {
	export type Params = {
		offset?: number;
		limit?: number;
	};

	export type Result = {
		resources: UserModel[];
		pagination: {
			offset: number;
			count: number;
			totalResults: number;
		};
	};
}
