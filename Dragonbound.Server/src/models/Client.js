import { PacketHelper } from "../presentation/helper/packet-helper";
import { CLIENT_OPCODE } from "../consts/client-opcode";
import { SERVER_OPCODE } from "../consts/server-opcode";
import { User } from "./User";

export class Client {
    constructor(webSocketId, connection, server) {
        this.webSocketId = webSocketId;
        this.connection = connection;
        this.server = server;
        this.user = new User();
        console.log(this.user);
        this.connection.on("message", this.onMessage.bind(this));
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
        const [user_auth_key, user_id] = data;
        this.emitLoginProfile();
        this.emitLoginAvatars();
        // this.send([SERVER_OPCODE.my_player_info, Object.values(Player)]);
        this.user.location_type = 0;
        
    }

    emitLoginProfile() {
        this.send([SERVER_OPCODE.login_profile]);
    }

    emitLoginAvatars() {
        this.send([SERVER_OPCODE.login_avatars]);
    }

    emitAlert(title, description) {
        this.send([SERVER_OPCODE.alert, title, description]);
    }

    send(data) {
        this.connection.send(PacketHelper.Encode(...data));
    }

    closeConnection() {
        this.connection.close();
    }
}