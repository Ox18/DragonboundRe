import { Router } from "express";
import { adaptRoute } from "../adapters";
import { makeCreateUserController } from "../factories/controllers/create-user-controller-factory";

export default (router: Router): void => {
	router.get("/", adaptRoute(makeCreateUserController()));
};
