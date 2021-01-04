
// server
module.exports = class Server {
    constructor(port) {
        this.port = port;
        this._connections = {};
    }

    onConnect(callback) {
        this.connection_callback = callback;
    }

    onError(callback) {
        this.error_callback = callback;
    }

    broadcast(message) {
        throw 'Not implemented';
    }

    forEachConnection(callback) {
        _.each(this._connections, callback);
    }

    addConnection(connection) {
        this._connections[connection.id] = connection;
    }

    removeConnection(id){
        delete this._connections[id];
    }

    getConnection(id){
        return this._connections[id];
    }
};