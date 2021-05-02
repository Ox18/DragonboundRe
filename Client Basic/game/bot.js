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
    }

    chat() {
        var self = this;
        if (this.saludo === false) {
            this.saludo = true;
            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Hola :)", Types.CHAT_TYPE.BOT), self.room);
        }
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
            self.player.body = self.room.game.map.GetAngle(self.player.x, self.player.y);
            var dist = Math.sqrt(Math.pow(self.objetivo.player.x - self.player.x, 2) + Math.pow(self.objetivo.player.y - self.player.y, 2));
            if (self.player.x > self.objetivo.player.x) {
                self.player.look = 0;
            } else {
                self.player.look = 1;
            }
            var power = self.Calcular(dist);
            if (typeof (power) === 'undefined')
                power = 400;
            var shoot_timer = setTimeout(function () {
                self.room.game.gameShoot(self.player.x, self.player.y, self.player.body, self.player.look, self.player.ang, power, time, type, self);
                shoot_timer = null;
            }, 4000);
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
    }

    Calcular(dis) {
        /*var self = this;
        var wind_angle = 60;
        var wind_power = 0;
        var _mlook = 0;
        if (self.objetivo.player.x > self.player.x) {
            self.player.look = 1;
            _mlook = 1;
        } else {
            self.player.look = 0;
            _mlook = -1;
        }

        var vec = self.vector(0, 90);

        var l = (-vec.x) * 1;
        var t = (vec.y);

        var tmp_ang = -this.RadToAngle(Math.atan2(t, l)) * _mlook;
        var me_start = self.vector(this.RadToAngle(this.AngleToRad(self.player.body)) + tmp_ang, -(l + t) / 1.5);
        if (self.player.look === 0) {
            me_start.x = -me_start.x;
            me_start.y = -me_start.y;
        }

        var _start_x = self.player.x + Math.round(me_start.x);
        var _start_y = self.player.y + Math.round(me_start.y);
        var sm_ang = this.RadToAngle(this.AngleToRad(self.player.body)) * _mlook;
        var nu_ang = self.player.ang + sm_ang;

        var _p9 = 0;
        var player_y = self.objetivo.player.y;
        var player_x = self.objetivo.player.x;
        var look = self.player.look;
        var v_3 = 60,
            v_4 = 2040,
            v_5 = 5000,
            v_6, v_7 = 9999,
            v_8, v_9, v_12, v_13, v_15, v_17, v_18, v_19, v_20, v_21;
        var mobile_data = Types.MOBILES[self.player.mobile];
        var win_p0 = parseInt(Math.cos(wind_angle * Math.PI / 180) * wind_power) * mobile_data.ay;
        var win_p1 = parseInt(Math.sin(wind_angle * Math.PI / 180) * wind_power) * mobile_data.ay - mobile_data.ax;

        var Z = _start_x;
        var aa = _start_y;
        v_17 = (600) - _start_y;
        v_20 = 0;
        v_12 = v_8 = Math.cos(nu_ang * Math.PI / 180);
        v_13 = v_9 = Math.sin(nu_ang * Math.PI / 180);
        var v_22 = 0;
        do {
            v_12 = v_8 * v_20;
            v_13 = v_9 * v_20;
            v_15 = _start_x;
            v_18 = v_17;
            (!look) ? v_12 = v_12 * -1: 0;
            //(this.msel == this.mobile.NAK && _p9 && nu_ang <= 70) ? (v_12 = v_12 * 2) : 0;
            if (v_18 <= 0) {
                v_20++;
                continue;
            } else {
                while (1) {
                    if (v_15 <= v_3) {
                        break;
                    }
                    if (v_15 >= v_4) {
                        break;
                    }
                    if (v_18 >= v_5) {
                        break;
                    }
                    v_19 = (600) - player_y;
                    
                    v_18 += v_13 * (1 / 20);
                    v_15 += v_12 * (1 / 20);
                    v_12 += win_p0 * (1 / 20);
                    v_13 += win_p1 * (1 / 20);
                    v_6 = Math.sqrt(Math.pow((v_19 - v_18), 2) + Math.pow((player_x - v_15), 2));
                    (v_7 > v_6) ? (v_7 = v_6, Z = parseInt(v_15), aa = parseInt(v_18), v_21 = v_20) : 0;
                    if (v_18 < 0) {
                        break;
                    }
                }
            }
            v_20++;
        } while (v_20 <= 400);
        return v_21;*/
        var npower = 0;
        if (dis < 600) {
            npower = 120;
        } else if (dis < 700) {
            npower = 160;
        } else if (dis < 800) {
            npower = 220;
        } else if (dis < 900) {
            npower = 260;
        } else {
            npower = 320;
        }
        return npower;
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

    saveWinDB() {

    }
};