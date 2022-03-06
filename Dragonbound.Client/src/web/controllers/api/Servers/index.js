import ServerService from "../../../../core/Service/Server.service";

export const get = async (req, res) =>{
    const serverService = new ServerService();

    const servers = await serverService.findAll();

    res.json(servers);
}