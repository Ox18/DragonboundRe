import { findServerByIdService } from "../../services/api/find-server-by-id.service";

const { readdirSync } = require("fs");
const { join } = require("path");

export default async (ws) => {
    var servers = {};

    readdirSync(join(__dirname, "../servers")).map(async (file) => {
        if (file.endsWith(".js")) {
            const instanceServer = require(`../servers/${file}`);
            const server = await instanceServer.default(ws);
            const server_data = await findServerByIdService(server.id);
            Object.assign(server, server_data);
            servers[server.id] = server;
        }
    });
}