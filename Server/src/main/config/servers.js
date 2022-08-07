import { readdirSync } from 'fs';
import { join } from 'path';
import { ServerMapper } from '../../domains/mappers/server.mapper';
import { ServerRepository } from '../../infraestructure/db/repositories/server-repository';
import { Client } from '../../Client';

const serverRepository = ServerRepository.create();

export default async (ws) => {

    var servers = {};

    readdirSync(join(__dirname, '../../servers')).map(async (file) => {
        const ServerClass = require("../../servers/" + file);
        const server = new ServerClass.default();
        servers[server.ID] = server;
        const serverMapper = ServerMapper.create(server);
        await serverRepository.make(serverMapper.toInitilizedOnDatabase(server));

        ws.on("connection", (connection, request) => {
            const serverID = parseInt(request.url.split("/")[1]);

            const server = servers[serverID];

            if(!server || server?.isFull()){
                connection.close();
            }else{
                const client = new Client(connection, server);
                server.subscribe(client);
            }
        });
    });
}