import { CreateUserController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeDbCreateUser } from "../usecases";

export const makeCreateUserController = (): Controller => {
	const controller = new CreateUserController(makeDbCreateUser())
	return controller;
};
