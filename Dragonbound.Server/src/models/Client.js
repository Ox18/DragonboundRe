import { PacketHelper } from "../presentation/helper/packet-helper";
import { CLIENT_OPCODE } from "../consts/client-opcode";

export class Client {
    constructor(webSocketId, connection, server) {
        this.webSocketId = webSocketId;
        this.connection = connection;
        this.server = server;

        this.connection.on("message", this.onMessage.bind(this));
    }

    send(data) {
        this.connection.send(PacketHelper.Encode(...data));
    }

    onMessage(encodedData) {
        const decodeData = PacketHelper.DecodeBuffer(encodedData);
        const [CLIENT_OPCODE_ID, ...data] = decodeData;
        switch (CLIENT_OPCODE_ID) {
            case CLIENT_OPCODE.login:
                this.loginOpcode(data);
                break;
            default:
                console.log("Unknown opcode: " + CLIENT_OPCODE_ID);
                console.log("data: " + JSON.stringify(data));
                break;
        }
    }

    loginOpcode(data) {
        console.log("La data de login opcode: " + JSON.stringify(data));
        const [x, user_auth_key, token_user_id, user_id, version_client, location, version_client_web] = data;

    }
}