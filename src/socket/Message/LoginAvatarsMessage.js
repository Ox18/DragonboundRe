import { SERVER_OPCODE } from "../../consts/SERVER_OPCODE";

class LoginAvatarsMessage{
    static meet(){
        return [SERVER_OPCODE.login_avatars];
    }
}

export { LoginAvatarsMessage };