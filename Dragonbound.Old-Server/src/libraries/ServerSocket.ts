import Express from "express";
import Logger from "../util/Logger";
import Client from "../Client";
import Server from "../Server";
import CriteriaExistByIdServer from "../Criteria/Server/CriteriaExistById";
import CriteriaStartIdServer from "../Criteria/Server/CriteriaStartId";
var http = require("http").createServer();
var Websocket = require("ws").Server;

class ServerSocket{
    app: Express.Express;
    httpServer: any;
    ws: any;
    servers: Array<Server> = [];

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
            const existServer = CriteriaExistByIdServer.meet(this.servers, serverID);
            if(existServer){
                const serverSelected = CriteriaStartIdServer.meet(this.servers, serverID)[0];
                const client = new Client(connection, serverSelected);
                serverSelected.clientList.add(client);
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
        // console.log(message);
    }
}

export default ServerSocket;