class MessageLogin{
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

        // this.account.Emit(1, [1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1, 1])
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

    static listener(account, data){
        return new MessageLogin(account, data);
    }
}

export default MessageLogin;