class Helper {
    constructor() {
        this.TIME_SECOND = 1e3;
        this.TIME_MINUTE = 60 * this.TIME_SECOND;
        this.TIME_HOUR = 60 * this.TIME_MINUTE;
        this.TIME_DAY = 24 * this.TIME_HOUR;
        this.TIME_WEEK = 7 * this.TIME_DAY;
        this.TIME_MONTH = 30 * this.TIME_DAY;
        this.TIME_YEAR = 365 * this.TIME_DAY;
        this.get_time = Date.now;
        this.Now = Date.now;
        this.max = Math.max;
        this.min = Math.min;
        this.abs = Math.abs;
        this.round = Math.round;
        this.floor = Math.floor;
        this.ceil = Math.ceil;
        this.PI = Math.PI;
    }
    round1(a) {
        return Math.round(10 * a) / 10;
    }
    round2(a) {
        return Math.round(100 * a) / 100;
    }
    between(a, b, c) {
        return this.max(this.min(b, c), a);
    }
    is_between(a, b, c) {
        return a >= b && a <= c;
    }
    random(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    RadToAngle(a) {
        return (180 * a) / Math.PI;
    }
    AngleToRad(a) {
        return (a * Math.PI) / 180;
    }
    StartsWith(a, b) {
        return 0 === ("" + a).indexOf(b);
    }
    EndsWith(a, b) {
        var c = "" + b,
            d = a.lastIndexOf(c);
        return 0 <= d && d === a.length - c.length;
    }
    Vector(a, b) {
        this.ang = a;
        this.size = b;
        this.x = Math.cos(this.AngleToRad(a)) * b;
        this.y = -Math.sin(this.AngleToRad(a)) * b;
    }
    Dist2Points(a, b, c, d) {
        return Math.hypot(c - a, d - b);
    }
    Commatize(a) {
        return Number(a).toLocaleString("en");
    }
    PercentOf(percent, number) {
        return (percent * number) / 100;
    }
    AngleBetween(a, b) {
        return Math.round(this.RadToAngle(Math.atan2(a.y - b.y, a.x - b.x)));
    }
    ReduceWithMargin(limit_min, space_min, limit_max, space_max) {
        return {
            min: limit_min + space_min,
            max: limit_max + space_max,
        };
    }
    ArrayDimensionalOf(a){
        return Array.from(Array(a + 1).keys());
    }
};

const helper = new Helper();
module.exports = helper;