import { Router } from "express";
import { adaptRoute } from "@/main/adapters";
import {
	makeGetUsersController,
	makeCreateUserController,
} from "@/main/factories/controllers";

export default (router: Router): void => {
	router.get("/users", adaptRoute(makeGetUsersController()));
	router.post("/users", adaptRoute(makeCreateUserController()));
};
