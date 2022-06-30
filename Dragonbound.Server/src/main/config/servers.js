const { readdirSync } = require("fs");
const { join } = require("path");

export default async (ws) => {
    var servers = {};

    readdirSync(join(__dirname, "../servers")).map(async (file) => {
        if (file.endsWith(".js")) {
            const instanceServer = require(`../servers/${file}`);
            const server = await instanceServer.default(ws);
            servers[server.id] = server;
        }
    });
}