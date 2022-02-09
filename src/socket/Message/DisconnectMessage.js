import { SERVER_OPCODE } from "../../consts/SERVER_OPCODE";
import { DISCONNECT_REASON } from "../../consts/DISCONNECT_REASON";

class DisconnectMessage{
    constructor(reason_code){
        this.code = SERVER_OPCODE.disconnect_reason;
        this.reason_code = reason_code;
    }

    static REASON_INACTIVE = new DisconnectMessage(DISCONNECT_REASON.inactive);

    static REASON_SERVER_FULL = new DisconnectMessage(DISCONNECT_REASON.SERVER_FULL);

    static REASON_CHANGED_CHANNEL = new DisconnectMessage(DISCONNECT_REASON.CHANGED_CHANNEL);

    static REASON_BAD_CLIENT = new DisconnectMessage(DISCONNECT_REASON.BAD_CLIENT);

    meet(){
        return [this.code, this.reason_code];
    }
}

export { DisconnectMessage };