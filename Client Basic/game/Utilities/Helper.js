/* 
 * Copyright (C) 2021, Alex. <xander.scorpio@gmail.com>
 * This file is part of SocialBound.
 * SocialBound is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of the License, or(at your option) any later version.
 * 
 * SocialBound is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with SocialBound. If not, see http://www.gnu.org/licenses/.
 */

class Helper {
    constructor() {
        this.TIME_SECOND = 1e3;
        this.TIME_MINUTE = 60 * this.TIME_SECOND;
        this.TIME_HOUR   = 60 * this.TIME_MINUTE;
        this.TIME_DAY    = 24 * this.TIME_HOUR;
        this.TIME_WEEK   = 7 * this.TIME_DAY;
        this.TIME_MONTH  = 30 * this.TIME_DAY;
        this.TIME_YEAR   = 365 * this.TIME_DAY;
        this.get_time    = Date.now;
        this.Now         = Date.now;
        this.max         = Math.max;
        this.min         = Math.min;
        this.abs         = Math.abs;
        this.round       = Math.round;
        this.floor       = Math.floor;
        this.ceil        = Math.ceil;
        this.PI          = Math.PI;
    }
    round1(a) {
        return Math.round(10 * a) / 10;
    }
    round2(a) {
        return Math.round(100 * a) / 100;
    }
    assertAEqualsB(a, b){
        return a === b;
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
        return {
            ang: a,
            size: b,
            x: Math.cos(this.AngleToRad(a)) * b,
            y: -Math.sin(this.AngleToRad(a)) * b
        };
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
    ArrayDimensionalOf(a) {
        return Array.from(Array(a + 1).keys());
    }
    CalcOrbitPoint(a, b, c, d) {
        return {
            x: Math.ceil(a + c * Math.cos(this.AngleToRad(d))),
            y: Math.ceil(b - c * Math.sin(this.AngleToRad(d)))
        }
    }
    Pivot(a, b) {
        return [a, b];
    }
    aim_data(a, b) {
        return {
            ang: a,
            len: b
        }
    }
    aim(a, b, c) {
        return [a.ang, a.len, b.ang, b.len, c.ang, c.len];
    }
    Point(x, y) {
        return {
            x: x,
            y: y
        }
    }
    Angle(min, max) {
        return {
            min: min,
            max: max
        }
    }
    AngleMirror(angle) {
        return angle >= 0 && angle <= 180 ? 180 - angle : angle >= 180 && angle <= 270 ? 360 - (angle - 180) : angle >= 270 && angle <= 360 ? 180 + (angle - 360) : null;
    }

    RotatePoint(point, center, angle){
        angle = this.AngleToRad(angle);
        return {
            x: Math.floor(Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x),
            y: Math.floor(Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y)
        }
    }
};

const helper = new Helper();
module.exports = helper;