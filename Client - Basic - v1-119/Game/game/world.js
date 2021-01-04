var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Message = require('./lib/message');
require('setimmediate');

// World
module.exports = class World {
    constructor(game, gameserver) {
        this.game = game;
        this.gameserver = gameserver;

        this.work = false;
        this.shoots = {};
        this.shoots_count = 0;
        this.shoots_complete = 0;
        this.shoots_data = [];
        this.map = game.map;
        this.chat = [];
        this.shoot_complete = null;

        this.chat_complete = false;

        this.gp_kill = 8;
        this.gold_kill = 500;

        this.gold_good = 50;
        this.gold_excellent = 100;

        this.gold_penalty = -250;
        this.gp_penalty = 0;

        if (gameserver.evento200 === true) {
            this.gp_kill = (8 * 2);
            this.gold_kill = (500 * 2);

            this.gold_good = (50 * 2);
            this.gold_excellent = (100 * 2);

            this.gold_penalty = -250;
            this.gp_penalty = 0;
        }

        if (this.game.room.game_mode === Types.GAME_MODE.BOSS) {
            this.gp_kill = 4;
            this.gold_kill = 250;

            this.gold_good = 50;
            this.gold_excellent = 100;

            this.gold_penalty = -250;
            this.gp_penalty = 0;
        }
    }

    start() {
        this.work = true;
        this.run();
    }

    shoot() {
        this.chat_complete = false;
        for (var id in this.shoots) {
            this.shoots_data.push({
                s: [],
                exp: null,
                img: null,
                time: null,
                hole: [],
                damages: [],
                ss: null
            });
        }
    }

    run() {
        var self = this;
        setImmediate(function () {
            self.update();
        });
    }

    update() {
        var self = this;
        if (this.shoots_count > 0) {
            for (var id in this.shoots) {
                var shoot = this.shoots[id];
                if (shoot && !shoot.isComplete) {
                    shoot.update();
                    var a = shoot.getPosAtTime();
                    var maxys = false;
                    var maxtim = false;
                    //var ang = shoot.GetAngleAtTime();
                    shoot.move(a.x, a.y, 0);
                    if (a.y <= 0)
                        maxys = true;
                    if (self.map.IsPixel(a.x, a.y) && !shoot.groundCollide) {
                        shoot.isComplete = true;
                        this.shoots_data[this.shoots_complete].hole.push(a.x);
                        this.shoots_data[this.shoots_complete].hole.push(a.y);
                        this.shoots_data[this.shoots_complete].hole.push(38);
                        this.shoots_data[this.shoots_complete].hole.push(38);
                        self.map.AddGroundHole(a.x, a.y, 38, 38);
                        shoot.groundCollide = true;
                    } else if (self.map.w < a.x || self.map.h < a.y) {
                        shoot.isComplete = true;
                        this.shoots_data[this.shoots_complete].hole.push(a.x);
                        this.shoots_data[this.shoots_complete].hole.push(a.y);
                        this.shoots_data[this.shoots_complete].hole.push(38);
                        this.shoots_data[this.shoots_complete].hole.push(38);
                        shoot.groundCollide = true;
                    }
                    if (!shoot.damageComplete) {
                        self.game.room.forPlayers(function (account) {
                            let player = account.player;
                            account.update();
                            if (player.is_alive === 1 || player.is_alive === true) {
                                if (!shoot.canCollide) {
                                    var p2 = (20 * 20);
                                    var xxdx = shoot.x0 - a.x;
                                    var xxdy = shoot.y0 - a.y;
                                    var p3 = ((xxdx * xxdx) + (xxdy * xxdy));
                                    if (p2 < p3) {
                                        shoot.canCollide = true;
                                        //Logger.log('canCollide ' + shoot.canCollide);
                                    }
                                } else if (shoot.isComplete) {
                                    shoot.canCollide = true;
                                }
                                var penalty = false;
                                var timxx = shoot.time * 2;
                                var fullcollide = false;
                                var areacollide = false;
                                var x11 = player.box.isColliding(shoot.box);
                                var distf = Math.sqrt(Math.pow(player.x - a.x, 2) + Math.pow(player.y - a.y, 2));
                                var dm = 0;
                                var shdm = 0;
                                if (shoot.canCollide && x11 === 0)
                                    fullcollide = true;

                                if (shoot.groundCollide || fullcollide) {
                                    if (shoot.account.player.team === player.team) {
                                        penalty = true;
                                    }
                                    if (fullcollide)
                                        dm = shoot.damageshot;

                                    if (distf <= 60) { //distancia
                                        dm = shoot.damageshot - distf;
                                        areacollide = true;
                                    }
                                    if (fullcollide || areacollide) {
                                        if (player.shield > 0) {
                                            shdm = player.shield - dm;
                                            if (shdm === 0) {
                                                player.setShield(0);
                                                self.shoots_data[self.shoots_complete].damages.push({
                                                    n: player.position,
                                                    hp: player.hp,
                                                    shield: player.shield
                                                });
                                                if (penalty) {
                                                    shoot.account.player.addWinGoldWinGp(self.gold_penalty, self.gp_penalty);
                                                } else {
                                                    self.chat.push(Types.GAMEMSG.good_shot);
                                                    shoot.account.player.addWinGoldWinGp(self.gold_good, 0);
                                                }

                                            } else if (shdm < 0) {
                                                player.setShield(0);
                                                player.disHpShield(Math.floor(Math.abs(shdm)), 0);
                                                if (player.hp <= 0) {
                                                    player.setAlive(0);
                                                    if (penalty) {
                                                        self.chat.push(Types.GAMEMSG.team_damage_penalty);
                                                        account.player.addWinGoldWinGp(self.gold_penalty, self.gp_penalty);
                                                    } else {
                                                        if (shoot.chat_complete === false) {
                                                            self.chat.push(Types.GAMEMSG.x_killed_y);
                                                            self.chat.push(player.position);
                                                            shoot.account.player.addWinGoldWinGp(self.gold_kill, self.gp_kill);
                                                            shoot.chat_complete = true;
                                                        }
                                                    }
                                                }
                                                self.shoots_data[self.shoots_complete].damages.push({
                                                    n: player.position,
                                                    hp: player.hp,
                                                    shield: player.shield
                                                });
                                                if (penalty) {
                                                    self.chat.push(Types.GAMEMSG.team_damage_penalty);
                                                    shoot.account.player.addWinGoldWinGp(self.gold_penalty, self.gp_penalty);
                                                } else {
                                                    self.chat.push(Types.GAMEMSG.excellent_shot);
                                                    shoot.account.player.addWinGoldWinGp(self.gold_excellent, 0);
                                                }
                                            } else {
                                                player.setShield(Math.floor(Math.abs(shdm)));
                                                self.shoots_data[self.shoots_complete].damages.push({
                                                    n: player.position,
                                                    hp: player.hp,
                                                    shield: player.shield
                                                });
                                                if (penalty) {
                                                    self.chat.push(Types.GAMEMSG.team_damage_penalty);
                                                    shoot.account.player.addWinGoldWinGp(self.gold_penalty, self.gp_penalty);
                                                }
                                            }
                                        } else {
                                            player.disHpShield(Math.floor(Math.abs(dm)), 0);
                                            if (player.hp <= 0) {
                                                player.setAlive(0);
                                                if (penalty) {
                                                    self.chat.push(Types.GAMEMSG.team_damage_penalty);
                                                    shoot.account.player.addWinGoldWinGp(self.gold_penalty, self.gp_penalty);
                                                } else {
                                                    if (shoot.chat_complete === false) {
                                                        self.chat.push(Types.GAMEMSG.x_killed_y);
                                                        self.chat.push(player.position);
                                                        shoot.account.player.addWinGoldWinGp(self.gold_kill, self.gp_kill);
                                                        shoot.chat_complete = true;
                                                    }
                                                }
                                            }
                                            self.shoots_data[self.shoots_complete].damages.push({
                                                n: player.position,
                                                hp: player.hp
                                            });
                                            if (penalty) {
                                                self.chat.push(Types.GAMEMSG.team_damage_penalty);
                                                shoot.account.player.addWinGoldWinGp(self.gold_penalty, self.gp_penalty);
                                            } else {
                                                self.chat.push(Types.GAMEMSG.good_shot);
                                                shoot.account.player.addWinGoldWinGp(self.gold_good, 0);
                                            }
                                        }
                                        shoot.isComplete = true;
                                        shoot.damageComplete = true;
                                        if (!shoot.groundCollide) {
                                            self.shoots_data[self.shoots_complete].hole.push(a.x);
                                            self.shoots_data[self.shoots_complete].hole.push(a.y);
                                            self.shoots_data[self.shoots_complete].hole.push(38);
                                            self.shoots_data[self.shoots_complete].hole.push(38);
                                            self.map.AddGroundHole(a.x, a.y, 38, 38);
                                            shoot.groundCollide = true;
                                            account.update();
                                        }
                                    }
                                }
                            }
                        });
                    }
                    if (shoot.isComplete) {
                        this.shoots_data[this.shoots_complete].s.push(shoot.x0);
                        this.shoots_data[this.shoots_complete].s.push(shoot.y0);
                        this.shoots_data[this.shoots_complete].s.push(shoot.ang);
                        this.shoots_data[this.shoots_complete].s.push(shoot.power);
                        this.shoots_data[this.shoots_complete].s.push(shoot.ax);
                        this.shoots_data[this.shoots_complete].s.push(shoot.ay);
                        this.shoots_data[this.shoots_complete].s.push(shoot.stime);
                        this.shoots_data[this.shoots_complete].exp = shoot.exp;
                        this.shoots_data[this.shoots_complete].img = shoot.img;
                        this.shoots_data[this.shoots_complete].s.push(shoot.img);
                        this.shoots_data[this.shoots_complete].time = shoot.time * 2;
                        var fx = shoot.ss > 0 ? shoot.ss : 0;
                        this.shoots_data[this.shoots_complete].ss = fx;
                        this.shoots_complete++;
                    }
                }
            }
            if (this.shoots_count <= this.shoots_complete) {
                this.shoots_count = 0;
                this.shoots_complete = 0;
                this.shoot_complete(this.shoots[0].account, this.shoots_data.slice(0), this.chat);
                this.chat = [];
                this.shoots_data = [];
            }
            setImmediate(function () {
                self.update();
            });
        }
    }
    onShootComplete(callback) {
        this.shoot_complete = callback;
    }
};