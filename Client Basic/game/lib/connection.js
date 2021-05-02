
// connection
module.exports = class Connection {
    constructor(id, connection, server) {
        this.id = id;
        this._connection = connection;
        this._server = server;
    }

    onClose(callback) {
        this.close_callback = callback;
    }

    listen(callback) {
        this.listen_callback = callback;
    }

    broadcast(message) {
        throw 'Not implemented';
    }

    send(message) {
        throw 'Not implemented';
    }

    sendUTF8(data) {
        throw 'Not implemented';
    }

    close(logError) {
        this._connection.close();
    }
};