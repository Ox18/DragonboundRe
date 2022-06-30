
import { Client } from "../../models/Client";
import { PacketHelper } from "../helper/packet-helper";

export class SuperServerController {
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
        }
        // const response = [9, 133, "xd", 1, 1];
        // connection.send(PacketHelper.Encode(...response));
    }
    
    getServerIdFromRequest(request) {
        return parseInt(request.url.split("/")[1]);
    }
}