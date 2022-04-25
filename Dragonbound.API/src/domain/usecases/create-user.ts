export interface CreateUser {
	create: (params: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
	export type Params = {
		game_id: string;
		rank?: number;
		gp?: number;
		gold?: number;
		cash?: number;
		gender?: string;
		unlock?: number;
		photo_url?: string;
		country?: string;
	};

	export type Result = boolean;
}
