var _ = require("underscore");
var cls = require("./class");
var Types = require("../gametypes");
var Logger = require('./logger');
var fs = require('fs'),
    PNG = require('pngjs').PNG;

module.exports = Map = cls.Class.extend({
    init: function (id) {
        var self = this;
        self.id = id;
        self.data = [];
        self.w = 0;
        self.h = 0;
        self.points = [];
    },

    GetPoint: function () {
        var r = this.RandomInt(2, this.points.length);
        if (this.points[r] !== null)
            return this.points[r];
        else return {
            x: 0,
            y: 0
        };
    },

    LoadPoints: function () {
        var max = 10;
        var self = this;
        var x = 15;
        var i = 0;
        for (x = 100; x < self.w - 200; x+= 100) {
            for (var y = 0; y < self.h - 100; y++) {
                if (self.IsPixel(x, y)) {
                    Logger.debug("Point: x: " + x + " y: " + y);
                    self.points[i] = {
                        x: x,
                        y: y - 1
                    };
                    i++;
                    x += 100;
                    break;
                }
                if (y >= self.h - 100) {
                    x += 100;
                    break;
                }
            }
        }
    },

    IsPixel: function (a, b) {
        return 0 > a || a >= this.w || 0 > b || b >= this.h ? !1 : 0 < this.data[4 * (b * this.w + a) + 3];
    },

    GetUnder: function (a, b, c) {
        if (void 0 == this.data) throw Error("GetUnder - data = undefined");
        for (c = c ? b + c : this.h; b < c; b++)
            if (this.IsPixel(a, b)) return b - 1;
    },

    GetAngle: function (a, b) {
        if (this.IsPixel(a, b)) return 0;
        var c = this.GetUnder(a, b, 5);
        if (void 0 == c) return 0;
        if (c != b) return 0;
        for (var d = c, e = 1, f = c, h = 1, k = 1; 9 >= k; k++) c = this.GetUnder(a - k, b - 5, 20), void 0 != c && (d += c, e++), c = this.GetUnder(a + k, b - 5, 20), void 0 != c && (f += c, h++);
        return Math.round(this.RadToAngle(Math.atan2((0 < h ? f / h : b) - (0 < e ? d / e : b), 19)));
    },

    GetPosForWalking: function (a, b, c) {
        var d = c === 0 ? a - 1 : a + 1;
        if (0 > d || d >= this.w) return {
            x: a,
            y: b,
            stuck: !0
        };
        if (this.IsPixel(d, b)) {
            for (c = b; c > b - 10; c--) {
                if (!this.IsPixel(d, c)) return {
                    x: d,
                    y: c
                };
            }
            return {
                x: a,
                y: b,
                stuck: !0
            };
        }
        for (c = b + 1; c < this.h; c++) {
            if (this.IsPixel(d, c)) return {
                x: d,
                y: c - 1
            };
        }
        return {
            x: d,
            y: this.y + 100,
            fall_and_fie: !0
        };
    },

    AddGroundHole: function (a, b, c, d) {
        var e, f, h, k, m = c * c,
            n = d * d,
            p, q, r;

        for (e = a - c - 10; e <= a; e++) {
            for (r = !1, c = b - d - 10; c < b; c++) {
                if (f = e - a, h = c - b, k = f * f / m + h * h / n, !r && 1.2 > k) {
                    if (r = !0, p = e, q = c, h = b - h, this.AddGroundShadowColumn(p, q, h), 0 !== f && (p = a - f, this.AddGroundShadowColumn(p, q, h)), 1.2 <= k && r) break;
                } else if (1 > k) {
                    p = e;
                    q = c;
                    h = b - h;
                    this.AddGroundHoleColumn(p, q, h);
                    0 !== f && (p = a - f, this.AddGroundHoleColumn(p, q, h));
                    break;
                }
            }
        }
    },

    AddGroundHoleColumn: function (a, b, c) {
        if (!(0 > a || a >= this.w || (0 > b && (b = 0), c >= this.h && (c = this.h - 1), c < b)))
            for (var d = this.w, e = b; e <= c; e++) b = 4 * (e * d + a), this.data[b + 3] = 0;
    },

    AddGroundShadowColumn: function (a, b, c) {
        if (!(0 > a || a >= this.w || (0 > b && (b = 0), c >= this.h && (c = this.h - 1), c < b)))
            for (var d = this.w, e = b; e <= c; e++) b = 4 * (e * d + a), this.data[b] /= 2, this.data[b + 1] /= 2, this.data[b + 2] /= 2;
    },

    loadMap: function (callback) {
        var self = this;
        fs.createReadStream(__dirname + '/maps/map' + self.id + '.png')
            .pipe(new PNG({
                filterType: 4
            }))
            .on('parsed', function () {
                self.w = this.width;
                self.h = this.height;
                self.data = this.data;
                //Logger.debug("LoadMap: " + self.id);
                callback();
            })
            .on('error', function () {
                Logger.error("Map Error: " + self.id);
            });
    },

    RadToAngle: function (a) {
        return 180 * a / Math.PI;
    },

    AngleToRad: function (a) {
        return a * Math.PI / 180;
    },

    RandomInt: function (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
});