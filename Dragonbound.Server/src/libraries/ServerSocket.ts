import Express from "express";
import Logger from "./Logger";
var http = require("http").createServer();
var Websocket = require("ws").Server;

class ServerSocket{
    app: Express.Express;
    httpServer: any;
    ws: any;

    constructor(
        public port: number
    ){
        this.app = Express();
        this.httpServer = http;
        this.httpServer.on("request", this.app);
        this.httpServer.listen(this.port);
        this.ws = new Websocket({ server: this.httpServer });

        this.ws.on("connection", (ws: any) => {
            console.log("GA")
        });
        Logger.SUCCESS("ServerSocket started on port " + this.port);
    }
}

export default ServerSocket;