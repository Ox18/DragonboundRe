export class Client {
    constructor(webSocketId, webSocket, connection, server) {
        this.webSocketId = webSocketId;
        this.webSocket = webSocket;
        this.connection = connection;
        this.server = server;
    }
}