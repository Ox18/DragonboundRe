import ServerService from "../../../../core/Service/Server.service";
import QueryUtil from "../../../../util/QueryUtil";

export const get = async (req, res) =>{

    const query = req.query;

    const serverService = new ServerService();

    const queryNotStricted = QueryUtil.getNotStrictedWords(query);

    let servers = await serverService.findByQuery(queryNotStricted || {});

    if(query?.fields){
        let fields = QueryUtil.fromFieldToArray(query.fields);
        servers = servers.map(server => server.getPropertiesFromArray(fields));
    }

    res.json(servers);
}