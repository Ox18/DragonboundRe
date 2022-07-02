import { SERVER_OPCODE } from "../../consts/server-opcode";
import { Client } from "../../models/Client";

export class SuperServerController {
    name = "SuperServer";
    version = 133;
    type = 1;
    subtype = 2;

    constructor(ws, id) {
        this.ws = ws;
        this.id = id;
        this.ws.on("connection", this.onConnection.bind(this));
    }

    onConnection(connection, request) {
        var webSocketId = request.headers['sec-websocket-key'];
        const serverId = this.getServerIdFromRequest(request);
        if (serverId === this.id) {
            const client = new Client(webSocketId, this.ws, connection, this);
            client.send([SERVER_OPCODE.hi, this.version, this.name, this.type, this.subtype]);
        }
    }
    
    getServerIdFromRequest(request) {
        return parseInt(request.url.split("/")[1]);
    }
}