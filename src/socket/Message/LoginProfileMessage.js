import { SERVER_OPCODE } from "../../consts/SERVER_OPCODE";

class LoginProfileMessage{
    static meet(){
        return [SERVER_OPCODE.login_profile];
    }
}

export { LoginProfileMessage };