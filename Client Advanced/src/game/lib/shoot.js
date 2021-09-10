const Helper = require('../../Helper');
const Types = require("../gametypes");
const Box = require('./box');
const Vector = require('./vect');

// Shoot
module.exports = class Shoot {
    constructor(x, y, ang, power, type, ax, ay, wind_ang, wind_power, stime, account) {
        this.x0               = x;
        this.y0               = y;
        this.ax               = ax;
        this.ay               = ay;
        this.account          = account;
        this.ang              = ang;
        this.power            = power;
        this.time             = 0;
        this.stime            = stime;
        this.exp              = 0;
        this.img              = 0;
        this.wind_ang         = wind_ang;
        this.wind_power       = wind_power;
        this.chat_complete    = false;
        this.v               = Helper.Vector2(this.ang, this.power);
        this.IsComplete       = false;
        this.canCollide       = false;
        this.damageComplete   = false;
        this.groundCollide    = false;
        this.notExplode       = false;
        this.box              = new Box(new Vector(x, y), 8, 10, 0);
        this.explodebox       = new Box(new Vector(x, y), 6, 8, 0);
        this.ss               = 0;
        var mobile            = this.account.player.mobile;
        var defmobile         = Types.MOBILES[mobile];
        this.damageshot       = 150;
        this.img              = defmobile.bullets[type];
        var fexp              = defmobile.explodes[type];
        
        if (typeof (fexp) == 'undefined' || fexp === null) {
            this.exp = 0;
        } else this.exp = fexp;
    }

    move(x, y) {
        if (this.box === null)
            this.box = new Box(new Vector(x, y), 30, 25, 0);
        this.box.setp(new Vector(x, y));
    }

    setExplodebox(x, y) {
        if (this.explodebox === null)
            this.explodebox = new Box(new Vector(x, y), 40, 40, 0);
        this.explodebox.setp(new Vector(x, y));
    }

    update() {
        this.time++;
    }

    getPosAtTime() {
        var a = this.time / 485;
        return {
            x: Math.ceil(this.x0 + this.v.x * a + this.ax * a * a / 2),
            y: Math.ceil(this.y0 + this.v.y * a + this.ay * a * a / 2)
        };
    }

    GetAngleAtTime(a) {
        var b = this.getPosAtTime(a - 5);
        a = this.getPosAtTime(a + 5);
        return Helper.RadToAngle(Math.atan2(a.y - b.y, a.x - b.x));
    }
};
