import express from 'express';
import Server from '../Server';

import ServerService from '../../core/Service/ServerService';

const serverService = new ServerService();

var http = require("http").createServer();
var WSS = require("ws").Server;

class WebSocketServer{
    port;
    httpServer;
    app;
    wss;
    servers = {
        list: [],
        loading: false,
        error: null
    }

    constructor(port){
        var self = this;
        this.port = port;
        this.app = express();
        this.httpServer = http;
        this.httpServer.on('request', this.app);
        this.httpServer.listen(port);
        this.wss = new WSS({
            server: http
        });

        this.initializeServers();
        this.initializeWebSocketOn();
    }

    async initializeServers(){
        try{
            this.servers.loading = true;
            let response = await serverService.findAll();
            this.servers.list = response.map(server => Server.fromJSON(server.toHashMap()));
        }catch(ex){
            this.servers.error = ex;
        }finally{
            this.servers.loading = false;
        }
    }

    initializeWebSocketOn(){
        this.wss.on("connection", this.onConnection.bind(this));
        this.wss.on("close", this.onClose.bind(this));
        this.wss.on("error", this.onError.bind(this));
        this.wss.on("headers", this.onHeaders.bind(this));
        this.wss.on("listening", this.onListening.bind(this));
    }

    onConnection(connection, req){}

    onClose(connection, req){}

    onError(connection, req){}

    onHeaders(connection, req){}

    onListening(connection, req){}


    static instanceFromPort(port){
        return new WebSocketServer(port);
    }
}

export default WebSocketServer;