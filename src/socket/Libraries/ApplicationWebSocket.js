import WebSocket from "./WebSocket";
import GameServer from "../GameServer";
import Account from "../Account";

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

            connection.send([6,"a", "b", "c"]);
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