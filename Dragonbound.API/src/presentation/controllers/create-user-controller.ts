import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { CreateUser } from "@/domain/usecases";

export class CreateUserController implements Controller {
	constructor(private readonly createUser: CreateUser) {}

	async handle(request: CreateUserController.Request): Promise<HttpResponse> {
		try {
			const response = await this.createUser.create(request);
			return ok(response);
		} catch (error) {
			return serverError(error);
		}
	}
}

export namespace CreateUserController {
	export type Request = {
		game_id: string;
		rank?: number;
		gp?: number;
		gold?: number;
		cash?: number;
		gender?: string;
		photo_url?: string;
		country?: string;
	};
}
