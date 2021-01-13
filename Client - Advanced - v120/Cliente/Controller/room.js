var Types = require('./gametypes');
var _ = require('underscore');
var Message = require('./lib/message');
var Game = require('./game');
var Logger = require('./lib/logger');
require('setimmediate');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function screenshot_letters(length, current) {
  current = current ? current : '';
  return length ? screenshot_letters(--length, "0123456789abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 36)) + current) : current;
}

// room
module.exports = class Room {
    constructor(id, title, password, max_players, game_mode, gameserver) {
        var self = this;
        this.id = id;
        this.max_players = max_players; //2
        if (process.env.vps === '1' || process.env.vps === '2') {
            this.game_mode = Types.GAME_MODE.NORMAL;
        } else {
            this.game_mode = game_mode; //Types.GAME_MODE.BOSS
        }
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

        this.look = 0;
        this.map = -1;
        this.power = 0;
        this.max_wind = 0;
        this.gp_rate = 0;
        this.minimap = 0;
        this.room_type = 1;

        this.is_s1_disabled = 0;
        this.is_tele_disabled = 0;
        this.is_random_teams = 0;
        if (this.game_mode === Types.GAME_MODE.BOSS) {
            this.is_avatars_on = 1;
        } else {
            this.is_avatars_on = 0;
        }
        if (this.game_mode === Types.GAME_MODE.SAME) {
            if (typeof (account) !== 'undefined') {
            account.player.mobile = mobile_room;
        }
        } else {
            this.game_mode = game_mode; 
        }
        this.is_dual_plus_disabled = 0;
        this.player_count = 0;
        this.turn_time = 20;

        this.frist_turn = 0;

        this.canremove = false;

        this.status = Types.ROOM_STATUS.WAITING;
        this.game = null;
        this.masterTimeCall = null;
        this.masterTimeTick = 20;

        this.search_team_room = 0;
        this.team_tournament_game = 0;
        this.room_tournament_playing = 0;
        this.room_players_guild = '';

        if (this.password.length > 0) {
            this.look = 1;
        }
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
        var maxlng = 150;
        if (account.last_chat == msj) {//Codigo De Spam
            account.sendMessage(new Message.alertResponse("Hola "+account.player.game_id, "Tu Mensaje Esta Interpretado Como Spam, Y Esto No Esta Permitido Para Este Servidor."));
            return null;
        }
        if (account.player.is_muted === true || account.player.is_muted >= Date.now()) {
            account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.MUTED, []));
            return null;
        }
        /*if (account.player.gm === 1)
            maxlng = 120;*/
        if (msj.length > maxlng)
            return null;
       
        var type = Types.CHAT_TYPE.NORMAL;
        if (account.player.power_user === 1)
            type = Types.CHAT_TYPE.POWER_USER;
        

        if (account.player.gm === 1)
            type = Types.CHAT_TYPE.GM;

        if (account.player.rank === 28 && account.player.gm === 1 || account.player.rank === 29 && account.player.gm === 1 || account.player.rank === 30 && account.player.gm === 1)
            type = Types.CHAT_TYPE.SPECIAL;
        
        Logger.info('Chat Room: '+self.id+' - User: '+account.player.game_id+' - MSG: '+msj);
        if (team === 1) {
            self.forPlayers(function (accountbp) {
                if (typeof (accountbp) !== 'undefined') {
                    if (accountbp.player.team === account.player.team) {
                        if (account.player.gm === 1) {
                            type = Types.CHAT_TYPE.POWER_USER_TEAM;
                        } else if (account.player.power_user === 1) {
                            type = Types.CHAT_TYPE.POWER_USER_TEAM;
                        } else {
                            type = Types.CHAT_TYPE.NORMAL_TEAM;
                        }
                        accountbp.send([0, msj, account.player.game_id, type, account.player.guild]);
                    }
                }
            });
        } else {
            self.gameserver.pushBroadcastChat(new Message.chatResponse(account, msj, type), self);
        }
        account.last_chat = msj;//Codigo De Spam
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
        if (this.game_mode === Types.GAME_MODE.BOSS || this.search_team_room === 1) {
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
        if ((self.team_a_count + self.team_b_count) != self.player_count) {
            self.player_count = self.team_a_count + self.team_b_count;
        }
        account.send([Types.SERVER_OPCODE.enter_room]);
        self.updatePosition()
            .then(function () {
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
        if (this.game_mode === Types.GAME_MODE.BOSS) {
            return null;
        }
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
            this.updatePosition()
                .then(function () {
                    self.gameserver.pushToRoom(self.id, new Message.changedTeam(account));
                });
        }
    }

    gameStart(account) {
        var self = this;
        if (self.status === Types.ROOM_STATUS.WAITING || self.status === Types.ROOM_STATUS.FULL) {
            if (((self.player_count > 0) && self.game_mode === Types.GAME_MODE.BOSS) || ((self.player_count > 1) && self.game_mode === Types.GAME_MODE.NORMAL && self.team_a_count === self.team_b_count && self.checkReady()) || ((self.player_count > 1) && self.game_mode === Types.GAME_MODE.SAME && self.team_a_count === self.team_b_count) || ((self.player_count > 1) && self.game_mode === Types.GAME_MODE.SCORE && self.team_a_count === self.team_b_count) || ((self.player_count > 1) && self.game_mode === Types.GAME_MODE.TAG && self.team_a_count === self.team_b_count)) {
                if (self.map === -1 || typeof (self.map) === 'undefined') {
                    var mlng = Types.MAPS_PLAY.length;
                    var rnmap = self.RandomInt(0, mlng);
                    self.map = Types.MAPS_PLAY[rnmap];
                } else if (self.map === 12) {
                    self.map = 45;
                } else if (self.map === 41) {
                    self.map = 48;
                } else if (self.map === 49) {
                    self.map = 44;
                }

                //Logger.debug("map: " + self.map);
                self.game = new Game(self.id, self, self.gameserver, self.frist_turn);
                if (self.game) {
                    self.status = Types.ROOM_STATUS.PLAYING;
                    self.game.start(function (fturn) {
                        self.forPlayers(function (account) {
                            if (typeof (account) !== 'undefined') {
                                if (account.player.mobile === Types.MOBILE.RANDOM) {
                                    var random_number = parseInt(getRndInteger(0, 28));
                                    if (random_number === Types.MOBILE.RANDOM)
                                        random_number = Types.MOBILE.COPYLOID;
                                    account.player.mobile = parseInt(random_number);
                                }
                                if (self.game_mode === Types.GAME_MODE.TAG) {
                                    var random_number = parseInt(getRndInteger(0, 28));
                                    if (random_number === Types.MOBILE.RANDOM || random_number === Types.MOBILE.FOX || random_number === Types.MOBILE.DRAGON || random_number === Types.MOBILE.DRAG || random_number === Types.MOBILE.KALSIDDON || random_number === Types.MOBILE.MAYA || random_number === Types.MOBILE.DRAGON2 || random_number === Types.MOBILE.EASTER || random_number === Types.MOBILE.COPYLOID || random_number === Types.MOBILE.PHOENIX || random_number === Types.MOBILE.HALLOWEEN || random_number === Types.MOBILE.BEE)
                                        random_number = parseInt(getRndInteger(0, 6));
                                    account.send([Types.SERVER_OPCODE.game_mode_gb_tag, random_number]);
                                }
                                account.player.check_my_ava = self.is_avatars_on;
                                if (self.is_avatars_on === 0) {
                                    account.player.shield = 0;
                                    account.player.shield_regen = 0;
                                }
                            }
                        });
                        self.gameserver.pushToRoom(self.id, new Message.gameStart(self));
                        if (self.game_mode === Types.GAME_MODE.BOSS) {
                            self.forBots(function (bot) {
                                if (bot.player.position === fturn) {
                                    bot.turn();
                                }
                            });
                        }
                    });
                    self.game.onGameEnd(function (team) {
                        Logger.log("Game End: " + self.id + " win team: " + team);
                        var date_my_info_player = [];
                        self.forPlayers(function (account) {
                            if (typeof (account) !== 'undefined') {
                                var date_my_info_player_1 = [];
                                let player = account.player;
                                if (account.player.random_mobil === parseInt(1)) {
                                    account.player.mobile = Types.MOBILE.RANDOM;
                                }
                                if (team === player.team) {
                                    //player.addWinGoldWinGp(200, 10);
                                    player.is_win = 1;
                                    account.saveWinDB(self.power == 1 ? true : false);
                                    //Logger.info("Players Win: "+account.player.game_id+" - Win Gold: "+player.win_gold+" - Win GP: "+player.win_gp);
                                } else {
                                    player.is_loss = 1;
                                    account.saveWinDB(self.power == 1 ? true : false);
                                }//CLIENT_OPCODE.game_share
                                date_my_info_player_1.push(player.position);
                                date_my_info_player_1.push(player.user_id);
                                date_my_info_player_1.push(player.game_id);
                                date_my_info_player_1.push(player.rank);
                                date_my_info_player_1.push(player.win_gp);
                                date_my_info_player_1.push(player.win_gold);
                                date_my_info_player_1.push(player.scores_lose);
                                date_my_info_player.push(date_my_info_player_1);
                                
                            }
                        });
                        self.forPlayers(function (account_screen) {
                            if (typeof (account_screen) !== 'undefined') {
                                account_screen.player.screenshot = JSON.stringify([1, Date.now(), self.gameserver.id, self.id, self.game_mode, self.max_players, self.map, self.is_avatars_on, self.max_wind, team, self.game.turns_pass, date_my_info_player]);
                                account_screen.player.code_screenshot_random = screenshot_letters(8);
                            }
                        });
                        self.game = null;
                        self.status = Types.ROOM_STATUS.WAITING;
                        self.gameserver.pushToRoom(self.id, new Message.roomPlayers(self));
                    });
                }
            }
        }
    }

    checkReady() {
        var self = this;
        var canstart = true;
        self.forPlayers(function(account) {
            if (typeof (account) === 'undefined') {
            } else {
                if (account.player !== null & account.player.is_ready === 0 && account.player.is_master !== 1) {
                    canstart = false;
                }
             }
        });
        return canstart;
    }

    updatePosition() {
        var self = this;
        var a = 0;
        var b = 0;
        return new Promise(function (accept, reject) {
            self.forPlayers(function (account) {
                if (typeof (account) === 'undefined') {} else {
                    if (account.player.team === 0) {
                        if (a === 0) {
                            account.player.position = 0;
                        } else if (a === 1) {
                            account.player.position = 2;
                        } else if (a === 2) {
                            account.player.position = 4;
                        } else if (a === 3) {
                            account.player.position = 6;
                        }
                        a++;
                    } else {
                        if (b === 0) {
                            account.player.position = 1;
                        } else if (b === 1) {
                            account.player.position = 3;
                        } else if (b === 2) {
                            account.player.position = 5;
                        } else if (b === 3) {
                            account.player.position = 7;
                        }
                        b++;
                    }
                }
            });
            accept();
        });
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

    getOnePlayer() {
        var self = this;
        var pl_teama = null;
        var pl_teamb = null;
        return new Promise(function (accept, reject) {
            for (let id in self.team_a) {
                let user_id = self.team_a[id];
                pl_teama = self.gameserver.getAccountById(user_id);
                if (typeof (pl_teama) === 'undefined' || pl_teama === null) {} else {
                    break;
                }
            }
            for (let id in self.team_b) {
                let user_id = self.team_b[id];
                pl_teamb = self.gameserver.getAccountById(user_id);
                if (typeof (pl_teamb) === 'undefined' || pl_teamb === null) {} else {
                    break;
                }
            }
            if (pl_teama === null && pl_teamb === null) {
                reject();
            } else {
                if (pl_teama === null || pl_teamb !== null && (pl_teama.player.position > pl_teamb.player.position)) {
                    accept(pl_teamb);
                } else {
                    accept(pl_teama);
                }
            }
        });
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
                    self.team_b_count++;
                    callback(account);
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
        self.found_master = false;
        try {
            self.player_count--;
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
            if (self.player_count > 0 && (self.status === Types.ROOM_STATUS.WAITING || self.status === Types.ROOM_STATUS.FULL || self.status === Types.ROOM_STATUS.PLAYING)) {
                self.gameserver.pushToRoom(self.id, new Message.playerLeft(account));
                self.updatePosition()
                    .then(() => {});
                if (account.player.is_master == 1) {
                    self.getOnePlayer()
                        .then(function (p) {
                            if (account.user_id != p.user_id && self.found_master === false) {
                                p.player.is_master = 1;
                                self.found_master = true;
                                self.gameserver.pushToRoom(self.id, new Message.passMaster(p));
                                self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Master de la sala se transfirió a "+p.player.game_id, Types.CHAT_TYPE.SYSTEM), self);
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

    RoomTitle(title) {
        var self = this;
        self.title = title;
        self.gameserver.pushToRoom(self.id, new Message.roomState(self));
    }
    
    RoomUpdate(room_options) {
        var self = this;
        self.room_options = room_options;
        self.gameserver.pushToRoom(self.id, new Message.roomState(self));
        self.gameserver.pushToRoom(self.id, new Message.roomPlayers(self), null);
    }

    RandomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
};
