import Listener from "../Libraries/Listener";

class LoginListener extends Listener {
    account;
    initial_data            = [];
    props = {
        hash_connection     : undefined, // string
        user_auth           : undefined, // string
        version_encrypted   : undefined, // number
        user_id             : undefined, // number
        version_client      : undefined, // number
        user_last_location  : undefined, // number
        version             : undefined  // string
    };

    constructor(account, data){
        super(account, data);
        this.init();

        console.log(this.props);
    }
    
    static instance(account, data){
        return new LoginListener(account, data);
    }
}

export { LoginListener };