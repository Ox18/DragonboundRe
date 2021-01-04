var mysql = require('mysql2');
var Logger = require('./lib/logger');
// mydb
module.exports = class Connection {
    constructor(config) {
        var self = this;
        this.config = config;
        this.connection = null;
        this.connection = mysql.createPool(config);
        if (this.connection !== null) {
            Logger.normal("MYSQL Connect!");
        }
        this.connection.on('enqueue', function () {
            Logger.normal('Waiting for available connection slot');
        });
        this.connection.on('release', function (connection) {
            Logger.normal('Connection ' + connection.threadId + " released");
        });
    }

    getConnection(callback) {
        if (this.connection === null) {
            this.connection = mysql.createPool(this.config);
            callback(null, this.connection);
        } else {
            callback(null, this.connection);
        }
    }
};