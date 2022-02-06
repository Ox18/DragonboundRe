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
                    console.log("login");
                    console.log(data);
                };
                break;
            default:
                console.log("Unknown opcode: " + opcode);
                break;
        }
    }
}

export default Account;