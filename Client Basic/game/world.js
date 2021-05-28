const ThorSatelliteProjectile = require('./GameComponents/Projectile/ThorSatelliteProjectile');
var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Message = require('./lib/message');
var Shoot = require('./lib/shoot');
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
                time: null,
                hole: [],
                damages: [],
            });
        }
    }

    run() {
        var self = this;
        setImmediate(function() {
            self.update();
        });
    }
    AddHole(shot) {
        var self = this;
        const { isNotExplode } = shot.type;
        if (isNotExplode) {
            return;
        }
        var position = shot.getPosAtTime();
        let shoots_complete = self.shoots_complete;
        self.shoots_data[shoots_complete].hole.push(position.x);
        self.shoots_data[shoots_complete].hole.push(position.y);
        self.shoots_data[shoots_complete].hole.push(shot.hole[0]);
        self.shoots_data[shoots_complete].hole.push(shot.hole[1]);
        self.map.AddGroundHole(position.x, position.y, shot.hole[0], shot.hole[1]);
    }
    update() {
        var self = this;
        if (this.shoots_count > 0) {
            for (var id in this.shoots) {
                var shoot = this.shoots[id];
                if (shoot && !shoot.isComplete) {
                    shoot.update();
                    var a = shoot.getPosAtTime();
                    shoot.move(a.x, a.y, 0);

                    const isColliding = self.map.IsPixel(a.x, a.y) && !shoot.groundCollide;
                    const isOutMap = self.map.w < a.x || self.map.h < a.y;
                    if (isColliding) {
                        shoot.isComplete = true;
                        this.AddHole(shoot);
                        shoot.groundCollide = true;
                    } else if (isOutMap) {
                        shoot.isComplete = true;
                        shoot.isOutMap = true;
                    }
                    if (!shoot.damageComplete && shoot.type.isDamage) {
                        self.game.room.forPlayers(function(account) {
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
                        this.shoots_data[this.shoots_complete].s = shoot.GetS();
                        this.shoots_data[this.shoots_complete].time = shoot.GetTimeFinal();
                        shoot.GetProperties().map(a => this.shoots_data[this.shoots_complete][a[0]] = a[1]);
                        (shoot.isOutMap) && (shoot.GetPropertyDeleteIsOutMap().map(prop => delete this.shoots_data[this.shoots_complete][prop]));
                        this.shoots_complete++;
                        (shoot.groundCollide) && (this.onGroundCollide(shoot));

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
            setImmediate(function() {
                self.update();
            });
        }
    }
    onGroundCollide(shoot) {
        var self = this;
        if (!shoot.thor) {
            const L = ['shoots_count', '263wOnEkg', 'shoots', 'hole', '115916dVYOIz', 'thor', 'time', '701046OrwvbB', 'angle', '737834wDsYdJ', 'atan2', 'type', '124571vCTEWy', '3QsyaCZ', '570247DdpvJF', 'game', '9048cSwdBZ', 'img', '64540UYdeLl', '8xgNZoD', 'isHole', 'stime'];

            function K(p, I) { p = p - 0x1ed; let a = L[p]; return a; }
            const D = K;
            (function(p, I) {
                const q = K;
                while (!![]) {
                    try {
                        const a = -parseInt(q(0x1f1)) + parseInt(q(0x1f6)) + parseInt(q(0x1f4)) * -parseInt(q(0x1f5)) + parseInt(q(0x1fb)) * -parseInt(q(0x1fa)) + -parseInt(q(0x1ef)) + -parseInt(q(0x202)) + -parseInt(q(0x1ff)) * -parseInt(q(0x1f8));
                        if (a === I) break;
                        else p['push'](p['shift']());
                    } catch (O) { p['push'](p['shift']()); }
                }
            }(L, 0x7b4d2));
            var self = this;
            let n = self['shoots_count'];
            const CalculeAngle = (p, I) => {
                    const P = K;
                    let O = -Math[P(0x1f2)](p['y'] - I['y'], p['x'] - I['x']);
                    O = RadToAngle(O);
                    if (O < 0x0) O += 0x168;
                    return O;
                },
                RadToAngle = p => { return 0xb4 * p / Math['PI']; };
            if (true) {
                let thor = self[D(0x1f7)][D(0x1ed)],
                    angle = CalculeAngle(shoot['position'], { 'x': thor['x'], 'y': thor['y'] });
                self['game'][D(0x1ed)][D(0x1f0)] = angle, self[D(0x200)][n] = new Shoot(thor['x'], thor['y'], angle, 0x1f4, shoot[D(0x1f3)], 0x0, 0x0, 0x0, 0x0, shoot['account']), self[D(0x200)][n][D(0x1f9)] = undefined, self[D(0x200)][n].type.isExplode = true, self[D(0x200)][n].type.isTimeFinalZero = true, self[D(0x200)][n].type.isEndColliding = true, self[D(0x200)][n].type.isDamage = true, self[D(0x200)][n]['exp'] = 0x6, self[D(0x200)][n][D(0x1ed)] = 0x1, self[D(0x200)][n][D(0x1fc)] = !![], self[D(0x200)][n][D(0x1ee)] = 0x0, self[D(0x200)][n][D(0x1fd)] = shoot[D(0x1ee)] * 0x2 + shoot[D(0x1fd)], self[D(0x1fe)]++, self['shoot']();
            }
        }
    }
    onShootComplete(callback) {
        this.shoot_complete = callback;
    }
};