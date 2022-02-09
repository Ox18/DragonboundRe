import ModelLib from "../../Libraries/ModelLib";
import { DisconnectMessage } from "../Message/DisconnectMessage";
import { LoginProfileMessage } from "../Message/LoginProfileMessage";
import { LoginAvatarsMessage } from "../Message/LoginAvatarsMessage";

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
        this.Send(LoginProfileMessage.meet());
        this.Send(LoginAvatarsMessage.meet());
        this.Send([1, [999, 1, 1, "Alex", 26, 10, 10, 10, 10]]);
    }

    isInvalidVersionClient(){
        return this.props.version_client !== this.account.app.version_client;
    }

    Send(data){
        this.account.send(data);
    }
}

export { LoginListener };