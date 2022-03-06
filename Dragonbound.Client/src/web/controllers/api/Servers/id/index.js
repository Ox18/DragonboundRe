import ServerService from "../../../../../core/Service/Server.service";
import QueryUtil from "../../../../../util/QueryUtil";

export const get = async (req, res) =>{
    const query = req.query;
    
    // get /:id 
    const id = Number(req.params.id);

    const serverService = new ServerService();

    let server = await serverService.findById(id);

    if(query?.fields){
        let fields = QueryUtil.fromFieldToArray(query.fields);
        server = server.getPropertiesFromArray(fields)
    }

    res.json(server);
}