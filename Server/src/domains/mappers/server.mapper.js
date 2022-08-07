export class ServerMapper {
    server = null;

    static create(
        server
    ) {
        const serverMapper = new ServerMapper();
        serverMapper.server = server;
        return serverMapper;
    }

    toInitilizedOnDatabase() {
        return {
            id: this.server.ID,
            name: this.server.name,
            type: this.server.type,
            subtype: this.server.subtype,
            port: this.server.port,
            player_online: this.server.player_online,
            max_player: this.server.max_player,
            min_level: this.server.min_level,
            max_level: this.server.max_level,
            is_active: this.server.is_active
        }
    }
}