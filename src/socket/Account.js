import ModelLib from "../Libraries/ModelLib";

class Account extends ModelLib{
    constructor(){
        super({
            id: undefined,
            server: undefined,
            app: undefined,
            connection: undefined,
        })
    }
}

export default Account;