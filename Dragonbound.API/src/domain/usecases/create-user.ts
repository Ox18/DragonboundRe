export interface CreateUser {
	create: (user: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
	export type Params = {
		game_id: string;
		rank: number;
	};

	export type Result = boolean;
}
