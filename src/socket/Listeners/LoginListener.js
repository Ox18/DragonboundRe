import Listener from "../Libraries/Listener";

class LoginListener extends Listener {
    account;
    initial_properties      = [];
    props = {
        hash_connection     = undefined,
        user_auth           = undefined,
        version_encrypted   = undefined,
        user_id             = undefined,
        version_client      = undefined,
        user_last_location  = undefined,
        version             = undefined
    };

    constructor(...args){
        super(...args);
        this.init();

        this.account.EMITTERS.login_profile.Emit();
    }
    
    static instance(...args){
        return new LoginListener(...args);
    }
}

export { LoginListener };