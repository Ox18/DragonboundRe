import ModelLib from "../../Libraries/ModelLib";
import { DisconnectMessage } from "../Message/DisconnectMessage";

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
        if(this.isInvalidVersionClient()){
            this.account.send(DisconnectMessage.REASON_BAD_CLIENT.meet());
        }
    }

    isInvalidVersionClient(){
        return this.props.version_client !== this.account.app.version_client;
    }

}

export { LoginListener };