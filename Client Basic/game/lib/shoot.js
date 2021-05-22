var Types = require("../gametypes");
var Box = require('./box');
var Vector = require('./vect');
var Helper = require('../Utilities/Helper');
const ZotataPhysics = require("../GameComponents/Physics");

// Shoot
module.exports = class Shoot {
    constructor(x, y, ang, power, type, ax, ay, wind_ang, wind_power, account) {
        this.x0 = x;
        this.y0 = y;
        this.ax = ax;
        this.ay = ay;
        this.account = account;
        this.ang = ang;
        this.power = power;
        this.time = 0;
        this.stime = 0;
        this.exp = 0;
        this.img = 0;
        this.wind_ang = wind_ang;
        this.wind_power = wind_power;
        this.chat_complete = false;
        this.zp = new ZotataPhysics(this.x0, this.y0, this.ang, this.power, this.ax, this.ay);
        this.v = Helper.Vector(this.ang, this.power);
        this.IsComplete = false;
        this.canCollide = false;
        this.damageComplete = false;
        this.groundCollide = false;

        this.box = new Box(new Vector(x, y), 30, 25, 0);
        this.explodebox = new Box(new Vector(x, y), 40, 40, 0);
        this.ss = 0;


        var mobile = this.account.player.mobile;
        var defmobile = Types.MOBILES[mobile];
        this.damageshot = 150;
        this.img = defmobile.bullets[type];
        var fexp = defmobile.explodes[type];
        if (typeof (fexp) == 'undefined' || fexp === null) {
            this.exp = 0;
        } else this.exp = fexp;
        this.type = {
            isChangeHoleWithTime: false,
            isChangeImgWithTime: false,
            isEndColliding: false,
            isNotExplode: false,
            isNotDamage: false,
            isDamage: false,
            isUndeground: false,
            isThor: false,
            isLightning: false,
            isStartInPositionInitial: false,
            isStartInPositionExplode: false,
            isStartWithTimeElapsed: false,
            isEndWithTimeElapsed: false,
            isTimeFinalZero: false
        };
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
        return this.zp.GetPosAtTime(this.time);
    }
    GetAngleAtTime() {
        return this.zp.GetAngleAtTime(this.time);
    }
    GetTimeFinal(){
        return this.type.isTimeFinalZero ? 0 : this.time * 2;
    }
};
