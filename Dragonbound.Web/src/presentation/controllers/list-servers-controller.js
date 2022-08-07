import { HTTP_STATUS_CODE, VERSION_GAME } from "../../consts";

export class ListServersController {
    constructor(
        serverRepository
    ) {
        this.serverRepository = serverRepository;
    }

    async handle(req) {

        const servers = await this.serverRepository.findAll();

        const data = servers.map((server) => {
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
            let detailsServer = [
                name,
                type,
                port,
                player_online,
                max_player
            ];
            if (min_level && max_level) {
                detailsServer.push(min_level);
                detailsServer.push(max_level);
            }
            if (is_active) {
                return detailsServer
            } else {
                return 0;
            }
        });

        return {
            status: HTTP_STATUS_CODE.OK,
            body: [
                VERSION_GAME,
                9022,
                83276,
                ...data,
                Date.now()
            ]
        }
    }
}