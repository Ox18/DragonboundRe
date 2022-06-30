export class SuperServerController {
    constructor(ws, id) {
        this.ws = ws;
        this.id = id;
        this.ws.on("connection", this.onConnection.bind(this));
    }

    onConnection(client, request) {
        var client_id = request.headers['sec-websocket-key'];
        const serverId = this.getServerIdFromRequest(request);
        if(serverId === this.id){
            console.log(client_id);
            console.log("super server connected with id: " + serverId);
        }
    }

    onMessage(){

    }

    getServerIdFromRequest(request) {
        return parseInt(request.url.split("/")[1]);
    }
}