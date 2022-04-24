import { Router } from "express";
import { adaptRoute } from "@/main/adapters";
import { makeGetUsersController } from "@/main/factories/controllers/get-users-controller-factory";

export default (router: Router): void => {
	router.get("/users", adaptRoute(makeGetUsersController()));
};
