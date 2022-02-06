import WebSocket from "./WebSocket";
import GameServer from "../GameServer";

class ApplicationWebsocket{
    server = null;
    servers = {};

    constructor(port){
        this.server = new WebSocket(port);
        this.initialize();
    }

    static instance(port){
        return new ApplicationWebsocket(port);
    }

    initialize(){
        this.initializeOnError();
        this.createGameServers();
        this.initializeOnConnect();
    }

    initializeOnConnect(){
        var self = this;
        self.server.onConnect(function(connection){
            const { server_qid } = self.server;

            // connection.send(999 );
            // connection.close(); // Disconnects the connection
            connection.send([9,133,"Betting",0,0])

        });
        
    }   

    initializeOnError(){
        var self = this;
        self.server.onError(function(error){
            console.log(error);
        });
    }

    createGameServers(){
        for(let i = 1; i < 2; i++){
            this.servers[i] = new GameServer(i, this.server);
        }
    }
}

export default ApplicationWebsocket;