
require('dotenv').config();

var ws = require('./game/lib/ws');
var DataBase = require('./Model/DatabaseModel');
var Logger = require('./game/lib/logger');
var GameServer = require('./game/gameserver');
var Account = require('./game/account');
var MapController = require('./game/lib/mapController');
const ServerController = require('./Controller/ServerController');
const serversData = ServerController.GetData();
const serverVersion = serversData.version;

var loadx = process.env.vps === '1' ? false : true;

var self = this;
this.db = new DataBase();
mapControll = new MapController(loadx);
server = new ws(process.env.PORT_SERVER_GAME);

self.multiworld = {};

serversData.servers.map(function(serverMetaData){
    const { id } = serverMetaData;
    let gameServer = new GameServer(serverMetaData, serverVersion, server, self.db, mapControll);

    self.multiworld[id] = gameServer;
    self.multiworld[id].run();
});

server.onConnect(function (connection) {
    for (var i in self.multiworld) {
        if (server.server_qid == self.multiworld[i].id) {
            self.multiworld[i].connect_callback(new Account(connection, self.multiworld[i], server.server_qid));
        }
    }
});

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
