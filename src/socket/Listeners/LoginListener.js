import ModelLib from "../../Libraries/ModelLib";

var schema = {
    account: undefined,
    initial_data: [],
    props: {
        hash_connection     : undefined, // string
        user_auth           : undefined, // string
        version_encrypted   : undefined, // number
        user_id             : undefined, // number
        version_client      : undefined, // number
        user_last_location  : undefined, // number
        version             : undefined  // string
    }
}

class LoginListener extends ModelLib {
    constructor(){
        super(schema);
    }

    init(){
        
    }
}

export { LoginListener };