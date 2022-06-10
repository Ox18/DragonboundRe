import ModelLib from "../../Libraries/ModelLib";

class Guild extends ModelLib{
    constructor(){
        super({
            id: "",
            name: "",
            user_id: 0,
            created_at: undefined,
            updated_at: undefined
        })
    }
}

export default Guild;