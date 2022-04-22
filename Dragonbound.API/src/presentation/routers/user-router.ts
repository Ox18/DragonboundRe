import * as express from "express";
import { Request, Response } from "express";
import { CreateUserUseCase } from "@interfaces/use-cases/user/create-user";
import { GetAllUsersUseCase } from "@interfaces/use-cases/user/get-all-users";

export default function UsersRouter(
	createUserUseCase: CreateUserUseCase,
	getAllUsersUseCase: GetAllUsersUseCase
) {
	const router = express.Router();

	router.get("/", async (req: Request, res: Response) => {
		try {
			const users = await getAllUsersUseCase.execute();
			res.send(users);
		} catch (ex) {
			res.status(500).send({
				message: "Error fetching data",
			});
		}
	});

	router.post("/", async (req: Request, res: Response) => {
		try {
			await createUserUseCase.execute(req.body);
			res.statusCode = 201;
			res.json({ message: "Created" });
		} catch (ex) {
			res.status(500).send({
				message: "Error saving data",
			});
		}
	});

	return router;
}
