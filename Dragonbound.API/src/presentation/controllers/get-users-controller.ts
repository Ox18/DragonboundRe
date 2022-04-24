import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { badRequest, serverError, ok } from "@/presentation/helpers";
import { GetUsers } from "@/domain/usecases";

export class GetUsersController implements Controller {
	constructor(private readonly getUsers: GetUsers) {}

	async handle(request: GetUsersController.Request): Promise<HttpResponse> {
		try {
			const { limit = 10, offset = 1 } = request;
			const users = await this.getUsers.get({
				limit,
				offset,
			});
			return ok(users);
		} catch (error) {
			return serverError(error);
		}
	}
}

export namespace GetUsersController {
	export type Request = {
		limit: number;
		offset: number;
	};
}
