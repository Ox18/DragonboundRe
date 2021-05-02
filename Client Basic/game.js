var fs = require('fs');
var ws = require('./game/lib/ws');
var DataBase = require('./game/database');
var Logger = require('./game/lib/logger');
var GameServer = require('./game/gameserver');
var Account = require('./game/account');
var MapController = require('./game/lib/mapController');

var port = 8000;


var loadx = process.env.vps === '1' ? false : true;
var self = this;
Logger.Init("game.txt");
this.db = new DataBase();
mapControll = new MapController(loadx);
server = new ws(port);
game = new GameServer(1, 500, server);
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