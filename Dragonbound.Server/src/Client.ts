import CLIENT_OPCODE from "./consts/CLIENT_OPCODE";
import ClientManagement from "./libraries/ClientManagement";

class Client extends ClientManagement{
    processMessage(MESSAGE_ID: Number, MESSAGE_DATA: Array<any>){
        switch(MESSAGE_ID){
            case CLIENT_OPCODE.login:
                const [
                    hash_connection,
                    user_auth,
                    version_encrypted,
                    user_id,
                    version_client,
                    user_last_location,
                    version_client_web
                ] = MESSAGE_DATA;
                break;
            default:
                console.log(MESSAGE_ID, MESSAGE_DATA);
        }
    }
}

export default Client;