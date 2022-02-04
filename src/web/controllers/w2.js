import ServerService from "../../core/Service/ServerService";

const serverService = new ServerService();

export const get = async (req, res) => {
    let servers = await serverService.findAll();
        servers = servers.map(server => [server.name, server.type, server.port, server.players, server.maxPlayers, server.minRank, server.maxRank]);
    const SERVER_VERSION = 133;
    const SIZE_FILE = 78212;
    const SIZE_FILE_CHUNK = 7961;
    const DATE_NOW = new Date();
    
    res.json([
        SERVER_VERSION,
        SIZE_FILE,
        SIZE_FILE_CHUNK,
        ...servers,
        DATE_NOW
    ])
}