import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { badRequest, serverError, noContent } from "@/presentation/helpers";
import { CreateUser } from "@/domain/usecases";

export class CreateUserController implements Controller {
	constructor(private readonly createUser: CreateUser) {}

	async handle(request: CreateUserController.Request): Promise<HttpResponse> {
		try {
			// const error = this.validation.validate(request);
			// if (error) {
			// 	return badRequest(error);
			// }
			// await this.createUser.create({
			// 	...request,
			// });
			return badRequest(new Error("Not implemented"));
		} catch (error) {
			return serverError(error);
		}
	}
}

export namespace CreateUserController {
	export type Request = {
		game_id: string;
		rank: number;
	};
}
