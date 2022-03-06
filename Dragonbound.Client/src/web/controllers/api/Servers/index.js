import ServerService from "../../../../core/Service/Server.service";

export const get = async (req, res) =>{

    const query = req.query;

    const serverService = new ServerService();

    const servers = await serverService.findByQuery(query || {});

    res.json(servers);
}