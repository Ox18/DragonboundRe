var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Message = require('./lib/message');
var World = require('./world');
var Shoot = require('./lib/shoot');

// Game
module.exports = class Game {
    constructor(id, room, gameserver) {
        var self = this;
        this.id = id;
        this.room = room;
        this.gameserver = gameserver;
        this.wind_power = 0;
        this.wind_angle = 60;
        this.frist_turn = 0;
        this.time_played = 0;
        this.turn_player = 0;
        this.gameEnd_callback = null;
        this.thor = {
            x: 500,
            y: -200,
            angle: 260,
            damage: 100
        };
        this.map = self.gameserver.mapControl.getMap(room.map);
        this.world = new World(self, self.gameserver);
        this.world.onShootComplete(function (acc, shoot, chat) {
            try {
                self.getNextTurn(function (player) {
                    self.turn_player = player.position;
                    if (typeof (player.position) !== 'undefined') {
                        self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player, chat));
                        if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                            self.room.forBots(function (bot) {
                                if (bot.player.position === self.turn_player) {
                                    bot.turn();
                                }
                            });
                        }
                        self.checkDead();
                    } else {
                        self.getNextTurn(function (player2) {
                            self.turn_player = player2.position;
                            if (typeof (player2.position) !== 'undefined') {
                                self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player2, chat));
                                if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                                    self.room.forBots(function (bot) {
                                        if (bot.player.position === self.turn_player) {
                                            bot.turn();
                                        }
                                    });
                                }
                                self.checkDead();
                            }
                        });
                    }
                });
            } catch (e) {
                self.getNextTurn(function (player) {
                    self.turn_player = player.position;
                    self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player, chat));
                    if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                        self.room.forBots(function (bot) {
                            if (bot.player.position === self.turn_player) {
                                bot.turn();
                            }
                        });
                    }
                    self.checkDead();
                });
            }

        });
    }

    start(callback) {
        var self = this;
        self.room.status = Types.ROOM_STATUS.PLAYING;
        self.room.forPlayers(function (account) {
            if (account !== null) {
                let player = account.player;
                var point = self.map.GetPoint();
                //Logger.debug("point: " + point.x + " " + point.y);
                player.x = point.x;
                player.y = point.y;
                player.reloadHp();
            }
        });
        callback();
    }

    checkDead() {
        var self = this;
        var team_a_alive = 0;
        var team_b_alive = 0;
        var end = false;
        self.room.forPlayers(function (account) {
            let player = account.player;
            if (player.is_alive === 1) {
                if (player.team == 1) {
                    team_a_alive++;
                } else {
                    team_b_alive++;
                }
            }
        });
        if (team_a_alive === 0) {
            //enviar win team a
            self.gameserver.pushToRoom(self.room.id, new Message.gameOver(self.room, 0));
            Logger.log("win: team b");
            end = true;
            self.gameEnd_callback(0);
        } else if (team_b_alive === 0) {
            //enviar win team b
            self.gameserver.pushToRoom(self.room.id, new Message.gameOver(self.room, 1));
            Logger.log("win: team a");
            end = true;
            self.gameEnd_callback(1);
        }
        if (end) {
            self.world = null;
            self.map = null;
        }
    }

    gameShoot(x, y, body, look, ang, power, time, type, account) {
        var self = this;
        //Logger.debug("x: " + x + " y: " + y + " body: " + body + " look: " + look + " ang: " + ang + " power: " + power);
        power = parseInt(power * 234 / 100);
        var mobile_data = Types.MOBILES[account.player.mobile];
        /*
        var b0 = Math.round(parseInt(Math.cos(self.wind_ang * Math.PI / 180) * self.wind_power * mobile_data.by)) / 100;
        var b1 = Math.round(parseInt(Math.sin(self.wind_ang * Math.PI / 180) * self.wind_power * mobile_data.by - mobile_data.bx)) / 100;
        var ax = Math.round(mobile_data.bx - b0);
        var ay = Math.round(mobile_data.by - b1);
        if (self.wind_power == 0)
        fay = mobile_data.by;
        */
        var ax = mobile_data.bx;
        var ay = mobile_data.by;
        var dis = 0;
        if (look === 0) {
            ang = 180 - ang;
            dis = -11;
        } else {
            dis = 11;
        }
        ang -= body;
        var point = {
            x: x + dis,
            y: y - 28
        };
        var pfinal = self.rotatePoint(point, {
            x: x,
            y: y
        }, body);

        //Logger.debug("x: " + rx + " y: " + ry + " body: " + body + " look: " + _mlook + " ang: " + ang + " power: " + power);

        if (type === 0) {
            account.player.addDelay(100);
        } else if (type == 1) {
            account.player.addDelay(150);
        } else if (type == 2) {
            account.player.addDelay(250);
        }
        if (Types.MOBILE.ADUKA === account.player.mobile && type === 1) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang - 2, power - 8, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang + 3, power + 8, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[3] = new Shoot(pfinal.x, pfinal.y, ang - 4, power - 8, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 4;
        } else if (Types.MOBILE.BIGFOOT === account.player.mobile) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang - 2, power - 8, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang + 4, power + 8, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[3] = new Shoot(pfinal.x, pfinal.y, ang - 6, power - 8, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 4;
        } else if (Types.MOBILE.DRAGON === account.player.mobile && type === 1) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang - 4, power - 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang - 8, power - 15, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 3;
        } else if (Types.MOBILE.DRAGON === account.player.mobile && type === 0) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang - 4, power - 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang - 8, power - 15, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 3;
        } else if (Types.MOBILE.DRAGON === account.player.mobile && type === 2) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang - 4, power - 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang + 8, power - 15, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[3] = new Shoot(pfinal.x, pfinal.y, ang - 12, power - 20, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[4] = new Shoot(pfinal.x, pfinal.y, ang + 16, power - 25, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 5;
        } else if (Types.MOBILE.TRICO === account.player.mobile && type === 1) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang + 2, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang + 4, power + 15, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 3;
        } else if (Types.MOBILE.TURTLE === account.player.mobile && type === 1) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang + 2, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 2;
        } else if (Types.MOBILE.BOOMER === account.player.mobile && type === 1) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang, power + 10, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 3;
        } else if (Types.MOBILE.ELECTRICO === account.player.mobile && type === 1) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang + 2, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang + 4, power + 10, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 3;
        } else if (Types.MOBILE.GRUB === account.player.mobile && type === 1) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang + 2, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang + 4, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[3] = new Shoot(pfinal.x, pfinal.y, ang + 6, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 4;
        } else if (Types.MOBILE.RAON === account.player.mobile && type === 0) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang + 2, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang + 4, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[3] = new Shoot(pfinal.x, pfinal.y, ang + 6, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[4] = new Shoot(pfinal.x, pfinal.y, ang + 8, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[5] = new Shoot(pfinal.x, pfinal.y, ang + 10, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[6] = new Shoot(pfinal.x, pfinal.y, ang + 12, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[7] = new Shoot(pfinal.x, pfinal.y, ang + 14, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 8;
        } else if (Types.MOBILE.RAON === account.player.mobile && type === 1) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang + 2, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang + 4, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[3] = new Shoot(pfinal.x, pfinal.y, ang + 6, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[4] = new Shoot(pfinal.x, pfinal.y, ang + 8, power + 5, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 5;
        } else if (Types.MOBILE.KALSIDDON === account.player.mobile) {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[1] = new Shoot(pfinal.x, pfinal.y, ang + 4, power + 10, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[2] = new Shoot(pfinal.x, pfinal.y, ang - 2, power - 10, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoots[3] = new Shoot(pfinal.x, pfinal.y, ang + 6, power + 20, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 4;
        } else {
            this.world.shoots[0] = new Shoot(pfinal.x, pfinal.y, ang, power, type, ax, ay, this.wind_angle, this.wind_power, account);
            this.world.shoot();
            this.world.shoots_count = 1;
        }
        this.world.run();
    }

    getNextTurn(callback) {
        var self = this;
        var list_turn = [];
        var xf = 0;
        this.room.forPlayers(function (account) {
            if (typeof (account) !== 'undefined') {
                var player = account.player;
                if (account !== null && player.is_alive === 1) {
                    list_turn.push({
                        user_id: player.user_id,
                        team: player.team,
                        delay: player.delay,
                        lastturn: player.lastturn,
                        position: player.position
                    });
                    xf++;
                }
            }
        });

        if (xf <= 0)
            self.checkDead();

        list_turn.sort(function (a, b) {
            return a.delay == b.delay ? a.lastturn - b.lastturn : a.delay - b.delay;
        });
        callback(list_turn[0] !== null ? list_turn[0] : list_turn[1]);
    }

    gamePass(account) {
        var self = this;
        self.getNextTurn(function (player) {
            if (typeof (account) !== 'undefined') {
                if (account.player !== null)
                    account.player.addDelay(100);
            } else {
                account = null;
            }
            if (typeof (player) !== 'undefined') {
                self.turn_player = player.position;
                if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                    self.room.forBots(function (bot) {
                        if (bot.player.position === self.turn_player) {
                            bot.turn();
                        }
                    });
                }
                self.gameserver.pushToRoom(self.room.id, new Message.gamePass(account, player, self.room));
            } else {}
        });
    }

    onGameEnd(callback) {
        this.gameEnd_callback = callback;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    RadToAngle(a) {
        return 180 * a / Math.PI;
    }

    AngleToRad(p) {
        return p * Math.PI / 180;
    }

    vector(a, b) {
        var data = {};
        data.x = Math.cos(this.RadToAngle(a)) * b;
        data.y = -Math.sin(this.RadToAngle(a)) * b;
        return data;
    }

    rotatePoint(point, center, angle) {
        var px = {};
        angle = (angle) * (Math.PI / 180); // Convert to radians
        px.x = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x;
        px.y = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;
        px.x = Math.floor(px.x);
        px.y = Math.floor(px.y);
        return px;
    }
};