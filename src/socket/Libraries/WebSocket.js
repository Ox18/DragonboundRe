import Server from "./Server";
import SocketConnection from "./SocketConnection";

var http = require('http').createServer();
import express from 'express';

var WebSocketServer = require('ws').Server;

class WebSocket extends Server{
    constructor(port){
      super(port);
      var self = this;
      this._counter = 0;
      this._httpServer = http;
      this._app = express();
      this._app.set('env', 'production');
      this._app.disable('x-powered-by');
      this._httpServer.on('request', this._app);
      this._httpServer.listen(port);
      this._wss = new WebSocketServer({
          server: http
      });
      this._wss.on('connection', function connection(ws,req) {
          self.server_qid=parseInt(req.url.split("/")[1]);
          var c = new SocketConnection(self._createId(), ws, self);
          if (self.connection_callback) {
              self.connection_callback(c);
          }
          self.addConnection(c);
      });
    }
   
    _createId() {
      return '5' + Math.floor(Math.random() * 99) + '' + (this._counter++); 
    }
  }

  
  export default WebSocket;