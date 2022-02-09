import ModelLib from "../../Libraries/ModelLib";
import { SERVER_OPCODE } from "../../consts/SERVER_OPCODE";
import { DISCONNECT_REASON } from "../../consts/DISCONNECT_REASON";

class DisconnectEmitter extends ModelLib {
    constructor(){
        super({
            code: SERVER_OPCODE.disconnect_reason,
            account: undefined,
        });
    }

    disconnectInactive(){
        this.disconnect(DISCONNECT_REASON.INACTIVE);
    }

    disconnectServerFull(){
        this.disconnect(DISCONNECT_REASON.SERER_FULL);
    }

    disconnectChangedChannel(){
        this.disconnect(DISCONNECT_REASON.CHANGED_CHANNEL);
    }

    disconnectBadClient(){
        this.disconnect(DISCONNECT_REASON.BAD_CLIENT);
    }

    disconnect(reason){
        this.account.send([this.code, reason]);
    }
}

export { DisconnectEmitter };