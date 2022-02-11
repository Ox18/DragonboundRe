import ModelLib from "../../Libraries/ModelLib";

class PrixUser extends ModelLib{
    constructor(){
        super({
            id: "",
            user_id: 0,
            prix_point: 0,
            prix_points_type: 0,
            prix_points_reset_price: 0,
            created_at: undefined,
            updated_at: undefined
        })
    }
}

export default PrixUser;