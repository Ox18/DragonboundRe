var Types = require('./gametypes');
var _ = require('underscore');
var Message = require('./lib/message');
var Game = require('./game');
var Logger = require('./lib/logger');
require('setimmediate');
const Map = require('./Entity/Map');

// room
module.exports = class Room {
    constructor(id, title, password, max_players, game_mode, gameserver) {
        this.id = id;
        this.max_players = max_players; 
        this.game_mode = game_mode;
        this.gameserver = gameserver;
        this.title = title;
        this.password = password;
        this.team_a = {};
        this.team_a_gp = 0;
        this.team_a_count = 0;
        this.team_b = {};
        this.team_b_gp = 0;
        this.team_b_count = 0;
        this.team_bots = {};
        this.team_bots_count = 0;
        this.look = this.password.length;
        this.map = -1;
        this.map_random = true;
        this.power = 0;
        this.max_wind = 0;
        this.gp_rate = 0;
        this.minimap = 0;
        this.room_type = 1;
        this.is_s1_disabled = 0;
        this.event_game = 0;
        this.is_tele_disabled = 0;
        this.is_random_teams = 0;
        this.is_avatars_on = 1;
        this.is_dual_plus_disabled = 0;
        this.player_count = 0;
        this.first_turn = 0;
        this.canremove = false;
        this.status = Types.ROOM_STATUS.WAITING;
        this.game = null;
        this.masterTimeCall = null;
        this.masterTimeTick = 20;
    }
    SetMap(id){
        var self = this;
        self.map = id;
        self.map_random = id === Map.type.RANDOM;
    }
    LoadMap(){
        var self = this;
        const map_random = self.map === Map.type.RANDOM;
        const game_boss = self.game_mode === Types.GAME_MODE.BOSS;
        const is_random = map_random || game_boss;
        (is_random) && (self.map = Map.GetRandomMap().ID);
    }
    ReloadMap(){
        var self = this;
        const map_is_random = self.map_random;
        (map_is_random) && (self.SetMap(Map.type.RANDOM));
    }
    addBot(bot) {
        var self = this;
        this.team_bots[bot.user_id] = bot.user_id;
        this.team_bots_count++;
        bot.room = self;
        bot.player.team = 1;
        self.gameserver.pushToRoom(self.id, new Message.roomPlayers(self), null);
    }

    chat(account, msj, team) {
        var self = this;
        var maxlng = 60;
        if (account.player.gm === 1)
            maxlng = 120;
        if (msj.length > maxlng)
            return null;
        var type = Types.CHAT_TYPE.NORMAL;
        /*if (account.player.guild_job === 1)
            type = Types.CHAT_TYPE.POWER_USER;*/
        if (account.player.gm === 1)
            type = Types.CHAT_TYPE.GM;
        self.gameserver.pushBroadcastChat(new Message.chatResponse(account, msj, type), self);
        if (this.game_mode === Types.GAME_MODE.BOSS) {
            self.forBots(function (bots) {
                if (bots !== null) {
                    bots.chat();
                }
            });
        }
    }

    joinPlayer(account) {
        var self = this;
        if (this.game_mode === Types.GAME_MODE.BOSS) {
            if (account.player.is_bot === 0) {
                self.team_a[account.user_id] = account.user_id;
                account.player.team = 0;
                self.team_a_count++;
            } else {}
        } else {
            if (self.team_a_count > self.team_b_count) {
                self.team_b[account.user_id] = account.user_id;
                account.player.team = 1;
                self.team_b_count++;
            } else if (self.team_a_count < self.team_b_count) {
                self.team_a[account.user_id] = account.user_id;
                account.player.team = 0;
                self.team_a_count++;
            } else if (self.team_a_count == self.team_b_count) {
                self.team_a[account.user_id] = account.user_id;
                account.player.team = 0;
                self.team_a_count++;
            }
        }
        self.player_count++;
        if ((self.team_a_count + self.team_a_count) != self.player_count) {
            self.player_count = self.team_a_count + self.team_a_count;
        }
        account.send([Types.SERVER_OPCODE.enter_room]);
        self.updatePosition(function () {
            account.room = self;
            account.sendMessage(new Message.roomState(self));
            self.gameserver.pushToRoom(self.id, new Message.roomPlayers(self), null);
        });
        if (self.player_count >= self.max_players)
            self.status = Types.ROOM_STATUS.FULL;
        self.canremove = true;
    }

    changeTeam(account) {
        var self = this;
        let player = account.player;
        var change = false;
        if (player.team === 0) {
            if (self.team_b_count >= 4) {} else {
                self.team_a_count--;
                delete self.team_a[player.user_id];
                self.team_b[player.user_id] = player.user_id;
                player.team = 1;
                self.team_b_count++;
                change = true;
            }
        } else {
            if (self.team_a_count >= 4) {} else {
                self.team_b_count--;
                delete self.team_b[player.user_id];
                self.team_a[player.user_id] = player.user_id;
                player.team = 0;
                self.team_a_count++;
                change = true;
            }
        }
        if (change === true) {
            this.updatePosition(function () {
                self.gameserver.pushToRoom(self.id, new Message.changedTeam(account));
            });
        }
    }
    assertMapControl(){
        var self = this;
        const mapControl = self.gameserver.mapControl.getMap(self.map);
        const data = mapControl != undefined;
        return data;
    }
    gameStart(account) {
        var self = this;
        self.LoadMap();
        
        if(self.assertMapControl()){
            if (self.status === Types.ROOM_STATUS.WAITING || self.status === Types.ROOM_STATUS.FULL) {
                if (true) {
                   
                   self.game = new Game(self.id, self, self.gameserver);
                    if (self.game) {
                        self.status = Types.ROOM_STATUS.PLAYING;
                        self.game.start(function () {
                            self.gameserver.pushToRoom(self.id, new Message.gameStart(self));
                        });
                        self.game.onGameEnd(function (team) {
                            self.ReloadMap();
                            Logger.debug("Game End: " + self.id + " win team: " + team);
                            var checkt = true;
                            self.forPlayers(function (account) {
                                let player = account.player;
                                if (typeof (account) !== 'undefined') {
                                    if (team == player.team) {
                                        if (self.gameserver.evento250) {
                                            player.addWinGoldWinGp(400, 16);
                                        } else {
                                            player.addWinGoldWinGp(200, 8);
                                        }
                                        player.is_win = 1;
                                        if (checkt)
                                            account.saveWinDB();
                                    } else {
                                        if (self.gameserver.evento250) {
                                            player.addWinGoldWinGp(200, 8);
                                        } else {
                                            player.addWinGoldWinGp(100, 4);
                                        }
                                        player.is_loss = 1;
                                        if (checkt)
                                            account.saveWinDB();
                                    }
                                }
                            });
                            self.game = null;
                            self.status = Types.ROOM_STATUS.WAITING;
                            self.gameserver.pushToRoom(self.id, new Message.roomPlayers(self));
                        });
                    }
                }
            } 
        }else{
            self.MapIsNotLoad();
        }
        
    }
    MapIsNotLoad(){
        var self = this;
        let text = "The map is not successful load.";
        self.gameserver.pushBroadcastChat(new Message.chatResponse(self, text, Types.CHAT_TYPE.SYSTEM), self);
    }
    checkReady() {

    }

    updatePosition(callback) {
        var self = this;
        var a = 0;
        self.forPlayerA(function (account) {
            var sum = true;
            if (typeof (account) === 'undefined') {
                sum = false;
            }
            if (a === 0) {
                account.player.position = 0;
            } else if (a === 1) {
                account.player.position = 2;
            } else if (a === 2) {
                account.player.position = 4;
            } else if (a === 3) {
                account.player.position = 6;
            }
            if (sum) a++;
        });
        var b = 0;
        self.forPlayerB(function (account) {
            var sum = true;
            if (typeof (account) === 'undefined') {
                sum = false;
            } else if (b === 0) {
                account.player.position = 1;
            } else if (b === 1) {
                account.player.position = 3;
            } else if (b === 2) {
                account.player.position = 5;
            } else if (b === 3) {
                account.player.position = 7;
            }
            if (sum) b++;
        });
        if (callback) callback();
    }

    forPlayerA(callback) {
        var self = this;
        self.team_a_count = 0;
        for (var id in this.team_a) {
            var user_id = this.team_a[id];
            var account = self.gameserver.getAccountById(user_id);
            if (typeof (account) === 'undefined' || account === null) {
                delete self.team_a[id];
            } else {
                self.team_a_count++;
                callback(account);
            }
        }
    }

    forPlayerB(callback) {
        var self = this;
        self.team_b_count = 0;
        for (var id in this.team_b) {
            var user_id = this.team_b[id];
            var account = self.gameserver.getAccountById(user_id);
            if (typeof (account) === 'undefined' || account === null) {
                delete self.team_b[id];
            } else {
                self.team_b_count++;
                callback(account);
            }

        }
    }

    forBots(callback) {
        var self = this;
        for (var id in this.team_bots) {
            var account = self.gameserver.getBotById(id);
            if (account === null) {
                delete self.team_bots[id];
                self.team_bots_count--;
            } else
                callback(account);
        }
    }

    forPlayers(callback) {
        var self = this;
        self.team_a_count = 0;
        for (let id in this.team_a) {
            let user_id = this.team_a[id];
            let account = self.gameserver.getAccountById(user_id);
            if (typeof (account) === 'undefined' || account === null) {
                delete self.team_a[id];
            } else {
                if (typeof (account.connection) !== 'undefined') {
                    self.team_a_count++;
                    callback(account);
                } else {
                    delete self.team_a[id];
                }
            }
        }
        self.team_b_count = 0;
        for (let id in this.team_b) {
            let user_id = this.team_b[id];
            let account = self.gameserver.getAccountById(user_id);
            if (typeof (account) === 'undefined' || account === null) {
                delete self.team_b[id];
            } else {
                if (typeof (account.connection) !== 'undefined') {
                    callback(account);
                    self.team_b_count++;
                } else {
                    delete self.team_a[id];
                }
            }
        }
        if (self.game_mode === Types.GAME_MODE.BOSS)
            for (let id in this.team_bots) {
                let user_id = this.team_bots[id];
                let account = self.gameserver.getBotById(user_id);
                callback(account);
            }
        self.player_count = self.team_a_count + self.team_b_count;
    }

    masterTime() {

    }

    removePlayer(account) {
        var self = this;
        try {
            self.player_count -= 1;
            if (self.team_a[account.user_id]) {
                delete self.team_a[account.user_id];
                self.team_a_count--;
            } else {
                delete self.team_b[account.user_id];
                self.team_b_count--;
            }
            account.room = null;
            if (self.status == Types.ROOM_STATUS.PLAYING) {
                if (self.game.turn_player == account.player.position && self.player_count > 0) {
                    self.game.gamePass(account);
                }
            }
            if (self.player_count > 0 && (self.status === Types.ROOM_STATUS.WAITING || self.status === Types.ROOM_STATUS.FULL)) {
                self.gameserver.pushToRoom(self.id, new Message.playerLeft(account));
                self.updatePosition(function () {});
                if (account.player.is_master == 1) {
                    self.forPlayers(function (p) {
                        if (account.user_id != p.user_id) {
                            p.player.is_master = 1;
                            self.gameserver.pushToRoom(self.id, new Message.passMaster(p));
                            return;
                        }
                    });
                }
                if (self.player_count < self.max_players)
                    self.status = Types.ROOM_STATUS.WAITING;
            }
            if (self.player_count <= 0) {
                if (self.canremove === true) {
                    self.gameserver.removeRoom(self.id);
                }
            }
        } catch (e) {
            self.player_count = self.team_a_count + self.team_b_count;
            if (self.player_count <= 0) {
                if (self.canremove === true) {
                    self.gameserver.removeRoom(self.id);
                }
            }
        }
    }
    RoomUpdate(room_options) {
        var self = this;
        self.room_options = room_options;
        self.gameserver.pushToRoom(self.id, new Message.roomState(self));
        self.gameserver.pushToRoom(self.id, new Message.roomPlayers(self), null);
    }
    RoomTitle(title) {
        var self = this;
        self.title = title;
    }

    RandomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
};