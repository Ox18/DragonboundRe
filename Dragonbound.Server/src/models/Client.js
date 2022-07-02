import { PacketHelper } from "../presentation/helper/packet-helper";

export class Client {
    constructor(webSocketId, webSocket, connection, server) {
        this.webSocketId = webSocketId;
        this.webSocket = webSocket;
        this.connection = connection;
        this.server = server;
    }

    send(data) {
        this.connection.send(PacketHelper.Encode(...data));
    }
}