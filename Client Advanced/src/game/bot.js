var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Message = require('./lib/message');
var Player = require('./player');
var Room = require('./room');

// Bot
module.exports = class Bot {
    constructor(player) {
        this.login_complete = false;
        this.player = player;
        this.user_id = null;
        this.last_message = 0;
        this.strik = 0;
        this.room_number = 0;
        this.is_muted = false;
        this.location_type = Types.LOCATION.CHANNEL;
        this.hasEnteredGame = false;
        this.room = null;
        this.gameserver = null;
        this.saludo = false;
        var self = this;
        this.timershot = null;

        this.objetivo = null;
        this.pfinal = null;
        this.base_ang = 60;
        this.ss_count = 0;
        //this.player.mobile = Types.MOBILE.BOOMER;
    }

    init() {
        this.objetivo = null;
        this.pfinal = null;
        this.base_ang = 60;
        this.ss_count = 0;
        this.saludo = false;
        this.is_alive = 1;
        //this.player.mobile = Types.MOBILE.BOOMER;
    }

    chat() {
        var self = this;
        if (this.saludo === false) {
            this.saludo = true;
        }
    }

    dead() {
        var self = this;
        self.player.is_alive = 0;
        self.room.game.checkDead();
    }

    turn() {
        var self = this;
        var time = 0;
        var type = 0;
        self.player.body = 0;
        self.player.look = 0;
        self.player.ang = 60;
        self.objetivo = null;
        self.room.forPlayerA(function (account) {
            if (account.player.is_alive === 1) {
                self.objetivo = account;
            }
        });

        if (self.room === null) {
            Logger.debug("room exist");
            return null;
        }

        if (self.room.game === null) {
            Logger.debug("game exist");
            return null;
        }
        var map = self.room.game.map;
        if (self.player.x > map.w || self.player.y > map.h) {
            self.player.is_alive = 0;
        }
        var yf = map.GetUnder(self.player.x, self.player.y);
        if (yf === 0)
            self.player.is_alive = 0;
        else
            self.player.y = yf;

        if (self.player.is_alive === 0) {
            Logger.debug("player is_alive");
            self.room.game.gamePass(self);
        } else {
            if (typeof (self.objetivo) != 'undefined' && self.objetivo !== null) {
                self.player.body = self.room.game.map.GetAngle(self.player.x, self.player.y);
                var dist = Math.sqrt(Math.pow(self.objetivo.player.x - self.player.x, 2) + Math.pow(self.objetivo.player.y - self.player.y, 2));
                if (self.player.x > self.objetivo.player.x) {
                    self.player.look = 0;
                } else {
                    self.player.look = 1;
                }
                var pfx = self.Calcular(dist);
                if (typeof (pfx.power) === 'undefined')
                    pfx.power = 400;
                if (self.room.game) {
                    var shoot_timer = setTimeout(function () {
                        if (self.room.game) {
                            if (pfx.found) {
                                if (self.ss_count <= 0 && self.objetivo.player.hp < 600) {
                                    type = 2;
                                    self.ss_count = 5;
                                    self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Te matare maldito desperdicio de oxigeno -_-", Types.CHAT_TYPE.BOT), self.room);
                                } else {
                                    if (self.objetivo.player.hp < 800) {
                                        type = 1/*self.getRandomInt(0, 1)*/;
                                    } else {
                                        type = 0;
                                    }
                                }
                            }
                            self.room.game.gameShoot(self.player.x, self.player.y, self.player.body, self.player.look, self.player.ang, pfx.power, time, type, self);
                            self.ss_count--;
                        }
                        shoot_timer = null;
                    }, 4000);
                }
            } else {
                if (self.room) {
                    if (self.room.game) {
                        //self.room.game.checkDead();
                        Logger.debug("player bot fail");
                        if (self.objetivo === null) {
                            self.room.game.checkDead();
                        } else {
                            self.room.game.gamePass(self);
                        }
                    }
                }
            }
        }
    }

    update() {
        var self = this;
        var map = self.room.game.map;
        var yf = map.GetUnder(self.player.x, self.player.y);
        if (yf === 0)
            self.player.is_alive = 0;
        else
            self.player.y = yf;
        self.player.move();
        return yf;
    }

    Calcular(xv) {
        var self = this;
        var mobile_data = Types.MOBILES[self.player.mobile];
        var b0 = Math.round(parseInt(Math.cos(self.room.game.wind_angle * Math.PI / 180) * self.room.game.wind_power * mobile_data.by)) / 100;
        var b1 = Math.round(parseInt(Math.sin(self.room.game.wind_angle * Math.PI / 180) * self.room.game.wind_power * mobile_data.by - mobile_data.bx)) / 100;
        this.ax = Math.round(0 - b0);
        this.ay = Math.round(mobile_data.by - b1);
        if (self.wind_power === 0) {
            this.ax = 0;
            this.ay = mobile_data.by;
        }
        var ang = this.base_ang;
        var dis = 0;
        if (self.player.look === 0) {
            ang = 180 - ang;
            dis = -11;
        } else {
            dis = 11;
        }
        ang -= self.player.body;
        var point = {
            x: self.player.x + dis,
            y: self.player.y - 28
        };
        this.pfinal = self.rotatePoint(point, {
            x: self.player.x,
            y: self.player.y
        }, self.player.body);
        self.player.ang = this.base_ang;
        var found = false;
        var tmpx = {};
        var tmppower = 400;
        for (var i = 0; i < 900; i++) {
            this.power = i;
            this.v = new Vector2(ang, this.power);
            for (var t = 0; t < 2000; t++) {
                var f = self.getPosAtTime(t);
                var cl = Math.sqrt(Math.pow(self.objetivo.player.x - f.x, 2) + Math.pow(self.objetivo.player.y - f.y, 2));
                if (cl < 60) {
                    tmpx = f;
                    tmppower = i;
                    if (cl <= 15) {
                        found = true;
                        //Logger.debug("fon: " + cl + " t.x: " + tmpx.x + " o: " + self.objetivo.player.x);
                        break;
                    }
                }
            }
            if (found) break;
        }
        if (found === false) {
            if (this.base_ang <= 20) {
                this.base_ang += 10;
            } else if (this.base_ang >= 60) {
                this.base_ang -= 10;
            }
        }
        return {
            power: parseInt(tmppower / 234 * 100),
            found: found
        };
    }

    RadToAngle(a) {
        return 180 * a / Math.PI;
    }

    AngleToRad(p) {
        return p * Math.PI / 180;
    }

    getPosAtTime(a) {
        a /= 485;
        return {
            x: Math.ceil(this.pfinal.x + this.v.x * a + this.ax * a * a / 2),
            y: Math.ceil(this.pfinal.y + this.v.y * a + this.ay * a * a / 2)
        };
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

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    saveWinDB() {

    }
};

function Vector2(a, b) {
    this.ang = a;
    this.size = b;
    this.x = Math.cos(a * Math.PI / 180) * b;
    this.y = -Math.sin(a * Math.PI / 180) * b;
}