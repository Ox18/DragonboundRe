import ModelLib from "../../Libraries/ModelLib";

class Server extends ModelLib{
    constructor(){
        super({
            id: "",
            username: "",
            password: "",
            status: 0,
            created_at: undefined,
            updated_at: undefined
        })
    }
}

export default Server;