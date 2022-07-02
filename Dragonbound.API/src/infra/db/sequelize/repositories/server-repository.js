import { Repository } from "../lib/repository";

export class ServerRepository extends Repository {
    constructor() {
        super();
        this.model = this.db.Server;
    }

    async findAllArray() {
        const servers = await this.findAll();
        return servers.map(server => this.__convertToArray(server));
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