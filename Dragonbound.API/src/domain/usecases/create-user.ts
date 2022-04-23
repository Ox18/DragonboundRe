export interface CreateUser {
	create: (user: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
	export type Params = {
		game_id: string;
		rank?: number;
		gp?: number;
		gold?: number;
		cash?: number;
		gender: string;
		photo_url?: string;
		country?: string;
	};

	export type Result = boolean;
}
