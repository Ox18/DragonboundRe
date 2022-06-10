import ModelLib from "../../Libraries/ModelLib";

class Relationship extends ModelLib{
    constructor(){
        super({
            id: "",
            user_id: 0,
            relationship_status: 0,
            relationship_with_id: 0,
            relationship_with_rank: 0,
            relationship_with_photo: 0,
            relationship_with_name: 0,
            relationship_with_gender: 0,
        })
    }
}

export default Relationship;