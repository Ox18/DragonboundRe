import ServerService from "../../../../core/Service/Server.service";
import QueryUtil from "../../../../util/QueryUtil";

export const get = async (req, res) =>{

    const query = req.query;

    const { offset = 1, count = 100 } = query;

    const service = new ServerService();

    const queryNotStricted = QueryUtil.getNotStrictedWords(query) || {};

    let response = await service.findByQuery({ query: queryNotStricted, count, offset });

    if(query?.fields){
        let fields = QueryUtil.fromFieldToArray(query.fields);
        response.entries = response.entries.map(item => item.getPropertiesFromArray(fields));
    }

    res.json(response);
}