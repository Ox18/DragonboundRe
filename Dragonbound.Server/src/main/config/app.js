import express from "express";

import setupServerHttp from "./server-http";
import setupWebsocket from "./websocket";
import setupServers from "./servers";
import setupMiddlewares from "./middlewares";

export default async (port, callbackSuccess) => {
    const app = express();
    setupMiddlewares(app);
    const serverHttp = await setupServerHttp(app, port, callbackSuccess);
    const ws = await setupWebsocket(serverHttp);
    await setupServers(ws);
}