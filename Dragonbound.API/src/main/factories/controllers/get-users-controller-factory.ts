import { GetUsersController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeDbGetUsers } from "@/main/factories/usecases";

export const makeGetUsersController = (): Controller => {
	const controller = new GetUsersController(makeDbGetUsers());
	return controller;
};
