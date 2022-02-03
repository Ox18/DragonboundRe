import ServerService from "../../core/Service/ServerService";

const serverService = new ServerService();

export const get = async (req, res) => {
    const servers = await serverService.findAll();
    res.json(servers);
}