class LoginListener{
    hash_connection;
    user_auth_key;
    version_encrypted;
    user_id;
    version_client;
    lobby_channel;
    version;

    constructor(account, data){
        this.account = account;
        this.initializeProperties(data);

        this.account.EMITTERS.login_profile.Emit();
    }

    initializeProperties(data){
        this.hash_connection = data[0];
        this.user_auth_key = data[1];
        this.version_encrypted = data[2];
        this.user_id = data[3];
        this.version_client = data[4];
        this.lobby_channel = data[5];
        this.version = data[6];
    }

    static instance(account, data){
        return new LoginListener(account, data);
    }
}

export { LoginListener };