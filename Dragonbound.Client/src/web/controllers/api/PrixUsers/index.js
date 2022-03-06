import PrixUserService from "../../../../core/Service/PrixUser.service";
import QueryUtil from "../../../../util/QueryUtil";

export const get = async (req, res) =>{

    const query = req.query;

    const { offset = 1, count = 100 } = query;

    const service = new PrixUserService();

    const queryNotStricted = QueryUtil.getNotStrictedWords(query);

    let items = await service.findByQuery(queryNotStricted || {});

    if(query?.fields){
        let fields = QueryUtil.fromFieldToArray(query.fields);
        items = items.map(item => item.getPropertiesFromArray(fields));
    }

    const entries = items.slice((offset - 1) * count, offset * count);

    const total = items.length; 

    res.json({
        entries,
        offset,
        count,
        total
    });
}