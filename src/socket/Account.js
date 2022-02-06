import AccountHandler from "./Libraries/AccountHandler";
import { CLIENT_OPCODE } from "../consts/CLIENT_OPCODE"; 

import MessageLogin from "./Messages/MessageLogin";

class Account extends AccountHandler{
    constructor(...params){
        super(...params);
    }

    Handler(opcode, data){
        var self = this;
        switch(opcode){
            case CLIENT_OPCODE.login:
                {
                    MessageLogin.listener(self, data);
                };
                break;
            default:
                console.log("Unknown opcode: " + opcode);
                break;
        }
    }
}

export default Account;