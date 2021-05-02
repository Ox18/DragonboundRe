var Types = require('./gametypes');
var Account = require('./account');
var Logger = require('./lib/logger');
var Avatars = require('./avatars');
// gameserver
module.exports = class GameServer {
    constructor(id, server_options, maxPlayers, websocketserver) {
        var self = this;
        this.id = id;
        this.server_options = server_options;
        this.maxPlayers = maxPlayers;
        this.server = websocketserver;
        this.accounts = {};
        this.bots = {};
        this.groups = {};
        this.rooms = {};
        this.chathistory = [];
        this.outgoingQueues = {};
        this.ups = 50;
        this.db = null;
        this.ver = this.server_options[0];
        this.name = this.server_options[1];
        this.room_ids = [];
        this.bot_ids = [];
        this.avatars = new Avatars();
        this.mapControl = null;
        this.server_type = this.server_options[2];
        this.server_subtype = this.server_options[3];

        this.onAccountConnect(function (account) {
            account.send([Types.SERVER_OPCODE.hi, this.ver, this.name, this.server_type, this.server_subtype]);
        });

        this.onAccountRemoved(function () {
            // Logger.debug("playerRemoved")
        });

        this.onAccountEnter(function (account) {
            Logger.info('The user '+account.player.game_id+' has entered the server '+self.id);
            
            if (Date.now() < account.player.gameserverevent) {
                if (1558933200000 === account.player.gameserverevent) {
                    this.evento500 = true;
                } else {
                    this.evento200 = true;
                }
            } else {
                this.evento200 = false;
                this.evento500 = false;
            }
            
            if (self.chathistory !== null) {
                var data = self.chathistory.slice(0);
                data.push(['', '', 9]);
                if (self.evento200 === true) {
                    data.push([' El porcentaje de GP & Gold cambiaron a 200%', '[Inicio de Evento', 17]);
                }
                if (self.evento500 === true) {
                    data.push([' El porcentaje de GP & Gold cambiaron a 500%', '[Inicio de Evento', 17]);
                }
                
                if (self.name === 'Holiday') {
                    data.push([' Búscame, gáname y te llevas un regalo: (gift) '+account.player.gifts_holiday+' Regalos enviados (gift)', 'EasterBunny', 5]);
                    data.push([' Tienes '+account.player.gm_probability+' ganadas seguidas = 200% GP & Gold! Event probabilidad x'+account.player.gm_probability, '', 6]);
                } else if (self.id === 2) {
                   
                } else {}
               

                data.push(['Bienvenido a DragonBound! v3', '', 9]);
                account.send([Types.SERVER_OPCODE.room_state, [0, data], 1]);
            }
            self.sendAccountsOnline();
            if (self.server_subtype !== 3)
                self.sendRooms(account);
            account.onExit(function () {
                Logger.info(account.player.game_id + ' has left the game server.');
                Logger.info(account.player.game_id + ' has left the [Room: '+account.player.room_number+'] game.');
                self.db.updateServerByUserId(0, account.player.user_id);
                account.hasEnteredGame = false;
                account.login_complete = false;
                self.removeAccount(account);
                if (self.removed_callback) {
                    self.removed_callback();
                }
                self.sendAccountsOnline();
                if (account.player.room_number !== 0) {//win_gold, win_gp, is_loss, user_id
                    if (self.name === 'Holiday') {
                        self.db.updateProbability(0, account.player.user_id);
                    } else if (self.name === 'Prix') {
                        account.player.punts_prix_user -= 1;
                        self.db.updatePrix(account.player.punts_prix_user, account);
                    }/* else if (self.name === 'Guilds Prix' && account.player.guild !== '' && self.player.server_tournament_state === 0) {//Revisar
                        account.player.guild_score -= 1;
                        self.db.updateGuildPrixById(account.player.guild_score, account.player.guild_id);
                    }*/ else {}
                    self.db.updateLeftByIdAcc(1500, 5, 1, account.player.user_id);
                }
                account = null;
            });

            /*account.onBroadcast(function(message, ignoreSelf) {
                self.pushToAdjacentGroups(account.group, message, ignoreSelf ? account.id : null)
            });*/
        });
    }

    sendAccountsOnline() {
        var self = this;
        var data = [];
        self.forEachAccount(function (account) {
            if (account !== null) {
                data.push(account.user_id);
                data.push(account.player.game_id);
                data.push(account.player.rank);
                data.push(account.player.guild);
            }
        });
        self.pushBroadcastChannel([Types.SERVER_OPCODE.channel_players, data]);
    }

    sendRooms(account) {
        var self = this;
        var data = [];
        self.getRoomsArray(function (arr) {
            data = arr;
            var snd = [Types.SERVER_OPCODE.rooms_list, data];
            if (typeof (account) !== 'undefined')
                account.send(snd);
            else
                self.pushBroadcastChannel(snd);
        });
    }

    sendRoomsType(account, page, type) {
        var self = this;
        var data_fin = [];
        self.getRoomsArray(function (arr) {
            if (arr !== null) {
                for (var i = page; i < (page + 7); i++) {
                    if (i < arr.length) {
                        data_fin.push(arr[i]);
                    }
                }
                var snd = [Types.SERVER_OPCODE.rooms_list, data_fin];
                account.send(snd);
            }
        });
    }

    run() {
        var self = this;
        var regenCount = this.ups * 2;
        var updateCount = 0;
        setInterval(function () {
            self.processQueues();
            if (updateCount < regenCount) {
                updateCount += 1;
            } else {
                if (self.regen_callback) {
                    self.regen_callback();
                }
                updateCount = 0;
            }
        }, 1000 / this.ups);
        Logger.normal('' + this.id + ' created (capacity: ' + this.maxPlayers + ' players).');
    }

    pushToAccount(account, message) {
        if (account && account.user_id in this.outgoingQueues) {
            this.outgoingQueues[account.user_id].push(message.serialize());
        } else {
            Logger.error('pushToAccount: account was undefined');
        }
    }

    pushToRoom(roomId, message, ignoredAccount) {
        var self = this,
            room = this.rooms[roomId];
        if (room) {
            room.forPlayers(function (account) {
                if (account !== null && typeof (account) !== 'undefined') {
                    if (account.user_id != ignoredAccount && account.player.is_bot === 0) {
                        self.pushToAccount(account, message);
                    }
                }
            });
        } else {
            Logger.error('roomId: ' + roomId + ' is not a valid group');
        }
    }

    pushBroadcast(message, ignoredAccount) {
        for (var id in this.outgoingQueues) {
            if (id != ignoredAccount) {
                this.outgoingQueues[id].push(message.serialize());
            }
        }
    }

    pushBroadcastChat(message, room) {
        if (room) {
            this.pushToRoom(room.id, message);
        } else {
            for (var id in this.outgoingQueues) {
                this.outgoingQueues[id].push(message.serialize());
            }
        }
    }

    pushBroadcastChannel(message) {
        var self = this;
        for (var id in this.outgoingQueues) {
            var account = self.getAccountById(id);
            if (account !== null && account.location_type === Types.LOCATION.CHANNEL) {
                if (Array.isArray(message) === true)
                    this.outgoingQueues[id].push(message);
                else
                    this.outgoingQueues[id].push(message.serialize());
            }
        }
    }

    pushBroadcastSTR(message, ignoredAccount) {
        for (var id in this.outgoingQueues) {
            if (id != ignoredAccount) {
                this.outgoingQueues[id].push(message);
            }
        }
    }

    processQueues() {
        var self = this,
            connection;
        for (var id in this.outgoingQueues) {
            if (this.outgoingQueues[id].length > 0) {
                var account = this.getAccountById(id);
                if (account !== null && typeof (account) != 'undefined') {
                    connection = this.server.getConnection(account.con_id);
                    for (var i = 0; i < this.outgoingQueues[id].length; i++) {
                        try {
                            if (connection)
                                connection.send(this.outgoingQueues[id][i]);
                        } catch (e) {}
                    }
                }
                this.outgoingQueues[id] = [];
            }
        }
    }

    onInit(callback) {
        this.init_callback = callback;
    }

    onAccountConnect(callback) {
        this.connect_callback = callback;
    }

    onAccountEnter(callback) {
        this.enter_callback = callback;
    }

    onAccountAddded(callback) {
        this.added_callback = callback;
    }

    onAccountRemoved(callback) {
        this.removed_callback = callback;
    }

    onRegenTick(callback) {
        this.regen_callback = callback;
    }

    getRoomsArray(callback) {
        var self = this;
        var data = [];
        self.forEachRooms(function (rom) {
            data.push([
                rom.id,
                rom.title,
                rom.player_count,
                rom.max_players,
                rom.status,
                rom.game_mode,
                rom.look,
                rom.map,
                rom.power
            ]);
        });
        callback(data);
    }

    getRoomById(id, callback) {
        if (this.rooms[id]) {
            callback(this.rooms[id]);
        } else {
            callback(null);
        }
    }

    forEachAccount(callback) {
        for (var user_id in this.accounts) {
            if (this.accounts[user_id] !== null)
                callback(this.accounts[user_id]);
        }
    }

    forEachRooms(callback) {
        for (var id in this.rooms) {
            callback(this.rooms[id]);
        }
    }

    getAccountById(user_id) {
        if (this.accounts[user_id] === null)
            return null;
        return this.accounts[user_id];
    }

    getBotById(user_id) {
        if (this.bots[user_id] === null)
            return null;
        return this.bots[user_id];
    }

    getIdforRoom() {
        for (var i = 1; i < 4000; i++) {
            if (this.room_ids[i] === null || typeof (this.room_ids[i]) === 'undefined') {
                this.room_ids[i] = true;
                return i;
            }
        }
    }

    removeRoom(id) {
        if (this.rooms[id] !== null) {
            this.rooms[id] = null;
            this.removeIdforRoom(id);
            delete this.rooms[id];
        }
    }

    removeIdforRoom(id) {
        if (this.room_ids[id] !== null) {
            this.room_ids[id] = false;
            delete this.room_ids[id];
        }
    }

    getIdforBot() {
        for (var i = 60000; i < 60500; i++) {
            if (this.bot_ids[i] === null || this.bot_ids[i] === false || typeof (this.bot_ids[i]) === 'undefined') {
                this.bot_ids[i] = true;
                return i;
            }
        }
    }

    removeIdforBot(id) {
        if (this.bot_ids[id] !== null) {
            this.bot_ids[id] = false;
            delete this.bot_ids[id];
        }
    }

    removeBot() {
        if (this.bot_ids[id] !== null) {
            this.bot_ids[id] = null;
            this.removeIdforBot(id);
            delete this.bot_ids[id];
        }
    }


    checkAccountOnline(user_id, callback) {
        var self = this;
        var exi = false;
        self.forEachAccount(function (account) {
            if (account !== null) {
                if (user_id === account.user_id) {
                    exi = true;
                }
            }
        });
        callback(exi);
    }

    checkAccountOnlineAndClose(user_id, callback) {
        var self = this;
        self.forEachAccount(function (account) {
            if (account !== null) {
                if (user_id === account.user_id) {
                    self.closeAccount(account);
                }
            }
        });
        callback();
    }

    addAccount(account) {
        account.hasEnteredGame = true;
        this.accounts[account.user_id] = account;
        this.outgoingQueues[account.user_id] = [];
    }

    removeAccount(account) {
        delete this.accounts[account.user_id];
        delete this.outgoingQueues[account.user_id];
    }

    closeAccount(account) {
        var self = this;
        if (typeof (account) !== 'undefined') {
            account.connection.close();
            self.removeAccount(account);
        }
    }
};