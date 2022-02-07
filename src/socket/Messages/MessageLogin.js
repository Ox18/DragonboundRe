class MessageLogin{
    constructor(account, data){
        this.account = account;
        this.data = data;
        const [
            x,                  // [String] Hash connection
            user_auth_key,      // [String] User auth key
            version_calculated, // [Number] Client Game ID - m * e.user_id * a * (_0x6932 ^ 17 * _0x6923 + 386421) % 89534761
            user_id,            // [Number] User id
            a,                  // [Number] Version of client
            m,                  // [Number] LocalStorage lobby_channel 1 or the number of location user in the game
            version             // [String] Version of client
        ] = data;
    }

    static listener(account, data){
        return new MessageLogin(account, data);
    }
}

export default MessageLogin;