import Express from "express";
import Server from "../Server";
import StorageServer from "../StorageServer";
import Logger from "./Logger";
var http = require("http").createServer();
var Websocket = require("ws").Server;

class ServerSocket{
    app: Express.Express;
    httpServer: any;
    ws: any;
    servers: StorageServer = new StorageServer();

    constructor(
        public port: number
    ){
        this.app = Express();
        this.httpServer = http;
        this.httpServer.on("request", this.app);
        this.httpServer.listen(this.port);
        this.ws = new Websocket({ server: this.httpServer });
        this.ws.on("connection", this.onConnection.bind(this));
        Logger.SUCCESS("ServerSocket started on port " + this.port);
    }

    onConnection(connection: any, req: Request){
        try{
            const serverID = parseInt(req.url.split("/")[1]);
            if(this.servers.exists(serverID)){
                const response = '9,133,"Beginners",0,0'
                
                connection.send(response);

                console.log("ServerSocket: Server " + serverID + " connected");
            }else{
                throw new Error("ServerSocket: Server " + serverID + " not found");
            }
        }catch(ex: any){
            Logger.ERROR(ex.message);
            connection.close();
        }
    }
}

export default ServerSocket;