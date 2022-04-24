import express, { Express } from "express";
import setupRoutes from "@/main/config/routes";
import setupMiddlewares from "@/main/config/middlewares";

export const setupApp = async (): Promise<Express> => {
	const app = express();
	setupMiddlewares(app);
	setupRoutes(app);
	app.use(express.json());

	return app;
};
