import { db } from "../lib/connection";

export class ServerRepository {
    constructor() {
        this.serverModel = db.Server;
    }

    async findByWhere(where) {
        const server = await this.serverModel.findOne({
            where
        });
        return server.get();
    }

    async findAllArray() {
        const servers = await this.findAll();
        return servers.map(server => this.__convertToArray(server));
    }

    async findAll() {
        const servers = await this.serverModel.findAll();
        return servers.map(server => server.get());
    }

    __convertToArray(server) {
        const {
            name,
            type,
            port,
            player_online,
            max_player,
            min_level,
            max_level,
            is_active
        } = server;
        let data = [
            name,
            type,
            port,
            player_online,
            max_player
        ];
        if (min_level && max_level) {
            data.push(min_level);
            data.push(max_level);
        }
        if (is_active) {
            return data
        } else {
            return 0;
        }
    }
}