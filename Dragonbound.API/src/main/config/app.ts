import express, { Express } from "express";
import setupRoutes from "@/main/config/routes";

export const setupApp = async (): Promise<Express> => {
	const app = express();

	setupRoutes(app);
	app.use(express.json());

	return app;
};
