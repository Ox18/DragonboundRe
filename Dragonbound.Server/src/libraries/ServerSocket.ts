import Express from "express";
import Server from "./Server";
import StorageServer from "./StorageServer";
import Logger from "./Logger";
var http = require("http").createServer();
var Websocket = require("ws").Server;
import SERVER_OPCODE from "../consts/SERVER_OPCODE";
import Client from "./Client";
import Packet from "../util/Packet";

class ServerSocket{
    app: Express.Express;
    httpServer: any;
    ws: any;
    servers: StorageServer = new StorageServer();

    constructor(
        public PORT: number,
        public VERSION: number,
    ){
        this.app = Express();
        this.httpServer = http;
        this.httpServer.on("request", this.app);
        this.httpServer.listen(this.PORT);
        this.ws = new Websocket({ server: this.httpServer });
        this.ws.on("connection", this.onConnection.bind(this));
        Logger.SUCCESS("ServerSocket started on port " + this.PORT);
    }

    onConnection(connection: any, req: Request){
        try{
            const serverID = parseInt(req.url.split("/")[1]);
            if(this.servers.exists(serverID)){
                const serverSelected = this.servers.find(serverID);
                const response = [SERVER_OPCODE.hi, this.VERSION, serverSelected.name, serverSelected.server_type, serverSelected.server_type];
                const data = Packet.ArrayToString(response);
                const client = new Client(connection, serverSelected);
                serverSelected.clientList.add(client);
                connection.send(data);
            }else{
                throw new Error("ServerSocket: Server " + serverID + " not found");
            }
        }catch(ex: any){
            Logger.ERROR(ex.message);
            connection.close();
        }
    }

    onError(error: any){
        Logger.ERROR(error);
    }

    onClose(...args: any){
        Logger.SUCCESS(args);
    }

    onOpen(...args: any){
        Logger.SUCCESS(args);
    }

    onMessage(message: any){
        console.log(message);
    }
}

export default ServerSocket;