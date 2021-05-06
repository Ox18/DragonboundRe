var fs = require('fs');
var ws = require('./game/lib/ws');
var DataBase = require('./game/database');
var Logger = require('./game/lib/logger');
var GameServer = require('./game/gameserver');
var Account = require('./game/account');
var MapController = require('./game/lib/mapController');
var ServerData = require('./game/Network/ServerData');

var port = 8000;

var self = this;
this.db = new DataBase();
mapControll = new MapController(true);
server = new ws(port);
game = new GameServer(ServerData[0], server);
game.db = this.db;
game.mapControl = mapControll;

server.onConnect(function (connection) {
    if (game) {
        game.connect_callback(new Account(connection, game));
    }
});
game.run();

server.onError(function () {
    Logger.log('Error Server');
});

process.on('uncaughtException', function (e) {
    Logger.error('uncaughtException: ' + e.stack);
});

function keepAlive() {
    self.db.connection.getConnection().then(conn => {
        conn.query('SELECT 1', [])
            .then(rows => {
                conn.release();
            });
    });
}
setInterval(keepAlive, 28000);