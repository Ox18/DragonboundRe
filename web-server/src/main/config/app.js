import express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";
import setupTemplate from "./template";
import setupSetting from "./setting";

export const setupApp = async () => {
    const app = express();
    setupSetting(app);
    setupTemplate(app);
    setupMiddlewares(app);
    setupRoutes(app);
    return app;
}