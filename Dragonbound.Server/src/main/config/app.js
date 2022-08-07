import express from "express";
import setupHTTPServer from "./server-http";
import setupWebSocket from "./websocket";
import setupServers from "./servers";

export default async (port) => {
    const app = express();
    const serverHttp = await setupHTTPServer({ app, port });
    const ws = await setupWebSocket(serverHttp);
    await setupServers(ws);
}