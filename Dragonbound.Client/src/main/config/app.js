import express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

export const setupApp = async () => {
    const app = express();
    setupMiddlewares(app);
    setupRoutes(app);
    return app;
}