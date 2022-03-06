import EventService from "../../../../core/Service/Event.service";
import QueryUtil from "../../../../util/QueryUtil";

export const get = async (req, res) =>{

    const query = req.query;

    const service = new EventService();

    const queryNotStricted = QueryUtil.getNotStrictedWords(query);

    let items = await service.findByQuery(queryNotStricted || {});

    if(query?.fields){
        let fields = QueryUtil.fromFieldToArray(query.fields);
        items = items.map(item => item.getPropertiesFromArray(fields));
    }

    res.json(items);
}