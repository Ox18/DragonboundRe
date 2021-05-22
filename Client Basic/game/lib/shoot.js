var Box = require('./box');
var Vector = require('./vect');
var Helper = require('../Utilities/Helper');
const ZotataPhysics = require("../GameComponents/Physics");

module.exports = class Shoot {
    constructor(x, y, ang, power, type, ax, ay, wind_ang, wind_power, account) {
        this.x0             = x;
        this.y0             = y;
        this.ax             = ax;
        this.ay             = ay;
        this.wind_ang       = wind_ang;
        this.wind_power     = wind_power;
        this.account        = account;
        this.ang            = ang;
        this.power          = power;
        this.type           = type;
        this.v              = Helper.Vector(this.ang, this.power);
        this.zp             = new ZotataPhysics(x, y, ang, power, ax, ay);
        this.time           = 0;
        this.stime          = 0;
        this.img            = 11;
        this.exp            = null;
        this.hole           = [30, 10];
        this.wave           = null;
        this.orbit          = null;
        this.jumping        = null;
        this.under          = null;
        this.bounce         = null;
        this.damage         = 0;
        this.ss             = null;
        this.is_lightning   = null;
        this.thor           = null;
        this.box            = new Box(new Vector(x, y), 30, 25, 0);
        this.explodebox     = new Box(new Vector(x, y), 40, 40, 0);
        this.chat_complete  = false;
        this.IsComplete     = false;
        this.canCollide     = false;
        this.damageComplete = false;
        this.groundCollide  = false;
        this.s              = [this.x0, this.y0, this.ang, this.power, this.ax, this.ay, this.stime];
        this.type           = {
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
    GetTimeFinal() {
        return this.type.isTimeFinalZero ? 0 : this.time * 2;
    }
    GetProperties() {
        let data = [];
        let properties = ['ss', 'is_lightning', 'thor', 'wave', 'orbit', 'jumping', 'exp', 'img'];
        properties.map(propertie => (this[propertie]) && data.push([propertie, this[propertie]]));
        return data;
    }
    GetS() {
        return this.s;
    }
};
