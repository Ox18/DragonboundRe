import AvatarEquipedService from "../../../../core/Service/AvatarEquiped.service";
import QueryUtil from "../../../../util/QueryUtil";

export const get = async (req, res) =>{
    const query = req.query;
    
    // get /:id 
    const id = Number(req.params.id);

    const service = new AvatarEquipedService();

    let item = await service.findById(id);

    if(query?.fields){
        let fields = QueryUtil.fromFieldToArray(query.fields);
        item = item.getPropertiesFromArray(fields)
    }

    res.json(item);
}