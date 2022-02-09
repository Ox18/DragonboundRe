import express from 'express';
import Server from '../Server';
import ServerService from '../../core/Service/ServerService';
import Account from '../Account';

const serverService = new ServerService();

var http = require("http").createServer();
var WSS = require("ws").Server;

class WebSocketServer{
    version_client = 133;
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
            this.servers.list = response.map(server => Server.fromHashMap({ ...server.toHashMap(), version_client: this.version_client }));
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

    onConnection(connection, req){
        let server_id = Number(req.url.split("/")[1]);

        if(this.existServer(server_id)){    // Server exist
            connection.send(JSON.stringify([9,133,"Betting",0,0]));

            let server = this.findServer(server_id);
            let id = "wilmer";
            let app = this;

            let account = Account.fromHashMap({
                id,
                server,
                app,
                connection
            });
            server.accountStorage.add(account);
        }else{
            connection.close();
        }
    }

    onClose(connection, req){}

    onError(connection, req){}

    onHeaders(connection, req){}

    onListening(connection, req){}

    existServer(id){
        return this.servers.list.find(server => server.id === id);
    }

    findServer(id){
        return this.servers.list.find(server => server.id === id);
    }

    static instanceFromPort(port){
        return new WebSocketServer(port);
    }
}

export default WebSocketServer;