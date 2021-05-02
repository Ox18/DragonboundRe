var cls = require("./lib/class");
var Types = require("./gametypes");
var _ = require("underscore");
var Message = require("./lib/message");
var Logger = require('./lib/logger');
var db = require('./data');

module.exports = Avatars = cls.Class.extend({
    init: function () {

    },

    getAvatar: function (id) {
        //Logger.log("getAvatar: " + id);
        var itm = [];
        var res = [];
        for (var i = 0; i < db.length; i++) {
            var n = db[i];
            if (n[0] == id) {
                itm = n;
                break;
            }
        }
        if (itm !== null && itm.length > 0) {
            res.push(itm[2]);
            res.push(itm[4]);
            res.push(itm[7]);
        }
        return res;
    },

    getAvatar2: function (id, gender) {
        //Logger.log("getAvatar: " + id);
        var itm = null;
        var res = [];
        for (var i = 0; i < db.length; i++) {
            var n = db[i];
            var g = n[3];
            if (n[0] === id) {
                if (g == gender || g == 2)
                    itm = n;
                break;
            }
        }
        return itm;
    },

    getAvatarDataList: function (arr) {
        var res = [];
        var nl = 0;
        var tm = arr.length;
        for (var x in arr) {
            for (var i = 0; i < db.length; i++) {
                var n = db[i];
                if (parseInt(n[0]) === parseInt(arr[x][1])) {
                    var equip = arr[x][2];
                    var type = n[2];
                    var _stats = n[6];
                    var ndata = {
                        stat_pop: _stats.stat_pop,
                        stat_time: _stats.stat_time,
                        stat_atk: _stats.stat_atk,
                        stat_def: _stats.stat_def,
                        stat_life: _stats.stat_life,
                        stat_item: _stats.stat_item,
                        stat_dig: _stats.stat_dig,
                        stat_shld: _stats.stat_shld,
                        type: type,
                        equip: equip,
                        expire: 0,
                        is_cash: 1,
                        is_gift: 0,
                        amount: 0
                    };
                    var ncompr = this.Compress(ndata);
                    res.push([arr[x][0], n[0], n[5], ncompr]);
                    nl++;
                }
                // if (nl >= tm)
                // break;
            }
            
        }
        return res;
    },

    getShopListType: function (type, page) {
        var ls = this.getAvatarsListType(type);
        if (ls !== null && ls.length > 0) {
            var dt = [52];
            var x = this.getTypeFromNumber(type);
            var c = 0;
            if (page > 0)
                c = page * 9;
            dt.push(x);
            dt.push(page);//sobre carga las peticiones a la bd le falta un avacache
            dt.push(Math.ceil(ls.length / 9));
            var itm = [];
            var b = 0;
            for (var i = c; i < (c + 9); i++) {
                if (i < ls.length) {
                    itm[b] = JSON.parse(JSON.stringify(ls[i]));
                    var comp = itm[b][6];
                    var ncomp = this.Compress(comp);
                    itm[b][6] = ncomp;
                    b++;
                }
            }
            dt.push(itm); //max 9
            //dt.push(250827413);
            return dt;
        } else {
            return null;
        }
    },

    getAvatarsListType: function (type) {
        var itm = [];
        for (var i = 0; i < db.length; i++) {
            var n = db[i];
            if (n[2] == type && (typeof (n[8]) == 'undefined' || n[8] === null || n[8] !== 0))
                itm.push(n);
        }
        return itm;
    },

    getTypeFromNumber: function (type) {
        var x = "";
        if (type === 0)
            x = "h";
        else if (type === 1)
            x = "b";
        else if (type === 2)
            x = "g";
        else if (type === 3)
            x = "f";
        else if (type === 4)
            x = "1";
        else if (type === 5)
            x = "2";
        else
            x = "x";
        return x;
    },

    Compress: function (a) {
        if (typeof (a) !== 'object') {
            return a;
        }
        var fin = "";
        for (var d = 0; d < Object.keys(a).length; d++) {
            if (a[Object.keys(a)[d]] > 0) {
                fin += String.fromCharCode(d + 97);
                fin += a[Object.keys(a)[d]];
            }
        }
        return fin;
    },
});