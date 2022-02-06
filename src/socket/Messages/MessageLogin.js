class MessageLogin{
    constructor(account, data){
        this.account = account;
        this.data = data;

        const [
            hash,                // [String] Hash connection
            session,             // [String] Session
            version,             // [String] Version of client
            code_integer_first,  // [Number] ??
            user_id,             // [Number] User id
            code_integer_second, // [Number] ??
            code_string_first    // [String] ??
        ] = data;
        
    }

    static listener(account, data){
        return new MessageLogin(account, data);
    }
}

export default MessageLogin;