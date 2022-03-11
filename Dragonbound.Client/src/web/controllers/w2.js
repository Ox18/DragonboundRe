import ServerService from "../../core/Service/Server.service";
import { NUMBER_CONST } from "../../consts/NUMBER_CONST";

const serverService = new ServerService();

export const get = async (req, res) => {
    const response = await serverService.findAll();
    const servers = response.entries.map(server => [server.name, server.type, server.port, server.players, server.maxPlayers, server.minRank, server.maxRank]);    
    const DATE_NOW = new Date();
    
    res.json([
        NUMBER_CONST.SERVER.VERSION,
        NUMBER_CONST.FILE.SIZE,
        NUMBER_CONST.FILE.CHUNK,
        ...servers,
        DATE_NOW
    ]);
}