import Connection from "./Connection";

class SocketConnection extends Connection{
    constructor(id, connection, server) {
        super(id, connection, server);
        var self = this;
        this._connection.on('message', function(message) {
            if (self.listen_callback) {
                try {
                    self.listen_callback(JSON.parse(message));
                } catch (e) {
                    console.log('error: ' + e.stack);
                }
            }
        });

        this._connection.on('close', function(connection) {
            self._server.removeConnection(self.id);
            if (self.close_callback) {
                self.close_callback();
            }
        });

        this._connection.on('error', function(error) {
            console.log('error: ' + error);
        });
    }

    send(message) {
        var data = JSON.stringify(message);
        this.sendUTF8(data);
    }

    sendUTF8(data) {
        try {
            this._connection.send(data);
        } catch (e) {
            console.log('error: ' + e.stack);
        }
    }
};

export default SocketConnection;