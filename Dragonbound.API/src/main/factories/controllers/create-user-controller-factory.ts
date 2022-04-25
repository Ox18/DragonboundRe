import { CreateUserController } from "@/presentation/controllers/create-user-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbCreateUser } from "../usecases/create-user-factory";

export const makeCreateUserController = (): Controller => {
	const controller = new CreateUserController(makeDbCreateUser());
	return controller;
};
