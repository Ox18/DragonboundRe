var fs = require('fs');
var ws = require('./Controller/lib/ws');
var DataBase = require('./Model/index');
var Logger = require('./Controller/lib/logger');
var GameServer = require('./Controller/gameserver');
var Account = require('./Controller/account');
var MapController = require('./Controller/lib/mapController');

var port = 9001;

var loadx = process.env.vps === '1' ? false : true;
var self = this;
Logger.Init("./log/game.txt");
this.db = new DataBase();
mapControll = new MapController(loadx);
server = new ws(port);
this.multiworld = {};
this.multiworld[0] = new GameServer(1,[86,"High Ranks",0,0], 900, server);
this.multiworld[1] = new GameServer(2,[86,"Mid Ranks",0,0], 900, server);
this.multiworld[2] = new GameServer(3,[86,"Beginners",0,0], 900, server);
this.multiworld[3] = new GameServer(4,[86,"All",0,0], 900, server);
this.multiworld[4] = new GameServer(5,[86,"All",0,0], 900, server);
this.multiworld[5] = new GameServer(6,[86,"Bunge.",1,3], 900, server);
this.multiworld[6] = new GameServer(7,[86,"All",0,0], 900, server);
this.multiworld[7] = new GameServer(8,[86,"All",0,0], 900, server);
this.multiworld[8] = new GameServer(9,[86,"Aduka",1,3], 900, server);
this.multiworld[9] = new GameServer(10,[86,"All",0,0], 900, server);
this.multiworld[10] = new GameServer(11,[86,"All",0,0], 900, server);
this.multiworld[11] = new GameServer(12,[86,"All",0,0], 900, server);
this.multiworld[12] = new GameServer(13,[86,"Avatar On",1,3], 900, server);
this.multiworld[13] = new GameServer(14,[86,"Avatar Off",1,3], 900, server);


for (var i in this.multiworld) {
    this.multiworld[i].db = this.db;
    this.multiworld[i].mapControl = mapControll;
    Logger.info("Server:"+this.multiworld[i].id+" Map And DB loaded");
}

server.onConnect(function (connection) {
    for (var i in self.multiworld) {
        if (server.server_qid == self.multiworld[i].id) {
            //Logger.info("enter intro server:"+server.server_qid);
            self.multiworld[i].connect_callback(new Account(connection, self.multiworld[i], server.server_qid));
        }
    }
});
for (var i in this.multiworld) {
    this.multiworld[i].run();
}

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