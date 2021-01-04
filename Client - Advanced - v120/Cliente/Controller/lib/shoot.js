var _ = require("underscore");
var cls = require("./class");
var Types = require("../gametypes");
var Logger = require('./logger');
var Message = require("./message");
var Map = require("./map");
var Box = require('./box');
var Vector = require('./vect');

// Shoot
module.exports = class Shoot {
    constructor(x, y, ang, power, type, ax, ay, wind_ang, wind_power, stime, account) {
        var self = this;
        this.x0 = x;
        this.y0 = y;
        this.ax = ax;
        this.ay = ay;
        this.account = account;
        this.ang = ang;
        this.power = power;
        this.time = 0;
        this.stime = stime;
        this.exp = 0;
        this.img = 0;
        this.wind_ang = wind_ang;
        this.wind_power = wind_power;
        this.chat_complete = false;
        this.v = new Vector2(this.ang, this.power);

        //this.retrase_time = retrase_time;
        this.IsComplete = false;
        this.canCollide = false;
        this.damageComplete = false;
        this.groundCollide = false;

        this.box = new Box(new Vector(x, y), 8, 10, 0);
        this.explodebox = new Box(new Vector(x, y), 6, 8, 0);
        this.ss = 0;


        var mobile = this.account.player.mobile;
        var defmobile = Types.MOBILES[mobile];
        
        var attack_my_ava = this.account.player.ava_attack;
        if (this.account.player.check_my_ava === 0)
            attack_my_ava = 0;
        var total_attack = parseInt(Math.round(parseInt(attack_my_ava / 2.5)));
        if (total_attack > 50) {
            total_attack = 50;
        }
        this.damageshot = 150 + total_attack;
        if (type === 0) {
            this.ss = 0;
            this.damageshot = 150 + total_attack;
            if (mobile == Types.MOBILE.ARMOR)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.ICE)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.ADUKA)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.LIGHTNING)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.BIGFOOT)
                this.damageshot = 100 + total_attack;
            else if (mobile == Types.MOBILE.JD)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.ASATE)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.KNIGHT)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.FOX)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.DRAGON)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.NAK)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.TRICO)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.MAGE)
                this.damageshot = 324 + total_attack;
            else if (mobile == Types.MOBILE.TURTLE)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.BOOMER)
                this.damageshot = 270 + total_attack;
            else if (mobile == Types.MOBILE.ELECTRICO)
                this.damageshot = 170 + total_attack;
            else if (mobile == Types.MOBILE.GRUB)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.RAON)
                this.damageshot = 70 + total_attack;
            else if (mobile == Types.MOBILE.DRAG)
                this.damageshot = 170 + total_attack;
            else if (mobile == Types.MOBILE.KALSIDDON)
                this.damageshot = 120 + total_attack;
            else if (mobile == Types.MOBILE.MAYA)
                this.damageshot = 450 + total_attack;
            else if (mobile == Types.MOBILE.DRAGON2)
                this.damageshot = 220 + total_attack;
            else if (mobile == Types.MOBILE.RANDOMIZER)
                this.damageshot = 70 + total_attack;
             else if (mobile == Types.MOBILE.TIBURON)
                this.damageshot = 200 + total_attack;
            else if (mobile == Types.MOBILE.EASTER)
                this.damageshot = 189 + total_attack;
            else if (mobile == Types.MOBILE.COPYLOID)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.PHOENIX)
                this.damageshot = 120 + total_attack;
            else if (mobile == Types.MOBILE.HALLOWEEN)
                this.damageshot = 700 + total_attack;
            else if (mobile == Types.MOBILE.FROG)
                this.damageshot = 330 + total_attack;
            else if (mobile == Types.MOBILE.BEE)
                this.damageshot = 100 + total_attack;
        } else if (type == 1) {
            if (mobile == Types.MOBILE.ARMOR)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.ICE)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.ADUKA)
                this.damageshot = 137 + total_attack;
            else if (mobile == Types.MOBILE.LIGHTNING)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.BIGFOOT)
                this.damageshot = 140 + total_attack;
            else if (mobile == Types.MOBILE.JD)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.ASATE)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.KNIGHT)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.FOX)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.DRAGON)
                this.damageshot = 134 + total_attack;
            else if (mobile == Types.MOBILE.NAK)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.TRICO)
                this.damageshot = 134 + total_attack;
            else if (mobile == Types.MOBILE.MAGE)
                this.damageshot = 134 + total_attack;
            else if (mobile == Types.MOBILE.TURTLE)
                this.damageshot = 207 + total_attack;
            else if (mobile == Types.MOBILE.BOOMER)
                this.damageshot = 100 + total_attack;
            else if (mobile == Types.MOBILE.ELECTRICO)
                this.damageshot = 207 + total_attack;
            else if (mobile == Types.MOBILE.GRUB)
                this.damageshot = 134 + total_attack;
            else if (mobile == Types.MOBILE.RAON)
                this.damageshot = 100 + total_attack;
            else if (mobile == Types.MOBILE.DRAG)
                this.damageshot = 100 + total_attack;
            else if (mobile == Types.MOBILE.KALSIDDON)
                this.damageshot = 150 + total_attack;
            else if (mobile == Types.MOBILE.MAYA)
                this.damageshot = 180 + total_attack;
            else if (mobile == Types.MOBILE.DRAGON2)
                this.damageshot = 234 + total_attack;
            else if (mobile == Types.MOBILE.RANDOMIZER)
                this.damageshot = 85 + total_attack;
            else if (mobile == Types.MOBILE.TIBURON)
                this.damageshot = 134 + total_attack;
            else if (mobile == Types.MOBILE.EASTER)
                this.damageshot = 158 + total_attack;
            else if (mobile == Types.MOBILE.COPYLOID)
                this.damageshot = 375 + total_attack;
            else if (mobile == Types.MOBILE.PHOENIX)
                this.damageshot = 200 + total_attack;
            else if (mobile == Types.MOBILE.HALLOWEEN)
                this.damageshot = 480 + total_attack;
            else if (mobile == Types.MOBILE.FROG)
                this.damageshot = 450 + total_attack;
            else if (mobile == Types.MOBILE.BEE)
                this.damageshot = 140 + total_attack;
            this.ss = 0;
        } else if (type == 2) {
            this.ss = 4;
            this.damageshot = 250 + total_attack;
            if (mobile == Types.MOBILE.ARMOR)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.ICE)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.ADUKA)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.LIGHTNING)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.BIGFOOT)
                this.damageshot = 200 + total_attack;
            else if (mobile == Types.MOBILE.JD)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.ASATE)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.KNIGHT)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.FOX)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.DRAGON)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.NAK)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.TRICO)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.MAGE)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.TURTLE)
                this.damageshot = 170 + total_attack;
            else if (mobile == Types.MOBILE.BOOMER)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.ELECTRICO)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.GRUB)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.RAON)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.DRAG)
                this.damageshot = 500 + total_attack;
            else if (mobile == Types.MOBILE.KALSIDDON)
                this.damageshot = 200 + total_attack;
            else if (mobile == Types.MOBILE.MAYA)
                this.damageshot = 900 + total_attack;
            else if (mobile == Types.MOBILE.DRAGON2)
                this.damageshot = 400 + total_attack;
            else if (mobile == Types.MOBILE.RANDOMIZER)
                this.damageshot = 300 + total_attack;
            else if (mobile == Types.MOBILE.TIBURON)
                this.damageshot = 650 + total_attack;
            else if (mobile == Types.MOBILE.EASTER)
                this.damageshot = 200 + total_attack;
            else if (mobile == Types.MOBILE.COPYLOID)
                this.damageshot = 1100 + total_attack;
            else if (mobile == Types.MOBILE.PHOENIX)
                this.damageshot = 250 + total_attack;
            else if (mobile == Types.MOBILE.HALLOWEEN)
                this.damageshot = 1200 + total_attack;
            else if (mobile == Types.MOBILE.FROG)
                this.damageshot = 850 + total_attack;
            else if (mobile == Types.MOBILE.BEE)
                this.damageshot = 200 + total_attack;
        }

        this.img = defmobile.bullets[type];
        var fexp = defmobile.explodes[type];
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
        return RadToAngle(Math.atan2(a.y - b.y, a.x - b.x));
    }
};

function Vector2(a, b) {
    this.ang = a;
    this.size = b;
    this.x = Math.cos(a * Math.PI / 180) * b;
    this.y = -Math.sin(a * Math.PI / 180) * b;
}

function RadToAngle(a) {
    return 180 * a / Math.PI;
}

function AngleToRad(a) {
    return a * Math.PI / 180;
}