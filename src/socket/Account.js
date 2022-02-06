import AccountHandler from "./Libraries/AccountHandler";
import { CLIENT_OPCODE } from "../consts/TYPES"; 

class Account extends AccountHandler{
    constructor(...params){
        super(...params);
    }

    Handler(opcode, data){
        var self = this;
        switch(opcode){
            case CLIENT_OPCODE.login:
                {
                    const [
                        hash,                // [String] Hash connection
                        session,             // [String] Session
                        version,             // [String] Version of client
                        code_integer_first,  // [Number] ??
                        user_id,             // [Number] User id
                        code_integer_second, // [Number] ??
                        code_string_first    // [String] ??
                    ] = data;
                    self.Emit(25, [4])
                };
                break;
            default:
                console.log("Unknown opcode: " + opcode);
                break;
        }
    }
}

export default Account;