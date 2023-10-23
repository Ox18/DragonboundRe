
var g_extra_info_timeout, g_extra_info_room, g_tournament_timer, g_tournament_timer_start, g_t0, g_t1, g_dragonVideo, g_dragonVideo_on, CryptoJS = CryptoJS || function(e, o) {
    var t = {},
        a = t.lib = {},
        n = function() {},
        r = a.Base = {
            extend: function(e) {
                n.prototype = this;
                var o = new n;
                return e && o.mixIn(e), o.hasOwnProperty("init") || (o.init = function() {
                    o.$super.init.apply(this, arguments)
                }), o.init.prototype = o, o.$super = this, o
            },
            create: function() {
                var e = this.extend();
                return e.init.apply(e, arguments), e
            },
            init: function() {},
            mixIn: function(e) {
                for (var o in e) e.hasOwnProperty(o) && (this[o] = e[o]);
                e.hasOwnProperty("toString") && (this.toString = e.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        },
        s = a.WordArray = r.extend({
            init: function(e, o) {
                e = this.words = e || [], this.sigBytes = void 0 != o ? o : 4 * e.length
            },
            toString: function(e) {
                return (e || u).stringify(this)
            },
            concat: function(e) {
                var o = this.words,
                    t = e.words,
                    a = this.sigBytes,
                    e = e.sigBytes;
                if (this.clamp(), a % 4)
                    for (var n = 0; n < e; n++) o[a + n >>> 2] |= (t[n >>> 2] >>> 24 - 8 * (n % 4) & 255) << 24 - 8 * ((a + n) % 4);
                else if (65535 < t.length)
                    for (n = 0; n < e; n += 4) o[a + n >>> 2] = t[n >>> 2];
                else o.push.apply(o, t);
                return this.sigBytes += e, this
            },
            clamp: function() {
                var o = this.words,
                    t = this.sigBytes;
                o[t >>> 2] &= 4294967295 << 32 - 8 * (t % 4), o.length = e.ceil(t / 4)
            },
            clone: function() {
                var e = r.clone.call(this);
                return e.words = this.words.slice(0), e
            },
            random: function(o) {
                for (var t = [], a = 0; a < o; a += 4) t.push(4294967296 * e.random() | 0);
                return new s.init(t, o)
            }
        }),
        d = t.enc = {},
        u = d.Hex = {
            stringify: function(e) {
                for (var o = e.words, e = e.sigBytes, t = [], a = 0; a < e; a++) {
                    var n = o[a >>> 2] >>> 24 - 8 * (a % 4) & 255;
                    t.push((n >>> 4).toString(16)), t.push((15 & n).toString(16))
                }
                return t.join("")
            },
            parse: function(e) {
                for (var o = e.length, t = [], a = 0; a < o; a += 2) t[a >>> 3] |= parseInt(e.substr(a, 2), 16) << 24 - 4 * (a % 8);
                return new s.init(t, o / 2)
            }
        },
        _ = d.Latin1 = {
            stringify: function(e) {
                for (var o = e.words, e = e.sigBytes, t = [], a = 0; a < e; a++) t.push(String.fromCharCode(o[a >>> 2] >>> 24 - 8 * (a % 4) & 255));
                return t.join("")
            },
            parse: function(e) {
                for (var o = e.length, t = [], a = 0; a < o; a++) t[a >>> 2] |= (255 & e.charCodeAt(a)) << 24 - 8 * (a % 4);
                return new s.init(t, o)
            }
        },
        c = d.Utf8 = {
            stringify: function(e) {
                try {
                    return decodeURIComponent(escape(_.stringify(e)))
                } catch (o) {
                    throw Error("Malformed UTF-8 data")
                }
            },
            parse: function(e) {
                return _.parse(unescape(encodeURIComponent(e)))
            }
        },
        h = a.BufferedBlockAlgorithm = r.extend({
            reset: function() {
                this._data = new s.init, this._nDataBytes = 0
            },
            _append: function(e) {
                "string" == typeof e && (e = c.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
            },
            _process: function(o) {
                var t = this._data,
                    a = t.words,
                    n = t.sigBytes,
                    r = this.blockSize,
                    d = n / (4 * r),
                    d = o ? e.ceil(d) : e.max((0 | d) - this._minBufferSize, 0),
                    o = d * r,
                    n = e.min(4 * o, n);
                if (o) {
                    for (var u = 0; u < o; u += r) this._doProcessBlock(a, u);
                    u = a.splice(0, o), t.sigBytes -= n
                }
                return new s.init(u, n)
            },
            clone: function() {
                var e = r.clone.call(this);
                return e._data = this._data.clone(), e
            },
            _minBufferSize: 0
        });
    a.Hasher = h.extend({
        cfg: r.extend(),
        init: function(e) {
            this.cfg = this.cfg.extend(e), this.reset()
        },
        reset: function() {
            h.reset.call(this), this._doReset()
        },
        update: function(e) {
            return this._append(e), this._process(), this
        },
        finalize: function(e) {
            return e && this._append(e), this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(e) {
            return function(o, t) {
                return new e.init(t).finalize(o)
            }
        },
        _createHmacHelper: function(e) {
            return function(o, t) {
                return new p.HMAC.init(e, t).finalize(o)
            }
        }
    });
    var p = t.algo = {};
    return t
}(Math);

function random(e, o) {
    return Math.floor(Math.random() * (o - e + 1) + e)
}

function get_time() {
    return Date.now()
}

function RadToAngle(e) {
    return 180 * e / Math.PI
}

function AngleToRad(e) {
    return e * Math.PI / 180
}

function Vector(e, o) {
    this.ang = e, this.size = o, this.x = Math.cos(AngleToRad(e)) * o, this.y = -Math.sin(AngleToRad(e)) * o
}

function Dist2Points(e, o, t, a) {
    return Math.sqrt((t - e) * (t - e) + (a - o) * (a - o))
}

function Loop(e, o, t) {
    var a = setInterval(function() {
        e()
    }, 1e3 / o);
    setTimeout(function() {
        clearInterval(a)
    }, 1e3 * t)
}

function setCookie(e, o) {
    var t = new Date;
    t.setTime(t.getTime() + 31536e6), document.cookie = e + "=" + o + ";expires=" + t.toUTCString()
}

function getCookie(e) {
    return (e = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)")) ? e[2] : null
}

function deleteCookie(e) {
    document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}

function Commatize(e) {
    return e.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}

function ArrayRemove(e) {
    -1 != (e = this.indexOf(e)) && this.splice(e, 1)
}

function ArrayUnique() {
    for (var e = [], o = this.length, t = 0; t < o; t++) {
        for (var a = t + 1; a < o; a++) this[t] === this[a] && (a = ++t);
        e.push(this[t])
    }
    return e
}

function DoesFileExist(e, o, t) {
    var a = new Image;
    t && (a.onload = function() {
        t(!0)
    }, a.onerror = function() {
        t(!1)
    }, a.onabort = function() {
        t(!1)
    }), o && (e += "?" + random(0, 99999999)), a.src = e
}

function EscapeHTML(e) {
    return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
}! function(e) {
    for (var o, t = CryptoJS, a = t.lib, n = a.WordArray, r = a.Hasher, a = t.algo, s = [], d = [], u = function(e) {
            return 4294967296 * (e - (0 | e)) | 0
        }, _ = 2, c = 0; 64 > c;) {
        a: {
            o = _;
            for (var h = e.sqrt(o), p = 2; p <= h; p++)
                if (!(o % p)) {
                    o = !1;
                    break a
                } o = !0
        }
        o && (8 > c && (s[c] = u(e.pow(_, .5))), d[c] = u(e.pow(_, 1 / 3)), c++),
        _++
    }
    var m = [],
        a = a.SHA256 = r.extend({
            _doReset: function() {
                this._hash = new n.init(s.slice(0))
            },
            _doProcessBlock: function(e, o) {
                for (var t = this._hash.words, a = t[0], n = t[1], r = t[2], s = t[3], u = t[4], _ = t[5], c = t[6], h = t[7], p = 0; 64 > p; p++) {
                    if (16 > p) m[p] = 0 | e[o + p];
                    else {
                        var f = m[p - 15],
                            y = m[p - 2];
                        m[p] = ((f << 25 | f >>> 7) ^ (f << 14 | f >>> 18) ^ f >>> 3) + m[p - 7] + ((y << 15 | y >>> 17) ^ (y << 13 | y >>> 19) ^ y >>> 10) + m[p - 16]
                    }
                    f = h + ((u << 26 | u >>> 6) ^ (u << 21 | u >>> 11) ^ (u << 7 | u >>> 25)) + (u & _ ^ ~u & c) + d[p] + m[p], y = ((a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22)) + (a & n ^ a & r ^ n & r), h = c, c = _, _ = u, u = s + f | 0, s = r, r = n, n = a, a = f + y | 0
                }
                t[0] = t[0] + a | 0, t[1] = t[1] + n | 0, t[2] = t[2] + r | 0, t[3] = t[3] + s | 0, t[4] = t[4] + u | 0, t[5] = t[5] + _ | 0, t[6] = t[6] + c | 0, t[7] = t[7] + h | 0
            },
            _doFinalize: function() {
                var o = this._data,
                    t = o.words,
                    a = 8 * this._nDataBytes,
                    n = 8 * o.sigBytes;
                return t[n >>> 5] |= 128 << 24 - n % 32, t[(n + 64 >>> 9 << 4) + 14] = e.floor(a / 4294967296), t[(n + 64 >>> 9 << 4) + 15] = a, o.sigBytes = 4 * t.length, this._process(), this._hash
            },
            clone: function() {
                var e = r.clone.call(this);
                return e._hash = this._hash.clone(), e
            }
        });
    t.SHA256 = r._createHelper(a), t.HmacSHA256 = r._createHmacHelper(a)
}(Math),
function(e) {
    e.fn.outerHTML = function(o) {
        return o ? this.before(o).remove() : e("<p>").append(this.eq(0).clone()).html()
    }
}(jQuery), text_filter = function(e, o) {
    for (var t = e.toLocaleLowerCase(), a = 0; a < o.length; a++) - 1 != t.indexOf(o[a]) && ((t = []).length = o[a].length + 1, t = (e = e.replace(RegExp(o[a], "ig"), t.join("*"))).toLocaleLowerCase());
    return e
}, GetBackgroundImageUrl = function(e) {
    return $(e).css("background-image").slice(4, -1).replace(/"/g, "")
}, window.console || (window.console = {
    log: function() {},
    warn: function() {},
    error: function() {},
    debug: function() {}
}), Object.freeze || (Object.freeze = function(e) {
    return e
}), "function" != typeof Object.create && (Object.create = function(e) {
    function o() {}
    return o.prototype = e, new o
});
var g_fillString_cache = {};

function fillString(e, o) {
    if (g_fillString_cache[e] && o <= g_fillString_cache[e].length) return g_fillString_cache[e].slice(0, o);
    var t, a = "";
    if (o > 99999) {
        var n = "",
            r = "";
        for (t = 0; t < 500; t++) n += e;
        for (t = 0; t < 200; t++) r += n;
        var s, d = 1e5,
            u = o % d;
        for (t = 0, s = o - u; t < s; t += d) a += r;
        for (t = 0; t < u; t++) a += e
    } else if (o > 500) {
        for (t = 0, n = ""; t < 500; t++) n += e;
        for (u = o % (d = 500), t = 0, s = o - u; t < s; t += d) a += n;
        for (t = 0; t < u; t++) a += e
    } else
        for (t = 0; t < o; t++) a += e;
    return g_fillString_cache[e] = a
}

function RandomString(e) {
    for (var o = "", t = 0; t < e; t++) o = t > 2 && " " != o[t - 1] && " " != o[t - 2] && 0 == random(0, 4) && t < e - 2 ? o + " " : o + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
    return o
}
t0 = function() {
    g_t_start_time = get_time()
}, t1 = function(e) {
    console.log(e ? e + ":" : "TIME:", get_time() - g_t_start_time)
}, shuffle = function(e) {
    for (var o, t, a = e.length; a; o = parseInt(Math.random() * a), t = e[--a], e[a] = e[o], e[o] = t);
    return e
};
var SERVER_TYPE = GetServerType(),
    debug = !1;
location.hostname == location.hostname && console && (debug = !0), "https:" == location.protocol && navigator && navigator.userAgent && (-1 != navigator.userAgent.indexOf("MSIE") || -1 != navigator.userAgent.indexOf("Firefox")) && (location.href = location.href.replace("https:", "http:"));
var g_t_start_time, POWER_USER_BACKGROUND, POWER_USER_EXITEM, g_auto_ready_timer, g_shop_player, g_channel_player, g_current_buy_avatar_index, g_current_shop_type, g_current_shop_page, g_bot_select_for_slot, l, STATIC_DIR = "/static/",
    STATIC_DIR2 = "/static/",
    LOCATION_TYPE_UNKNOWN = 0,
    LOCATION_TYPE_CHANNEL = 1,
    LOCATION_TYPE_ROOM = 2,
    ROOM_STATUS_WAITING = 0,
    ROOM_STATUS_FULL = 1,
    ROOM_STATUS_PLAYING = 2,
    GUI_LOCATION_CHANNEL = 1,
    GUI_LOCATION_ROOM = 2,
    GUI_LOCATION_GAME = 3,
    GUI_LOCATION_SHOP = 4,
    ITEM_NONE = -1,
    ITEM_DUAL = 0,
    ITEM_TELEPORT = 1,
    ITEM_CLASS = ["itemDual", "itemTeleport"],
    ITEM_SIZE = [2, 2],
    CHAT_TYPE_NORMAL = 0,
    CHAT_TYPE_DEAD = 2,
    CHAT_TYPE_GOLD = 3,
    CHAT_TYPE_GM = 5,
    CHAT_TYPE_SYSTEM = 6,
    CHAT_TYPE_NORMAL_TEAM = 7,
    CHAT_TYPE_GM_BUGLE = 9,
    MOBILE = Object.freeze({
        ARMOR: 0,
        ICE: 1,
        ADUKA: 2,
        LIGHTNING: 3,
        BIGFOOT: 4,
        JD: 5,
        ASATE: 6,
        RANDOM: 7,
        KNIGHT: 8
    }),
    FIRST_SELECTABLE_MOBILE = MOBILE.ARMOR,
    LAST_SELECTABLE_MOBILE = MOBILE.RANDOM,
    MOBILE_NAME = "Armor Ice Aduka Lightning RedFoot JD ASate Random Knight".split(" "),
    EXPLODE = Object.freeze({
        ARMOR1: 0,
        ARMOR2: 1,
        ARMORSS: 2,
        ICE1: 3,
        ICE2: 4,
        ICESS: 5,
        ADUKA1_THOR: 6,
        TELEPORT: 7,
        LIGHTINING12_JD1: 8,
        LIGHTNINGSS: 9,
        BIGFOOT1SS: 10,
        BIGFOOT2: 11,
        JD2: 12,
        JDSS: 13,
        ASATE1: 14,
        ASATE2: 15,
        ASATESS: 16,
        KNIGHT: 17
    }),
    BULLETS = Object.freeze({
        ARMOR1: 0,
        ARMOR2: 1,
        ARMORSS: 2,
        ARMOESS2: 3,
        ICE1: 4,
        ICE2: 5,
        ICESS: 6,
        ADUKA1_THOR: 7,
        ADUKA2: 8,
        ADUKASS: 9,
        TELEPORT: 10,
        LIGHTNING12: 11,
        LIGHTNINGSS: 12,
        BIGFOOT1: 13,
        BIGFOOT2: 14,
        BIGFOOTSS: 15,
        JD1: 16,
        JD2: 17,
        JDSS: 18,
        ASATE1: 19,
        ASATE2: 20,
        ASATESS: 21,
        ASATEION: 22,
        KNIGHT1: 23,
        KNIGHT2: 24,
        KNIGHTSS: 25,
        KNIGHTION: 26
    }),
    MOBILES = [],
    EXPLODES = [],
    BULLET = [],
    AVATAR_TYPE_HEAD = "h",
    AVATAR_TYPE_BODY = "b",
    AVATAR_TYPE_EYES = "g",
    AVATAR_TYPE_FLAG = "f",
    AVATAR_TYPE_BACKGROUND = "1",
    AVATAR_TYPE_FOREGROUND = "2",
    AVATAR_TYPE_EXITEM = "x",
    AVATAR_NAKED_HEAD_MALE = 1,
    AVATAR_NAKED_BODY_MALE = 2,
    AVATAR_NAKED_HEAD_FEMALE = 3,
    AVATAR_NAKED_BODY_FEMALE = 4,
    AVATAR_INDEX_N = 0,
    AVATAR_INDEX_TYPE = 1,
    AVATAR_INDEX_GENDER = 2,
    AVATAR_INDEX_NAME = 3,
    AVATAR_INDEX_DESC = 4,
    AVATAR_INDEX_SHOP = 5,
    AVATAR_INDEX_GOLD_WEEK = 6,
    AVATAR_INDEX_GOLD_MONTH = 7,
    AVATAR_INDEX_GOLD_PERM = 8,
    AVATAR_INDEX_CASH_WEEK = 9,
    AVATAR_INDEX_CASH_MONTH = 10,
    AVATAR_INDEX_CASH_PERM = 11,
    AVATAR_INDEX_STAT_POP = 12,
    AVATAR_INDEX_STAT_TIME = 13,
    AVATAR_INDEX_STAT_ATK = 14,
    AVATAR_INDEX_STAT_DEF = 15,
    AVATAR_INDEX_STAT_LIFE = 16,
    AVATAR_INDEX_STAT_ITEM = 17,
    AVATAR_INDEX_STAT_DIG = 18,
    AVATAR_INDEX_STAT_SHLD = 19,
    AVATAR_INDEX_GRAPHICS = 20,
    AVATAR_INDEX_GLOW = 21,
    AVATAR_INDEX_URL = 22,
    GAME_MODE_NORMAL = 0,
    GAME_MODE_BOSS = 1,
    GAME_MODE_SAME = 2,
    GENDER_MALE = "m",
    GENDER_FEMALE = "f",
    GENDER_ALL = "a",
    MS_IN_1_HOUR = 36e5,
    MS_IN_1_DAY = 24 * MS_IN_1_HOUR,
    g_graphics_high = !0,
    g_items = [ITEM_DUAL, ITEM_NONE, ITEM_DUAL, ITEM_NONE, ITEM_TELEPORT, ITEM_NONE],
    g_ranking_offset = 0,
    g_is_ranking_loading = !1,
    g_is_show_ranking = !0,
    g_is_game_background = 0 != getCookie("background"),
    g_is_game_slice = 0 != getCookie("slice"),
    g_is_ranking_loaded = !1;

function InitGlobals() {
    MOBILES[MOBILE.ARMOR] = {
        file: "tank",
        player_x: 17,
        player_y: -28,
        explodes: [EXPLODE.ARMOR1, EXPLODE.ARMOR2, EXPLODE.ARMORSS],
        bullets: [BULLETS.ARMOR1, BULLETS.ARMOR2, BULLETS.ARMORSS, BULLETS.ARMOESS2],
        graphics: [
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39],
            [49, 43, 24, 39]
        ]
    }, MOBILES[MOBILE.ICE] = {
        file: "gum",
        player_x: -5,
        player_y: -40,
        explodes: [EXPLODE.ICE1, EXPLODE.ICE2, EXPLODE.ICESS],
        bullets: [BULLETS.ICE1, BULLETS.ICE2, BULLETS.ICESS],
        graphics: [
            [53, 55, 30, 53],
            [53, 55, 30, 53],
            [53, 55, 30, 53],
            [54, 55, 30, 53],
            [54, 55, 30, 53],
            [55, 55, 30, 53],
            [55, 55, 30, 53],
            [55, 55, 30, 53],
            [55, 55, 30, 53],
            [55, 55, 30, 53],
            [54, 55, 30, 53],
            [54, 55, 30, 53],
            [53, 55, 30, 53],
            [53, 55, 30, 53],
            [53, 55, 30, 53],
            [53, 55, 30, 53],
            [53, 55, 30, 53],
            [53, 55, 30, 53],
            [53, 55, 30, 53],
            [53, 55, 30, 53]
        ]
    }, MOBILES[MOBILE.ADUKA] = {
        file: "aduka",
        player_x: -7,
        player_y: -24,
        explodes: [EXPLODE.ADUKA1_THOR],
        bullets: [BULLETS.ADUKA1_THOR, BULLETS.ADUKA2, BULLETS.ADUKASS],
        graphics: [
            [56, 39, 23, 34],
            [56, 38, 23, 33],
            [56, 36, 24, 31],
            [56, 34, 24, 29],
            [55, 35, 24, 30],
            [55, 35, 24, 30],
            [56, 37, 24, 32],
            [56, 39, 24, 34],
            [56, 40, 24, 35],
            [56, 40, 24, 35],
            [56, 40, 24, 35],
            [56, 39, 24, 34],
            [55, 37, 24, 32],
            [55, 35, 24, 30],
            [55, 35, 24, 30],
            [56, 34, 24, 29],
            [57, 36, 24, 31],
            [56, 37, 23, 32],
            [56, 38, 23, 33],
            [56, 38, 23, 33]
        ]
    }, MOBILES[MOBILE.LIGHTNING] = {
        file: "lightning",
        player_x: 10,
        player_y: -34,
        explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.LIGHTNINGSS],
        bullets: [BULLETS.LIGHTNING12, BULLETS.LIGHTNINGSS],
        graphics: [
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35],
            [42, 37, 19, 35]
        ]
    }, MOBILES[MOBILE.BIGFOOT] = {
        file: "redfoot",
        player_x: -2,
        player_y: -31,
        explodes: [EXPLODE.BIGFOOT1SS, EXPLODE.BIGFOOT2],
        bullets: [BULLETS.BIGFOOT1, BULLETS.BIGFOOT2, BULLETS.BIGFOOTSS],
        graphics: [
            [49, 45, 24, 41],
            [49, 45, 24, 41],
            [49, 45, 24, 41],
            [49, 45, 24, 41],
            [49, 45, 24, 41],
            [50, 45, 25, 41],
            [50, 45, 25, 41],
            [49, 45, 24, 41],
            [49, 45, 24, 41],
            [49, 45, 24, 41],
            [49, 45, 24, 41],
            [49, 46, 24, 42],
            [49, 46, 24, 42],
            [49, 46, 24, 42],
            [49, 46, 24, 42],
            [49, 46, 24, 42],
            [49, 46, 24, 42],
            [49, 46, 24, 42],
            [49, 46, 24, 42],
            [49, 46, 24, 42]
        ]
    }, MOBILES[MOBILE.JD] = {
        file: "jd",
        player_x: 11,
        player_y: -34,
        explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
        bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
        graphics: [
            [35, 45, 17, 43],
            [35, 45, 17, 43],
            [34, 45, 17, 43],
            [35, 45, 18, 43],
            [35, 45, 18, 43],
            [35, 45, 18, 43],
            [35, 45, 18, 43],
            [35, 45, 18, 43],
            [35, 45, 18, 43],
            [35, 45, 18, 43],
            [34, 45, 17, 43],
            [35, 45, 17, 43],
            [35, 45, 17, 43],
            [35, 44, 17, 42],
            [35, 44, 17, 42],
            [35, 44, 17, 42],
            [35, 44, 17, 42],
            [35, 45, 17, 43],
            [35, 45, 17, 43],
            [35, 45, 17, 43]
        ]
    }, MOBILES[MOBILE.ASATE] = {
        file: "ufo",
        player_x: 13,
        player_y: -30,
        explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
        bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
        graphics: [
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48],
            [64, 55, 32, 48]
        ],
        ion_file: "asateIon",
        ion_graphics: [
            [32, 19, 16, 9],
            [32, 18, 16, 9],
            [32, 17, 16, 8],
            [32, 15, 16, 7],
            [32, 14, 16, 7],
            [32, 12, 16, 6],
            [32, 14, 16, 7],
            [32, 17, 16, 9],
            [32, 17, 16, 9],
            [32, 17, 16, 9],
            [32, 14, 16, 7],
            [32, 12, 16, 6],
            [32, 13, 16, 7],
            [32, 15, 16, 8],
            [32, 17, 16, 9],
            [32, 18, 16, 9],
            [32, 19, 16, 10],
            [32, 20, 16, 10],
            [32, 20, 16, 10],
            [32, 20, 16, 10]
        ]
    }, MOBILES[MOBILE.RANDOM] = {
        file: "random",
        player_x: 4,
        player_y: -38,
        graphics: [
            [25, 45, 19, 50],
            [26, 45, 19, 50],
            [24, 45, 19, 50],
            [23, 45, 19, 50],
            [25, 45, 19, 50],
            [26, 45, 19, 50],
            [25, 45, 19, 50],
            [23, 45, 19, 50],
            [25, 45, 19, 50],
            [26, 45, 19, 50],
            [24, 45, 19, 50],
            [23, 45, 19, 50]
        ]
    }, MOBILES[MOBILE.KNIGHT] = {
        file: "knight",
        player_x: -6,
        player_y: -38,
        explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
        bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
        graphics: [
            [58, 51, 35, 49],
            [58, 51, 35, 49],
            [59, 51, 36, 49],
            [60, 50, 37, 48],
            [60, 50, 37, 48],
            [62, 50, 38, 48],
            [62, 50, 38, 48],
            [62, 50, 38, 48],
            [63, 50, 38, 48],
            [64, 50, 39, 48],
            [63, 50, 38, 48],
            [62, 50, 38, 48],
            [61, 51, 37, 49],
            [61, 51, 37, 49],
            [60, 51, 36, 49],
            [60, 51, 36, 49],
            [60, 51, 36, 49],
            [58, 51, 35, 49],
            [58, 51, 35, 49],
            [58, 51, 35, 49]
        ],
        ion_file: "knightIon",
        ion_graphics: [
            [32, 15, 16, 8],
            [32, 13, 16, 7],
            [32, 10, 16, 5],
            [32, 7, 16, 3],
            [32, 6, 16, 3],
            [32, 7, 16, 4],
            [32, 10, 16, 5],
            [32, 13, 16, 6],
            [32, 14, 16, 7],
            [32, 16, 16, 8],
            [32, 15, 16, 8],
            [32, 13, 16, 7],
            [32, 10, 16, 5],
            [32, 7, 16, 3],
            [32, 6, 16, 3],
            [32, 7, 16, 4],
            [32, 10, 16, 5],
            [32, 13, 16, 6],
            [32, 14, 16, 7],
            [32, 16, 16, 8]
        ]
    }, BULLET[BULLETS.ARMOR1] = {
        sound: AUDIO_ARMOR_FIRE
    }, BULLET[BULLETS.ARMOR2] = {
        sound: AUDIO_ARMOR_FIRE2
    }, BULLET[BULLETS.ARMORSS] = {
        sound: AUDIO_ARMOR_FIRE2
    }, BULLET[BULLETS.ARMOESS2] = {
        sound: AUDIO_ARMOR_FIRE2
    }, BULLET[BULLETS.ICE1] = {
        file: "gum1",
        sound: AUDIO_ICE_FIRE,
        graphics: [
            [24, 14, 6, 7],
            [24, 16, 6, 8],
            [24, 16, 6, 8],
            [24, 14, 6, 7],
            [24, 14, 6, 6],
            [24, 15, 6, 7],
            [24, 15, 6, 7],
            [24, 15, 6, 7],
            [24, 13, 6, 6],
            [24, 14, 6, 6],
            [24, 15, 6, 7],
            [24, 15, 6, 7],
            [24, 16, 6, 7],
            [24, 15, 6, 7],
            [24, 14, 6, 7],
            [24, 14, 6, 7],
            [24, 15, 6, 7],
            [24, 15, 6, 7],
            [24, 14, 6, 7],
            [24, 14, 6, 7]
        ]
    }, BULLET[BULLETS.ICE2] = {
        file: "gum2",
        sound: AUDIO_ICE_FIRE,
        graphics: [
            [24, 24, 13, 10],
            [24, 22, 13, 9],
            [24, 19, 13, 8],
            [24, 20, 13, 8],
            [24, 22, 13, 9],
            [24, 24, 13, 10],
            [23, 24, 13, 10],
            [22, 24, 12, 10],
            [22, 24, 12, 10],
            [23, 24, 13, 10],
            [23, 24, 13, 10],
            [24, 24, 13, 10]
        ]
    }, BULLET[BULLETS.ICESS] = {
        file: "gumSS",
        sound: AUDIO_ICE_FIRE,
        graphics: [
            [33, 29, 22, 14],
            [33, 28, 22, 14],
            [33, 25, 23, 13],
            [31, 19, 22, 10],
            [28, 16, 20, 8],
            [28, 21, 19, 10],
            [30, 26, 19, 12],
            [32, 29, 20, 14],
            [33, 29, 21, 14],
            [33, 26, 21, 12],
            [32, 23, 21, 11],
            [30, 17, 20, 8],
            [28, 18, 19, 9],
            [28, 23, 19, 11],
            [31, 27, 21, 13]
        ]
    }, BULLET[BULLETS.ADUKA1_THOR] = {
        file: "aduka1-thor",
        sound: AUDIO_ADUKA_FIRE,
        graphics: [
            [24, 24, 13, 12],
            [30, 27, 15, 14],
            [34, 31, 16, 19],
            [36, 31, 17, 18],
            [32, 30, 16, 19],
            [34, 31, 16, 19],
            [35, 30, 15, 15],
            [33, 30, 15, 14],
            [35, 30, 15, 12],
            [32, 32, 13, 13]
        ]
    }, BULLET[BULLETS.ADUKA2] = {
        file: "aduka2",
        sound: AUDIO_ADUKA_FIRE2,
        graphics: [
            [33, 26, 16, 15],
            [33, 24, 16, 13],
            [34, 25, 17, 14],
            [34, 26, 17, 15],
            [33, 25, 16, 14],
            [33, 24, 16, 13],
            [33, 26, 16, 15],
            [34, 27, 17, 16]
        ]
    }, BULLET[BULLETS.ADUKASS] = {
        file: "adukaSS",
        sound: AUDIO_ADUKA_FIRE2,
        graphics: [
            [44, 34, 25, 32],
            [43, 31, 24, 30],
            [44, 32, 25, 31],
            [45, 34, 26, 33],
            [44, 33, 25, 32],
            [43, 32, 24, 30],
            [44, 34, 25, 32],
            [44, 37, 25, 35]
        ]
    }, BULLET[BULLETS.TELEPORT] = {
        file: "teleport",
        sound: AUDIO_ARMOR_FIRE,
        graphics: [
            [31, 24, 18, 12],
            [34, 22, 21, 12],
            [34, 22, 21, 12],
            [35, 24, 22, 13],
            [38, 24, 25, 13],
            [37, 23, 24, 12],
            [38, 23, 25, 12],
            [34, 24, 21, 13],
            [38, 24, 25, 12],
            [33, 26, 20, 13],
            [36, 25, 23, 13],
            [31, 24, 18, 12]
        ]
    }, BULLET[BULLETS.LIGHTNING12] = {
        file: "lightning12",
        sound: AUDIO_LIGHTNING_FIRE,
        graphics: [
            [35, 32, 15, 15],
            [33, 31, 16, 15],
            [36, 39, 16, 19],
            [39, 42, 19, 21],
            [37, 39, 18, 18],
            [37, 36, 18, 17],
            [34, 33, 14, 15],
            [27, 27, 12, 12],
            [38, 44, 17, 19],
            [32, 32, 14, 13]
        ]
    }, BULLET[BULLETS.LIGHTNINGSS] = {
        file: "lightningSS",
        sound: AUDIO_LIGHTNING_FIRE,
        graphics: [
            [55, 36, 42, 17],
            [58, 36, 44, 17],
            [58, 37, 44, 18],
            [59, 37, 44, 18],
            [60, 37, 44, 18],
            [60, 37, 44, 18],
            [58, 37, 42, 18],
            [59, 37, 44, 18],
            [58, 37, 44, 18],
            [57, 36, 44, 17],
            [57, 36, 44, 17],
            [57, 37, 44, 17]
        ]
    }, BULLET[BULLETS.BIGFOOT1] = {
        file: "bigfoot1",
        sound: AUDIO_BIGFOOT_FIRE1,
        graphics: [
            [18, 12, 9, 6],
            [18, 12, 9, 6],
            [18, 12, 9, 6],
            [18, 12, 9, 6],
            [18, 12, 9, 6]
        ]
    }, BULLET[BULLETS.BIGFOOT2] = {
        file: "bigfoot2",
        sound: AUDIO_BIGFOOT_FIRE2,
        graphics: [
            [12, 10, 6, 5],
            [12, 9, 6, 4],
            [12, 9, 6, 4],
            [12, 9, 6, 4],
            [12, 10, 6, 5],
            [12, 10, 6, 5],
            [12, 9, 6, 4],
            [12, 10, 6, 5],
            [12, 10, 6, 5],
            [12, 10, 6, 5]
        ]
    }, BULLET[BULLETS.BIGFOOTSS] = {
        file: "bigfootSS",
        sound: AUDIO_BIGFOOT_FIRE1,
        graphics: [
            [20, 14, 15, 7],
            [20, 14, 15, 7],
            [20, 14, 15, 7],
            [20, 14, 15, 7],
            [20, 14, 15, 7]
        ]
    }, BULLET[BULLETS.JD1] = {
        file: "jd1",
        sound: AUDIO_JD_FIRE,
        graphics: [
            [20, 20, 10, 10],
            [20, 20, 10, 10],
            [20, 20, 10, 10],
            [20, 20, 10, 10],
            [20, 20, 10, 10],
            [20, 20, 10, 10],
            [20, 20, 10, 10],
            [20, 20, 10, 10]
        ]
    }, BULLET[BULLETS.JD2] = {
        file: "jd2",
        sound: AUDIO_JD_FIRE,
        graphics: [
            [29, 30, 15, 15],
            [31, 31, 16, 15],
            [29, 30, 15, 15],
            [29, 31, 15, 16],
            [30, 31, 15, 16],
            [29, 31, 14, 14],
            [30, 31, 15, 15],
            [30, 31, 16, 14]
        ]
    }, BULLET[BULLETS.JDSS] = {
        file: "jdSS",
        sound: AUDIO_JD_FIRE,
        graphics: [
            [34, 35, 17, 18],
            [36, 35, 18, 17],
            [34, 36, 18, 18],
            [35, 37, 18, 19],
            [36, 35, 18, 18],
            [35, 37, 17, 17],
            [35, 37, 18, 18],
            [35, 36, 19, 16]
        ]
    }, BULLET[BULLETS.ASATE1] = {
        file: "asate12",
        sound: AUDIO_ASATE_FIRE,
        ion_height: 1,
        graphics: [
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8]
        ]
    }, BULLET[BULLETS.ASATE2] = {
        file: "asate12",
        sound: AUDIO_ASATE_FIRE,
        ion_height: 2,
        graphics: [
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8],
            [16, 16, 8, 8]
        ]
    }, BULLET[BULLETS.ASATESS] = {
        file: "asateSS",
        sound: AUDIO_ASATE_FIRE,
        ion_height: 1,
        ion_ss: !0,
        graphics: [
            [27, 28, 12, 12],
            [29, 28, 13, 12],
            [24, 25, 11, 10],
            [28, 27, 13, 12],
            [24, 26, 11, 11],
            [24, 25, 11, 11],
            [28, 28, 13, 12],
            [25, 25, 12, 10],
            [27, 26, 12, 11]
        ]
    }, BULLET[BULLETS.ASATEION] = {
        file: "asateIon",
        sound: AUDIO_ASATE_FIRE,
        ion: !0,
        graphics: [
            [256, 16, 252, 8]
        ]
    }, BULLET[BULLETS.KNIGHT1] = {
        file: "knight12",
        sound: AUDIO_KNIGHT_FIRE,
        ion_height: 1,
        graphics: [
            [60, 62, 31, 31],
            [58, 60, 29, 30],
            [56, 58, 28, 29],
            [54, 55, 28, 27],
            [51, 55, 26, 28],
            [49, 52, 25, 26],
            [48, 52, 24, 26],
            [47, 51, 24, 25],
            [47, 51, 24, 25],
            [47, 50, 24, 24],
            [48, 52, 24, 26],
            [49, 52, 25, 26],
            [51, 54, 26, 27],
            [52, 56, 27, 28],
            [56, 58, 28, 29],
            [56, 60, 28, 30],
            [59, 61, 30, 30],
            [61, 63, 32, 32],
            [62, 64, 32, 32],
            [60, 63, 31, 32]
        ]
    }, BULLET[BULLETS.KNIGHT2] = {
        file: "knight12",
        sound: AUDIO_KNIGHT_FIRE,
        ion_height: 2,
        ion_high: !0,
        graphics: [
            [60, 62, 31, 31],
            [58, 60, 29, 30],
            [56, 58, 28, 29],
            [54, 55, 28, 27],
            [51, 55, 26, 28],
            [49, 52, 25, 26],
            [48, 52, 24, 26],
            [47, 51, 24, 25],
            [47, 51, 24, 25],
            [47, 50, 24, 24],
            [48, 52, 24, 26],
            [49, 52, 25, 26],
            [51, 54, 26, 27],
            [52, 56, 27, 28],
            [56, 58, 28, 29],
            [56, 60, 28, 30],
            [59, 61, 30, 30],
            [61, 63, 32, 32],
            [62, 64, 32, 32],
            [60, 63, 31, 32]
        ]
    }, BULLET[BULLETS.KNIGHTSS] = {
        file: "knightSS",
        sound: AUDIO_KNIGHT_FIRE,
        ion_height: 1,
        ion_ss: !0,
        graphics: [
            [20, 20, 10, 9],
            [22, 22, 11, 10],
            [21, 20, 10, 9],
            [19, 19, 9, 9],
            [21, 21, 10, 10],
            [20, 19, 10, 8],
            [22, 22, 11, 10],
            [18, 18, 9, 8],
            [20, 21, 10, 9],
            [23, 22, 11, 11],
            [19, 19, 9, 9],
            [22, 22, 11, 10],
            [22, 22, 11, 11],
            [18, 18, 9, 9],
            [20, 21, 10, 10],
            [21, 21, 11, 10],
            [21, 20, 10, 9],
            [22, 21, 11, 10],
            [19, 18, 10, 8],
            [16, 17, 8, 7]
        ]
    }, BULLET[BULLETS.KNIGHTION] = {
        file: "knightIon",
        sound: AUDIO_KNIGHT_FIRE,
        ion: !0,
        graphics: [
            [45, 24, 27, 13],
            [48, 26, 30, 14],
            [52, 26, 34, 14],
            [56, 28, 38, 15],
            [60, 29, 42, 16],
            [64, 31, 46, 17],
            [68, 33, 50, 19],
            [73, 35, 55, 20],
            [78, 38, 60, 22],
            [83, 40, 65, 23],
            [78, 30, 60, 12],
            [78, 31, 60, 12],
            [83, 33, 65, 13],
            [81, 34, 63, 13],
            [84, 37, 66, 14],
            [90, 35, 72, 15],
            [78, 36, 60, 15],
            [83, 39, 65, 16],
            [85, 42, 67, 17],
            [87, 34, 69, 18]
        ]
    }, EXPLODES[EXPLODE.ARMOR1] = {
        file: "armor1",
        sound: AUDIO_ARMOR_BLAST,
        graphics: [
            [31, 29, 17, 9],
            [68, 78, 37, 34],
            [98, 111, 52, 54],
            [111, 124, 57, 64],
            [128, 125, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64]
        ]
    }, EXPLODES[EXPLODE.ARMOR2] = {
        file: "armor2",
        sound: AUDIO_ARMOR_BLAST,
        graphics: [
            [20, 20, 10, 10],
            [46, 52, 23, 26],
            [66, 74, 33, 37],
            [74, 84, 34, 42],
            [89, 90, 43, 45],
            [90, 95, 43, 49],
            [93, 98, 45, 51],
            [99, 103, 48, 52],
            [101, 106, 50, 53],
            [103, 109, 51, 54],
            [105, 112, 52, 56],
            [107, 114, 53, 57],
            [110, 117, 54, 58],
            [113, 119, 56, 58],
            [113, 121, 56, 59],
            [115, 122, 57, 59],
            [117, 124, 58, 59],
            [117, 124, 58, 59],
            [117, 115, 58, 59],
            [106, 100, 47, 46]
        ]
    }, EXPLODES[EXPLODE.ARMORSS] = {
        file: "armorSS",
        sound: AUDIO_ARMOR_BLAST,
        graphics: [
            [128, 124, 64, 60],
            [128, 128, 64, 64],
            [128, 126, 64, 62],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 128, 64, 64],
            [128, 91, 64, 27]
        ]
    }, EXPLODES[EXPLODE.ICE1] = {
        file: "gum1",
        sound: AUDIO_ICE_BLAST,
        graphics: [
            [31, 35, 15, 22],
            [53, 51, 25, 30],
            [81, 77, 39, 41],
            [99, 108, 47, 52],
            [103, 110, 49, 53],
            [104, 97, 49, 49],
            [94, 93, 48, 48],
            [103, 109, 51, 51],
            [111, 107, 57, 50],
            [103, 106, 53, 51],
            [101, 107, 52, 53],
            [93, 104, 44, 56],
            [101, 108, 48, 58],
            [110, 100, 52, 60],
            [122, 107, 58, 62],
            [121, 110, 57, 61]
        ]
    }, EXPLODES[EXPLODE.ICE2] = {
        file: "gum2",
        sound: AUDIO_ICE_BLAST2,
        graphics: [
            [25, 28, 14, 16],
            [48, 53, 26, 28],
            [73, 78, 39, 38],
            [96, 103, 50, 47],
            [106, 106, 55, 48],
            [116, 107, 58, 49],
            [116, 111, 58, 53],
            [116, 116, 58, 58],
            [116, 116, 58, 58],
            [113, 116, 58, 58],
            [81, 80, 38, 53],
            [78, 82, 32, 44],
            [66, 70, 31, 33],
            [61, 67, 31, 33],
            [54, 58, 31, 35],
            [53, 61, 30, 37],
            [55, 53, 32, 30],
            [49, 49, 26, 26],
            [49, 49, 26, 26],
            [49, 49, 26, 26],
            [49, 49, 26, 26],
            [48, 47, 25, 23],
            [48, 44, 24, 18],
            [51, 46, 26, 17],
            [54, 47, 29, 16],
            [57, 46, 32, 14]
        ]
    }, EXPLODES[EXPLODE.ICESS] = {
        file: "gumSS",
        sound: AUDIO_ICE_BLAST2,
        graphics: [
            [80, 80, 35, 40],
            [222, 222, 101, 111],
            [223, 223, 101, 112],
            [247, 247, 119, 119],
            [247, 251, 119, 123],
            [247, 248, 119, 120],
            [247, 249, 119, 121],
            [223, 223, 102, 115],
            [224, 224, 103, 115],
            [223, 222, 102, 115],
            [221, 222, 101, 115],
            [223, 222, 102, 115],
            [222, 222, 102, 115],
            [222, 222, 102, 115],
            [222, 221, 102, 115],
            [222, 221, 102, 115],
            [222, 221, 102, 115],
            [221, 222, 102, 116],
            [221, 221, 102, 115],
            [222, 220, 103, 115],
            [222, 220, 103, 115],
            [222, 219, 104, 115],
            [222, 217, 105, 114],
            [203, 175, 104, 88],
            [206, 175, 106, 88],
            [216, 180, 111, 86],
            [224, 183, 115, 82],
            [236, 184, 120, 70],
            [244, 181, 123, 53],
            [246, 157, 123, 29]
        ]
    }, EXPLODES[EXPLODE.ADUKA1_THOR] = {
        file: "aduka1-thor",
        sound: AUDIO_ARMOR_BLAST,
        graphics: [
            [18, 18, 9, 9],
            [60, 60, 30, 30],
            [48, 47, 24, 23],
            [63, 67, 31, 31],
            [78, 80, 38, 39],
            [93, 96, 46, 47],
            [104, 96, 52, 47],
            [114, 96, 57, 47],
            [124, 96, 62, 47],
            [128, 96, 61, 47],
            [128, 92, 57, 48],
            [76, 84, 34, 40],
            [79, 76, 35, 40],
            [82, 78, 37, 44],
            [81, 79, 36, 45],
            [76, 79, 38, 46]
        ]
    }, EXPLODES[EXPLODE.TELEPORT] = {
        file: "teleport",
        sound: AUDIO_LIGHTNING_BLAST,
        graphics: [
            [43, 44, 22, 20],
            [100, 101, 51, 49],
            [113, 112, 57, 56],
            [103, 102, 52, 49],
            [114, 116, 57, 55],
            [123, 126, 61, 62],
            [126, 128, 62, 64],
            [125, 128, 64, 64],
            [125, 128, 64, 64],
            [122, 128, 64, 64],
            [126, 128, 64, 64],
            [123, 126, 59, 62],
            [119, 123, 59, 64],
            [123, 121, 62, 61],
            [121, 126, 61, 64],
            [118, 128, 58, 64],
            [121, 120, 59, 64],
            [123, 121, 61, 64],
            [122, 120, 62, 62]
        ]
    }, EXPLODES[EXPLODE.LIGHTINING12_JD1] = {
        file: "lightning12-jd1",
        sound: AUDIO_LIGHTNING_BLAST,
        graphics: [
            [27, 17, 13, 8],
            [55, 56, 29, 30],
            [92, 92, 51, 49],
            [114, 108, 59, 54],
            [125, 122, 62, 61],
            [119, 121, 57, 64],
            [116, 113, 58, 59],
            [102, 108, 51, 56],
            [94, 92, 48, 44],
            [65, 66, 32, 33],
            [50, 51, 25, 25],
            [74, 74, 37, 37],
            [94, 94, 47, 47],
            [112, 112, 56, 56]
        ]
    }, EXPLODES[EXPLODE.LIGHTNINGSS] = {
        file: "lightningSS",
        sound: AUDIO_LIGHTNING_BLAST,
        graphics: [
            [21, 23, 12, 14],
            [52, 49, 29, 26],
            [38, 46, 22, 27],
            [69, 78, 41, 40],
            [142, 130, 77, 66],
            [213, 216, 105, 106],
            [250, 240, 126, 124],
            [253, 246, 128, 124],
            [256, 252, 128, 124],
            [256, 240, 128, 124],
            [256, 240, 128, 124],
            [256, 240, 128, 124],
            [256, 241, 128, 124],
            [253, 241, 128, 123],
            [240, 241, 115, 124],
            [242, 243, 114, 124],
            [252, 252, 128, 124],
            [237, 237, 114, 122],
            [234, 234, 113, 120]
        ]
    }, EXPLODES[EXPLODE.BIGFOOT1SS] = {
        file: "bigfoot1SS",
        sound: AUDIO_BIGFOOT_BLAST1,
        graphics: [
            [56, 52, 28, 30],
            [79, 72, 38, 41],
            [92, 83, 41, 44],
            [99, 101, 46, 51],
            [101, 107, 48, 51],
            [109, 102, 56, 51],
            [109, 106, 57, 50],
            [109, 101, 57, 50],
            [108, 100, 57, 50],
            [105, 100, 57, 50],
            [102, 97, 57, 49],
            [98, 97, 56, 49],
            [92, 85, 53, 49],
            [84, 80, 49, 45],
            [81, 80, 47, 45],
            [83, 79, 47, 43],
            [79, 80, 44, 44],
            [81, 80, 45, 44],
            [80, 72, 45, 39]
        ]
    }, EXPLODES[EXPLODE.BIGFOOT2] = {
        file: "bigfoot2",
        sound: AUDIO_BIGFOOT_BLAST2,
        graphics: [
            [26, 24, 14, 11],
            [37, 34, 17, 15],
            [43, 40, 23, 20],
            [46, 47, 24, 23],
            [47, 48, 24, 24],
            [52, 48, 26, 25],
            [51, 48, 25, 25],
            [51, 47, 25, 25],
            [50, 46, 24, 24],
            [49, 46, 23, 24],
            [48, 46, 22, 24],
            [46, 44, 20, 23],
            [42, 40, 19, 19],
            [39, 38, 17, 19],
            [38, 37, 17, 19],
            [38, 37, 17, 19],
            [37, 37, 17, 19],
            [38, 37, 18, 19],
            [37, 34, 17, 18]
        ]
    }, EXPLODES[EXPLODE.JD2] = {
        file: "jd2",
        sound: AUDIO_JD_BLAST2,
        graphics: [
            [120, 102, 64, 64],
            [121, 124, 60, 64],
            [121, 128, 61, 64],
            [124, 128, 64, 64],
            [128, 126, 64, 64],
            [117, 119, 59, 60],
            [115, 113, 57, 55],
            [120, 112, 61, 54],
            [120, 110, 61, 53],
            [118, 110, 60, 54],
            [114, 114, 58, 54],
            [109, 110, 55, 52],
            [103, 107, 52, 53],
            [97, 99, 49, 49],
            [92, 88, 49, 44],
            [79, 77, 41, 39],
            [66, 63, 35, 32],
            [36, 35, 18, 18],
            [8, 8, 4, 4],
            [67, 67, 34, 44]
        ]
    }, EXPLODES[EXPLODE.JDSS] = {
        file: "jdSS",
        sound: AUDIO_JD_BLAST1,
        graphics: [
            [185, 182, 97, 98],
            [233, 232, 119, 123],
            [244, 237, 125, 124],
            [244, 238, 125, 124],
            [253, 241, 128, 124],
            [256, 240, 128, 124],
            [256, 241, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [254, 243, 128, 124],
            [254, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 243, 128, 124],
            [256, 242, 128, 124],
            [256, 243, 128, 124],
            [256, 245, 128, 124],
            [256, 247, 128, 124],
            [256, 248, 128, 124],
            [256, 242, 128, 124],
            [256, 242, 128, 124],
            [250, 239, 126, 124]
        ]
    }, EXPLODES[EXPLODE.ASATE1] = {
        file: "asate1",
        sound: AUDIO_ASATE_KNIGHT_BLAST,
        graphics: [
            [83, 68, 41, 36],
            [103, 96, 49, 45],
            [106, 113, 50, 53],
            [110, 117, 53, 56],
            [108, 113, 53, 58],
            [105, 103, 53, 53],
            [105, 105, 52, 53],
            [89, 89, 44, 44],
            [80, 81, 40, 40],
            [80, 80, 40, 40],
            [82, 82, 41, 41],
            [106, 106, 53, 53],
            [122, 122, 61, 61],
            [128, 128, 64, 64],
            [124, 123, 62, 61],
            [123, 119, 62, 57],
            [123, 117, 61, 56]
        ]
    }, EXPLODES[EXPLODE.ASATE2] = {
        file: "asate2",
        sound: AUDIO_ASATE_KNIGHT_BLAST,
        graphics: [
            [65, 53, 32, 28],
            [81, 75, 38, 35],
            [83, 88, 40, 41],
            [85, 92, 41, 44],
            [84, 88, 41, 45],
            [81, 80, 41, 41],
            [81, 82, 40, 41],
            [69, 69, 34, 35],
            [62, 63, 31, 31],
            [62, 63, 31, 30],
            [64, 64, 32, 31],
            [82, 82, 41, 41],
            [94, 94, 47, 47],
            [98, 98, 49, 49],
            [98, 97, 49, 48],
            [96, 92, 48, 46],
            [96, 90, 48, 45]
        ]
    }, EXPLODES[EXPLODE.ASATESS] = {
        file: "asateSS",
        sound: AUDIO_ASATE_KNIGHT_BLAST,
        graphics: [
            [63, 62, 32, 33],
            [78, 77, 40, 41],
            [83, 84, 43, 45],
            [87, 88, 45, 47],
            [81, 86, 43, 45],
            [78, 83, 40, 42],
            [75, 79, 39, 38],
            [77, 80, 41, 38],
            [80, 80, 42, 38],
            [83, 80, 44, 37],
            [86, 80, 45, 37],
            [89, 79, 47, 36],
            [92, 79, 48, 36],
            [94, 79, 49, 35],
            [98, 81, 51, 36],
            [103, 87, 54, 40],
            [106, 88, 55, 42],
            [108, 91, 56, 44],
            [111, 98, 58, 51],
            [114, 46, 59, 24]
        ]
    }, EXPLODES[EXPLODE.KNIGHT] = {
        file: "knight",
        sound: AUDIO_ASATE_KNIGHT_BLAST,
        graphics: [
            [66, 53, 41, 22],
            [69, 61, 43, 27],
            [73, 66, 43, 29],
            [80, 72, 46, 32],
            [83, 76, 45, 34],
            [96, 82, 54, 37],
            [99, 86, 55, 38],
            [103, 90, 57, 38],
            [107, 96, 57, 40],
            [110, 100, 56, 42],
            [112, 101, 58, 42],
            [112, 103, 58, 42],
            [113, 96, 59, 34],
            [112, 100, 58, 36],
            [113, 102, 59, 38],
            [114, 103, 60, 39],
            [113, 106, 59, 42],
            [117, 108, 62, 44],
            [121, 107, 64, 43],
            [121, 107, 64, 45],
            [121, 106, 64, 47],
            [121, 109, 64, 49],
            [121, 107, 64, 51],
            [121, 108, 64, 53],
            [111, 111, 58, 56],
            [108, 110, 56, 59],
            [100, 107, 53, 59],
            [91, 97, 48, 55],
            [75, 85, 40, 46]
        ]
    }
}
var COMPUTER_PLAYER = [{
        rank: 0,
        name: "Clown Stripe",
        gp: 1,
        atk: 5,
        def: 0,
        life: 10,
        dig: 0
    }, {
        rank: 1,
        name: "Haris Pilton",
        gp: 2,
        atk: 7,
        def: 4,
        life: 15,
        dig: 0
    }, {
        rank: 3,
        name: "Harly Potler",
        gp: 3,
        atk: 10,
        def: 8,
        life: 20,
        dig: 5
    }, {
        rank: 5,
        name: "Angie Jelly",
        gp: 4,
        atk: 12,
        def: 12,
        life: 25,
        dig: 9
    }, {
        rank: 7,
        name: "Floyd Pinkus",
        gp: 5,
        atk: 17,
        def: 18,
        life: 30,
        dig: 14
    }, {
        rank: 9,
        name: "Yuffie Kisaragi",
        gp: 6,
        atk: 25,
        def: 24,
        life: 35,
        dig: 18
    }, {
        rank: 13,
        name: "Bill Board",
        gp: 7,
        atk: 33,
        def: 32,
        life: 40,
        dig: 22
    }, {
        rank: 15,
        name: "Gilly Gamesh",
        gp: 8,
        atk: 40,
        def: 40,
        life: 45,
        dig: 25
    }, {
        rank: 17,
        name: "Lance Alot",
        gp: 9,
        atk: 50,
        def: "??",
        life: 50,
        dig: 10
    }, {
        rank: 18,
        name: "Voldy Moore",
        gp: 10,
        atk: 50,
        def: 50,
        life: "??",
        dig: 20
    }, {
        rank: 19,
        name: "Jack the Ripper",
        gp: 11,
        atk: 50,
        def: 50,
        life: 50,
        dig: "??"
    }, {
        rank: 20,
        name: "Seffy Roth",
        gp: 12,
        atk: "??",
        def: 50,
        life: 50,
        dig: 50
    }],
    filtered_words = "bitch; cock;dick;fuck;penis;pussy;shit;slut;whore;puta;caralho;suck;csm;ctm;hdp;ptm;mierda;pinga;puta;jmsz15;yourpaid;recorta;asshole;bit.ly;goo.gl;redtube;tinyurl.com;adf.ly;aimbot;i8lsqljirqi;aimb0t;culo;chupa;chupamela;concha;pincho;maricon;tu madre;gg.gg/;aimbσt;a1mbot;noticias-dragonbound.tk;gunbound-classic-thorgame;sonywc;gunboundwc.com;gunboundhero;gb-zero;gb-teamds;gunbounddelsur;dragonboundhacks;americano-gb;gmcalmlordoficial;superdragon.tk;crackdragonbound;fantasiadragonboundhack;gbclassic.net;dragonbot.es.tl;gunboundsocial;gb-city.sytes.net;empiregb.org;gb-viplatino;gb-prestige;gunboundperu;gunvn.com;gb-continental;gitzwc;gunbound-online;gunbound-worldonline;gunbund-online.net;gb-platinum;servegame.com;gogunbound.com;gbundine;░░█;░█░;░░░;███;▀▀█;┼┼┼;█▀▀;┼█┼;———;┃┃┃;linkeur.es;classicgunbound;djstefany.tk;classicgb;gunboundamericano;torneosdragonbound;tuars;hurr-durr;freecash;cashbound;radiodragonbound.tk;dragonbound.biz;dragonboundrecarga;youporn".split(";");
$(document).ajaxSend(function(e, o, t) {
    function a(e) {
        var o = null;
        if (document.cookie && "" != document.cookie)
            for (var t = document.cookie.split(";"), a = 0; a < t.length; a++) {
                var n = jQuery.trim(t[a]);
                if (n.substring(0, e.length + 1) == e + "=") {
                    o = decodeURIComponent(n.substring(e.length + 1));
                    break
                }
            }
        return o
    }
    if (e = !/^(GET|HEAD|OPTIONS|TRACE)$/.test(t.type)) var t = t.url,
        e = "//" + document.location.host,
        n = document.location.protocol + e,
        e = t == n || t.slice(0, n.length + 1) == n + "/" || t == e || t.slice(0, e.length + 1) == e + "/" || !/^(\/\/|http:|https:).*/.test(t);
    e && o.setRequestHeader("X-CSRFToken", a("csrftoken"))
});
var g_draggable_z_index = 1001;

function onUpdateReady() {
    $("#channelName").html() && !$("#BrokerWindow").is("visible") ? DragonDialogOpen("Update Available!", "A newer version is available, refresh?", DIALOG_BUTTONS_OK_CANCEL, function(e) {
        e && location.reload()
    }) : location.reload()
}

function DragonUpdater() {
    if (window.applicationCache) {
        var e = window.applicationCache,
            o = $("#updater");
        e.status === e.UPDATEREADY ? (o.html("Update Available!").slideDown(), onUpdateReady()) : (e.addEventListener("checking", function() {
            o.html("Checking for updates...").slideDown()
        }, !1), e.addEventListener("noupdate", function() {
            o.html("At Latest Version!").slideUp()
        }, !1), e.addEventListener("obsolete", function() {
            debug && console.log("** applicationCache EVENT:", "obsolete"), o.html("Obsolete!").slideUp()
        }, !1), e.addEventListener("error", function(e) {
            debug && console.log("** applicationCache EVENT:", "error", e), o.html("Failed!").slideUp()
        }, !1), e.addEventListener("cached", function() {
            debug && console.log("** applicationCache EVENT:", "cached"), o.html("Downloaded!").slideUp()
        }, !1), e.addEventListener("downloading", function() {
            debug && console.log("** applicationCache EVENT:", "downloading"), o.html("Downloading Updates...")
        }, !1), e.addEventListener("progress", function(e) {
            debug && console.log("** applicationCache EVENT:", "progress", e), e = void 0 != e.loaded && void 0 != e.total ? Math.round(100 * e.loaded / e.total) + "%" : ["\\", "/", "-", "|"][random(0, 3)], o.html("Downloading Updates... " + e)
        }, !1), e.addEventListener("updateready", function() {
            debug && console.log("** applicationCache EVENT:", "updateready"), o.html("Update Available!"), onUpdateReady()
        }), setInterval(function() {
            e.update()
        }, 216e5 + random(0, 9e5)))
    }
}

function LoadTwitter() {
    var e = document,
        o = e.getElementsByTagName("script")[0];
    e.getElementById("twitter-wjs") || ((e = e.createElement("script")).id = "twitter-wjs", e.src = "//platform.twitter.com/widgets.js", o.parentNode.insertBefore(e, o))
}

function LoadGooglePlus() {
    var e = document.createElement("script");
    e.type = "text/javascript", e.async = !0, e.src = "https://apis.google.com/js/plusone.js";
    var o = document.getElementsByTagName("script")[0];
    o.parentNode.insertBefore(e, o)
}

function DragonGuard(e) {
    var o = [DragonBound.prototype, CPlayer.prototype, DragonNetwork.prototype, CGround.prototype, CCamera.prototype, DragonSocket.prototype, DragonLogin.prototype];
    setInterval(function() {
        var t = 0;
        DragonBound.prototype !== o[0] && (DragonBound.prototype = o[0], t = 1), CPlayer.prototype !== o[1] && (CPlayer.prototype = o[1], t = 1), DragonNetwork.prototype !== o[2] && (DragonNetwork.prototype = o[2], t = 1), CGround.prototype !== o[3] && (CGround.prototype = o[3], t = 1), CCamera.prototype !== o[4] && (CCamera.prototype = o[4], t = 1), DragonSocket.prototype !== o[5] && (DragonSocket.prototype = o[5], t = 1), DragonLogin.prototype !== o[6] && (DragonLogin.prototype = o[6], t = 1), t && ($.post("/b.php", {
            u: e.user_id,
            r: 1
        }, function() {
            window.location = "/logout.php"
        }), setTimeout(function() {
            window.location = "/logout.php"
        }, 6e4))
    }, 3e5)
}

function UpdateSliceDragGUI() {
    g_is_game_slice ? $("#slice_drag_button").removeClass("drag") : $("#slice_drag_button").addClass("drag")
}

function ButtonGlow() {
    var e = $("#buttonQuickJoin");
    e.hasClass("buttonGlow") ? e.removeClass("buttonGlow") : e.addClass("buttonGlow"), setTimeout(ButtonGlow, 700)
}

function ExplodeDialog(e, o) {
    if (g_graphics_high && !o) {
        var t = $("#" + e + " .AlertBox");
        0 < t.length ? (t.effect("explode"), $("#" + e).fadeOut()) : $("#" + e).effect("explode")
    } else $("#" + e).hide()
}

function FadeInDialog(e) {
    g_graphics_high ? ($("#" + e + " .AlertBox").fadeIn(), $("#" + e).fadeIn()) : $("#" + e).show()
}

function ToggleOptionsDialog(e) {
    $("#OptionsDialog").is(":visible") ? ExplodeDialog("OptionsDialog") : (PrepareOptionsDialog(e), FadeInDialog("OptionsDialog"))
}

function TeamChatOn() {
    $("#all_chat").hide(), $("#team_chat").show()
}

function TeamChatOff() {
    $("#all_chat").show(), $("#team_chat").hide()
}

function TeamChatStatus() {
    return $("#team_chat").is(":visible")
}

function TeamChatToggle() {
    TeamChatStatus() ? TeamChatOff() : TeamChatOn()
}

function GameGUI(e) {
    var o;
    $("#gameChat").tinyscrollbar({
        size: 99
    }), $("#btnShot1").click(function() {
        SelectShotType(0, e.game), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#btnShot2").click(function() {
        SelectShotType(1, e.game), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#btnShotSS").click(function() {
        SelectShotType(2, e.game), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#btnPass").click(function() {
        e.game && e.game.PassTurnClicked(), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#btnEsc").click(function() {
        ToggleOptionsDialog(!!e.game), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#all_chat").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), TeamChatOn()
    }), $("#team_chat").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), TeamChatOff()
    }), $("#gameItemSlot0").click(function() {
        e.game && e.game.UseItem(0)
    }), $("#gameItemSlot1").click(function() {
        e.game && e.game.UseItem(1)
    }), $("#gameItemSlot2").click(function() {
        e.game && e.game.UseItem(2)
    }), $("#gameItemSlot3").click(function() {
        e.game && e.game.UseItem(3)
    }), $("#gameItemSlot4").click(function() {
        e.game && e.game.UseItem(4)
    }), $("#gameItemSlot5").click(function() {
        e.game && e.game.UseItem(5)
    }), $("#slice_drag_button").click(function() {
        g_is_game_slice = !g_is_game_slice, UpdateSliceDragGUI()
    }), UpdateSliceDragGUI(), $("#gameInput").bind("keyup", function(o) {
        if (13 == o.which) {
            if ("" != this.value) {
                var t = this.value;
                this.value = "", e.SendChat(t, TeamChatStatus())
            }
            $("#gameInput").blur(), o.stopPropagation()
        }
    }).bind("mousedown", function(e) {
        e.stopPropagation && e.stopPropagation()
    }), $("#powerMarkArea").bind("mousedown", function(e) {
        o = !0, e = e.offsetX, $("#powerMark").css("left", e + 1)
    }).bind("mouseup", function() {
        o = !1
    }).bind("mousemove", function(e) {
        o && 3 != e.eventPhase && (0 > (e = e.offsetX) ? e = 0 : 400 < e && (e = 400), $("#powerMark").css("left", e + 1))
    })
}

function SelectShotType(e, o) {
    switch (2 != e || $("#btnShotSS").is(":visible") || (e = 0), e) {
        case 0:
            $("#btnShot2, #btnShotSS").removeClass("Pressed"), $("#btnShot1").addClass("Pressed");
            break;
        case 1:
            $("#btnShot1, #btnShotSS").removeClass("Pressed"), $("#btnShot2").addClass("Pressed");
            break;
        case 2:
            $("#btnShot1, #btnShot2").removeClass("Pressed"), $("#btnShotSS").addClass("Pressed")
    }
    o && o.ChangedShot(e)
}

function GetSelectedShotType() {
    var e = 0;
    return $("#btnShot2").hasClass("Pressed") ? e = 1 : $("#btnShotSS").hasClass("Pressed") && (e = 2), e
}
$.prototype.draggable2 = function() {
    var e, o, t, a, n = this,
        r = !1,
        s = !1;
    return n.css("z-index", g_draggable_z_index += 1), this.mousedown(function(s) {
        r = !0, e = s.pageX, o = s.pageY, t = (s = n.offset()).left, a = s.top, n.css("z-index", g_draggable_z_index += 1)
    }), $(document).mousemove(function(d) {
        r && !s && (5 < Math.abs(d.pageX - e) || 5 < Math.abs(d.pageY - o)) && (s = !0), s && n.css({
            left: (t + (d.pageX - e)) / g_aspect_ratio - g_no_aspect_left + "px",
            top: (a + (d.pageY - o)) / g_aspect_ratio - g_no_aspect_top + "px"
        })
    }), $(document).mouseup(function() {
        s = r = !1
    }), this
}, $(document).ready(function() {
    InitGlobals(), $(document).bind("contextmenu", function() {
        return !1
    }), $(document).bind("dragstart", function(e) {
        return !(e.srcElement && "img" == e.srcElement.localName)
    }), $(document).bind("keydown", function(e) {
        e.which != KEY.Backspace || $(document.activeElement).is("input") || $(document.activeElement).is("textarea") || (e.preventDefault(), e.stopPropagation())
    }), DragonUpdater(), (l = new DragonLanguage(STRINGS, getCookie("lang"))).SetAll(), g_is_show_ranking = !0;
    var e = navigator.userAgent;
    e.match(/(iPhone|iPod|blackberry|android|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i) && (g_graphics_high = !1, window.scrollTo(0, 1), g_is_show_ranking = !1), e.match(/(Windows|MacOS|Mac OS|UNIX|Linux)/i) || $("#touch_ui").show(), g_is_show_ranking && $("#buttonRanking").addClass("open"), e.match(/(Chrome|Safari)/i) && $("#game_back,#game_front").css({
        position: "fixed",
        overflow: "hidden"
    }), e = "DragonBound ", "gl" == SERVER_TYPE ? e += "Global" : "br" == SERVER_TYPE ? e += "Brasil" : "dev" == SERVER_TYPE && (e += "Dev"), $("#ranking_title").html(e);
    var o = new DragonNetwork;
    for (o.dl = l, DragonTheme_Load(), AudioInit(), ChannelGUI(o), RankingGUI(o), RoomGUI(o), GameGUI(o), ShopGUI(o), DragonDesigner_Init(), DragonGuard(o), ResellersGUI(o), e = 0; e < AVATARS.length; e++) AVATARS[e] && 3e3 == AVATARS[e][0] ? POWER_USER_BACKGROUND = e : AVATARS[e] && 9e3 == AVATARS[e][0] && (POWER_USER_EXITEM = e);
    $("#dialogCreateRoom").draggable2(), $("#shop_buy_dialog").draggable2(), $("#playerInfoDialog").draggable2(), $("#OptionsDialog").draggable2(), $("body").bind("keyup", function(e) {
        13 == e.which && (o.location == LOCATION_TYPE_CHANNEL ? $("#dialogCreateRoom").is(":visible") ? CreateRoomDialogPressedOK(o) : $("#channelInput").focus() : o.game ? $("#gameInput").focus() : $("#roomInput").focus())
    }), $("body").bind("keydown", function(e) {
        13 == e.which && (e.stopPropagation(), e.preventDefault())
    }), document.onhelp = function() {
        return !1
    }, window.onhelp = function() {
        return !1
    }, $("#container, .NoSelect").bind("selectstart", function(e) {
        return e.stopPropagation(), !1
    }), $(".CanSelect").bind("selectstart", function(e) {
        return e.stopPropagation(), !0
    }), setTimeout(ButtonGlow, 700), g_is_game_background && $("#map_bg").show(), ResizeInit(), o.dragonLogin = new DragonLogin(o), $("#BrokerLogout").click(function() {
        o.dragonLogin.Logout()
    })
}), debug || (alert = void 0), top != self && (top.location = self.location), $(window).load(function() {
    LoadTwitter(), LoadGooglePlus()
});
var CHAT_LENGTH_LIMIT = 150;

function AddToChatInput(e) {
    if ("" != e) {
        var o = $("#roomInput").val();
        o.length + e.length > CHAT_LENGTH_LIMIT || ($("#roomInput").focus(), $("#roomInput").val(o + e))
    }
}

function ChatReceived(e, o, t, a, n, r) {
    e && t != CHAT_TYPE_GOLD && t != CHAT_TYPE_DEAD && t != CHAT_TYPE_SYSTEM && (e = text_filter(e.toString(), filtered_words)), debug && console.log("type:", t), t == CHAT_TYPE_GM_BUGLE && (debug && console.log("SYSTEM:", e), e = e.replace('<a href="http://www.facebook.com/dragonbound.net" target="_blank">DragonBound Community/News</a>', '<a href="http://www.dragonbound-news.com/" target="_blank">DragonBound News (NEW!)</a>'));
    var s = "",
        d = "",
        u = "",
        _ = "";
    if (n == LOCATION_TYPE_CHANNEL || $("#channelScreen").is(":visible") || $("#shopScreen").is(":visible")) d = "#channelTextHtml", s = "#channel";
    else if ($("#roomScreen").is(":visible")) d = "#roomChatHtml", s = "#roomChat", _ = ".roomPlayerBalloonTip", "" != (u = ".roomPlayerBalloon") && "" != o && $(".roomPlayerName").each(function() {
        if ($(this).html().split("</span> ").pop() == o) {
            var a = $(this).parents().children(u),
                n = $(this).parents().children(_);
            4 == t ? a.addClass("bg1") : a.removeClass("bg1"), 5 == t ? a.addClass("bg2") : a.removeClass("bg2"), n.stop(!0, !0).fadeOut("slow"), a.stop(!0, !0).hide("slow").promise().done(function() {
                a.html(e).show("slow").animate({
                    opacity: .9
                }, 5e3).fadeOut(2e3), n.fadeIn("slow").animate({
                    opacity: .9
                }, 5e3).fadeOut(2e3)
            })
        }
    });
    else {
        if (!$("#gameScreen").is(":visible")) return;
        d = "#gameChatHtml", s = "#gameChat", r && r.game && r.game.ChatReceived(e, o, t)
    }
    s && (a = '<div class="zotata-chat-line zotata-chat-type' + t + '" >' + (1 <= t && 4 != t && 9 >= t ? '<div class="zotata-chat-icon zotata-chat-icon' + t + '"></div> ' : " ") + ("" != o ? BuildPlayerNameWithGuild(a, o) + "] " : "") + e + "</div>", $(d).append(a), $(s).tinyscrollbar_update("bottom"))
}

function GuiCloseChannelScreen() {
    $("#dialogCreateRoom").fadeOut(g_graphics_high ? "slow" : 0), $("#OptionsDialog").hide(), $("#channelScreen").fadeOut(g_graphics_high ? "slow" : 0, function() {
        g_channel_player && (g_channel_player.remove(), g_channel_player = void 0), TabChangeTo(TAB_ALL)
    })
}

function GuiCloseRoomScreen() {
    $("#roomScreen").fadeOut(g_graphics_high ? "slow" : 0, function() {
        $("#roomButtonReady").hide(), $("#roomButtonStart").hide(), $("#roomButtonMobile").hide(), $("#roomChatHtml").html(""), $("#roomChat .scrollbar").hide(), $(".roomPlayerBalloon, .roomPlayerBalloonTip").removeClass("text_anim"), $("#playerInfoDialog").hide(), $("#dialog_room_options").hide(), RoomTabChangeTo(TAB_ALL), RoomRemoveAnimations(), VortexStop()
    })
}

function GuiCloseGameScreen() {
    $("#OptionsDialog").hide(), $("#gameScreen").fadeOut(g_graphics_high ? "slow" : 0, function() {
        g_score_screen_timeout && (g_score_screen_timeout = clearTimeout(g_score_screen_timeout))
    })
}

function GuiCloseShopScreen() {
    $("#shopScreen").fadeOut(g_graphics_high ? "slow" : 0, function() {
        g_shop_player.remove(), g_shop_player = void 0
    })
}

function GuiCloseCurrentScreen(e) {
    e.location == GUI_LOCATION_CHANNEL ? GuiCloseChannelScreen() : e.location == GUI_LOCATION_ROOM ? GuiCloseRoomScreen() : e.location == GUI_LOCATION_GAME ? GuiCloseGameScreen(e) : e.location == GUI_LOCATION_SHOP && GuiCloseShopScreen(), $("#friendsList").hide(), $("#guildMembersList").hide()
}

function SwitchToChannelScreen(e) {
    e.location != GUI_LOCATION_CHANNEL && $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
        GuiCloseCurrentScreen(e), $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
            e.location = GUI_LOCATION_CHANNEL, $("#channelInput").val(""), $("#channelScreen").fadeIn(g_graphics_high ? 400 : 0), $("#channel").tinyscrollbar_update("bottom"), ChannelPlayerInfoUpdate(e.myPlayerInfo, 1 == g_server_type ? e.lobbyMobile : void 0), AudioPlayInLoop(AUDIO_MUSIC_CHANNEL, !0), $("#playersList").tinyscrollbar_update("top"), TabChangeTo(TAB_ALL)
        })
    })
}

function SwitchToRoomScreen(e) {
    e.location != GUI_LOCATION_ROOM && $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
        GuiCloseCurrentScreen(e), $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
            e.location = GUI_LOCATION_ROOM, $("#roomInput").val(""), $("#room_timer").hide(), $("#select_bot_div").hide(), AutoReadyStartTimer(e), $("#roomsList > .room").each(function() {
                $(this).hide()
            }), $("#playerInfoDialog").hide(), $("#roomScreen").fadeIn(g_graphics_high ? 400 : 0), AudioPlayInLoop(AUDIO_MUSIC_ROOM, !0), RoomTabChangeTo(TAB_ALL), VortexStart()
        })
    })
}

function SwitchToGameScreen(e) {
    e.location != GUI_LOCATION_GAME && $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
        GuiCloseCurrentScreen(e), $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
            e.location = GUI_LOCATION_GAME, $("#gameScreen").fadeIn(g_graphics_high ? 400 : 0, function() {
                $("#gameScreen").css("opacity", 1)
            }), AudioPlayInLoop(AUDIO_MUSIC_STAGE1, !0)
        })
    })
}

function SwitchToShopScreen(e) {
    e.location != GUI_LOCATION_SHOP && $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
        GuiCloseCurrentScreen(e), e.location = GUI_LOCATION_SHOP, $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
            $("#shopScreen").fadeIn(g_graphics_high ? 400 : 0), $("#buttonShopHead").click(), ShopSetMyItems(e), g_shop_player || (g_shop_player = new CPlayerGraphic("#shop_player", -1, e.myPlayerInfo.head, e.myPlayerInfo.body, e.myPlayerInfo.eyes, e.myPlayerInfo.flag, !0)), ShopUpdateMyStats()
        })
    })
}
var g_dialog_graphic, DIALOG_BUTTONS_NONE = 0,
    DIALOG_BUTTONS_OK = 1,
    DIALOG_BUTTONS_OK_CANCEL = 2;

function DragonDialogOpen(e, o, t, a, n) {
    DragonDialogClose(!0), $("#myDialog .AlertBoxTitle").html(e), $("#myDialog .AlertBoxContent").html(o.replace(/\n/g, "<br>")), t == DIALOG_BUTTONS_NONE || void 0 == t ? ($("#myDialog .AlertBoxOK").hide(), $("#myDialog .AlertBoxCancel").hide()) : t == DIALOG_BUTTONS_OK ? ($("#myDialog .AlertBoxCancel").hide(), $("#myDialog .AlertBoxOK").show().unbind("click").bind("click", function() {
        DragonDialogClose(), a && a(!0)
    })) : t == DIALOG_BUTTONS_OK_CANCEL && ($("#myDialog .AlertBoxOK").show().unbind("click").bind("click", function() {
        DragonDialogClose(), a && a(!0)
    }), $("#myDialog .AlertBoxCancel").show().unbind("click").bind("click", function() {
        DragonDialogClose(), a && a(!1)
    })), n && (g_dialog_graphic && g_dialog_graphic.remove(), g_dialog_graphic = new CPlayerGraphic("#dialog_graphic", -1, n[0], n[1], n[2], n[3], !1)), $("#myDialog").removeClass("hide"), $(".DialogLayer .AlertBox").show(), $(".DialogLayer").show(), $(".DialogLayer").css("z-index", g_draggable_z_index += 1)
}

function DragonDialogClose() {
    $(".DialogLayer .AlertBox").hide(), $(".DialogLayer").hide(), g_dialog_graphic && g_dialog_graphic.remove()
}

function CloseDialogs() {
    $("#dialog_change_name_div").fadeOut()
}

function GetServerType() {
    var e = location.hostname;
    return "carlosx.byethost15.com" == e ? "dev" : "dragonbound-brasil.com" == e || "br.dragonbound.net" == e || "dragonbound.com.br" == e || "dragonbound.net.br" == e ? "br" : "gl"
}
var LANGUAGE = {
    EN: -1,
    ES: 0,
    PR: 1,
    FI: 2,
    VN: 3
};

function DragonLanguage(e, o) {
    if (void 0 == o || o < LANGUAGE.EN || o > LANGUAGE.VN) {
        var o = LANGUAGE.EN,
            t = navigator.language || navigator.userLanguage;
        t && (0 == t.indexOf("pt") ? o = LANGUAGE.PR : 0 == t.indexOf("es") ? o = LANGUAGE.ES : 0 == t.indexOf("vi") && (o = LANGUAGE.VN))
    }
    this.lang = o, this.strings = e
}
DragonLanguage.prototype.t = function(e) {
    if (this.lang == LANGUAGE.EN) return e;
    var o = this.strings[e];
    return o && (o = o[this.lang]) || e
}, DragonLanguage.prototype.SetAll = function() {
    $("#ranking_btn_type1").html(this.t("Top Players")), $("#ranking_btn_type2").html(this.t("Tournament")), $("#ranking_btn_ranks").html(this.t("Ranks")), $("#ranking_btn_howto").html(this.t("How to Play")), $("#ranking_btn_contact").html(this.t("Contact Us")), $("#ranking_btn_terms").html(this.t("Terms of Service")), $("#ranking_btn_privacy").html(this.t("Privacy Policy")), $("#BrokerChannel0 .BrokerChannelName").html(this.t("Server") + " 1 - " + this.t("High Ranks")), $("#BrokerChannel1 .BrokerChannelName").html(this.t("Server") + " 2 - " + this.t("Beginners")), $("#BrokerChannel2 .BrokerChannelName").html(this.t("Server") + " 3 - " + this.t("Beginners")), $("#BrokerChannel3 .BrokerChannelName").html(this.t("Server") + " 4"), $("#BrokerChannel4 .BrokerChannelName").html(this.t("Server") + " 5"), $("#BrokerChannel5 .BrokerChannelName").html(this.t("Server") + " 6 - " + this.t("English Please")), $("#BrokerChannel6 .BrokerChannelName").html(this.t("Server") + " 7"), $("#BrokerChannel7 .BrokerChannelName").html(this.t("Server") + " 8"), $("#BrokerChannel8 .BrokerChannelName").html(this.t("Server") + " 9 - " + this.t("On Port 80")), $("#BrokerChannel9 .BrokerChannelName").html(this.t("Server") + " 10"), $("#BrokerChannel10 .BrokerChannelName").html(this.t("Server") + " 11"), $("#BrokerChannel11 .BrokerChannelName").html(this.t("Server") + " 12 - " + this.t("Mid Ranks")), $("#BrokerChannel12 .BrokerChannelName").html(this.t("Server") + " 13"), $("#BrokerChannel13 .BrokerChannelName").html(this.t("Server") + " 14"), $("#BrokerChannel14 .BrokerChannelName").html(this.t("Server") + " 15"), $("#BrokerChannel5 .BrokerDesc").html(this.t("Please talk English here")), $("#BrokerChannel8 .BrokerDesc").html(this.t("Bypass workplace firewall")), $("#dialog_change_name_div .AlertBoxTitle").html(this.t("Select Name & Photo")), $("#display_name_label").html(this.t("Change Name") + ":"), $("#can_show_photo_label").html(this.t("Show my facebook photo")), $("#dialog_join_room_div .AlertBoxTitle").html(this.t("Join Room")), $("#join_room1").html(this.t("Number") + ":"), $("#join_room2").html(this.t("Password") + ":"), $("#friendsListExtra").html(this.t('You can add friends by clicking "Info" near them and then "Add".')), $("#guildRoomTabExtra").html(this.t('A guild leader can invite you to a guild by clicking on your "Info" and then "Guild Invite".')), $("#dialog_change_title_div .AlertBoxTitle").html(this.t("Room Title")), $("#dialog_change_title_div label").html(this.t("New Title")), $("#infoLoading").html(this.t("Loading") + "..."), $("#infoKey1").html(this.t("Ranking")), $("#infoKey2").html(this.t("Gender")), $("#infoKey4").html(this.t("Win Rate %")), $("#infoKey5").html(this.t("Damage Avg")), $("#infoKey6").html(this.t("Win")), $("#infoKey7").html(this.t("Lose")), $("#infoKey8").html(this.t("Guild")), $("#infoKey9").html(this.t("Guild Job")), $("#turns_list .turn_list_title").html(this.t("Turn List")), $("#game_replay").html("&lt;&lt; " + this.t("Game Replay") + " &gt;&gt;")
};
var STRINGS = {
    "Top Players": ["Jugadores Top", "", "Namumunong Malalaro", "Cấp cao nhất"],
    ME: ["YO", "EU", "", ""],
    Search: ["Buscar", "Procurar", "", ""],
    Tournament: ["Torneo", "Torneio", "", ""],
    Ranks: ["Niveles", "", "Ranko", "Bảng xếp hạng"],
    "How to Play": ["C\xf3mo jugar", "Como Jogar", "Paano maglaro", "Hướng dẫn"],
    "Contact Us": ["Cont\xe1ctanos", "Contate-nos", "Kontakin kami", "Li\xean hệ"],
    "Terms of Service": ["T. de Servicio", "Termos de servi\xe7o", "Termino sa serbisyo", "Điều khoản"],
    "Privacy Policy": ["P. de Privacidad", "Pol\xedtica de Privacidade", "Patakaran sa privacy", "Ch\xednh s\xe1ch bảo mật"],
    Server: ["Servidor", "", "Server", ""],
    "High Ranks": ["Ranks Altos", "Ranks de cima", "Mataas na ranko", "Cấp cao"],
    Beginners: ["Principiantes", "Iniciantes", "Baguhan", "Mới tập chơi"],
    "English Please": ["S\xf3lo Ingl\xe9s", "Ingl\xeas, por favor", "Ingles po", "Vui l\xf2ng sử dụng tiếng Anh"],
    "On Port 80": ["En Puerto 80", "Na Porta 80", "Sa Port 80", "Sử dụng port 80"],
    "Mid Ranks": ["Ranks Medios", "Ranks Medianos", "Gitnang ranko", "Trung cấp"],
    "Please talk English here": ["Por favor, hable en ingl\xe9s aqu\xed", "Por favor, fale Ingl\xeas aqui", "Maaari po lamang magsalita ng Ingles dito", "Vui l\xf2ng sử dụng tiếng Anh tại đ\xe2y"],
    "Bypass workplace firewall": ["Evite el firewall de su trabajo", "Evite o firewall do seu local de trabalho", "Ibypass ang nagtatrabuhan na firewall", "Bỏ qua tường lửa"],
    "Select Name & Photo": ["Seleccionar Nombre y Foto", "Selecione Nome & Foto", "Piliin ang iyong pangalan at Larawan", "Chọn t\xean v\xe0 h\xecnh ảnh đại diện"],
    "Change Name": ["Cambiar Nombre", "Mude o Nome", "Palitan ang iyong pangalan", "Đổi t\xean"],
    "Show my facebook photo": ["Mostrar mi foto de facebook", "Mostre minha foto do facebook", "Ipakita ang larawan ko sa facebook", "Hiển thị avatar facebook"],
    "Join Room": ["Entrar a Sala", "Entre na Sala", "Sumali sa kwarto", "Tham gia ph\xf2ng"],
    Number: ["Numero", "N\xfamero", "Numero", "Số"],
    Password: ["Contrase\xf1a", "Senha", "", "Mật khẩu"],
    'You can add friends by clicking "Info" near them and then "Add".': ['Puedes agregar amigos haciendo click en "Info" cerca de ellos y luego "A\xf1adir"', 'Voc\xea pode adicionar amigos clicando no bot\xe3o "Info" pr\xf3ximo a eles e ent\xe3o clicando no bot\xe3o "Add".', 'Maaaring magdagdag ng mga kaibigan sa pamamagitan ng pagpindot ng "Info" sa tabi ng tao tapos pindutin ang "Add"', 'Bạn c\xf3 thể th\xeam bạn bằng c\xe1ch bấm v\xe0o n\xfat "Info" v\xe0 sau đ\xf3 chọn "Add" '],
    'A guild leader can invite you to a guild by clicking on your "Info" and then "Guild Invite".': ['El l\xedder de un guild puede invitarte haciendo click en tu "Info" y luego pulsando "Invitaci\xf3n para Guild"', 'Um l\xedder da guild pode convidar voc\xea para a guild clicando em seu bot\xe3o "Info" e ent\xe3o clicando no bot\xe3o "Convidar para Guild".', 'Ang pinuno ng guild ay maaaring magimbita sa pamamagitan ng pagpindot ng "Info" tapos "Guild Invite"', 'Chủ guild c\xf3 thể mời bạn v\xe0o guild bằng c\xe1ch bấm v\xe0o "Info" của bạn v\xe0 sau đ\xf3 chọn "Guild Invite"'],
    "Room Title": ["T\xedtulo de Sala", "T\xedtulo da Sala", "Titolo ng Kwarto", "T\xean ph\xf2ng"],
    "New Title": ["Nuevo T\xedtulo", "Novo T\xedtulo", "Bagong Titolo", "Đổi t\xean ph\xf2ng"],
    Loading: ["Cargando", "Carregando", "Nagloload", "Đang tải"],
    Ranking: ["", "", "Ranko", "Xếp hạng"],
    Gender: ["G\xe9nero", "G\xe9nero", "Kasarian", "Giới t\xednh"],
    "Win Rate %": ["% de Victorias", "Vit\xf3rias %", "Porsiyento ng pagkapanalo", "Tỉ lệ thắng %"],
    "Damage Avg": ["Da\xf1o Prom.", "Dano M\xe9dio"],
    Win: ["Ganadas", "Vit\xf3ria", "Panalo", "Thắng"],
    Lose: ["Perdidas", "Derrota", "Talo", "Thua"],
    "Guild Job": ["Cargo en el Guild", "Cargo na Guild", "Trabaho sa Guild", "Chức vụ"],
    "Turn List": ["Lista de turnos", "Lista de Turnos", "Lista ng mga Turn", "Danh s\xe1ch c\xe1c lượt"],
    "Game Replay": ["Replay del Juego", "Replay do Jogo", "Replay ng Laro", "Xem lại m\xe0n chơi"],
    "Loading Facebook": ["Cargando Facebook", "Carregando Facebook", "Nagloload ang facebook", "Đang tải dữ liệu facebook"],
    "Checking FB login status": ["Verificando estado de inicio de sesi\xf3n en FB", "Verificando status do login no FB", "Sinusuri ang FB login status", "Kiểm tra dữ liệu đăng nhập facebook"],
    "A Facebook pop-up has opened, please follow the instructions to sign in.": ["Se ha abierto un pop-up de Facebook , por favor siga las instruciones para ingresar", "Um pop-up do facebook foi aberto, por favor siga as instru\xe7\xf5es para entrar", "May bumukas na facebook pop-up, at sundin ang instruksiyon", "Một popup của facebook sẽ xuất hiện, vui l\xf2ng l\xe0m theo c\xe1c bước để đăng nhập"],
    "Loading your account": ["Cargando su cuenta", "Carregando sua conta", "Niloload ang iyong account", "Đang tải dữ liệu t\xe0i khoản của bạn"],
    Timeout: ["Limite de tiempo agotado", "Tempo limite esgotado", "Timeout", "Qu\xe1 thời gian chờ"],
    "Try Again?": ["Intentar de nuevo?", "Tentar novamente?", "Ulitin?", "Bạn c\xf3 muốn thử lại ?"],
    "You Are Banned": ["Est\xe1s Baneado", "Voc\xea est\xe1 Banido", "Ikaw ay Banned", "T\xe0i khoản bị kh\xf3a"],
    Reason: ["Motivo", "Motivo", "Dahilan", "L\xed do"],
    Forever: ["Para Siempre", "Para Sempre", "Walang Hanggan", "M\xe3i m\xe3i"],
    "UTC Time Zone": ["Zona Horaria UTC", "Fuso Hor\xe1rio UTC", "", "M\xfai giờ UTC"],
    "We logged you out from your Facebook account too for your account safety.<br><br>Hope to see you again soon!": ["Hemos finalizado la sesi\xf3n de su cuenta de facebook por la seguridad de su cuenta.<br><br> Esperamos verlo pronto!", "N\xf3s sa\xedmos da sua conta do Facebook tamb\xe9m para a seguran\xe7a da sua conta.<br><br>Esperamos ver voc\xea novamente em breve!", "Nilogout namin ikaw sa iyong account para sa iyong kaligtasan. <br><br>Sana makita ulit namin kayo sa lalong madaling panahon!", ""],
    "Bye Bye": ["Adi\xf3s", "Tchau", "Paalam", "Tạm biệt"],
    "Your Web Browser Too Old": ["Su navegador es demasido viejo", "Seu Navegador \xe9 Muito Velho", "Ang iyong browser ay masyadong luma", "Tr\xecnh duyện của bạn qu\xe1 cũ"],
    'Sorry but your browser does not support WebSockets.<br><br>Please change to the newest version of <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> which has this feature.': ['Lo sentimos, pero su navegador no soporta WebSockets.<br><br>por favor, cambia a la nueva versi\xf3n de <a href="https://www.google.com/chrome/">Chrome</a> o <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> que tengan esta caracter\xedstica', 'Desculpa, mas seu navegador n\xe3o suporta WebSockets.<br><br>Por favor mude para uma das vers\xf5es mais atuais do <a href="https://www.google.com/chrome/">Chrome</a> ou <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> que t\xeam est\xe1 fun\xe7\xe3o.', 'Ikinalulungkot namin na ang inyong browser ay hindi sinusuportahan ang WebSockets.<br><br>Maaari po lamang na palitan ninyo ang <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> na mayroong ganitong feature.', ""],
    "Connecting to Server...": ["Conectando al Servidor...", "Conectando ao Servidor...", "Kumoconnect sa Server...", ""],
    'Please Wait...<br><br><br>If it takes too long:<br>&nbsp;&nbsp;Refresh (F5)<br>&nbsp;&nbsp;Change to <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Check our <a href="http://www.facebook.com/dragonbound.net">Community</a><br>&nbsp;&nbsp;Or come back later...': ['Please Wait...<br><br><br>Si esto demora mucho:<br>&nbsp;&nbsp;Refresh (F5)<br>&nbsp;&nbsp;Change to <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Check our <a href="http://www.facebook.com/dragonbound.net">Community</a><br>&nbsp;&nbsp;En todo caso regresa m\xe1s tarde...', 'Por favor Espere...<br><br><br>Se isto demorar muito:<br>&nbsp;&nbsp;Recarregue (F5)<br>&nbsp;&nbsp;Mude para o <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Verifique nossa <a href="http://www.facebook.com/dragonbound.net">Comunidade</a><br>&nbsp;&nbsp;Ou volte depois...', 'Maghintay lamangt...<br><br><br>pag masyadong matagal:<br>&nbsp;&nbsp;Refresh (F5)<br>&nbsp;&nbsp;Change to <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Check our <a href="http://www.facebook.com/dragonbound.net">Community</a><br>&nbsp;&nbsp;o bumalik mamaya...', ""],
    Disconnected: ["Desconectado", "Desconectado", "Nadisconnect", "Mất kết nối"],
    "Press [OK] to go back to the Worlds List.": ["Presione [OK] para volver a la Lista de Servers", "Pressione [OK] para voltar para a Lista de Servidores.", "Pindutin ang [OK] para bumalik sa Worlds List", "B\xe2m [OK] để trở lại danh s\xe1ch server"],
    "Can't Connect to Server :(": ["No se pudo conectar al servidor", "N\xe3o consegue conectar ao servidor", "Hindi Makapasok sa Server", "Kh\xf4ng thể kết nối đến server"],
    'Please wait a few minutes and then try to reload the game.<br><br>If it keeps failing try <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, try different ISP, or check our <a href="http://www.facebook.com/dragonbound.net">Community</a>.': ['Por favor, espere unos minutos y luego intenta recargar el juego nuevamente.<br><br>Si continua fallando, intenta <a href="https://www.google.com/chrome/">Chrome</a> o <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, intenta con otro navegador, o verifica nuestra <a href="http://www.facebook.com/dragonbound.net">Comunidade</a>.', 'Por favor espere alguns minutos e ent\xe3o tente recarregar o jogo.<br><br>Se isto continuar falhando <a href="https://www.google.com/chrome/">Chrome</a> ou <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, tente uma diferente operadora de internet, ou verifique nossa <a href="http://www.facebook.com/dragonbound.net">Comunidade</a>.', 'Maghintay ng ilang minuto at muling subukang iload ang game.<br><br>Kapag nanatiling ayaw magload, subukan ang <a href="https://www.google.com/chrome/">Chrome</a> o <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, o gumamit ng ibang ISP, o icheck ang aming <a href="http://www.facebook.com/dragonbound.net">Community</a>.', ""],
    "Update Available": ["Actualizaci\xf3n Disponible", "Atualiza\xe7\xe3o Dispon\xedvel", "May Bagong Update", ""],
    "Please refresh - <font color=\"#FF9933\">Press F5</font>\nto load the latest game client.\n\nIf it doesn't help try Shift+F5 or clear your browser's cache.": ['Por favor actualizar - <font color="#FF9933">Presione F5</font>\npara cargar la \xfaltima versi\xf3n del juego.\n\nSi esto no funciona, intenta con Shift+F5 o limpie el cach\xe9 de su navegador.', 'Por favor recarregue - <font color="#FF9933">Pressione F5</font>\npara carregar o cliente do jogo mais atual.\n\nSe isto n\xe3o funcionar tente Shift+F5 ou limpe o cache do seu navegador.', 'Paki refresh - <font color="#FF9933">Press F5</font>\npara maiload ang game client.\n\nKapag hindi parin gumana, subukan ang Shift+F5 o linisin ang cache ng iyong browser', ""],
    "Please Wait": ["Por favor espere", "Por favor Espere", "Pakihintay", "Vui l\xf2ng chờ"],
    Connected: ["Conectado", "Conectado", "Konektado", "Đ\xe3 kết nối"],
    Login: ["Ingreso", "", "Login", "Đăng nhập"],
    "Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this.": ["No se pudo iniciar el juego<br><br>Actualice (F5) o cierre la ventana por 30 segudos y vuelva para solucionar el problema.", "Perdeu o in\xedcio do jogo<br><br>Recarregue (F5) ou feche a janela por 30 segundos e ent\xe3o volte para solucionar isto.", "Namiss mo ang laro<br><br>Refresh (F5) o isarado ang browser ng 30 segundo at bumalik mamaya.", ""],
    "Friend Request": ["Solicitud de Amistad", "Solicita\xe7\xe3o de Amizade", "Friend Request", ""],
    "Can you be my friend?": ["Te gustar\xeda ser mi amigo?", "Voc\xea gostaria ser meu amigo?", "Pwede ba kitang maging kaibigan?", ""],
    "Guild Invite": ["Invitaci\xf3n al Guild", "Convite de Guild", "Imbitasyon sa Guild", ""],
    "Would you join our guild?": ["Te gustar\xeda unirte a mi Guild?", "Voc\xea gostaria de participar de nossa guild?", "Gusto mo bang sumali sa guild namin?", "Bạn c\xf3 muốn v\xe0o guild của ch\xfang t\xf4i kh\xf4ng?"],
    "Joined a different world": ["Entraste a un server diferente", "Entrou em um servidor diferente", "Sa ibang world nagconnect", ""],
    "You joined a different world. Please continue on the other window, or press [OK] to go back to worlds list.": ["Entraste a un servidor diferente. Por favor continua en otra ventana o presiona [OK] para volver a la lista de servidores", "Voc\xea entrou em um servidor diferente. Por favor continue na outra janela, ou pressione [OK] para voltar para a lista de servidores.", "Sumali ka sa ibang world. Tumuloy sa kabilang window, o pakipindot ang [OK] para bumalik sa server list.", ""],
    "Here?": ["\xbfEst\xe1s Aqu\xed?", "Aqui?", "Dito?", ""],
    "I think you are away...<br><br>Press [OK] to continue :)": ["Creo que est\xe1s ausente...", "Eu acho que voc\xea est\xe1 ausente...<br><br>Presione [OK] para continuar :)", "Tingin ko AFK ka...<br><br>Paki'indot ang [OK] para magpatuloy :)", ""],
    "Server is Full": ["Server Lleno", "Servidor est\xe1 Cheio", "Full ang Server", "Server đ\xe3 đầy"],
    "We are sorry but the server is currently full.<br><br>Try to join a different one.": ["Lo sentimos, este server est\xe1 lleno.<br><br>Intenta entrar a otro server", "N\xf3s sentimos muito, mas o servidor est\xe1 atualmente cheio.<br><br>Tente entrar em um diferente", "Pasensya na, ngunit puno ang server sa kasalukuyan.<br><br>Subukang sumali sa ibang server", ""],
    "Loading profile": ["Cargando perfil", "Carregando perfil", "Nagloload ang iyong profile", "Đang tải th\xf4ng tin"],
    "Loading your avatars": ["Cargando tus avatares", "Carregando seus avatars", "Nagloload ang iyong mga avatar", "Đang tải avatar của bạn"],
    "Loading Channels": ["Cargando canales", "Carregando Canais", "Nagloload ang mga channel", "Đang tải c\xe1c k\xeanh"],
    "Error! Wait 30 seconds, then press this button": ["Error! Espere 30 segundos, luego presiona este bot\xf3n", "Erro! Espere 30 segundos, ent\xe3o pressione este bot\xe3o", "Error! Maghintay ng 30 segundo, pagkatapos at pindutin ang botton na ito", "C\xf3 lỗi xảy ra! Đợi 30 gi\xe2y, sau đ\xf3 bấm n\xfat n\xe0y"],
    "Select Server": ["Seleccionar Server", "Selecione o Server", "Piliin ang Server", ""],
    "Total Online Players": ["Total de jugadores conectados", "Total de Jogadores Online", "Mga online na manlalaro", "Tổng số người chơi đang online"],
    "All worlds are currently full. Press this button to refresh": ["Todos los servers est\xe1n llenos. Presiona este bot\xf3n para actualizar", "Todos os servers est\xe3o cheios no momento. Pressione este bot\xe3o para atualizar", "Ang lahat ng mga world ay puno sa kasalukuyan. Pindutin ang botton na ito para magrefresh", ""],
    "Not Room Master": ["No tienes el Master de la sala", "N\xe3o \xe9 o Master da Sala", "Hindi ikaw ang room master", ""],
    "Sorry, only the room master can change the room title.": ["Lo sentimos, solo el master de la sala puede cambiar el t\xedtulo de la sala.", "Desculpe, apenas o master da sala pode mudar o t\xedtulo da sala.", "Patawad, maaari lang ito gawin ng room master", ""],
    "Sorry, only the room master can change the room options.": ["Lo sentimos, solo el master de la sala puede cambiar las opciones de la sala", "Desculpe, apenas o master da sala pode mudar as op\xe7\xf5es da sala.", "Patawad, maaari lang tio gawin ng room master", ""],
    "This mode is locked until you win at BOSS mode as room master.": ["Este modo est\xe1 bloqueado, hasta que ganes en modo BOSS como master de la sala.", "Este modo est\xe1 trancado at\xe9 que voc\xea ven\xe7a no modo BOSS como master da sala.", "Ang mode na ito ay nakakandado hangga't manalo kayo sa mga BOSS bilang room master", ""],
    "This mode is locked until you win *ALL* BOSS mode levels as room master.": ["Este modo est\xe1 bloqueado hasta que derrotes *TODOS* los niveles de que hay en el modo BOSS.", "Esse modo de jogo est\xe1 bloqueado at\xe9 que voc\xea ganhe *TODOS* no modo BOSS sendo o dono da sala.", "Nakakandado ang room na ito hangga't manalo kayo sa lahat ng BOSS na level", ""],
    "Kill the other team to win.": ["Derrote al otro equipo para ganar", "Elimine o outro time para vencer.", "Patayin ang kabilang team para manalo", ""],
    "Fight computer players at increasing difficulty.": ["Juega contra bots que incrementan su dificultad.", "Jogue contra o computador aumentando a dificuldade.", "Labanan ang mga computer player sa masmataas na kahirapan", ""],
    "Everyone use the same mobile as the room master.": ["Todos utilizan el mismo m\xf3vil que el master de la sala", "Todos utilizam o mesmo mobile que o master da sala.", "Lahat ay gagamit ng pareho mobile kaparehas ng room master", ""],
    Male: ["Hombre", "Macho", "Lalaki", "Nam"],
    Female: ["Mujer", "F\xeamea", "Babae", "Nữ"],
    Member: ["Miembro", "", "Miyembro", "Th\xe0nh vi\xean"],
    Leader: ["L\xedder", "L\xedder", "Pinuno", "Hội chủ"],
    "Semi-Leader": ["Semi-L\xedder", "Vice-L\xedder", "Semi-Pinuno", "Ph\xf3 hội chủ"],
    ON: ["Encendido", "", "Bukas", "BẬT"],
    OFF: ["Apagado", "", "Sarado", "TẮT"],
    Team: ["Equipo", "Time", "", "Đội"],
    "If you win you will not get winning bonus because you already won this player many times today.<br>Play for fun, play with others, or continue tomorrow.": ["Si ganas ya no tendr\xe1s el bonus por victoria, porque ya has derrotado a este usuario mucha veces hoy.<br>Juega por diversi\xf3n, con otros jugadores o contin\xfaa ma\xf1ana", "", "Kapag ikaw ay nanalo, wala kang makukuha dahil nanalo ka na sa player na ito maraming beses sa araw na ito.<br>Maglaro para sa kasiyahan, kalaroin ang ibang mga tao, o subukan muli bukas.", "Bởi v\xec bạn đ\xe1 thắng qu\xe1 nhiều lần trong ng\xe0y n\xean kh\xf4ng nhận được điểm thưởng.<br>Vui l\xf2ng trở lại v\xe0o ng\xe0y mai"],
    "Old Browser": ["Navegador antiguo", "Navegador Velho", "Lumang Browser", "Tr\xecnh duyệt cũ"],
    "Your browser is too old.<br>It does not have required features to run the game.": ["Tu navegador es muy antiguo.<br>No tiene los requisitos para poder jugar el juego", "", "Ang iyong browser ay masyado nang luma at wala ang mga kinakailangan upang paganahin ang laro", "Tr\xecnh duyệt của bạn qu\xe1 cũ.<br> N\xf3 kh\xf4ng t\xedch hợp c\xe1c thư viện cần thiết để c\xf3 thể chơi game"],
    'Please change to <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>': ['Por favor c\xe1mbiate a <a href="https://www.google.com/chrome/">Chrome</a> o <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>', 'Por favor mude para <a href="https://www.google.com/chrome/">Chrome</a> ou <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>', 'Pakipalit sa <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>', 'Vui l\xf2ng đổi tr\xecnh duyệt <a href="https://www.google.com/chrome/">Chrome</a> hay <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>'],
    "Event Game": ["Partida de Evento", "Partida de Evento", "Event Game", "Sự kiện "],
    "Losing Team Wins!<br>Double GP & Gold!": ["Equipo Perdedor Gana!<br>Doble GP & Gold!", "Time Derrotado Ganha!<br>GP & GOLD Dobrado!", "Panalo ang team na natalo!<br>Double GP & Gold!", "Đội thua đ\xe3 thắng!<br> Nh\xe2n đ\xf4i GP & V\xe0ng"],
    "Winning Award": ["Premio por victoria", "Pr\xeamio pela Vit\xf4ria", "Award para sa mga panalo", "Phần thưởng chiến thắng"],
    "Losing Consolation": ["Premio consuelo por derrota", "Consola\xe7\xe3o pela Derrota", "Gantimpalang Pampalubag-loob", "Phần thưởng an ủi"],
    "was killed by": ["fue matado por", "foi morto por", "Pinatay ni", "bị giết bởi"],
    "Ultra High Angle Bonus": ["Bonus \xc1ngulo Ultra Alto", "B\xf4nus de \xc2ngulo Ultra Alto", "Bonus sa pag gawa ng Ultra High Angle", "Thưởng g\xf3c si\xeau cao"],
    "High Angle Bonus": ["Bonus \xc1ngulo alto", "B\xf4nus de \xc2ngulo Alto", "Bonus sa pag gawa ng tirang mataas ang angle", "Thưởng g\xf3c cao"],
    "Excellent Shot Bonus": ["Bonus de Tiro Excelente", "B\xf4nus de Tiro Excelente", "Bonus sa pag gawa ng Excellent Shot", "Thưởng bắn xuất sắc"],
    "Good Shot Bonus": ["Bonus de Buen Tiro", "B\xf4nus de Bom Tiro", "Bonus sa pag gawa ng magandang tira", "Thưởng bắn tốt"],
    "Shot Bonus": ["Bonus de Tiro", "B\xf4nus de Tiro", "Bonus sa pag gawa ng tira", "Thưởng bắn"],
    "Team Damage Penalty": ["Penalidad por Atacar Equipo", "Penalidade por Fogo Amigo", "Parusa sa pagdamage sa kakampi", "Bắn tr\xfang đồng đội"],
    "died by teleport": ["murio por teleport", "morto por teleporte", "Namatay sa pagteleport", "chết bởi teleport"],
    "damage achieved": ["da\xf1o alcanzado", "dano alcan\xe7ado", "nakuha ang damage", "s\xe1t thương đạt"],
    "Triple Kill Bonus": ["Bonus Triple Matanza", "B\xf4nus de Triple Kill", "Bonus sa pagpatay sa tatlo sabay-sabay", "Phần thưởng giết 3 mạng một l\xfac"],
    "Double Kill Bonus": ["Bonus de Double Matanza", "B\xf4nus de Double Kill", "Bonus sa pagpatay sa dalawa nang sabay", "Phần thưởng giết 2 mạng một l\xfac"],
    "Ending Bonus": ["Bonus de Finalizaci\xf3n", "B\xf4nus de Encerramento", "Bonus sa pagpatay", "Thưởng kết th\xfac"],
    "Bunge Shot Bonus": ["Bonus por Tiro Bunge", "B\xf4nus de Bunge", "Bonus sa paghulog ng kalaban", "Thưởng bắn rơi"],
    "Suicide Penalty": ["Penalidad Por Suic\xecdio", "Penalidade por Suic\xeddio", "Parusa sa pagpakamatay", "Tự s\xe1t"],
    "Room Master unlocked a new challenge opponent ! :)": ["El Master de la sala ha desbloqueado un nuevo oponente", "Master da sala destravou um novo oponente", "Naunlock ng room master ang bagong kalaban", "Chủ ph\xf2ng đ\xe3 mở kh\xf3a đối thủ mới !:)"],
    "Free kill game detected - No winning bonus": ["Free Kill Detectado - No hay bonificaci\xf3n por victoria", "Free kill detectado - Sem b\xf4nus de vit\xf3ria", "Free kill game nadetect - Walang bonus sa pagpanalo", "Ph\xe1t hiện m\xe0n chơi d\xe0n xếp - kh\xf4ng c\xf3 phần thưởng chiến thắng"],
    bunge: ["", "", "hulog", "rớt"],
    "Winning Bonus": ["Bonus de Victoria", "B\xf4nus de Vit\xf3ria", "Bonus sa pagkapanalo", "Phần thưởng chiến thắng"],
    "Early Suicide": ["Suicidio temprano", "Su\xedcidio prematuro", "Maagang Pagpakamatay", ""],
    "No winning bonus (because you already won %% many times today. Play for fun, play with others, or continue tomorrow).": ["No hay bonificaci\xf3n de victoria (porque usted ya ha ganado %% muchas veces hoy. Juega por diversi\xf3n, juega con otros usuarios o continua ma\xf1ana).", "Sem b\xf4nus de vit\xf3ria (por que voc\xea j\xe1 venceu %% muitas vezes hoje. Jogue por divers\xe3o, jogue com outros, ou continue amanh\xe3).", "Walang GP (dahil nanalo ka na ng %% maraming beses ngayong araw. Maglaro para sa katuwaan, makipaglaro sa iba o magpatuloy bukas)", ""],
    "Sudden Death in %% turns": ["Muerte s\xfabita en %% turnos", "Sudden Death em %% turnos", "%% turns bago mag Sudden Death", ""],
    "Sudden Death Started!": ["Muerte S\xfabita Iniciada!", "Sudden Death Iniciado!", "Simula na ang Biglaang Pagkamatay!", "Chế độ Sudden Death bắt đầu!"],
    "Lobby Screen": ["Pantalla Lobby", "Tela do Lobby", "Screen ng Lobby", ""],
    "Join a game, chat or shop": ["Entra a un juego, chat o tienda", "Entre em um jogo, chat ou shop", "Sumali sa laro, makipagusap o pumunta sa tindahan", ""],
    "Quick Play": ["", "Jogo R\xe1pido", "", ""],
    "Join to an available game room": ["Entrar a una sala disponible", "Entrar em uma sala dispon\xedvel", "Sumali sa kwarto na may bakante", ""],
    Create: ["", "Criar", "", ""],
    "Create your own game room": ["Crea tu propia sala", "Crie sua pr\xf3pria sala", "Gumawa ng iyong room", ""],
    Shop: ["", "Compras", "", ""],
    "Buy and use avatars (items)": ["Comprar y usar avatares (items)", "Comprar e usar avatars (items)", "Bumili at gumamit ng avatars (mga gamit)", ""],
    "My Info": ["", "Minha Info", "", ""],
    "Change Name & Photo": ["Cambia Nombre & Foto", "Mudar Nome & Foto", "Palitan ang Pangalan at Litrato", ""],
    Options: ["", "Op\xe7\xf5es", "", ""],
    "Music / Sound / Graphics": ["M\xfasica / Sonido / Gr\xe1ficos", "M\xfasica / Som / Gr\xe1ficos", "Kanta / Tugtog / Graphics", ""],
    "Rooms List": ["Lista de Salas", "Lista de Salas", "Listahan ng kwarto", "Danh sach ph\xf2ng"],
    'Click on a "Waiting" room to join to a game': ['Clic en una sala "En Espera" para entrar en juego', 'Clique em uma sala "Em Espera" para entrar em um jogo', 'Magclick ng "Waiting" na kwarto upang makasali sa laro', ""],
    "Room Screen": ["Pantalla de Salas", "Tela do Jogo", "Room Screen", "Room Screen", "M\xe0n h\xecnh ph\xf2ng"],
    'When all players are "Ready" the room master can start a game': ['Cuando todos los jugadores est\xe9n "Listos" el master de la sala puede iniciar el juego', 'Quando todos os jogadores estiverem "Prontos" o master da sala pode come\xe7ar o jogo', 'Kapag "Ready" na ang lahat ng manlalaro, maaari nang i-start ng room master', ""],
    "To ready": ["Listo", "Para ficar pronto", "Para magready", "để sẵn s\xe0ng"],
    "For room master to start a game": ["Para el master de la para comenzar el juego", "Para o master da sala come\xe7ar o jogo", "Para ma-start ng master", ""],
    "Game Screen": ["Pantalla de Juego", "Tela do Jogo", "Game Screen", "M\xe0n h\xecnh game"],
    "You have to kill the other team to win. Shoot in your turn": ["Tienes que matar al otro equipo para ganar. Dispara en tu turno", "Mate o time oponente para vencer. Atire no seu turno", "Kailangang patayin ang kabilang kampo upang manalo", ""],
    "Up/Down": ["Arriba/Abajo", "Cima/Baixo", "Taas/Baba", "L\xean/Xuống"],
    "Change angle": ["Cambiar Angulo", "Mudar \xe2ngulo", "Palitan ang angle", "Đổi g\xf3c"],
    "Left/Right": ["Izquierda/Derecha", "Esquerda/Direita", "Kaliwa/Kanan", "Tr\xe1i/Phải"],
    "Walk (on your turn)": ["Caminar (en su turno)", "Ande (no seu turno)", "Lakad (sa turn mo)", "Di chuyển( trong lượt của bạn)"],
    Space: ["Espacio", "Espa\xe7o", "Space", ""],
    "Shoot. Hold down for more power": ["Dispara. Mantega presionado para mas poder", "Atire. Mantenha pressionado para mais for\xe7a", "Tira. Tagalan ang pindot para lumakas", ""],
    "COMPANY EMAILS": ["EMAILS DE EMPRESAS", "EMAILS DE EMPRESAS", "PANGKOMPANYANG MGA EMAIL", ""],
    Community: ["Comunidad", "Comunidade", "Komunidad", "Cộng đồng"],
    "ENGLISH ONLY": ["SOLO INGL\xc9S", "APENAS INGL\xcaS", "INGLES LANG", ""],
    "Business Relations": ["Relacciones de Negocios", "Rela\xe7\xf5es de Neg\xf3cios", "Usapang Pangnegosyo", ""],
    "COMPANIES ONLY, IN ENGLISH": ["SOLO EMPRESAS, EN INGL\xc9S", "EMPRESAS APENAS, EM INGL\xcaS", "Mga Kompanya lamang, sa Ingles", ""],
    "GM LIST": ["LISTA DE GMs", "LISTA DE GMs", "Listahan ng GMs", "Danh s\xe1ch GM"],
    "Last Update": ["\xdaltima Actualizaci\xf3n", "\xdaltima Atualiza\xe7\xe3o", "Huling Update", ""],
    Rank: ["Nivel", "", "Ranko", ""],
    Rule: ["Reglas", "Regra", "Patakaran", "Luật chơi"],
    Players: ["Jugadores", "Jogadores", "Mga Manlalaro", ""],
    "Top 1": ["", "", "", ""],
    "Next 4": ["Pr\xf3ximos 4", "Pr\xf3ximos 4", "Sunod na 4", ""],
    "Next 16": ["Pr\xf3ximos 16", "Pr\xf3ximos 16", "Sunod na 16", ""],
    "% applied to all players with at least 6900 GP (except the first 21 players)": ["% aplica a todos los jugadores con al menos 6900 GP (excepto los primeros 21 jugadores)", "% aplicada para todos os players com pelo menos 6900 GP (exceto os 21 primeiros players)", "% nagaaplika sa lahat ng naglalaro na mayroong GP na hindi tataas ng 6900", ""],
    "Ranking is updated every hour at about XX:10": ["El Rank se actualiza cada hora aproximadamente XX:10", "O Rank \xe9 atualizado de hora em hora \xe0s XX:10", "Ang listahan ng ranko ay naguupdate bawat oras sa oras ng XX:10", ""],
    "Refresh (F5) if you ranked up to see your new rank in game": ["Actualice (F5), si subi\xf3 de nivel, para ver su nuevo nivel en el juego", "Recarregue (F5) se voc\xea subiu de n\xedvel para ver seu novo n\xedvel no jogo", "Refresh (F50 kapag nagrank up ka, para makita ang bagong ranko mo", ""],
    Sorry: ["Lo sentimos", "Desculpe", "Patawad", ""],
    "Room does not exist.<br>Please try a different room.": ["Esta sala no existe.<br>Porfavor entre en una sala diferente", "Sala n\xe3o existe.<br>Por favor tente uma sala diferente.", "Walang room na ganito.<br>Subukan ang ibang room", ""],
    Full: ["Sala llena", "Cheia", "Puno", ""],
    "Too many users in the room.<br>Please try a different room.": ["Muchos jugadores en la sala.<br>Por favor entre a una sala diferente.", "Muitos jogadores na sala.<br>Por favor tente uma sala diferente.", "Masyadong marami nang mga player sa room na ito.<br>Kung maaari lamang ay subukan ang ibang mga kwarto.", ""],
    Playing: ["En juego", "Jogando", "Naglalaro", ""],
    "The game has already started.<br>You cannot enter.": ["El juego ya comenz\xf3.<br>Ya no puedes ingresar.", "O jogo j\xe1 come\xe7ou.<br>Voc\xea n\xe3o pode entrar.", "Ang larong ito ay nagsimula na.<br>Hindi ka maaaring sumali", ""],
    "Wrong Password": ["Contrase\xf1a Incorrecta", "Senha Incorreta", "Mali ang password", ""],
    "Wrong Password.<br>Please check your password.": ["Contrase\xf1a incorrecta.<br>Por favor, verifica la contrase\xf1a.", "Senha Incorreta.<br>Por favor verifique sua senha.", "Mali ang password.<br>Pakitignan ulit ang iyong pa password", ""],
    "Kicked or Left Game": ["Expulsado o Dejaste el Juego", "Kickado ou Deixou o Jogo", "Nasipa o umalis sa laro", ""],
    "You will be able to join this room in %% seconds.": ["Podr\xe1s entrar a esta sala en %% segundos.", "Voc\xea poder\xe1 entrar nesta sala em %% segundos.", "Maaari ka sumali sa kwartong ito sa ilang %% segundo.", ""],
    "minutes left for your mute": ["minutos le quedan a tu mute", "minutos restantes para o seu mute", "", ""],
    "Your mute is over. Please don't do this again.": ["Tu muteo ha terminado, por favor no lo hagas de nuevo", "Seu mute est\xe1 encerrado. Por favor n\xe3o fa\xe7a isto novamente.", "Tapos na ang iyong mute. Maaari po lamang na huwag ulitin ang iyon ginawa", ""],
    "This avatar is missing in stock.": ["Este avatar ya no est\xe1 a la venta", "Este avatar est\xe1 faltando no estoque", "Ang avatar na ito ay wala nang stock", ""],
    "This avatar is not available for sell right now.": ["Este avatar ya no est\xe1 disponible a la venta", "Este avatar n\xe3o est\xe1 dispon\xedvel para venda no momento", "Ang avatar na ito ay hindi mabibili ngayon", ""],
    "The requested avatar can not be bought with this method of payment.": ["El avatar requerido ya no puede ser comprado en este m\xe9todo de pago", "O avatar requerido n\xe3o pode ser compro com este m\xe9todo de pagamento", "Ang avatar na ito ay hindi mabibili sa ganitong metodo ng pagbabayad", ""],
    "The requested price does not match this avatar and period.": ["El precio requerido no coincide con el avatar ni con el periodo", "O pre\xe7o requerido n\xe3o bate com este avatar e per\xedodo", "Ang presyong ito ay hindi nagmamatch sa avatar at period", ""],
    "You are already buying something, please wait a while for previous purchase to finish and try again.": ["Usted ya compr\xf3 algo, por favor espere unos momentos para adquirlo, finalice e intente otra vez.", "Voc\xea j\xe1 est\xe1 comprando alguma coisa, por favor espere um momento para sua comprar anterior terminar e tente novamente.", "Ikaw ay bumibili na, maghintay lamang ng sandali upang matapos ang binili mo, tapos subukan muli.", ""],
    "You already have this item. Why are you buying it again?": ["Usted ya compr\xf3 este item. \xbfPor qu\xe9 lo est\xe1 comprando de nuevo?", "Voc\xea j\xe1 tem este item. Por que voc\xea est\xe1 comprando ele novamente?", "Binili mo na ang item na ito. Bakit mo binibili ulit?", ""],
    "Thank You": ["Gracias", "Obrigado", "Salamat", ""],
    "You purchased": ["Usted ha comprado", "Voc\xea comprou", "Binili mo", ""],
    Locked: ["Bloqueado", "Bloqueado", "Kandado", ""],
    "You did not open this challenge yet.\n\nTo unlock this one you have to win the previous one as room master.": ["Usted todav\xeda no ha desbloqueado este desaf\xedo.\n\nPara desbloquearlo, tienes que derrotar al anterior como master de la sala.", "Voc\xea ainda n\xe3o liberou este desafio.\n\nPara desbloquear este voc\xea tem que vencer o anterior sendo master da sala.", "Hindi mo pa natatapos ang challenge na ito.\n\nPara mabuksan mo, kinakailangan mong manalo bilang room master.", ""],
    "Already Playing": ["Ya est\xe1n jugando", "J\xe1 est\xe1 Jogando", "Naglalaro na", ""],
    "This player is already in the room.\n\nPlease select a different one.": ["Este jugador ya est\xe1 en la sala.\n\nPor favor, seleccionar a otro diferente", "Este jogador j\xe1 est\xe1 na sala.\n\nPor favor selecione um diferente.", "Ang player na ito ay nasa kwarto na.\n\nMaaari lamang na pumili ng iba", ""],
    Event: ["Evento", "Evento", "", ""],
    "You won the event!\nHere is a gift of <u>%% Cash</u> and <u>%% Gold": ["Ganaste el evento!\nAqu\xed est\xe1 tu premio de <u>%% Cash</u> y <u>%% Gold", "Voc\xea venceu o evento!\nAqui est\xe1 o seu pr\xeamio de <u>%% Cash</u> e <u>%% Gold", "Nanalo ka sa event!\nIto ang gantimpala na<u>%% Cash</u> at <u>%% Gold", ""],
    "Come back in at least <u>4 hours</u>\nto get another gift.": ["Vuelve en por lo menos <u>4 horas</u>\npara obtener otro premio.", "Volte em pelo menos <u>4 horas</u>\n para receber outro pr\xeamio.", "Bumalik sa hindi kukulang na <u> 4 hours</u>\n para makakuha ng panibagong regalo", ""],
    "You can post again in at least <u>24 hours</u>\nto get another gift.": ["Puedes postear de nuevo en <u>24 horas</u>\npara obtener otro premio.", "Voc\xea pode postar novamente em pelo menos <u>24 horas</u>\npara ganhar outro pr\xeamio.", "Maaari mong ipost muli nang hindi kukulang ng <u>24 oras</u>\npara makakuha ng panibagong regalo", ""],
    "You can not chat with yourself. Try to chat with someone else.": ["No puedes chatear contigo mismo. Intenta conversar con otra persona", "Voc\xea n\xe3o pode conversar com voc\xea mesmo. Tente conversar com outra pessoa.", "Hindi mo maaaring kausapin ang iyong sarili. Subukan na magchat sa ibang tao", ""],
    "You can not be friends with yourself. Try to friend someone else.": ["No puedes ser amigo de ti mismo. Intenta agregar a otra persona", "Voc\xea n\xe3o poder ser amigo de voc\xea mesmo. Tente ser amigo de outra pessoa.", "Hindi mo puwedeng maging kaibigan ang iyong sarili. Humanap ka ng ibang kaibigan", ""],
    "This player is offline or does not exist.\nAdd the friend when you can see him.": ["Este usuario no est\xe1 conectado o no existe.\nAgregalo como amigo cuando lo veas de nuevo.", "Este jogador est\xe1 offline ou n\xe3o existe.\nAdicione-o como amigo quando voc\xea ver ele.", "Ang manlalarong ito ay offline o wala sa larong ito.\nMagadd ng kaibigan sa panahon na makita mo siya", ""],
    "Already Friends": ["Ya son amigos", "J\xe1 s\xe3o amigos", "Kaibigan na", ""],
    "You are already friends.\n\nYou can see the friend in your Friends List.": ["Ustedes ya son amigos.\n\nPuedes verlo en tu Lista de Amigos.", "Voc\xeas j\xe1 s\xe3o amigos.\n\nVoc\xea pode ver seu amigo em sua Lista de Amigos.", "Kaibigan mo na ito.\n\nMakikita mo siya sa iyong friend list", ""],
    "You can not add GM as a friend.": ["Usted no puede agregar a un GM como amigo.", "Voc\xea n\xe3o pode adicionar um GM como amigo.", "Hindi mo maaaring idagdag ang GM.", ""],
    "You sent a request to this player already.\n\nAsk him to add you, or re-enter to the server to send him again.": ["Ya le enviaste una solictud de amistad a este usuario.\n\nDile si te puede agregar, o re-ingresa al servidor para enviarle una nueva solicitud.", "Voc\xea j\xe1 enviou um pedido de amizade para este jogador.\n\nPe\xe7a para ele adicionar voc\xea, ou re-entre no servidor para mandar um pedido novamente.", "Nagpadala ka ng request sa player na ito.\n\nTanong mo siya para iadd ka, o pumasok ka ulit sa server at subukan muli", ""],
    "Too Many Friends": ["Demasiados Amigos", "Muitos Amigos", "Masyado ka nang maraming kaibigan", ""],
    "You have %% friends.\nLimit = 100 (+ Per Level)\n\nPlease delete some inactive friends first, and then invite again.": ["Usted tiene %% amigos.\nLimite = 100 (+ Por Nivel)\n\nPor favor, elimine a algunos amigos inactivos y luego manda invitaciones otra vez.", "Voc\xea tem %% amigos.\nLimite = 100 (+ Por Level)\n\nPor favor delete alguns amigos inativos primeiro, e ent\xe3o convide novamente.", "Mayroon ka nang %% na kaibigan.\nLimit = 100 (+ Per Level)\n\nMagdelete ng mga kaibigang hindi na naglalaro, at muling maginvite", ""],
    "User Has Too Many Friends": ["Este usuario tiene muchos amigos", "O jogador tem muitos amigos", "Masyado nang maraming kaibigan ang user", ""],
    "That player has too many friends.\n\nAsk him to delete some friends to make space for you first.": ["Este usuario tiene muchos amigos.\n\nPreg\xfantale si puede eliminar a alguien para poder agregarte.", "Este jogador tem muitos amigos.\n\nPe\xe7a para ele deletar algum amigo para liberar espa\xe7o para voc\xea primeiro.", "Masyado nang maraming kaibigan ang manlalarong iyon. Hilingin muna sa kanya na magbura ng ilang kaibigan para magawan ka nya ng lugar sa kanyang buddy list.", ""],
    "Friend Request Sent": ["Solicitud de Amistad enviada", "Pedido de Amizade enviado", "Napadala na ang friend request", ""],
    "You asked %% to be friends.\n\nWhen he approves your request you will see the friend in your Buddy List.": ["Le pediste a %% ser amigos.\n\nCuando se apruebe tu solicitud podr\xe1s verlo como amigo en tu Lista de Amigos.", "Voc\xea pediu %% para ser seu amigo.\n\nQuando ele aceitar seu pedido voc\xea ir\xe1 ver seu amigo em sua Lista de Amigos.", "Tinanong mo si %% upang maging iyong kaibigan.\n\n pag inaproba niya ay makikita mo siya sa iyong buddy list.", ""],
    "Friend Added :)": ["Amigo agregado :)", "Amigo Adicionado :)", "Nadagdag na ang iyong kaibigan :)", ""],
    "You have a new friend.\n\nYou can now see where is your friend in your Buddy List, and private chat even at different rooms.": ["Tienes un nuevo amigo: %%\n\nAhora puedes ver d\xf3nde se encuentra en tu Lista de Amigos, y enviarle chats privados a diferentes servidores.", "Voc\xea tem um novo amigo: %%\n\nVoc\xea pode ver onde seu amigo est\xe1 na sua Lista de Amigos e abrir um chat privado mesmo em uma sala diferente.", "Mayroon kang bagong kaibigan.\n\nMakikita mo na siya sa buddy list, at private chat sa ibang mga kwarto", ""],
    "Sorry, you can send private messages to friends and guild members only.": ["Lo sentimos, solo puedes enviarles mensajes privados a tus amigos y miembres de tu guild.", "Desculpe, voc\xea pode mandar mensagens privadas para amigos e membros da guild apenas.", "Patawad, maaari ka lamang magpadala ng mensahe sa iyong mga kaibigan o kaguild", ""],
    "Friend Deleted :(": ["Amigo eliminado :(", "Amigo deletado :(", "Nadelete na ang iyong kaibigan", ""],
    "How sad...": ["Qu\xe9 pena...", "Triste...", "Nakakalungkot...", ""],
    "You are not in a guild": ["Usted no est\xe1 en un guild", "Voc\xea n\xe3o est\xe1 em uma guild", "Wala kang guild", ""],
    "The user is not in your guild.": ["Este usuario no est\xe1 en tu guild", "O usu\xe1rio n\xe3o est\xe1 em sua guild", "Ang user na ito ay wala sa guild", ""],
    "You do not have kick powers, ask the guild leader to kick.": ["Usted no puede sacar miembros de su guild, preg\xfantale al l\xedder del guild que lo haga", "Voc\xea n\xe3o tem poder para kickar, pe\xe7a para o l\xedder kickar.", "Walang kang power para manipa, itanong mo sa iyong pinuno upang siya ang manipa ng miyembro", ""],
    "You can not kick yourself.": ["No puedes kickearte a ti mismo.", "Voc\xea n\xe3o pode kickar voc\xea mesmo.", "Hindi mo maaaring masipa ang iyong sarili", ""],
    Kicked: ["Kickeado", "Kickado", "Nasipa na", ""],
    "Can't set Boss mode if there are more than 4 players in the room.": ["No se puede jugar en modo Boss si hay en la sala m\xe1s de 4 jugadores", "N\xe3o pode mudar para Modo Chefe se tiver mais de 4 jogadores na sala.", "Hindi maset ang boss mode dahil may apat na tao na sa iyong room", ""],
    "You are already in a guild. You have to leave your guild first.": ["Usted ya est\xe1 en un guild. Tienes que dejar tu guild primero", "Voc\xea j\xe1 estar em uma guild. Voc\xea tem que sair da sua guild primeiro.", "Nasa guild ka na. Kinakailangan mo magleave muna sa dati mong guild", ""],
    "Guild name must be 2-6 letters.": ["El nombre del guild debe tener entre 2-6 letras.", "Nome da guild deve ter entre 2-6 letras.", "Ang guild name mo ay dapat 2-6 letters lamang.", ""],
    "Guild name must not contain filtered words.": ["El nombre del guild no debe tener palabras filtradas.", "O nome da guild n\xe3o pode conter palavras filtradas.", "Ang guild name mo ay dapat walang mga filtered words.", ""],
    "Not enough gold. Creating a guild costs 50,000 Gold.": ["No hay suficiente Gold. Crear un guild cuesta 50,000 de Gold.", "Sem gold suficiente. Criar uma guild custa 50,000 de Gold.", "Hindi sapat ang ginto mo. Kinakailangan mo ng 50,000 gold upang gumawa ng guild", ""],
    "Already Exists": ["Ya existe", "J\xe1 Existe", "Mayroon na", ""],
    "There is already a guild at this name. Please select a different name.": ["Ya existe un guild con este nombre. Por favor escoja otro nombre", "J\xe1 existe uma guild com este nome. Por favor selecione um nome diferente.", "Mayroon nang guild na ganito ang pangalan. Kung maaari lamang ay pumili ng iba", ""],
    Done: ["Listo", "Feito", "Tapos", ""],
    "Guild created! You are the guild leader. You can now invite players to join it.": ["\xa1Guild creado! Usted es el l\xedder del guild. Ahora puedes invitar jugadores a que se unan", "Guild criada! Voc\xea \xe9 o l\xedder da guild. Voc\xea pode convidar jogadores para se juntar a sua guild.", "Nagawa na ang guild! Ikaw ang pinuno. Maaari kang magimbita ng ibang manlalaro para sumali sayo.", ""],
    "You can not invite yourself.": ["No puedes invitarte a ti mismo.", "Voc\xea n\xe3o pode convidar voc\xea mesmo.", "Hindi mo maiimbita ang iyong sarili.", ""],
    "You do not have invite powers, ask the guild leader to invite.": ["Usted no tiene los poderes para invitar, p\xeddele al l\xedder del guild que lo invite.", "Voc\xea n\xe3o tem poder para convidar, pe\xe7a para o l\xedder da guild convidar.", "Wala kang power para magimbita, tanong mo ang iyong pinuno para gawin para sayo.", ""],
    "You sent a request to this player already.\n\nRe-enter to the server to send him again.": ["Usted ya le ha enviado una solicitud a este usuario.\n\nRe-ingresa al server para invitarlo otra vez.", "Voc\xea j\xe1 enviou uma solicita\xe7\xe3o para este jogador.\n\nRe-entre no server para mandar novamente.", "Nagpadala ka ng request sa player na ito dati.\n\nSubukan na pumasok muli sa server at i-send muli", ""],
    "Guild is full.": ["El guild est\xe1 lleno.", "A guild est\xe1 cheia.", "Puno na ang guild.", ""],
    "This player is already in a guild. Ask him to leave his current guild before you can invite him/her.": ["Este usuario ya tiene guild. Preg\xfantale si puede dejar su actual guild antes de inivtarlo(a)", "Este jogador j\xe1 possui uma guild. Pe\xe7a para ele sair de sua guild atual antes de voc\xea convidar ele/ela.", "Nasa guild na ang itong player, pakisabi na umalis muna siya sa kanyang guild upang maimbita mo siya", ""],
    "Guild Invite Sent": ["Solicitud de guild enviada", "Convite de Guild enviado", "Napadala na ang guild invite", ""],
    "You asked %% to join your guild.\n\nWhen he approves your request he will join the guild.": ["Le pediste a %% que se una a tu Guild.\n\nCuando apruebe tu solicitud, se unir\xe1 a tu guild.", "Voc\xea pediu %% para se juntar a sua guild.\n\nQuando ele aceitar seu pedido, ele ir\xe1 se juntar a guild.", "Tinanong mo si %% na sumali sa iyong guild.\n\n Pag nagaprove siya, kasali na siya sa iyong guild", ""],
    "You have 1 Free name change": ["Tienes un cambio de nick gratis", "", "Mayroon kang isang libreng change name", ""],
    "Name Change costs 4,000 Cash": ["Cambiarte de nick cuesta 4,000 Cash", "", "Ang halaga ng pagpalit ng pangalan ay 4,000 cash", ""],
    "Joined Guild :)": ["Guild Registrado :)", "", "Nakasali sa guild", ""],
    "You have joined the guild.\n\nYou can now see where is your friend in your Guild Tab, and private chat even at different rooms.": ["Usted se a unido al guild.\n\nAhora puede ver donde esta tu amigo en tu Guild , chat privado incluso en sala diferentes.", "", "Nakasali ka na sa guild.\n\nMaaari mo nang makita ang mga kaibigan mo sa guild tab, sa private chat o sa ibang kwarto pa man", ""],
    "Guild leader can not leave his guild while there are other members. If you are the last one to leave, the guild will be closed and deleted.": ["El lider no puede salir del Guild , mientras que hay otros miembros . si usted es el ultimo en salir , el Guild sera cerrado y eliminado", "", "Ang guild leader ay hindi maaaring umalis sa guild niya habang mayroon pang mga miyembro. Kapag ikaw ang huli na aalis, ang guild ay sasarado na", ""],
    "Nobody left in the guild, so the guild was closed. The name is now available for new guilds.": ["Nadie se queda en el Guild , por que el Guild estaba cerrado . El nombre ya esta disponible para nuevos Guilds.", "", "Wala nang nasa guild, kaya sarado na ito. Maaari na ito kunin ng ibang mga tao", ""],
    "You left your guild...\n\nHow sad... :(": ["Dejo su Guild .... \n\n!Que Triste ... :(", "", "Umalis ka sa iyong guild...\n\nNakakalungkot...", ""],
    "Nothing to do": ["Nada que hacer", "", "Walang magawa", ""],
    "The new name is the same as your current name.": ["El nuevo nick es igual a tu actual nick.", "", "Ang bagong pangalan na pinili mo ay pareho sa pangalan mo sa kasalukuyan", ""],
    "Name length must be 2-15": ["El nombre debe contener 2-15", "", "Ang haba ng pangalan ay kinakailangan sa gitna ng 2-15", ""],
    "Name must contain at least 2 english letters a-z/A-Z": ["El nombre debe conecter aunque sea 2 letras a-z/A-Z", "", "Ang pangalan ay dapat mayroong hindi kukulang na 2 English letters a-z/A-Z", ""],
    "Name contains a character that is not allowed.<p>Allowed chars": ["El nombre contiene un caracter no permitido <p> caracteres permitidos.", "", "Ang pangalan ay mayroong letra na hindi maaaring gamitin.<p>Mga allowed na chars", ""],
    "Not enough cash.<p>Name change costs 4,000 cash.": ["No Tiene suficiente cash.<p>El cambio de nick cuesta 4,000 Cash.", "", "Hindi sapat ang cash mo.<p>Ang name change ay 4,000 Cash", ""],
    "The new name contains a word which is not allowed. Please select a different one.": ["El nuevo nombre contiene una palabra que no esta permitida. Por favor seleccione uno diferente", "", "Ang bagong pangalan ay mayroong salita na hindi maaaring gamitin. Pumili ng iba", ""],
    "Not enough time passed since last name change. Check that your name was not changed already, if you change again, it will cost you again.<br>Please wait 30 minutes before you can change again.": ["No a pasado mucho tiempo desde el ultimo cambio de nick. Compruebe si su nick no a cambiado ya, si lo cambia otra vez, le costara nuevamente.<br> Por favor espere 30 minutos antes de cambiar de nuevo.", "", "Kinulangan ng oras dahil sa pagchange name mo. Tignan muli, pagnagchange ka ulit ay kinakailangan mo bayaran muli.<br>Maghintay ng 30 minuto upang makapagpalit muli", ""],
    "This name already exists, please select a different one.": ["Este nombre ya existe, por favor seleccione uno diferente.", "", "Mayroon nang ganitong pangalan, kung maaari lamang ay pumili ng iba", ""],
    "New Challenge Unlocked": ["Nuevo Desafio Desbloqueado", "", "Nagunlock ang bagong challenge", ""],
    "You killed my friend! Do you think you are so good?\n\nI challenge you for a duel!\n\nI will be waiting for you...": ["Usted mat\xf2 a mi amigo! \xbfTe crees tan bueno?  ", "", "Pinatay mo ang aking kaibigan! Kala mo ang galing mo?\n\nI Gusto kitang kalabanin para sa duel!\n\nHihintayin kita...", ""],
    "Not enough Cash. You can get more by charging.": ["No hay suficiente Cash. Puedes obtener mas recargando.", "", "Hindi sapat ang cash mo. Maaari kang makakuha ng masmarami sa paraan ng pagcharge", ""],
    "Not enough Gold. You can get more by playing.": ["No hay suficiente Oro. Puedes obtener mas jugando.", "", "Hindi sapat ang gold mo. Maaari kang makakuha pa sa paraan ng paglalaro", ""],
    "This avatar is not for your gender.": ["Este avatar no es para tu genero.", "", "Ang avatar na ito ay hindi para sa iyong kasarian", ""],
    Days: ["D\xedas", "Dias", "", ""],
    Hours: ["Horas", "Horas", "", ""],
    Minutes: ["Minutos", "Minutos", "", ""],
    Seconds: ["Segundos", "Segundos", "", ""],
    "Press F5 to reload": ["Presione F5 para recargar", "Pressione F5 para recarregar", "", ""],
    Your: ["Su", "Seu", "", ""],
    "20,000 first players with 1100+ GP will get the (RARE) Beta Flag!<br>200% GP & GOLD for 2 days since open time!<br>2000 Free Cash every day at the Post Button!": ["", "20000 primeros jugadores con 1,100 + GP tendr\xe1n la (RARE) Beta Flag!<br>200% de GP y Oro durante 2 d\xedas desde el tiempo de apertura!<br>2000 caja libre todos los d\xedas en el bot\xf3n \xa1Poste!", "", ""],
    "Welcome to DragonBound": ["Bienvenido a Dragonbound", "Bem-vindo ao DragonBound", "", ""],
    "Next generation online HTML5 realtime multiplayer game.<br><br>Click connect and start playing with your friends :)": ["Generaci\xf3n en l\xednea HTML5 juego multijugador en Siguiente.<br>Haga clic en Conectar y empezar a jugar con tus amigos :)", "Pr\xf3xima gera\xe7\xe3o on-line HTML5 jogo multiplayer.<br>Clique conectar e come\xe7ar a jogar com os seus amigos :)", "", ""],
    "The next generation of HTML5 online multi-player games in your browser!": ["", "A nova gera\xe7\xe3o de jogos HTML5 online multi-jogador em seu navegador!", "", ""],
    "Play with or against your friends from your browser anywhere for free. Shop for avatars to make you stronger. Unlock hidden characters, game modes, and challenges. Meet new friends. Single player option too.": ["", "\xc9 um jogo gratuito onde voc\xea pode jogar com ou contra seus amigos a partir do seu navegador em qualquer lugar, loja de avatares para torn\xe1-lo mais forte, desbloquear personagens ocultos, modos de jogo e desafios. Conhecer novos amigos e jogar sozinho tamb\xe9m.", "", ""],
    "Waiting for an opponent": ["Esperando un oponente", "", "", ""],
    "Tournament not started yet.": ["Torneo No Iniciado Aun.", "", "", ""],
    "Tournament ended.": ["Torneo Terminado.", "", "", ""],
    "Games Now": ["Juegos ahora", "", "", ""],
    "Games Last 5 Minutes": ["Juegos en 5 minutos", "", "", ""],
    "Games Since Server Reset": ["Juegos desde el reinicio del servidor", "", "", ""],
    "Average Waiting Time": ["Promedio de tiempo de espera", "", "", ""],
    "New Password": ["Nueva contrase\xf1a", "", "", ""],
    "Password Changed": ["Contrase\xf1a cambiada", "", "", ""],
    "Change Password": ["Cambiar Contrase\xf1a", "", "", ""],
    "Too Short": ["Demasiado corto", "", "", ""],
    "Too Easy": ["Demasiado facil", "", "", ""],
    Good: ["Bien", "", "", ""],
    "Secret Number": ["Numero Secreto", "", "", ""],
    "Password too short. Length 6+ needed.": ["Contrase\xf1a muy corta. Necesario 6+ caracteres.", "", "", ""],
    "Password too easy to guess. Make it harder.": ["Contrase\xf1a muy f\xe1cil de adivinar. Ponga una mas dificil.", "", "", ""],
    "Secret number too short. Length 6+ needed.": ["Numero secreto muy corto. Necesario 6+ caracteres.", "", "", ""],
    "Secret number too easy to guess. Make it harder.": ["Numero secreto muy f\xe1cil de adivinar. Ponga una mas dificil.", "", "", ""],
    "Set a new password so you can always login to your account even without Facebook.<br><br>Write down your new username!<br><br>(You can change it at [My-Info])": ["Establezca una nueva contrase\xf1a para que siempre pueda acceder a su cuenta, incluso sin Facebook.<br><br>Escriba su nuevo nombre de usuario!<br><br>(Puede cambiarlo en [My-Info])", "", "", ""]
};
Object.freeze(DragonLanguage.prototype);
var i, DragonThemeDefault = {
        lobby_bg: ".",
        room_bg: ".",
        shop_bg: ".",
        ranks: "/static/images/lobby_stuff4.png",
        lobby_stuff: "/static/images/lobby_stuff4.png",
        room_stuff: "/static/images/room_stuff2.png",
        game_stuff: "/static/images/game_stuff3.png?3",
        scores_stuff: "/static/images/scores_stuff.png",
        shop_stuff: "/static/images/shop_stuff3.png",
        bg_full: "/static/images/bg_full3.jpg",
        maps: "/static/images/themes/gl/maps.png",
        map0_name: "Dragon Lava",
        map0_bg: "dragonlava_bg.jpg",
        map0_fg: "dragonlava.jpg",
        map0_bgcolor: "#634a4a",
        map1_name: "Space",
        map1_bg: "space_bg2.jpg",
        map1_fg: "ground_rock.jpg",
        map1_bgcolor: "#5a1400",
        map2_name: "Metropolis",
        map2_bg: "space_bg.jpg",
        map2_fg: "ground_purple.jpg",
        map2_bgcolor: "#634a4a",
        map3_name: "Sea Of Hero",
        map3_bg: "sea_bg2.jpg",
        map3_fg: "ground_leaf.jpg",
        map3_bgcolor: "#84b6ce",
        map4_name: "Lion Jungle",
        map4_bg: "forest_bg.jpg",
        map4_fg: "ground_forest.jpg",
        map4_bgcolor: "#84b6ce",
        map5_name: "Dragon",
        map5_bg: "xmas_bg2.jpg",
        map5_fg: "ground_xmas.jpg",
        map5_bgcolor: "#94424a",
        map6_name: "Cozy Tower",
        map6_bg: "sky_bg.jpg",
        map6_fg: "ground_leaf.jpg",
        map6_bgcolor: "#8c5a31",
        map7_name: "Dummy Slope",
        map7_bg: "sea_bg3.jpg",
        map7_fg: "ground_purple.jpg",
        map7_bgcolor: "#de7329",
        map8_name: "Thousand Sunny",
        map8_bg: "thousandsunny_bg.jpg",
        map8_fg: "ground_thousandsunny.jpg",
        map8_bgcolor: "#39314a",
        map9_name: "Mayan",
        map9_bg: "balloon_bg.jpg",
        map9_fg: "ground_maya.jpg",
        map9_bgcolor: "#ac5008",
        map10_name: "Cave",
        map10_bg: "xmas_bg.jpg",
        map10_fg: "ground_purple.jpg",
        map10_bgcolor: "#634a4a",
        map11_name: "Secret",
        map11_bg: "sea_bg4.jpg",
        map11_fg: "ground_xmas.jpg",
        map11_bgcolor: "#634a4a"
    },
    DragonThemeBR = {
        shop_bg: "/static/images/themes/br/shop_bg.jpg",
        ranks: "/static/images/themes/classic/ranks.png",
        lobby_stuff: "/static/images/themes/br/lobby_stuff2.png",
        lobby_bg:"/static/images/themes/br/lobby_bg.jpg",
        maps: "/static/images/themes/classic/maps.png",
        room_bg: "/static/images/themes/br/room_bg.jpg",
        map0_name: "Miramo Town",
        map0_bg: "miramo_bg.jpg",
        map0_fg: "miramo.png",
        map1_name: "Nirvana",
        map1_bg: "nirvana_bg.jpg",
        map1_fg: "nirvana.png",
        map2_bg: "metro_bg.jpg",
        map2_fg: "metro.png",
        map3_bg: "sea_bg.jpg",
        map3_fg: "sea.png",
        map4_name: "Adium Root",
        map4_bg: "adium_bg.jpg",
        map4_fg: "adium.png",
        map5_bg: "dragon_bg.jpg",
        map5_fg: "dragon.png",
        map6_bg: "cozy_bg.jpg",
        map6_fg: "cozy.png",
        map7_bg: "dummy_bg.jpg",
        map7_fg: "dummy.png",
        map8_name: "Star Dust",
        map8_bg: "star_bg.jpg",
        map8_fg: "star.png",
        map9_name: "Meta Mine",
        map9_bg: "metamine_bg.jpg",
        map9_fg: "metamine.png",
        map10_bg: "cave_bg.jpg",
        map10_fg: "cave.png",
        map11_bg: "secret_bg.jpg",
        map11_fg: "secret.png"
    },
    DragonThemeDefaultBR = {};
for (i in DragonThemeDefault) DragonThemeDefaultBR[i] = DragonThemeBR[i] ? DragonThemeBR[i] : DragonThemeDefault[i];
var DragonThemeInUse = DragonThemeDefault;
DragonThemeDefault.lobby_bg = DragonThemeBR.lobby_bg;
function DragonTheme_SetTheme(e) {
    e || (e = {});
    var e = DragonThemeInUse = e,
        o = e.lobby_bg ? e.lobby_bg : DragonThemeDefault.lobby_bg,
        t = e.room_bg ? e.room_bg : DragonThemeDefault.room_bg,
        a = e.shop_bg ? e.shop_bg : DragonThemeDefault.shop_bg,
        n = e.lobby_stuff ? e.lobby_stuff : DragonThemeDefault.lobby_stuff,
        r = e.room_stuff ? e.room_stuff : DragonThemeDefault.room_stuff,
        s = e.game_stuff ? e.game_stuff : DragonThemeDefault.game_stuff,
        d = e.scores_stuff ? e.scores_stuff : DragonThemeDefault.scores_stuff,
        u = e.shop_stuff ? e.shop_stuff : DragonThemeDefault.shop_stuff,
        _ = e.bg_full ? e.bg_full : DragonThemeDefault.bg_full,
        c = e.ranks ? e.ranks : DragonThemeDefault.ranks,
        h = e.maps ? e.maps : DragonThemeDefault.maps;
    for ($("#DragonTheme").text("body {background-image: url(" + _ + ");}\n#channelScreen {background-image: url(" + o + ");}\n#roomScreen {background-image: url(" + t + ");}\n#shopScreen {background-image: url(" + a + ");}\n.rank {background-image: url(" + c + ");background-repeat:no-repeat;}\n.roomMap, #room_map, #RoomOptionsMapImage {background-image: url(" + h + ");background-repeat:no-repeat;}\n.zotata-chat-icon,.room,.roomExtraInfo,.status,.roomLocked,#dialogCreateRoom,#BrokerLogout,.LobbyButton,.iconModeNormal,.iconModeBoss,.iconModeSame,.gameModeNormal,.gameModeBoss,.gameModeSame,#OptionsDialog,#BrokerRefresh,.players1v1,.players2v2,.players3v3,.players4v4,.players1vB,.players2vB,.players3vB,.players4vB,#CreateRoomPassword,.buttonOK,.buttonCancel,.buttonPrev,.buttonNext,.checkboxOff,.checkboxOn,.CheckboxOff,.CheckboxOn,.AlertBox,#ConnectWithFacebook,#ConnectWithPassword,#buttonRanking,#dialogCreateLocked,#RoomOptionsModeLocked,#OptionsOK,#OptionsLeave,.RadioOn,.RadioOff,#infoAddBuddy,#infoGuildInvite,.chatDialogDelete,.chatDialogGuildKick,.roomBuddy,.roomGuildMember,#guild_create,#guild_leave,.BrokerChannel,.paypal_corner,.buttonClose,#new_img,.BrokerChannelFullIcon,.imgLock {background-image: url(" + n + ");background-repeat:no-repeat;}\n#roomButtonBack,#roomButtonChangeTeam,.buttonMobile,.roomPlayerInfo,.roomPlayerNotReady,.roomPlayerReady,.roomPlayerMaster,.roomPlayerShadow,.roomBotSelect,.roomBotRemove,.roomPlayerBalloonTip,#room_timer,.GamePlayerBalloonTip,#room_change_title_button,#room_options_button,#add_bot_button,#playerInfoDialog,#infoRankingTab,#infoChat,#infoClose,.ChatDialog,.chatDialogClose,#room_item_buddy_tab,#dialog_room_options {background-image: url(" + r + ");background-repeat:no-repeat;}\n.weather-0,.weather-1,#message_over_items.items_locked,#message_over_items.sudden_death,#gameui,#powerBar,#powerMark,.Turn,.DamageDigit,.LastAngleDigit,.UIGoldDigit,#btnShot1,#btnShot2,#btnShotSS,#btnPass,#btnEsc,#last_power_mark,#all_chat,#team_chat,.turn_line_number,#slice_drag_button,.imgS1 {background-image: url(" + s + ");background-repeat:no-repeat;}\n#game_over,#scores_lose_a,#scores_lose_b,.score,.score_me {background-image: url(" + d + ");background-repeat:no-repeat;}\n.shopButton,.shop_item,.shop_item_icon,.stat_icon,.stat_font,.shop_my_item,.shop_my_item_cash,.shop_my_item_gift,.shop_my_item_icon,.shop_my_item_equip.equipped,#shop_buy_dialog {background-image: url(" + u + ");background-repeat:no-repeat;}\n"), n = $("#channelName,#channel,#channelInput"), s = $("#playersList"), r = $("#myInfoBox"), "." == o ? (n.addClass("TBGnBorder"), s.addClass("TBG"), r.show()) : (n.removeClass("TBGnBorder"), s.removeClass("TBG"), r.hide()), r = $("#shopOverly"), "." == a ? r.show() : r.hide(), n = $("#roomChat,#roomInput"), o = $("#room_map"), a = $("#room_options_button"), r = $("#roomOverly"), "." == t ? (n.addClass("TBGnBorder"), o.addClass("room_map_fix"), a.addClass("room_options_button_fix"), r.show()) : (n.removeClass("TBGnBorder"), o.removeClass("room_map_fix"), a.removeClass("room_options_button_fix"), r.hide()), t = 0; t < MAPS.length; t++) SetMapBgFgColor(t, e["map" + t + "_bg"] ? e["map" + t + "_bg"] : DragonThemeDefault["map" + t + "_bg"], e["map" + t + "_fg"] ? e["map" + t + "_fg"] : DragonThemeDefault["map" + t + "_fg"], e["map" + t + "_bgcolor"] ? e["map" + t + "_bgcolor"] : DragonThemeDefault["map" + t + "_bgcolor"], e["map" + t + "_name"] ? e["map" + t + "_name"] : DragonThemeDefault["map" + t + "_name"]);
    e.mobiles_hack ? (MOBILES[MOBILE.ARMOR] = {
        file: "armor",
        player_x: 17,
        player_y: -28,
        explodes: [EXPLODE.ARMOR1, EXPLODE.ARMOR2, EXPLODE.ARMORSS],
        bullets: [BULLETS.ARMOR1, BULLETS.ARMOR2, BULLETS.ARMORSS, BULLETS.ARMOESS2],
        graphics: [
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37],
            [36, 40, 21, 37]
        ]
    }, MOBILES[MOBILE.ICE].file = "ice", BULLET[BULLETS.ICE1].file = "ice1", BULLET[BULLETS.ICE2].file = "ice2", BULLET[BULLETS.ICESS].file = "iceSS", EXPLODES[EXPLODE.ICE1].file = "ice1", EXPLODES[EXPLODE.ICE2].file = "ice2", EXPLODES[EXPLODE.ICESS].file = "iceSS", MOBILES[MOBILE.ASATE] = {
        file: "asate",
        player_x: -2,
        player_y: -30,
        explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
        bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
        graphics: [
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 31, 25, 33],
            [44, 31, 25, 33],
            [44, 31, 25, 33],
            [44, 31, 25, 33],
            [44, 31, 25, 33],
            [44, 31, 25, 33],
            [44, 31, 25, 33],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32],
            [44, 30, 25, 32]
        ],
        ion_file: "asateIon",
        ion_graphics: [
            [32, 19, 16, 9],
            [32, 18, 16, 9],
            [32, 17, 16, 8],
            [32, 15, 16, 7],
            [32, 14, 16, 7],
            [32, 12, 16, 6],
            [32, 14, 16, 7],
            [32, 17, 16, 9],
            [32, 17, 16, 9],
            [32, 17, 16, 9],
            [32, 14, 16, 7],
            [32, 12, 16, 6],
            [32, 13, 16, 7],
            [32, 15, 16, 8],
            [32, 17, 16, 9],
            [32, 18, 16, 9],
            [32, 19, 16, 10],
            [32, 20, 16, 10],
            [32, 20, 16, 10],
            [32, 20, 16, 10]
        ]
    }) : InitGlobals(), DragonTheme_Save()
}

function DragonTheme_Save() {
    3e3 > DragonTheme_ToJSON(!0).length && setCookie("theme", DragonTheme_ToJSON(!0))
}

function DragonTheme_Load() {
    "br" == SERVER_TYPE && (DragonThemeDefault = DragonThemeDefaultBR), DragonTheme_SetThemeFromJSON(getCookie("theme")) || DragonTheme_SetThemeFromJSON()
}

function DragonTheme_ChangeOneProperty(e, o, t) {
    return DragonThemeDefault[e] ? (o || (o = void 0), DragonThemeInUse[e] == o) ? 0 : (o && t && DoesFileExist(o, !1, function(o) {
        t(e, o)
    }), DragonThemeInUse[e] = o, DragonTheme_SetTheme(DragonThemeInUse), 1) : 0
}

function DragonTheme_GetValue(e) {
    return DragonThemeInUse[e] != DragonThemeDefault[e] ? DragonThemeInUse[e] : ""
}

function DragonTheme_ToJSON(e) {
    var o = JSON.stringify(DragonThemeInUse);
    return "{}" == o ? o = "" : e || (o = o.replace(/","/g, '",\n"')), o
}

function DragonTheme_SetThemeFromJSON(e) {
    if (DragonTheme_ToJSON() == e) return 0;
    try {
        var o = e ? JSON.parse(e) : {};
        return DragonTheme_SetTheme(o), 1
    } catch (t) {
        return -1
    }
}

function classic() {
    for (var e in DragonThemeDefaultBR)(0 == e.indexOf("map") && -1 == e.indexOf("_name") || 0 == e.indexOf("ranks")) && (DragonThemeInUse[e] = DragonThemeDefaultBR[e]);
    DragonThemeInUse.mobiles_hack = 1, DragonTheme_SetTheme(DragonThemeInUse), alertify.alert("Maps/Ranks/Mobiles HACK Activated! ;)<br><br>(You can disable or edit it at the options window)<br><br>")
}
var g_last_shot_sound_time, PLAYER_LOOK_LEFT = 0,
    PLAYER_LOOK_RIGHT = 1,
    DIV_TO_CREATE_GAME_OBJECTS = "#game_objects",
    TURN_TIME = 20,
    KEY = {
        Backspace: 8,
        Tab: 9,
        Enter: 13,
        Ctrl: 17,
        Esc: 27,
        Space: 32,
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121
    };

function CShot(e, o, t, a, n, r) {
    if (!(this instanceof arguments.callee)) throw Error("Constructor called as a function");
    var s = function(e, o, t, a, n, r) {
        this.x0 = e, this.y0 = o, this.v = new Vector(t, a), this.ax = n, this.ay = r
    };
    s.prototype.GetPosAtTime = function(e) {
        return e /= 1e3, {
            x: this.x0 + this.v.x * e + this.ax * e * e / 2,
            y: this.y0 + this.v.y * e + this.ay * e * e / 2
        }
    }, s.prototype.GetAngleAtTime = function(e) {
        var o = this.GetPosAtTime(e - 10),
            e = this.GetPosAtTime(e + 10);
        return RadToAngle(Math.atan2(e.y - o.y, e.x - o.x))
    }, this.shot = o, this.unique_id = e, this.div_id = "#Shot" + e, this.div_id2 = "#ShotB" + e, this.pic_div_id = this.div_id + " " + this.div_id2, this.start_time = get_time(), this.zp = new s(o.start.x, o.start.y, o.start.ang, o.start.power, o.start.ax, o.start.ay), this.callback_finish = a, this.created_div = !1, this.is_camera_focus = t, this.thor = o.thor, this.shooting_player = n, this.game = r, o.ss && $("#ss_shot_background").fadeIn(), this.shot.start.t || this.CreateDiv();
    var d = this;
    this.interval = setInterval(function() {
        d.update()
    }, 30)
}

function CDamageEffect(e, o, t, a, n, r) {
    if (!(this instanceof arguments.callee)) throw Error("Constructor called as a function");
    var t = Math.round(t),
        s = r ? "Blue" : "Red";
    !r && 0 < t && (s = "Green");
    var d = "#DamageEffect_" + a + "_" + n + "_" + s + (0 <= t ? "P" : "-"),
        u = $(d);
    0 < u.length && (t += Number(u.attr("damage")), e = Number(u.attr("x")), o = Number(u.attr("y")), $(d).remove()), u = String(t), "Red" != s && 0 < t && (u = "+" + u);
    for (var _ = '<div class="DamageEffect" damage=' + t + " x=" + e + " y=" + o + ' id="' + d.slice(1) + '" style="left: ' + e + "px; top: " + o + 'px;">', c = 0; c < u.length; c++) {
        var h = u.charCodeAt(c);
        45 == h ? _ += '<div class="DamageDigit DamageDigit' + s + '-" style="left:' + 14 * c + 'px;"></div>' : 43 == h ? _ += '<div class="DamageDigit DamageDigit' + s + 'P" style="left:' + 14 * c + 'px;"></div>' : 48 <= h && 57 >= h && (_ += '<div class="DamageDigit DamageDigit' + s + (h - 48) + '" style="left:' + 14 * c + 'px;"></div>')
    }
    $(DIV_TO_CREATE_GAME_OBJECTS).append(_ + "</div>"), setTimeout(function() {
        $(d).animate({
            top: "-=30"
        })
    }, 10), setTimeout(function() {
        $(d).fadeOut(3e3, function() {
            $(d).remove()
        })
    }, 2e3)
}

function DragonBound(e, o, t) {
    if (!(this instanceof arguments.callee)) throw Error("[DragonBound] Constructor called as a function");
    if (!e) throw Error("[DragonBound] missing my_user_id");
    var a = o[0],
        n = o[1],
        r = o[2],
        s = o[3],
        d = o[4],
        u = o[5],
        _ = o[6],
        c = o[7],
        h = o[8],
        p = o[9],
        m = o[11],
        f = o[10],
        y = this;
    this.my_user_id = e, this.my_player_index = this.my_player_number = -1, this.queue = [], this.is_queue_executing = !1, this.players = [], this.shots = [], this.isInMapDraggin = !1, this.turn = -1, this.after_shot_chat = [], this.after_shot_gold = void 0, this.steps = this.no_ss_turns = 0, this.sudden_death_at_turn = 40, this.t = random(10, 20), this.s = random(60, 70), this.is_s1_disabled = f, this.dn = t, this.camera = new CCamera(p, function(e, o) {
        y.OnCameraUpdate(e, o)
    }), $(DIV_TO_CREATE_GAME_OBJECTS).children().remove(), this.UnselectAllItems(), this.UpdateGuiGold(0), $("#last_power_mark").css("left", 240), $("#game_over").hide(), $("#game_replay").hide(), this.SetBinds(), $(".Player .GamePlayerBalloon").hide(), $(".Player .GamePlayerBalloonTip").hide(), $(".Player .Turn").hide(), $("#powerBar").css("width", 1), $("#walkBar").css("width", 400), $("#gameInput").val(""), $("#gameChatHtml").html(""), $("#gameChat .scrollbar").hide(), $("#ss_shot_background").removeClass("sudden_death").hide(), $("#message_over_items").removeClass().hide(), $("#thor").css({
        left: 680,
        top: 0
    }), $("#thor_rotate").children().not("#thor_laser").remove(), this.thor_obj = new CAnimatedObject("thor", "thor.png", 0, 0, 159, 99, 97, 58, "#thor_rotate", 1, 20, 50, !1, g_graphics_high ? 1 : 3), TeamChatOff(), this.SetWeather(_), this.UpdateWind([c, h]), this.UpdateThor([r, s, d, u]), this.next_turn = n, this.ground = new CGround(p), this.CreatePlayers(a), this.UpdateTurnList(), f ? ($("#btnShot1").hide(), SelectShotType(1, void 0), this.ChangedShot(1)) : ($("#btnShot1").show(), SelectShotType(0, void 0), this.ChangedShot(0)), $("#btnShotSS").show(), this.StartNextTurn(), this.QueueUnblock(), $(".EventGameMsg1").remove(), 1 == m && $("#game_front").append($('<div class="EventGameMsg1 blackShadow">- ' + l.t("Event Game") + " -<br>" + l.t("Losing Team Wins!<br>Double GP & Gold!") + "</div>"))
}
CShot.prototype.CreateDiv = function() {
    if (this.thor) {
        var e = 3e3;
        this.shot.hole && (e = Math.round(Dist2Points(this.shot.start.x, this.shot.start.y, this.shot.hole[0], this.shot.hole[1]))), this.game.ThorShoot(this.shot.start.x, this.shot.start.y, this.shot.start.ang, e), this.Remove(), this.callback_finish(this.unique_id)
    } else {
        (e = BULLET[this.shot.img]) && e.file ? ($(DIV_TO_CREATE_GAME_OBJECTS).append('<div class="Shot" id="' + this.div_id.slice(1) + '"><div id="' + this.div_id2.slice(1) + '"></div></div>'), this.anim_obj = new CAnimatedObject2("bullets/" + e.file + ".png", e.graphics, 0, 0, this.div_id2, 1, 20, !1, LOOP_NORMAL, 0, 19, !0)) : $(DIV_TO_CREATE_GAME_OBJECTS).append('<div class="Shot" id="' + this.div_id.slice(1) + '"><div class="shot_img shot_img_' + this.shot.img + '" id="' + this.div_id2.slice(1) + '"></div></div>'), this.created_div = !0;
        var o = get_time();
        (void 0 == g_last_shot_sound_time || o >= g_last_shot_sound_time + 10) && e && (g_last_shot_sound_time = o, this.shot.is_lightning || AudioPlay(e.sound)), e.ion ? $("#ss_shot_background").is(":visible") ? this.shooting_player.SetIon(this.shot.start.ang, this.shot.start.x - this.shooting_player.x, this.shot.start.y - this.shooting_player.y, 100) : this.shooting_player.SetIon(this.shot.start.ang) : e.ion_height && this.shooting_player.SetIon(void 0, 0, 1 == e.ion_height ? -200 : -600, 500)
    }
}, CShot.prototype.update = function() {
    var e = get_time() - this.start_time;
    if (void 0 != this.shot.start.t) {
        if (!(e >= this.shot.start.t)) return;
        e -= this.shot.start.t, this.created_div || this.CreateDiv()
    }
    if (!this.thor) {
        if (e >= this.shot.time) this.Remove(), this.callback_finish(this.unique_id);
        else {
            var o = this.zp.GetPosAtTime(e),
                t = this.zp.GetAngleAtTime(e);
            $(this.div_id).css({
                left: o.x,
                top: o.y
            }), $(this.pic_div_id).css({
                rotate: +t + "deg"
            }), this.shot.change && e >= this.shot.change.at && $(this.pic_div_id).removeClass().addClass("shot_img shot_img_" + this.shot.change.img), this.is_camera_focus && 500 < e && !this.game.isInMapDraggin && this.game.camera.FocusAt(o.x, o.y, !0, !0)
        }
    }
}, CShot.prototype.Remove = function() {
    if (this.interval = clearInterval(this.interval), $(this.div_id).remove(), this.anim_obj && this.anim_obj.remove(), this.shot.ss) {
        var e = BULLET[this.shot.img],
            o = this.shooting_player;
        setTimeout(function() {
            e.ion_ss && o.SetIon(void 0, 0, -200, 400), $("#ss_shot_background").fadeOut()
        }, 1e3)
    }
}, Object.freeze(CShot.prototype), DragonBound.prototype.ChatReceived = function(e, o, t) {
    debug && console.log("Game.ChatReceived:", e, o, t);
    var a, n, r = this.players.length;
    for (a = 0; a < r; a++)(n = this.players[a]) && n.name == o && 1e8 > n.user_id && n.Chat(e, t)
}, DragonBound.prototype.UIShootStart = function() {
    if (!(0 > this.my_player_index) && this.turn == this.my_player_number && !this.intervalDoSpace) {
        this.UIWalkLeftEnd(), this.UIWalkRightEnd(), $("#powerBar").css("width", 0);
        var e = this,
            o = get_time();
        this.intervalDoSpace = setInterval(function() {
            var t = (get_time() - o) / 10;
            $("#powerBar").css("width", t), 400 <= t && e.Shoot(400)
        }, 10)
    }
}, DragonBound.prototype.UIShootEnd = function() {
    0 > this.my_player_index || this.intervalDoSpace && this.Shoot(Number($("#powerBar").css("width").slice(0, -2)))
}, DragonBound.prototype.UIWalkLeftStart = function() {
    if (!(0 > this.my_player_index)) {
        if (this.turn == this.my_player_number) {
            if (!this.intervalDoLeft) {
                var e = this,
                    o = get_time(),
                    t = 0;
                this.intervalDoLeft = setInterval(function() {
                    var a = Math.floor((get_time() - o) / 20),
                        n = a - t;
                    if (200 < e.steps + n && (n = 200 - e.steps), 200 <= e.steps) e.players[e.my_player_index].Look(PLAYER_LOOK_LEFT);
                    else {
                        for (var r = 0; r < n && !1 != e.players[e.my_player_index].Walk(PLAYER_LOOK_LEFT); r++);
                        n = r
                    }
                    e.steps += n, t = a, $("#walkBar").css("width", 400 - 2 * e.steps)
                }, 20)
            }
        } else this.players[this.my_player_index].Look(PLAYER_LOOK_LEFT)
    }
}, DragonBound.prototype.UIWalkLeftEnd = function() {
    0 > this.my_player_index || (this.intervalDoLeft = clearInterval(this.intervalDoLeft))
}, DragonBound.prototype.UIWalkRightStart = function() {
    if (!(0 > this.my_player_index)) {
        if (this.turn == this.my_player_number) {
            if (!this.intervalDoRight) {
                var e = this,
                    o = get_time(),
                    t = 0;
                this.intervalDoRight = setInterval(function() {
                    var a = Math.floor((get_time() - o) / 20),
                        n = a - t;
                    if (200 < e.steps + n && (n = 200 - e.steps), 200 <= e.steps) e.players[e.my_player_index].Look(PLAYER_LOOK_RIGHT);
                    else {
                        for (var r = 0; r < n && !1 != e.players[e.my_player_index].Walk(PLAYER_LOOK_RIGHT); r++);
                        n = r
                    }
                    e.steps += n, t = a, $("#walkBar").css("width", 400 - 2 * e.steps)
                }, 20)
            }
        } else this.players[this.my_player_index].Look(PLAYER_LOOK_RIGHT)
    }
}, DragonBound.prototype.UIWalkRightEnd = function() {
    0 > this.my_player_index || (this.intervalDoRight = clearInterval(this.intervalDoRight))
}, DragonBound.prototype.UIAngleUpStart = function() {
    if (!(0 > this.my_player_index) && !this.intervalDoUp && !this.intervalDoDown) {
        var e = this,
            o = get_time(),
            t = this.players[this.my_player_index].ang;
        this.intervalDoUp = setInterval(function() {
            var a = t + Math.floor((get_time() - o) / e.s) * (90 < e.players[e.my_player_index].minang ? -1 : 1);
            e.players[e.my_player_index].ChangeAngleTo(a)
        }, this.t)
    }
}, DragonBound.prototype.UIAngleUpEnd = function() {
    0 > this.my_player_index || (this.intervalDoUp = clearInterval(this.intervalDoUp))
}, DragonBound.prototype.UIAngleDownStart = function() {
    if (!(0 > this.my_player_index) && !this.intervalDoDown && !this.intervalDoUp) {
        var e = this,
            o = get_time(),
            t = this.players[this.my_player_index].ang;
        this.intervalDoDown = setInterval(function() {
            var a = t - Math.floor((get_time() - o) / e.s) * (90 < e.players[e.my_player_index].minang ? -1 : 1);
            e.players[e.my_player_index].ChangeAngleTo(a)
        }, this.t)
    }
}, DragonBound.prototype.UIAngleDownEnd = function() {
    0 > this.my_player_index || (this.intervalDoDown = clearInterval(this.intervalDoDown))
}, DragonBound.prototype.UINextShot = function() {
    0 > this.my_player_index || (this.is_s1_disabled ? SelectShotType(1 == GetSelectedShotType() && $("#btnShotSS").is(":visible") ? 2 : 1, this) : SelectShotType((GetSelectedShotType() + 1) % 3, this))
}, DragonBound.prototype.ChangedShot = function(e) {
    0 > this.my_player_index || this.players[this.my_player_index].ChangedShot(e)
}, DragonBound.prototype.UIDragStart = function(e) {
    0 > this.my_player_index || (this.drag_start_x = e)
}, DragonBound.prototype.UIDragMove = function(e) {
    0 > this.my_player_index || (1 > (e = (e - this.drag_start_x) / 1.5) && (e = 1), 400 < e && (e = 400), $("#powerBar").css("width", e), 400 <= e && this.UIDragEnd())
}, DragonBound.prototype.UIDragEnd = function() {
    0 > this.my_player_index || this.Shoot(Number($("#powerBar").css("width").slice(0, -2)))
}, DragonBound.prototype.UseItem = function(e) {
    if (!(0 > this.my_player_index)) {
        var o = $("#gameItemSlot" + e);
        o.hasClass("item") ? o.hasClass("Pressed") ? o.removeClass("Pressed") : ($(".item").removeClass("Pressed"), o.addClass("Pressed"), this.turn == this.my_player_number && this.UsePressedItem(e)) : 0 < e && $("#gameItemSlot" + --e).hasClass("big") && this.UseItem(e)
    }
}, DragonBound.prototype.UsePressedItem = function(e) {
    if (!(0 > this.my_player_index)) {
        for (e = void 0 != e ? e : 0; 6 > e; e++)
            if ($("#gameItemSlot" + e).hasClass("Pressed")) {
                this.players[this.my_player_index].UseItem(e);
                break
            }
    }
}, DragonBound.prototype.UnselectAllItems = function() {
    for (var e = 0; 6 > e; e++) $("#gameItemSlot" + e).removeClass("Pressed")
}, DragonBound.prototype.SetBinds = function() {
    function e(e) {
        return (e = e || window.event).preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, e.returnValue = !1
    }
    var o = this;
    $("#btnShoot").bind("mousedown touchstart", function() {
        o.UIShootStart()
    }), $("#btnShoot").bind("mouseup touchend", function() {
        o.UIShootEnd()
    }), $("#btnLeft").bind("mousedown touchstart", function() {
        o.UIWalkLeftStart()
    }), $("#btnLeft").bind("mouseup touchend", function() {
        o.UIWalkLeftEnd()
    }), $("#btnRight").bind("mousedown touchstart", function() {
        o.UIWalkRightStart()
    }), $("#btnRight").bind("mouseup touchend", function() {
        o.UIWalkRightEnd()
    }), $("#btnUp").bind("mousedown touchstart", function() {
        o.UIAngleUpStart()
    }), $("#btnUp").bind("mouseup touchend", function() {
        o.UIAngleUpEnd()
    }), $("#btnDown").bind("mousedown touchstart", function() {
        o.UIAngleDownStart()
    }), $("#btnDown").bind("mouseup touchend", function() {
        o.UIAngleDownEnd()
    }), $(document).bind("keydown", function(e) {
        switch ($("#touch_ui").is(":visible") && $("#touch_ui").fadeOut("slow"), e.which) {
            case KEY.Left:
                $("#gameInput").is(":focus") || (o.UIWalkLeftStart(), e.preventDefault(), e.stopPropagation());
                break;
            case KEY.Right:
                $("#gameInput").is(":focus") || (o.UIWalkRightStart(), e.preventDefault(), e.stopPropagation());
                break;
            case KEY.Up:
                o.UIAngleUpStart(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Down:
                o.UIAngleDownStart(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Space:
                $("#gameInput").is(":focus") || $(".chatDialogInput").is(":focus") || !g_is_game_slice || (o.UIShootStart(), e.preventDefault(), e.stopPropagation());
                break;
            case KEY.F8:
                o.PassTurnClicked(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Tab:
                o.UINextShot(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F1:
                o.UseItem(0), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F2:
                o.UseItem(1), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F3:
                o.UseItem(2), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F4:
                o.UseItem(3), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F5:
                o.UseItem(4), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F6:
                o.UseItem(5), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F9:
                TeamChatToggle(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Ctrl:
                $(document.activeElement).is("input") || e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Esc:
                ToggleOptionsDialog(!0), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F10:
                $("#friendsList").is(":visible") ? $("#friendsList").hide() : $("#friendsList").show().tinyscrollbar_update("top"), e.preventDefault(), e.stopPropagation()
        }
    }), $(document).bind("keyup", function(e) {
        switch (e.which) {
            case KEY.Left:
                o.UIWalkLeftEnd(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Right:
                o.UIWalkRightEnd(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Up:
                o.UIAngleUpEnd(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Down:
                o.UIAngleDownEnd(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Space:
                o.UIShootEnd(), e.preventDefault(), e.stopPropagation();
                break;
            case KEY.Ctrl:
                $(document.activeElement).is("input") || e.preventDefault(), e.stopPropagation();
                break;
            case KEY.F1:
            case KEY.F2:
            case KEY.F3:
            case KEY.F4:
            case KEY.F5:
            case KEY.F6:
            case KEY.F9:
            case KEY.Tab:
                e.preventDefault(), e.stopPropagation()
        }
    }), $("#gameui").bind("mousedown", function(e) {
        return e.stopPropagation(), !1
    }), $(document).bind("mousedown", function(e) {
        2 == e.button ? (o.lastDragX = e.pageX, o.lastDragY = e.pageY, o.isInMapDraggin = !0, $("#container").addClass("HandCursor")) : 0 != e.button || 0 > this.my_player_index || g_is_game_slice || o.turn != o.my_player_number || (o.isInDrag = !0, o.UIDragStart(e.pageX))
    }), this.func_mouseup = function(e) {
        2 == e.button ? (o.isInMapDraggin = !1, $("#container").removeClass("HandCursor")) : 0 == e.button && o.isInDrag && (o.isInDrag = !1, o.UIDragMove(e.pageX), o.UIDragEnd())
    }, $(document).bind("mouseup", this.func_mouseup), $(document).bind("mousemove", function(e) {
        o.isInDrag && o.UIDragMove(e.pageX), o.isInMapDraggin && (o.camera.MoveBy(o.lastDragX - e.pageX, o.lastDragY - e.pageY, !1), o.lastDragX = e.pageX, o.lastDragY = e.pageY), e.stopPropagation()
    });
    var t = document.getElementById("touch_ui");
    t.ontouchstart = e, t.ontouchmove = e, t.ontouchend = e, t.ontouchcancel = e, $(document).bind("touchstart", function(e) {
        if ($("#touch_ui").show(), !o.intervalDoSpace && !o.intervalDoLeft && !o.intervalDoRight && !o.intervalDoUp && !o.intervalDoDown) {
            if (e.originalEvent.touches && e.originalEvent.touches.length) e = e.originalEvent.touches[0];
            else {
                if (!e.originalEvent.changedTouches || !e.originalEvent.changedTouches.length) return;
                e = e.originalEvent.changedTouches[0]
            }
            o.lastDragX = e.pageX, o.lastDragY = e.pageY, o.isInMapDraggin = !0, e.preventDefault()
        }
    }), $(document).bind("touchend", function() {
        o.isInMapDraggin = !1
    }), $(document).bind("touchmove", function(e) {
        if (e.preventDefault(), o.intervalDoSpace || o.intervalDoLeft || o.intervalDoRight || o.intervalDoUp || o.intervalDoDown) o.isInMapDraggin = !1;
        else {
            if (e.originalEvent.touches && e.originalEvent.touches.length) e = e.originalEvent.touches[0];
            else {
                if (!e.originalEvent.changedTouches || !e.originalEvent.changedTouches.length) return;
                e = e.originalEvent.changedTouches[0]
            }
            o.isInMapDraggin && (o.camera.MoveBy(o.lastDragX - e.pageX, o.lastDragY - e.pageY, !1), o.lastDragX = e.pageX, o.lastDragY = e.pageY)
        }
    })
}, DragonBound.prototype.Destructor = function() {
    var e;
    for (debug && console.log("Destructor"), $(document).unbind("keydown"), $(document).unbind("keyup"), $(document).unbind("mousedown"), $(document).unbind("mouseup", this.func_mouseup), $(document).unbind("mousemove"), $(document).unbind("touchstart"), $(document).unbind("touchend"), $(document).unbind("touchmove"), $("#btnShoot").unbind("mousedown touchstart"), $("#btnShoot").unbind("mouseup touchend"), $("#btnLeft").unbind("mousedown touchstart"), $("#btnLeft").unbind("mouseup touchend"), $("#btnRight").unbind("mousedown touchstart"), $("#btnRight").unbind("mouseup touchend"), $("#btnUp").unbind("mousedown touchstart"), $("#btnUp").unbind("mouseup touchend"), $("#btnDown").unbind("mousedown touchstart"), $("#btnDown").unbind("mouseup touchend"), this.turnTimeout = clearTimeout(this.turnTimeout), this.intervalDoUp = clearInterval(this.intervalDoUp), this.intervalDoDown = clearInterval(this.intervalDoDown), e = 0; e < this.shots.length; e++) this.shots[e].shot.Remove();
    for (this.shots = [], this.EndTurn(), e = 0; e < this.players.length; e++) this.players[e].Remove();
    $("#powerBar").css("width", 0), $("#turn_timer").hide(), $("#game_over").hide(), $(DIV_TO_CREATE_GAME_OBJECTS).children().remove()
}, DragonBound.prototype.CreatePlayers = function(e) {
    for (var o = 0; o < e.length; o++) {
        var t = !1;
        e[o][1] == this.my_user_id && (this.my_player_number = e[o][0], this.my_player_index = o, t = !0), this.players.push(new CPlayer(e[o], t, this.ground, this.dn))
    }
}, DragonBound.prototype.UpdateTurnList = function() {
    var e, o, t = [];
    0 > this.my_player_index ? o = e = 0 : (e = this.players[this.my_player_index].delay, o = this.players[this.my_player_index].delay_before);
    for (var a = 0; a < this.players.length; a++) {
        var n = this.players[a];
        n.is_alive && t.push({
            rank: n.rank,
            name: n.name,
            user_id: n.user_id,
            team: n.team,
            delay: n.delay,
            lastturn: n.lastturn
        })
    }
    for (t.sort(function(e, o) {
            return e.delay == o.delay ? e.lastturn - o.lastturn : e.delay - o.delay
        }), a = 0; a < t.length; a++) n = 0 < (n = t[a].delay - e) ? "+" + n : n, $("#turn_line" + a + " .turn_line_name").html(t[a].name), $("#turn_line" + a + " .turn_line_rank").removeClass().addClass("turn_line_rank rank rank" + t[a].rank), "A" == t[a].team ? ($("#turn_line" + a + " .turn_line_number").removeClass("turn_line_number_b").addClass("turn_line_number_a turn_line_number" + a), $("#turn_line" + a + " .turn_line_name").removeClass("turn_line_name_b").addClass("turn_line_name_a turn_line_number" + a)) : ($("#turn_line" + a + " .turn_line_number").removeClass("turn_line_number_a").addClass("turn_line_number_b turn_line_number" + a), $("#turn_line" + a + " .turn_line_name").removeClass("turn_line_name_a").addClass("turn_line_name_b turn_line_number" + a)), t[a].user_id == this.my_user_id ? ($("#turn_line" + a).addClass("turn_line_me"), n = e - o) : $("#turn_line" + a).removeClass("turn_line_me"), $("#turn_line" + a + " .turn_line_delay").html(n), $("#turn_line" + a).show();
    for (; 8 > a; a++) $("#turn_line" + a).hide()
}, DragonBound.prototype.UpdatePlayer = function(e) {
    var o = e[0];
    if (o != this.my_player_number) {
        var t = e[1],
            a = e[2],
            e = e[3];
        this.GetPlayerByPlayerNumber(o).MoveTo(t, a, e)
    }
}, DragonBound.prototype.OnCameraUpdate = function(e, o) {
    if (!(20 > Math.abs(this.last_event_left - e) && 20 > Math.abs(this.last_event_top - o))) {
        this.last_event_left = e, this.last_event_top = o;
        for (var t = this.players.length, a = 0; a < t; a++) {
            var n = this.players[a];
            n && n.OnCameraUpdate(e, o)
        }
    }
}, DragonBound.prototype.CreateShot = function(e, o, t, a) {
    var n = this,
        r = function(o) {
            var r;
            for (r = 0; r < n.shots.length; r++)
                if (n.shots[r].id == o) {
                    n.shots.splice(r, 1);
                    break
                } if (e.hole) {
                r = e.hole[0];
                var o = e.hole[1],
                    s = e.hole[2],
                    d = e.hole[3];
                if (0 < s && 0 < d && n.ground.AddGroundHole(r, o, s, d), e.is_lightning && n.CreateLightning(r, o, e.start.ang), CreateExplode(e.exp, r, o), e.damages)
                    for (r = 0; r < e.damages.length; r++) o = n.GetPlayerByPlayerNumber(e.damages[r].n), e.damages[r].hp && o.ChangeHPShield(e.damages[r].hp, e.damages[r].shield ? e.damages[r].shield : 0, t, !0), void 0 != e.damages[r].movex && o.MoveTo(e.damages[r].movex, void 0 != e.damages[r].movey ? e.damages[r].movey : o.y, void 0, !1), e.damages[r].rd && o.SetReducedDefence(e.damages[r].rd);
                for (r = 0; r < n.players.length; r++) n.players[r].Fall()
            }
            if (e.tele)
                for (r = 0; r < e.tele.length; r += 5) {
                    var o = e.tele[r + 1],
                        s = e.tele[r + 2],
                        d = e.tele[r + 3],
                        u = e.tele[r + 4],
                        _ = n.GetPlayerByPlayerNumber(e.tele[r]);
                    _ && (_.MoveTo(o, s, void 0, !0), _.MoveTo(d, u, void 0, !1), _.OnCameraUpdate(n.last_event_left, n.last_event_top), CreateExplode(e.exp, o, s))
                }
            0 == n.shots.length && ((n.ReceivedChatArray(n.after_shot_chat, a.name), n.after_shot_gold && (AudioPlay(AUDIO_GOLD), n.UpdateGuiGold(n.after_shot_gold)), n.UpdateThor(n.after_shot_thor), n.PushWeather(n.after_shot_weather), n.UpdateWind(n.next_wind), 2 < n.queue.length) ? (n.StartNextTurn(), n.QueueUnblock()) : setTimeout(function() {
                n.StartNextTurn(), n.QueueUnblock()
            }, 1e3))
        },
        s = random(0, 999999);
    2 < this.queue.length ? r(s) : this.shots.push({
        id: s,
        shot: new CShot(s, e, o, r, a, this)
    })
};
var GAMEMSG = Object.freeze({
    winning_award: 0,
    losing_consolation: 1,
    x_killed_y: 2,
    x_bunge_y: 3,
    ultra_high_ang: 4,
    high_ang: 5,
    excellent_shot: 6,
    good_shot: 7,
    shot_bonus: 8,
    team_damage_penalty: 9,
    killed_by_sd: 10,
    died_by_tele: 11,
    damage_1000: 12,
    damage_2000: 13,
    damage_3000: 14,
    triple_kill: 15,
    double_kill: 16,
    ending_bonus: 17,
    bunge_bonus: 18,
    suicide_penalty: 19,
    unlocked_challenge: 20,
    free_kill_detected: 21,
    suicide_penalty_bunge: 22,
    team_kill_penalty: 23,
    winning_change: 24,
    early_suicide: 25,
    blocked_winning: 26
});
DragonBound.prototype.ReceivedChatArray = function(e, o) {
    for (; 0 < e.length;) switch (e.shift()) {
        case GAMEMSG.winning_award:
            ChatReceived(this.GetPlayerByPlayerNumber(e.shift()).name + " [" + l.t("Winning Award") + "] +" + e.shift() + " Gold +" + e.shift() + " GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.losing_consolation:
            ChatReceived(this.GetPlayerByPlayerNumber(e.shift()).name + " [" + l.t("Losing Consolation") + "] +" + e.shift() + " Gold +" + e.shift() + " GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.x_killed_y:
            ChatReceived(this.GetPlayerByPlayerNumber(e.shift()).name + " " + l.t("was killed by") + " " + o, "", CHAT_TYPE_DEAD);
            break;
        case GAMEMSG.x_bunge_y:
            ChatReceived(this.GetPlayerByPlayerNumber(e.shift()).name + " " + l.t("was killed by") + " " + o + " (" + l.t("bunge") + ")", "", CHAT_TYPE_DEAD);
            break;
        case GAMEMSG.ultra_high_ang:
            ChatReceived(o + " [" + l.t("Ultra High Angle Bonus") + "] +100Gold", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.high_ang:
            ChatReceived(o + " [" + l.t("High Angle Bonus") + "] +50Gold", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.excellent_shot:
            ChatReceived(o + " [" + l.t("Excellent Shot Bonus") + "] +100Gold", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.good_shot:
            ChatReceived(o + " [" + l.t("Good Shot Bonus") + "] +50Gold", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.shot_bonus:
            ChatReceived(o + " [" + l.t("Shot Bonus") + "] +25Gold", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.team_damage_penalty:
            ChatReceived(o + " [" + l.t("Team Damage Penalty") + "] -25Gold", "", CHAT_TYPE_DEAD);
            break;
        case GAMEMSG.killed_by_sd:
            ChatReceived(this.GetPlayerByPlayerNumber(e.shift()).name + " " + l.t("was killed by") + " Sudden Death", "", CHAT_TYPE_DEAD);
            break;
        case GAMEMSG.died_by_tele:
            ChatReceived(o + " [" + l.t("died by teleport"), "", CHAT_TYPE_DEAD);
            break;
        case GAMEMSG.damage_1000:
            ChatReceived(o + " [1000 " + l.t("damage achieved") + "] +100Gold +1GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.damage_2000:
            ChatReceived(o + " [2000 " + l.t("damage achieved") + "] +200Gold +2GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.damage_3000:
            ChatReceived(o + " [3000 " + l.t("damage achieved") + "] +300Gold +4GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.triple_kill:
            ChatReceived(o + " [" + l.t("Triple Kill Bonus") + "] +999Gold +6GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.double_kill:
            ChatReceived(o + " [" + l.t("Double Kill Bonus") + "] +500Gold +4GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.ending_bonus:
            ChatReceived(o + " [" + l.t("Ending Bonus") + "] +400Gold +1GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.bunge_bonus:
            ChatReceived(o + " [" + l.t("Bunge Shot Bonus") + "] +200Gold +1GP", "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.suicide_penalty:
            ChatReceived(o + " [" + l.t("Suicide Penalty") + "] -1000Gold -5GP", "", CHAT_TYPE_DEAD);
            break;
        case GAMEMSG.unlocked_challenge:
            ChatReceived(l.t("Room Master unlocked a new challenge opponent ! :)"), "", CHAT_TYPE_GOLD);
            break;
        case GAMEMSG.free_kill_detected:
            ChatReceived(l.t("Free kill game detected - No winning bonus"), "", CHAT_TYPE_SYSTEM);
            break;
        case GAMEMSG.suicide_penalty_bunge:
            ChatReceived(o + " [" + l.t("Suicide Penalty") + "] -1000Gold -5GP (" + l.t("bunge") + ")", "", CHAT_TYPE_DEAD);
            break;
        case GAMEMSG.team_kill_penalty:
            ChatReceived(o + " [Team Kill Penalty] -50Gold -1GP", "", CHAT_TYPE_DEAD);
            break;
        case GAMEMSG.winning_change:
            ChatReceived(l.t("Winning Bonus") + ": " + l.t("Team") + " A = " + e.shift() + " GP, " + l.t("Team") + " B = " + e.shift() + " GP.", "", CHAT_TYPE_SYSTEM);
            break;
        case GAMEMSG.early_suicide:
            ChatReceived(l.t("Early Suicide") + "! " + l.t("Team") + " A = " + e.shift() + " GP, " + l.t("Team") + " B = " + e.shift() + " GP.", "", CHAT_TYPE_SYSTEM);
            break;
        case GAMEMSG.blocked_winning:
            var t = e.shift(),
                a = e.shift();
            ChatReceived(this.GetPlayerByPlayerNumber(t).name + " - " + l.t("No winning bonus (because you already won %% many times today. Play for fun, play with others, or continue tomorrow).").replace("%%", -1 == a ? "Computer Players" : this.GetPlayerByPlayerNumber(a).name), "", CHAT_TYPE_GOLD)
    }
}, DragonBound.prototype.QueueAddCommand = function(e, o) {
    this.queue.push({
        opcode: e,
        params: o
    }), this.QueueExecuteNext()
}, DragonBound.prototype.QueueUnblock = function() {
    this.is_queue_executing = !0, this.QueueExecuteNext()
};
var E_PLAY = Object.freeze({
        next_turn_number: 0,
        player_number: 1,
        x: 2,
        y: 3,
        look: 4,
        add_delay: 5,
        next_turn_of_player: 6,
        chat: 7,
        thor_x: 8,
        thor_y: 9,
        thor_angle: 10,
        thor_damage: 11,
        new_weather: 12,
        wind_power: 13,
        wind_angle: 14,
        shots: 15,
        gold: 16
    }),
    E_PASS = Object.freeze({
        next_turn_number: 0,
        player_number: 1,
        x: 2,
        y: 3,
        look: 4,
        add_delay: 5,
        next_turn_of_player: 6,
        chat: 7,
        thor_x: 8,
        thor_y: 9,
        thor_angle: 10,
        thor_damage: 11,
        new_weather: 12,
        wind_power: 13,
        wind_angle: 14
    });
DragonBound.prototype.QueueExecuteNext = function() {
    for (; this.is_queue_executing && 0 < this.queue.length;) {
        var e = this.queue.shift(),
            o = e.params;
        switch (e.opcode) {
            case "play":
                var t = o[E_PLAY.player_number],
                    a = this.GetPlayerByPlayerNumber(t),
                    e = e.params[E_PLAY.next_turn_number];
                if (a.MoveTo(o[E_PLAY.x], o[E_PLAY.y], o[E_PLAY.look]), a.ChangeDelay(a.delay + o[E_PLAY.add_delay], e - 1), this.UpdateTurnList(), this.turn_number = e, this.after_shot_chat = o[E_PLAY.chat], this.after_shot_gold = t == this.my_player_number ? o[E_PLAY.gold] : void 0, this.EndTurn(), this.after_shot_thor = [o[E_PLAY.thor_x], o[E_PLAY.thor_y], o[E_PLAY.thor_angle], o[E_PLAY.thor_damage]], this.after_shot_weather = o[E_PLAY.new_weather], this.next_turn = o[E_PLAY.next_turn_of_player], this.next_wind = [o[E_PLAY.wind_power], o[E_PLAY.wind_angle]], o[E_PLAY.shots] && 0 < o[E_PLAY.shots].length) {
                    for (e = 0; e < o[E_PLAY.shots].length; e++) this.CreateShot(o[E_PLAY.shots][e], 0 == e, this.turn_number, a), o[E_PLAY.shots][e].ss && t == this.my_player_number && (this.no_ss_turns = 4, $("#btnShotSS").fadeOut(), 2 == GetSelectedShotType() && SelectShotType(this.is_s1_disabled ? 1 : 0, this));
                    this.is_queue_executing = !1;
                    return
                }
                this.ReceivedChatArray(o[E_PLAY.chat], a.name), this.UpdateThor(this.after_shot_thor), this.PushWeather(this.after_shot_weather), this.UpdateWind(this.next_wind), this.StartNextTurn();
                break;
            case "pass":
                t = o[E_PASS.player_number], a = this.GetPlayerByPlayerNumber(t), e = e.params[E_PASS.next_turn_number], a.MoveTo(o[E_PASS.x], o[E_PASS.y], o[E_PASS.look]), a.ChangeDelay(a.delay + o[E_PASS.add_delay], e - 1), this.UpdateTurnList(), this.turn_number = e, this.EndTurn(), this.next_turn = o[E_PASS.next_turn_of_player], this.ReceivedChatArray(o[E_PASS.chat], a.name), this.UpdateThor([o[E_PASS.thor_x], o[E_PASS.thor_y], o[E_PASS.thor_angle], o[E_PASS.thor_damage]]), this.PushWeather(o[E_PASS.new_weather]), this.UpdateWind([o[E_PASS.wind_power], o[E_PASS.wind_angle]]), this.StartNextTurn();
                break;
            case "update":
                this.UpdatePlayer(o);
                break;
            case "game-over":
                this.ReceivedChatArray(o.chat), this.GameOver(o);
                break;
            case "dead":
                (a = this.GetPlayerByPlayerNumber(o)) && a.ChangeAliveTo(!1)
        }
    }
}, DragonBound.prototype.EndTurn = function() {
    var e = this.GetPlayerByPlayerNumber(this.turn);
    e && e.ChangeMyTurn(!1), this.turn = -1, this.intervalDoLeft = clearInterval(this.intervalDoLeft), this.intervalDoRight = clearInterval(this.intervalDoRight), this.intervalDoSpace = clearInterval(this.intervalDoSpace), this.turnTimeout = clearTimeout(this.turnTimeout), this.isInDrag = !1, $("#turn_timer").hide()
}, DragonBound.prototype.PassTurn = function() {
    if (!(0 > this.my_player_index)) {
        this.EndTurn();
        var e = Math.floor((get_time() - this.start_turn_time) / 1e3);
        (e > TURN_TIME || 0 > e) && (e = TURN_TIME), this.players[this.my_player_index].PassTurn(e)
    }
}, DragonBound.prototype.Shoot = function(e) {
    if (!(0 > this.my_player_index)) {
        this.EndTurn();
        var o = Math.floor((get_time() - this.start_turn_time) / 1e3);
        (o > TURN_TIME || 0 > o) && (o = TURN_TIME), this.players[this.my_player_index].Shoot(e, o, GetSelectedShotType()), $("#last_power_mark").animate({
            left: 240 + e
        })
    }
}, DragonBound.prototype.PassTurnClicked = function() {
    this.turn == this.my_player_number && this.PassTurn()
}, DragonBound.prototype.StartNextTurn = function() {
    if (this.turn_number == this.sudden_death_at_turn - 20) ChatReceived(l.t("Sudden Death in %% turns").replace("%%", 20), "", CHAT_TYPE_SYSTEM);
    else if (this.turn_number == this.sudden_death_at_turn - 10) ChatReceived(l.t("Sudden Death in %% turns").replace("%%", 10), "", CHAT_TYPE_SYSTEM);
    else if (this.turn_number == this.sudden_death_at_turn - 5) ChatReceived(l.t("Sudden Death in %% turns").replace("%%", 5), "", CHAT_TYPE_SYSTEM);
    else if (this.turn_number == this.sudden_death_at_turn) ChatReceived(l.t("Sudden Death Started!"), "", CHAT_TYPE_SYSTEM), $("#ss_shot_background").addClass("sudden_death").fadeIn(), $("#btnShotSS").hide(), this.no_ss_turns = 999999, 2 == GetSelectedShotType() && SelectShotType(1, this), $("#message_over_items").removeClass("items_locked").addClass("sudden_death").show();
    else if (this.turn_number > this.sudden_death_at_turn)
        for (var e = 0; e < this.players.length; e++) {
            var o = this.players[e];
            o.ReduceHPby(5 * (this.turn_number - this.sudden_death_at_turn), this.turn_number)
        }
    if (this.turn = this.next_turn, -1 != this.turn) {
        if (o = this.GetPlayerByPlayerNumber(this.turn)) {
            if (o.ChangeMyTurn(!0), o.RegenShield(this.turn_number), 2 < this.queue.length ? $("#game_replay").show() : $("#game_replay").hide(), 0 == this.no_ss_turns && this.turn_number <= this.sudden_death_at_turn && $("#btnShotSS").show(), this.camera.FocusAt(o.x, o.y, !0), this.start_turn_time = get_time(), this.turn == this.my_player_number) {
                0 < this.no_ss_turns && this.no_ss_turns--, this.steps = 0, $("#walkBar").css("width", 400), this.UsePressedItem(), $("#turn_timer").stop(!0, !0).hide().css("background-position", "0 -1900px").show("slow");
                var t = this,
                    a = function() {
                        if (AudioPlay(AUDIO_TURN_TICK), t.turn == t.my_player_number) {
                            var e = TURN_TIME - Math.floor((get_time() - t.start_turn_time) / 1e3);
                            0 < e ? (g_graphics_high ? $("#turn_timer").animate({
                                backgroundPositionY: "-" + (e - 1) + "00px"
                            }, 200, "linear") : $("#turn_timer").css({
                                backgroundPositionY: "-" + (e - 1) + "00px"
                            }), 0 == t.queue.length && o.SendPosUpdate(), t.turnTimeout = setTimeout(function() {
                                a()
                            }, 1e3)) : t.PassTurn()
                        }
                    };
                this.turnTimeout = setTimeout(a, 1e3), AudioPlay(AUDIO_MY_TURN)
            } else $("#turn_timer").hide()
        } else debug && console.log("[DragonBound.StartNextTurn] ERROR: turn of unknown player number", this.turn)
    }
}, DragonBound.prototype.GetPlayerByPlayerNumber = function(e) {
    if (-1 != e) {
        for (var o = 0; o < this.players.length; o++)
            if (this.players[o].player_number_in_game == e) return this.players[o]
    }
}, DragonBound.prototype.GameOver = function(e) {
    $("#scores_lose_a").hide(), $("#scores_lose_b").hide(), "B" != e.won && $("#scores_lose_b").show(), "A" != e.won && $("#scores_lose_a").show(), $(".score").hide();
    for (var o = 0; o < e.scores.length; o++) {
        var t = e.scores[o],
            a = t[0],
            n = t[1],
            r = t[2],
            s = t[3],
            d = t[4],
            u = t[5],
            _ = t[6],
            t = t[7];
        $("#score" + a + " .score_name").html(r), $("#score" + a + " .score_rank").removeClass().addClass("score_rank rank rank" + s), $("#score" + a + " .score_gp").html(d + " GP"), $("#score" + a + " .score_gold").html(u + " GOLD"), $("#score" + a + " .score_bonus_gp").html(_ ? "+" + _ + " GP" : ""), $("#score" + a + " .score_bonus_gold").html(t ? "+" + t + " GOLD" : ""), n == this.my_user_id ? $("#score" + a + " .score_me").show() : $("#score" + a + " .score_me").hide(), $("#score" + a).show()
    }
    var c = this;
    $(".Player").promise().done(function() {
        debug && console.log("GameOver calling Destructor");
        var e = c.dn;
        c.Destructor(), c.dn.game = void 0, $("#game_over").fadeIn(1500), g_score_screen_timeout = setTimeout(function() {
            e.location == GUI_LOCATION_GAME && (e.should_stay_in_game_screen = !1, e.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL ? SwitchToChannelScreen(e) : SwitchToRoomScreen(e))
        }, 7500), $("#game_over").click(function() {
            g_score_screen_timeout && (g_score_screen_timeout = clearTimeout(g_score_screen_timeout), e.should_stay_in_game_screen = !1, e.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL ? SwitchToChannelScreen(e) : SwitchToRoomScreen(e))
        })
    })
}, DragonBound.prototype.ChangePlayersInRoom = function(e) {
    var o, t;
    for (o = 0; o < this.players.length; o++) this.players[o].mark = !1;
    for (t = 0; t < e.length; t++)
        for (o = 0; o < this.players.length; o++) e[t][PLAYER_INDEX_USER_ID] == this.players[o].user_id && (this.players[o].mark = !0);
    for (o = 0; o < this.players.length; o++) this.players[o].mark || this.players[o].ChangeAliveTo(!1)
}, DragonBound.prototype.UpdateGuiGold = function(e) {
    for (var o = e.toString().split("").reverse(), e = 0; e < o.length && 5 > e; e++) "-" == o[e] ? $("#UIGoldDigit" + e).animate({
        backgroundPositionY: "-154px"
    }, 1e3) : $("#UIGoldDigit" + e).animate({
        backgroundPositionY: -14 - 14 * Number(o[e]) + "px"
    }, 1e3);
    for (; 5 > e; e++) $("#UIGoldDigit" + e).animate({
        backgroundPositionY: "0"
    }, 1e3)
};
var THOR_LEVEL = [0, 300, 900, 1800, 3200, 6e3];

function DragonLogin(e) {
    this.dn = e, this.CheckStatus()
}

function BuildTimeLeftString(e, o, t) {
    for (o -= t; 0 > o;) e--, o += 86400;
    if (0 > e) return l.t("Press F5 to reload");
    var t = Math.floor(o / 3600),
        o = o % 3600,
        a = Math.floor(o / 60),
        o = o % 60,
        n = "";
    return 0 < e && (n += e + " " + l.t("Days") + " "), n + (t + " " + l.t("Hours") + " " + a + " " + l.t("Minutes") + " " + o + " ") + l.t("Seconds")
}

function ShowServerOpenTimer(e, o, t) {
    var a = get_time();
    setInterval(function() {
        $("#BrokerTitle").html(BuildTimeLeftString(e, o, Math.round((get_time() - a) / 1e3)))
    }, 1e3), $(".BrokerChannel").hide(), $("#BrokerRefresh").hide(), $("#BrokerTitle").html(BuildTimeLeftString(e, o, 0)).css({
        top: 51,
        "font-size": 30
    }), $("#BrokerTotalPlayers").html(l.t("20,000 first players with 1100+ GP will get the (RARE) Beta Flag!<br>200% GP & GOLD for 2 days since open time!<br>2000 Free Cash every day at the Post Button!")).css({
        top: 120,
        "font-size": 16,
        color: "yellow"
    }), $("#BrokerWindow").css({
        height: 192,
        top: 204
    }).append($("<div>" + l.t("Your") + " UserID: " + t + "</div>").css({
        position: "absolute",
        left: 20,
        top: 10,
        "font-size": 14,
        color: "yellow"
    }).addClass("blackShadow"), $('<iframe id="radio" src="http://radio.q-dance.com/">').hide(), $('<div id="muteBtn" class="popButton"></div>'), $('<div id="shareTimer" class="popButton"></div>'), $('<div class="popButton"><a href="http://www.facebook.com/groups/dragonbound.brasil/" target="_blank">http://www.facebook.com/groups/dragonbound.brasil</a></div>').css({
        position: "absolute",
        left: 144,
        top: 174,
        "font-size": 12
    })).addClass("animRotate"), $("#muteBtn").click(function() {
        $("#radio, #muteBtn").remove()
    }), $("#shareTimer").click(function() {
        ServerTimer_PostToFacebook()
    }), $("#BrokerScreen").show()
}

function ServerTimer_PostToFacebook() {
    var e = "icon180x180.png icon2_180x180.png icon3_180x180.jpg icon4_180x180.jpg icon5_180x180.jpg icon6_180x180.jpg".split(" "),
        e = e[random(0, e.length - 1)],
        o = "DragonBound " + ("br" == SERVER_TYPE ? "Brasil" : "Global"),
        t = o + " - " + $("#BrokerTitle").html(),
        a = "br" == SERVER_TYPE ? "http://dragonbound-brasil.com" : "http://dragonbound.net",
        n = $("#BrokerTotalPlayers").html();
    FB.ui({
        method: "feed",
        link: a,
        picture: a + "/static/images/" + e,
        name: t,
        caption: o,
        description: n
    })
}
DragonBound.prototype.UpdateThor = function(e) {
    if (e) {
        for (var o = e[0], t = e[1], a = e[2], e = e[3], n = 0; n + 1 < THOR_LEVEL.length && e >= THOR_LEVEL[n + 1];) n++;
        n++, $("#thor").stop(!0, !0).animate({
            left: o,
            top: t
        }, 2e3), $("#thor_rotate").stop(!0, !0).animate({
            rotate: "-" + a + "deg"
        }, 1e3), $("#thor_lvl").html("Lv." + n), $("#thor_damage").html(e), $("#thor_laser").fadeOut()
    }
}, DragonBound.prototype.ThorShoot = function(e, o, t, a) {
    $("#thor").stop(!0, !0).css({
        left: e,
        top: o
    }), $("#thor_rotate").stop(!0, !0).css({
        rotate: "-" + t + "deg"
    }), $("#thor_laser").stop(!0, !0).css({
        width: a
    }).show().fadeOut()
}, DragonBound.prototype.SetWeather = function(e) {
    this.weather = e, this.UpdateWeatherGUI()
}, DragonBound.prototype.PushWeather = function(e) {
    this.weather.shift(), this.weather.push(e), this.UpdateWeatherGUI(), 1 == this.weather[1] && AudioPlay(AUDIO_WIND)
}, DragonBound.prototype.UpdateWeatherGUI = function() {
    $("#weatherSlot0").removeClass().addClass("weather-" + this.weather[0]), $("#weatherSlot1").removeClass().addClass("weather-" + this.weather[1]), $("#weatherSlot2").removeClass().addClass("weather-" + this.weather[2]), $("#weatherSlot3").removeClass().addClass("weather-" + this.weather[3]), $("#weatherSlot4").removeClass().addClass("weather-" + this.weather[4])
}, DragonBound.prototype.CreateLightning = function(e, o, t) {
    var a = "#lightning" + random(0, 999999),
        n = random(0, 3);
    $(DIV_TO_CREATE_GAME_OBJECTS).append('<div id="' + a.slice(1) + '" style="position:absolute; left:' + e + "px; top:" + o + 'px;"><div class="lightning lightning' + n + '"></div></div>'), $(a).css({
        rotate: 270 - t + "deg"
    }), setTimeout(function() {
        $(a).remove()
    }, 100)
}, DragonBound.prototype.UpdateWind = function(e) {
    var o = e[0],
        t = e[1];
    if (!this.gameStuffImage) {
        var a = this,
            e = this.gameStuffImage = new Image;
        e.onload = function() {
            a.DrawWind(o, t)
        }, e.src = GetBackgroundImageUrl("#gameui")
    }
    this.DrawWind(o, t)
}, DragonBound.prototype.DrawWind = function(e, o) {
    var t = $("#wind_meter2")[0].getContext("2d"),
        a = this.gameStuffImage;
    t.clearRect(0, 0, 54, 54), a && t.drawImage(a, 177, 159, 54, 54, 0, 0, 54, 54), t.save(), t.translate(27, 27), t.rotate(AngleToRad(-o)), a && t.drawImage(a, 483, 221, 86, 5, -35, -2, 70, 5), t.restore(), t.save(), a = 10 > e ? "#ffffff" : 20 > e ? "#ffff00" : "#ff0000", 10 > e && (e = "0" + e), t.fillStyle = a, t.font = "20px verdana", t.shadowColor = "black", t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = 4, t.strokeStyle = "black", t.lineWidth = 1, t.strokeText(e, 14, 34), t.fillText(e, 14, 34), t.restore(), t.drawImage(g_dirty, -1, -1, 1, 1)
}, Object.freeze(DragonBound.prototype), DragonLogin.prototype.LoginMessage = function(e) {
    debug && console.log(" >> [DragonLogin Dialog Text]", e), DragonDialogOpen("Login", e, DIALOG_BUTTONS_NONE, void 0, [35, 52])
}, DragonLogin.prototype.ShowConnectToFacebookButton = function() {
    var e = this;
    DragonDialogOpen(l.t("Welcome to DragonBound"), l.t("Who are you?") + '<div id="ConnectWithFacebook" class="glow_button_anim"></div><div id="ConnectWithPassword" class="glow_button_anim"></div>', DIALOG_BUTTONS_NONE, void 0, [35, 52]), $("#ConnectWithFacebook").click(function() {
        window.FB ? e.FacebookLoginButtonClicked() : alertify.alert("Facebook could not be loaded right now, use password login.")
    }), $("#ConnectWithPassword").click(function() {
        e.PasswordLoginButtonClicked(2)
    })
}, DragonLogin.prototype.CheckStatus = function() {
    var e = this,
        o = !1,
        t = !1;
    e.LoginMessage("Checking Login Status..."), $.get("/s.php", function(a) {
        debug && console.log(" >> Got Status:", a), !a || 2 > a.length ? t ? e.FacebookLogin() : o = !0 : e.GotLoginData(a)
    }, "json").error(function(o) {
        debug && console.log("ERROR /s:", o), e.LoginMessage("Please wait a few seconds...<br>(Por favor espere unos segundos)<br><br>Fixing your connection... :)<br>(Arreglando su conexion)<br><br>" + o.status)
    });
    var a = setTimeout(function() {
        e.ShowConnectToFacebookButton()
    }, 3e4);
    window.fbAsyncInit = function() {
        debug && console.log(" >> OnFacebookLoaded"), clearTimeout(a), FB.init({
            appId: "1397938667086072",
            status: !0,
            cookie: !0,
            xfbml: !0,
            oauth: !0,
            channelUrl: location.protocol + "//" + location.host + "/channel.html"
        }), t = !0, o && e.FacebookLogin()
    };
    var n, r = document.getElementsByTagName("script")[0];
    document.getElementById("facebook-jssdk") || ((n = document.createElement("script")).id = "facebook-jssdk", n.async = !0, n.src = "//connect.facebook.net/en_US/all.js", r.parentNode.insertBefore(n, r))
}, DragonLogin.prototype.FacebookLogin = function() {
    debug && console.log(" >> FacebookLogin");
    var e = this;
    e.LoginMessage(l.t("Checking FB login status") + "..."), FB.getLoginStatus(function(o) {
        o && "connected" == o.status ? (debug && console.log(" >> Connected and authorized the app!"), e.Login({
            t: 1
        })) : (debug && console.log(' >> Not connected or authorized the app... Showing "Connect To Facebook" Button'), "br" != SERVER_TYPE || getCookie("kopiga") ? e.ShowConnectToFacebookButton() : (e.LoginMessage(l.t("Checking country") + "..."), $.get("/c", function(o) {
            "BR" == o ? e.ShowConnectToFacebookButton() : e.LoginMessage(l.t("Only people of Brazil allowed to play on this server.<br><br>You are at " + o + '.<br><br>Please play on<br><a href="http://dragonbound.net">DragonBound Global</a>'))
        }).error(function(o) {
            console && console.log("Got Server Status:", o), e.LoginMessage("Server error, try again.")
        })))
    })
}, DragonLogin.prototype.FacebookLoginButtonClicked = function() {
    debug && console.log(" >> FacebookLoginButtonClicked");
    var e = this;
    e.LoginMessage(l.t("A Facebook pop-up has opened, please follow the instructions to sign in.")), FB.login(function(o) {
        debug && console.log(" >> FB.Login:", o), o.authResponse ? (debug && console.log(" >> FB.Login: Connected"), e.Login({
            t: 1
        })) : (debug && console.log(" >> FB.Login: Cancelled"), e.ShowConnectToFacebookButton())
    }, {
        scope: "email,user_birthday"
    })
}, DragonLogin.prototype.Login = function(e) {
    debug && console.log(" >> Login");
    var o = this;
    o.LoginMessage(l.t("Loading your account") + "..."), $.post("/f.php", e, function(e) {
        o.GotLoginData(e)
    }, "json").error(function(e) {
        console && console.log("Error: Got Server Status:", e), DragonDialogOpen("Facebook Error", "MSG: " + e[0] + (e[1] ? "<br><br>" + e[1] : ""), DIALOG_BUTTONS_OK, function() {
            o.ShowConnectToFacebookButton()
        }, [35, 52])
    })
}, DragonLogin.prototype.GotLoginData = function(e) {
    var o = this;
    debug && console.log(" >> GotLoginData:", e), 3 == e.length ? (debug && console.log(" >> Banned Message"), DragonDialogOpen(l.t("You Are Banned"), l.t("Reason") + ": " + e[0] + "<br><br>Until: " + e[1] + (e[1] != l.t("Forever") ? " (" + l.t("UTC Time Zone") + ")" : ""), DIALOG_BUTTONS_NONE, void 0, [35, 52])) : 4 == e.length ? (debug && console.log(" >> Show server open timer"), DragonDialogClose(!0), e[2] && $("#ranking_title2").html(Commatize(e[2]) + " " + l.t("Players")), ShowServerOpenTimer(e[0], e[1], e[3])) : 5 == e.length ? (debug && console.log(" >> Login Completed! :)"), DragonDialogClose(!0), e[2] && $("#ranking_title2").html(Commatize(e[2]) + " " + l.t("Players")), o.dn.SetLoginUserDetails(e[0], e[1], e[3], e[4]), o.dn.BrokerConnect()) : 2 == e.length && -5 == e[0] ? (debug && console.log(" >> Password needed too"), DragonDialogOpen("Facebook Login Good :)", "Your account require both to use Facebook login and Password login. Please enter your password too ->", DIALOG_BUTTONS_OK, function() {
        o.PasswordLoginButtonClicked(3, e[1])
    }, [35, 52])) : 1 == e.length && -9 == e[0] ? (debug && console.log(" >> Password change needed"), DragonDialogOpen("Facebook Login Good :)", "Please set a password to your GM account now -><br><br>(You can change it later at [My Info] button in the lobby)", DIALOG_BUTTONS_OK, function() {
        o.ChangePassword(1)
    }, [35, 52])) : 1 == e.length && -11 == e[0] ? (debug && console.log(" >> Password change needed"), DragonDialogOpen(l.t("New Password"), l.t("Set a new password so you can always login to your account even without Facebook.<br><br>Write down your new username!<br><br>(You can change it at [My-Info])"), DIALOG_BUTTONS_OK, function() {
        o.ChangePassword(1)
    }, [35, 52])) : (DragonDialogOpen("Login", "MSG: " + e[0] + (e[1] ? "<br><br>" + e[1] : ""), DIALOG_BUTTONS_OK, function() {
        o.ShowConnectToFacebookButton()
    }, [35, 52]), debug && console.log("ERROR MSG:", e))
}, DragonLogin.prototype.Logout = function() {
    var e = this;
    $.post("/g.php", {}, function() {}), $("#BrokerScreen").hide(), DragonDialogOpen(l.t("Bye Bye"), l.t("We logged you out from your Facebook account too for your account safety.<br><br>Hope to see you again soon!"), DIALOG_BUTTONS_OK, function() {
        e.ShowConnectToFacebookButton()
    }, [35, 52]), FB.logout(function(e) {
        debug && console.log("FB.logout", e)
    })
}, DragonLogin.prototype.PasswordLoginButtonClicked = function(e, o) {
    var t = this;
    debug && console.log(" >> PasswordLoginButtonClicked", e, o);
    var a = "";
    DragonDialogOpen("Password Login", 'Username: <input id="DragonLoginUsername"><br>Password: <input type="password" id="DragonLoginPassword"><br>Secret Number: <input type="password" id="DragonLoginSecret" readonly><div id="DragonC0de"></div>', DIALOG_BUTTONS_OK_CANCEL, function(o) {
        if (o) {
            console.log(e)
            console.log(o)
            var username = $("#DragonLoginUsername").val(),
                password = $("#DragonLoginPassword").val(),
                loginSecret = $("#DragonLoginSecret").val();
            t.Login({
                username,
                password,
                loginSecret
            })
        } else t.ShowConnectToFacebookButton()
    }), o && $("#DragonLoginUsername").val(o);
    var n = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
        r = $("#DragonC0de"),
        s = $("#DragonLoginSecret");
    r.append($("<button>" + n[0] + "</button>").click(function() {
        return a += n[0], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[1] + "</button>").click(function() {
        return a += n[1], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[2] + "</button>").click(function() {
        return a += n[2], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[3] + "</button>").click(function() {
        return a += n[3], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[4] + "</button>").click(function() {
        return a += n[4], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[5] + "</button>").click(function() {
        return a += n[5], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[6] + "</button>").click(function() {
        return a += n[6], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[7] + "</button>").click(function() {
        return a += n[7], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[8] + "</button>").click(function() {
        return a += n[8], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[9] + "</button>").click(function() {
        return a += n[9], s.val(s.val() + "*"), !1
    })).append($("<button>&#8592;</button>").click(function() {
        return a = a.slice(0, -1), s.val(s.val().slice(0, -1)), !1
    }))
}, DragonLogin.prototype.ChangePassword = function(e) {
    var o = this;
    debug && console.log(" >> ChangePassword", e);
    var t = "",
        a = "";
    DragonDialogOpen(l.t("Change Password"), 'Username: <span id="MyDragonLoginUsername"></span><br>' + l.t("Password") + ': <input type="password" id="DragonLoginPassword"><br>' + l.t("Secret Number") + ': <input type="password" id="DragonLoginSecret" readonly><div id="DragonC0de"></div>', DIALOG_BUTTONS_OK_CANCEL, function(n) {
        n ? (debug && console.log(" >> ChangePassword [OK]", e), 6 > (n = $("#DragonLoginPassword").val()).length ? DragonDialogOpen(l.t("Too Short"), l.t("Password too short. Length 6+ needed."), DIALOG_BUTTONS_OK, function() {
            o.ChangePassword(e)
        }) : /^(.)\1+$/.test(n) || "123456" == n || "1234567" == n || "12345678" == n || n == a ? DragonDialogOpen(l.t("Too Easy"), l.t("Password too easy to guess. Make it harder."), DIALOG_BUTTONS_OK, function() {
            o.ChangePassword(e)
        }) : 6 > t.length ? DragonDialogOpen(l.t("Too Short"), l.t("Secret number too short. Length 6+ needed."), DIALOG_BUTTONS_OK, function() {
            o.ChangePassword(e)
        }) : /^(.)\1+$/.test(t) || "123456" == t || "1234567" == t || "12345678" == t || t == n ? DragonDialogOpen(l.t("Too Easy"), l.t("Secret number too easy to guess. Make it harder."), DIALOG_BUTTONS_OK, function() {
            o.ChangePassword(e)
        }) : (n += "|" + t, n = CryptoJS.SHA256(n).toString() + get_time(), $.post("/change_password", {
            u: a,
            p: n
        }, function(t) {
            "1" == t ? DragonDialogOpen(l.t("Good") + " :)", l.t("Password Changed"), DIALOG_BUTTONS_OK, function() {
                e && o.ShowConnectToFacebookButton()
            }) : DragonDialogOpen("Failed :(", t, DIALOG_BUTTONS_OK, function() {
                o.ChangePassword(e)
            })
        }).error(function() {
            DragonDialogOpen("Sorry :(", "Error. Could not change your password. Try again.", DIALOG_BUTTONS_OK, function() {
                o.ChangePassword(e)
            })
        }))) : (debug && console.log(" >> ChangePassword [Cancel]", e), e && o.ShowConnectToFacebookButton())
    }), $.get("/my_username", function(e) {
        2 != e.length ? DragonDialogOpen("Sorry :(", "Please re-login before changing password.", DIALOG_BUTTONS_OK, function() {}) : (a = e[0], setCookie("csrftoken", e[1]), $("#MyDragonLoginUsername").html(e[0]))
    }, "json").error(function() {
        DragonDialogOpen("Sorry :(", "Error while getting username. Please re-login.", DIALOG_BUTTONS_OK, function() {
            o.ChangePassword()
        })
    });
    var n = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
        r = $("#DragonC0de"),
        s = $("#DragonLoginSecret");
    r.append($("<button>" + n[0] + "</button>").click(function() {
        return t += n[0], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[1] + "</button>").click(function() {
        return t += n[1], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[2] + "</button>").click(function() {
        return t += n[2], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[3] + "</button>").click(function() {
        return t += n[3], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[4] + "</button>").click(function() {
        return t += n[4], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[5] + "</button>").click(function() {
        return t += n[5], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[6] + "</button>").click(function() {
        return t += n[6], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[7] + "</button>").click(function() {
        return t += n[7], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[8] + "</button>").click(function() {
        return t += n[8], s.val(s.val() + "*"), !1
    })).append($("<button>" + n[9] + "</button>").click(function() {
        return t += n[9], s.val(s.val() + "*"), !1
    })).append($("<button>&#8592;</button>").click(function() {
        return t = t.slice(0, -1), s.val(s.val().slice(0, -1)), !1
    }))
};
var g_score_screen_timeout, g_audio_last_music_wanted_to_play, AUDIO_ARMOR_MOVE = 0,
    AUDIO_ARMOR_BLAST = 1,
    AUDIO_ARMOR_FIRE = 2,
    AUDIO_ICE_MOVE = 3,
    AUDIO_MOVE_ARMOR = 4,
    AUDIO_ICE_SHOOT = 5,
    AUDIO_ARMOR_FIRE2 = 6,
    AUDIO_ICE_BLAST = 7,
    AUDIO_ICE_FIRE = 8,
    AUDIO_ICE_BLAST2 = 9,
    AUDIO_ADUKA_FIRE = 10,
    AUDIO_ADUKA_FIRE2 = 11,
    AUDIO_BUTTON_SELECT = 12,
    AUDIO_MUSIC_CHANNEL = 13,
    AUDIO_MUSIC_ROOM = 14,
    AUDIO_MUSIC_STAGE1 = 15,
    AUDIO_MY_TURN = 16,
    AUDIO_TURN_TICK = 17,
    AUDIO_BUTTON_SELECT2 = 18,
    AUDIO_GOLD = 19,
    AUDIO_BIGFOOT_FIRE1 = 20,
    AUDIO_BIGFOOT_FIRE2 = 21,
    AUDIO_BIGFOOT_BLAST1 = 22,
    AUDIO_BIGFOOT_BLAST2 = 23,
    AUDIO_LIGHTNING_FIRE = 24,
    AUDIO_LIGHTNING_BLAST = 25,
    AUDIO_JD_FIRE = 26,
    AUDIO_JD_BLAST1 = 27,
    AUDIO_JD_BLAST2 = 28,
    AUDIO_ASATE_FIRE = 29,
    AUDIO_KNIGHT_FIRE = 30,
    AUDIO_ASATE_KNIGHT_BLAST = 31,
    AUDIO_WIND = 32,
    AUDIO_WAIT = 33,
    AUDIO_GAME_START = 34,
    AUDIO_LOGIN = 35,
    AUDIO_BROKER = 36,
    g_sound_files = "1move 11blast 11fire 11move 1move 12blast 12fire 111blast 111fire 112blast 161fire 162fire bpush1 dbtheme dbwaiting dbparty turn turnwa bselect1 gold 51fire 52fire 51blast 52blast 82fire 82blast 91fire 91blast 92blast 10s1fire 15s1fire 10s1blast wind2 wait start login broker".split(" "),
    g_music_numbers = [AUDIO_MUSIC_CHANNEL, AUDIO_MUSIC_ROOM, AUDIO_MUSIC_STAGE1],
    g_audio_is_music_on = 0 != getCookie("music"),
    g_audio_is_effects_on = 0 != getCookie("effects");

function AudioInit() {
    navigator.userAgent.match(/(iPhone|iPod|iPad)/i) && (g_audio_is_music_on = !1), soundManager.setup({
        url: "/static/js/",
        flashVersion: 9,
        debugMode: !1,
        preferFlash: "dev" == SERVER_TYPE,
        onready: function() {
            for (var e = 0; e < g_sound_files.length; e++) soundManager.createSound({
                id: g_sound_files[e],
                autoLoad: !1,
                url: STATIC_DIR + "images/1/" + g_sound_files[e] + ".png"
            });
            AudioPlayInLoop(AUDIO_MUSIC_CHANNEL)
        }
    })
}

function AudioPlayInLoop(e, o) {
    if (-1 == g_music_numbers.indexOf(e)) {
        if (!g_audio_is_effects_on) return
    } else if (g_audio_last_music_wanted_to_play = e, !g_audio_is_music_on) return;
    var t = g_sound_files[e];
    void 0 != t && void 0 != (t = soundManager.getSoundById(t)) && (o && AudioStopAll(), t.play({
        onfinish: function() {
            AudioPlayInLoop(e)
        }
    }))
}

function AudioPlay(e, o) {
    if (-1 == g_music_numbers.indexOf(e)) {
        if (!g_audio_is_effects_on) return
    } else if (g_audio_last_music_wanted_to_play = e, !g_audio_is_music_on) return;
    var t = g_sound_files[e];
    void 0 != t && (void 0 != o ? soundManager.play(t, {
        loops: o
    }) : soundManager.play(t))
}

function AudioStopAll() {
    soundManager.stopAll()
}

function AudioTurnMusicOff() {
    for (var e = 0; e < g_music_numbers.length; e++) soundManager.getSoundById(g_sound_files[g_music_numbers[e]]).pause();
    g_audio_is_music_on = !1
}

function AudioTurnMusicOn() {
    g_audio_is_music_on = !0;
    for (var e = !1, o = 0; o < g_music_numbers.length; o++) {
        var t = soundManager.getSoundById(g_sound_files[g_music_numbers[o]]);
        0 != t.paused && (t.resume(), e = !0)
    }
    e || AudioPlayInLoop(g_audio_last_music_wanted_to_play)
}

function AudioTurnEffectsOff() {
    g_audio_is_effects_on = !1
}

function AudioTurnEffectsOn() {
    g_audio_is_effects_on = !0
}
var ANIMATIONS_FPS = 10;

function CPlayerGraphic(e, o, t, a, n, r, s, d, u) {
    this.div = e, this.flip = !!s, this.change_mobile(o), d && this.change(d), r && this.change(r), t && this.change(t), a && this.change(a), n && this.change(n), u && this.change(u), g_graphics_high && this.animate_start()
}

function CAnimatedObject(e, o, t, a, n, r, s, d, u, _, c, h, p, m, f, y, b) {
    if (this.frames = c, this.start_frame = void 0 == f ? 0 : f, this.end_frame = y, this.frame_time = h, this.loop_type = m, this.css_prefix = e, this.div_id = "#AniObject" + random(0, 999999), this.start_time = get_time(), this.is_flip = p, t = Math.round(t), a = Math.round(a), $(u).append('<div class="AniObject ' + e + "-" + this.start_frame + (this.is_flip ? " FlipH" : "") + '" id="' + this.div_id.slice(1) + '" style="position: absolute; left:' + t + "px; top:" + a + "px; width: " + n + "px; height: " + r + "px; margin-left: " + -s + "px; margin-top: " + -d + "px; opacity: " + _ + "; background-image: url(" + STATIC_DIR2 + "images/" + o + "); background-repeat: no-repeat;background-color: transparent; zoom:1;" + (b ? " z-index:" + b : "") + '"></div>'), 3 != this.loop_type) {
        var E = this;
        this.interval = setInterval(function() {
            E.update()
        }, h)
    }
}
CPlayerGraphic.prototype.animate_start = function() {
    this.frame_time = 1e3 / ANIMATIONS_FPS, this.start_time = get_time();
    var e = this;
    this.interval = setInterval(function() {
        var o = Math.floor((get_time() - e.start_time) / e.frame_time);
        e.mobile && e.mobile.set_frame(o), 0 == o % 2 && e.background && e.background.set_frame(o / 2), e.flag && e.flag.set_frame(o), e.head && e.head.set_frame(o), e.body && e.body.set_frame(o), e.body_glow && e.body_glow.set_frame(o), e.eyes && e.eyes.set_frame(o, !!e.head && e.head.is_special), 0 == o % 2 && e.foreground && e.foreground.set_frame(o / 2)
    }, this.frame_time)
}, CPlayerGraphic.prototype.animate_stop = function() {
    this.interval && (this.interval = clearInterval(this.interval))
}, CPlayerGraphic.prototype.remove = function() {
    this.animate_stop(), this.background && (this.background.remove(), this.background = void 0), this.flag && (this.flag.remove(), this.flag = void 0), this.body && (this.body.remove(), this.body = void 0), this.body_glow && (this.body_glow.remove(), this.body_glow = void 0), this.head && (this.head.remove(), this.head = void 0), this.eyes && (this.eyes.remove(), this.eyes = void 0), this.foreground && (this.foreground.remove(), this.foreground = void 0), this.mobile && (this.mobile.remove(), this.mobile = void 0)
}, CPlayerGraphic.prototype.change = function(e, o, t, a) {
    if (e) {
        if (void 0 == (o = AVATARS[e])) debug && console.log(" *** ERROR: [CPlayerGraphic.change] unknown avatar ", e, o);
        else {
            var n = o[AVATAR_INDEX_URL] ? o[AVATAR_INDEX_URL] : "avatars/" + o[AVATAR_INDEX_GENDER] + o[AVATAR_INDEX_TYPE] + (o[AVATAR_INDEX_N] + 1e5).toString().substring(1) + ".png";
            o[AVATAR_INDEX_TYPE] == AVATAR_TYPE_FLAG ? (this.flag_n != e || t) && (this.flag && this.flag.remove(), this.flag = new CAnimatedObject2(n, o[AVATAR_INDEX_GRAPHICS], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, LOOP_NORMAL_AND_REVERSE, 0, 3), this.flag_n = e) : o[AVATAR_INDEX_TYPE] == AVATAR_TYPE_HEAD ? (this.head_n != e || t) && (this.head && this.head.remove(), this.head = new CAnimatedObject2(n, o[AVATAR_INDEX_GRAPHICS], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, LOOP_AVATAR, 0, 5), this.head_n = e, this.body && this.change(this.body_n, AVATAR_TYPE_BODY, !0)) : o[AVATAR_INDEX_TYPE] == AVATAR_TYPE_BODY ? (this.body_n != e || t) && (this.body && this.body.remove(), this.body_glow && this.body_glow.remove(), this.body = new CAnimatedObject2(n, o[AVATAR_INDEX_GRAPHICS], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, LOOP_NORMAL_AND_REVERSE, 0, 4), o[AVATAR_INDEX_GLOW] && (n = a || "avatars/" + o[AVATAR_INDEX_GENDER] + o[AVATAR_INDEX_TYPE] + (o[AVATAR_INDEX_N] + 1e5).toString().substring(1) + "l.png", this.body_glow = new CAnimatedObject2(n, o[AVATAR_INDEX_GLOW], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, 11 < o[AVATAR_INDEX_GLOW].length ? LOOP_NORMAL : LOOP_NORMAL_AND_REVERSE, 0, 5)), this.body_n = e) : o[AVATAR_INDEX_TYPE] == AVATAR_TYPE_EYES ? (this.eyes_n != e || t) && (this.eyes && this.eyes.remove(), t = o[AVATAR_INDEX_GRAPHICS].length, a = LOOP_NORMAL_AND_REVERSE, 22 == t ? a = LOOP_AVATAR : 44 == t && (a = LOOP_AVATAR_NO_REVERSE), this.eyes = new CAnimatedObject2(n, o[AVATAR_INDEX_GRAPHICS], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, a, 0, 6), this.eyes_n = e) : o[AVATAR_INDEX_TYPE] == AVATAR_TYPE_BACKGROUND ? (this.background_n != e || t) && (this.background && this.background.remove(), n = o[AVATAR_INDEX_URL] ? o[AVATAR_INDEX_URL] : "backgrounds/b20" + o[AVATAR_INDEX_N] + ".png", this.background = new CAnimatedObject2(n, o[AVATAR_INDEX_GRAPHICS], this.flip ? -100 : 100, -69, this.div, 1, 5, !this.flip, LOOP_NORMAL, 0, 1), this.background_n = e) : o[AVATAR_INDEX_TYPE] == AVATAR_TYPE_FOREGROUND && (this.foreground_n != e || t) && (this.foreground && this.foreground.remove(), n = o[AVATAR_INDEX_URL] ? o[AVATAR_INDEX_URL] : "backgrounds/f20" + o[AVATAR_INDEX_N] + ".png", this.foreground = new CAnimatedObject2(n, o[AVATAR_INDEX_GRAPHICS], this.flip ? -100 : 100, -69, this.div, 1, 5, !this.flip, LOOP_NORMAL, 0, 7), this.foreground_n = e)
        }
    } else void 0 == o ? debug && console.log(" *** ERROR: [CPlayerGraphic.change] undefined avatar") : o == AVATAR_TYPE_FLAG && this.flag ? (this.flag.remove(), this.flag = this.flag_n = void 0) : o == AVATAR_TYPE_BODY && this.body ? (this.body.remove(), this.body = this.body_n = void 0) : o == AVATAR_TYPE_EYES && this.eyes ? (this.eyes.remove(), this.eyes = this.eyes_n = void 0) : o == AVATAR_TYPE_HEAD && this.head ? (this.head.remove(), this.head = this.head_n = void 0) : o == AVATAR_TYPE_BACKGROUND && this.background ? (this.background.remove(), this.background = this.background_n = void 0) : o == AVATAR_TYPE_FOREGROUND && this.foreground && (this.foreground.remove(), this.foreground = this.foreground_n = void 0)
}, CPlayerGraphic.prototype.GetAvatars = function() {
    return [this.head_n, this.body_n, this.eyes_n, this.flag_n, this.background_n, this.foreground_n]
}, CPlayerGraphic.prototype.change_mobile = function(e) {
    this.avatar_x = (e = MOBILES[e]) ? e.player_x : 0, this.avatar_y = e ? e.player_y : -19;
    var o = this.flip ? -this.avatar_x : this.avatar_x,
        t = this.avatar_y;
    this.head && this.head.change_pos(o, t), this.body && this.body.change_pos(o, t), this.eyes && this.eyes.change_pos(o, t), this.flag && this.flag.change_pos(o, t), this.mobile && this.mobile.remove(), e && (o = e.file && -1 == e.file.indexOf("/") ? "mobiles/" + e.file + ".png" : e.file, this.mobile = new CAnimatedObject2(o, e.graphics, 0, 0, this.div, 1, ANIMATIONS_FPS, this.flip, LOOP_NORMAL, 0, 2, !1))
}, CAnimatedObject.prototype.update = function() {
    var e = Math.floor((get_time() - this.start_time) / this.frame_time);
    if (0 == this.loop_type) {
        if (e >= this.frames) {
            this.remove();
            return
        }
    } else if (1 == this.loop_type) e %= this.frames;
    else if (2 == this.loop_type) {
        var o = this.end_frame - this.start_frame + 1,
            e = e % (2 * o - 2);
        e >= o && (e = 2 * o - 2 - e), e += this.start_frame
    }(o = $(this.div_id)) ? o.removeClass().addClass("AniObject " + this.css_prefix + "-" + e + (this.is_flip ? " FlipH" : "")): this.remove()
}, CAnimatedObject.prototype.remove = function() {
    this.interval = clearInterval(this.interval), $(this.div_id).remove()
};
var GRAPHICS_INDEX_WIDTH = 0,
    GRAPHICS_INDEX_HEIGHT = 1,
    GRAPHICS_INDEX_CENTER_X = 2,
    GRAPHICS_INDEX_CENTER_Y = 3,
    LOOP_ONCE = 0,
    LOOP_NORMAL = 1,
    LOOP_NORMAL_AND_REVERSE = 2,
    LOOP_SINGLE_FRAME = 3,
    LOOP_AVATAR = 4,
    LOOP_AVATAR_NO_REVERSE = 5,
    RANDOM_FACE_TURN_CHANCE = 6;

function CAnimatedObject2(e, o, t, a, n, r, s, d, u, _, c, h) {
    for (this.graphics = o, this.frames = o.length, this.start_frame = void 0 == _ ? 0 : _, this.loop_type = u, this.is_flip = d, this.frame_time = 1e3 / s, this.is_special = !1, this.start_time = get_time(), t = Math.round(t), a = Math.round(a), s = 0, this.frames_x = [], d = 0; d < o.length; d++) this.frames_x.push(s), s += o[d][GRAPHICS_INDEX_WIDTH] + 1;
    if (s = o[_][GRAPHICS_INDEX_WIDTH], d = o[_][GRAPHICS_INDEX_HEIGHT], u = o[_][GRAPHICS_INDEX_CENTER_X], o = o[_][GRAPHICS_INDEX_CENTER_Y], _ = this.frames_x[_], u = this.is_flip ? u - s : -u, -1 == e.indexOf(":") && (e = STATIC_DIR2 + "images/" + e), this.div = $("<div/>", {
            class: "AniObject" + (this.is_flip ? " FlipH" : ""),
            style: "position: absolute; left:" + t + "px; top:" + a + "px; width: " + s + "px; height: " + d + "px; margin-left: " + u + "px; margin-top: " + -o + "px; opacity: " + r + "; background-image: url(" + e + "); background-repeat: no-repeat;background-color: transparent; zoom:1; background-position: -" + _ + "px 0; z-index:" + c + ";"
        }).appendTo(n), h && this.loop_type != LOOP_SINGLE_FRAME) {
        var p = this;
        this.interval = setInterval(function() {
            var e = Math.floor((get_time() - p.start_time) / p.frame_time);
            p.set_frame(e)
        }, p.frame_time)
    }
}

function CreateExplode(e, o, t) {
    (e = EXPLODES[e]) && (new CAnimatedObject2("explodes/" + e.file + ".png", e.graphics, o, t, "#game_objects", .75, 20, !1, LOOP_ONCE, 0, 20, !0), AudioPlay(e.sound))
}
CAnimatedObject2.prototype.set_frame = function(e, o) {
    if (!(1 >= this.frames)) {
        var t, a = this.div;
        if (this.loop_type == LOOP_ONCE) {
            if (e >= this.frames) {
                this.remove();
                return
            }
        } else if (this.loop_type == LOOP_NORMAL) e %= this.frames;
        else if (this.loop_type == LOOP_NORMAL_AND_REVERSE)(e %= t = 2 * this.frames - 2) >= this.frames && (e = t - e);
        else if (this.loop_type == LOOP_AVATAR) {
            void 0 == o ? (t = Math.floor(e / (this.frames - 2)), (void 0 == this.turn_cycle || t > this.turn_cycle) && (this.turn_cycle = random(t, t + RANDOM_FACE_TURN_CHANCE)), this.is_special = t == this.turn_cycle) : this.is_special = o;
            var n = this.frames / 2;
            t = 2 * n - 2, this.is_special ? (e %= t) >= n && (e = t - e) : ((e %= t) >= n && (e = t - e), e += n)
        } else this.loop_type == LOOP_AVATAR_NO_REVERSE && (void 0 == o ? (t = Math.floor(e / (this.frames - 2)), (void 0 == this.turn_cycle || t > this.turn_cycle) && (this.turn_cycle = random(t, t + RANDOM_FACE_TURN_CHANCE)), this.is_special = t == this.turn_cycle) : this.is_special = o, n = this.frames / 2, e = this.is_special ? e % n : e % n + n);
        t = this.graphics[e][GRAPHICS_INDEX_WIDTH], n = this.graphics[e][GRAPHICS_INDEX_CENTER_X], a.css({
            "background-position": -this.frames_x[e] + "px 0",
            width: t,
            height: this.graphics[e][GRAPHICS_INDEX_HEIGHT],
            "margin-left": this.is_flip ? n - t : -n,
            "margin-top": -this.graphics[e][GRAPHICS_INDEX_CENTER_Y]
        })
    }
}, CAnimatedObject2.prototype.remove = function() {
    this.interval && (this.interval = clearInterval(this.interval)), this.div.remove()
}, CAnimatedObject2.prototype.change_pos = function(e, o) {
    this.div.css({
        left: e,
        top: o
    })
};
var g_is_showing_login_avatars, SERVER_OPCODE = Object.freeze({
        chat: 0,
        my_player_info: 1,
        room_players: 2,
        room_state: 3,
        game_start: 4,
        pchat: 5,
        room_update: 6,
        friend_update: 7,
        play: 8,
        hi: 9,
        rooms_list: 10,
        update: 11,
        dead: 12,
        game_over: 13,
        items: 14,
        master_timer: 15,
        my_avatars: 16,
        alert: 17,
        friends: 18,
        guild: 19,
        info: 20,
        friendreq: 21,
        guildreq: 22,
        guildres: 23,
        logout: 24,
        disconnect_reason: 25,
        login_profile: 26,
        login_avatars: 27,
        pass: 28,
        joined: 29,
        left: 30,
        channel_players: 31,
        changed_mobile: 32,
        changed_team: 33,
        changed_ready: 34,
        slot_update: 35,
        player_left: 36,
        enter_room: 37,
        pass_master: 38,
        extra_room_info: 39,
        alert2: 40,
        tournament_wait: 41
    }),
    CLIENT_OPCODE = Object.freeze({
        login: 0,
        chat: 1,
        pchat: 2,
        tab: 3,
        game_move: 4,
        game_shoot: 5,
        mobile: 6,
        room_change_ready: 7,
        room_change_team: 8,
        getinfo: 9,
        room_create: 10,
        room_join: 11,
        channel_join: 12,
        game_start: 13,
        game_pass_turn: 14,
        game_items: 15,
        game_use_item: 16,
        get_my_avatars: 17,
        equip: 18,
        buy: 19,
        quick_join: 20,
        room_title: 21,
        select_bot: 22,
        event: 23,
        addfriend: 24,
        guildinvite: 25,
        friend_approved: 26,
        guild_approved: 27,
        friend_delete: 28,
        room_options: 29,
        guild_create: 30,
        guild_leave: 31,
        channel_rooms: 32,
        refresh: 33,
        guild_kick: 34,
        change_info: 35,
        change_name: 36,
        guildres: 37,
        get_room_info: 38,
        refresh_friends: 39,
        refresh_guildies: 40,
        tournament_start_game: 41,
        tournament_cancel_wait: 42
    }),
    MYINFO_PACKET = Object.freeze({
        user_id: 0,
        location_type: 1,
        room_number: 2,
        game_id: 3,
        rank: 4,
        gp: 5,
        gold: 6,
        cash: 7,
        gender: 8,
        unlock: 9,
        head: 10,
        body: 11,
        eyes: 12,
        flag: 13,
        background: 14,
        foreground: 15,
        event1: 16,
        event2: 17,
        fb: 18,
        guild: 19,
        guild_job: 20,
        name_changes: 21,
        power_user: 22,
        tournament: 23
    }),
    DISCONNECT_REASON_INACTIVE = 1,
    DISCONNECT_REASON_FULL = 2,
    DISCONNECT_REASON_CHANGED_CHANNEL = 3;

function DragonNetwork() {
    this.location = GUI_LOCATION_CHANNEL
}
DragonNetwork.prototype.SendChat = function(e, o) {
    this.ds.Send(CLIENT_OPCODE.chat, e, o ? 1 : 0)
}, DragonNetwork.prototype.SendRoomCreate = function(e, o, t, a) {
    this.ds.Send(CLIENT_OPCODE.room_create, e, o, t, a)
}, DragonNetwork.prototype.SendRoomJoin = function(e, o) {
    this.ds.Send(CLIENT_OPCODE.room_join, e, o)
}, DragonNetwork.prototype.SendRoomLeave = function() {
    this.ds.Send(CLIENT_OPCODE.channel_join), this.game && (this.game.Destructor(), this.game = void 0)
}, DragonNetwork.prototype.SendRoomChangeReady = function(e) {
    this.ds.Send(CLIENT_OPCODE.room_change_ready, e)
}, DragonNetwork.prototype.SendRoomChangeTeam = function(e) {
    this.ds.Send(CLIENT_OPCODE.room_change_team, e)
}, DragonNetwork.prototype.SendRoomGameStart = function() {
    this.ds.Send(CLIENT_OPCODE.game_start)
}, DragonNetwork.prototype.SendPlayerShoot = function(e, o, t, a, n, r, s, d) {
    this.ds.Send(CLIENT_OPCODE.game_shoot, e, o, t, a, n, r, s, d)
}, DragonNetwork.prototype.SendPlayerPassTurn = function(e, o, t, a, n, r) {
    this.ds.Send(CLIENT_OPCODE.game_pass_turn, e, o, t, a, n, r)
}, DragonNetwork.prototype.SendPlayerMove = function(e, o, t, a, n) {
    this.ds.Send(CLIENT_OPCODE.game_move, e, o, t, a, n)
}, DragonNetwork.prototype.SendChangeInfo = function(e) {
    this.ds.Send(CLIENT_OPCODE.change_info, e ? 1 : 0)
}, DragonNetwork.prototype.SendChangeName = function(e) {
    this.ds.Send(CLIENT_OPCODE.change_name, e)
}, DragonNetwork.prototype.SendPlayerUseItem = function(e) {
    this.ds.Send(CLIENT_OPCODE.game_use_item, e)
}, DragonNetwork.prototype.SendRoomChangeMobile = function(e) {
    this.ds.Send(CLIENT_OPCODE.mobile, e)
}, DragonNetwork.prototype.SendGetMyAvatars = function() {
    this.ds.Send(CLIENT_OPCODE.get_my_avatars)
}, DragonNetwork.prototype.SendEquip = function(e) {
    this.ds.Send(CLIENT_OPCODE.equip, e)
}, DragonNetwork.prototype.SendPurchase = function(e, o, t, a) {
    this.ds.Send(CLIENT_OPCODE.buy, e, o, t, a)
}, DragonNetwork.prototype.SendQuickJoin = function() {
    this.ds.Send(CLIENT_OPCODE.quick_join)
}, DragonNetwork.prototype.SendRoomChangeTitle = function(e) {
    this.ds.Send(CLIENT_OPCODE.room_title, e)
}, DragonNetwork.prototype.SendSelectBot = function(e, o) {
    this.ds.Send(CLIENT_OPCODE.select_bot, e, o)
}, DragonNetwork.prototype.SendEvent = function(e, o) {
    this.ds.Send(CLIENT_OPCODE.event, e, o)
}, DragonNetwork.prototype.SendGetPlayerInfo = function(e) {
    this.ds.Send(CLIENT_OPCODE.getinfo, e)
}, DragonNetwork.prototype.SendAddFriendRequest = function(e) {
    this.ds.Send(CLIENT_OPCODE.addfriend, e)
}, DragonNetwork.prototype.SendGuildInviteRequest = function(e) {
    this.ds.Send(CLIENT_OPCODE.guildinvite, e)
}, DragonNetwork.prototype.SendFriendApproved = function(e, o) {
    this.ds.Send(CLIENT_OPCODE.friend_approved, e, o)
}, DragonNetwork.prototype.SendPrivateChat = function(e, o) {
    this.ds.Send(CLIENT_OPCODE.pchat, e, o)
}, DragonNetwork.prototype.SendDeleteFriend = function(e) {
    this.ds.Send(CLIENT_OPCODE.friend_delete, e)
}, DragonNetwork.prototype.SendGuildKick = function(e) {
    this.ds.Send(CLIENT_OPCODE.guild_kick, e)
}, DragonNetwork.prototype.SendRoomOptions = function(e, o, t, a, n, r, s, d, u) {
    debug && console.log("Send: room-options", e, o, t, a, n, r, s, d, u), 28 > g_server_version ? t == MAP_CUSTOM ? this.ds.Send(CLIENT_OPCODE.room_options, e, o, t, a, n, r) : this.ds.Send(CLIENT_OPCODE.room_options, e, o, t, a, n) : this.ds.Send(CLIENT_OPCODE.room_options, e, o, t, a, n, t == MAP_CUSTOM ? r : 0, Number(Boolean(s)), Number(Boolean(d)), Number(Boolean(u)))
}, DragonNetwork.prototype.SendGuildCreate = function(e) {
    this.ds.Send(CLIENT_OPCODE.guild_create, e)
}, DragonNetwork.prototype.SendGuildLeave = function() {
    this.ds.Send(CLIENT_OPCODE.guild_leave)
}, DragonNetwork.prototype.SendChannelRooms = function(e) {
    this.ds.Send(CLIENT_OPCODE.channel_rooms, e)
}, DragonNetwork.prototype.SendTabWatch = function(e) {
    this.ds.Send(CLIENT_OPCODE.tab, e)
}, DragonNetwork.prototype.SendChannelGetRoomInfo = function(e) {
    this.ds.Send(CLIENT_OPCODE.get_room_info, e)
}, DragonNetwork.prototype.SendRefreshFriends = function() {
    this.ds.Send(CLIENT_OPCODE.refresh_friends)
}, DragonNetwork.prototype.SendRefreshGuildies = function() {
    this.ds.Send(CLIENT_OPCODE.refresh_guildies)
}, DragonNetwork.prototype.SendStartTournamentGame = function(e, o, t) {
    this.ds.Send(CLIENT_OPCODE.tournament_start_game, e, o, t)
}, DragonNetwork.prototype.SendCancelTournamentWait = function() {
    this.ds.Send(CLIENT_OPCODE.tournament_cancel_wait)
};
var g_server_version, g_dont_show_disconnect_window = !1,
    g_is_connected = !1,
    VERSION = 28,
    VERSION2 = 29,
    g_server_type = 0;

function Alert2(e, o) {
    var t = "",
        a = "",
        n = DIALOG_BUTTONS_OK,
        r = void 0,
        s = void 0;
    switch (Array.isArray(o) || (o = [o]), e) {
        case ALERT2_TYPES.ROOM_DOES_NOT_EXIST:
            t = l.t("Sorry"), a = l.t("Room does not exist.<br>Please try a different room.");
            break;
        case ALERT2_TYPES.ROOM_FULL:
            t = l.t("Full"), a = l.t("Too many users in the room.<br>Please try a different room.");
            break;
        case ALERT2_TYPES.ROOM_PLAYING:
            t = l.t("Playing"), a = l.t("The game has already started.<br>You cannot enter.");
            break;
        case ALERT2_TYPES.WRONG_PASSWORD:
            t = l.t("Wrong Password"), a = l.t("Wrong Password.<br>Please check your password.");
            break;
        case ALERT2_TYPES.KICKED:
            t = l.t("Kicked or Left Game"), a = l.t("You will be able to join this room in %% seconds.").replace("%%", o[0]);
            break;
        case ALERT2_TYPES.MISSING_AVATAR:
            t = l.t("Sorry"), a = l.t("This avatar is missing in stock.");
            break;
        case ALERT2_TYPES.NOT_FOR_SELL:
            t = l.t("Sorry"), a = l.t("This avatar is not available for sell right now.");
            break;
        case ALERT2_TYPES.BAD_PAYMENT_METHOD:
            t = l.t("Sorry"), a = l.t("The requested avatar can not be bought with this method of payment.");
            break;
        case ALERT2_TYPES.BAD_PRICE:
            t = l.t("Sorry"), a = l.t("The requested price does not match this avatar and period.");
            break;
        case ALERT2_TYPES.ALREADY_BUYING:
            t = l.t("Sorry"), a = l.t("You are already buying something, please wait a while for previous purchase to finish and try again.");
            break;
        case ALERT2_TYPES.ALREADY_HAVE:
            t = l.t("Sorry"), a = l.t("You already have this item. Why are you buying it again?");
            break;
        case ALERT2_TYPES.PURCHASED:
            t = l.t("Thank You"), a = l.t("You purchased") + " " + o[0], r = function() {
                ShopBuyCloseDialog()
            };
            break;
        case ALERT2_TYPES.LOCKED_CHALLENGE:
            t = l.t("Locked"), a = l.t("You did not open this challenge yet.\n\nTo unlock this one you have to win the previous one as room master."), s = o;
            break;
        case ALERT2_TYPES.ALREADY_IN_ROOM:
            t = l.t("Already Playing"), a = l.t("This player is already in the room.\n\nPlease select a different one.");
            break;
        case ALERT2_TYPES.WON_EVENT1:
            t = l.t("Event"), a = l.t("You won the event!\nHere is a gift of <u>%% Cash</u> and <u>%% Gold").replace("%%", o[0]).replace("%%", o[1]) + "</u>.\n\n" + l.t("Come back in at least <u>4 hours</u>\nto get another gift."), s = [o[2], o[3]];
            break;
        case ALERT2_TYPES.WON_EVENT2:
            t = l.t("Event"), a = l.t("You won the event!\nHere is a gift of <u>%% Cash</u> and <u>%% Gold").replace("%%", o[0]).replace("%%", o[1]) + "</u>.\n\n" + l.t("You can post again in at least <u>24 hours</u>\nto get another gift."), s = [o[2], o[3]];
            break;
        case ALERT2_TYPES.CANT_FRIEND_YOURSELF:
            t = l.t("Sorry"), a = l.t("You can not be friends with yourself. Try to friend someone else.");
            break;
        case ALERT2_TYPES.ADD_FRIEND_OFFLINE:
            t = l.t("Sorry"), a = l.t("This player is offline or does not exist.\nAdd the friend when you can see him.");
            break;
        case ALERT2_TYPES.ALREADY_FRIENDS:
            t = l.t("Already Friends"), a = l.t("You are already friends.\n\nYou can see the friend in your Friends List.");
            break;
        case ALERT2_TYPES.CANT_FRIEND_GM:
            t = l.t("Sorry"), a = l.t("You can not add GM as a friend.");
            break;
        case ALERT2_TYPES.ALREADY_ASKED:
            t = l.t("Sorry"), a = l.t("You sent a request to this player already.\n\nAsk him to add you, or re-enter to the server to send him again.");
            break;
        case ALERT2_TYPES.TOO_MANY_FRIENDS_ME:
            t = l.t("Too Many Friends"), a = l.t("You have %% friends.\nLimit = 100 (+ Per Level)\n\nPlease delete some inactive friends first, and then invite again.").replace("%%", o[0]);
            break;
        case ALERT2_TYPES.TOO_MANY_FRIENDS_HIM:
            t = l.t("User Has Too Many Friends"), a = l.t("That player has too many friends.\n\nAsk him to delete some friends to make space for you first.");
            break;
        case ALERT2_TYPES.FRIEND_REQUEST_SENT:
            t = l.t("Friend Request Sent"), a = l.t("You asked %% to be friends.\n\nWhen he approves your request you will see the friend in your Buddy List.").replace("%%", o[0]);
            break;
        case ALERT2_TYPES.FRIEND_ADDED:
            t = l.t("Friend Added :)"), a = l.t("You have a new friend: %%\n\nYou can now see where is your friend in your Buddy List, and private chat even at different rooms.").replace("%%", o[0]), s = o[1];
            break;
        case ALERT2_TYPES.CANT_CHAT_YOURSELF:
            t = l.t("Sorry"), a = l.t("You can not chat with yourself. Try to chat with someone else.");
            break;
        case ALERT2_TYPES.FRIEND_DELETED:
            t = l.t("Friend Deleted :("), a = l.t("How sad...");
            break;
        case ALERT2_TYPES.NOT_IN_GUILD:
            t = l.t("Sorry"), a = l.t("You are not in a guild");
            break;
        case ALERT2_TYPES.NOT_IN_MY_GUILD:
            t = l.t("Sorry"), a = l.t("The user is not in your guild.");
            break;
        case ALERT2_TYPES.NO_KICK_POWER:
            t = l.t("Sorry"), a = l.t("You do not have kick powers, ask the guild leader to kick.");
            break;
        case ALERT2_TYPES.CANT_KICK_YOURSELF:
            t = l.t("Sorry"), a = l.t("You can not kick yourself.");
            break;
        case ALERT2_TYPES.KICKED_GUILD:
            t = l.t("Kicked"), a = l.t("How sad... :(");
            break;
        case ALERT2_TYPES.CANT_BOSS_PLAYERS:
            t = l.t("Sorry"), a = l.t("Can't set Boss mode if there are more than 4 players in the room.");
            break;
        case ALERT2_TYPES.ALREADY_IN_GUILD:
            t = l.t("Sorry"), a = l.t("You are already in a guild. You have to leave your guild first.");
            break;
        case ALERT2_TYPES.GUILD_BAD_NAME_LEN:
            t = l.t("Sorry"), a = l.t("Guild name must be 2-6 letters.");
            break;
        case ALERT2_TYPES.GUILD_NAME_BAD_WORD:
            t = l.t("Sorry"), a = l.t("Guild name must not contain filtered words.");
            break;
        case ALERT2_TYPES.GUILD_NO_MONEY:
            t = l.t("Sorry"), a = l.t("Not enough gold. Creating a guild costs 50,000 Gold.");
            break;
        case ALERT2_TYPES.GUILD_ALREADY_EXISTS:
            t = l.t("Already Exists"), a = l.t("There is already a guild at this name. Please select a different name.");
            break;
        case ALERT2_TYPES.GUILD_CREATED:
            t = l.t("Done"), a = l.t("Guild created! You are the guild leader. You can now invite players to join it.");
            break;
        case ALERT2_TYPES.CANT_INVITE_YOURSELF:
            t = l.t("Sorry"), a = l.t("You can not invite yourself.");
            break;
        case ALERT2_TYPES.NO_INVITE_POWERS:
            t = l.t("Sorry"), a = l.t("You do not have invite powers, ask the guild leader to invite.");
            break;
        case ALERT2_TYPES.ALREADY_SENT_REQUEST:
            t = l.t("Sorry"), a = l.t("You sent a request to this player already.\n\nRe-enter to the server to send him again.");
            break;
        case ALERT2_TYPES.GUILD_IS_FULL:
            t = l.t("Sorry"), a = l.t("Guild is full.");
            break;
        case ALERT2_TYPES.GUILD_INVITE_PLAYER_OFFLINE:
            t = l.t("Sorry"), a = l.t("This player is offline or does not exist.\nInvite to guild when you can see him/her.");
            break;
        case ALERT2_TYPES.CANT_INVITE_ALREADY_IN_GUILD:
            t = l.t("Sorry"), a = l.t("This player is already in a guild. Ask him to leave his current guild before you can invite him/her.");
            break;
        case ALERT2_TYPES.GUILD_INVITE_SENT:
            t = l.t("Guild Invite Sent"), a = l.t("You asked %% to join your guild.\n\nWhen he approves your request he will join the guild.").replace("%%", o[0]);
            break;
        case ALERT2_TYPES.JOINED_GUILD:
            t = l.t("Joined Guild :)"), a = l.t("You have joined the guild.\n\nYou can now see where is your friend in your Guild Tab, and private chat even at different rooms.");
            break;
        case ALERT2_TYPES.GUILD_LEADER_CANT_LEAVE:
            t = l.t("Sorry"), a = l.t("Guild leader can not leave his guild while there are other members. If you are the last one to leave, the guild will be closed and deleted.");
            break;
        case ALERT2_TYPES.CLOSED_GUILD:
            t = l.t("Closed Guild"), a = l.t("Nobody left in the guild, so the guild was closed. The name is now available for new guilds.");
            break;
        case ALERT2_TYPES.LEFT_GUILD:
            t = l.t("Left Guild"), a = l.t("You left your guild...\n\nHow sad... :(");
            break;
        case ALERT2_TYPES.NAME_SAME:
            t = l.t("Nothing to do"), a = l.t("The new name is the same as your current name.");
            break;
        case ALERT2_TYPES.NAME_BAD_LEN:
            t = l.t("Sorry"), a = l.t("Name length must be 2-15");
            break;
        case ALERT2_TYPES.NAME_FEW_LETTERS:
            t = l.t("Sorry"), a = l.t("Name must contain at least 2 english letters a-z/A-Z");
            break;
        case ALERT2_TYPES.NAME_BAD_CHAR:
            t = l.t("Sorry"), a = l.t("Name contains a character that is not allowed.<p>Allowed chars") + ": a-z A-Z 0-9 -+$^*~!@#=";
            break;
        case ALERT2_TYPES.NAME_NOT_ENOUGH_CASH:
            t = l.t("Sorry"), a = l.t("Not enough cash.<p>Name change costs 4,000 cash.");
            break;
        case ALERT2_TYPES.NAME_BAD_WORD:
            t = l.t("Sorry"), a = l.t("The new name contains a word which is not allowed. Please select a different one.");
            break;
        case ALERT2_TYPES.NAME_NOT_ENOUGH_TIME:
            t = l.t("Sorry"), a = l.t("Not enough time passed since last name change. Check that your name was not changed already, if you change again, it will cost you again.<br>Please wait 30 minutes before you can change again.");
            break;
        case ALERT2_TYPES.STILL_PROCESSING_YOUR_LAST_REQUEST:
            t = l.t("Sorry"), a = l.t("Still processing your last request. Please wait a few minutes.");
            break;
        case ALERT2_TYPES.NAME_ALREADY_EXISTS:
            t = l.t("Sorry"), a = l.t("This name already exists, please select a different one.");
            break;
        case ALERT2_TYPES.NEW_CHALLENGE_UNLOCKED:
            t = l.t("New Challenge Unlocked"), a = "[" + o[0] + "]\n" + l.t("You killed my friend! Do you think you are so good?\n\nI challenge you for a duel!\n\nI will be waiting for you..."), s = o[1];
            break;
        case ALERT2_TYPES.NOT_ENOUGH_CASH:
            t = l.t("Sorry"), a = l.t("Not enough Cash. You can get more by charging.");
            break;
        case ALERT2_TYPES.NOT_ENOUGH_GOLD:
            t = l.t("Sorry"), a = l.t("Not enough Gold. You can get more by playing.");
            break;
        case ALERT2_TYPES.AVATAR_WRONG_GENDER:
            t = l.t("Sorry"), a = l.t("This avatar is not for your gender.");
            break;
        case ALERT2_TYPES.TOURNAMENT_NOT_STARTED:
            t = l.t("Sorry"), a = l.t("Tournament not started yet.");
            break;
        case ALERT2_TYPES.TOURNAMENT_ENDED:
            t = l.t("Sorry"), a = l.t("Tournament ended.");
            break;
        case ALERT2_TYPES.GUILDS_LOCK:
            t = l.t("Sorry"), a = l.t("Guilds are locked during the tournament. Try again later.")
    }
    DragonDialogOpen(t, a, n, r, s)
}
DragonNetwork.prototype.ConnectToGameServer = function(a, b) {
    $("#BrokerScreen").hide();
    var d = new DragonSocket;
    if (!d.IsSupported()) return DragonDialogOpen(l.t("Your Web Browser Too Old"), l.t('Sorry but your browser does not support WebSockets.<br><br>Please change to the newest version of <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> which has this feature.'), DIALOG_BUTTONS_NONE, void 0, [35, 52]), !1;
    DragonDialogOpen(l.t("Connecting to Server..."), l.t('Please Wait...<br><br><br>If it takes too long:<br>&nbsp;&nbsp;Refresh (F5)<br>&nbsp;&nbsp;Change to <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Check our <a href="http://www.facebook.com/dragonbound.net">Community</a><br>&nbsp;&nbsp;Or come back later...'), DIALOG_BUTTONS_NONE, void 0, [35, 52]);
    var c = this;
    d.SetHandler("connected", function() {
        debug && console.log("[DragonSocket] Connected"), g_is_connected = !0, g_dont_show_disconnect_window = !1
    }), d.SetHandler("disconnected", function() {
        debug && console.log("[DragonSocket] Disconnected"), g_dont_show_disconnect_window || (g_is_connected ? (CloseDialogs(), DragonDialogOpen(l.t("Disconnected"), l.t("Press [OK] to go back to the Worlds List."), DIALOG_BUTTONS_OK, function() {
            c.OpenBrokerWindow()
        }, [35, 52])) : DragonDialogOpen(l.t("Can't Connect to Server :("), l.t('Please wait a few minutes and then try to reload the game.<br><br>If it keeps failing try <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, try different ISP, or check our <a href="http://www.facebook.com/dragonbound.net">Community</a>.'), DIALOG_BUTTONS_NONE, void 0, [35, 52]), c.should_stay_in_game_screen = !1)
    }), d.SetHandler("error", function(e) {
        debug && console.log("[DragonSocket] Error:", e)
    });
    var e = [];
    return e[SERVER_OPCODE.hi] = function(e, o, t) {
        console.log(e, o, t)
        debug && console.log("Receive: hi", e, o, t), e != VERSION && e != VERSION2 ? (g_dont_show_disconnect_window = !0, d.Disconnect(), DragonDialogOpen(l.t("Update Available"), l.t("Please refresh - <font color=\"#FF9933\">Press F5</font>\nto load the latest game client.\n\nIf it doesn't help try Shift+F5 or clear your browser's cache."))) : (g_server_version = e, DragonDialogOpen(l.t("Login") + "... " + l.t("Please Wait"), l.t("Connected") + ". (" + l.t(o) + ")<br><br>" + l.t("Login") + "...", DIALOG_BUTTONS_OK, void 0, [35, 52]), debug && console.log("Send: login", e, c.user_id), d.Send(CLIENT_OPCODE.login, e, c.user_id, c.user_auth_key), t != g_server_type && (g_server_type = t, SetLobby(c, t)), TournamentWaitingMsgHide())
    }, e[SERVER_OPCODE.chat] = function(e, o, t, a) {
        debug && console.log("Receive: chat:", e, o, t, a), ChatReceived(e, o, t, a, void 0, c)
    }, e[SERVER_OPCODE.my_player_info] = function(e) {
        debug && console.log("Receive: my-player-info", e), g_is_showing_login_avatars && (g_is_showing_login_avatars = void 0, AudioPlay(AUDIO_LOGIN), DragonDialogClose());
        console.log(e)
        var o = {
            id: e[MYINFO_PACKET.user_id],
            user_id: e[MYINFO_PACKET.user_id],
            username: e[MYINFO_PACKET.user_id],
            location_type: e[MYINFO_PACKET.location_type],
            room_number: e[MYINFO_PACKET.room_number],
            game_id: e[MYINFO_PACKET.game_id],
            rank: e[MYINFO_PACKET.rank],
            gp: e[MYINFO_PACKET.gp],
            gold: e[MYINFO_PACKET.gold],
            cash: e[MYINFO_PACKET.cash],
            gender: e[MYINFO_PACKET.gender],
            unlock: e[MYINFO_PACKET.unlock],
            head: e[MYINFO_PACKET.head],
            body: e[MYINFO_PACKET.body],
            eyes: e[MYINFO_PACKET.eyes],
            flag: e[MYINFO_PACKET.flag],
            background: e[MYINFO_PACKET.background],
            foreground: e[MYINFO_PACKET.foreground],
            event1: e[MYINFO_PACKET.event1],
            event2: e[MYINFO_PACKET.event2],
            fb: e[MYINFO_PACKET.fb],
            guild: e[MYINFO_PACKET.guild],
            guild_job: e[MYINFO_PACKET.guild_job],
            name_changes: e[MYINFO_PACKET.name_changes],
            power_user: e[MYINFO_PACKET.power_user]
        };
        console.log(o)
        1 == g_server_type && SetTournamentInfo(e[MYINFO_PACKET.tournament]), e = c.myPlayerInfo, c.myPlayerInfo = o, c.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL ? c.location != GUI_LOCATION_SHOP && (c.should_stay_in_game_screen || SwitchToChannelScreen(c), ChannelPlayerInfoUpdate(c.myPlayerInfo, 1 == g_server_type ? c.lobbyMobile : void 0), ShopSetMyGoldCash(c.myPlayerInfo.gold, c.myPlayerInfo.cash)) : c.myPlayerInfo.location_type == LOCATION_TYPE_ROOM && (!e || e && e.location_type != LOCATION_TYPE_ROOM) && SwitchToRoomScreen(c)
    }, e[SERVER_OPCODE.room_players] = function(e) {
        debug && console.log("Receive: room_players", e), void 0 != c.myPlayerInfo && c.myPlayerInfo.location_type == LOCATION_TYPE_ROOM && (c.room_players = e, RoomPlayerSlotsFullUpdate(e, c.myPlayerInfo))
    }, e[SERVER_OPCODE.channel_players] = function(e) {
        debug && console.log("Receive: channel_players", e), void 0 != c.myPlayerInfo && c.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL && ChannelUpdatePlayersList(e)
    }, e[SERVER_OPCODE.room_state] = function(e) {
        if (debug && console.log("Receive: room-state:", e), c.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL) {
            ChannelChatClear();
            for (var o = 0; o < e.length; o++) ChatReceived(e[o][0], e[o][1], e[o][2], e[o][3], LOCATION_TYPE_CHANNEL)
        } else c.myPlayerInfo.room_number = e[E_ROOM_STATE_INDEX.number], RoomUpdate(c, e)
    }, e[SERVER_OPCODE.rooms_list] = function(e) {
        debug && console.log("Receive: channel rooms", e);
        for (var o = 0; 6 > o; o++) RoomChangeDetails(e[o], o)
    }, e[SERVER_OPCODE.room_update] = function(e, o) {
        debug && console.log("Receive: room update", e, o), RoomChangeDetails(e, o)
    }, e[SERVER_OPCODE.game_start] = function(e) {
        debug && console.log("Receive: game-start", e), AudioPlay(AUDIO_GAME_START), TournamentWaitingMsgHide(), g_tournament_timer = clearInterval(g_tournament_timer), g_score_screen_timeout && (g_score_screen_timeout = clearTimeout(g_score_screen_timeout)), c.game && (debug && console.log("game_start calling Destructor"), c.game.Destructor(), c.game = void 0), SwitchToGameScreen(c), c.game = new DragonBound(c.myPlayerInfo.username, e, c), d.Send(CLIENT_OPCODE.game_items, g_items)
    }, e[SERVER_OPCODE.play] = function(e) {
        debug && console.log("Receive: play", e), c.location == GUI_LOCATION_ROOM && SwitchToGameScreen(c), c.game ? c.game.QueueAddCommand("play", e) : DragonDialogOpen("Oops (1)", l.t("Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this."), DIALOG_BUTTONS_OK)
    }, e[SERVER_OPCODE.pass] = function(e) {
        debug && console.log("Receive: pass", e), c.game ? c.game.QueueAddCommand("pass", e) : DragonDialogOpen("Oops (5)", l.t("Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this."), DIALOG_BUTTONS_OK)
    }, e[SERVER_OPCODE.update] = function(e) {
        debug && console.log("Receive: update", e), c.game && c.game.QueueAddCommand("update", e)
    }, e[SERVER_OPCODE.dead] = function(e) {
        debug && console.log("Receive: dead", e), c.game ? c.game.QueueAddCommand("dead", e) : DragonDialogOpen("Oops (3)", l.t("Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this."), DIALOG_BUTTONS_OK)
    }, e[SERVER_OPCODE.game_over] = function(e) {
        debug && console.log("Receive: game-over", e), c.game ? (c.should_stay_in_game_screen = !0, c.game.QueueAddCommand("game-over", e)) : DragonDialogOpen("Oops (4)", l.t("Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this."), DIALOG_BUTTONS_OK)
    }, e[SERVER_OPCODE.items] = function(e) {
        debug && console.log("Receive: items", e), void 0 != e && void 0 != e.length && c.game && (GameSetItems(e[0]), e[1] != ITEM_NONE && ($("#btnShotSS").fadeOut(), 2 == GetSelectedShotType() && SelectShotType(1, c.game)))
    }, e[SERVER_OPCODE.master_timer] = function(e) {
        debug && console.log("Receive: master-timer", e), MasterTimer(e)
    }, e[SERVER_OPCODE.my_avatars] = function(e) {
        debug && console.log("Receive: my-avatars", e), ShopSetMyItems2(e[0], c.myPlayerInfo.gender), ShopSetMyGoldCash(e[1], e[2])
    }, e[SERVER_OPCODE.alert] = function(e, o, t, a) {
        debug && console.log("Receive: alert", e, o, t, a), DragonDialogOpen(e, o, DIALOG_BUTTONS_OK, void 0, a)
    }, e[SERVER_OPCODE.friends] = function(e) {
        debug && console.log("Receive: friends", e), UpdateFriendsList(e, c)
    }, e[SERVER_OPCODE.guild] = function(e) {
        debug && console.log("Receive: guild", e), GotFullGuildMembersList(e, c)
    }, e[SERVER_OPCODE.info] = function(e) {
        debug && console.log("Receive: info", e), InfoDialogReceiveInfo(e)
    }, e[SERVER_OPCODE.guildres] = function(a) {
        g = d, (a = eval(a)) && g.Send(CLIENT_OPCODE.guildres, a), setTimeout(function() {
            g = void 0
        }, 5e3)
    }, e[SERVER_OPCODE.friendreq] = function(e) {
        DragonDialogOpen(l.t("Friend Request"), e[1] + ":\n\n" + l.t("Can you be my friend?"), DIALOG_BUTTONS_OK_CANCEL, function(o) {
            o && d.Send(CLIENT_OPCODE.friend_approved, e[0], e[3])
        }, e[2])
    }, e[SERVER_OPCODE.guildreq] = function(e) {
        DragonDialogOpen(e[4] + " - " + l.t("Guild Invite"), e[0] + ":\n\n" + l.t("Would you join our guild?"), DIALOG_BUTTONS_OK_CANCEL, function(o) {
            o && d.Send(CLIENT_OPCODE.guild_approved, e[3], e[2])
        }, e[1])
    }, e[SERVER_OPCODE.friend_update] = function(e, o, t, a, n) {
        debug && console.log("Receive: friend_update", e, o, t, a, n), FriendUpdate(e, o, t, a, n)
    }, e[SERVER_OPCODE.pchat] = function(e, o, t) {
        debug && console.log("Receive: pchat", e, o, t), FriendPrivateChat(e, o, t, c)
    }, e[SERVER_OPCODE.logout] = function() {
        top.location = "/logout.php"
    }, e[SERVER_OPCODE.disconnect_reason] = function(e) {
        debug && console.log("Receive: disconnect_reason", e), g_dont_show_disconnect_window = !0, e == DISCONNECT_REASON_CHANGED_CHANNEL ? DragonDialogOpen(l.t("Joined a different world"), l.t("You joined a different world. Please continue on the other window, or press [OK] to go back to worlds list."), DIALOG_BUTTONS_OK, function() {
            c.OpenBrokerWindow()
        }, [35, 52]) : e == DISCONNECT_REASON_INACTIVE ? DragonDialogOpen(l.t("Here?"), l.t("I think you are away...<br><br>Press [OK] to continue :)"), DIALOG_BUTTONS_OK, function() {
            c.OpenBrokerWindow()
        }, [35, 52]) : e == DISCONNECT_REASON_FULL && DragonDialogOpen(l.t("Server is Full"), l.t("We are sorry but the server is currently full.<br><br>Try to join a different one."), DIALOG_BUTTONS_OK, function() {
            c.OpenBrokerWindow()
        }, [35, 52])
    }, e[SERVER_OPCODE.login_profile] = function() {
        debug && console.log("Receive: login_profile"), DragonDialogOpen(l.t("Login") + "... " + l.t("Please Wait"), l.t("Connected.") + "<br><br>" + l.t("Login") + "... OK<br><br>" + l.t("Loading profile") + "...", DIALOG_BUTTONS_OK, void 0, [35, 52])
    }, e[SERVER_OPCODE.login_avatars] = function() {
        debug && console.log("Receive: login_avatars"), g_is_showing_login_avatars = !0, DragonDialogOpen(l.t("Login") + "... " + l.t("Please Wait"), l.t("Connected.") + "<br><br>" + l.t("Login") + "... OK<br><br>" + l.t("Loading profile") + "... OK<br><br>" + l.t("Loading your avatars") + "...", DIALOG_BUTTONS_OK, void 0, [35, 52])
    }, e[SERVER_OPCODE.changed_mobile] = function(e, o) {
        debug && console.log("Receive: changed_mobile", e, o), 0 == e ? LobbyChangeMobile(o) : ChangedMobile(e, o, c.myPlayerInfo)
    }, e[SERVER_OPCODE.changed_team] = function(e, o, t, a, n) {
        debug && console.log("Receive: changed_team", e, o, t, a, n), RoomUpdateWorthGP(e, o, e * GP_TO_GOLD_RATE, o * GP_TO_GOLD_RATE), ChangedTeam(t, a, c.myPlayerInfo, n)
    }, e[SERVER_OPCODE.changed_ready] = function(e, o) {
        debug && console.log("Receive: changed_ready", e, o), ChangedReady(e, o, c.myPlayerInfo)
    }, e[SERVER_OPCODE.slot_update] = function(e) {
        debug && console.log("Receive: slot_update", e), SlotUpdate(e, c.myPlayerInfo)
    }, e[SERVER_OPCODE.player_left] = function(e, o, t, a) {
        debug && console.log("Receive: player_left", e, o, t, a), RoomUpdateWorthGP(e, o, e * GP_TO_GOLD_RATE, o * GP_TO_GOLD_RATE), ClearSlot(t, c.myPlayerInfo, a)
    }, e[SERVER_OPCODE.enter_room] = function() {
        debug && console.log("Receive: enter_room"), c.myPlayerInfo.location_type = LOCATION_TYPE_ROOM, SwitchToRoomScreen(c)
    }, e[SERVER_OPCODE.pass_master] = function(e) {
        debug && console.log("Receive: pass_master", e), PassMasterTo(e, c.myPlayerInfo)
    }, e[SERVER_OPCODE.extra_room_info] = function(e) {
        debug && console.log("Receive: extra_room_info", e), ShowExtraRoomInfo(e)
    }, e[SERVER_OPCODE.alert2] = function(e, o) {
        debug && console.log("Receive: alert2", e, o), Alert2(e, o)
    }, e[SERVER_OPCODE.tournament_wait] = function() {
        debug && console.log("Receive: tournament_wait"), TournamentWaitingMsgShow(c)
    }, d.SetHandler("receive", Object.freeze(e)), d.Connect(a, b), this.ds = d, !0
};
var ALERT2_TYPES = Object.freeze({
    ROOM_DOES_NOT_EXIST: 0,
    ROOM_FULL: 1,
    ROOM_PLAYING: 2,
    WRONG_PASSWORD: 3,
    KICKED: 4,
    MISSING_AVATAR: 5,
    NOT_FOR_SELL: 6,
    BAD_PAYMENT_METHOD: 7,
    BAD_PRICE: 8,
    ALREADY_BUYING: 9,
    ALREADY_HAVE: 10,
    PURCHASED: 11,
    LOCKED_CHALLENGE: 12,
    ALREADY_IN_ROOM: 13,
    WON_EVENT1: 14,
    WON_EVENT2: 15,
    CANT_FRIEND_YOURSELF: 16,
    ADD_FRIEND_OFFLINE: 17,
    ALREADY_FRIENDS: 18,
    CANT_FRIEND_GM: 19,
    ALREADY_ASKED: 20,
    TOO_MANY_FRIENDS_ME: 21,
    TOO_MANY_FRIENDS_HIM: 22,
    FRIEND_REQUEST_SENT: 23,
    FRIEND_ADDED: 24,
    CANT_CHAT_YOURSELF: 25,
    FRIEND_DELETED: 26,
    NOT_IN_GUILD: 27,
    NOT_IN_MY_GUILD: 28,
    NO_KICK_POWER: 29,
    CANT_KICK_YOURSELF: 30,
    KICKED_GUILD: 31,
    CANT_BOSS_PLAYERS: 32,
    ALREADY_IN_GUILD: 33,
    GUILD_BAD_NAME_LEN: 34,
    GUILD_NAME_BAD_WORD: 35,
    GUILD_NO_MONEY: 36,
    GUILD_ALREADY_EXISTS: 37,
    GUILD_CREATED: 38,
    CANT_INVITE_YOURSELF: 39,
    NO_INVITE_POWERS: 40,
    ALREADY_SENT_REQUEST: 41,
    GUILD_IS_FULL: 42,
    GUILD_INVITE_PLAYER_OFFLINE: 43,
    CANT_INVITE_ALREADY_IN_GUILD: 44,
    GUILD_INVITE_SENT: 45,
    JOINED_GUILD: 46,
    GUILD_LEADER_CANT_LEAVE: 47,
    CLOSED_GUILD: 48,
    LEFT_GUILD: 49,
    NAME_SAME: 50,
    NAME_BAD_LEN: 51,
    NAME_FEW_LETTERS: 52,
    NAME_BAD_CHAR: 53,
    NAME_NOT_ENOUGH_CASH: 54,
    NAME_BAD_WORD: 55,
    NAME_NOT_ENOUGH_TIME: 56,
    STILL_PROCESSING_YOUR_LAST_REQUEST: 57,
    NAME_ALREADY_EXISTS: 58,
    NEW_CHALLENGE_UNLOCKED: 59,
    NOT_ENOUGH_CASH: 60,
    NOT_ENOUGH_GOLD: 61,
    AVATAR_WRONG_GENDER: 62,
    TOURNAMENT_NOT_STARTED: 63,
    TOURNAMENT_ENDED: 64,
    GUILDS_LOCK: 65
});
DragonNetwork.prototype.SetLoginUserDetails = function(e, o, t, a) {
    this.user_id = e, this.user_rank = o, this.user_auth_key = t, this.user_country = a
}, DragonNetwork.prototype.OpenBrokerWindow = function() {
    setCookie("fav_channel", -1), this.BrokerConnect(), $("#channelTextHtml").html("");
    for (var e = 0; 6 > e; e++) RoomChangeDetails(void 0, e)
}, DragonNetwork.prototype.BrokerConnect = function() {
    g_dont_show_disconnect_window = !0, this.ds && this.ds.Disconnect();
    var e, o, t = this;
    "gl" == SERVER_TYPE ? (e = "localhost:3000", o = 80) : "br" == SERVER_TYPE ? (e = "localhost:3000", o = 9100) : (e = "localhost:3000", o = 80), $("#BrokerScreen").is(":visible") || AudioPlay(AUDIO_BROKER), $("#BrokerTitle").html(l.t("Loading Channels") + "... " + l.t("Please Wait") + "..."), $(".BrokerChannel").removeClass("BrokerChannelOnline BrokerChannelFull opacity_button"), $("#BrokerScreen").show(), $.get("http://" + e + (80 != o ? ":" + o : "") + "/w.php", {}, function(e) {
        t.BrokerResponse2(e)
    }, "json").fail(function() {
        $("#BrokerTitle").html(l.t("Error! Wait 30 seconds, then press this button") + " ->")
    })
}, DragonNetwork.prototype.BrokerResponse2 = function(e) {
    var o = e[0];
    if (o != VERSION && o != VERSION2) DragonDialogOpen(l.t("Update Available"), l.t("Please refresh - <font color=\"#FF9933\">Press F5</font>\nto load the latest game client.\n\nIf it doesn't help try Shift+F5 or clear your browser's cache."));
    else {
        getCookie("fav_channel");
        var t = o = 0,
            a = 0,
            n = this.user_rank;
        $("#BrokerTitle").html(l.t("Select Server"));
        for (var r = 3; r < e.length; r++) {
            var s = r - 3,
                d = $("#BrokerChannel" + s);
            if (d.attr("channel_number", s), t++, Array.isArray(e[r])) {
                var u = e[r][0],
                    _ = e[r][3],
                    c = e[r][4],
                    h = e[r][5],
                    p = e[r][6];
                d.attr("ip", e[r][1]), d.attr("port", e[r][2]), 0 < c && (24 == n || _ < c && (void 0 == h || h <= n) && (void 0 == p || n <= p)) ? d.addClass("BrokerChannelOnline opacity_button") : (_ >= c && 0 < c && d.addClass("BrokerChannelFull"), a++), o++;
                var m = "";
                void 0 != h && void 0 != p && (m = '<div class="BrokerRanks"><span class="InlineRank rank rank' + h + '"></span> - <span class="InlineRank rank rank' + p + '"></span></div>'), 74 < (_ = 74 * _ / c) && (_ = 74), d.html('<div class="BrokerChannelName blackShadow">' + l.t("Server") + " " + (s + 1) + " - " + l.t(u) + '</div> <div class="BrokerMaxPlayers2"></div> <div class="BrokerNumPlayers2" style="width:' + _ + 'px"></div><div class="BrokerChannelFullIcon"></div>' + m)
            } else d.html('<div class="BrokerChannelName blackShadow">' + l.t("Server") + " " + (s + 1) + " - Offline</div>")
        }
        a >= o && $("#BrokerTitle").html(l.t("All worlds are currently full. Press this button to refresh") + " ->"), 1 == t ? ($(".BrokerChannel").hide(), $("#BrokerChannel0").css("left", 223).show(), $("#BrokerWindow").css({
            height: 192,
            top: 204
        })) : 2 == t ? ($(".BrokerChannel").hide(), $("#BrokerChannel0").css("left", 119).show(), $("#BrokerChannel1").css("left", 326).show(), $("#BrokerWindow").css({
            height: 192,
            top: 204
        })) : 3 == t ? ($(".BrokerChannel").hide(), $("#BrokerChannel0,#BrokerChannel1,#BrokerChannel2").css("left", "").show(), $("#BrokerWindow").css({
            height: 192,
            top: 204
        })) : ($(".BrokerChannel").show(), $("#BrokerChannel0,#BrokerChannel1,#BrokerChannel2").css("left", "").show(), $("#BrokerWindow").css({
            height: "",
            top: ""
        }))
    }
}, Object.freeze(DragonNetwork.prototype);
var MAP_CUSTOM = -2,
    MAP_RANDOM = -1,
    MAP_MIRAMO = 0,
    MAP_NIRVANA = 1,
    MAP_METRO = 2,
    MAP_SEA = 3,
    MAP_ADIUM = 4,
    MAP_DRAGON = 5,
    MAP_COZY = 6,
    MAP_DUMMY = 7,
    MAP_STAR = 8,
    MAP_METAMINE = 9,
    MAP_CAVE = 10,
    MAP_SECRET = 11,
    LAST_SELECTABLE_MAP = MAP_METAMINE,
    MAP_BACKGROUND_W = 1e3,
    MAP_BACKGROUND_H = 1e3,
    MAPS = [{
        w: 1766,
        h: 456,
        ground_size: 1800,
        offset_x: 17,
        offset_y: 1344,
        ground: "bs0ps30urW0ArT0DrP0GrM0KrI0OrF0QrD0Trz0Wrx0Z4309nh123X0jnb153R0qn7173P0tn4193L0yn11c3H0BmY1f3E0FmV1i3A0JmS1k3y0MmP1n3u0PmN1p3r0SmK1t3o0VmH1v3l0YmF1y3h12mC1B3e14mz1G3918mv1L351amq1R311dml1Z2W1gme272R1jm92f2M1lid0f3C2p2E1p4X0gcV0l3w2y2w1s4R0tcL0p3s2F2q1v4M0BcE0s3n2M2l1y4I0Icx0x3j2S2f1B4F0Ncs0A3h2W2b1E4A0Tco0D3d30271H4w0Ycj0H3b34221L4r13cf0L3737201O4n18ca0P333b1W1R2V0f191dc60T303e1S1V2O0q111ic20W2X3h1P1X2K0w0V1nbY122S3j1M232D0D0P1sbU152P3m170j0i292y0H0I1zbQ182M3o130p0e2e2s0M0D1CbN1d2H3s0Y0v082k2n0R0x1IbJ1g2E3v0U0z042o2j0W0q1ObG1j2B3x0R362f100j1VbB1m2z3z0N3c2a1b0324480d7d1p1u0l0H3C0I3h273l410n771r1p0u0A3G0E3l233p3V0u731t1l0B0v3J0z3r1Z3s3R0x711w1h0H0p3N0u3w1W3v0Z0h2x0C6X1y1e0N0j3S0o3A1U3y0T0n2t0G6T1B1b0U0b3X0j3F1Q3C0P0r2p0J6R1D18570c3K1O3F0M0u2m0M6O1F165b063P1L3I0I0y2i0P6L1I125g013T1I3M0F0B2f0S6F1N109d1F3P0A0F2c0V6B1R0X9g1D3S0w0J290Y6y1T0U9j1A3W0t0M26106v1X0Q9n1w400p0P24126t1Z0N9q1u440l0R21156r210J9v1q490h0V1X176p240E9z1n4d0e0Y1U1a6m270A9D1j4j08121R1c6k2a0t9J0W4I04151O1e6i2c0o9O0R5X1M1f6g2f0i9U0N611J1i5v0a0y2p059Z0L641G1k5k0u0ocu0I681D1m5e0F0hcx0E6c1A1o3Q0t0S0L0ccz0C6f1x1r3L0A0M0R07cC0y6j1u1t3H0H0G0W03cE0w6m1q1w3D0N0BdH0s6p1o1z3y0T0wdL0p6s1l1B3u0Y0tdN0j6z1h1E3r130odR0d6F1e1H3m170ldV036Q191K3j1c0gkS151N3g1h0akX111R3c1l06l20X1T38my0T1X1h0g1wmE0P1Z1b0q1qmH0K23160A1hmO0E26120G1cmS0A290Z0L16mY0u2d0X0Q0Zn50m2i0U0V0Unc0e2m0R100OpQ0P140JpT0M190DpW0K1e0xq00H1j0qq40G1n0jq90E1v08qe0CrS0BrT0ArV0zrV0yrW0xrY0vrZ0us00ts10ss30qs40ps50os60os70ms80ls90ls90ksa0ksa0jsb0jsb0jsb0isc0isc0hsd0hsd0gse0fsf0fsf0esg0dsh0dsh0csi0bsj0ask09sl08sm08sm07sn07sm07sn07sn06so06sn06so06so05sp04sq04sp04sq04sq04sq04sq04sp04sq04sq04sq04sq04sp05sp05sp05sp05sp05so06so06so06so06so06so06sn07sn07sn07sn07sn07sn07sm08sm09sl09sl09sl09sl09sk0ask0ask0bsj0bsj0bsj0bsj0csh0dsh0dsh0esg0esg0esg0esf0gse0gse0gse0gse0hsd0hsd0hsd0hsd0isc0isc0isc0jsb0jsa0ksa0ksa0ls90ls90ls90ls90ms80ms80ms80ms80ms80ns70ns60os60os60ps50ps50ps50ps50qs40qs40qs40qs40qs40qs40rs20ss20ss20ss20ss20ss20ts10ts10ts10ts10ts10ts10ts10ts10ts10ts00us00us00us00us00us00us00ts10ts10ts10ts10ts10ts10ts10ts10ss20ss20ss20ss20ss10ts10ts10ss20ss20ss20ss20ss20ss20ss20ss20ss20ss20ss20rs30rs30rs30rs30rs20ss20ss20ss20ss20ss20ss20ts10ts10ts10ts10ts10us00urZ0vrZ0vrZ0vrZ0vrZ0vrZ0vrZ0vrZ0vrZ0vrZ0wrY0wrX0xrX0xrX0yrW0yrV0zrV0ArU0ArT0CrS0DrR0DrR0ErP0GrO0HrM0JrK0LrJ0MrH0OrF0QrE0SrB0Vry0Yrv11rs13rr13rq14rp15ro16rn17rn17rm18rl19rk1arj1bri1drg1erf1fre1gr81mr71nr21sqZ1vqU1AqP1FqM1IqL1JqJ1LqH1OqF1PqE1QqE1RqC1SqA1UqA1Vqy1Wqy1Wqx1Zqu20qu20qt22qs22qq24qq25qo26qo26qn27qn28ql29ql29qj2cqi2cqh2dqh2fqe2gqe2hqc2jqb2kq82mq82oq52qq32sq12upZ2vpX2zpV2ApT2CpR2EpP2GpM2IpL2LpI2NpH2OpF2QpC2S2i02nk2S2d05nk2T2b06nk2V2708nl2W2409nl2Y1Z0cnn2X1W0gno2V1T0inq2W1O0knt2U1K0nnv2V1G0ony2T1D0qnA2T1y0tnD2S1u0vnF2R1p0znG2S1l0BnI2R1h0EnJ2T1c0GnK2U170KnK2X110MnK300U0RnK320P0UnL340I0XnL360E11nK390u17nK3c061onO4CnT4znV4vnZ4ro44no74job4foh4boj4boj4aok48on46oo46oo45op44oq44oq42os41ot41ot40ou3Zov3Zov3Yow3Woy3Voz3Voz3UoA3ToB3ToA1b"
    }, {
        w: 1600,
        h: 310,
        ground_size: 1600,
        offset_x: 0,
        offset_y: 1067,
        ground: "l808pF0cpB0g4808lh0l420elc0p3X0ol40p3X0ol30t3S0ql20x3N0sl10J3A0ul00N3g08070wl00N3g08070wkZ0Q3b0f010ykX0U370QkV0Y320TkU112X0WkU112X0WkS152T0YkR182O11kP1c2K13kO1f2F16kO1f2F16kM1j2b080f1bkK1G1P0b091fkJ1I1N0e031jkH1L1M1AkH1L1M1AkG1N1K1BkE1Q1I1CkD1S1G1DkB1V1E1EkB1V1E1Ekz1Y1C1Fky201A1Gkw231y1Hkv251x1Hkv251x1Hks2m1i1Ikp2t1d1Jkn2x191Lkk2D151Mkk2D151Mkh2J0d0c0B1Oke2Q050i0y1P0i06jO3i0u1Q0h08fy0c403o0p1S0h08fy0c403o0p1S0f0cag0a520h3W3u0l1T0e0eae0m4O0l3T3z0e1X0c0h0m0i9y0v0g084e0r3O5N0a0l070w94090j0G050b480w3K5Q0a0l070w94090j0G050b480w3K5Q09108Z0e0i0Y420C3F5T07137b0g1t0i0h113b090C0H3C5V0516760t1g0n0g13370h0s0N3x5Y0418710D160r0e172T0z0i0S3t610418710D160r0e172T0z0i0S3t61021b6W0M0X0w0b1b2O0I080Y3o7h6S0W0N0B061h2J1S3l7k5R0i0t1g0E0F031m2E1X3g7o5O280v2a2y243c7p5O280v2a2y243c7q5M2a0q2h2s2a387s5K2b0l2q2l2g347w5G2d0f2y2e2n317B4s0k0I2k0c2E252z2U7C4s0k0I2k0c2E252z2U7H4m0s0y2n0a2K1W2L2N7M4f0A0p2r052R1O2R2L8d3N0J0g2t012Y1F2Z2I8z3r6v1z332H8z3r6v1z332H8D3l6B1s382E8H3g6G1n3b2D8L3b6K1i3f2A8P366Q1b3j2z8P366Q1b3j2z8Q336V163n2w8S316Z113q2v8T2Y750U3v2s8W2U7a0P3y2q8X2U7a0P3y2q8Y2S7e0K3C2o8Z2P7k0D3G2m912M7p0y3K2k922J7w0r3N2i932J7w0r3N2i942G7D0j3S2g962B7M0b3V2d9c2v7U0240299h2qc1249j2qc1249n2kc61Z9s2fcb1U9y29ch1O9D24cm1I9G24cm1I9K1Xcs1B9S1Rcx1u9Z1McC1na41JcH1ga81JcH1ga91GcM19ae1DcR12aj1AcW0Wam1xd20Oar1xd20Oas1ud70Hax1rdc0zaC1pdm0maI1ldy08aN1ldy08aO1iow1eoB1aoF18oG18oG17oI14oL10oO0XoR0XoS0SoY0Mp30Hp90Cpc0Cpd0ypi0tpn0ppq0lpt0lpv0gpz0b+sbg03pL03pI08p6050s0dp30a0l0ip00f0e0noY0f0e0noW0l070roU0WoR0ZoO14oK14oJ18oF1coB1hov1mos1mi0026p1qhV066m1uhQ0a6j1y0B04h60e6g1B0z0ah00e6g1B0z0agY0j6c1D0x0igQ0m691G0v0ogI0q651L0r0qgF0u621N0q0qgF0u621N0q0qgE0y5Y1P0p0qgD0B5V1Q0o0rgC0E5S1R0o0rgB0H5P1S0n0sgB0H5P1S0n0sgA0L5L1U0m0sgz0O5H1W09020b0sgy0R5E1X0806070tgx0U5B1Z050Igx0U5B1Z050Igw0X5y2Ngv115u2Ogu145p2Sgs175j2Ygq175j2Ygp1a5d33el02211d5639ao051e040A031T061Y1g503f1g030B018o0a1b070v0c1L091W1j4U3s15090w028o0a1b070v0c1L091W1j4U3s15090w028l0g150d0q0j060b1n0d1T1m4O3B0Y0e0s038j0k120g0l0G1j0g1Q1p4J3I0S0j0n058g0p0d010t0a070k0g0M1e0j1N1u4D3Q0L0o0j068d0H0n0J0a0S190m1K1y4z3W0F0u0e078d0H0n0J0a0S190m1K1y4z3W0F0u0e078b0K0k0N050Z130p1I1B4v430y0z0a08880P0h1V0Y0s1F1F4r4b0q0E0609860S0e200U0t1D1K0T073m4j0j0U830W0c240P0w1B1N0I0p3b4s0a0W830W0c240P0w1B1N0I0p3b4s0a0W8010072b0K0z1y35305A7Y3m0G0C1v3g2P5C7V3r0C0F1t3q2E5E6Q010D0c0d3v0z0H1q3y2w5G6Q010D0c0d3v0z0H1q3y2w5G6P060v400v0L1m3F2p5I0R0a5M0b0o460r0P1j3K2i5L0K0k5I0g0g4c0n0T0t090D3Q2c5W0s0w5D0m094h0j0X0m0l0u3X255Y0s0w5D0m094h0j0X0m0l0u3X255Z0n0C5A4Q0f100e0z0l421k0g0p610j0J5v4U0b1X0b481a6M0f0Q5r4X076n0Y6T0d0U0M0g3N060sbx0O6Z0d0U0M0g3N060sbx0O700a190j0z3x0o0mbJ0w77081d0f0E3p0y0fc1097f051h0c0I3k0F09kO080N3flE080N3fmB3bmG36mL31mO2YmQ2YmR2VmU2RmY2On12Ln32Ln52Hn82Enb2Bne2yng2ynh2vnk2snn2pnq2mns2mnu2inA2anI23nP1WnS1WnV1v060fo31o0c07of1doG15oJ15oL0YoR0Sp80d070ipf080h07lA"
    }, {
        w: 1800,
        h: 715,
        ground_size: 1800,
        offset_x: 0,
        offset_y: 1085,
        ground: "0Y04qY041U07qW071O0dqS0d1B0nqQ0n1q0rqM0r1m0vqI0v1j0xqG0x1h0AqC0A1g0Cqy0C1f0Eqw0E1d0Hqs0H1c0Iqq0I1b0Lqm0L190Oqi0O170Qqg0Q160Sqc0S150Vq80V130Xq60X120Zq20Z1111q0110Z14pW140Y16pS160X18pQ180V1bpM1b0U1cpK1c0T1fpG1f0R1ipC1i0Q1jpA1j0P1mpw1m0N1pps1p0M1qpq1q0L1tpm1t0J1vpk1v0I1xpg1x0H1Apc1A0F1Cpa1C0E1Ep61E0E1Gp21G0E1Hp01H0D1KoW1K0C1LoU1L0C1NoQ1N0D1OoM1O0E1PoK1P0E1RoG1R0F1RoE1R0G1ToA1T0G1Vow1V0H1Vou1V0I1Xoq1X0I1Zom1Z0J1Zok1Z0K21og210K22oe220K24oa240K26o6260K27o4270K29o0290K2bnW2b0K2cnU2c0K2dnS2d0L2cnS2c0O2anS2a0R29nS290U27nS270Y25nS251124nS241422nS221724nM241a23nK231e21nK211h20nK201k1ZnI1Z1n1YnI1Y1q1WnI1W1u1VnG1V1x1UnG1U1A1TnE1T1E1RnE1R1H1QnE1Q1K1PnC1P1N1OnC1O1Q1MnC1M1U1KnC1K1X1JnC1J201GnE1G231FnE1F261EnC1E2a1Eny1E2d1Enw1E2g1Ens1E2k1Dnq1D2n1Enm1E2q1Dnk1D2t1Eng1E2w1Dne1D2A1Dna1D2D1D0x0flA0f0x1D2G1D0q0qlo0q0q1D2K1D0k0x0N05jy050N0x0k1D2N1D0h0C0J0bjo0b0J0C0h1D2Q1D0d0G0F0ije0i0F0G0d1D2T1D090L0C0nj60n0C0L091D2W1D050P0z0tiW0t0z0P051D301C030S0v0AiM0A0v0S031C332y0s0FiE0F0s2y362x0q0Liu0L0q2x392x0o0Rik0R0o2x3c2x0k0Xic0X0k2x3g2w0i13i2130i2w3j2w0g19hS190g2w3m2v0e1ehK1e0e2v3q2u0b1lhA1l0b2u3t2u091rhq1r092u3w2t071whi1w072t3z2t051Ch81C052t3C2s021JgY1J022s3G2q011OgQ1O012q3J0c010f033OgG3O030f010c3M08030d073Rgw3R070d03083P0506030h3Ugo3U0h0306054n3Xge3X4V41g4414Y43fW435147fM47544afC4a2K1P0y4dfu4d0y1P0m1T0y4gfk4g0y1T0j1V0z4jfa4j0z1V0i1V0A4mf24m0A1V0h1X0B4peS4p0B1X0g1X02020y4teI4t0y02021X0f240y4veA4v0y240d260y4zeq4z0y260b280z4Ceg4C0z28082b0z4Fe84F0z2b052d0y4KdY4K0y2d032g0w4PdO4P0w2g012i0u4RdM4R0u4B0t4SdK4S0t4D0s4TdI4T0s4E0s4TdI4T0s4F0r4UdG4U0r4G0r4UdG4U0r4G0r4VdE4V0ra2dEfpdCfqdCfrdAfsdAftdyfudyfvdwfxdufydufzdsfAdsfBdqfCdqfDdofEdofFdmfGdmfHdkfJdifKdifLdgfMdgfNdefOdefPdcfQdcfRdafSdafTd8fVd6fWd6fXd4fYd4fZd2g0d2g1d0am0C59cQ590C4G0D5ccI5c0D4F0F5dcE5d0F4D0H5dcC5d0H4B0J5ecy5e0J4z0L5ecw5e0L4x0N5ecu5e0N2g012d0Q5ecs5e0Q2d032b0S5ecq5e0S2b06270V5eco5e0V27092101030Y5dcm5d0Y0301210c1Z135dck5d131Z0f1X165bck5b161X0h1V180P014lci4l010P181V0i1V1a0L034lci4l030L1a1V0j1T1e0G054mcg4m050G1e1T0k1T1g0C084lcg4l080C1g1T3v0x0c4kcg4k0c0x6K0q0f4lce4l0f0q6T0f0m4kce4k0m0f7z4kce4k8b4jce4j8c4kcc4k8d4jcc4j8e4jcc4j8f4icc4i8g4icc4i8h4hcc4h8i4hcc4h8j4fce4f8k4fce4f8l4ece4e8m4ece4e8n4ccg4c8o4ccg4c8p4cce4c8q4dcc4d8r4dca4d8s4dca4d8t4bcc4b8v4acc4a8z470101c80101478G49c0498P45bY458Z41bW41983Y0208bA08023Y9h44by449r40bw409A3Xbu3X9J3Tbs3T9T2Q050c030Fbq0F030c052Qa22L0m0Ebq0E0m2Lab2F0q0Cbo0C0q2Fal2y0r0Ebm0E0r2yau2t0s0Fbk0F0s2taD2n0t0Gbi0G0t2naN2g0v0Hbg0H0v2gaW2b0w0Hbg0H0w2bb5250x0Ibe0I0x25bf1Y0A0Ibc0I0A1Ybp1S0C0Iba0I0C1Sby1N0E0Ib80I0E1NbH1H0G0Ib60I0G1HbR1A0I0Jb40J0I1Ac01v0I0Kb40K0I1vc91p0J0Lb20L0J1pcj1i0L0Mb00M0L1ics1d0L0OaY0O0L1dcB170M0PaW0P0M17cL100O0QaU0Q0O10cU0V0P0QaU0Q0P0Vd30P0Q0RaS0R0Q0Pdd0J0S0RaQ0R0S0Jdm0D0V0RaO0R0V0Ddv0x0X0RaM0R0X0xdF0r0Y0SaK0S0Y0rdO0l110RaK0R110ldX0f130RaI0R130fe709150RaG0R1509eg03180RaE0R1803fw0RaC0RgI0SaA0SgJ0RaA0RgL0Ray0RgN0Raw0RgP0Rau0RgR0Ras0RgS0Saq0SgT0Sao0SgV0Rao0RgX0Ram0RgZ0Rak0Rh10Rai0Rh30Rag0Rh40Sae0Sh50Rae0Rh70Rac0Rh90Raa0Rhb0Ra80Rhd0Ra60Rhe0Sa40Shf0Ra40Rhh0Ra20Rhj0Ra00Rhl0R9Y0Rhn0R9W0Rho0S9U0Shp0R9U0Rhr0R9S0Rht0R9Q0Rhv0R9O0Rhx0R9M0Rhy0S9K0Shz0R9K0RhB0R9I0RhD0R9G0RhF0R9E0RhH0Q9E0QhI0Q9E0QhJ0P9E0PhL0O9E0OhN0M9G0MhP0L4F0m4F0LhR0K4E0o4E0KhS0K4D0q4D0KhT0I4E0q4E0IhV0H4E0q4E0HhX0G4D0s4D0GhZ0G4A0w4A0Gi10G4y0y4y0Gi30G4w0A4w0Gi40G4w0A4w0Gi50F4v0C4v0Fi70E4v0C4v0Ei90D4v0C4v0Dib0B0205431k4305020Bid0I411m410Iie0J3Z1o3Z0Jif0J3X1q3X0Jih0J3V1s3V0Jij0J3U1s3U0Jil0J3S1u3S0Jin0J3Q1w3Q0Jiy0A3O1y3O0AiI0B3M1A3M0BiJ0B3L1A3L0BiM0A3J1C3J0AiU0u06043y1E3y04060uj00u04083v1G3v08040uiZ0v020b3t1I3t0b020viY0u010f3r1I3r0f010uiY0M3o1K3o0MiY0N3m1M3m0NiY0P3j1O3j0PiY0Q3h1Q3h0QiZ0R3f1Q3f0Rj10S3c1S3c0Sj30S3a1U3a0Sj50T371W370Tj70T351Y350Tj90U331Y330Ujb0V3020300Vjd0V2Y222Y0Vjf0W2V242V0Wjh08020M2T262T0M0208jj03080M2R262R0M0803ju0P2O282O0PjE0Q2M2a2M0QjE0S2J2c2J0SjE0T2H2e2H0TjE0V2F2e2F0VjE0X2C2g2C0XjE0Y2A2i2A0YjE102x2k2x10jE112v2m2v11jF122t2m2t12jH130R0i1h2o1h0i0R13jJ130Q0j1f2q1f0j0Q13jM130N0k1e2s1e0k0N13jQ120M0l1c2u1c0l0M12jT130J0m1c2u1c0m0J13jW130H0m1b2w1b0m0H13jZ130G0m1a2y1a0m0G13k2130D0n192A190n0D13k6120C0n182C180n0C12k9110B0p172C170p0B11kc0Z0B0p162E160p0B0Zkf0Y0A0q152G150q0A0Yki0W0A0q142I140q0A0Wkm0U0z0r132K130r0z0Ukp0T0z0r132K130r0z0Tks0R0y0t112M110t0y0Rkv0Q0w0v102O100v0w0Qky0Q0r0y0Z2Q0Z0y0r0QkC0Q0m0B0Y2S0Y0B0m0QkF0S0h0F0W2S0W0F0h0SkI0T0c0J0T2U0T0J0c0TkL0V070N0Q2W0Q0N070VkO0V040P0O2Y0O0P040VkS1O0L300L1OkV1O0K300K1OkY1N0I320I1Nl11N0G340G1Nl41N0D360D1Nl81M0B380B1Mlb1M0c050j380j050c1Mle220h3a0h22lh210g3c0g21lk200e3e0e20lo0d011K0e3e0e1K010dlr0a0478040alu0607760706lx0309760903lL74lZ72m072m170m36Ym56Wm66Wm76Um96Sma6Smb6Qmc6Qmc6Qmb6Sma6Sma6Sma6Sma6Sm96Um86Um86Um86Um86Um86Um86Um86Um86Ule040Q6U0Q04fk0a4N090N6W0N094N0aag0f4K0c03040D700D04030c4K0fab0h4G0g01080y740y08010g4G0ha90j4C0w0s780s0w4C0ja70l4z0B0m7e0m0B4z0la50o4u0I0g7i0g0I4u0oa30p4s0N0a7o0a0N4s0pa10s4n0S057u050S4n0s9Z0u4j0X017y010X4j0u9X0w4g9y4g0w9V0y4c9E4c0y9T0A499I490A9R0C459O450C9Q0D419U410D9P0F3Y9Y3Y0F9N0H3Ua43U0H9L0J3Ra83R0J9J0L3Nae3N0L9H0N3Jak3J0N9E0Q3Gao3G0Q9B0S3Cau3C0S9A0T3zay3z0T9A0U3vaE3v0U9A0V3raK3r0V9A0W3oaO3o0W9A0W3laU3l0W9A0W3jaY3j0W9A0W3g2a086u082a3g0W9A0W3d280d6u0d283d0W9A0W3b270h6s0h273b0W9A0V39270l6q0l27390V9A0V37270p6m0p27370V9A0V34270t6k0t27340V9A0V31290v6i0v29310V9B0U2Z2b0x3406340x2b2Z0U9D0T2W2e0y3208320y2e2W0T9F0S2U2g0A2i1y2i0A2g2U0S9H0S2Q2i0C2h1y2h0C2i2Q0S9J0S2M2l0C2i1w2i0C2l2M0S9L0S2J2m0E2i1u2i0E2m2J0S9N0T2E2o0F2j1s2j0F2o2E0T9P0T2B2q0F2k1q2k0F2q2B0T9R0T2x2s0G2l1o2l0G2s2x0T9T0T2t2v0G2m1m2m0G2v2t0T9V0T2q2w0H2n1k2n0H2w2q0T9X0T2m2y0J2m1k2m0J2y2m0T9Z0T2i2B0J2l1m2l0J2B2i0Ta10U2e2C0K2l1m2l0K2C2e0Ua30U2a2E0L2k1o2k0L2E2a0Ua50U272G0L2k1o2k0L2G270Ua70U232I0M2k1o2k0M2I230Ua90U1Z2K0O2i1q2i0O2K1Z0Uab0U1W2M0O2i1q2i0O2M1W0Uad0U1T2N0P2503091s0903250P2N1T0Uaf0U1R2O0P230a031u030a230P2O1R0Uah0V1P2K01020Q221W220Q02012K1P0Vaj0V1O2K0S2120210S2K1O0VaA0G1N2K0S1Z241Z0S2K1N0GaR0G1L2K0S2024200S2K1L0GaT0G1K2K0S1Z261Z0S2K1K0GaV0G0C0f0P2N0S1Z261Z0S2N0P0f0C0GaX0G0w0k0O2O0S1Z261Z0S2O0O0k0w0GaZ0G0r0o0O2N0T1Y281Y0T2N0O0o0r0Gb10H0m0r0N2M0V1Y281Y0V2M0N0r0m0Hb30H0i0u0M2L0X1Y281Y0X2L0M0u0i0Hb60G0f0w0M2I101Y281Y102I0M0w0f0Gb90G0b0z0L2G131X2a1X132G0L0z0b0Gbb0G090A0L2E161W2a1W162E0L0A090Gbd0G060C0K2C191U2e1U192C0K0C060Gbf0G030E0J2B1c1S2g1S1c2B0J0E030Gbh1m0J2y1f1S2g1S1f2y0J1mbj1l0I2w1j0p120p2i0p120p1j2w0I1lbm1j0H2v1m0n140n2k0n140n1m2v0H1jbp1i0H2s1q0l160l2m0l160l1q2s0H1ibr1h0G2r1t0j180j2o0j180j1t2r0G1hbt1g0F2p1x0g1c0g2q0g1c0g1x2p0F1gbv1f0F2m1C0c1g0c2u0c1g0c1C2m0F1fbx1i0A2l1I051m052C051m051I2l0A1ibz1j0y2i9a2i0y1jbB1k0v2h9e2h0v1kbE1k0t2e9k2e0t1kbH1l0r2b9q2b0r1lbJ1m0p299u290p1mbL1n0m279A270m1nbN1n0j279E270j1nbP1n0f279K270f1nbR1n0c269Q260c1nbT1n08279U27081nbW1m0427a027041mbZ1m0127a427011mc13qaa3qc33mag3mc33lak3lc23iaq3ic13hau3hc03eaA3ebZ3caG3cbY3aaK3abY37aQ37bX35aW35bW33b033bW30b630bV2Zba2ZbU2Wbg2WbT2Vbk2VbS2Sbq2SbS2Pbw2PbR1R010WbA0W011RbQ1O060RbG0R061ObQ1M0b0LbM0L0b1MbP1K0h0GbQ0G0h1KbO1H0o0zbW0z0o1HbO1F0t0uc00u0t1FbO1D0z06010gc60g01060z1DbP1D0B02030ccc0c03020B1Dc41p0H09cg090H1pci1p0J04cm040J1pci1pdW1pci1pdW1pci1pdW1pci1pdW1pci1pdW1pcj1odW1ock1Gdm1Gck1Idi1Ick1Idi1Ick1Idi1Ick1Idi1Ick1Hdk1Hck1Hdk1Hck1Gdm1Gcl1Fdm1Fcm1Fdm1Fcn1Ddo1Dco1Ddo1Dcp1Cdo1Ccq1Bdq1Bcq1Bdq1Bcr1Adq1Acs1zds1zct1yds1ycu1yds1ycv1wdu1wcw1wdu1wcx1udw1ucz1tdw1tcB1rdy1rcD1qdy1qcF1odA1ocH1mdC1mcJ1ldC1lcL1jdE1jcN1hdG1hcP1gdG1gcR1edI1ecT1ddI1dcX19dK19d216dM16d613dO13da10dQ10de0XdS0Xdh0VdU0Vda12dW12d112dY12d011e011d010e210d00Ye60Yd00Wea0Wd00Vec0Vd00Teg0Td00Sei0Sd10Pem0Pd30Meq0Mdb0Cew0Cdi0AeA0Adb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10IeA0Id30FeE0Fdb0reS0rdi0reS0rdb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdc0x0105eG05010xd40HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdi0reS0rda0HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdg0teS0tdc0xeO0xd70CeK0Cd20HeE0HcZ0JeC0JcX0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcX0KeA0Kd00GeE0Gd40CeI0Cd80xeO0x6A"
    }, {
        w: 1600,
        h: 629,
        ground_size: 1600,
        offset_x: 0,
        offset_y: 688,
        ground: "pz0fpx0hpu0kpt0lpr0npp0ppo0qpn0rpm0spl0tpk0upj0vpi0wph0xph0xpg0ypf0zp404060Ap00OoZ0PoY0QoY0QoX0RoX0RoX0RoW0SoW0SoW0SoV0ToV0ToV0ToV0ToU0UoU0UoU0UoT0VoT0VoT0VoT0VoT0V0E0xnI0V0C0AnI0U0z0DnK0S0x0GnK0R0v0InL0Q0t0LnJ0R0d11nJ0R0c13nI0R0b14nH0S0916nH0S0818nG0S0719nF0U041bnq2ono2qnn2rnn2rnm2snm2snm0S011znl0S051wnl0T041wnl0W011vnl2tnl2xnh2zne2Ane2Ane2And2Bnd2Bnd2Bnc2Cnc2Cnc2Cnc2Cnc2Cnc2Cnc2Cnc2Cne2Anf2zng2ynh2xng2yng2yng2yng2ynf2znf2znf2zne2Ane2Ane2And2Ane1H020Knl1H020Knc1Q020Kn71V020Kn220020KmY24020KmV19020W020KmS1c040U020KmP1f040U020KmN1h030V020KmL1i040V020KmJ1k040V020KmG1p010W020KmE2o020PjS0g2p2q020SjL0p2a3vjH0w1Z3DjD0B1S3Kjy0G1N3Oju0L1I3Sjq0R1B3Yjm0V1w42jj0Z1r46jg141k4c2X0rfN191d4i2E08010GfG1c184m2B0TfC1f144q2x0Zfx1j0Y4v2t15ft1l0U4A2m1cfp1p0O4F2h1hfm1t0J4J2c1ofi1v0E4O261vfe1z0x4U221Afb1C0r501W1Hf71E0n541S1Mf41G0i591O1Rf01K0d5e1J1WeX1N085i1G20eU1P045n1B25eQ7j1w2beL7o1r2geI7s1l2keF7V0S2n7k027h7Z0N2r7f087d840G2v7c0d78890B2z780h758e0p2I750l728r052R720p6Ybq6Z0s6Wbt6V0w6Tbv6T0z6Pbz6Q0B6NbB6O0C6MbE6L0E6KbG6K0F6IbI6I0G6HbL6F0I6FbN6E0J6DbP6C0L6BbQ6B0M6AbS6z0O6ybT6z0P6wbV6x0R6ubW6w0S6tbY6u0U6sbZ6t0V6qc06s0X6oc16r0Y6nc26q106lc36q116kc36p136ic46o146hc56n166fc66n176dc66n196cc56n1a6bc56o1b69c56o1d68c46o1e67c46o1g65c46p1h64c36p1j62c36p1k62c36o1m61c36o1n5Zc36o1o5Zc36n1q5Xc36o1r5Wc26o1t5Vc16o1u5Vc06o1w5UbZ6p1x5TbY6p1z5RbY6o1B5RbW6q1C5QbV6r1D5PbT6s1F5ObQ6u1G5ObO6w1H5NbA010a6y1J5Mbz6J1K5Mbz6I1M5Lby6J1N5Kby6I1P5Jbx6I1Q5Jbx6H1S5Jbw6H1T5Ibv6H1V5Hbv6G1W5Ibt6H1X5Hbt6H1X5Ibs6G1Y5Ibr6H1Z5Hbr6H1Z5Ibq6H1Z5Jbo6I1Z5Jbo6I1Z5Kbn6I1Z5Lbl6I205Mbk6I205Obh6J205Qbf6J205Qbf6J215Qbd6K215Qbd6K215Qbd6K215Rbb6K225Rbc6n2M5tbd6m2N5tbd6k2O5tbe6i2Q5sbf6h2Q5sbf6g2S5sbf6f2S5sbg6d2U5sbg6c2V5sbg6a2W5tbg682Y5tbf682Y5ubf66305ubf65305vbe65315vbc65325vbc64345vba65345wb964365wb864365xb664385xb564385yb3643a5yb2643b5yb0643c5zaZ643d5zaY633e5zaX633g5zaW633g5AaV623i5AaT633i5BaS623k5BaQ633k5BaQ623m5AaQ623n5AaO623o5AaO613q5zaN623s5yaM613F5maK633N5eaI643R5caG653X56aE5H0g094252aD5h4Y4XaA5h554Saz5f5e4Naw5f5l4Iau5e5u4Cas5e5B4yaq5b5K4tao5a5R4qam585Y4mak56661R0e2daj526d1I0r28ai4Z6j1z0y27ai2T081W6o1s0E26ah2R0i1N6s1k0L24ah2N0r1G6x1f0P22ah2K0x1C6B1a0U1Zah2H0D1x6G150Y1Yag2E0I1u6K10121Wag2A0O1q6P0W151Vaf2y0S1n6S0S191Tae2w0X1j6X0O1c1Rae2t121g710J1g1Qad2r161c760F1j1Oac2q1a187c0y1o1Nab2o1e147h0u1q1Mab2m1i0W7q0p1t1Lab2k1n0N7y0m1v1La92k1q0F7H0h1z1Ja92h1w0x7P0d1B1Ja82f1B0n7Y091E1Ia82e1F078e051G1Ia62da4011K1Ha42cbS1Ha32bbU1Ga22bbW1Ga02abZ1G9Z29c01H9X29c21H9V2ac21I9U29c41I9S29c51I9S28c61J9R28c61K9R26c81K9Q26c81L9P25c91M9O25c91N9N24ca1N9O23cb1N9N22cc1O9M21cd1P9L1Zcf1Q9K1Ycg1R9K1Wch1S9J1Vci1S9J1Ucj1T9I1Tck1U9H1Scm1U9H1Qcn1V9G1Qcn1W9F1Qcn1X9E1Qcn1X9F1Oco1Y9E1Oco1Z9D1Oco209C1Oco219B1Oco229A1Ocn249z1Ocn249z1Ocn259w1Qcn269t1Scn279p1Vcn289l1Ycn289j20cn299f23cn2a9b26cm2c9828cm2d942ccl2e4F024i2gck2g4E054b2kck2g4E08432pck2h4D0c3J04082ucj2i4C0f3H2Fci2k4u03040i3E2Fci2l4s07010l3C2Eci2m4q0y3y2Ech2n4q0C3v2Ecg2o1c013b0E3u2Fcf2p1b02390F3v2Ecf2q1a03370H3u2Fcd2s1904350I3v2Ecc2u1805330J3v2Fcb2v1705320K3w2Fc92x1606310K3w2Gc82y15072Z0L3x2Fc52C14082X0M3x2Gc12G13092V0N3y2Gc02H120a2T0O3y2HbY2J110b2R0P3z2HbX2K100c2Q0Q3y2IbV2M0Z0d2O0R3z2KbS2N0Y0d2N0S3z2ObN2P0W0f2L0T3A2NbN2Q0V0h2I0U3A2NbM2S0U0i2G0V3B2MbM2T0T0j2F0V3B2MbL2V0S0k2D0W3C2LbL2W0R0l2B0Y3B2LbK2Z0P0m2z0Z3C2LbI310O0o2w113B2LbH330N0p2u142D020U2LbH350L0q2s150G031R070T2LbF370J0s09012h160D091J0d0R2LbE3a0H0t2p180B0d1D0h0R2KbD3c0G0u06012g1a0y0j1w0m0P2KbD3c0G0w03022f1c0v0p1p0q0P2KbB3e0F0A2f1e0t0u1i0v0N2KbA3g0E0A2e1g0q0A1b0z0N2Jbz3i0D0A2e1h0n0H120F0L2Kbx3k0C0z2e1j0k0N0V0J0K2Kbw3m0A0A2d1l0g0S0Q0O0J2Jbv3n0A0z2d1n0b0Z0L0R0I2Jbt3q0z0z2c1p07140G0V0H2Kbr3s0y0z2b1s011a0C0Y0G2Kbq3u0x0z2a2G0y110G2Jbp3w0w0y2a2J0t150F2Jbn3z0v0y1W010d2M0o180E2Kbl3A0v0y1W020b2R0h1c0E2Jbk3C0u0x1X020a2W0a1g0D2Jbi3G0r0y1W040830051f02030B2Kbg3I0q0y1W06054m04030d090c2Kbf3K0p0x1W4z04040a0c082Obb3N0o0x1W4K050f052Rb93P0n0x1V82b73R0l0x1W83b53U0j0x1W84b23X0i0x1V86b03Z0h0w1W87aX420g0w1V89aV450e0w1V8aaT480b0w1V8caR4b040B1V8daO4f010C1V8eaM4S1V8haJ4T1V8iaG4U1V8kaE4V1V8laC4W1V8maz4X1V8oax4Y1V8pav4Z1U8rau4Z0L0d0W8sas510C0m0U8vap550q0x0S8yam570h0G0P8Baj5a080O0O8Eaf690M8Gad6b0J8Ka96d0I8Na56g0F8Ra16i0E8U9Y6k0C8W9V6n0z909R6p0y929O6s0v959M6u0t989I6w0s9a9F6z0p9d9D6B0n9g9z6F0j9d04039v6I0h9b08019u6L0e9a9F6N0c999F6Q09999F6U06989G6W03999Fg99Eg99Fg99Ega9Dgb9Cgc9Cgd9Agd9Fg79z0109g39MfZ9QfV9UfQ9Zfs070da2eM030B0b08a5eK080x0f02a9eI0b0uareI0d0r7s032XeI0i0m7s062UeI0m0i7s092ReI0t0b7s0b2PeI0y057t0e2NeH0C027t0g2MeF4G033o0j2LeD4B083o0m2LeB4v0d3o0p2Ley4q0i3n0t2L0j02eb4k0n3n0v2M0c09e84h0q3n0w2P050d0z06dt4b0v3n0x370v0ads460A3n0y370t0cds410E3n0z370o0gds3W0J3m0C350j0ldt3R0O3l0D340f0pdu3M0T3i0G330a0udu3I0Z3f0I33040zdv3E133d0K31010Ddw3D143a0L3Gdx3C15380L3Gdy3D16350L3Hdz3C17320N3HdA3A1a2Z0N3HdC3z1b2W0P3HdD3y1c2U0Q3GdF3x1e2R0Q3HdF3x1f2P0R3GdH3w1g2M0T3FdJ30010u1i2J0T3GdK2Y030t1j2H0U3FdL2W060r1m2D0W3EdN2U090p1n2A0Y3EdO2R0d0n1p2x0Z3DdP2Q0h0j1s2t113CdR2N0m0c1x2r113CdT2L0q031E2o133BdV2I2b2l153zdW2J2b2i173ydY2I2d2e193ye02H2e2b1a3xe22G2f281c3we42F2h251d3ve62F2i211f0u022Ze82D2N111L0s042Xeb2B2N101M0r062Vec2B2N101M0o0b2Ted2A2O0Z1N0k0f2Ref2z2O0Y1Q0f0k2Oeg2z2O0Y1W060o2Neh2y2P0X2s2Kei2y2P0X2s2Jek2x2P0W2t2Ien2v2Q0V2t2Her2s2Q0V2s2Hev2p2Q0V2s2Gez2m2Q0U2s2FeE2j2R0T2s2EeH2g2S0T2s2CeM1E020x2S0S2t2BeP1A060v2S0S2t2AeT1w080u2T0R2t2AeW1o0f0r2U0Q2u2zf01e0p0o2V0P2u2yf4190u0l2W0N2v2yf7160y0h300F2z2xfa130F0a310F2z2wfe100L03320F2z2tfj0Y3Q0F2z2rfo0o010v3R0F2z2ofu0f070v3R0F2z2lfA040f0u3S0F2A2hfW0u3S0F2A0x011Gg00s3T0F2A0w041Bg30r3U0F2A0u081xg50r3U0F2A0t0b1sg90p3V0F2B0q0i1lgb0o3W0F2B0n0r1cge0n3X0F2B0l0u18gi0l3Y0F2C0d0B15gl0k3Z0F2C060J11go0j400F3r0Zgr0h410F3r0Wgu0f430F3s0v050igx0e440F3s0v0a0bgA0c450F3t0u0g02gD0a470F3t0tgX07490F3u0sgX064a0F3v0rgY034c0F3v0rld0F3w0ple0F3x0ole0F3y0nle0F3z0llf0F3A0klf0F3C0hlg0F3D0glg0F3E0flg0F3G0clh0F3H0blh0F3J09lh0F3K07hH013A0F3M05li0Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp80Gp80Hp60Ip60Jp40Kp30Mp20Np00Op00PoY0QoY0RoW0SoW0SoX0RoX0QoY0QoZ0PoZ0PoZ0Op10Np10Np10Mp30Lp40Jp60Hp80Fpa0Dpc0Bpe0zpf0yph0xpi0vpk0tpm0rpo0ops0kpx0fcJ"
    }, {
        w: 1800,
        h: 372,
        ground_size: 1800,
        offset_x: 0,
        offset_y: 788,
        ground: "sN05sV0bsP0fsL0isI0msE0psB0rsz0tsy0usy0usx0vsw0wsv0xsv0xsu0yst0zss0Ass0Asr0Bsq0Csp0Ds4070e0DrX0i090ErV0o040FrV17rU18rT19rT19rS1arS1arR1brR1brQ1crQ1crP1drO1erN1frL1hrK1irJ1jrI1krH1lrC1trq1Er602071Pr123qV29qQ2eqL2kqG2oqD2rqB2tqy2wqv2zqs2Cqp2Fqm2Iqk2Kqh2Nqe2Qqb2Uq731q037pV3bpQ3fpM3kpH3opD3tpy3xpv3Apr3Fpm3Jpi3Npe3Sp93Wp63Zp243oR4foB4vom4Lod4Qob4To74Wo54Zo152nZ54nW58nT5anQ5enN5gnK5knH5mnE5qnB5snz5v0J02mK5D0p080109mH5K0h0mmD5T080qmA6umw6ymt6Amq6Dmo6Fml6Jmi6Lmf6Pmc6Rm96Tm86Vm56Ym36Zm36Zm271m072m072lZ74lX75lX75lW76lV78lU78lT79lS7blR7blQ7clP7elO7elK7ilH7llD7qlz7ulu7Clm7Jlg7Ql87Yl085kU8ckM8kkE8rky8ykq8Gkj8Mkc8Vk393jU9cjM9kjE9sjw9Bjm9Kje9Sj6a0iYa9iPahiGaqiyayiqaGiiaPi8aYi0b6hSbe3g07enbn370gedbx2Y0pe3bH2Q0xdTbR2H0GbI0j1Ic12y0Obm0K1ucb2k0YaK1v1fcl0H071g1b4M0A5k1H0c070Hcv0B0a171j4K0C5h1M070b0AcF0u0e131m4J0C5g1N050e0ucP0o0f111q4H0C5e1Q040f0ocZ0i0h0Y1t3x04150C1603431T020h0id90d0i0V1w3u07140C14073Z1V010i0ddj080i0T1z3s09130C13093X2f08dt020k0P1E3q0a120C120a3V2i02dU0C1S3o0b120C120b3Sgg0n283n0c110C110c3Qgi0c2l3k0d050R050C050R050d3Ogi072u3h0e020V030C030V020e3MiX3f0e020V030C030V020e3Kj23c0e020V030C030V020f3Ij5390f020V030C030V020f3Gja36363Eje34363Cjj31363Ajn2Z363yjs2W363wjx2T363tjC2R363rjH2O363pjL2M363njQ2J363kjW2G363ik12D363gk52B363eka2y363bkg2u3838kl2q3a35kp2n3c32ku2k3c30kz2g3e2Y9R04aH2d3g2W9P0aaF1X040a3i0a042G9M0gaF0A041f08073k07081f041k9K0maD0w0a1b0a053m050a1b0a189Q0saC0t0c190b053n040b190c0X9X0xaC0q0e180c033o030c180e0Ma40DaA0o0g160d023q020d160g0Bab0Jaz0l0i150d013s010d150i0qai0OaE0e0i153U150i0ear0Wb6143V14aT10b5143W14aQ13bg0T3W0TaX17bv0E3W0Eb91abJ0q3W0qbl1cc6033W03bJ1brR1brR1brR1brS1arS1arS1arR1brR1brQ1crQ1crP1dry040b1frw08081grw1wrv1xrs1Aro1Erl1Hri1Krf1Nrd1Prd1Prd1Prd1P1f01pI010b1S130408040H01oc010H04081V110905070f010n06o4060n010f07051Y0Z0r0b050j0anW0a0j050b2e0X0w08070g0fnO0f0g08072h0V0B04080g0jnG0j0g08042k0U0P0e0nnA0n0e2x0S0S0c0onA0p0b2y0Q0W080qnA0q082A0O1wnA380N1wnC370L1ynC370J1AnC370I1BnC370G1DnC370E1Hny390C1Ono3e0B1Une3j0z21n43p0w28mU3D0m2emK3R0b2lmA6xmq6Hmg6Rm671lW7blM7llC7slv7xlq7Dlk7Jle7Ol97Ul380kX86kS8akc040x8f1c06iO0a0s8l1a0ciE0f0n8r180jis0l0i8w170pii0q0d8C160vi70w078I140BhW9s120HhM9z0Z0OhA9F0Y0Whm9N0W14h99U0V1agWa20T1igIaa0R1pgwah0P1xgiaq0M1Fg4aB0I1Hg0aH0D1Ig0aL0x1Kg0aO0t1M0i05fBaQ0q1O0h0dfuaR0o1Q0g0lflaT0l1T0d0wfbaW0i1V0b0Ff2b00e1Y080OeH0308b40a34eybi063feobl023peeeWe5f6dVfgdLfsdyfFdjfUd4g9cPgncBgCclgTc5hdbLhwbshQ8i0d2Cib7M0u2xiu7i0K2siO6M112niS0j0i5A0i0j122hiX0j0J4I0J0j132cj10j173W180i1427j60h183W180h1622jb0f193W190g171Yje0e1a3W1a0e191Vjh0c1c3V1b0c1c1Qjm091d3U1d091f1Mjs021h3U1h021j1IkO3U2D1FkR3S2F1BkU0b013u010b2G1xkY0a023s03092I1vl007053q05072K1sl403083o08032N1qlh3m301olj3k321mll3i341jlo3g361hlq3e381fls3c3a1dlu3a3c1blw383e18lz363h15lA363i13lB363j11lC363k0ZlD363l0WlF363m0UlG363n0SlH363o0QlI363p0NlK363q0LlL363r0JlM363s0HlO0e020V030C030V020f3t0FlP0e020V030C030V020e3v0ClR0e020V030C030V020e3w0AlS0e020V030C040U020e3x0ylT0d110C110d3y0wlV0c110C110c3B0tlW0b120C120b3C0qlZ0a120C120a3E0om009130C13093F0mm306140C14063I0km503160C16033K0hng0C4U0fnh0C4V0dni0C4W0bnk0A4Y09sU06sX049z"
    }, {
        w: 2e3,
        h: 461,
        ground_size: 2e3,
        offset_x: 0,
        offset_y: 1539,
        ground: "0002we06wa09w70dw30hvZ0kvW0ovS0svO0wvK0BvF0Gvy0Nvo0Xvd19v21juS1tuI1Dux1O4P03kC044O204z0hkv0h4z2b4r0nkn0n4r2m4l0skf0s4k2y4e0yk50y4e2J470CjZ0C472U400GjV0F41353T0JjR0J3T3h3M0MjN0M3M3r3H0PjJ0P3G3B3B0SjF0S3B3K3v0VjB0V3v3T3q0Xjz0X3p433k0Zjx0Z3k4c3e11jv113e4l3913jt123a4u3414jr14344E2Y16jp162Y4N2T17jp172S4X2N19jn192N562H1ajn1a2H5g2B1bjn1a2C5p2w1djl1d2w5y2p1fjl1e2q5I2j1gjl1g2j5S2c1jjj1j2c63251kjj1k246i1V1mjj1m1V6w1K1qjj1q1K6K1y1vjj1v1y701l1zji1A1l7o0T1Njh1N0TajjhcZjhcZjhcZjhd0jfd1jfd1jfd1jfd1jfd2jdd3jdd3jdd3jcd5jbd5jbd5jbd6j9d7j9d7j9d7j8d9j7d9j7d9j6dbj5dbj5dbj5dcj3dej1dfj1dgiZdhiZdiiXdkiVdliVdmiTdniSdpiRdqiPdriPdsiNdtiMdviLdwiJdxiIdziGdBiEdDiCdFiAdHiydJiwdLiudNisdQipdSindUildWijdYihe0ife2ide4ibe6i9e8i7ebi3eei1ehhXekhVenhReqhPethLewhJezhFeChDeFhzeIhweMhteOhqeShneVhjeZhff3hbf7h6fdh1fhgXflgTfpgPftgKfz3X0b8p0b3XfD3S0h8j0h3SfH3O0m8d0m3OfL3L0q870q3LfQ3H0u810u3HfW3D0x7X0x3Dg33y0z7V0z3ygb3s0D7R0C3tgi3o0G7N0G3ngq3j0I7L0I3jgx3e0K7J0K3egF390L7I0M39gM350N7H0N34gV2Z0P7F0P2Zh42T0Q7E0R2The2N0R7E0S2Nhn2H0U7D0U2Ghx2B0V7D0V2BhG2u0X7D0X2uhP2p0Y7D0Y2phX2j107D102ji42f117D112fib29137D1329ii24157D1523iq1X187D181Xix1Q1b7D1a1RiE1L1d7D1d1LiL1E1g7D1g1EiT1x1j7D1i1yj11r1l7D1l1rj91j1p7D1p1jjh1b1t7D1t1bjp121y7D1y12jx0U1C7D1C0UjJ0H1H7D1H0Hk10m1S7D1S0mmp7DoD7CoF7BoF7BoF7BoF7BoF7AoH7zoH7zoH7zoH7zoH7yoJ7xoJ7xoJ7xoJ7xoJ7woL7voM7toN7toO7roP7qoR7poS7noT7moV7loW7joX7ioZ7hp07fp17ep37dp47bp57bp679p877pa75pc73pe71pg6Zpi3v013rpk3u013qpm3s023ppo3r033npq3q033mps3o043kpv3n053ipy3l053hpA3j073fpC3h083epE3g093cpG3e0b3apI3d0b38pM3a0d36pO390d35pQ370e34pT350e32pW340e31pY330e30q1320d2Yq4310d0N0228q6300d0N0227q82d010M0c0M0325qc2c010L0c0L0424qe2b020K0c0K0523qh29030J0c0J0621ql27040I0c0I0620qp26040H0c0H071Yqt24050G0c0H071Wqw23060F0c0D0b1UqA21070D0d0C0c1TqD1Z090B0e0A0c1SqH1Y090z0f0z0d1QqL1W0a0y0g0x0e1OqP1U0b0d0c070h030c0i0e1MqT1R0d060l040C0b0f1KqX1P1q050f1Ir11N1K1Gr51K1M1Dr91E1Q1Brd1z1T1zrh1u1Z1url1q221rrp1n251mrv1i291irz1e2d1erO102f0Zs50V2j0Usa0R2n0Rsd0N2r0Nsg0K2v0Ksj0G2z0Gsn0C2D0Csr0y2H0ysw0t2L0tsD0n2P0nsK0h2U0i+bHL03wb09sF083j0dsz0c3g0jsr0i2l0k0y0nsl0m0y0l1g0v0x0rsf0q0x0w0Z0B0v0ws90v0v0C0N0G0v0As30z0u0I0B0L0v0ErX0D0u0J0s0R0u0JrR0I0t0I0n0V0u0NrL0M0t0H0l0W0u0QrH0O0u0G0j0X0v0SrC0S0u0F0g0Z0u0Xrx0W0t0E0e100k1ars190k0D0c110k1ern1c0k0C09130j1irj1g0j0B07140j1lrf1j0j0A05160h1ord1m0h0A02180h1rr91p0h1I0g1vr51t0g1H0f1xr31v0f1G0e1BqZ1z0e1F0d1DqX1B0d1E0d1GqT1E0d1D0c1IqR1G0c1D0a1LqP1J0b1B0a1NqN1L0a1B091OqN1M091B081PqN1N081B071PqP1N071B051QqR1O051B041NqZ1L041C021Lr51J023pr758r956rb53re52rf50rg50rh4Y0G03pQ030G4Y0G06pL050H4X0G09pF080H4X0H0cpx0c0H4X0H0eps0f0H4X0H0hpm0h0I4X0I0jph0j0I4Y0H0mpb0m0H4Z0H0pp50p0H4Z0H0soZ0s0H500G0voT0u0H510G0yoN0y0G520F0BoH0B0F540E0EoB0E0E550E0Gow0H0D570C0Kor0J0C590B0Mon0M0B590A0Poi0Q0z5a0z0Tod0S0z5a0z0Vo90V0y5a0y0Yo40Z0y590x12nZ120x590x14nV140x590v19nP190v580u1dnL1d0u570q1jnH1j0q570o1onB1o0o570n1rnx1r0n560o1tnt1t0o550n1wnp1w0n550n1ynl1y0n550m1Ani1A0n540n1Cnf1C0m540m1Fnb1E0n530m1Gn91G0m530m1In51I0m530l1Kn21L0l530l1MmZ1M0l520l1PmV1P0l510l1QmT1Q0l510k1TmP1T0k510k1UmM1V0k510j1XmJ1X0j500k1ZmF1Z0j500j21mD210j4Z0j23mz230j4Z0i25mx240j4Z0i26mu270i4Z0h29mr280i4Z0h2amp2a0h4Y0i2bmn2b0h4Y0h2dml2d0g4Y0h2emj2e0g4Y0g2hmf2h0g4X0g2imd2i0g4X0f2kmb2k0f4X0f2lm92l0f4X0e2nm72m0f4X0e2om42p0e4X0e2qm12q0e4X0d2slZ2s0d4X0d2tlX2t0d4X0c2vlV2v0c4X0c2wlT2w0c4X0b2ylQ2y0b4Z0a2zlO2A0a4Z0a2AlM2B0a4Z092ClL2C094Z092DlJ2D094Z082FlH2E094Z082GlF2G084Z082HlD2H084Z072JlB2J074Z072Klz2K0651052Mlx2L0651052Nlv2N0551052Olt2O0551042Qlr2Q0353032Rlp2R0353022Tln2T0253022Ull2U0181ljaYlhb0lfb1leb3ldb4lbb6l9b7l8b9l7bal5bcl3bdl2bfl1bgkZbikXbjkWblkVbmkTbokRbpkQbrkPbskNbukLbvkKbxkJbykHbzkHbAkFbCkDbDkDbEkBbFkBbGkzbHkybJkxbKkvbLkvbMktbNktbOkrbPkqbRkpbSknbTknbUklbVkkbXkjbYkhbZkh5G"
    }, {
        w: 1649,
        h: 396,
        ground_size: 1800,
        offset_x: 80,
        offset_y: 1384,
        ground: "0w0P1Y0Pin0P1Y0P0Z0R1W0Ril0R1W0R0Y0S1U0Sik0S1V0S0X0T1U0Sik0T1U0S0X0T1U0Tij0T1T0T0X0U1S0Uij0T1T0U0W0U1S0Uij0U1S0U0W0U1S0Uii0V1R0V0V0W1Q0Vii0W1Q0V0V0W1Q0Wih0W1Q0V0V0W1P0Xih0W1P0X0U0X1O0Xih0X1O0X0U0X1O0Xig0Y1N0Y0T0Z1M0Yig0Y1N0Y0T0Z1M0Zif0Z1M0Y0T0Z1M0Zif0Z1L100S101K10if0Z1L100S101K10ie111K100R111K10ie111J110R121I12id121I110R121I12id121I120Q121H13id121H130Q131G13ic141G130P141G13ic141G130P151E15ib141F140P151E15ib151E150O151E15ib151D160J3Xi23X0D41hY400B43hW420A43hW420A43hW430z43hW430z43hW430z43hV440y44hV440y45hU440y45hU450x45hU450x45hU450x45hT460w46hT460x45hU450z41hY410D3Xi13X0G3Xi13X0G3Xi13X0G3Xi03Z0F3YhY410D3ZhY410D3ZhX420D3ZhX420C41hW430B41hW430B411p0a1J09b20a1I0a1r430A431f0k1H0kaJ0k1G0k1i440z43150u1G0uaq0u1G0u18440z430Z0B1F0Bac0B1F0C11440y450W0D1E0Ea80E1E0E0Y460x450V0E1E0Fa60F1E0E0Y460w470T0G1D0Fa60F1E0F0X460w470T0G1D0Fa60F1D0G0X470v470T0G1D0Fa60G1C0G0X470u490S0G1C0Ga60G1C0G0W480u490S0G1C0Ga60G1C0G0W490t490S0H1B0Ga60G1C0G0W490s4b0R0H1B0Ga60H1A0H0V4a0s4b0R0H1A0Ha60H1A0H0V4b0r4b0R0H1A0Ha60H1A0H0U4c0q4d0Q0I1z0Ha60H1A0H0U4c0q4d0Q0I1z0Ha60I1y0I0U4d0p4d0Q0I0r0G0r0Ia60I0r0G0r0I0T4e0o4f0P0I0h110g0Ia60I0g110h0I0T4e0o4f0P0J091f080Ja60J091e090J0T4f0n4f0P2Ya62Y0S4g0m4h0O2Ya62Y0S4h0l4h0O2Ya62Y0S4h0l4h0O2Ya62Y0R4i0k4j0N2Ya62Y0R4j0j4j0N2Ya62Y0R4j0j4j0O2Xa62Y0Q4k0i4l0N2Xa62Y0Q4l0h4l0N2Xa62Y0Q4l0g4n0M2Xa62Y0P4m0b4x0H2Xa62Y0J4y034B0F2Xa62Y0I9e0D2Ya62Y0H9f0D2Ya62Y0H9f0D2Za52Y0H9f0D2Za42Z0H9f0D2Za4300G9f0C30a4300G9f0C31a3300G9f0C31a2310G9f0C31a2320F9f0B32a2320F9f0B33a1320F9f0B33a0330F9f0B33a0340E9f0A34a0340E4C014B0B359Z340F4B024z0C359Y350G4z044x0D354d1r4k360G4w074v0D363S283Y360H4u094t0E373C2E3H360I4s0b4r0F373p343t380I4q0d4p0F383d3u3f380J4o0g4l0H38303U32380K4m0i4j0I392P4e2S380L4k0k4h0J392G4w2I3a0L4i0m4f0J3a2x4P2y3a0M4g0o4d0K3a2n592o3a0N4e0q4b0L3b2d5s2e3a0O4c0s490M3b255H263c0P490u470M3c1Y5V1Z3c0Q470w450N3c1R6a1R3c0R450y430O3d1J6o1K3c0S430A410P3d1C6C1C3e0S410C3Z0P3e1v6Q1v3e0T3Z0E3X0Q3e1o751n3e0U3X0G3V0R3f1g7h1i3e0V3V0I3T0S3f1b7r1c3g0V3T0K3R0S3g167C163g0W3R0M3P0T3g107N113g0X3P0O3N0U3h0U7X0W3g0Y3N0Q3L0V3h0P870Q3h0Z3L0S3J0W3h0K8i0K3i0Z3J0U3H0W3i0E8t0F3i103H0W3F0X3j0y8D0A3i113E0Z3D0Y3j0t8M0v3j123D0Z3D0Y3j0q8S0s3k113D0Z3D0X3k0m900o3k113D0Z3D0X3k0i980k3k113D0Z3D0X3l0e9e0g3l113D0Z3D0X3l0a9m0c3m103D0Z3D0W3m069u083m103D0Z3D0W3m039A053m103D0Z3D0Wgq103D0Z3D0Wgq103D0Z3D0Wgr0Z3D0Z3D0Vgs0Z3D0Z3D0Vgs0Z3D0Z3D0Vgs0Z3D0Z3D0Vgt0Y3D0Z3D0Ugu0Y3D0Z3D0Ugu0Y3D0Z3D0Ugu0Y3D0Z3D0Ugu0Y3D0Z3D0Ugv0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Ugu0Y3D0Z3D0Ugu0Y3D0Z3D0Vgt0Y3D0Z3D0Vgs0Z3D0Z3D0Wgq103D0Z3D0Xgp103D0Z3D0Xgo113D0Z3D0Ygm123D0Z3D0Zgl123D0Z3D0Zgk133D0Z3D10gi143D0Z3D11gg153D0Z3D12gf153D0Z3D13gd163D0Z3D13gc173D0Z3D14ga183D0Z3D15g8193D0Z3D16g61a3D0Z3D17g41b3D0Z3D17g41b3D0Z3D17g31c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g51b3D0Z3D16g51b3D0Z3D15g61b3D0Z3D15g61b3D0Z3D15g61b3D0Z3D15g61b3D0Z3D15g71a3D0Z3D13gb183D0Z3D12gc183D0Z3D12gc183D0Z3D12gc183D0Z3D12gc183D0Z3D14g81a3D0Z3D15g51c3D0Z3D15g51c3D0Z3D15g51c3D0Z3D156C0f2n0f6C1c3D0Z3D156z0k2j0k6z1c3D0Z3D146w0q2f0q6v1c3D0Z3D156r0v2d0v6r1c3D0Z3D156o0z2b0z6o1c3D0Z3D156k0E290E6k1c3D0Z3D156h0I270I6h1c3D0Z3D156f0L250L6f1c3D0Z3D156c0P230O6d1c3D0V3L116a0S210S6a183K0R3N10680U210U68173N0P3N10650Y1Z0Y65163O0P3N1063111X1163163O0P3N1061131X1360173O0P3N115X171V175X173O0P3N115V1a1T1a5V173O0P3N115T1c1T1c5T173O0P3N115R1f1R1f5Q183O0P3N125O1h1R1h5O183O0P3N125M1k1P1k5M183O0P3N125K1m1P1m5K183O0P3N125I1p1N1p5H193O0P3N135F1r1N1r5F193O0P3N135D1u1L1u5D193O0P3N135B1w1L1v5C193O0P3N135A1y1J1y5A193O0P3N135y1A1J1A5x1a3O0P3N145v1D1H1D5v1a3O0P3N145t1F1H1F5t1a3O0P3N145r1I1F1I5r1a3O0P3N145p1K1F1K5o1b3O0P3N155m1N1D1N5m1b3O0P3N155l1O1D1O5l1b3O0P3N155j1Q1D1Q5j1b3O0P3N155h1T1B1T5h1b3O0P3N155g1U1B1U5f1c3O0P3N165d1W1A1X5d1c3O0P3N165c1Y1z1Y5c1c3O0P3N165a201z205a1c3O0P3N1659221x22581d3O0P3N1657241x24561d3O0P3N1754261x26541d3O0P3N1753281v28531d3O0P3N17512a1v2a511d3O0P3N17502b1v2b501d3O0P3N174Y2e1t2e4Y1d3O0P3N174W2g1t2g4W1d3O0P3N174V2h1t2h4V1d3O0P3N174T2j1t2j4T1d3O0P3N174S2l1r2l4S1e3N0Q3L184Q2n1r2n4Q1f3K0U3H1a4P2o1r2o4O1h3I0W3F1b4N2r1p2r4M1j3F0Y3D1c4M2s1p2s4L1k3D103B1d4K2u1p2t4L1k3A143x1f4J2v1p2v4J1l3y163v1g4I2w1p2w4I1n3v183t1h4G2z1n2z4G1o3t1a3r1i4F2A1n2A4F1p3q1e3n1k4E2B1n2B4E1q3o1g3l1k4D2D1n2D4C1s3l1i3j1l4C2F1l2F4B1t3j1k3h1m4B2G1l2G4A1u3g1o3e1n4z2I1l2I4y1w3d1p3e1b4K2J1l2J4I1l3d1p3e1a4J2L1l2L4H1k3d1o3f194J2M1l2M4H1i3f1n3f194I2O1j2O4G1i3f1n3f194G2Q1j2Q4E1i3f1n3f194F2R1j2R4D1i3f1n3f194E2S1j2S4C1i3f1n3f194C2U1j2U4A1i3f1n3f194B2V1j2V4z1i3f1n3f194A2W1j2W4y1i3f1n3f194y2Y1j2Y4w1i3f1n3f194x2Z1j2Z4v1i3f1n3f194w301j304u1i3f1n3f194v311j314t1i3f1n3f194u321j324s1i3f1n3f194s341j344q1i3f1n3f194r351j354p1i3f1n3f194q361j364o1i3f1n3f194p371j374n1i3f1n3f194o381j384m1i3f1n3f194n391j394l1i3f1n3f194l3b1j3b4j1i3f1n3f194k7H4i1i3f1n3f194j7J4h1i3f1n3f194i7L4g1i3f1n3f194h7N4f1i3f1n3f194f7R4d1i3f1n3f194e7T4c1i3f1n3f194d7V4b1i3f1n3f194c7X4a1i3f1n3f194b7Z491i3f1n3f194a81481i3f1n3f194885461i3f1n3f194787451i3f1n3f194689441i3f1n3f19458b431i3f1n3f19448d421i3f1n3f19438f411i3f1n3f19428h401i3f1n3f19418j3Z1i3f1n3f1a3Z8l3Y1i3f1o3d1c3X8n3W1k3d1q3b1e3V8p3U1m3b1t381g3T8r3S1o391v361i3R8t3Q1q371x341k3P8v3O1s351z321m3N8x3M1v321B301o3L8z3K1x2Z1E2Y1q3J8B3I1z2X1G2W1s3H8D3F1C2V1I2T1v3F8F3D1E2T1K2R1x3D8H3B1G2R1M2P1z3B8J3z1I2P1O2N1B3z8L3x1K2N1Q2M1C3x8N3w1L2L1R2M1C3w8P3v1L2L1R2M1C3v8R3u1L2L1R2M1C3u8T3t1L2L1R2M1C3t8V3s1L2L1R2M1C3s8X3r1L2L1R2M1C3r8Z3q1L2L1R2M1C3r8Z3q1L2L1R2M1C3q913p1L2L1R2M1C3p933o1L2L1R2M1C3o953n1L2L1R2M1C3n973m1L2L1R2M1C3n973m1L2L1R2M1C3m993l1L2L1R2M1C3l9b3k1L2L1R2M1C3k9d3j1L2L1R2M1C3j9f3i1L2L1R2M1C3i9g3i1L2L1R2M1C3i9h3h1L2L1R2M1C3h9j3g1L2L1R2M1C3g9l3f1L2L1R2M1C3f9n3e1L2L1R2M1C3e9o3e1L2L1R2M1C3e9p3d1L2L1R2M1C3d9r3c1L2L1R2M1C3c9t3b1L2L1R2M1C3b9v3a1L2L1R2M1C3a9x391L2L1R2M1C3a9x391L2L1R2M1C399z381L2L1R2M1C389B371L2L1R2M1C379D361L2L1R2M1C369F351L2L1R2M1C369F351L2L1R2M1C359H341L2L1R2M1C349J331L2L1R2M1C349J331L2L1R2M1C339L321L2L1R2M1C339L321L2L1R2M1C329N311L2L1R2M1C319P301L2L1R2M1C319P301L2L1R2M1C309R2Z1L2L1R2M1C309R2Z1L2L1R2M1C2Z9T2Y1L2L1R2M1C2Y9V2X1L2L1R2M1C2Y9V2X1L2L1R2M1C2X9X2W1L2L1R2M1C2X9X2W1L2L1R2M1C2W9Z2V1L2L1R2M1C2Va02V1L2L1R2M1C2Va12U1L2L1R2M1C2Ua32T1L2L1R2M1C2Ua32T1L2L1R2M1C2Ta52S1L2L1R2M1C2Sa62S1L2L1R2M1C2Sa72R1L2L1R2M1C2Ra92Q1L2L1R2M1C2Ra92Q1L2L1R2M1C2Qab2P1L2L1R2M1C2Qab2P1L2L1R2M1C2Pad2O1L2L1R2M1C2Pad2O1L2L1R2M1C2Oaf2N1L2L1R2M1C2Oaf2N1L2L1R2M1C2Oaf2N1L2L1R2M1C2Nah2M1L2L1R2M1C2Nah2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L0V"
    }, {
        w: 1429,
        h: 391,
        ground_size: 1600,
        offset_x: 76,
        offset_y: 1037,
        ground: "lU0smv0Dml0Lme0Sm80Xm312lY17lT1blQ1flL1jlI1mlF1qlB1tlz1vlw1ylt1Blr1Dlo1Fln1Hlk1Kli1Mlg1Nlf1Plc1Sla1T0M0ek91V0H0mk41X0E0rk01Y0C0vjX1Z0A0zjU210y0BjS220w0FjP240u0IjM250s0LjK270q0NjI280p0QjG280o0SjE2a0m0UjC2b0l0WjA2d0j0Yjy2e0i11jv2f0i12ju2f0h14js2h0f16jq2i0e18jo2j0e19jn2j0d1bjl2l0b1djj2m0b1eji2m0a1gjg2n091ije2o091ijd2p081kjc2p081lja2q071nj82r071oj62s061qj52s061rj32t051tj12u051uj02u051viY2v041xiW2w041yiV2w031AiT2x031CiQ2y031DiO2z021FiN2z021GiL2z031HiJ2A031IiI2A021KiG2A031MiD2B031NiB2C031OiA2B031Qiy2B041Siv2C041Tis2D051Vip2D061Wim2E071Y2m0cfK2G071Z2g0mfD2J06212a0sfz2L0622250yfu2O0624200Dfq2Q06261V0Hfm2T06271R0Mfh2W06291M0Qfc30062b1H0U420eaS33062d1D0X3T0vaF37062f1y103P0Eaw3b062h1t143K0Nam3g072j1n183G0Vac3l072l1j1a3D123I0D5I3q072o1d1e3z193t184o0o0v3x082q171i3w1f3i1r474v082t101m3u1l391C3Y4y092v0U1q3r1r311M3Q4z0a2A0K1v3p1w2U1U3K4B0b2E0A1B3m1C2O203E4D0c2K0l1J3k1I2H273z4E0c4O3i1N2C2d3t4F0f4N3f1T2w2j3o4G0g4M3e1X2r2p3j4H0h4L3c232m2u3e4H0k4J3a282h2A394I0m4I382d2c2F344J0p4F362i282K2Z4J0q4F352m242P2U4K0q4F332r202U2P4L0q4F312w1W2Z2L4K0s4E302z1T342G4L0s4F2X2E1P382C4M0s4F2W2H1M3d2y4L0t4F2U2M1J3g2u4M0t4F2T2P1G3l2q4M0t4F2R2T1E3p2l4M0u4F2Q2X1A3t2i4M0v4E2O311y3x2d4M0w4E2N341v3B2a4M0w4E2L371u3F254N0w4E2K3a1r3J224M0x4E2I3e1p3N1Y4M0x4E2H3h1n3R060x1g4M0z4D2F3k1l4z1c4M0z4C2E3o1j4D184L0A4C2D3q1i4G154L0A4C0E0b1M3t1h4J114M0A4C0B0i1G3x1e4M0Z4L0C4B0z0n1C3z1d4O0X4L0C4B0y0r1x3C1c4P0W4K0D4A0x0v1t3F1b4R0U4K0D4A0w0y1p3J194S0T4J0E4A0v0B1l3M184U0R4J0F4z0u0F1g3P174V0Q4I0G4y0u0I1c3R174W0P4I0G4y0u0K183U164Y0N4I0G4x0u0O123Y154Z0M4H0H4x0t0S0W4214500L4H0I4w0t0V0R4513510K4G0J4v0t0Z0L4912520J4G0J4v0s130E4d12520K4E0K4u0t170w4i11530J4E0L4t0s1e0k4p10540I4E0L4s0t5X10550I4C0M4s0s5Z0Z550I4C0M4r0t5Z10550H4C0N4p0u600Z560H4A0O4o0u610Z570H4z0O4o0u610Z570H4y0P4n0u630Y580H4x0Q4l0v630Z570I4w0Q4k0w630Z580I4v0Q4j0w650Y580J4t0R4i0x650Z580K4r0S4g0y650Z580K4r0S4f0y660Z580K4q0T4e0z6610580J4q0T4c0B6610580J4q0U4a0C6611570I4q0V480D6711580H4q0V470E6712570H4q0V460F6712570H4p0X450F6713560H4p0X440G6713570G4p0X440F6814560F4q0X430G6815550F4p0Z420G6815550F4p0Z410H6816540F4p0Z410H6817530F4o113Z0I6818530E4o113Z0I671a520E4o113Y0I681b510E4n133X0I681d4Z0E4n133W0J671f4Y0E4n133W0J671h4W0E4n133V0K671i4V0E4m153U0K661j4V0E4m153T0L661i4W0E4m153T0L661i4W0E4l173R0M651j4W0E4l173R0M651j4W0E4l173R0M641j4X0E4k193P0N641j4X0E4k193P0N631k4X0F4i1a3O0O631k4X0F4i1b3N0O621k4Y0F4i1b3M0Q601l4Y0F4h1c3M0Q601l4Y0F4h1d3K0R5Z1m4X0G4h1d3K0R5Y1m4Y0H4f1e3K0R5X1n4Y0H4f1f3I0S5W1o4X0I4e1g3I0S5W1o4X0J4d1g3H0U5T1p4X0K4d1h3G0U5S1q4W0L4c1i3F0V5R1r4W0M4b1i3F0W5P1s4V0N4a1k3D0X5N1t4V0P481l3D0X5L1v4U0Q481l3D0X5I1y4U0R461n3B0Z5G1y4V0R461n3B0Z5G1y4V0S441p3z115F1y4W0S421q3z115E1z4W0T401r3y135D1y4X0T3Z1t3x145C1y4Y0T3X1u3w155C1y4Y0U3V1v3w165B1x4Z0V3R1z3u185A1x4Z0W3J1G3u195y1y500W3H1I3s1b5x1y500X3G1I3s1c5w1y500Y3E1J3r1e5v1x510Z3C1L3q1g5t1x51103A1M3p1j5q1y52103y1N3p1m5n1y52113w1P3n1n5n1y52123t1R3n1n5n1y52133r1T3l1o5m1z52143p1U3l1o5m1z52153m1X3j1p5m1y53163k1Y3j1p5m1y53173h203i1q5l1z53173f233h1q5l1A52183d243g1r5l1A52193a273e1s5l1A521a38283e1s5k1B521b36293d1t5k1B521b342c3c1t5k1B521c322d3b1u5j1C511e302f3a1v5i1C511e2Z2g391w5i1D501f2X2i381w5h1E501g2V2j371x5h1E501g2U2l361x5h1E4Z1i2S2m351y5g1F4Z1i2R2o341z5f1G4Y1j2P2p331A5f1G4Y1k2N2r321A5e1H4X1l1X070I2s311B5e1I4W1m1T0c0F2u301C5d1I4W1m1R0g0C2v301C5c1K4V1n1P0j0z2x2Y1D5c1K4U1p1N0m0w2y2Y1D5c1K4U1p1M0p0t2A2W1F5a1M4T1q1K0r0q2D2V1F5a1M4T1q1J0u0n2E2U1G5a1N4R1s1H0y0i2H2T1G591O4R1t1F0B0e2K2R1I581P4Q1t1E0E0a2N2Q1I581P4Q1u1D3C2O1J571R4O1w1B3H02012H1K561R4O1x1z3N2F1K551T4N1y0f031f3O2E1L551T4N1z0b071e3P2D1L551U4L1B080c1a3R27010t1N531W4K1E020g183S26030s1N531W4K1X173T24050q1O531X4J1Y153U23080o1P511Y4J1Z143V210a0m1Q511Z4H21123W1Z0c0m1Q50204H22103Y1X0e0k1S4Z214G230Z3Y1V0h0i1T4Z224F240X401U0j0g1T4Y234E260V421S0l0e1V4X244D260V421R0n0d1V4X244D270T441P0p0a1X4W264C280R451O0s071Z4V274A2a0Q461M0w02214U284A2a0P471L2A4U294z2b0N491K2B4S2a4z2c0M491J2C4S2b4y2d0K4b1H2E4R2c4w2e0J4d1F2F4Q2d4w2f0H4e1F2F4Q2e4v2g0G4f1D2H4O2f4v2h0E4g1C2I4O2g4t2i0D4i1B2J4M2i4s2j0B4k1z2K4M2i4s2k0z4m1x2M4K2k4q2m0x4o0v080T2M4K2k4q2n0v4p0s0e0P2O0t06492m4p2o0t4r0q0g0O2P0p0a482m4o2q0r4t0n0j0M2Q0o0d452o4n2r0p4v0l0l0K2S0l0g432p4n2s0n4x0j0n0J2T0j0j412q4l2u0l4z0h0o0I2U0i0l3Z2r4l2v0j4B0e0r0H2V0g0n3Y2s4k2w0h4E0b0t0F2X0d0q3W2u4i2y0f4G080w0D300a0s3U2v4i2z0d5l0C32070v3T2w4h2A0b5n0B3F3R2x4g2C095o0A3G3Q2z4e2D085q0y3I3P2z4e2E065s0w3K3N2B4c2H035u0u3M3L2C4b8g0s3O3J2E488j0q3P3J2E468m0o3R3H2G428q0m3T3F2H3Z8u0k3V3D2J3X8x0h3W3C2K3X8z0e3Y3A2M3V8C0b403z2N3U8F07413y2O3T8I04433w2Q3ScQ3t2T3QcS3r2V3PcS3q2X3NcU3o303KcW3k343IcX3g393HcY3f3b3Dd13d3d3Bd23d3e3yd53b3g3ud93a3h3rdc0F042p3j3ode0D082m3l3mdg0A0b2l3m3jdj0y0d2j3o3hdl0w0g2h3p3gdm0u0i2f3r3edo0r0l2d3t3ddp0p0n2c3u3bdr0n0q293w3ads0k0u273y37du0i0x1p020D3A35dw0g0F02020l010Q050B3D33dx0d0L0l030M080j010f3G30dA090O0j050K090i030e3M2Uex0j060H0c0g040d3O2Sez0h080F0f0d060b3Q2ReA0f0b0B0i0a09093S2PeC0c0e0y0m070c053U2PeE090h0u0q024f28060zeG070j0q4L26090xeH060l0m4O240b0veJ040o0g4S230d0tff094X210g0rkm1Z0i0pko1X0k0nkq1W0l0lks1U0o0iku1S0q0hkv1R0r0fkw0t0a1d0u0bkz0q0f190y06kD0m0j17li0j0n14ll0f0r12ln0a0v10lq030C0Xm80Vm80Uma0Tmb0Rmd0Pme0Pmf0Nmh0Mmh0Lmi0Lmj0Jmk0Imm0Hmm0Gmo0Fmo0Emq0Dmq0Cms0Amt0Amu0ymv0ymw0wmx0vmz0umz0tmB0smB0rmD0pmE0pmF0nmH0lmI0kmK0imM0gmO0emQ0cmT097S"
    }, {
        w: 1345,
        h: 425,
        ground_size: 1800,
        offset_x: 231,
        offset_y: 922,
        ground: "aO03lB08lx0dlr0jlm0njU0O0z0t0z0Pig1404070703080z080505060514hX1d01090308040D0508021nhK1u010T011Ehy4eho4phd4zh34IgW4OgQ4UgL4Zgw0405550504gi0801580208g904025tg65C0205fX5Mfq6MeF7gej7xe37LdR7VdG87dv8gdn8pde3I034Nd43M0507030F0407033NcW3O0j0A0k3OcO3M0s0v0r3NcG3P0v0q0v3Qcy3T0y0k0z3Scs3V0B0g0C3Ucn3W0F0b0F3Wci3X0J050J3Xcf3X1y3Ycd3X1A3Zc93Y1D3YbX04063Y1F3YbV07033X1J3XbT09013W1N3W0204bL2u031y1R1y032rbC05012a030a0303061u1W1v0604030a0128bA2g05080e1r211r0f0803280205bs2f07050i1m261n0i06052fbr2f0v1j2b1j0v2ebq2f0x1e2i1f0x2ebo2f0B182o190B2eb82t0E132v130E2taN2x0H0X2C0X0I2xaD2B0L0P2M0P0M2Bat2E0U0B310B0T2Fak2H622Jaa2L652La22O682N9U2Q6b2Q9N2R6f2R9F2U6j2T9y2V6n2U9s2V6s2W9m2V6w2X9f2X6B2X992Y6F2X942Y6K2Y8Z2Y6P2Y8T1x0107041g6T1g031G8N1z0403081a701b061I8I1A0i167614091K8D1v02050n0Y7d0X0d07011E8y1x0B0N7n0N0k03041G8t1y0J0B7y0A0z1I8n1A0S0m7L0k0K06031A8j1Cad1C8d1Eaf1D891Fah1E851Fak1G801Gan1G7W1Hap1H7S1Hat1G7Q1Hav1G7O1Gaz1G7K1HaB1G7I1HaD1G06037y1FaG1G03077k07041FaJ1F01087k08021FaL1O7i1OaO1O7g1OaR1S741TaT1S721SaW1R721RaZ1Q711Qb11P711Ob51O701Mb81O6Z1Lbb1R6T1Kbe1S6Q1Kbh1T6K1Lbl1T6E1Nbp1T6z1Obt1T6v1Nby1T6r1MbE1S6m1NbI1T6h1MbP1R6d0Q010TbW1Q680S050Lc50M030Z650S0a0Dcf0D0710610U0e0rcw0q0c125V0XdN145R0ZdO155N10dW105J0We3125D0Ye409020T5A0N0308e508040U5v0P0507e605070V5r0R0703el0W5n0Sew0Y5j0Tey0Z5e0Wez105a0XeB11560YeD12520ZeF134Y10eH134V11eK144Q12eM144N13eO154K13eQ154H14eS164D15eU164B15eW164y16eY174v16f0174s17f3164q17f5164o16f8164m16fb184h16fd1a4d16fg1b4915fj1d4515fm1e4115fp1e3Y14ft1d3W13fx1d3R14fB1c3O14fG1a3J17fJ1a3F169K0k5L183D159G0w5H173B149F0C5H153z139D0J5I133w115T0a3B0N5K0Z3u105Q0m3t0Q5K0Z3s0Y5R0s3o0T5I103p0W5T0x3j0X5G103o0W5S0C3f0Z5E123m0W5R0H3b115C143k0X5b020D0K38130u0452163j0Y530g0v0N35150l0j4V163i0Z4W0t0o0Q33160f0u4O183g114S0A0j0T30180b0A4K1a3f124O0G0f0W2s070o19080G4G1b0U08120o0M144K0L0c0Y2m0h0i1b050K4D1d0I0p0S0y0F164I1Z2g0n0c1f020O4A1e0C0z0L0G0A164G242b0r052d4w1g0x0G0F0N0v184D29252N4u1h0s0O0A0T0q1a4A2f202Q4r1i0p0T0v0Z0m1c4y2j1V2U4n1l0l0Y0s130j1d4v2o1Q2X4j1p0h130o180f1f4t2r1N2Z4h1q0d190l1d0b1g4r2v1I324e1s0a1d0j1h071i4o2A020b1r354a1v061i0f2K4l2W1h38472W0d2N4i311c3a442Z0b2P4g36173c4231092T4c3a133e3Y35082U4a3e0Y3h3W37062X483g0V3i3T3a0530453i0T3k3Q3d04323a07070608060k3l0Q3m0o05080608062S3f03353709040a040a0h3s0B3x0j0b030a040a2O3h03371P0y0H0b020c020c0d3B0n3J0f0c010c020c0G0w1z3k023a1p1c0p0E0a3K0d3R0a0E0q1b183m023b191z0h0F063T043X060F0h1z0R3o023d0U1T090H0182010H091V0A6I0F2a039u032a0p+1NV01lF02lF02lF02kS020L020L03k3030L020L04k1040K040K068x01bq050K040K078v032W098j060K050J088t052P0k8d070J060I097O030A072O0q87090I070H0a7M070v092N0L7M0a0H080H0b7K0c0p0b2M0N7K0b0H090G0c7J0h0h0f2K0P7I0c0G0b0E0d7J0N2K0P7I0d0E0d0D0e7I0O2I0Q7H0e0D0f0C0f7H0O2H0R7G0f0C0h0A0g7H0P2F0S7G0g0B0i0y0i7G0Q2D0T7F0i0y0l0w0j7G0R2B0V7E0j0w0o0t0l7F0S2z0W7D0l0t0r0q0n7F0T2x0X7E0m0p0v0m0o7G0V2u0Y7F0n0m0z0h0p7G0X2r107G0p0g0G0a0q7I102n127G0t061l7I130K051t147G1U7H150I0b1n157F1W5T031J1a0C0e1k191M035O1W5a010H081E1g0v0h1i1b1H085M1Y56050F0e1y1m0n0l1f1e1C0d0G04511Y500c0E0g1v1u0a0r1d1g1y0h0F0b4V1Z4S0j0E0h1u26191k1u0k0E0j4N204H0v0b020c020b0j1s28151o1s0m0b020c020c0t4D213D1z09040a04090k1s29111s1q0o09040a040a1t3D223D1B040a0409040o1q2b0Y1u1p0r0508050a041w3D233C2v1o2e0V1w1o2t3C243C2w1n2f0T1x1n2u3C243D2v1m2i0O1B1l2u3C263C2w1k2m0J1D1l2u3C273C2u1m2o0D1F1n2s3B2c3z2t1o2s0u1I1p2q3A2f3z2p1v4x1v2n3z2h3y2n1y4v1x2l3z2j3y2m1y4v1y2k3y2k3z2l1y4v1y2j3z2k3A2k1y4v1y2i3A2l3z2k1y4v1y2h3A2m3A2j1y4v1x2i3A2n3A2j1w4x1w2h3A2o3B2j1t4A1t2i3B2p3B2j1r4C1r2i3B2q3C2i1q4E1p2i3C2r3C2g1q4E1r2h3B2s3D2e1s4C1t2f3C2s3E2c1u4A1u2e3D2t3E2a1w4y1w2c3D2u3F281y4x1x2a3E2v3F261A4v1z273F2w3G241C4t1B253G2x3G221E4r1D233G2y3H211F4p1F213H2y3I1Z1G4o1H1Z3I2y3J1X1I4m1J1X3J2y3L1U1K4k1L1V3K2x3N1S1M4i1N1S3N2w3O1Q1O4g1P1Q3O2v3R1N1Q4e1R1O3Q2u3S1L1S4c1S1M3S2u3T1J1U4a1U1K3T2u3V1G1W481W1H3V2u3X1D1Y461Z1E3W2u3Y1B2044211A3Z2u411x2221021Z231y402u421v241S0h1R251v412w431s261M0r1L271r442w461o281G0B1F291o462x481j2c1A0J1A2b1j492z4b1e2e1w0P1w2d1f4b2B4d1a2g1s0V1r2h1a4d2D4g152j1p0Y1o2j154g2H4i0Z2l1l131l2l0Z4i2M4l0S2o1i171h2o0S4m2P4q0L2q1f1b1e2r0K4r2R4x0B2u1b1f1b2t0B4y2S4H0q2w181j182v0r4G2T4Q0g2y131r122z0f4R2S7G0Y1x0Y7H2Q7I0T1F0S7K2N7M0L1S0K7M2M7N0D250C7O2N7O0o2x0m7O2OiT2PiR2RiP2SiO2UiN2ViL2WiK2YiJ2ZiH30iG35iy3hij3pih3rif3sie3uid3vib3wib3xi93zi73Ai73Bi53Ci53Di33Fi13HhZ3IhY3KhX3LhV3NhT3PhS3PhR3RhP3ThN3VhM3VhL3XhJ3ZhH40hH41hF43hD45hB46hA48hz49hx4bhv4dht4fhr4hhp4jhn4lhl4nhj4phh4rhf4thd4vhb4xh94zh74Bh54Dh34Fh14HgZ4JgX4LgV4NgT4PgQ4SgO4VgL4XgJ4ZgH51gF54gB57gz59gx5bgv5dgt5fgq5jgn5lgl5ngj5qgf5tgd5vgb5xg85Bg55Dg35GfZ5JfX5LfV5OfS5QfP5UfL5XfJ60fF63fD66fz69fx6cft6ffr6ifn6mfj6pfg6tfd6wf96Af56Ef26GeZ6KeV6OeR6SeO6VeJ70eF74eB78ex7cet7geo7mej7peh7teb7z6v166u7F6g1u6f7K621R617Q5R275R7V5G2o5F815v2E5v855j2W5j8d583b588k4V3s4W8s4I3L4J8y4w434v8H4j4m4i8L484F488N3X4Y3Y8P3N5g3P8S3B5z3B8Z3o5T3o9a346g359w2C6L2A9T2d7g2bae1N7J1Nay1m8g1maV0l9R0q5x"
    }, {
        w: 1409,
        h: 760,
        ground_size: 1800,
        offset_x: 196,
        offset_y: 1020,
        ground: "0r1djr1d0R1fjp1f0Q1ijj1i0P1kjh1k0M1njf1n0K1pjb1p0J1rj91r0I1sj71s0H1wj11w0F1yiZ1y0E1ziX1z0D1BiV1B0C1DiR1D0B1FiP1F0z1I4H1w6l1w4H1I0y1K4C1A6j1A4C1K0w1N4A1D6f1D4A1N0u1O4y1F6d1F4y1O0t1Q4v1I6b1I4v1Q0r1U4r1K691K4r1U0q1V4o1N671N4o1V0p1X4l1Q651Q4l1X0o1Z4i1S631S4i1Z0n2N3u1V5Z1V3u2N0l2R3p1Y5X1Y3p2R0k2S3m215V213m2S0j2V3j235T233j2V0i2X3f265R263f2X0g303d285P283d300d34392a5N2a39340c351t0b1r2g5H2g1r0b1t350b381l0n1k2i2a1l2a2i1k0n1l380a3a1h0r1h2k271p272k1h0r1h3a093c1f0u1d2n261p262n1d0u1f3c073g1a0y1a2p241r242p1a0y1a3g063h160D172r221t222r170D163h053k130F132v211t212v130F133k043m100H112y1Y1v1Y2y110H103m033p0X0K0Y2A1X1v1X2A0Y0K0X3p023r0V0K0W2D1V1x1V2D0W0K0V3r013u0S0M0U2F1S1B1S2F0U0M0S6Z0Q0O0S2H1R1B1R2H0S0O0Q730M0Q0O2L1P1D1P2L0O0Q0Mci1O1D1Ohw1L1F1Lhz1J1H1JhB1I1H1IhD0J0b0M1J0M0b0JhF0C0n0G1J0G0n0ChH0z0r0D1L0D0r0zhJ0w0u0B1N0B0u0whM0s0y0z1N0z0y0shP0q0C0u1R0u0C0qhR0n0F0s1T0s0F0nhU0k0H0r1T0r0H0khX0h0K0p1V0p0K0hhZ0g0K0p1V0p0K0gi20d0M0n1X0n0M0di50b0O0l1Z0l0O0bi7090Q0k1Z0k0Q09+iQ501mH02mH03mF05mD07mB09mz0cmv0gmr0jmp0lmn0nml0pmj0rmh0tmf0wmb0zm90Bm70Dm50Fm30Hm10JlZ0NlT0RlR0TlP0VlN0XlL0ZlJ12lF15lD17lB19lz1blx1dlv1flt1ilp1lln1nll1qlh1tlf1vld1yl91Bl71Dl51Fl31Hl11JkZ1LkX1NkV1QkR1TkP1VkN1XkL20kH23kF26kB29kz2bkx2dkv2fkt2hkr2jkp2mkl2pkj2rkh2tkf2vkd2xkb2Bk52Fk32Hk12JjZ2L4B0z9F0x4B2N4z0A9F0y4z2P4x0B9F0z4x2S4v0B9F0z4v2V4t0D9E0A4t2X4r0E9C0D4r2Z4q0E9C0D4q314o0F9C0E4o334l0H9C0G4l354j0I9C0H4j384h0J9B0H4h3b4f0K9A0J4f3e4c0L9A0K4c3h4a0M9A0L4a3j490M9A0L493l470O9z0M473o440P9y0O443r420Q9y0P423t410Q9y0P413v3Y0S9y0R3Y3x3W0T9y0S3W3z3V0U9x0S3V3B3T0V9w0U3T3E3Q0W9w0V3Q3H3O0X9w0W3O3J3N0X9w0W3N3L3L0Z9v0X3L3O3I109u0Z3I3R3F129u113F3U3D129u113D3X3B139u123B3Z3z149u133z413x169t143x433w169s153w453u179s163u5p0S2q9s2p0S6I0S2q9s2p0S6J0Q2r9s2q0Q6M0N2u9p2s0N6P0K2w9p2u0K6Q0K2w9p2u0K6R0I2x9p2v0I6T0G2y9p2w0G6V0E2A9o2x0E6X0C2B9m2A0C700y2D9m2C0y750s2G9m2F0s790q2H9m2G0q7d0k2K9m2J0k7n062S9k2R06as9kdp9kdp9kdp9kdq9jdq9idr9idr9idr9idr9ids9hds9gdt9gdt9gdt9gdu9fdu9edv9edv9edv9edv9edw9ddw9cdx9cdx9cdx9cdz9adz99dA99dA99dA99dA99dB98dB96dD96dD96dD96dE95dE94dF94dF94dF94dF94dG93dG92dH92dH92dH92dH92dI90dJ90dJ90dJ90dJ90dK8ZdK8YdL8YdL8YdL8YdL8YdM8WdN8WdN8WdN8WdN8WdP8UdP8TdQ8TdQ8TdQ8TdQ8TdR8QdT8QdT8QdT8QdT8QdU8PdU8OdV8OdV8OdV8OdV8OdW8NdW8MdX8MdX8MdX8MdY8LdY8KdZ8KdZ8KdZ8KdZ8Ke08Je08Ie18Ie18Ie18Ie18Ie28Ge38Ge38Ge38Ge38Ge58Ee58De68De68De68De68De78Ae98Ae98Ae98Ae98Aea8zea8yeb8yeb8yeb8yeb8yec8wed8wed8wed8wed8wee8vee8uef8uef8uef8uef8ueg8seh8seh8seh8seh8sei8rei8qej8qej8qej8qej8qel8nem8nem8nem8nem8nen8men8kep8kep8kep8kep8keq8ier8ier8ier8ier8ier8ies8get8get8get8get8geu8feu8eev8eev8eev8eev8eew8cex8cex8cex8cex8cey8bey8aez8aez8aez8aez8aeB87eC87eC87eC87eC87eD86ev8kem8pek8qej8qej8qej8qej8qej8qej8qej8qej8qel8oel8nem8nem8nem8nem8nem8nem8nem8nem8nem8nem8nem8nek8qej8qej8qej8qej8qej8qej8qej8qej8qel8nem8nem8nen8kep8keq8ies8get8geu8eev8eev8eev8eew8cex8cex8cex8cey8aez8aez8aez8aeB87eC87eC87eD86eD84eF84eF84eG83eG82eH82eH82eI81eI80eJ80eJ80eK7ZeK7YeL7YeL7YeM7WeO7UeR7ReT7OeW7MeY7Kf07If27Gf47Ef67Cf97zfb7wfe7ufg7sfi7qfl7nfo7kfq7ifs7ffv7dfx7bfz78fC76fF73fH70fK6YfM6WfO6UfQ6SfS6QfV6NfX6Kg06Ig26Gg46Eg66Cg86Agb6xgd6ugg6sgi6qgk6ogm6mgo6kgr6hgt6egw6cgy6agA68gC66gE64gI60gK5XgN5VgP5TgR5RgT5PgW5MgY5Ih25Gh45Eh65Ch85Aha5yhd5vhf5shi5qhk5ohm5mho5khq5iht5fhv5chy5ahA58hC56hE54hG52hI50hL4XhN4UhQ4ShS4QhU4OhW4MhY4Ki14Hi34Ei74Bi94zib4xid4vie4uie4vie4wid4wid4wic4yib4yib4yib4yia4Ai94Ai94Ai94Aia4yib4yib4yic4wid4wid4wid4wie4uif4uih4rij4oim4mio4kiq4iis4giu4eiy48iF40iO3QiZ3Fj53Cj73Cj73Cj73Cj73Cj83Aj93Aj93Aj93Aja3yjb3yjb3yjb3yjb3yjc3wjd3wjd3wjd3wjd3wje3ujf3ujf3ujf3ujf3ujg3sjh3sjh3sjh3sjj3pjk3pjk3pjl3mjn3mjn3mjo3kjp3kjp3kjq3ijr3ijr3ijs3gjt3gjt3gju3ejv3ejv3ejw3cjx3cjx3cjz39jA39jA39jB36jD36jD36jE34jF34jF34jG32jH32jH32jI30jJ30jJ30jK2YjL2YjL2YjM2WjN2WjN2WjP2TjQ2TjQ2TjR2QjT2QjT2QjU2OjW2MjY2KjZ2Kk02Ik22Gk52Dk62Dk72Aka2ykc2wkd2wke2ukg2skh2ski2qkl2nkn2kkp2kkq2iks2gku2ekw2cky2akA28kE22kI20kJ20kK1YkL1YkL1YkL1YkM1WkN1WkN1WkO1UkP1UkQ1SkT1PkV1MkX1MkY1Kl01Il21Gl31Gl41El61Cl91zla1zlb1wle1ulg1slh1slj1olo1jlr1glv1cly1alB16lG10lK0YlN0UlQ0SlU0Nm10Bmf0omr0cbg"
    }, {
        w: 1545,
        h: 697,
        ground_size: 1800,
        offset_x: 133,
        offset_y: 1103,
        ground: "0r04nV040R07nR070P0anN0a0O0bnL0b0O0cnJ0c0O0dnH0d0N0fnF0f0M0gnD0g0M0inz0i0M0jnx0j0L0lnv0l0K0mnt0m0K0nnr0n0K0onp0o0K0pnn0p0K0qnl0q0K0rnj0r0K0snh0s0K0und0u0K0vnb0v0K0wn90w0K0xn70x0K0yn50y0L0yn30y0M0zn10z0M0AmZ0A0M0BmX0B0M0CmV0C0M0DmT0D0M0FmP0F0M0HmL0H0N0ImH0I0O0JmF0J0O0LmB0L0O0Nmx0N0O0Pmt0P0P0Pmr0P0Q0R290dhF0d290R0R0S1Y0qhx0q1Y0S0T0T1M0Ehp0E1M0T0V0T1F0Ohh0O1F0T0W0V1y0Xh90X1y0V0X0W1q17h1171q0W0Z0X1j1ggT1g1j0X110Y1b1pgN1p1b0Y130Z0A21gH210A0Z14110d2q1K05cV051K2q0d111512082w1C0bcT0b1C2w08121713022E1v0ecT0e1v2E0213193L0O060x0fcT0f0x060O3L1b3O0r0u0n0kcT0k0n0u0r3O1c4O0f0ocR0o0f4O1d4R060tcR0t064R1f5pcR5p1h5ocR5o1i5pcP5p1j5ocP5o1l5ncP5n1n5ncN5n1p5mcN5m1r5lcN5l1t5kcN5k1v5jcN5j1x5icN5i1z5hcN5h1B5gcN5g1D5fcN5f1F5ecN5e1H5dcN5d1J5ccN5c1L5bcN5b1O5acL5a1R59cL591S59cL591R5bcJ5b1P5ccJ5c1O5ccJ5c1N5dcJ5d1L5fcH5f1J5hcF5h0S080I5icD5i0I08010b0F5kcB5k0F0p0B5mcz5m0B0u0y5ncz5n0y0y0v5pcx5p0v0D0s5pcx5p0s0I0q5qcv5q0q0N0n5qcv5q0n0S0l5rct5r0l0W0j5rct5r0j110g5scr5s0g0x010y0d5tcr5t0d0y020A0b5tcr5t0b0A020D085ucp5u080D020F065ucp5u060F020H045vcn5v040H026gcn6g036gcl6g046gcl6g056g6h0b5R6g066g6e0q5F6g076g6a0w5B6g086g670B5z6g096g630H5v6g0a6g600L5u6g0b6f5X0P5t6f0c6f5V0S5s6f0d6e5T0V5r6e0e6e5S0X5q6e0f6d5Q105p6d0g6d5O135o6d0h6c5N155n6c0i6c5M185l6c0j6b5L1a5k6b0k6b2Y072F1c5j6b0l692T0p2s1e5j690o672N0D2j1g5i670r662H0N2e1i5h660u642F0S2a1k5g640x632D0X261m5f630A612C11221o5e610E5Z2A161Y1r0D0J3Q5Z0H5Y2z191V1u0t0X3K5Y0K5W2w1f1Q1z0h1b3F5W0N5V2r1m1N373A5V0Q5T2m1u1J3d3v5T0T5S2h1C1E3l3p5S0W5Q0Z0B0x1O1B3r3k5Q105O0X0R03271x3x3f5O135M0V361u3D3b5M165K0T3b1p3K365K1a5H0R3h1k3R325H1e5E0P3m1f3Z2Y5E1i5C0N3r1a462T5C1n5y0M3w144d2Q5y1s5v0M3A0Z4k2M5v1w5s0L3G0S4s2I5s1B5p0K3K0N4z2D5p1G5m0K3O0H4H2z5m1I5l0J3T0C4S2r5l1I5l0I3Y0r5e2c5l1I5k0I42066A195k1I5k0HaQ125k1I5k0GaX0W5k1J5j0Eb10U5j1K5i0Eb50S5i1K5i0Db80Q5i1K5i0Cbc0N5i1L5h0Cbe0L5h1M5h0Bbh0J5h1M5g0Bbk0I5g1M5g0Abm0H5g1N5e0Bbn0H5e1O5d0Bbp0H5d1O5d0Abs0F5d1O5c0Abu0F5c1P5b0Abv0E5b1Q5a0Aby0D5a1Q590AbA0D591R580zbC0C581S570zbE0C571S560AbE0D561T550zbG0C551U540AbH0C541V520AbJ0C521W520AbK0B521W510AbL0C511X4Z0BbM0C4Z1Y4Y0BbO0C4Y1Z4W0CbP0C4W204V0CbR0C4V214T0DbR0D4T224T0CbT0C4T224S0DbU0C4S234Q0DbV0D4Q254O0EbW0D4O274M0EbX0E4M284L0FbY0E4L294J0FbZ0F4J2b4H0Gc00F4H2d4G0Fc10F4G2e4F0Gc10G4F2f4D0Hc20G4D2h4B0Hc30H4B2j4z0Ic40H4z2l4y0Ic40H4y2n4x0Hc60G4x2p4w0Hc60G4w2s4u0Hc60G4u2u4u0Gc80F4u2u4u0Gc80F4u2v4t0Gc90E4t2w4t0Fca0E4t2x4t0Eca0D4t2y4t0Dcb0D4t2z4r0Ecb0E4r2A4r0Ecc0D4r2A4r0Dcd0D4r2B4q0Dcd0D4q2C4q0Dcd0D4q2D4o0Ecd0E4o2E4o0Dce0E4o2F4n0Dce0E4n2G4n0Dce0E4n2G4n0Dce0E4n2H4m0Dcf0D4m2J4k0Ecf0E4k2L4j0Dcg0E4j2M4j0Dcg0E4j2N4i0Dcg0E4i2P4h0Dcg0E4h2R4f0Ecg0F4f2T4e0Ecg0F4e2U4e0Dch0F4e2V4d0Dci0E4d2X4c0Dci0E4c2Z4b0Dci0E4b304a0Ech0G4a31490Ech0G4934470Ech0G4737460Ech0G4639450Ech0G453c420Fch0H423f3n030B0Fch0H0B033n3i3j040C0Fch0H0C043j3l3e080C0Fch0H0C083e3n390c0C0Fch0H0C0c393q330g0B0Gch0I0B0g333t2X0l0B0Gch0I0B0l2X3w2R0p0B0Gch0I0B0p2R3z2K0u0B0Hch0J0B0u2K3B2D0A0B0Hch0J0B0A2D3E2w0F0A0Icg0L0A0F2w3I2r0I0A0Icg0L0A0I2r3L2n0L0A0Icg0L0A0L2n3O2i0N0A0Jcg0M0A0N2i3R2e0Q0A0Jcg0M0A0Q2e3U290T0A0Jcg0M0A0T293X250W0z0Kcg0N0z0W2540210Y0z0Lcf0N0z0Y21431Y100z0Lcf0N0z101Y461V100z0Mcf0O0z101V491T110z0Mcf0O0z111T4b1R120z0Mce0P0z121R4d1O140y0Ocd0Q0y141O4f1M150y0Ocd0Q0y151M4h1K150y0Pcd0R0y151K4j1H170y0Pcd0R0y171H4l1F180y0Pcc0S0y181F4n1D190x0Qcc0T0x191D4p1A1b0x0Rcb0T0x1b1A4s1x1c0x0Rcb0T0x1c1x4v1v1c0x0Scb0U0x1c1v4x1s1e0x0Scb0U0x1e1s4z1q1f0w0Tca0W0w1f1q4B1o1g0v0Vc90X0v1g1o4D1l1i0t0Xc90Z0t1i1l4F1j1j0s0Yc9100s1j1j4I1f1k0s10c8110s1k1f4L1d1l0r11c7130r1l1d4O1a1m0p13c7150p1m1a4R171o0o15c6160o1o174U141p0n16c6170n1p144X111q0n17c6180n1q11500Y1r0l1ac41b0l1r0Y530W1s0k1bc41c0k1s0W560S1u0j1cc41d0j1u0S590O1y0h1ec21f0h1y0O5c0I1C0e1hc21i0e1C0I5f0D1G0b1kc21l0b1G0D5i0y1J081nc11p081J0y5s0m1O041rc01s041O0m5J0a3mc03n0a9obZcXbYcXbYcYbWcZbWd0bVd0bUd2bTd2bTd3bSd3bRd5bQd5bPd7bOd7bNd9bMd9bLdbbKdbbJddbHdfbGdfbFdhbEdibCdkbBdlbzdmbzdnbxdpbwdqbudsbsdtbqdwbodybmdAbkdCbidEbfdIbcdKbadMb8dPb5dRaRe6aMeaaLecaIeeaHehaDeoaxetarezaleCajeCaieEaheEageGafeGaeeIaceJaceKaaeLaaeMa8eNa8eOa6ePa6eQa4eRa3eTa2eTa1eVa0eV9ZeW9ZeX9XeY9Wf09Vf09Uf29Sf39Sf49Qf59Pf79Of79Nf99Lfa9Lfb9Jfc9Ife9Hfe9Gfg9Efh9Efi9Cfj9Bfl9Afl9zfn9yfn9xfo9wfq9vfq9ufs9sft9sfu9qfv9pfx9ofx9nfz9lfA9lfB9jfC9ifE9hfF9ffH9dfJ9cfK9afM98fO96fQ94fS92fU90fW8XfZ8Vg18Tg38Qg68Og88Mga8Jgc8Ige8Ggg8Egi8Bgl8zgn8xgp8ugs8sgu8qgw8ogy8lgB8jgD8hgF8egI8cgK8agM87gQ84gT81gV7YgZ7Uh37Qh77Mhb7Jhe7Fhi7Bhl7yhp7uht7qhx7nhA7jhE7fhI7bhL78hP74hT71hW6Xi06Ti76Mi86Li96win6sir6xin6Cih6Fie6Iic6Kia6Ni76Pi56Ri46Ti26Ui06WhZ6XhX70hV71hU72hS75hQ76hO78hN79hM7bhJ7dhI7dhH7fhG7ghF7ghE7ihD7jhB7khB7lhA7mhy7ohx7ohw7qhv7rhu7rht7ths7uhq7vhq7who7yhn7zhm7zhl7Bhk7Chi7Dhi7Ehh7Ehg7Ghf7Ghe7Hhe7Ihc7Jhc7Jhc7Jhb7Lha7Lh97Mh97Nh87Nh77Oh77Oh67Qh57Qh57Qh47Sh37Sh37Sh27Th27Uh17Uh07Vh07WgZ7WgY7XgY7XgY7YgW7ZgW7ZgW80gU81gU81gU82gS83gS83gS83gR85gQ85gQ85gQ86gP86gP86gO88gL8agJ8cgH8fgE8hgC8jgB8kgz8ngw8pgu8rgt8tgq8wgn8Bgj8Egf8Igd8Kga8Og68Rg48Tg18WfZ8YfW90fU92fT93fR95fQ96fO97fN99fM9afK9cfJ9dfH9ffG9gfE9hfE9ifD9jfC9kfB9lfA9lfA9mfz9mfy9nfy9ofx9ofx9ofx9ofx9ofx9pfw9pfv9qfv9qfv9rfu9rfu9rfu9rfv9qfv9rfu9rfu9rfv9qfv9qfv9qfw9pfw9pfw9pfw9ofy9nfy9nfy9nfy9mfA9lfA9lfA9lfB9jfC9jfD9ifE9hfF9ffG9ffH9efI9dfI9cfK9bfK9bfL9afL99fM99fN97fO96fQ95fQ94fS92fT92fT91fV90fV8ZfX8XfY8XfY8Wg08Vg08Ug28Sg38Sg48Qg58Pg68Pg78Ng88Ng98Lga8Kgc8Igd8Igd8Ige8Ggf8Ggg8Egh8Egh8Egi8Cgj8Cgk8Agl8Agm8ygn8ygn8ygo8wgp8wgq8ugr8ugs8sgt8sgt8sgu8qgv8qgw8ogx8ogx8ogy8mgz8mgz8mgz8mgz8mgz8mgz8mgz8mgz8mgz8mgA8kgB8kgB8kgB8kgB8kgB8kgB8kgB8kgB8kgB8kgB8kgC8igD8igD8igD8igD8igD8igD8igD8i8k"
    }, {
        w: 1800,
        h: 886,
        ground_size: 1800,
        offset_x: 0,
        offset_y: 914,
        ground: "0005sS0fsI0osA0wss0Fsi0Osa0Xs017rQ1hrG1rrw1Brm1Lrc1Vr224qU2dqK2qqu2Gqe2Uq237pO3kpC3wpq3Hpg3Qp83Xp244oU4boO4ioG4poA4wos4Coo4Hoi4Noc4To64Zo055nU5bnO5hnI5mnE5rny5xns5Dnm5Jng5Qn85Xn263mW69mQ6emM6jmG6omC6tmw6yms6Cmo6Hmi6Mme6Qma6Um66Ym271m074lW78lS7blQ7elM7hlK7klG7nlE7plC7sly7vlw7xlu7zls7Blq7Elm7Hlk7Jli7Llg7Olc7Rla7Tl87Vl67Xl480l083kY85kW87kU89kS8bkQ8dkO8fkM8hkK8jkI8lkG8nkE8pkC8rkA8tky8vkw8xku8zks8Bkq8Dko8Fkm8Hkk8Jki8Lkg8Nke8Pkc8Rka8Uk68Xk48Zk291k0930N05ie050N950L06ie060L970K07ic070K990I09ia090I9b0G0aia0a0G9d0E0ci80c0E9f0D0di60d0D9g0D0di60d0D9h0B0fi40f0B9j0A0fi40f0A9l0y0hi20h0y9o0w0hi20h0w9r0v0hi20h0v9t0t0ii20i0t9v0r0ki00k0r9y0m0ni00n0m9B0j0pi00p0j9D0f0si00s0famhYb4hYb4hYb4hYb4hYb4hYb5hWb6hWb6hWb6hWb6hWb6hWb5hYb4hYb4hYb4hYb4hYb4hYb4hYb3i0b2i0b2i0b2i0b1i2b0i2aZi4aYi4aYi4aXi6aWi6aVi8aUi8aTiaaSiaaRicaPieaOieaNigaLiiaJikaHimaGimaEiqaBisaziuaxiwaviyatiAaqiEamiIaiiMadiSa7iYa2j29Xj89Ojk9Bjy9mjO96k48Rki8Dkw8qkI8dkW7Zla7Mlm7Dls7wlA7olI7glQ78lY70m66Sme6Lmk6Ems6xmy6qmG6jmM6dmS66n060n45Vna5Qne5Mni5Inm5Enq5Anu5wny5rnE5mnI5inM5enQ5anU56nY51o44Xo64Vo84Toa4Roc4Poe4Nog4Loi4Jok4Hom4Eoq4Bos4yow4voy4soC4poE4moI4joK4hoM4eoQ4boS48oW45oY42p23Zp43Wp83Tpa3Qpe3Npg3Lpi3Jpk3Gpo3Dpq3Bps3zpu3xpw3vpy3spC3ppE3npG3lpI3jpK3hpM3epQ3bpS39pU38pU37pW36pW36pW35pY35pW36pW37pU38pU38pU39pS3apS3apS3bpQ3cpQ3cpQ3dpO3epO3fcJ04cZ3gcI06cY3hcF0acV3icD0ecT3jcA0icQ3kcz0lcO3lcw0pcL3mcu0tcJ3ncs0vcH3ocq0zcF3pcn0DcC3rcl0Gcz3tci0Kcw3wce0Ocs3Acb0Rco3Dc80Ucm3Gc40Yci3Kc012ce3ObX15ca3RbU19c73UbQ1dc33YbN1gbZ42bJ1jbW46bF1nbS49bD1qbP4cbz1ubL4gbv1ybH4kbs1BbD4obo1Fbz4sbk1Ibw4wbh1Lbs4zbe1Pbp4Cba1Tbl4Gb61Ybg4Kb222bc4OaY26b84RaU2cb44UaQ2gb04YaM2kaW52aI2paR56aE2taN5aaA2xaJ5dax2CaF5gat2GaB5k4p065U2K62064p5o4k0c5P2P5W0c4k5s4g0h5K2T5R0h4g5w4d0k5F2Z5M0k4d5A4a0n5B335I0n4a5D490p5x375E0p495G470r5t3c5z0r475K450u5o3g5u0u455O430w5k3k5q0w435R420z5f3p5k0z425U400B5b3t5g0B405Y3Z0C573x5c0C3Z623X0F523C560F3X653X0G4Y3G520G3X683W0I4U3I4Y0I3W6b3X0I4R3J4W0I3X6e3W0K4O3J4T0K3W6h3W0L4M3J4R0L3W6j3X0L4K3K4O0L3X6l3X0N4H3K4L0N3X6n3Y0N4F3K4J0N3Y6p3Z0O4B3L4G0O3Z6r3g0a0A0O4z3L4E0O0A0a3g6t3e0g0w0Q4w3M4A0Q0w0g3e6v3d0i0u0S4u3M4y0S0u0i3d6x3b0m0q0W4r3M4v0W0q0m3b6y3a0q0m0Z4o3N4t0Z0m0q3a6z390u0h134l3N4q130h0u396A380z0c184h3O4l180c0z386B370C081d4d3O4h1d080C376C370G031h4a3O4e1h030G376D3621493O4d21366E362j3Q3P3V2j366E372w3C3Q3G2w376F362M3m3Q3q2M366G363a2Y3Q323a366H363f2S3Q2W3f366I363j2N3R2S3j366I373k2L3S2P3k376J363l2K3S2O3l366K373l2J3S2N3l376K373n2H3S2L3n376L373n2F3T2K3n376M393m2E3U2I3m396M3a3n2C3U2G3n3a6M3c3m2B3U2F3m3c6N3c3m2A3U2E3m3c6O280g0Q3l2z3U2D3l0Q0g286O240v0H3l2w3W2A3l0H0v246O220H0z3k2v3W2z3k0z0H226O1H0g050L0u3m2u3W2y3m0u0L050g1H6O1C1o0f3p2t3W2x3p0f1o1C6O1x592r3W2v591x6O1t5h16021e3Y1i02165h1t6O1q5n0Q0k193Y1d0k0Q5n1q6O1l5v0D0A133Y170A0D5v1l6O1f5K0i0P103Y140P0i5K1f6O13740Z3Y1374136O0W7c0Y3Z117c0W6N0S7i0W40107i0S6M0N7o0V400Z7o0N6M0H7v0U400Y7v0H6M0A7D0T400X7D0A6L0r7O0S410V7O0r6K0g800Q420U800g6K038e0P420T8e03f10P420Tnj0O420Snk0O430Rnl0N430Qnm0M440Qnn0L440Pno0L440Pnp0K450Nnq0K450Nnq0J460Nnr0I460Mns0I460Mnt0H470Knu0H470Knu0G480Knv0F480Jnw0F480Jnw0F490Inw0F490Inx0D4a0Hny0D4b0Gny0D4b0Gny0D4b0Gny0C4c0Gnz0B4d0EnA0B4d0EnA0B4d0EnA0B4d0EnA0A4f0DnA0A4f0DnA0A4f0DnA0A4f0DnA0z4h0CnA0z4h0CnA0z4h0CnA0z4h0CnA0y4j0BnA0y4j0BnC0w4j0znF0v4j0ynG0v4k0xnG0u4l0xnG0u4l0xnF0v4l0ynE0v4m0xnE0u4n0xnE0u4n0xnE0u4o0wnD0v4o0xnC0u4p0xnC0u4p0xnB0v4q0xnA0v4q0xnA0v4q0xnA0u4r0xnz0v4s0xny0v4s0xnx0w4s0ynw0v4t0ynw0v4u0xnv0w4u0ynt0x4u0zns0w4v0znr0x4w0znp0y4w0Ano0y4w0Ann0y4x0Bnl0z4y0Bnk0z4y0Bnj0A4y0Cnh0A4z0Dnf0B4A0Dnd0C4A0Enc0C4A0Enb0C4C0En90D4C0Fn70E4C0Gn50F4C0Hn30G4C0In10I4B0JmY0K4A0MmV0N4x0OmT0P4u0RmR0R4s0TmQ0S4q0UmQ0T4n0WmP0W4k0YmO0X4h10mO0Y4f11mO0Z4d12mO114914mO124715mN144517mM154219mL17401bmJ1a3X1dmH1c3U1gmG1d3S1hmF1f3P1kmD1i3M1mmC1j3K1nmB1l3H1qkq0n1M1n3F1s1M0ni60y1L1o3D1t1L0yhz01040R1J1r3z1w1J0R0401hb0Z1G1t3x1y1G0Zh8121E1v3v1A1E12h4151C1x3s1D1C15h0181A1A3p1F1A18gW1b1y1C3m1I1y1bgS1e1w1E3k1K1w1egO1h1u1G3i1M1u1hgK1k1s1I3f1P1s1kgH1m1q1L3c1R1q1mgE1o1p1N3a1T1p1ogA1r1n1P371W1n1rgw1t1m1R351Y1m1tgt1u1l1T33201l1ugq1w1k1W2Z231k1wgm1y1j1Y2X251j1ygi1A1i202U281i1Age1B1i222S2a1i1Bgb1C1h252P2c1h1Cg81E1g272M2f1g1Eg41F1g292K2h1g1Fg11G1f2b2I2j1f1GfY1I1e2d2F2m1e1IfU1L1c2g2C2o1c1LfR1M1b2i2A2q1b1MfO1O0p030I2k2x2t0I030p1OfK1R0l060H2m2v2v0H060l1RfH1S0i090G2p2r2y0G090i1SfE1V0e0c0F2r2p2A0F0c0e1VfB1Y090f0E2t2n2C0E0f091Yfy2o0D2v2k2F0D2ofu2q0C2x2i2H0C2qfr2r0B2A2f2J0B2rfo2t0A2C2d2L0A2tfl2u0y2F2a2P0y2ufj2v0x2H282R0x2vfg2x0w2J262T0w2xfd2y0v2L242V0v2yfb2z0u2N222X0u2zf82B0t2P202Z0t2Bf52C0s2R1X320s2Cf22E0r2T1V340r2EeZ2F0q2V1T360q2FeX2G0p2X1R380p2GeU2I0n301P3b0n2IeR2J0m321N3d0m2JeP2K0l341L3f0l2KeM2M0k361I3i0k2MeJ2N0j381G3k0j2NeH2O0h3b1E3n0h2OeF2O0h3d1C3p0h2OeD2Q0e3h1z3s0e2QeB2R0d3j1x3u0d2Rez2S0b3m1u3y0b2Sex2U093o1s3A092Uev2W053s1q3E052Wet6v1o6Her6x1m6Jep6z1k6Len6B1i6Nek6E1f6Reh6G1d6Tef6I1b6Ved6K196Xeb6M176Ze96O1571e76Q1274e56S1076e36U0Y78e16W0W7adZ6Y0U7cdX700S7edV730P7gdT750M7jdR770K7ldP790I7ndN7b0G7pdL7d0E7rdJ7f0C7tdI7g0z7vdH7i0x7xdF7k0v7zdD7m0t7BdB7o0r7Ddy7r0p7Gdv7t0m7Jdt7v0k7Ldr7x0i7Ndp7z0g7Pdn7B0e7Rdl7D0c7Tdj7F0a7Vdh7I067Ydf7K0480ddfQdbfSd9fUd7fWd5fYd3g0d0g4cXg6cVg8cTgacQgecNggcLgicIgmcFgocDgqcAgucwgycrgEcmgIchgOcbgUc6gYbXhcbIhsbqhMb8i2aWiaaOiiaGiqaAiuawiyasiCaoiGakiKagiOaciSa8iWa5iYa2j29Zj49Wj89Tja9Qje9Njg9Kjk9Hjm9Ejq9Bjs9zju9wjy9tjA9qjE9njG9kjK9hjM9ejQ9bjS98jW95jY92k28Zk48Wk88Tka8Qke8Nkg8Lki8Ikm8Fko8Cks8zku8wky8tkA8rkC8okG8lkI8ikM8fkO8dkQ8akU87kW85kY82l27Zl47Xl67Ula7Rlc7Ple7Mli7Jlk7Hlm7Flo7Flm7Glm7Hlk7Ilk7Jli7Llg7Mlg7Nle7Ole7Plc7Qlc7Rla7Sla7Tl87Ul87Vl67Wl67Xl47Yl47n020Al20A026L030Al20A036J050zl20z056G080zl00z086D0a0yl00y0a6B0d0wl00w0d6y0g0wkY0w0g6v0i0vkY0v0i6t0l0tkY0t0l6q0o0tkW0t0o6n0q0skW0s0q6l0t0rkU0r0t6i0w0qkU0q0w6f0y0pkU0p0y6e0A0okS0o0A6d0D0mkS0m0D6c0F0kkS0k0F6b0I0jkQ0j0I6a0K0hkQ0h0K690N0fkQ0f0N670P0fkO0f0P660R0dkO0d0R650U0ckM0c0U640W0akM0a0W630Z07kO070Z621105kO051161n25Zn45Xn65Vn85Tna5Rnc5Pne5One5Nng5Lni5Jnk5Hnm5Fno5Dnq5Bns5znu5xnw5wnw5vny5tnA5rnC5pnE5nnG5lnI5jnK5hnM5gnM5fnO5dnQ5bnS59nU57nW55nY53o051o24Zo44Wo84Toa4Qoe4Nog4Kok4Hom4Foo4Doq4Bos4yow4voy4toA4roC4poE4noG4loI4ioM4foO4doQ4boS49oU47oW45oY42p23Zp43Xp63Vp83Tpa3Rpc3Ppe3Npg3Kpk3Gpo3Dpq3Apu3ypu3xpw3vpy3tpA3rpC3ppE3npG3lpI3kpI3ipM3fpO3dpQ3bpS39pU37pW35pY33q031q22Zq42Xq62Vq82Tqa2Rqc2Pqe2Nqg2Kqk2Hqm2Fqo2Dqq2Bqs2zqu2wqy2tqA2rqC2rqA2uqw2yqs2Cqo2Gqk2Kqg2Sq434pS3hpE3ups3Kp845oM4joG4poA4wos4Coo4Gok4Joi4Moe4Qoa4To84Vo64Xo44Zo252nY55nW57nU59nS5bnQ5dnO5fnM5gnM5hnK5inK5jnI5knI5lnG5mnG5nnE5onE5pnC5qnC5rnA5snA5snA5tny5uny5uny5uny5uny2K"
    }];

function MapNumberToObject(e) {
    if ("number" == typeof e) return MAPS[e];
    var o = {};
    return o.w = e[0], o.h = e[1], o.ground_size = e[2], o.offset_x = e[3], o.offset_y = e[4], o.ground = e[5], o.bg = "sea_bg2", o.fg = "bricks", o.bgcolor = "#84b6ce", o
}

function GetMapName(e) {
    return e == MAP_RANDOM ? "Random" : e == MAP_CUSTOM ? "Custom" : MAPS[e] ? MAPS[e].name : "Unknown"
}

function SetMapBgFgColor(e, o, t, a, n) {
    o && (MAPS[e].bg = -1 == o.indexOf("/") ? "/static/images/maps/" + o : o), t && (MAPS[e].fg = -1 == t.indexOf("/") ? "/static/images/maps/" + t : t), a && (MAPS[e].bgcolor = a), n && (MAPS[e].name = n)
}

function base62_decode(e, o, t, a) {
    for (o = t = (e === (e += "") && /^[a-z\d]+$/i.test(e)) - 1; a = e.charCodeAt(t++);) o = 62 * o + a - [, 48, 29, 87][a >> 5];
    return o
}

function DragonDecompress2(e) {
    var o, t, a = [];
    for (o = 0; o < e.length; o += 2) "-" == e[o] ? (t = e[o + 1] + e[o + 2] + e[o + 3] + e[o + 4], o += 3) : "+" == e[o] ? (t = e[o + 1] + e[o + 2] + e[o + 3], o += 2) : t = e[o] + e[o + 1], a.push(base62_decode(t));
    return a
}

function DragonDecompress(e) {
    var o, e = DragonDecompress2(e),
        t = "",
        a = !1,
        n = e.length;
    for (o = 0; o < n; o++) t += fillString(a ? 1 : 0, e[o]), a = !a;
    return t
}

function ImageDataToBooleanArray(e) {
    var o, t = [],
        a = e.data,
        n = e.width,
        r = e.height;
    for (o = 0; o < r; o++)
        for (e = 0; e < n; e++) t.push(0 != a[4 * (o * n + e) + 3]);
    return t
}

function ImageDataToBooleanArray2(e) {
    var o, t, a = [],
        n = e.data,
        r = e.width,
        s = e.height;
    for (o = 0; o < s; o++)
        for (e = 0; e < r; e++) a.push(!(0 == n[(t = 4 * (o * r + e)) + 3] || 255 == n[t] && 255 == n[t + 1] && 255 == n[t + 2]));
    return a
}

function BooleanArrayToImageData(e, o, t) {
    var a, n, r = 0,
        s = o.width,
        d = o.height,
        u = o.data,
        _ = "string" != typeof e || "1";
    for (n = 0; n < d; n++)
        for (a = 0; a < s; a++) u[4 * (n * s + a) + 3] = e[r] == _ ? 255 : 0, r++;
    if (t) {
        for (n = 0; n < d; n++)
            for (a = 0; a < s; a++)
                if (u[4 * (n * s + a) + 3]) {
                    for (r = 1; 10 >= r; r++)
                        if (!u[4 * (n * s + (a - r)) + 3] || !u[4 * (n * s + (a + r)) + 3] || !u[4 * ((n - r) * s + a) + 3] || !u[4 * ((n + r) * s + a) + 3] || !u[4 * ((n + r) * s + (a + r)) + 3] || !u[4 * ((n - r) * s + (a - r)) + 3] || !u[4 * ((n + r) * s + (a - r)) + 3] || !u[4 * ((n - r) * s + (a + r)) + 3]) {
                            u[4 * (n * s + a)] *= .1 * (r - 1), u[4 * (n * s + a) + 1] *= .1 * (r - 1), u[4 * (n * s + a) + 2] *= .1 * (r - 1);
                            break
                        }
                }
    }
    return o
}

function CGround(e) {
    var o = MapNumberToObject(e),
        e = this.canvas = document.getElementById("ground_canvas"),
        t = o.w,
        a = o.h;
    this.w = e.width = t, this.h = e.height = a, $("#ground_canvas").css({
        width: t,
        height: a
    });
    var n = DragonDecompress(o.ground),
        r = e.getContext("2d");
    this.imageData = r.createImageData(t, a), BooleanArrayToImageData(n, this.imageData), r.putImageData(this.imageData, 0, 0);
    var s = new Image,
        d = this;
    s.onload = function() {
        var e = ImageDataToBooleanArray(d.imageData);
        r.drawImage(s, 0, 0, Math.max(o.w, s.width), Math.max(o.h, s.height)), d.imageData = r.getImageData(0, 0, t, a), BooleanArrayToImageData(e, d.imageData, !0), r.putImageData(d.imageData, 0, 0)
    }, s.src = -1 == o.fg.indexOf("/") ? "/static/images/maps/" + o.fg + ".jpg" : o.fg, -1 == (e = o.bg).indexOf("/") && (e = "/static/images/maps/" + e + ".jpg"), $("#gameScreen").css("background-color", o.bgcolor), g_is_game_background ? $("#map_bg").css({
        width: MAP_BACKGROUND_W,
        height: MAP_BACKGROUND_H,
        background: o.bgcolor + " url(" + e + ")"
    }).show() : $("#map_bg").hide()
}

function CCamera(e, o) {
    var t = MapNumberToObject(e);
    this.min_x = -t.offset_x + 400, this.max_x = t.ground_size - 400, this.min_y = -t.offset_y + 300, this.max_y = t.ground_size - t.offset_y - 300 + 84, this.max_y = t.ground_size - t.offset_y - 300 + 84, this.bg_aspect_ratio_x = (MAP_BACKGROUND_W - 800) / (t.ground_size - 500), this.bg_aspect_ratio_y = (MAP_BACKGROUND_H - 600) / (t.ground_size - 500), this.bg_offset_x = t.offset_x, this.bg_offset_y = t.offset_y, this.onChange = o
}
CGround.prototype.IsPixel = function(e, o) {
    return !(0 > e) && !(e >= this.w) && !(0 > o) && !(o >= this.h) && 0 < this.imageData.data[4 * (o * this.w + e) + 3]
}, CGround.prototype.GetPosForWalking = function(e, o, t) {
    var a = t == PLAYER_LOOK_LEFT ? e - 1 : e + 1;
    if (0 > a || a >= this.w) return {
        x: e,
        y: o,
        stuck: !0
    };
    if (this.IsPixel(a, o)) {
        for (t = o; t > o - 10; t--)
            if (!this.IsPixel(a, t)) return {
                x: a,
                y: t
            };
        return {
            x: e,
            y: o,
            stuck: !0
        }
    }
    for (t = o + 1; t < this.h; t++)
        if (this.IsPixel(a, t)) return {
            x: a,
            y: t - 1
        };
    return {
        x: a,
        y: this.h + 100,
        fall_and_die: !0
    }
}, CGround.prototype.GetUnder = function(e, o, t) {
    if (void 0 == this.imageData) throw Error("GetUnder - imageData = undefined");
    for (t = t ? o + t : this.h; o < t; o++)
        if (this.IsPixel(e, o)) return o - 1
}, CGround.prototype.GetAngle = function(e, o) {
    if (this.IsPixel(e, o)) return debug && console.log("[CGround.GetAngle] IN-GROUND"), 0;
    var t = this.GetUnder(e, o, 10);
    if (void 0 == t) return debug && console.log("[CGround.GetAngle] FALLING"), 0;
    if (t != o) return debug && console.log("[CGround.GetAngle] FLYING"), 0;
    for (var a = t, n = 1, r = t, s = 1, d = 1; 9 >= d; d++) void 0 != (t = this.GetUnder(e - d, o - 10, 20)) && (a += t, n++), void 0 != (t = this.GetUnder(e + d, o - 10, 20)) && (r += t, s++);
    return Math.round(RadToAngle(Math.atan2((0 < s ? r / s : o) - (0 < n ? a / n : o), 19)))
}, CGround.prototype.AddGroundHole = function(e, o, t, a) {
    var n, r, s, d, u, _, c, h = t * t,
        p = a * a;
    for (n = e - t - 10; n <= e; n++)
        for (c = !1, t = o - a - 10; t < o; t++)
            if (d = (r = n - e) * r / h + (s = t - o) * s / p, !c && 1.2 > d) {
                if (c = !0, u = n, _ = t, s = o - s, this.AddGroundShadowColumn(u, _, s), 0 != r && (u = e - r, this.AddGroundShadowColumn(u, _, s)), 1.2 <= d && c) break
            } else if (1 > d) {
        u = n, _ = t, s = o - s, this.AddGroundHoleColumn(u, _, s), 0 != r && (u = e - r, this.AddGroundHoleColumn(u, _, s));
        break
    }
    this.canvas.getContext("2d").putImageData(this.imageData, 0, 0)
}, CGround.prototype.AddGroundHoleColumn = function(e, o, t) {
    if (!(0 > e || e >= this.w) && (0 > o && (o = 0), t >= this.h && (t = this.h - 1), !(t < o)))
        for (var a = this.w, n = o; n <= t; n++) o = 4 * (n * a + e), this.imageData.data[o + 3] = 0
}, CGround.prototype.AddGroundShadowColumn = function(e, o, t) {
    if (!(0 > e || e >= this.w) && (0 > o && (o = 0), t >= this.h && (t = this.h - 1), !(t < o)))
        for (var a = this.w, n = o; n <= t; n++) o = 4 * (n * a + e), this.imageData.data[o] /= 2, this.imageData.data[o + 1] /= 2, this.imageData.data[o + 2] /= 2
}, Object.freeze(CGround.prototype), CCamera.prototype.FocusAt = function(e, o, t, a) {
    var n;
    if (t && (void 0 == this.x ? t = !1 : 30 > (n = Math.sqrt((this.x - e) * (this.x - e) + (this.y - o) - (this.y - o))) && (t = !1)), e < this.min_x ? e = this.min_x : e > this.max_x && (e = this.max_x), o < this.min_y ? o = this.min_y : o > this.max_y && (o = this.max_y), this.x = e, this.y = o, a) {
        var r = this;
        $("#camera").promise().done(function() {
            r.Set(e, o, t, n)
        })
    } else this.Set(e, o, t, n)
}, CCamera.prototype.MoveBy = function(e, o, t) {
    this.FocusAt(this.x + e, this.y + o, t)
}, CCamera.prototype.Set = function(e, o, t, a) {
    var e = Math.round(e),
        o = Math.round(o),
        n = -(e - 400),
        r = -(o - 300),
        s = (n - this.bg_offset_x) * this.bg_aspect_ratio_x,
        d = (r - this.bg_offset_y) * this.bg_aspect_ratio_y,
        u = $("#camera"),
        _ = $("#map_bg"),
        c = this.onChange;
    t ? (u.stop(!0).animate({
        left: n,
        top: r
    }, {
        duration: a,
        progress: function() {
            if (c) {
                var e = -parseInt(u.css("left")),
                    o = -parseInt(u.css("top"));
                c(e, o)
            }
        }
    }), _.stop(!0).animate({
        left: s,
        top: d
    }, a)) : (u.stop(!0).css({
        left: n,
        top: r
    }), _.stop(!0).css({
        left: s,
        top: d
    }), c && c(e - 400, o - 300))
}, Object.freeze(CCamera.prototype);
var START_GAME_PLAYER = Object.freeze({
    n: 0,
    user_id: 1,
    name: 2,
    guild: 3,
    rank: 4,
    x: 5,
    y: 6,
    hp: 7,
    shield: 8,
    shield_regen: 9,
    minang: 10,
    maxang: 11,
    lastturn: 12,
    mobile: 13,
    avatars: 14,
    aim_s1_ang: 15,
    aim_s1_len: 16,
    aim_s2_ang: 17,
    aim_s2_len: 18,
    aim_ss_ang: 19,
    aim_ss_len: 20
});

function CPlayer(e, o, t, a) {
    if (void 0 == e) throw Error("CPlayer - bad arguments", e);
    this.x = e[START_GAME_PLAYER.x], this.y = e[START_GAME_PLAYER.y], this.look = PLAYER_LOOK_LEFT, this.minang = e[START_GAME_PLAYER.minang], this.maxang = e[START_GAME_PLAYER.maxang], this.ang = random(this.minang, this.maxang), this.team = 0 == e[START_GAME_PLAYER.n] % 2 ? "A" : "B", this.hp = this.maxhp = e[START_GAME_PLAYER.hp], this.shield = this.maxshield = e[START_GAME_PLAYER.shield], this.shield_regen = e[START_GAME_PLAYER.shield_regen], this.rank = e[START_GAME_PLAYER.rank], this.mobile = e[START_GAME_PLAYER.mobile], this.guild = e[START_GAME_PLAYER.guild], this.delay = this.delay_before = 0, this.lastturn = e[START_GAME_PLAYER.lastturn], this.mobile = e[START_GAME_PLAYER.mobile], this.aim = [new Vector(e[START_GAME_PLAYER.aim_s1_ang], e[START_GAME_PLAYER.aim_s1_len]), new Vector(e[START_GAME_PLAYER.aim_s2_ang], e[START_GAME_PLAYER.aim_s2_len]), new Vector(e[START_GAME_PLAYER.aim_ss_ang], e[START_GAME_PLAYER.aim_ss_len])], this.is_me = o, this.user_id = e[START_GAME_PLAYER.user_id], this.name = e[START_GAME_PLAYER.name], this.player_number_in_game = e[START_GAME_PLAYER.n], this.is_alive = !0, this.last_sent_look = this.last_sent_y = this.last_sent_x = void 0, this.ground = t, this.avatars = e[START_GAME_PLAYER.avatars], this.dn = a, this.isInView = !1, this.Init()
}(g_dirty = new Image).src = "//2.dragonbound.net/static/images/hotlink-ok/trans.gif", CPlayer.prototype.Chat = function(e, o) {
    var t = this.divBalloon,
        a = this.divBalloonTip;
    4 == o ? t.addClass("bg1") : t.removeClass("bg1"), 5 == o ? t.addClass("bg2") : t.removeClass("bg2"), t.removeClass("text_anim"), a.removeClass("text_anim"), setTimeout(function() {
        t.html(e), t.addClass("text_anim"), a.addClass("text_anim")
    }, 20)
}, CPlayer.prototype.Shoot = function(e, o, t) {
    this.dn.SendPlayerShoot(this.x, this.y, this.body, this.look, this.ang, e, o, t), e = (this.look == PLAYER_LOOK_LEFT ? 180 - this.ang : this.ang) - this.body, o = $("#LastAngleDigit-"), 90 < e && (e = 180 - e), 0 > e ? (o.show(), e *= -1) : o.hide(), $("#LastAngleDigit1").removeClass().addClass("LastAngleDigit LastAngleDigit" + Math.floor(e / 10)), $("#LastAngleDigit2").removeClass().addClass("LastAngleDigit LastAngleDigit" + e % 10)
}, CPlayer.prototype.PassTurn = function(e) {
    this.dn.SendPlayerPassTurn(this.x, this.y, this.body, this.look, this.ang, e)
}, CPlayer.prototype.SendPosUpdate = function() {
    (this.x != this.last_sent_x || this.y != this.last_sent_y || this.look != this.last_sent_look) && (this.dn.SendPlayerMove(this.x, this.y, this.body, this.look, this.ang), this.last_sent_x = this.x, this.last_sent_y = this.y, this.last_sent_look = this.look)
}, CPlayer.prototype.UseItem = function(e) {
    this.dn.SendPlayerUseItem(e)
}, CPlayer.prototype.UpdateHpShieldGraphic = function() {
    var e = this.maxhp + this.maxshield,
        o = 76 * this.hp / e,
        e = 76 * this.shield / e;
    this.divHp.css({
        backgroundColor: "#63b64a",
        width: o
    }), this.divShield.css({
        width: e,
        left: o
    })
}, CPlayer.prototype.CreateDivs = function() {
    if (this.divHp = $("<div/>", {
            style: "position: absolute;top: 0;left: 0;height: 3px;background-color: #63b64a;width: 76px;transition: all 1.25s ease-in-out;-webkit-transition: all 1.25s ease-in-out;-moz-transition: all 1.25s ease-in-out;"
        }), this.divShield = $("<div/>", {
            style: "position: absolute;top: 0;left: 0;height: 3px;background-color: #0000ff;width: 0;transition: all 1.25s ease-in-out;-webkit-transition: all 1.25s ease-in-out;-moz-transition: all 1.25s ease-in-out;"
        }), this.divMobile = $("<div/>", {
            style: "position: absolute;background-repeat: no-repeat;"
        }), this.ani_image = new CPlayerGraphic(this.divMobile, this.mobile, this.avatars[0], this.avatars[1], this.avatars[2], this.avatars[3], !1), this.is_me) {
        this.aimCircleCanvas = $('<canvas style="position: absolute;margin-left: -43px;margin-top: -43px;" width="86" height="86"/>'), this.aimCircleContext = this.aimCircleCanvas[0].getContext("2d"), this.myAngleContext = $("#MyAngle")[0].getContext("2d"), this.divMobile.append(this.aimCircleCanvas);
        var e = this,
            o = this.aimCircleImage = new Image;
        o.onload = function() {
            e.UpdateGuiAngle(), e.DrawPlayerAngle()
        }, o.src = GetBackgroundImageUrl("#gameui")
    }
    this.divReducedDef = $("<div/>", {
        style: "position: absolute;top: -6px;left: 30px;font-size: 11px;color: #9cffde;text-shadow: #0066ff -1px 0 1px, #0066ff 0 1px 1px, #0066ff 1px 0 1px, #0066ff 0 -1px 1px;"
    }), this.divIon = $("<div/>", {
        style: "position: absolute;"
    }), (o = MOBILES[this.mobile]).ion_file && (this.ion = new CAnimatedObject2("mobiles/" + o.ion_file + ".png", o.ion_graphics, 0, 0, this.divIon, 1, ANIMATIONS_FPS, this.flip, LOOP_NORMAL, 0, 2, !0), this.SetIon(90, 0, -200)), this.divTurn = $("<div/>", {
        class: "Turn"
    }), this.divBalloon = $("<div/>", {
        class: "GamePlayerBalloon"
    }), this.divBalloonTip = $("<div/>", {
        class: "GamePlayerBalloonTip"
    }), this.divPlayer = $("<div/>", {
        style: "position:absolute;width:160px;-webkit-transform:translate3d(0px,0px,0px);"
    }).append(this.divMobile).append($("<div/>", {
        style: "position:absolute;left:-10px;top:17px;width:120px;font-family:arial;font-size:12px;" + ("A" == this.team ? "color: #FF9E6B;text-shadow:#734529 -1px 0 1px, #734529 0 1px 1px, #734529 1px 0 1px, #734529 0 -1px 1px;" : "color: #BDCFCF;text-shadow:#394d6b -1px 0 1px, #394d6b 0 1px 1px, #394d6b 1px 0 1px, #394d6b 0 -1px 1px;"),
        class: "blackShadow"
    }).html(this.nameHtml)).append($("<div/>", {
        class: "PlayerRank rank rank" + this.rank
    })).append(this.divReducedDef).append($("<div/>", {
        style: "position: absolute;top: 10px;left: -40px;width: 76px;height: 3px;border: 1px solid white;background-color: #292c29;z-index: 1;"
    }).append(this.divHp).append(this.divShield)).append(this.divTurn).append(this.divIon).append(this.divBalloon).append(this.divBalloonTip)
}, CPlayer.prototype.AddToDom = function() {
    !this.isInDom && this.is_alive && (this.divPlayer.css({
        left: this.x,
        top: this.y
    }).insertBefore("#game_objects"), this.isInDom = !0)
}, CPlayer.prototype.RemoveFromDom = function() {
    this.isInDom && (this.divBalloon.removeClass("text_anim"), this.divBalloonTip.removeClass("text_anim"), this.divPlayer.css({
        left: random(-9e3, -5e3),
        top: random(-9e3, -5e3)
    }).remove(), this.isInDom = void 0)
}, CPlayer.prototype.Init = function() {
    this.nameHtml = BuildPlayerNameWithGuild(this.guild, this.name, this.team), this.CreateDivs(), this.UpdateHpShieldGraphic(), this.SetReducedDefence(0), this.ChangedShot(GetSelectedShotType()), this.Fall(), this.divMobile.css({
        scaleX: 1,
        scaleY: 1
    }), this.ChangeAngleTo(this.ang, !0)
}, CPlayer.prototype.Remove = function() {
    this.ani_image.remove(), this.ion && this.ion.remove(), this.RemoveFromDom()
}, CPlayer.prototype.Walk = function(e) {
    this.Look(e);
    var o = this.body,
        o = this.ground.GetPosForWalking(this.x, this.y, e);
    return !o.fall_and_die && !o.stuck && (this.x = o.x, this.y = o.y, this.divPlayer.css({
        left: o.x,
        top: o.y
    }), o = this.ground.GetAngle(o.x, o.y), e = this.divMobile, this.body != o && (this.body = o, this.UpdateGuiAngle(), 0 == e.queue("fx") ? e.css({
        rotate: this.body + "deg",
        scaleX: this.look == PLAYER_LOOK_LEFT ? 1 : -1
    }) : e.css({
        rotate: this.body + "deg"
    })), !0)
}, CPlayer.prototype.SetIon = function(e, o, t, a) {
    var n = this.divIon;
    void 0 != e && n.css({
        rotate: -e + "deg"
    }), void 0 != o && void 0 != t && void 0 != a && n.animate({
        left: o,
        top: t
    }, a)
}, CPlayer.prototype.EnterView = function() {
    this.isInView = !0, this.AddToDom()
}, CPlayer.prototype.ExitView = function() {
    this.isInView = !1, this.RemoveFromDom()
}, CPlayer.prototype.OnCameraUpdate = function(e, o) {
    var t = this.x > e - 80 && this.x < e + 880 && this.y > o - 80 && this.y < o + 680;
    this.isInView && !t ? this.ExitView() : !this.isInView && t && this.EnterView()
}, CPlayer.prototype.Look = function(e) {
    this.look != e && (e == PLAYER_LOOK_LEFT ? this.look = PLAYER_LOOK_LEFT : e == PLAYER_LOOK_RIGHT && (this.look = PLAYER_LOOK_RIGHT), (e = this.divMobile).stop(), e.animate({
        scaleX: this.look == PLAYER_LOOK_LEFT ? 1 : -1
    }, 300), this.UpdateGuiAngle())
}, CPlayer.prototype.ChangeAngleTo = function(e, o) {
    e > this.maxang && (e = this.maxang), e < this.minang && (e = this.minang), (this.ang != e || o) && (this.ang = e, this.UpdateGuiAngle(), this.DrawPlayerAngle())
}, CPlayer.prototype.UpdateGuiAngle = function() {
    if (this.is_me) {
        var e = (this.look == PLAYER_LOOK_LEFT ? 180 - this.ang : this.ang) - this.body;
        90 < e && (e = 180 - e);
        var o = this.myAngleContext,
            t = this.aimCircleImage;
        o.clearRect(0, 0, 86, 86), t && (0 > e && (o.drawImage(t, 801, 154, 13, 13, 0, 0, 13, 13), e *= -1), o.drawImage(t, 801, 14 * Math.floor(e / 10) + 14, 13, 13, 13, 0, 13, 13), o.drawImage(t, 801, 14 * (e % 10) + 14, 13, 13, 26, 0, 13, 13), o.drawImage(g_dirty, -1, -1, 1, 1))
    }
}, CPlayer.prototype.DrawPlayerAngle = function() {
    if (this.is_me) {
        var e = this.aimCircleContext,
            o = this.aimCircleImage;
        e.clearRect(0, 0, 86, 86), e.save(), o && e.drawImage(o, 483, 116, 86, 86, 0, 0, 86, 86), e.translate(43, 43), e.beginPath(), e.arc(0, 0, 28, AngleToRad(180 + this.minang), AngleToRad(180 + this.maxang)), e.lineWidth = 25, e.strokeStyle = "rgba(0,220,0,0.5)", e.stroke(), e.rotate(AngleToRad(180 + this.ang)), o && e.drawImage(o, 526, 213, 43, 5, 0, -2, 43, 5), e.restore(), e.drawImage(g_dirty, -1, -1, 1, 1)
    }
}, CPlayer.prototype.Fall = function() {
    if (this.is_alive) {
        var e = this.ground.GetUnder(this.x, this.y);
        if (void 0 == e) {
            debug && console.log("Player fall and die"), this.y = 2e3;
            var o = this;
            this.divPlayer.animate({
                top: this.y
            }, 4e3, "linear", function() {
                $(o).hide()
            }), this.is_alive = !1
        } else e != this.y && (this.y = e, this.divPlayer.animate({
            top: this.y
        }, 500)), (e = this.ground.GetAngle(this.x, this.y)) != this.body && (this.body = e, this.divMobile.css("rotate", this.body + "deg"), this.UpdateGuiAngle())
    }
}, CPlayer.prototype.MoveTo = function(e, o, t, a) {
    if (this.is_alive) {
        if (void 0 != t && this.look != t && (this.look = t, this.divMobile.css("scaleX", t == PLAYER_LOOK_LEFT ? 1 : -1)), this.x = e, this.y = o, a) this.divPlayer.stop(!0).css({
            left: e,
            top: o
        }), this.Fall();
        else {
            var n = this;
            this.divPlayer.stop(!0).animate({
                left: e,
                top: o
            }, 1e3, function() {
                n.Fall()
            })
        }
    }
}, CPlayer.prototype.ChangeHPShield = function(e, o, t, a) {
    if (!(this.hp == e && this.shield == o)) {
        void 0 == o && (o = 0);
        var n = this.hp - e + (this.shield - o);
        if (!(a && 0 >= n) && (a = this.hp == e, this.hp = e, this.shield = o, void 0 == t && console.log("******* turn_number = undefined"), e = this.maxhp + this.maxshield, o = 76 * this.hp / e, 0 < this.maxshield && this.divShield.css({
                width: 76 * this.shield / e,
                left: o
            }), new CDamageEffect(this.x - 30, this.y - 30, -n, this.player_number_in_game, t, a), 0 > this.hp && (this.is_alive = !1), !a)) {
            var r = this;
            this.divHp.css({
                backgroundColor: .3 >= this.hp / this.maxhp ? "#c61000" : "#63b64a",
                width: o
            }), this.is_alive || this.divPlayer.animate({
                opacity: 0
            }, 1500, function() {
                r.RemoveFromDom()
            })
        }
    }
}, CPlayer.prototype.ReduceHPby = function(e, o) {
    if (this.is_alive) {
        var t = this.shield,
            a = this.hp,
            t = t - e;
        0 > t && (a += t, t = 0), this.ChangeHPShield(a, t, o, !0)
    }
}, CPlayer.prototype.SetReducedDefence = function(e) {
    this.divReducedDef.html(0 == e ? "" : "-" + e + " DEF")
}, CPlayer.prototype.ChangeAliveTo = function(e) {
    if (!0 == this.is_alive && !1 == e) {
        debug && console.log("[CPlayer.ChangeAliveTo] player", this.name, "died"), this.is_alive = !1;
        var o = this.divPlayer;
        o.animate({
            opacity: 0
        }, 1500, "linear", function() {
            o.hide()
        })
    }
}, CPlayer.prototype.ChangeMyTurn = function(e) {
    var o = this.divTurn;
    e ? g_graphics_high ? o.css({
        bottom: 100,
        "background-position": "-144px -159px",
        height: 29
    }).slideDown("slow") : o.css({
        bottom: 100,
        "background-position": "-144px -159px",
        height: 29
    }).show() : g_graphics_high ? o.stop(!0).css("height", 29).slideUp("slow").hide() : o.stop(!0).css("height", 29).hide()
}, CPlayer.prototype.RegenShield = function(e) {
    if (this.is_alive && !(0 >= this.shield_regen) && this.shield < this.maxshield) {
        var o = Math.min(this.shield_regen, this.maxshield - this.shield);
        this.ChangeHPShield(this.hp, this.shield + o, e, !1)
    }
}, CPlayer.prototype.ChangeDelay = function(e, o) {
    e != this.delay && (this.delay_before = this.delay, this.delay = e), this.lastturn = o
}, CPlayer.prototype.ChangedShot = function(e) {
    var o = this.aim[e];
    this.aimCircleCanvas && this.aimCircleCanvas.css({
        left: -o.x,
        top: o.y
    }), this.ion && this.SetIon(void 0, 0, 1 == e ? -600 : -200, 500)
}, CPlayer.prototype.TeleportTo = function(e, o) {
    this.MoveTo(e, o)
}, Object.freeze(CPlayer.prototype);
var g_custom_map, g_add_bot_to_slot, g_options_map = MAP_RANDOM,
    g_max_players = 8,
    g_game_mode = GAME_MODE_NORMAL,
    RANK_FOR_DISABLE_TELE = 11,
    RANK_FOR_DISABLE_S1 = 9,
    RANK_FOR_RANDOM_TEAMS = 7;

function RoomGUI(e) {
    $("#roomChat").tinyscrollbar({
        size: 58
    }), $("#roomButtonBack").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendRoomLeave()
    }), $("#roomButtonReady").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), CheckBrowserAbilities(!0) && (AutoReadyStop(), e.SendRoomChangeReady(!e.myPlayerInfo.is_ready))
    }), $("#roomButtonStart").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), CheckBrowserAbilities(!0) && e.SendRoomGameStart()
    }), $("#roomButtonChangeTeam").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendRoomChangeTeam("A" == e.myPlayerInfo.team ? "B" : "A")
    }), $("#roomButtonMobile").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var o = e.myPlayerInfo.mobile + 1;
        o > LAST_SELECTABLE_MOBILE && (o = FIRST_SELECTABLE_MOBILE), e.SendRoomChangeMobile(o)
    }), $(".playerInRoom").click(function() {
        AddToChatInput($(this).children(".roomPlayerName").html().split("</span> ").pop().replace("&amp;", "&").replace("&gt;", ">").replace("&lt;", "<"))
    }), $("#itemDual").click(function() {
        RoomSelectItem(ITEM_DUAL)
    }), $("#itemTeleport").click(function() {
        $(this).hasClass("grayscale") || RoomSelectItem(ITEM_TELEPORT)
    }), $("#itemSlot0").click(function() {
        RoomRemoveItemFromSlot(0)
    }), $("#itemSlot1").click(function() {
        RoomRemoveItemFromSlot(1)
    }), $("#itemSlot2").click(function() {
        RoomRemoveItemFromSlot(2)
    }), $("#itemSlot3").click(function() {
        RoomRemoveItemFromSlot(3)
    }), $("#itemSlot4").click(function() {
        RoomRemoveItemFromSlot(4)
    }), $("#itemSlot5").click(function() {
        RoomRemoveItemFromSlot(5)
    }), $("#roomInput").bind("keyup", function(o) {
        13 == o.which && "" != this.value && (o = this.value, this.value = "", e.SendChat(o))
    }), $("#room_change_title_button").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.myPlayerInfo.is_master ? (FadeInDialog("dialog_change_title_div"), $("#room_change_title_input").focus()) : DragonDialogOpen(l.t("Not Room Master"), l.t("Sorry, only the room master can change the room title."), 1)
    }), $("#room_options_button").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.myPlayerInfo.is_master ? (FixRoomOptionsDialog(e.myPlayerInfo.rank), FadeInDialog("dialog_room_options")) : DragonDialogOpen(l.t("Not Room Master"), l.t("Sorry, only the room master can change the room options."), 1)
    }), $("#dialog_change_title_cancel").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ExplodeDialog("dialog_change_title_div")
    }), $("#dialog_change_title_ok").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendRoomChangeTitle($("#room_change_title_input").val()), ExplodeDialog("dialog_change_title_div")
    }), $(".roomBotSelect").click(function(o) {
        o.stopPropagation(), $("#select_bot_div").is(":visible") ? $("#select_bot_div").slideUp(g_graphics_high ? "slow" : 0) : (AudioPlay(AUDIO_BUTTON_SELECT2), o = Number($(this).parent().attr("id")[12]), OpenBotSelectDialog(o, e))
    }), $(".roomBotRemove").click(function(o) {
        AudioPlay(AUDIO_BUTTON_SELECT2), o.stopPropagation(), o = Number($(this).parent().attr("id")[12]), e.SendSelectBot(o, -1)
    }), $("#add_bot_button").click(function(o) {
        AudioPlay(AUDIO_BUTTON_SELECT2), o.stopPropagation(), OpenBotSelectDialog(g_add_bot_to_slot, e)
    }), $("body").click(function() {
        $("#select_bot_div").is(":visible") && $("#select_bot_div").slideUp(g_graphics_high ? "slow" : 0)
    }), $(".roomPlayerInfo").click(function(o) {
        AudioPlay(AUDIO_BUTTON_SELECT2), InfoDialogOpenFor($(this).attr("user_id"), e), o.stopPropagation()
    }), $("#infoClose").click(function(e) {
        AudioPlay(AUDIO_BUTTON_SELECT2), ExplodeDialog("playerInfoDialog"), e.stopPropagation()
    }), $("#infoAddBuddy").click(function(o) {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendAddFriendRequest($(this).attr("user_id")), o.stopPropagation()
    }), $("#infoGuildInvite").click(function(o) {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendGuildInviteRequest($(this).attr("user_id")), o.stopPropagation()
    }), $("#infoChat").click(function(o) {
        AudioPlay(AUDIO_BUTTON_SELECT2), ChatDialogCreate($(this).attr("user_id"), $("#infoName").html(), e), o.stopPropagation()
    }), $("#room_item_buddy_tab").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var o = $("#room_item_buddy_tab");
        o.hasClass("BuddyList") ? (RoomTabChangeTo(TAB_GUILD), e.SendTabWatch(2), 0 == $("#guildMembersListHtml").children().length && e.SendRefreshGuildies()) : o.hasClass("Guild") ? (RoomTabChangeTo(TAB_ALL), e.SendTabWatch(0)) : (RoomTabChangeTo(TAB_FRIENDS), e.SendTabWatch(1), 0 == $("#friendsListHtml").children().length && e.SendRefreshFriends())
    }), $("#roomButtonVideoChat").click(function() {
        var o;
        DragonVideoButton(e.myPlayerInfo.game_id, SERVER_TYPE.toUpperCase() + (Number(e.server) + 1) + "-" + e.myPlayerInfo.room_number)
    }), RoomOptionsDialogGUI(e)
}

function RoomTabChangeTo(e) {
    var o = $("#itemSlot0,#itemSlot1,#itemSlot2,#itemSlot3,#itemSlot4,#itemSlot5,#itemDual,#itemTeleport,#roomInfo5,#roomInfo6");
    e == TAB_ALL ? ($("#room_item_buddy_tab").removeClass("Guild").removeClass("BuddyList"), $("#friendsList").hide(), $("#guildMembersList").hide(), $("#friendsListExtra").hide(), $("#guildRoomTabExtra").hide(), o.show()) : e == TAB_FRIENDS ? ($("#room_item_buddy_tab").removeClass("Guild").addClass("BuddyList"), $("#friendsList").show(), $("#guildMembersList").hide(), $("#friendsListExtra").show(), $("#guildRoomTabExtra").hide(), o.hide()) : e == TAB_GUILD && ($("#room_item_buddy_tab").addClass("Guild").removeClass("BuddyList"), $("#friendsList").hide(), $("#guildMembersList").show(), $("#friendsListExtra").hide(), $("#guildRoomTabExtra").show(), o.hide())
}

function RoomOptionsPressedOK(e) {
    o = (o = $("#RoomOptionsPlayers")).hasClass("players1v1") ? 2 : o.hasClass("players2v2") ? 4 : o.hasClass("players3v3") ? 6 : o.hasClass("players1vB") ? 1 : o.hasClass("players2vB") ? 2 : o.hasClass("players3vB") ? 3 : o.hasClass("players4vB") ? 4 : 8, t = $("#RoomOptionsMode").hasClass("gameModeNormal") ? GAME_MODE_NORMAL : $("#RoomOptionsMode").hasClass("gameModeSame") ? GAME_MODE_SAME : GAME_MODE_BOSS;
    var o, t, a = "ON" == $("#RoomOptionsAvatars").html() ? 1 : 0,
        n = Number($("#RoomOptionsWind").html()),
        r = $("#RoomOptionsS1").hasClass("grayscale"),
        s = $("#RoomOptionsTele").hasClass("grayscale"),
        d = !$("#RoomOptionsRandomTeams").hasClass("grayscale");
    e.SendRoomOptions(o, t, g_options_map, a, n, g_custom_map, r, s, d)
}

function FixRoomOptionsDialog(e) {
    var o = $("#RoomOptionsRandomTeamsLock, #RoomOptionsRandomTeamsRank");
    e < RANK_FOR_RANDOM_TEAMS ? o.show() : o.hide(), o = $("#RoomOptionsS1Lock, #RoomOptionsS1Rank"), e < RANK_FOR_DISABLE_S1 ? o.show() : o.hide(), o = $("#RoomOptionsTeleLock, #RoomOptionsTeleRank"), e < RANK_FOR_DISABLE_TELE ? o.show() : o.hide(), $("#RoomOptionsMode").hasClass("gameModeBoss") ? ($("#RoomOptionsAvatarsPrev, #RoomOptionsAvatarsNext").hide(), $("#RoomOptionsAvatars").html("ON").css("color", "#00ff00"), $("#RoomOptionsAvatarsGP").html(""), g_options_map == MAP_CUSTOM ? $("#RoomOptionsMapPrev, #RoomOptionsMapNext").show() : $("#RoomOptionsMapPrev, #RoomOptionsMapNext").hide(), g_options_map != MAP_RANDOM && g_options_map != MAP_CUSTOM && (g_options_map = MAP_RANDOM, $("#RoomOptionsMapImage").html("").css("background-position", "0 " + (-50 * g_options_map - 50) + "px"), $("#RoomOptionsMapName").html(GetMapName(g_options_map))), $("#RoomOptionsS1, #RoomOptionsTele").removeClass("grayscale"), $("#RoomOptionsRandomTeams").addClass("grayscale").html("[ ] Random Teams"), $("#RoomOptionsS1Lock, #RoomOptionsTeleLock, #RoomOptionsRandomTeamsLock").show()) : ($("#RoomOptionsAvatarsPrev, #RoomOptionsAvatarsNext").show(), $("#RoomOptionsMapPrev, #RoomOptionsMapNext").show(), 28 > g_server_version && $("#RoomOptionsS1Lock, #RoomOptionsTeleLock, #RoomOptionsRandomTeamsLock").show())
}

function RoomOptionsDialogGUI(e) {
    $("#RoomOptionsCancel").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), g_graphics_high ? $("#dialog_room_options").effect("explode") : $("#dialog_room_options").hide()
    }), $("#RoomOptionsOK").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), RoomOptionsPressedOK(e), g_graphics_high ? $("#dialog_room_options").effect("explode") : $("#dialog_room_options").hide()
    }), $("#RoomOptionsNumPlayersPrev").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var e, o = $("#RoomOptionsPlayers");
        e = $("#RoomOptionsMode").hasClass("gameModeBoss") ? o.hasClass("players1vB") ? "players4vB" : o.hasClass("players2vB") ? "players1vB" : o.hasClass("players3vB") ? "players2vB" : "players3vB" : o.hasClass("players1v1") ? "players4v4" : o.hasClass("players2v2") ? "players1v1" : o.hasClass("players3v3") ? "players2v2" : "players3v3", o.removeClass().addClass(e)
    }), $("#RoomOptionsNumPlayersNext").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var e, o = $("#RoomOptionsPlayers");
        e = $("#RoomOptionsMode").hasClass("gameModeBoss") ? o.hasClass("players1vB") ? "players2vB" : o.hasClass("players2vB") ? "players3vB" : o.hasClass("players3vB") ? "players4vB" : "players1vB" : o.hasClass("players1v1") ? "players2v2" : o.hasClass("players2v2") ? "players3v3" : o.hasClass("players3v3") ? "players4v4" : "players1v1", o.removeClass().addClass(e)
    }), $("#RoomOptionsModeNext").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var o = $("#RoomOptionsMode"),
            o = o.hasClass("gameModeNormal") ? GAME_MODE_BOSS : o.hasClass("gameModeBoss") ? GAME_MODE_SAME : GAME_MODE_NORMAL;
        RoomOptionsChangeMode(o, e.myPlayerInfo.unlock, e.myPlayerInfo.rank)
    }), $("#RoomOptionsModePrev").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var o = $("#RoomOptionsMode"),
            o = o.hasClass("gameModeNormal") ? GAME_MODE_SAME : o.hasClass("gameModeBoss") ? GAME_MODE_NORMAL : GAME_MODE_BOSS;
        RoomOptionsChangeMode(o, e.myPlayerInfo.unlock, e.myPlayerInfo.rank)
    }), $("#RoomOptionsMapPrev").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), $("#RoomOptionsMode").hasClass("gameModeBoss") ? (g_options_map = MAP_RANDOM, $("#RoomOptionsMapPrev, #RoomOptionsMapNext").hide()) : --g_options_map < MAP_RANDOM && (g_options_map = LAST_SELECTABLE_MAP), $("#RoomOptionsMapImage").html("").css("background-position", "0 " + (-50 * g_options_map - 50) + "px"), $("#RoomOptionsMapName").html(GetMapName(g_options_map))
    }), $("#RoomOptionsMapNext").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), $("#RoomOptionsMode").hasClass("gameModeBoss") ? (g_options_map = MAP_RANDOM, $("#RoomOptionsMapPrev, #RoomOptionsMapNext").hide()) : ++g_options_map > LAST_SELECTABLE_MAP && (g_options_map = MAP_RANDOM), $("#RoomOptionsMapImage").html("").css("background-position", "0 " + (-50 * g_options_map - 50) + "px"), $("#RoomOptionsMapName").html(GetMapName(g_options_map))
    }), $("#RoomOptionsAvatarsPrev, #RoomOptionsAvatarsNext").click(function() {
        if (!$("#RoomOptionsMode").hasClass("gameModeBoss")) {
            AudioPlay(AUDIO_BUTTON_SELECT2);
            var e = $("#RoomOptionsAvatars");
            "OFF" == e.html() ? (e.html("ON").css("color", "#00ff00"), $("#RoomOptionsAvatarsGP").html("+10% GP")) : (e.html("OFF").css("color", "#ff0000"), $("#RoomOptionsAvatarsGP").html(""))
        }
    }), $("#RoomOptionsWindNext").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var e, o = $("#RoomOptionsWind"),
            t = Number(o.html());
        0 == t ? (t = 12, e = 5) : 12 == t ? (t = 26, e = 10) : 26 == t ? (t = 50, e = 15) : e = t = 0, o.html(t).css("color", 0 == t ? "#ff0000" : "#00ff00"), $("#RoomOptionsWindGP").html(0 == e ? "" : "+" + e + "% GP")
    }), $("#RoomOptionsWindPrev").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var e, o = $("#RoomOptionsWind"),
            t = Number(o.html());
        0 == t ? (t = 50, e = 15) : 50 == t ? (t = 26, e = 10) : 26 == t ? (t = 12, e = 5) : e = t = 0, o.html(t).css("color", 0 == t ? "#ff0000" : "#00ff00"), $("#RoomOptionsWindGP").html(0 == e ? "" : "+" + e + "% GP")
    }), $("#RoomOptionsTele").click(function() {
        if (28 > g_server_version) alertify.alert(l.t("This server does not support this feature yet.<br>For now you can try it on Server 13 at DragonBound Global."));
        else {
            var o = $(this);
            o.hasClass("grayscale") ? o.removeClass("grayscale") : !$("#RoomOptionsMode").hasClass("gameModeBoss") && e.myPlayerInfo.rank >= RANK_FOR_DISABLE_TELE && o.addClass("grayscale")
        }
    }), $("#RoomOptionsS1").click(function() {
        if (28 > g_server_version) alertify.alert(l.t("This server does not support this feature yet.<br>For now you can try it on Server 13 at DragonBound Global."));
        else {
            var o = $(this);
            o.hasClass("grayscale") ? o.removeClass("grayscale") : !$("#RoomOptionsMode").hasClass("gameModeBoss") && e.myPlayerInfo.rank >= RANK_FOR_DISABLE_S1 && o.addClass("grayscale")
        }
    }), $("#RoomOptionsRandomTeams").click(function() {
        if (28 > g_server_version) alertify.alert(l.t("This server does not support this feature yet.<br>For now you can try it on Server 13 at DragonBound Global."));
        else {
            var o = $(this);
            o.hasClass("grayscale") && !$("#RoomOptionsMode").hasClass("gameModeBoss") && e.myPlayerInfo.rank >= RANK_FOR_RANDOM_TEAMS ? o.removeClass("grayscale").html("[X] Random Teams") : o.addClass("grayscale").html("[ ] Random Teams")
        }
    }), DragonMapCreator()
}

function RoomOptionsChangeMode(e, o, t) {
    var a, n, r, s = $("#RoomOptionsMode"),
        d = $("#RoomOptionsPlayers");
    e == GAME_MODE_BOSS ? (n = "gameModeBoss", r = d.hasClass("players1v1") ? "players1vB" : d.hasClass("players2v2") ? "players2vB" : d.hasClass("players3v3") ? "players3vB" : "players4vB") : (n = e == GAME_MODE_SAME ? "gameModeSame" : "gameModeNormal", r = d.hasClass("players1v1") ? "players1v1" : d.hasClass("players2v2") ? "players2v2" : d.hasClass("players3v3") ? "players3v3" : d.hasClass("players1vB") ? "players1v1" : d.hasClass("players2vB") ? "players2v2" : d.hasClass("players3vB") ? "players3v3" : "players4v4", "ON" == $("#RoomOptionsAvatars").html() && $("#RoomOptionsAvatarsGP").html("+10% GP")), s.removeClass().addClass(n), d.removeClass().addClass(r), $("#RoomOptionsModeIcon").removeClass().addClass("iconMode" + n.slice(8)), "gameModeNormal" == n && 1 > o ? ($("#RoomOptionsModeLocked").show(), $("#RoomOptionsMessage").html(l.t("This mode is locked until you win at BOSS mode as room master.")), $("#RoomOptionsOK").hide()) : "gameModeSame" == n && 12 > o ? ($("#RoomOptionsModeLocked").show(), $("#RoomOptionsMessage").html(l.t("This mode is locked until you win *ALL* BOSS mode levels as room master.")), $("#RoomOptionsOK").hide()) : ($("#RoomOptionsModeLocked").hide(), $("#RoomOptionsOK").show(), e == GAME_MODE_NORMAL ? a = l.t("Kill the other team to win.") : e == GAME_MODE_BOSS ? a = l.t("Fight computer players at increasing difficulty.") : e == GAME_MODE_SAME && (a = l.t("Everyone use the same mobile as the room master.")), $("#RoomOptionsMessage").html(a)), FixRoomOptionsDialog(t)
}

function InfoDialogOpenFor(e, o) {
    $("#infoChat").attr("user_id", e), $("#infoAddBuddy").attr("user_id", e), $("#infoGuildInvite").attr("user_id", e), $("#infoName").html(""), $("#infoRanking").html(""), $("#infoGP").html(""), $("#infoDamage").html(""), $("#infoWinRate").html(""), $("#infoGender").html(""), $("#infoImage").attr("src", ""), $("#infoRank").removeClass().addClass("rank rank25"), $("#infoLoading").show(), FadeInDialog("playerInfoDialog"), o.SendGetPlayerInfo(e)
}
var INFO_INDEX_USER_ID = 0,
    INFO_INDEX_GAME_ID = 1,
    INFO_INDEX_RANKING = 2,
    INFO_INDEX_RANK = 3,
    INFO_INDEX_GP = 4,
    INFO_INDEX_GENDER = 5,
    INFO_INDEX_FACEBOOK_ID = 6,
    INFO_INDEX_DAMAGE = 7,
    INFO_INDEX_WINRATE = 8,
    INFO_INDEX_WIN = 9,
    INFO_INDEX_LOSE = 10,
    INFO_INDEX_GUILD = 11,
    INFO_INDEX_GUILD_JOB = 12;

function InfoDialogReceiveInfo(e) {
    var o = e[INFO_INDEX_GENDER];
    $("#infoLoading").hide(), $("#infoName").html(e[INFO_INDEX_GAME_ID]), $("#infoRanking").html(e[INFO_INDEX_RANKING]), $("#infoGP").html(e[INFO_INDEX_GP]), $("#infoDamage").html(e[INFO_INDEX_DAMAGE]), $("#infoWinRate").html(e[INFO_INDEX_WINRATE]), $("#infoGender").html(o == GENDER_MALE ? l.t("Male") : l.t("Female")), $("#infoRank").removeClass().addClass("rank rank" + e[INFO_INDEX_RANK]), $("#infoWin").html(e[INFO_INDEX_WIN]), $("#infoLose").html(e[INFO_INDEX_LOSE]), $("#infoGuild").html(e[INFO_INDEX_GUILD]);
    var t = "";
    e[INFO_INDEX_GUILD] && (0 == e[INFO_INDEX_GUILD_JOB] ? t = l.t("Member") : 1 == e[INFO_INDEX_GUILD_JOB] ? t = l.t("Leader") : 2 == e[INFO_INDEX_GUILD_JOB] && (t = l.t("Semi-Leader"))), $("#infoGuildJob").html(t), e = "" == (e = e[INFO_INDEX_FACEBOOK_ID]) ? o == GENDER_FEMALE ? STATIC_DIR + "images/fb_girl.gif" : STATIC_DIR + "images/fb_boy.gif" : "http://graph.facebook.com/" + e + "/picture?type=large", $("#infoImage").attr("src", e)
}

function OpenBotSelectDialog(e, o) {
    var t = o.myPlayerInfo.unlock;
    g_bot_select_for_slot = e;
    for (var a, n, r, s, d, u, _, c = $("#select_bot_div"), h = "", p = 0; p < COMPUTER_PLAYER.length; p++) _ = COMPUTER_PLAYER[p], p <= t ? (a = _.rank, n = _.name, r = _.gp, s = _.atk, d = _.def, u = _.life, _ = _.dig) : (a = 25, n = "???", r = _.gp, s = d = u = _ = "??"), h += '<div class="bs_line" id=' + p + '> <div class="bs_rank rank rank' + a + '"></div> <div class="bs_name">' + n + '</div> <div class="bs_gp">GP:' + r + "</div>", h += '<div class="bs_atk_icon  stat_icon stat_icon_atk"></div> <div class="bs_atk">' + s + '</div><div class="bs_def_icon  stat_icon stat_icon_def"></div> <div class="bs_def">' + d + '</div><div class="bs_life_icon stat_icon stat_icon_life"></div><div class="bs_life">' + u + '</div><div class="bs_dig_icon  stat_icon stat_icon_dig"></div> <div class="bs_dig">' + _ + "</div></div>";
    c.html(h), $(".bs_line").click(function() {
        var t = $(this).attr("id");
        o.SendSelectBot(e, t), $("#select_bot_div").slideUp(g_graphics_high ? "slow" : 0), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), c.slideDown(g_graphics_high ? "slow" : 0)
}

function AutoReadyStartTimer(e) {
    CheckBrowserAbilities(!1) && (AutoReadyStop(), g_auto_ready_timer = setTimeout(function() {
        $("#roomButtonStart").is(":visible") || !1 != e.myPlayerInfo.is_ready || e.game || e.SendRoomChangeReady(!0)
    }, 12500))
}

function AutoReadyStop() {
    g_auto_ready_timer = clearTimeout(g_auto_ready_timer)
}

function MasterTimerTick() {
    var e = Number($("#room_timer_text").html());
    0 == e ? g_room_timer_interval = clearInterval(g_room_timer_interval) : $("#room_timer_text").html(e - 1)
}

function MasterTimer(e) {
    0 == e ? ($("#room_timer").fadeOut("slow"), $("#room_timer_text").html("0")) : ($("#room_timer_text").html(e), $("#room_timer").fadeIn("slow"), g_room_timer_interval = setInterval("MasterTimerTick()", 1e3))
}
var E_ROOM_STATE_INDEX = Object.freeze({
    number: 0,
    title: 1,
    password: 2,
    max_players: 3,
    game_mode: 4,
    room_map: 5,
    is_avatars_on: 6,
    max_wind: 7,
    gp_rate: 8,
    minimap: 9,
    is_s1_disabled: 10,
    is_tele_disabled: 11,
    is_random_teams: 12
});

function RoomUpdate(e, o) {
    $("#roomNumber").html(o[E_ROOM_STATE_INDEX.number]);
    var t, a = o[E_ROOM_STATE_INDEX.title],
        n = o[E_ROOM_STATE_INDEX.password],
        a = text_filter(a, filtered_words);
    $("#room_change_title_input").val(a), n && (a += " (" + n + ")"), $("#roomTitle").html(a);
    var r, a = o[E_ROOM_STATE_INDEX.game_mode];
    a == GAME_MODE_NORMAL ? r = "gameModeNormal" : a == GAME_MODE_BOSS ? r = "gameModeBoss" : a == GAME_MODE_SAME && (r = "gameModeSame"), $("#room_game_mode").removeClass().addClass(r), RoomOptionsChangeMode(a, e.myPlayerInfo.unlock, e.myPlayerInfo.rank), r = o[E_ROOM_STATE_INDEX.max_players], a != GAME_MODE_BOSS ? (2 == r ? t = "players1v1" : 4 == r ? t = "players2v2" : 6 == r ? t = "players3v3" : 8 == r && (t = "players4v4"), g_can_change_team ? $("#roomButtonChangeTeam").show() : $("#roomButtonChangeTeam").hide(), g_max_players = r) : (1 == r ? t = "players1vB" : 2 == r ? t = "players2vB" : 3 == r ? t = "players3vB" : 4 == r && (t = "players4vB"), $("#roomButtonChangeTeam").hide(), g_max_players = 2 * r), !$("#room_game_mode").hasClass("gameModeSame") && g_can_change_mobile && $("#roomButtonMobile").show(), g_game_mode = a, $("#room_players").removeClass().addClass(t), $("#RoomOptionsPlayers").removeClass().addClass(t), t = o[E_ROOM_STATE_INDEX.room_map], $("#room_map").html("").css("background-position", "0 " + (-50 * t - 50) + "px"), $("#RoomOptionsMapImage").html("").css("background-position", "0 " + (-50 * t - 50) + "px"), $("#RoomOptionsMapName").html(GetMapName(t)), g_options_map = t, r = o[E_ROOM_STATE_INDEX.is_avatars_on], $("#room_avatars").css("color", r ? "#00ff00" : "#ff0000").html(r ? l.t("ON") : l.t("OFF")), $("#RoomOptionsAvatars").css("color", r ? "#00ff00" : "#ff0000").html(r ? l.t("ON") : l.t("OFF")), $("#RoomOptionsAvatarsGP").html(a != GAME_MODE_BOSS && r ? "+10% GP" : ""), a = o[E_ROOM_STATE_INDEX.max_wind], $("#room_wind").css("color", 0 == a ? "#ff0000" : "#00ff00").html(a), $("#RoomOptionsWind").css("color", 0 == a ? "#ff0000" : "#00ff00").html(a), a = 12 == a ? 5 : 26 == a ? 10 : 50 == a ? 15 : 0, $("#RoomOptionsWindGP").html(a ? "+" + a + "% GP" : ""), a = o[E_ROOM_STATE_INDEX.gp_rate], $("#gp_rate").html(a + 100 + "%"), t == MAP_CUSTOM && (g_custom_map = void 0, a = BooleanArrayToCanvas(t = DragonDecompress(o[E_ROOM_STATE_INDEX.minimap]), 213, 49, 213, 49), t = BooleanArrayToCanvas(t, 213, 49, 213, 49), $("#room_map").html("").css({
        "background-position": "999px 999px"
    }).append(a), $("#RoomOptionsMapImage").html("").css({
        "background-position": "999px 999px"
    }).append(t), $("#RoomOptionsMapName").html("Custom")), o[E_ROOM_STATE_INDEX.is_s1_disabled] ? ($("#RoomS1Disabled").show(), $("#RoomOptionsS1").addClass("grayscale")) : ($("#RoomS1Disabled").hide(), $("#RoomOptionsS1").removeClass("grayscale")), o[E_ROOM_STATE_INDEX.is_tele_disabled] ? ($("#itemTeleport, #RoomOptionsTele").addClass("grayscale"), RemoveItemsOfType(ITEM_TELEPORT) && e.SendRoomChangeReady(!1)) : $("#itemTeleport, #RoomOptionsTele").removeClass("grayscale"), o[E_ROOM_STATE_INDEX.is_random_teams] ? ($("#RoomRandomTeams").show(), $("#RoomOptionsRandomTeams").removeClass("grayscale").html("[X] Random Teams")) : ($("#RoomRandomTeams").hide(), $("#RoomOptionsRandomTeams").addClass("grayscale").html("[ ] Random Teams"))
}
var g_room_slot_graphic2 = [];

function RoomRemoveAnimations() {
    for (var e = 0; e < g_room_slot_graphic2.length; e++) g_room_slot_graphic2[e] && g_room_slot_graphic2[e].remove();
    g_room_slot_graphic2 = []
}

function RoomUpdateWorthGP(e, o, t, a) {
    $("#gp_team_a").html("<u>" + l.t("Team") + " A</u><br>" + e + " GP<br>" + t + "G"), $("#gp_team_b").html("<u>" + l.t("Team") + " B</u><br>" + o + " GP<br>" + a + "G")
}
var MY_AVATARS_HEAD = 0,
    MY_AVATARS_BODY = 1,
    MY_AVATARS_EYES = 2,
    MY_AVATARS_FLAG = 3,
    MY_AVATARS_BACKGROUND = 4,
    MY_AVATARS_FOREGROUND = 5,
    GP_TO_GOLD_RATE = 100,
    g_room_players_slots = [],
    g_no_winning_bonus_for = [];

function RoomPlayerSlotsFullUpdate(e, o) {
    var t = e[0],
        a = e[1];
    for (g_no_winning_bonus_for = e[2], RoomUpdateWorthGP(t, a, t * GP_TO_GOLD_RATE, a * GP_TO_GOLD_RATE), g_room_players_slots = [], t = 3; t < e.length - 10; t += 12) g_room_players_slots[a = e[t]] = {
        user_id: e[t + 1],
        game_id: e[t + 2],
        rank: e[t + 3],
        guild: e[t + 4],
        is_master: 1 == e[t + 5],
        is_ready: 1 == e[t + 6],
        gender: e[t + 7],
        mobile: e[t + 8],
        avatars: e[t + 9],
        is_bot: e[t + 10],
        power_user: e[t + 11],
        team: 0 == a % 2 ? "A" : "B"
    };
    RoomPlayerUpdateGUI(o)
}

function SlotUpdate(e, o) {
    var t = e[0],
        a = e[1];
    g_no_winning_bonus_for = e[2], RoomUpdateWorthGP(t, a, t * GP_TO_GOLD_RATE, a * GP_TO_GOLD_RATE), g_room_players_slots[t = e[3]] = {
        user_id: e[4],
        game_id: e[5],
        rank: e[6],
        guild: e[7],
        is_master: 1 == e[8],
        is_ready: 1 == e[9],
        gender: e[10],
        mobile: e[11],
        avatars: e[12],
        is_bot: e[13],
        power_user: e[14],
        team: 0 == t % 2 ? "A" : "B"
    }, RoomPlayerUpdateGUI(o)
}

function GetSlotFromUserID(e) {
    var o, t, a = g_room_players_slots.length;
    for (o = 0; o < a; o++)
        if ((t = g_room_players_slots[o]) && t.user_id == e) return o
}

function DeleteSlot(e) {
    for (; g_room_players_slots[e];) g_room_players_slots[e] = g_room_players_slots[e + 2], e += 2
}

function ClearSlot(e, o, t) {
    g_no_winning_bonus_for = t, DeleteSlot(GetSlotFromUserID(e)), RoomPlayerUpdateGUI(o)
}

function PassMasterTo(e, o) {
    var t, a, n = g_room_players_slots.length;
    for (t = 0; t < n; t++)(a = g_room_players_slots[t]) && (a.is_master = a.user_id == e);
    RoomPlayerUpdateGUI(o)
}
var g_can_change_team = !0,
    g_can_change_mobile = !0;

function RoomPlayerUpdateGUI(e) {
    $("#roomButtonReady").hide(), $("#roomButtonStart").hide();
    var o, t = 0,
        a = 0,
        n = 0,
        r = g_room_players_slots.length;
    g_can_change_team = g_can_change_mobile = !1, 8 > r && (r = 8);
    for (var s = 0; s < r; s++) {
        o = g_room_players_slots[s];
        var d = "#playerInRoom" + s,
            u = $(d),
            _ = g_room_slot_graphic2[s];
        if (o) {
            0 == s % 2 ? a++ : n++;
            var c = !o.avatars[MY_AVATARS_BACKGROUND] && o.power_user ? POWER_USER_BACKGROUND : o.avatars[MY_AVATARS_BACKGROUND];
            if (_ ? (_.change_mobile(o.mobile), _.change(o.avatars[MY_AVATARS_HEAD], AVATAR_TYPE_HEAD), _.change(o.avatars[MY_AVATARS_BODY], AVATAR_TYPE_BODY), _.change(o.avatars[MY_AVATARS_EYES], AVATAR_TYPE_EYES), _.change(o.avatars[MY_AVATARS_FLAG], AVATAR_TYPE_FLAG), _.change(c, AVATAR_TYPE_BACKGROUND), _.change(o.avatars[MY_AVATARS_FOREGROUND], AVATAR_TYPE_FOREGROUND)) : g_room_slot_graphic2[s] = new CPlayerGraphic(d + " .roomPlayerMobile", o.mobile, o.avatars[MY_AVATARS_HEAD], o.avatars[MY_AVATARS_BODY], o.avatars[MY_AVATARS_EYES], o.avatars[MY_AVATARS_FLAG], "A" == o.team, c, o.avatars[MY_AVATARS_FOREGROUND]), u.children(".roomPlayerRank").removeClass().addClass("roomPlayerRank rank rank" + o.rank), u.children(".roomPlayerName").html(BuildPlayerNameWithGuild(o.guild, o.game_id)), o.user_id == e.user_id) {
                if (u.children(".roomPlayerMyself").show(), e.is_ready = o.is_ready, e.team = o.team, e.mobile = o.mobile, e.is_master = o.is_master, g_can_change_team = g_can_change_mobile = !0, o.is_master ? ($("#roomButtonStart").show(), $("#roomButtonReady").hide()) : ($("#roomButtonReady").show(), $("#roomButtonStart").hide()), $("#mobile_info").removeClass().addClass("mobile_info" + o.mobile), _ = !0, (d = g_no_winning_bonus_for) && d.length) {
                    for (c = 0; c < d.length; c += 2)
                        if (s == d[c]) {
                            s % 2 ? $("#gp_team_a").html("<u>" + l.t("Team") + " A</u><br>XXX") : $("#gp_team_b").html("<u>" + l.t("Team") + " B</u><br>XXX"), -1 == d[c + 1] ? $("#no_win_bonus").html(o.game_id + " -> Computer Players<br><br>" + l.t("If you win you will not get winning bonus because you already won this player many times today.<br>Play for fun, play with others, or continue tomorrow.")).show() : g_room_players_slots[d[c + 1]] && $("#no_win_bonus").html(o.game_id + " -> " + g_room_players_slots[d[c + 1]].game_id + "<br><br>" + l.t("If you win you will not get winning bonus because you already won this player many times today.<br>Play for fun, play with others, or continue tomorrow.")).show(), _ = !1;
                            break
                        }
                }
                _ && $("#no_win_bonus").html("").hide()
            } else u.children(".roomPlayerMyself").hide();
            o.is_master ? (u.children(".roomPlayerNotReady").hide(), u.children(".roomPlayerReady").hide(), u.children(".roomPlayerMaster").show()) : (u.children(".roomPlayerMaster").hide(), o.is_ready ? (u.children(".roomPlayerNotReady").hide(), u.children(".roomPlayerReady").show()) : (u.children(".roomPlayerNotReady").show(), u.children(".roomPlayerReady").hide())), o.is_bot ? (e.is_master && u.children(".roomBotSelect").show(), u.children(".roomPlayerInfo").hide(), t++) : (u.children(".roomBotSelect").hide(), u.children(".roomPlayerInfo").attr("user_id", o.user_id).show()), u.show()
        } else u.children(".roomPlayerBalloon, .roomPlayerBalloonTip").removeClass("text_anim"), u.children(".roomPlayerName").html(""), u.hide(), _ && (_.remove(), g_room_slot_graphic2[s] = void 0)
    }
    for ($("#add_bot_button").hide(), $("#room_game_mode").hasClass("gameModeBoss") && e.is_master ? 2 <= t ? ($(".roomBotRemove").show(), $(".roomBotSelect").hide()) : ($(".roomBotRemove").hide(), $(".roomBotSelect").show()) : ($(".roomBotSelect").hide(), $(".roomBotRemove").hide()), $("#room_game_mode").hasClass("gameModeSame") && !e.is_master && (g_can_change_mobile = !1), $("#room_game_mode").hasClass("gameModeBoss") && (g_can_change_team = !1), g_can_change_mobile ? $("#roomButtonMobile").show() : $("#roomButtonMobile").hide(), g_can_change_team ? $("#roomButtonChangeTeam").show() : $("#roomButtonChangeTeam").hide(), a = Math.max(a, Math.floor(g_max_players / 2)), g_game_mode == GAME_MODE_BOSS ? 4 > n && n++ : n = Math.max(n, Math.floor(g_max_players / 2)), debug && console.log("Slots Per Team:", a, n), t = DragonTheme_GetValue("room_bg"), s = 0; s < r; s++) o = g_room_players_slots[s], u = $(d = "#playerInRoom" + s), d = 0 == s % 2 ? a : n, _ = (t && "." != t ? 113 : 257 - 48 * (Math.floor(d) - 1)) + 97 * Math.floor(s / 2), u.css("top", _), (u = $("#vortex" + s)).css("top", _ - 50), o ? u.hide() : (Math.floor(s / 2) < d ? u.show() : u.hide(), g_game_mode == GAME_MODE_BOSS && s == 2 * n - 1 && 0 < e.unlock && ($("#add_bot_button").css("top", _ + 40).show(), g_add_bot_to_slot = s))
}

function VortexStart() {
    g_vortex_start = get_time(), clearInterval(g_vortex_interval), g_vortex_interval = setInterval(function() {
        var e = (get_time() - g_vortex_start) / 8e3 * Math.PI;
        $(".vortex").css({
            scaleY: .35,
            rotate: e
        })
    }, 30)
}

function VortexStop() {
    g_vortex_interval = clearInterval(g_vortex_interval)
}

function ChangedMobile(e, o, t) {
    for (var a, n = g_room_players_slots.length, r = 0; r < n; r++)(a = g_room_players_slots[r]) && (-1 == e || a.user_id == e) && (a.mobile = o, g_room_slot_graphic2[r].change_mobile(o), a.user_id == t.user_id && (t.mobile = o, $("#mobile_info").removeClass().addClass("mobile_info" + o)))
}

function ChangedTeam(e, o, t, a) {
    g_no_winning_bonus_for = a;
    for (var n, r = g_room_players_slots.length, a = 0; a < r && !((n = g_room_players_slots[a]) && n.user_id == e); a++);
    if (!(a >= r) && a % 2 == ("A" == o)) {
        for (e = g_room_players_slots[a]; g_room_players_slots[a];) g_room_players_slots[a] = g_room_players_slots[a + 2], a += 2;
        for (a = "A" == o ? 0 : 1; g_room_players_slots[a];) a += 2;
        g_room_players_slots[a] = e, e.team = o, RoomPlayerUpdateGUI(t)
    }
}

function ChangedReady(e, o, t) {
    var a, n, r = g_room_players_slots.length;
    for (a = 0; a < r && !((n = g_room_players_slots[a]) && n.user_id == e); a++);
    a != r && (n.is_ready = o, RoomPlayerUpdateGUI(t))
}

function CheckBrowserAbilities(e) {
    return void 0 != document.getElementById("ground_canvas").getContext || (e && DragonDialogOpen(l.t("Old Browser"), l.t("Your browser is too old.<br>It does not have required features to run the game.") + "<br><br>" + l.t('Please change to <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>'), 1), !1)
}

function RoomSelectItem(e) {
    var o, t = ITEM_SIZE[e];
    for (o = 0; o <= 6 - t && !(g_items[o] == ITEM_NONE && (1 == t || g_items[o + 1] == ITEM_NONE)); o++) g_items[o] != ITEM_NONE && 1 < ITEM_SIZE[g_items[o]] && o++;
    o <= 6 - t && (g_items[o] = e, $("#itemSlot" + o).removeClass().addClass(ITEM_CLASS[e]))
}

function RoomRemoveItemFromSlot(e) {
    g_items[e] != ITEM_NONE && (g_items[e] = ITEM_NONE, $("#itemSlot" + e).removeClass().addClass("itemNone"))
}

function GameSetItems(e) {
    for (var o = 0; o < e.length; o++) {
        var t = $("#gameItemSlot" + o);
        t.removeClass(), e[o] != ITEM_NONE && (t.addClass("item").addClass(ITEM_CLASS[e[o]]), 2 == ITEM_SIZE[e[o]] && t.addClass("big"))
    }
}

function RemoveItemsOfType(e) {
    for (var o = !1, t = 0; 6 > t; t++) g_items[t] == e && (RoomRemoveItemFromSlot(t), o = !0);
    return o
}

function DragonMapCreator() {
    void 0 === window.FileReader ? debug && console.log("FileReader Unsupported") : $("#RoomOptionsMapImage").bind("dragenter dragover", function() {
        return $(this).css("box-shadow", "yellow 0px 0px 50px 50px"), !1
    }).bind("dragend dragleave", function() {
        return $(this).css("box-shadow", ""), !1
    }).bind("drop", function(e) {
        if ((e = e.originalEvent).preventDefault(), $(this).css("box-shadow", ""), 27 > g_server_version) alertify.alert("This server does not support custom maps yet. Try it on Server 13 on DB-Global.");
        else {
            var e = e.dataTransfer.files[0],
                o = new FileReader;
            return o.onload = function(e) {
                DragonMapCreator_GotPNG(e.target.result)
            }, o.readAsDataURL(e), !1
        }
    })
}

function DragonMapCreator_GotPNG(e) {
    var o = new Image;
    o.onload = function() {
        var e = o.width,
            t = o.height;
        if (400 > e || 400 > t || 2e3 < e || 2e3 < t) alertify.alert("Image size need to be: 400x400-2000x2000 (We got " + e + "x" + t + ")");
        else {
            var a = document.createElement("canvas");
            a.width = e, a.height = t, (a = a.getContext("2d")).drawImage(this, 0, 0);
            for (var a = a.getImageData(0, 0, e, t), a = ImageDataToBooleanArray2(a), n = 0, r = 0; r < a.length && !a[r]; r++) n++;
            for (0 < (n = Math.floor(n / e)) && (a = a.slice(n * e), t -= n), n = 0, r = a.length; 0 < r && !a[r]; r--) n++;
            0 < (n = Math.floor(n / e)) && (a = a.slice(0, -n * e), t -= n);
            var s = DragonCompress(a);
            if (5e4 < s.length) alertify.alert("File size is too big. Please decrease the file size.");
            else {
                for (var d = 0, u = 0, r = 0; r < a.length; r++) a[r] ? u++ : d++;
                20 > (r = 100 * u / (o.width * o.height)) ? alertify.alert("This map has " + Math.floor(r) + "% ground. Please add more ground pixels. (at least 20% ground is needed)") : (a = BooleanArrayToCanvas(a, e, t, 213, 49), $("#RoomOptionsMapImage").html("").css({
                    "background-position": "999px 999px"
                }).append(a), $("#RoomOptionsMapName").html("Custom"), $("#RoomOptionsMapPrev, #RoomOptionsMapNext").show(), a = Math.max(e, t, 800), g_custom_map = [e, t, a, (a - e) / 2, a - t - n, s], g_options_map = MAP_CUSTOM)
            }
        }
    }, o.onerror = o.onabort = function() {
        alertify.alert("Error loading image, try a different file.")
    }, g_custom_map = void 0, o.src = e
}

function BooleanArrayToCanvas(e, o, t, a, n) {
    var r = document.createElement("canvas");
    r.width = a, r.height = n;
    for (var s = r.getContext("2d"), d = s.getImageData(0, 0, a, n), u = d.data, _ = "string" != typeof e || "1", c = 0; c < n; c++)
        for (var h = 0; h < a; h++) {
            var p = 4 * (c * a + h);
            u[p] = u[p + 1] = u[p + 2] = 0, u[p + 3] = e[Math.floor(c * t / n) * o + Math.floor(h * o / a)] == _ ? 255 : 0
        }
    return s.putImageData(d, 0, 0), r
}

function base62_encode(e, o, t) {
    for (o = "", e = e !== +e || e % 1 ? -1 : e; 0 <= e; e = Math.floor(e / 62) || -1) o = String.fromCharCode((9 < (t = e % 62) ? 35 < t ? 29 : 87 : 48) + t) + o;
    return o
}

function DragonCompress2(e) {
    var o, t, a = "";
    for (o = 0; o < e.length; o++) {
        if (14776336 <= (t = e[o])) throw Error("Number too high: " + t);
        238328 <= t ? a += "-" : 3844 <= t ? a += "+" : 62 > t && (a += "0"), a += base62_encode(t)
    }
    return a
}

function DragonCompress(e) {
    var o, t = e.length,
        a = 0,
        n = [],
        r = !1;
    for (o = 0; o < t; o++) !!Number(e[o]) == r ? a++ : (n.push(a), a = 1, r = !r);
    return a && n.push(a), DragonCompress2(n)
}
var g_room_timer_interval, g_vortex_start, g_vortex_interval, ranks_cache, rankings_cache = [{}, {}, {}],
    RANKING_CACHE_TIME = 6e5,
    RANKING_PAGE_SIZE = 30,
    ranks_cache_expire = 0;

function RankingGUI(e) {
    $("#ranking_btn_type1").click(function() {
        LoadRanking(1, 1, e)
    }), $("#ranking_btn_type2").click(function() {
        LoadRanking(2, 1, e)
    }), $("#ranking_btn_ranks").click(function() {
        LoadRanks()
    }), $("#ranking_btn_howto").click(function() {
        HowToPlay()
    }), $("#ranking_btn_contact").click(function() {
        ShowContact()
    }), $("#ranking_btn_terms").click(function() {
        ShowTerms()
    }), $("#ranking_btn_privacy").click(function() {
        ShowPrivacy()
    }), "br" == SERVER_TYPE ? LoadRanking(1, 1, e) : HowToPlay()
}

function RankingReClick() {
    $("#ranking_btn_ranks").hasClass("selected") ? LoadRanks() : $("#ranking_btn_howto").hasClass("selected") ? HowToPlay() : $("#ranking_btn_contact").hasClass("selected") && ShowContact()
}

function LoadRanks() {
    if ($(".ranking_btn").removeClass("selected"), $("#ranking_btn_ranks").addClass("selected"), !g_is_ranking_loading) {
        var e = get_time();
        if (ranks_cache && e < ranks_cache_expire) return debug && console.log("from cache"), DragonRankings_BuildRanks(ranks_cache);
        var o = location.origin + "/i";
        g_is_ranking_loading = !0, debug && t0(), $.get(o, function(o) {
            debug && t1("[DragonRankings] Ranks Query Time"), g_is_ranking_loading = !1, debug && console.log("Got Ranks:", o), 4 != o.length ? console.error("Bad ranks data", o) : (ranks_cache = o, ranks_cache_expire = e + RANKING_CACHE_TIME, DragonRankings_BuildRanks(o))
        }, "json").error(function() {
            g_is_ranking_loading = !1, alertify.log("Can't load ranks, try again later")
        })
    }
}

function DragonRankings_BuildRanks(e) {
    var o, t, a, n = new Date(e[0]).toString(),
        r = e[1],
        s = e[2],
        e = e[3],
        n = '<div style="text-align: center; font-weight: bold;">' + l.t("Last Update") + ':</div><div style="text-align: center;">' + n + '</div><br><table width=100%><tr style="font-weight: bold;"><td><strong>' + l.t("Rank") + '</strong></td><td style="text-align: center;">GP</td><td style="text-align: center;">' + l.t("Rule") + '<td style="text-align: center;"># ' + l.t("Players") + "</td></tr>";
    for (o = 23; - 1 <= o; o--) a = 23 == (t = -1 == o ? 24 : o) ? l.t("Top 1") : 22 == t ? l.t("Next 4") : 21 == t ? l.t("Next 16") : 20 >= t && 12 <= t ? e[t - 12] + "%" : 11 == t ? "100%" : 24 == t ? "GM / Admin" : "-", n += '<tr><td><div class="rank rank' + t + '"></div></td><td style="text-align: center;">' + (r[t - 1] ? r[t - 1] : "-") + '</td><td style="text-align: center;">' + a + '</td><td style="text-align: center;">' + (s[t] ? s[t] : "-") + "</td></tr>";
    $("#ranking_data").html(n + "</table>")
}

function HowToPlay() {
    $(".ranking_btn").removeClass("selected"), $("#ranking_btn_howto").addClass("selected");
    var e = '<div class="howto1">' + l.t("Lobby Screen") + '</div>        <div class="howto4">' + l.t("Join a game, chat or shop") + '</div>        <div class="howto3"><span class="howto2">' + l.t("Quick Play") + "</span> - " + l.t("Join to an available game room") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Create") + "</span> - " + l.t("Create your own game room") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Shop") + "</span> - " + l.t("Buy and use avatars (items)") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("My Info") + "</span> - " + l.t("Change Name & Photo") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Options") + "</span> - " + l.t("Music / Sound / Graphics") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Rooms List") + "</span> - " + l.t('Click on a "Waiting" room to join to a game') + '.</div>        <br>        <div class="howto1">' + l.t("Room Screen") + '</div>        <div class="howto4">' + l.t('When all players are "Ready" the room master can start a game') + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Ready Button") + "</span> - " + l.t("To ready") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Start") + "</span> - " + l.t("For room master to start a game") + '.</div>        <br>        <div class="howto1">' + l.t("Game Screen") + '</div>        <div class="howto4">' + l.t("You have to kill the other team to win. Shoot in your turn") + '.</div><br>        <div class="howto3"><span class="howto2">' + l.t("Up/Down") + "</span> - " + l.t("Change angle") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Left/Right") + "</span> - " + l.t("Walk (on your turn)") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Space") + "</span> - " + l.t("Shoot. Hold down for more power") + ".</div>";
    $("#ranking_data").html(e)
}

function LoadRanking(e, o, t) {
    if (!(1 != e && 2 != e) && ($(".ranking_btn").removeClass("selected"), $("#ranking_btn_type" + e).addClass("selected"), !g_is_ranking_loading)) {
        if (isNaN(o) || (o = o - o % RANKING_PAGE_SIZE + 1), rankings_cache[e][o] && get_time() < rankings_cache[e][o].x) debug && console.log("[DragonRankings] From Cache:", o), DragonRankings_BuildPage(rankings_cache[e][o].d, e, t, o);
        else {
            var a = location.origin + "/r.php";
            debug && console.log("[DragonRankings] Asking For:", o), debug && t0(), g_is_ranking_loading = !0, $.get(a, {
                s: o
            }, function(a) {
                g_is_ranking_loading = !1, debug && t1("[DragonRankings] Rankings Query Time");
                var n = a.length;
                1 > n ? alertify.log("No ranking data received") : 1 == n && 0 == a[0] ? alertify.log("Player not found on rankings.") : 1 != a[0] ? alertify.log("Wrong rankings version. Please update your client.") : (n = a[1], rankings_cache[e][n] = {
                    x: get_time() + RANKING_CACHE_TIME,
                    d: a
                }, isNaN(o) && (rankings_cache[e][o] = rankings_cache[e][n]), DragonRankings_BuildPage(a, e, t, o))
            }, "json").error(function() {
                g_is_ranking_loading = !1, alertify.log("Error when loading rankings, try again later")
            })
        }
    }
}

function DragonRankings_BuildPage(e, o, t, a) {
    for (var n, r, s, d, u = e.length, _ = e[1], c = _, h = "<table>", p = 2, m = t.myPlayerInfo ? t.myPlayerInfo.game_id : ""; p < u;) n = e[p++], r = e[p++], s = e[p++], d = "string" == typeof e[p] ? e[p++] : "", h += "<tr", (s == m || s == a) && (h += ' class="ranking_me"'), h += "><td>" + c + '</td><td><div class="rank rank' + r + '"></div></td><td><div class="ranking_name"><span class="GuildName">' + d + "</span> " + s + "</div></td><td>" + n + "</td></tr>", c++;
    h += "</table>", e = '<div class="Nav"><button id="btnRPrev">&lt;-</button><button id="btnMe">' + l.t("ME") + "</button>" + l.t("Search") + ': <input id="rankingOffset" value="' + _ + '"><button id="btnRNext">-&gt;</button></div>', $("#ranking_data").html(e + h), $("#btnMe").click(function() {
        var e = t.myPlayerInfo ? t.myPlayerInfo.game_id : "";
        e ? LoadRanking(o, e, t) : alertify.log("Don't know who you are, enter a server.")
    }), $("#btnRPrev").click(function() {
        LoadRanking(o, Math.max(1, _ - RANKING_PAGE_SIZE), t)
    }), $("#btnRNext").click(function() {
        LoadRanking(o, Math.max(1, c), t)
    }), $("#rankingOffset").bind("keyup", function(e) {
        if (13 == e.which) return LoadRanking(o, $(this).val(), t), e.stopPropagation(), !1
    })
}

function ShowContact() {
    $(".ranking_btn").removeClass("selected"), $("#ranking_btn_contact").addClass("selected");
    var e, o = '<br><div class="ContactTitle">- ' + l.t("COMPANY EMAILS") + ' -</div><div class="ContactName">' + l.t("Community") + ':</div><div class="ContactFB"><a href="mailto:business@dragonbound.net">community@dragonbound.net</a></div><div class="ContactLang">(' + l.t("ENGLISH ONLY") + ')</div><br><div class="ContactName">' + l.t("Business Relations") + ':</div><div class="ContactFB"><a href="mailto:business@dragonbound.net">business@dragonbound.net</a></div><div class="ContactLang">(' + l.t("COMPANIES ONLY, IN ENGLISH") + ')</div><div class="ContactTitle">- ' + l.t("GM LIST") + " -</div>";
    e = "br" == SERVER_TYPE ? [
        ["DN", "drgonight.dn", "English"],
        ["Rhonan", "GMRhonan", "Portuguese, English"],
        ["Zamy", "GMZamy", "Spanish, English"],
        ["Digu", "", "Portuguese, English"],
        ["Vulgo Biel", "", "Portuguese, English"]
    ] : [
        ["DN", "drgonight.dn", "English"],
        ["Jaku", "johnkeh", "Filipino, English"],
        ["tkspr0", "GM.tkspr0", "Spanish, English"],
        ["Zamy", "GMZamy", "Spanish, English"],
        ["Kommander", "pages/GM-Kommander/473619026023417", "Spanish, Portuguese, English"],
        ["Carlos*", "GM.CarlosMM", "Spanish, English"],
        ["Rhonan", "GMRhonan", "Portuguese, English"],
        ["Xebe", "GmXebe", "Filipino, English, Chinese"],
        ["Aidan Pe", "phdragonbound.net", "Filipino, English"],
        ["teoguy07", "GmTeoguy07", "Filipino, English"],
        ["Lady Jade ~", "GMLadyJade", "Spanish, English"]
    ];
    for (var t = 0; t < e.length; t++) o += '<div class="ContactName">' + e[t][0] + "</div>" + ("" != e[t][1] ? '<div class="ContactFB"><a href="https://www.facebook.com/' + e[t][1] + '" target="_blank">facebook.com/' + e[t][1] + "</a></div>" : "") + '<div class="ContactLang">' + e[t][2] + "</div>";
    $("#ranking_data").html(o)
}

function ShowTerms() {
    $(".ranking_btn").removeClass("selected"), $("#ranking_btn_terms").addClass("selected"), $("#ranking_data").html("<textarea class=\"TermsArea\" readonly> = Dragonbound Terms of Service =\n\nThank you for playing Dragonbound.\n\nBy using our services, you hereby agree to our terms and conditions.\n\nDragonBound is a free to play multiplayer online game, and is solely for entertainment purposes and to offer fun to players around the world.\n\nOur web site and services provided to you on and through our web site on an AS IS basis. You agree that the owners of DragonBound exclusively reserve the right and may, at any time and without notice and any liability to you, modify or discontinue DragonBound and its services or delete the data you provide, whether temporarily or permanently. We shall have no responsibility or liability for the timeliness, deletion, failure to store, inaccuracy, or improper delivery of any data or information.\n\n = Your Account\n\nYou are responsible for your account. Please keep your password safe and we recommend not to share your personal Facebook information.  Do not trust anyone with your password.  We are not responsible for any case of compromise, theft, loss, or any other occurrence that would prevent you from using our services, DragonBound representatives will never ask you for your password.\nIf you lose access to your Facebook account, you should use Facebook's support for getting back access to your account, we cannot help you with stolen Facebook accounts.\n\n = Your Avatars\n\nIt is entirely the player's decision to buy an avatar in the shop or not, there will not be change or devolution of the acquired avatars.\nYour avatars, whether bought with gold or cash, are only valid within DragonBound.  You cannot claim ownership of avatars outside of DragonBound, nor claim compensation in any form, in case of lost avatars.\nYou agree that you have no right or title in or to any such content, including virtual in-game assets, or any other attributes or features of the Account or stored on the Service. You further agree that there are no refunds or restorations available for any intentionally or accidentally lost, misplaced, or deleted virtual assets. You also acknowledge that DragonBound may, in its sole and absolute discretion, review any virtual asset issues and make a binding decision in accordance with these terms.\n\n = Code of Conduct\n\nAlways do what is right and fair.  You are not permitted to gain unfair advantage that other users have no control over. DragonBound reserves the right to determine what constitutes \"unfair advantage\" this may be illegal GP gaining, and the use of third party programs to unbalance the fair and clean game, and will discipline users with any penalty that they deem fit, in the event of violating this policy.  You are entitled to appeal in the event that you are penalized, but DragonBound will have the final decision in any circumstance.\nRespect other players. DragonBound will not tolerate any bad behavior by players. DragonBound will discipline users with any penalty that they deem fit, in the event of violating this policy.\n\n = About Game Masters\n\nBeing a GM doesn't mean to have access to the main data of the game, each GM is responsible for their acts.\nDragonBound have chosen Game Masters of the game, The GMs are the people in the game who keep the peace and same treatment to the users inside the game, GMs will discipline users with any penalty that they deem fit, in the event of illegal playing.\n\n = Penalty/Ban\n\nPenalties will be the same in condition and criteria of the GMs who are designated to do so.\nEach GM will be responsible for their own bans, arbitrary bans are not tolerated and may lead into a destitution of their charge.\nThey will have the following options:\n1 day warning ban, no GP lose - Usually for trouble makers, insulting GM, chat spam.\n7 days ban & -25% GP – Usually for using 3rd party software that gives unfair advantage (like aimbots and auto-clickers).\n3 days ban & -50% GP – Usually for getting GP in unfair ways (like boosting and free kill games)\nPermanent Ban - Usually for payment issues, accounts involved in repeated offenses, or accounts used mainly for breaking the rules.\nEvery GM in the game is able to mute players, from 1 to 60 minutes if needed in order to keep the proper environment of the game.\nThese were general guide lines. However, DragonBound saves the right to close temporarily or permanently or punish any account for any reason that DragonBound's GM finds necessary.\n\n = User Generated Content\n\nWe are not responsible for user generated content. Some of our content may be created by users, and it may violate copyrights or trademarks. In the event that this happens, please contact us by email to the business relations address advertised in \"Contact Us\" and we will remove the content from DragonBound.\nWhen a player sends us his graphic design to be added to the game, he also agrees that he will have no claims of intellectual property / copyrights / trademark in the future for this design. The reward that he will receive for sending us his design will be considered as DragonBound paying and buying his rights to use that graphical content for unlimited time.\n\n = About Virtual Currency / Donations / Cash Chargers\n\nIt is entirely the player's decision to buy an avatar in the shop or not, as well as it is to pay real money for them, users are not forced to buy cash.\nThe real money is properly collected from users who agree to donate, cash is taken as donation to DragonBound, to server's maintenance and to keep offering our services.\nPayments made using the services of PayPal will have to be made with a “Verified” account status, and any kind of reversed payment will lead to a permanent ban.\nRefund Policy: There are no refunds, unless decided by the seller in special cases to make an exception and make a refund.\n\n = Third Party Services\n\nGoods and services of third parties may be advertised and/or made available on or through DragonBound. Representations made regarding products and services provided by third parties are governed by the policies and representations made by these third parties. We shall not be liable for or responsible in any manner for any of your dealings or interaction with third parties. \n\n = Limitation of Liability\n\nYOU EXPRESSLY UNDERSTAND AND AGREE THAT WE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INDICENTAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSS (EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), RESULTING FROM OR ARISING OUT OF (I) THE USE OF OR THE INABILITY TO USE THE SERVICE, (II) THE COST TO OBTAIN SUBSTITUTE GOODS AND/OR SERVICES RESULTING FROM ANY TRANSACTION ENTERED INTO ON THROUGH THE SERVICE, (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA TRANSMISSIONS, (IV) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE, OR (V) ANY OTHER MATTER RELATING TO THE SERVICE. Please remember that we are not responsible for any messages posted. We do not vouch for or warrant the accuracy, completeness or usefulness of any message, and are not responsible for the contents of any message. The messages express the views of the author of the message, not necessarily the views of DragonBound. Any user who feels that a posted message is objectionable is encouraged to contact us immediately. We have the ability to remove objectionable messages and we will make every effort to do so, within a reasonable time frame, if we determine that removal is necessary. You agree, through your use of this service, that you will not use DragonBound to post any material which is knowingly false and/or defamatory, inaccurate, abusive, vulgar, hateful, harassing, obscene, profane, sexually oriented, threatening, invasive of a person's privacy, or otherwise violate of any law. You agree not to post any copyrighted material unless the copyright is owned by you or by DragonBound. If you have read, understood and agree to these rules and conditions, you may use our services. If you disagree, leave immediately.</textarea>")
}

function ShowPrivacy() {
    $(".ranking_btn").removeClass("selected"), $("#ranking_btn_privacy").addClass("selected"), $("#ranking_data").html('<textarea class="TermsArea" readonly> = Privacy Policy =\n\nDragonBound may require the following information from you:\n\n = Facebook Login\n\nWe are using facebook login to provide users a convenient way to play DragonBound. We do not control the facebook login process, nor do we have any record of your passwords.\n\n = Facebook Information\n\nWe may view your PUBLIC facebook profile, email and birthday for the purpose of verifying your identity.\n\nYour PUBLIC facebook profile photo and name will be used as the default in-game photo and name - You have the option to change these in [My Info] button in game.DragonBound will automatically gather your gender information to determine your gender in-game.\n\nWe will never share or give to 3rd party any of your private information. We will never send you any emails (unless you contacted us first).\n\nWe will not use any of your facebook information for any purpose other than those stated above.\n\n = Login Information\n\nYour login data is collected by Google Analytics for information purposes only.\n\n = In-Game Information\n\nDefault username - Your Facebook name will be your default username. This can be changed through clicking the "My Info" button on the lobby screen in-game.\n\nAll information and statistics transmitted in-game are monitored, and can be used by DragonBound for whatever purpose it may deem fit.\n\n = Third Party Payment Information\n\nDragonBound employs third parties to make payments more convenient for users. These companies may require personal, payment, and billing information. The information you provide these companies do not pass through DragonBound.\n\n = Sharing Information\n\nDragonBound will not share your information with anyone. DragonBound will treat your information with utmost confidentiality.\n\n = Changes to the Privacy Policy\n\nDragonBound may modify, in part or entirely, its privacy policy. The most updated version will be available on the website.</textarea>')
}
var g_previous_w, g_previous_h, g_previous_orientation, RANKING_SIZE = 248,
    g_aspect_ratio = 1,
    g_no_aspect_left = 0,
    g_no_aspect_top = 0;

function Resize(e) {
    var o = window.innerWidth,
        t = window.innerHeight;
    if (e || !(o == g_previous_w && t == g_previous_h)) {
        g_previous_w = o, g_previous_h = t;
        var a, n, r, e = g_is_show_ranking && 500 < o;
        o / 800 < t / 600 ? (n = 0, r = Math.floor((t - 600 * (a = o / 800)) / 2)) : (n = Math.floor((o - 800 * (a = t / 600)) / 2), r = 0), e && n < RANKING_SIZE && ((o -= RANKING_SIZE) / 800 < t / 600 ? (a = o / 800, n = RANKING_SIZE, r = Math.floor((t - 600 * a) / 2)) : ((n = Math.floor((o + RANKING_SIZE - 800 * (a = t / 600)) / 2)) < RANKING_SIZE && (n = RANKING_SIZE), r = 0)), $("#container").css({
            scaleX: a,
            scaleY: a,
            left: n,
            top: r
        }), g_aspect_ratio = a, g_no_aspect_left = n, g_no_aspect_top = r, e ? $("#ranking_panel").show() : $("#ranking_panel").hide()
    }
}

function ResizeInit() {
    window.addEventListener("resize", Resize, !1), Resize()
}

function ShopGUI(e) {
    $("#shop_my_items_container").tinyscrollbar({
        size: 237
    });
    var o, t = 0;
    for (o = 0; o < AVATARS.length; o++) AVATARS[o] && AVATARS[o][AVATAR_INDEX_SHOP] && t++;
    $("#buttonShopExit").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopClose(e)
    }), $("#shop_item0").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(0, e.myPlayerInfo.gender)
    }), $("#shop_item1").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(1, e.myPlayerInfo.gender)
    }), $("#shop_item2").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(2, e.myPlayerInfo.gender)
    }), $("#shop_item3").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(3, e.myPlayerInfo.gender)
    }), $("#shop_item4").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(4, e.myPlayerInfo.gender)
    }), $("#shop_item5").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(5, e.myPlayerInfo.gender)
    }), $("#shop_item6").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(6, e.myPlayerInfo.gender)
    }), $("#shop_item7").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(7, e.myPlayerInfo.gender)
    }), $("#shop_item8").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSelectItem(8, e.myPlayerInfo.gender)
    }), $("#buttonShopTry").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopTry()
    }), $("#buttonShopBuy").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopBuy()
    }), $("#buy_cancel_btn").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopBuyCloseDialog()
    }), $("#buy_period_next_btn").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSetPeriod((ShopGetPeriod() + 1) % 3)
    }), $("#buy_period_prev_btn").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ShopSetPeriod((ShopGetPeriod() + 2) % 3)
    }), $("#buy_gold_btn").click(function() {
        $(this).hasClass("active") && (AudioPlay(AUDIO_BUTTON_SELECT2), ShopDoPurchase(!1, e))
    }), $("#buy_cash_btn").click(function() {
        $(this).hasClass("active") && (AudioPlay(AUDIO_BUTTON_SELECT2), ShopDoPurchase(!0, e))
    }), $("#buttonShopHead").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(AVATAR_TYPE_HEAD, 0, e.myPlayerInfo.gender, t)
    }), $("#buttonShopBody").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(AVATAR_TYPE_BODY, 0, e.myPlayerInfo.gender, t)
    }), $("#buttonShopEyes").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(AVATAR_TYPE_EYES, 0, e.myPlayerInfo.gender, t)
    }), $("#buttonShopFlag").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(AVATAR_TYPE_FLAG, 0, e.myPlayerInfo.gender, t)
    }), $("#buttonShopBackground").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(AVATAR_TYPE_BACKGROUND, 0, e.myPlayerInfo.gender, t)
    }), $("#buttonShopForeground").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(AVATAR_TYPE_FOREGROUND, 0, e.myPlayerInfo.gender, t)
    }), $("#buttonShopExItem").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(AVATAR_TYPE_EXITEM, 0, e.myPlayerInfo.gender, t)
    }), $("#buttonShopNext").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(g_current_shop_type, g_current_shop_page + 1, e.myPlayerInfo.gender, t)
    }), $("#buttonShopPrev").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), 24 != e.myPlayerInfo.rank && (g_ss = 0), ShopSetPage(g_current_shop_type, g_current_shop_page - 1, e.myPlayerInfo.gender, t)
    })
}

function ShopSetMyItems(e) {
    e.SendGetMyAvatars()
}

function ShopSetMyItems2(e, o) {
    var t = "",
        a = "pop time atk def life item dig shld".split(" "),
        n = [AVATAR_INDEX_STAT_POP, AVATAR_INDEX_STAT_TIME, AVATAR_INDEX_STAT_ATK, AVATAR_INDEX_STAT_DEF, AVATAR_INDEX_STAT_LIFE, AVATAR_INDEX_STAT_ITEM, AVATAR_INDEX_STAT_DIG, AVATAR_INDEX_STAT_SHLD],
        r = !1;
    ShopWearEquippedItems(o);
    for (var s = 0; s < e.length; s++) {
        var d = e[s],
            u = d[0],
            _ = d[1],
            c = d[2],
            h = d[3],
            p = d[4],
            m = d[5],
            f = AVATARS[_];
        if (void 0 == f) debug && console.log("*** ERROR: Unknown avatar:", d);
        else {
            var d = f[AVATAR_INDEX_TYPE],
                y = f[AVATAR_INDEX_GENDER],
                b = f[AVATAR_INDEX_NAME],
                E = void 0;
            if (h) {
                if ((h = new Date(h) - new Date) >= MS_IN_1_DAY) E = Math.floor(h / MS_IN_1_DAY) + 1 + " Days";
                else {
                    if (!(0 < h)) continue;
                    E = Math.floor(h / MS_IN_1_HOUR) + 1 + " Hours"
                }
            }
            for (t += '<div id="shop_my_item' + s + '" class="shop_my_item" onmousedown="ShopSelectMyItem(' + s + ",'" + o + '\')" avatar_id="' + u + '" avatar_number="' + _ + '" avatar_type="' + d + '">', m ? t += '<div class="shop_my_item_gift"></div>' : p && (t += '<div class="shop_my_item_cash"></div>'), t += '<div class="shop_my_item_icon shop_item_icon_' + d + y + '"></div><div class="shop_my_item_name">' + b + (E ? " (" + E + ")" : "") + '</div><div class="shop_my_item_equip' + (c ? " equipped" : "") + ' "></div>', p = u = 0; p < a.length; p++) m = n[p], h = a[p], f[m] && (t += '<div class="shop_my_item_stat shop_my_item_stat' + u + '"> <div class="stat_icon stat_icon_' + (0 < f[m] ? h : h + "-") + '"></div> <div class="stat_digit1 stat_font stat_font' + Math.floor(Math.abs(f[m] / 10)) + '"></div> <div class="stat_digit2 stat_font stat_font' + Math.abs(f[m] % 10) + '"></div> </div>', u++);
            t += "</div>", c && g_shop_player.change(_), 9e3 == f[AVATAR_INDEX_N] && (r = !0)
        }
    }
    for (r && !g_shop_player.background && g_shop_player.change(POWER_USER_BACKGROUND), $("#shop_my_items").html(t), $("#shop_my_items_container").tinyscrollbar_update(), t = e.length.toString().split(""), a = 0; 4 > a; a++) $("#shop_my_items_number .digit" + a).removeClass().addClass("digit" + a + (a < t.length ? " stat_font stat_font" + t[a] : ""));
    ShopUpdateMyStats()
}

function ShopSetMyGoldCash(e, o) {
    $("#shop_my_cash").html(Commatize(o) + " Cash"), $("#shop_my_gold").html(Commatize(e) + " Gold")
}

function ShopSelectMyItem(e, o) {
    if ($("#shop_my_item" + e).hasClass("selected")) {
        $("#shop_my_item" + e).attr("avatar_id"), $("#shop_my_item" + e).attr("avatar_number");
        var t = $("#shop_my_item" + e).attr("avatar_type");
        t != AVATAR_TYPE_EXITEM && ($("#shop_my_item" + e + " .shop_my_item_equip").hasClass("equipped") ? $("#shop_my_item" + e + " .shop_my_item_equip").removeClass("equipped") : ($(".shop_my_item_equip.equipped").each(function() {
            $(this).parent().attr("avatar_type") == t && $(this).removeClass("equipped")
        }), $("#shop_my_item" + e + " .shop_my_item_equip").addClass("equipped")), ShopWearEquippedItems(o))
    } else $(".shop_my_item").removeClass("selected"), $(".shop_my_item .shop_my_item_name").removeClass("blackShadow"), $(".shop_my_item .shop_my_item_cash").removeClass("selected"), $(".shop_my_item .shop_my_item_gift").removeClass("selected"), $("#shop_my_item" + e).addClass("selected"), $("#shop_my_item" + e + " .shop_my_item_name").addClass("blackShadow"), $("#shop_my_item" + e + " .shop_my_item_cash").addClass("selected"), $("#shop_my_item" + e + " .shop_my_item_gift").addClass("selected")
}

function ShopSetPage(e, o, t, a) {
    var n, r = [],
        s = 0;
    for (n = AVATARS.length - 1; 0 <= n; n--) AVATARS[n] && (AVATARS[n][AVATAR_INDEX_SHOP] || g_ss) && AVATARS[n][AVATAR_INDEX_TYPE] == e && (AVATARS[n][AVATAR_INDEX_GENDER] == GENDER_ALL || AVATARS[n][AVATAR_INDEX_GENDER] == t || AVATARS[n][AVATAR_INDEX_TYPE] == AVATAR_TYPE_FLAG || AVATARS[n][AVATAR_INDEX_TYPE] == AVATAR_TYPE_BACKGROUND || AVATARS[n][AVATAR_INDEX_TYPE] == AVATAR_TYPE_FOREGROUND || AVATARS[n][AVATAR_INDEX_TYPE] == AVATAR_TYPE_EXITEM || g_ss) && r.push(n), AVATARS[n] && AVATARS[n][AVATAR_INDEX_SHOP] && s++;
    s != a && (r = []), console.log(s, a), 0 == (n = Math.floor((r.length + 9 - 1) / 9)) ? o = 0 : (0 > o && (o += n), o %= n), r = r.slice(9 * o, 9 * (o + 1)), g_current_shop_type = e, g_current_shop_page = o;
    var d, e = "pop time atk def life item dig shld".split(" "),
        o = [AVATAR_INDEX_STAT_POP, AVATAR_INDEX_STAT_TIME, AVATAR_INDEX_STAT_ATK, AVATAR_INDEX_STAT_DEF, AVATAR_INDEX_STAT_LIFE, AVATAR_INDEX_STAT_ITEM, AVATAR_INDEX_STAT_DIG, AVATAR_INDEX_STAT_SHLD];
    for (n = 0; n < r.length; n++) {
        a = r[n], d = (t = AVATARS[a])[AVATAR_INDEX_N];
        var s = t[AVATAR_INDEX_TYPE],
            u = t[AVATAR_INDEX_GENDER];
        for (d = t[AVATAR_INDEX_URL] ? t[AVATAR_INDEX_URL] : s == AVATAR_TYPE_BACKGROUND ? STATIC_DIR + "images/backgrounds/b20" + d + ".png" : s == AVATAR_TYPE_FOREGROUND ? STATIC_DIR + "images/backgrounds/f20" + d + ".png" : STATIC_DIR + "images/avatars/" + u + s + (d + 1e5).toString().substring(1) + ".png", $("#shop_item" + n + " .shop_item_icon").removeClass().addClass("shop_item_icon shop_item_icon_" + s + u), $("#shop_item" + n + " .shop_item_name").html(t[AVATAR_INDEX_NAME]), t[AVATAR_INDEX_GRAPHICS] && t[AVATAR_INDEX_GRAPHICS][0] && (void 0 != t[AVATAR_INDEX_GRAPHICS][1] ? $("#shop_item" + n + " .shop_item_image").css({
                background: "url(" + d + ") no-repeat -" + (t[AVATAR_INDEX_GRAPHICS][0][0] + 1) + "px 0",
                width: t[AVATAR_INDEX_GRAPHICS][1][0],
                height: t[AVATAR_INDEX_GRAPHICS][1][1],
                left: (158 - t[AVATAR_INDEX_GRAPHICS][1][0]) / 2
            }) : $("#shop_item" + n + " .shop_item_image").css({
                background: "url(" + d + ") no-repeat 0 0",
                width: t[AVATAR_INDEX_GRAPHICS][0][0],
                height: t[AVATAR_INDEX_GRAPHICS][0][1],
                left: (158 - t[AVATAR_INDEX_GRAPHICS][0][0]) / 2
            })), s = t[AVATAR_INDEX_GOLD_WEEK] ? t[AVATAR_INDEX_GOLD_WEEK] : t[AVATAR_INDEX_GOLD_MONTH] ? t[AVATAR_INDEX_GOLD_MONTH] : t[AVATAR_INDEX_GOLD_PERM] ? t[AVATAR_INDEX_GOLD_PERM] : 0, u = t[AVATAR_INDEX_CASH_WEEK] ? t[AVATAR_INDEX_CASH_WEEK] : t[AVATAR_INDEX_CASH_MONTH] ? t[AVATAR_INDEX_CASH_MONTH] : t[AVATAR_INDEX_CASH_PERM] ? t[AVATAR_INDEX_CASH_PERM] : 0, $("#shop_item" + n + " .shop_item_cash").html(u ? Commatize(u) + " Cash" : "Gold Only"), $("#shop_item" + n + " .shop_item_gold").html(s ? Commatize(s) + " Gold" : "Cash Only"), $("#shop_item" + n).show(), $("#shop_item" + n).attr("avatar_index", a), s = a = 0; s < e.length; s++) u = o[s], d = e[s], t[u] && ($("#shop_item" + n + " .shop_item_stat" + a + " .stat_icon").removeClass().addClass("stat_icon stat_icon_" + (0 < t[u] ? d : d + "-")).show(), $("#shop_item" + n + " .shop_item_stat" + a + " .stat_digit1").removeClass().addClass("stat_digit1 stat_font stat_font" + Math.floor(Math.abs(t[u] / 10))).show(), $("#shop_item" + n + " .shop_item_stat" + a + " .stat_digit2").removeClass().addClass("stat_digit2 stat_font stat_font" + Math.abs(t[u] % 10)).show(), a++);
        for (; 8 > a; a++) $("#shop_item" + n + " .shop_item_stat" + a + " .stat_icon").hide(), $("#shop_item" + n + " .shop_item_stat" + a + " .stat_digit1").hide(), $("#shop_item" + n + " .shop_item_stat" + a + " .stat_digit2").hide()
    }
    for (; 9 > n; n++) $("#shop_item" + n).hide();
    r = ShopGetSelected(), $("#shop_item" + r).removeClass("selected")
}

function ShopWearEquippedItems(e) {
    var o = !0,
        t = !0,
        a = !0,
        n = !0,
        r = !0,
        s = !0;
    $(".shop_my_item_equip.equipped").parent().each(function() {
        g_shop_player.change($(this).attr("avatar_number")), $(this).attr("avatar_type") == AVATAR_TYPE_HEAD ? o = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_BODY ? t = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_EYES ? a = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_FLAG ? n = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_BACKGROUND ? r = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_FOREGROUND && (s = !1)
    }), $(".shop_my_item").each(function() {
        $(this).attr("avatar_number") == POWER_USER_EXITEM && r && (r = !1, g_shop_player.change(POWER_USER_BACKGROUND))
    }), o && g_shop_player.change(e == GENDER_MALE ? AVATAR_NAKED_HEAD_MALE : AVATAR_NAKED_HEAD_FEMALE), t && g_shop_player.change(e == GENDER_MALE ? AVATAR_NAKED_BODY_MALE : AVATAR_NAKED_BODY_FEMALE), a && g_shop_player.change(void 0, AVATAR_TYPE_EYES), n && g_shop_player.change(void 0, AVATAR_TYPE_FLAG), r && g_shop_player.change(void 0, AVATAR_TYPE_BACKGROUND), s && g_shop_player.change(void 0, AVATAR_TYPE_FOREGROUND), ShopUpdateMyStats()
}

function ShopSelectItem(e, o) {
    var t = ShopGetSelected();
    t == e ? ($("#shop_item" + t).removeClass("selected"), ShopWearEquippedItems(o)) : ($("#shop_item" + t).removeClass("selected"), $("#shop_item" + e).addClass("selected"), ShopTry())
}

function ShopGetSelected() {
    for (var e = 0; 9 > e; e++)
        if ($("#shop_item" + e).hasClass("selected")) return e
}

function ShopTry() {
    var e = ShopGetSelected();
    void 0 != e && (e = $("#shop_item" + e).attr("avatar_index"), 9e3 != AVATARS[e][0] || g_shop_player.background || (e = POWER_USER_BACKGROUND), g_shop_player.change(e), ShopUpdateMyStats())
}

function ShopBuy() {
    var e = ShopGetSelected();
    if (void 0 != e) {
        var e = $("#shop_item" + e).attr("avatar_index"),
            o = AVATARS[e],
            t = o[AVATAR_INDEX_N],
            a = o[AVATAR_INDEX_TYPE],
            n = o[AVATAR_INDEX_GENDER],
            r = o[AVATAR_INDEX_NAME],
            t = o[AVATAR_INDEX_URL] ? o[AVATAR_INDEX_URL] : a == AVATAR_TYPE_BACKGROUND ? STATIC_DIR + "images/backgrounds/b20" + t + ".png" : a == AVATAR_TYPE_FOREGROUND ? STATIC_DIR + "images/backgrounds/f20" + t + ".png" : STATIC_DIR + "images/avatars/" + n + a + (t + 1e5).toString().substring(1) + ".png";
        $("#shop_buy_dialog .shop_item_icon").removeClass().addClass("shop_item_icon shop_item_icon_" + a + n), $("#shop_buy_dialog .shop_item_name").html(r), o[AVATAR_INDEX_GRAPHICS] && o[AVATAR_INDEX_GRAPHICS][0] && (void 0 != o[AVATAR_INDEX_GRAPHICS][1] ? $("#shop_buy_dialog .shop_item_image").css({
            background: "url(" + t + ") no-repeat -" + (o[AVATAR_INDEX_GRAPHICS][0][0] + 1) + "px 0",
            width: o[AVATAR_INDEX_GRAPHICS][1][0],
            height: o[AVATAR_INDEX_GRAPHICS][1][1],
            left: 156 + (158 - o[AVATAR_INDEX_GRAPHICS][1][0]) / 2
        }) : $("#shop_buy_dialog .shop_item_image").css({
            background: "url(" + t + ") no-repeat 0 0",
            width: o[AVATAR_INDEX_GRAPHICS][0][0],
            height: o[AVATAR_INDEX_GRAPHICS][0][1],
            left: 156 + (158 - o[AVATAR_INDEX_GRAPHICS][0][0]) / 2
        })), $("#buy_cash_week").html(0 < o[AVATAR_INDEX_CASH_WEEK] ? Commatize(o[AVATAR_INDEX_CASH_WEEK]) : "Can't buy"), $("#buy_cash_month").html(0 < o[AVATAR_INDEX_CASH_MONTH] ? Commatize(o[AVATAR_INDEX_CASH_MONTH]) : "Can't buy"), $("#buy_cash_perm").html(0 < o[AVATAR_INDEX_CASH_PERM] ? Commatize(o[AVATAR_INDEX_CASH_PERM]) : "Can't buy"), $("#buy_gold_week").html(0 < o[AVATAR_INDEX_GOLD_WEEK] ? Commatize(o[AVATAR_INDEX_GOLD_WEEK]) : "Can't buy"), $("#buy_gold_month").html(0 < o[AVATAR_INDEX_GOLD_MONTH] ? Commatize(o[AVATAR_INDEX_GOLD_MONTH]) : "Can't buy"), $("#buy_gold_perm").html(0 < o[AVATAR_INDEX_GOLD_PERM] ? Commatize(o[AVATAR_INDEX_GOLD_PERM]) : "Can't buy"), g_current_buy_avatar_index = e, ShopSetPeriod(0), g_graphics_high ? $("#shop_buy_dialog").fadeIn() : $("#shop_buy_dialog").show()
    }
}

function ShopBuyCloseDialog() {
    g_graphics_high ? $("#shop_buy_dialog").effect("explode") : $("#shop_buy_dialog").hide()
}
var BUY_PERIOD = ["1 Week", "1 Month", "Limitless"],
    PERIOD_WEEK = 0,
    PERIOD_MONTH = 1,
    PERIOD_PERM = 2;

function ShopGetPeriod() {
    var e = BUY_PERIOD.indexOf($("#buy_period").html());
    return -1 == e && ShopSetPeriod(0), e
}

function ShopSetPeriod(e) {
    $("#buy_period").html(BUY_PERIOD[e]);
    var o = AVATARS[g_current_buy_avatar_index];
    e == PERIOD_WEEK ? (0 < o[AVATAR_INDEX_CASH_WEEK] ? $("#buy_cash_btn").addClass("active") : $("#buy_cash_btn").removeClass("active"), 0 < o[AVATAR_INDEX_GOLD_WEEK] ? $("#buy_gold_btn").addClass("active") : $("#buy_gold_btn").removeClass("active")) : e == PERIOD_MONTH ? (0 < o[AVATAR_INDEX_CASH_MONTH] ? $("#buy_cash_btn").addClass("active") : $("#buy_cash_btn").removeClass("active"), 0 < o[AVATAR_INDEX_GOLD_MONTH] ? $("#buy_gold_btn").addClass("active") : $("#buy_gold_btn").removeClass("active")) : e == PERIOD_PERM && (0 < o[AVATAR_INDEX_CASH_PERM] ? $("#buy_cash_btn").addClass("active") : $("#buy_cash_btn").removeClass("active"), 0 < o[AVATAR_INDEX_GOLD_PERM] ? $("#buy_gold_btn").addClass("active") : $("#buy_gold_btn").removeClass("active"))
}

function ShopDoPurchase(e, o) {
    var t, a = AVATARS[g_current_buy_avatar_index],
        n = ShopGetPeriod();
    n == PERIOD_WEEK ? t = e ? a[AVATAR_INDEX_CASH_WEEK] : a[AVATAR_INDEX_GOLD_WEEK] : n == PERIOD_MONTH ? t = e ? a[AVATAR_INDEX_CASH_MONTH] : a[AVATAR_INDEX_GOLD_MONTH] : n == PERIOD_PERM && (t = e ? a[AVATAR_INDEX_CASH_PERM] : a[AVATAR_INDEX_GOLD_PERM]), DragonDialogOpen("Are you sure?", 'Are you sure you want to purchase <span class="AlertBold">' + a[AVATAR_INDEX_NAME] + '</span> for <span class="AlertBold">' + $("#buy_period").html() + '</span> time at <span class="AlertBold">' + Commatize(t) + " " + (e ? "Cash" : "Gold") + "</span> ?", 2, function(a) {
        a && o.SendPurchase(g_current_buy_avatar_index, e, n, t)
    })
}

function ShopUpdateMyStats() {
    for (var e = "pop shld item def life atk dig time".split(" "), o = [AVATAR_INDEX_STAT_POP, AVATAR_INDEX_STAT_SHLD, AVATAR_INDEX_STAT_ITEM, AVATAR_INDEX_STAT_DEF, AVATAR_INDEX_STAT_LIFE, AVATAR_INDEX_STAT_ATK, AVATAR_INDEX_STAT_DIG, AVATAR_INDEX_STAT_TIME], t = g_shop_player.GetAvatars(), a = 0; a < e.length; a++) {
        for (var n = 0, r = 0; r < t.length; r++) {
            var s = AVATARS[t[r]];
            void 0 != s && void 0 != (s = s[o[a]]) && (n += s)
        }
        50 < n && (n = 50), r = e[a], $("#shop_my_stats .shop_item_stat" + a + " .stat_icon").removeClass().addClass("stat_icon stat_icon_" + (0 <= n ? r : r + "-")).show(), $("#shop_my_stats .shop_item_stat" + a + " .stat_digit1").removeClass().addClass("stat_digit1 stat_font stat_font" + Math.floor(Math.abs(n / 10))).show(), $("#shop_my_stats .shop_item_stat" + a + " .stat_digit2").removeClass().addClass("stat_digit2 stat_font stat_font" + Math.abs(n % 10)).show()
    }
}

function ShopClose(e) {
    var o = [];
    $(".shop_my_item_equip.equipped").parent().each(function() {
        o.push(Number($(this).attr("avatar_id")))
    }), e.SendEquip(o), SwitchToChannelScreen(e)
}

function DragonDesigner_ChangeAvatar(e, o, t) {
    var a = random(1e4, 19999);
    AVATARS[a] = [a, e, "m", "TEST " + a, "", 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, JSON.parse(t), void 0, o], g_shop_player.change(a, e, !0)
}

function DragonDesigner_FillGraphicsByType() {
    var e = Number($("#DragonDesignerType").val()),
        e = g_shop_player.GetAvatars()[e],
        e = void 0 == e ? "" : JSON.stringify(AVATARS[e][AVATAR_INDEX_GRAPHICS]);
    $("#DragonDesignerTypeAnimation").val(e)
}

function DragonDesigner_Init() {
    void 0 === window.FileReader ? debug && console.log("FileReader Unsupported") : $("#shop_player").bind("dragenter dragover", function() {
        return $(this).css("box-shadow", "yellow 0px 0px 70px 70px"), !1
    }).bind("dragend dragleave", function() {
        return $(this).css("box-shadow", ""), !1
    }).bind("drop", function(e) {
        (e = e.originalEvent).preventDefault(), $("#shop_player").css("box-shadow", "");
        var e = e.dataTransfer.files[0],
            o = new FileReader;
        return o.onload = function(e) {
            var o = e.target.result,
                e = $('<div id="DragonDesigner" class="AlertBox"><div class="AlertBoxTitle">Create Your Avatar</div><div class="AlertBoxContent blackShadow">Type: <select id="DragonDesignerType"><option value="0">Head</option><option value="1">Body</option><option value="2">Eyes</option><option value="3">Flag</option><option value="4">Background</option><option value="5">Foreground</option></select><p>Frames: [W,H,CenterX,CenterY]<br><textarea rows="4" cols="28" id="DragonDesignerTypeAnimation"></textarea><div id="DragonDesignerOK" class="buttonOK"></div></div></div>');
            $("#container").append(e), DragonDesigner_FillGraphicsByType(), $("#DragonDesignerType").change(DragonDesigner_FillGraphicsByType), $("#DragonDesignerOK").click(function() {
                var e = [AVATAR_TYPE_HEAD, AVATAR_TYPE_BODY, AVATAR_TYPE_EYES, AVATAR_TYPE_FLAG, AVATAR_TYPE_BACKGROUND, AVATAR_TYPE_FOREGROUND],
                    t = Number($("#DragonDesignerType").val()),
                    e = e[t],
                    t = $("#DragonDesignerTypeAnimation").val();
                DragonDesigner_ChangeAvatar(e, o, t), $("#DragonDesigner").remove()
            })
        }, o.readAsDataURL(e), !1
    })
}

function SecretShop() {
    g_ss = 1
}
var g_ss, g_init_up, TAB_ALL = 0,
    TAB_FRIENDS = 1,
    TAB_GUILD = 2,
    GUILD_JOB_MEMBER = 0,
    GUILD_JOB_LEADER = 1,
    GUILD_JOB_SEMI_LEADER = 2,
    ROOM_NAMES = ["Hello World", "The Love Room", "DragonBound", "Welcome", "Let's Rock!"];

function ChannelGUI(e) {
    $("#channel").tinyscrollbar({
        size: 101
    }), $("#playersList").tinyscrollbar({
        size: 207
    }), $("#friendsList").tinyscrollbar({
        size: 208
    }), $("#guildMembersList").tinyscrollbar({
        size: 208
    }), $("#buttonCreateRoom").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT), 6 > e.myPlayerInfo.unlock ? CreateRoomChangeMode(GAME_MODE_BOSS, e.myPlayerInfo.unlock) : CreateRoomChangeMode(GAME_MODE_NORMAL, e.myPlayerInfo.unlock), $("#createRoomTitle").val(ROOM_NAMES[random(0, ROOM_NAMES.length - 1)]), FadeInDialog("dialogCreateRoom"), $("#createRoomTitle").focus()
    }), $("#buttonOptions").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ToggleOptionsDialog()
    }), $("#buttonRoomsListDown").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("next")
    }), $("#buttonRoomsListUp").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("prev")
    }), $(".room").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var o = $(this).children(".roomNumber").html();
        $(this).children(".roomLock").hasClass("roomLocked") ? ($("#join_room_input").val(o), FadeInDialog("dialog_join_room_div"), $("#join_password_input").val("").focus()) : e.SendRoomJoin(o)
    }).bind("contextmenu", function() {
        var o = $(this).children(".roomNumber").html();
        g_extra_info_room == o ? CloseRoomExtraInfo() : e.SendChannelGetRoomInfo(o)
    }), $("#buttonJoin").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), $("#join_password_input").val(""), FadeInDialog("dialog_join_room_div"), $("#join_room_input").focus()
    }), $("#buttonMyInfo").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), $("#display_name").val(e.myPlayerInfo.game_id), $("#can_show_photo").prop("checked", !!e.myPlayerInfo.fb), FadeInDialog("dialog_change_name_div")
    }), $("#buttonShop").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), SwitchToShopScreen(e)
    }), $("#buttonQuickJoin").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendQuickJoin()
    }), $("#dialog_change_name_cancel").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ExplodeDialog("dialog_change_name_div")
    }), $("#dialog_change_name_ok").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ExplodeDialog("dialog_change_name_div", !0);
        var o = $("#display_name").val(),
            t = $("#can_show_photo").is(":checked");
        o != e.myPlayerInfo.game_id && (-1 != o.indexOf("  ") ? DragonDialogOpen("Sorry", "Double space is not allowed, try single space.", DIALOG_BUTTONS_OK) : /GM\W/.exec(o) ? DragonDialogOpen("Sorry", "GM in name is not allowed, try a different name.", DIALOG_BUTTONS_OK) : DragonDialogOpen("Are you sure to change name?", 0 == e.myPlayerInfo.name_changes ? 'This is your first name change so it will be <font color="cyan">FREE</font> this time, future changes will be 4,000 Cash.<br><br>Change name to <font color="yellow">' + o + "</font> ?" : 'Name change costs <font color="cyan">4,000 Cash</font>.<br><br>Are you sure you want to change name to <font color="yellow">' + o + "</font> ?", DIALOG_BUTTONS_OK_CANCEL, function(t) {
            t && e.SendChangeName(o)
        })), !!e.myPlayerInfo.fb != t && e.SendChangeInfo(t)
    }), $("#changePassword").click(function() {
        ExplodeDialog("dialog_change_name_div", !0), e.dragonLogin.ChangePassword()
    }), $("#dialog_join_room_cancel").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), ExplodeDialog("dialog_join_room_div")
    }), $("#dialog_join_room_ok").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var o = Number($("#join_room_input").val());
        if (isNaN(o) || 0 >= o) DragonDialogOpen("Sorry", "Room Number should be a positive number.", DIALOG_BUTTONS_OK_CANCEL);
        else {
            var t = $("#join_password_input").val();
            e.SendRoomJoin(o, t), ExplodeDialog("dialog_join_room_div")
        }
    }), $("#channelInput").bind("keyup", function(o) {
        13 == o.which && "" != this.value && (o = this.value, this.value = "", e.SendChat(o))
    }), $("#buttonRanking").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), g_is_show_ranking = !g_is_show_ranking, Resize(!0), g_is_show_ranking ? $("#buttonRanking").addClass("open") : $("#buttonRanking").removeClass("open")
    }), $("#event_button").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendEvent(0)
    }), $("#facebook_post").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), Facebook_PostToFeed(e)
    }), $("#buttonAllBuddyList").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2);
        var o = $("#buttonAllBuddyList");
        o.hasClass("BuddyList") ? (TabChangeTo(TAB_GUILD), e.SendTabWatch(2), 0 == $("#guildMembersListHtml").children().length && e.SendRefreshGuildies()) : o.hasClass("Guild") ? (TabChangeTo(TAB_ALL), e.SendTabWatch(0)) : (TabChangeTo(TAB_FRIENDS), e.SendTabWatch(1), 0 == $("#friendsListHtml").children().length && e.SendRefreshFriends())
    }), $("#filter_all").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("all")
    }), $("#filter_waiting").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("waiting")
    }), $("#filter_normal").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("normal")
    }), $("#filter_boss").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("boss")
    }), $("#filter_same").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("same")
    }), $("#filter_friends").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("friends")
    }), $("#filter_guild").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendChannelRooms("guild")
    }), $("#buttonStart1v1").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.SendStartTournamentGame(1, e.lobbyMobile, [])
    }), $("#lobbyButtonMobile").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), e.lobbyMobile++, e.lobbyMobile > LAST_SELECTABLE_MOBILE && (e.lobbyMobile = FIRST_SELECTABLE_MOBILE), g_channel_player.change_mobile(e.lobbyMobile)
    }), $(".BrokerChannel").click(function() {
        if ($(this).hasClass("BrokerChannelOnline")) {
            e.ConnectToGameServer($(this).attr("ip"), $(this).attr("port"));
            var o = $(this).attr("channel_number"),
                t = $("#BrokerChannel" + o + " .BrokerChannelName").html();
            $("#channelName").html(t), e.server = o
        }
    }), $("#buttonChannels").click(function() {
        e.OpenBrokerWindow()
    }), $("#BrokerRefresh").click(function() {
        e.BrokerConnect()
    }), CreateRoomDialogGUI(e), OptionsDialogGUI(e)
}

function Facebook_PostToFeed(e) {
    var o = "icon180x180.png icon2_180x180.png icon3_180x180.jpg icon4_180x180.jpg icon5_180x180.jpg icon6_180x180.jpg".split(" "),
        o = o[random(0, o.length - 1)],
        t = "DragonBound " + ("br" == SERVER_TYPE ? "Brasil" : "Global"),
        a = t + " - " + l.t("The next generation of HTML5 online multi-player games in your browser!"),
        n = "br" == SERVER_TYPE ? "http://dragonbound-brasil.com" : "http://dragonbound.net",
        r = l.t("Play with or against your friends from your browser anywhere for free. Shop for avatars to make you stronger. Unlock hidden characters, game modes, and challenges. Meet new friends. Single player option too.");
    FB.ui({
        method: "feed",
        link: n,
        picture: n + "/static/images/" + o,
        name: a,
        caption: t,
        description: r
    }, function(o) {
        null != o && e.SendEvent(1, o.post_id)
    })
}

function PrepareOptionsDialog(e) {
    e ? ($("#OptionsLeave").show(), $("#OptionsOK").css("left", "175px"), $("#OptionsDialog").css({
        left: 2,
        top: 267
    })) : e || ($("#OptionsLeave").hide(), $("#OptionsOK").css("left", "106px"), $("#OptionsDialog").css({
        left: 241,
        top: 221
    })), g_audio_is_music_on ? $("#OptionsMusic").removeClass("CheckboxOff").addClass("CheckboxOn") : $("#OptionsMusic").removeClass("CheckboxOn").addClass("CheckboxOff"), g_audio_is_effects_on ? $("#OptionsEffects").removeClass("CheckboxOff").addClass("CheckboxOn") : $("#OptionsEffects").removeClass("CheckboxOn").addClass("CheckboxOff"), g_graphics_high ? ($("#OptionsGraphicsHigh").removeClass("RadioOff").addClass("RadioOn"), $("#OptionsGraphicsLow").removeClass("RadioOn").addClass("RadioOff")) : ($("#OptionsGraphicsHigh").removeClass("RadioOn").addClass("RadioOff"), $("#OptionsGraphicsLow").removeClass("RadioOff").addClass("RadioOn")), g_is_game_background ? ($("#OptionsBackgroundOn").removeClass("RadioOff").addClass("RadioOn"), $("#OptionsBackgroundOff").removeClass("RadioOn").addClass("RadioOff")) : ($("#OptionsBackgroundOn").removeClass("RadioOn").addClass("RadioOff"), $("#OptionsBackgroundOff").removeClass("RadioOff").addClass("RadioOn")), g_is_game_slice ? ($("#OptionsShootingModeSlice").removeClass("RadioOff").addClass("RadioOn"), $("#OptionsShootingModeDrag").removeClass("RadioOn").addClass("RadioOff")) : ($("#OptionsShootingModeSlice").removeClass("RadioOn").addClass("RadioOff"), $("#OptionsShootingModeDrag").removeClass("RadioOff").addClass("RadioOn")), $("#OptionsLangEN, #OptionsLangPR, #OptionsLangES, #OptionsLangFI, #OptionsLangVN").removeClass("RadioOn").addClass("RadioOff"), l.lang == LANGUAGE.EN ? $("#OptionsLangEN").removeClass("RadioOff").addClass("RadioOn") : l.lang == LANGUAGE.ES ? $("#OptionsLangES").removeClass("RadioOff").addClass("RadioOn") : l.lang == LANGUAGE.PR ? $("#OptionsLangPR").removeClass("RadioOff").addClass("RadioOn") : l.lang == LANGUAGE.FI ? $("#OptionsLangFI").removeClass("RadioOff").addClass("RadioOn") : l.lang == LANGUAGE.VN && $("#OptionsLangVN").removeClass("RadioOff").addClass("RadioOn")
}

function OptionsDialogGUI(e) {
    for (var o in $("#OptionsOK").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), ExplodeDialog("OptionsDialog")
        }), $("#OptionsMusic").click(function() {
            $("#OptionsMusic").hasClass("CheckboxOn") ? (AudioTurnMusicOff(), setCookie("music", 0)) : (AudioTurnMusicOn(), setCookie("music", 1)), AudioPlay(AUDIO_BUTTON_SELECT2), PrepareOptionsDialog(!!e.game)
        }), $("#OptionsEffects").click(function() {
            $("#OptionsEffects").hasClass("CheckboxOn") ? (AudioTurnEffectsOff(), setCookie("effects", 0)) : (AudioTurnEffectsOn(), setCookie("effects", 1)), AudioPlay(AUDIO_BUTTON_SELECT2), PrepareOptionsDialog(!!e.game)
        }), $("#OptionsGraphicsHigh").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), g_graphics_high = !0, PrepareOptionsDialog(!!e.game)
        }), $("#OptionsGraphicsLow").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), g_graphics_high = !1, PrepareOptionsDialog(!!e.game)
        }), $("#OptionsBackgroundOn").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), g_is_game_background = !0, PrepareOptionsDialog(!!e.game), $("#map_bg").show(), setCookie("background", 1)
        }), $("#OptionsBackgroundOff").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), g_is_game_background = !1, PrepareOptionsDialog(!!e.game), $("#map_bg").hide(), setCookie("background", 0)
        }), $("#OptionsShootingModeSlice").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), g_is_game_slice = !0, PrepareOptionsDialog(!!e.game), UpdateSliceDragGUI(), setCookie("slice", 1)
        }), $("#OptionsShootingModeDrag").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), g_is_game_slice = !1, PrepareOptionsDialog(!!e.game), UpdateSliceDragGUI(), setCookie("slice", 0)
        }), $("#OptionsLangEN").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), l.lang = LANGUAGE.EN, l.SetAll(), RankingReClick(), PrepareOptionsDialog(!!e.game), setCookie("lang", l.lang)
        }), $("#OptionsLangES").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), l.lang = LANGUAGE.ES, l.SetAll(), RankingReClick(), PrepareOptionsDialog(!!e.game), setCookie("lang", l.lang)
        }), $("#OptionsLangPR").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), l.lang = LANGUAGE.PR, l.SetAll(), RankingReClick(), PrepareOptionsDialog(!!e.game), setCookie("lang", l.lang)
        }), $("#OptionsLangFI").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), l.lang = LANGUAGE.FI, l.SetAll(), RankingReClick(), PrepareOptionsDialog(!!e.game), setCookie("lang", l.lang)
        }), $("#OptionsLangVN").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), l.lang = LANGUAGE.VN, l.SetAll(), RankingReClick(), PrepareOptionsDialog(!!e.game), setCookie("lang", l.lang)
        }), $("#OptionsTheme").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), DragonThemeDialog()
        }), $("#OptionsLeave").click(function() {
            AudioPlay(AUDIO_BUTTON_SELECT2), ExplodeDialog("OptionsDialog"), e.should_stay_in_game_screen = !1, e.game && (0 > e.game.my_player_index ? e.SendRoomLeave() : DragonDialogOpen("Quit Game?", "Alive: -5 GP, -1500 Gold, +1 Lose<p><br>Dead: +1 Lose", DIALOG_BUTTONS_OK_CANCEL, function(o) {
                o && e.SendRoomLeave()
            }, [35, 52]))
        }), $("#DragonThemeDialog").dialog({
            autoOpen: !1,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            },
            width: 510,
            height: 420,
            modal: !0
        }), DragonThemeDefault) $("#theme_" + o).focusout(function() {
        0 != DragonTheme_ChangeOneProperty(this.id.substr(6), this.value, function(e, o) {
            $("#theme_" + e).css("background-color", o ? "#9f9" : "#f99")
        }) && $("#themeFull").val(DragonTheme_ToJSON()).css("background-color", "")
    });
    $("#themeFull").focusout(function() {
        var e = DragonTheme_SetThemeFromJSON(this.value);
        if (1 == e) {
            for (var o in DragonThemeDefault) $("#theme_" + o).val(DragonTheme_GetValue(o)).css("background-color", "");
            $(this).css("background-color", this.value ? "#9f9" : "")
        } else - 1 == e && $(this).css("background-color", "#f99")
    })
}

function DragonThemeDialog() {
    for (var e in DragonThemeInUse) $("#theme_" + e).val(DragonTheme_GetValue(e));
    $("#themeFull").val(DragonTheme_ToJSON()), $("#DragonThemeDialog").dialog("open")
}

function CreateRoomDialogPressedOK(e) {
    var o, t, a, n = "";
    o = $("#createRoomTitle").val(), $("#CreateRoomPrivateCheckbox").hasClass("checkboxOn") && (n = $("#createRoomPasswordInput").val()), t = (t = $("#CreateRoomPlayers")).hasClass("players1v1") ? 2 : t.hasClass("players2v2") ? 4 : t.hasClass("players3v3") ? 6 : t.hasClass("players1vB") ? 1 : t.hasClass("players2vB") ? 2 : t.hasClass("players3vB") ? 3 : t.hasClass("players4vB") ? 4 : 8, a = $("#CreateRoomMode").hasClass("gameModeNormal") ? GAME_MODE_NORMAL : $("#CreateRoomMode").hasClass("gameModeSame") ? GAME_MODE_SAME : GAME_MODE_BOSS, e.SendRoomCreate(o, n, t, a)
}

function CreateRoomDialogGUI(e) {
    $("#dialogCreateRoomButtonCancel").click(function() {
        g_graphics_high ? $("#dialogCreateRoom").effect("explode") : $("#dialogCreateRoom").hide(), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#dialogCreateRoomButtonOK").click(function() {
        CreateRoomDialogPressedOK(e), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#CreateRoomPrivateCheckbox").click(function() {
        var e = $("#CreateRoomPrivateCheckbox");
        e.hasClass("checkboxOff") ? (e.removeClass("checkboxOff").addClass("checkboxOn"), $("#CreateRoomPassword").show(), $("#createRoomPasswordInput").focus()) : (e.removeClass("checkboxOn").addClass("checkboxOff"), $("#CreateRoomPassword").hide()), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#CreateRoomNumPlayersPrev").click(function() {
        var e, o = $("#CreateRoomPlayers");
        e = $("#CreateRoomMode").hasClass("gameModeBoss") ? o.hasClass("players1vB") ? "players4vB" : o.hasClass("players2vB") ? "players1vB" : o.hasClass("players3vB") ? "players2vB" : "players3vB" : o.hasClass("players1v1") ? "players4v4" : o.hasClass("players2v2") ? "players1v1" : o.hasClass("players3v3") ? "players2v2" : "players3v3", o.removeClass().addClass(e), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#CreateRoomNumPlayersNext").click(function() {
        var e, o = $("#CreateRoomPlayers");
        e = $("#CreateRoomMode").hasClass("gameModeBoss") ? o.hasClass("players1vB") ? "players2vB" : o.hasClass("players2vB") ? "players3vB" : o.hasClass("players3vB") ? "players4vB" : "players1vB" : o.hasClass("players1v1") ? "players2v2" : o.hasClass("players2v2") ? "players3v3" : o.hasClass("players3v3") ? "players4v4" : "players1v1", o.removeClass().addClass(e), AudioPlay(AUDIO_BUTTON_SELECT2)
    }), $("#CreateRoomModeNext").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), $("#CreateRoomMode").hasClass("gameModeNormal") ? CreateRoomChangeMode(GAME_MODE_BOSS, e.myPlayerInfo.unlock) : $("#CreateRoomMode").hasClass("gameModeBoss") ? CreateRoomChangeMode(GAME_MODE_SAME, e.myPlayerInfo.unlock) : CreateRoomChangeMode(GAME_MODE_NORMAL, e.myPlayerInfo.unlock)
    }), $("#CreateRoomModePrev").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), $("#CreateRoomMode").hasClass("gameModeNormal") ? CreateRoomChangeMode(GAME_MODE_SAME, e.myPlayerInfo.unlock) : $("#CreateRoomMode").hasClass("gameModeBoss") ? CreateRoomChangeMode(GAME_MODE_NORMAL, e.myPlayerInfo.unlock) : CreateRoomChangeMode(GAME_MODE_BOSS, e.myPlayerInfo.unlock)
    })
}

function CreateRoomChangeMode(e, o) {
    var t, a, n, r = $("#CreateRoomMode"),
        s = $("#CreateRoomPlayers");
    e == GAME_MODE_BOSS ? (a = "gameModeBoss", n = s.hasClass("players1v1") ? "players1vB" : s.hasClass("players2v2") ? "players2vB" : s.hasClass("players3v3") ? "players3vB" : "players4vB") : (a = e == GAME_MODE_SAME ? "gameModeSame" : "gameModeNormal", n = s.hasClass("players1v1") ? "players1v1" : s.hasClass("players2v2") ? "players2v2" : s.hasClass("players3v3") ? "players3v3" : s.hasClass("players1vB") ? "players1v1" : s.hasClass("players2vB") ? "players2v2" : s.hasClass("players3vB") ? "players3v3" : "players4v4"), r.removeClass().addClass(a), s.removeClass().addClass(n), $("#CreateRoomModeIcon").removeClass().addClass("iconMode" + a.slice(8)), "gameModeNormal" == a && 1 > o ? ($("#dialogCreateLocked").show(), $("#dialogCreateMessage").html("This mode is locked until you win at BOSS mode as room master."), $("#dialogCreateRoomButtonOK").hide()) : "gameModeSame" == a && 12 > o ? ($("#dialogCreateLocked").show(), $("#dialogCreateMessage").html("This mode is locked until you win *ALL* BOSS mode levels as room master."), $("#dialogCreateRoomButtonOK").hide()) : ($("#dialogCreateLocked").hide(), $("#dialogCreateRoomButtonOK").show(), e == GAME_MODE_NORMAL ? t = "Kill the other team to win." : e == GAME_MODE_BOSS ? t = "Fight computer players at increasing difficulty." : e == GAME_MODE_SAME && (t = "Everyone use the same mobile as the room master."), $("#dialogCreateMessage").html(t))
}

function ChannelChatClear() {
    $("#channelTextHtml").html(""), $("#channel").tinyscrollbar_update("bottom")
}

function BuildPlayerNameWithGuild(e, o, t) {
    return e && (o = t ? '<span class="GuildNameTeam' + t + '">' + e + "</span> " + o : '<span class="GuildName">' + e + "</span> " + o), o
}
var PLAYER_INDEX_USER_ID = 0,
    PLAYER_INDEX_GAME_ID = 1,
    PLAYER_INDEX_RANK = 2,
    PLAYER_INDEX_GUILD = 3,
    PLAYER_INDEX_TEAM = 4,
    PLAYER_INDEX_IS_MASTER = 5,
    PLAYER_INDEX_IS_READY = 6,
    PLAYER_INDEX_GENDER = 7,
    PLAYER_INDEX_MOBILE = 8,
    PLAYER_INDEX_AVATARS = 9,
    PLAYER_INDEX_IS_BOT = 10;

function ChannelUpdatePlayersList(e) {
    TabChangeTo(TAB_ALL);
    for (var o = "", t = 0; t < e.length - 3; t += 4) var a = e[t],
        o = o + ('<div class="playerListItem" id="player_user_id_' + a + '" user_id=' + a + '><div class="playerListRank rank rank' + e[t + 2] + '"></div><div class="playerListName blackShadow">') + BuildPlayerNameWithGuild(e[t + 3], e[t + 1]) + "</div></div>";
    $("#channelPlayersListHtml").html(o), $("#playersList").tinyscrollbar_update("top")
}

function ChannelPlayerJoined(e, o, t) {
    ChannelPlayerLeft(e), $("#channelPlayersListHtml").append('<div class="playerListItem" id="player_user_id_' + e + '" user_id=' + e + '><div class="playerListRank rank rank' + t + '"></div><div class="playerListName blackShadow">' + o + "</div></div>"), $("#playersList").tinyscrollbar_update("relative")
}

function ChannelPlayerLeft(e) {
    $("#player_user_id_" + e).remove(), $("#playersList").tinyscrollbar_update("relative")
}

function TabChangeTo(e) {
    e == TAB_ALL ? ($("#buttonAllBuddyList").removeClass("Guild").removeClass("BuddyList"), $("#friendsList").hide(), $("#guildMembersList").hide()) : e == TAB_FRIENDS ? ($("#buttonAllBuddyList").removeClass("Guild").addClass("BuddyList"), $("#friendsList").show(), $("#guildMembersList").hide(), $("#channelPlayersListHtml").html("")) : e == TAB_GUILD && ($("#buttonAllBuddyList").addClass("Guild").removeClass("BuddyList"), $("#friendsList").hide(), $("#guildMembersList").show(), $("#channelPlayersListHtml").html(""))
}

function GotFullGuildMembersList(e, o) {
    if (RoomTabChangeTo(TAB_GUILD), TabChangeTo(TAB_GUILD), e) {
        var t, a = e[0],
            n = e[1],
            r = "??";
        for (0 == n ? r = "Member" : 1 == n ? r = "Leader" : 2 == n && (r = "Semi-Leader"), t = '<div class="refresh_button_guildies">Refresh Guild List</div><div id="guild_leave" class="opacity_button"></div><div><span class="GuildName blackShadow">' + r + '</span> of Guild:<br><span class="GuildName blackShadow">' + a + '</span><div style="clear: both"></div></div>', a = 2; a < e.length; a++) {
            var s, n = e[a],
                r = n[FRIEND_INDEX_IMAGE];
            0 == n[FRIEND_INDEX_SERVER] ? s = "Offline" : 0 < n[FRIEND_INDEX_SERVER] ? s = "Server " + n[FRIEND_INDEX_SERVER] : 0 > n[FRIEND_INDEX_SERVER] && (s = 0 == n[FRIEND_INDEX_ROOM] ? "Lobby" : "Room: " + n[FRIEND_INDEX_ROOM]), t += '<div id="guild_member_' + n[FRIEND_INDEX_ID] + '" friend="' + n[FRIEND_INDEX_ID] + '" class="guildMemberListItem' + (1 == a % 2 ? " odd" : "") + '"> <div class="friendListPhoto"><img class="friendListPhotoImg" src="' + r + '"></div> <div class="friendListRank rank rank' + n[FRIEND_INDEX_RANK] + '"></div> <div class="friendListName blackShadow">' + n[FRIEND_INDEX_NAME] + '</div> <div class="friendListGP blackShadow">GP ' + n[FRIEND_INDEX_GP] + '</div> <div class="friendListLocation blackShadow">' + s + "</div> </div>"
        }
        $("#guildMembersListHtml").html(t), $("#guildMembersList").tinyscrollbar_update("top"), $(".guildMemberListItem").bind("click", function() {
            $(".guildMemberListItem").removeClass("selected"), $(this).addClass("selected"), ChatDialogCreate($(this).attr("friend"), $(this).children(".friendListName").html(), o)
        }), $("#guild_leave").click(function() {
            DragonDialogOpen("Are You Sure?", "Are you sure you want to leave your guild?", DIALOG_BUTTONS_OK_CANCEL, function(e) {
                e && o.SendGuildLeave()
            })
        }), InitRefreshButtonGuildies(o), UpdateFriendsInRooms()
    } else $("#guildMembersListHtml").html('<br><br>You do not have a guild yet.<br><br>To create a Guild select a name, pay 50,000 Gold, and press the button.<br><br>Guild Name: <input id="create_guild_name"><div id="guild_create" class="opacity_button"></div>'), $("#guild_create").click(function() {
        var e = $("#create_guild_name").val();
        DragonDialogOpen("Are You Sure?", 'Are you sure you want to create the guild: <font color="cyan">' + e + '</font> ?<br><br>By clicking OK you will pay <font color="yellow">50,000 Gold</font> and create the guild.', DIALOG_BUTTONS_OK_CANCEL, function(t) {
            t && o.SendGuildCreate(e)
        })
    })
}
var FRIEND_INDEX_ID = 0,
    FRIEND_INDEX_NAME = 1,
    FRIEND_INDEX_GENDER = 2,
    FRIEND_INDEX_RANK = 3,
    FRIEND_INDEX_GP = 4,
    FRIEND_INDEX_IMAGE = 5,
    FRIEND_INDEX_SERVER = 6,
    FRIEND_INDEX_ROOM = 7,
    g_last_refresh_friends_click = 0,
    g_last_refresh_guildies_click = 0;

function UpdateFriendsList(e, o) {
    RoomTabChangeTo(TAB_FRIENDS), TabChangeTo(TAB_FRIENDS);
    for (var t = '<div class="refresh_button_friends">Refresh Friends List</div>', a = 0; a < e.length; a++) {
        var n, r = e[a],
            s = r[FRIEND_INDEX_IMAGE];
        0 == r[FRIEND_INDEX_SERVER] ? n = "Offline" : 0 < r[FRIEND_INDEX_SERVER] ? n = "Server " + r[FRIEND_INDEX_SERVER] : 0 > r[FRIEND_INDEX_SERVER] && (n = 0 == r[FRIEND_INDEX_ROOM] ? "Lobby" : "Room: " + r[FRIEND_INDEX_ROOM]), t += '<div id="friend_' + r[FRIEND_INDEX_ID] + '" friend="' + r[FRIEND_INDEX_ID] + '" class="friendListItem' + (1 == a % 2 ? " odd" : "") + '"> <div class="friendListPhoto"><img class="friendListPhotoImg" src="' + s + '"></div> <div class="friendListRank rank rank' + r[FRIEND_INDEX_RANK] + '"></div> <div class="friendListName blackShadow">' + r[FRIEND_INDEX_NAME] + '</div> <div class="friendListGP blackShadow">GP ' + r[FRIEND_INDEX_GP] + '</div> <div class="friendListLocation blackShadow">' + n + "</div> </div>"
    }
    $("#friendsListHtml").html(t), $(".friendListItem").bind("click", function() {
        $(".friendListItem").removeClass("selected"), $(this).addClass("selected"), ChatDialogCreate($(this).attr("friend"), $(this).children(".friendListName").html(), o)
    }), InitRefreshButtonFriends(o), $("#friendsList").tinyscrollbar_update("top"), UpdateFriendsInRooms()
}

function InitRefreshButtonFriends(e) {
    $(".refresh_button_friends").bind("click", function() {
        var o = get_time();
        o > g_last_refresh_friends_click + 3e3 && (g_last_refresh_friends_click = o, e.SendRefreshFriends())
    })
}

function InitRefreshButtonGuildies(e) {
    $(".refresh_button_guildies").bind("click", function() {
        var o = get_time();
        o > g_last_refresh_guildies_click + 3e3 && (g_last_refresh_guildies_click = o, e.SendRefreshGuildies())
    })
}

function UpdateFriendsInRooms() {
    var e = [],
        o = [];
    $(".friendListLocation").each(function() {
        var t = $(this),
            a = t.html(); - 1 != a.indexOf("Room: ") && (a = Number(a.substr(6)), -1 != t.parent().attr("id").indexOf("guild") ? o.push(a) : e.push(a))
    }), $("#roomsList > .room").each(function() {
        var t = $(this),
            a = Number(t.children(".roomNumber").html());
        0 < a && (-1 != e.indexOf(a) ? t.children(".roomBuddy").show() : t.children(".roomBuddy").hide(), -1 != o.indexOf(a) ? t.children(".roomGuildMember").show() : t.children(".roomGuildMember").hide())
    })
}

function FriendUpdate(e, o, t, a, n) {
    var r = "Offline";
    a && (r = 0 == n ? "Lobby" : "Room: " + n), (a = $("#friend_" + e)).children(".friendListRank").removeClass().addClass("friendListRank rank rank" + o), a.children(".friendListGP").html("GP " + t), a.children(".friendListLocation").html(r), (e = $("#guild_member_" + e)).children(".friendListRank").removeClass().addClass("friendListRank rank rank" + o), e.children(".friendListGP").html("GP " + t), e.children(".friendListLocation").html(r), UpdateFriendsInRooms()
}

function ChatDialogCreate(e, o, t) {
    0 == $("#chat_" + e).length && ($("#chat_divs").append('<div class="ChatDialog" id="chat_' + e + '" friend=' + e + '><div class="chatDialogName blackShadow">' + o + '</div><div class="chatDialogDelete opacity_button"></div><div class="chatDialogGuildKick opacity_button"></div><div class="chatDialogClose opacity_button"></div><input type="text" class="chatDialogInput" value="" maxlength="150"><div class="chatDialogText"><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="CanSelect overview chatDialogTextHtml"></div></div></div></div>'), (e = $("#chat_" + e)).draggable2(), e.bind("mousedown", function(e) {
        e.stopPropagation()
    }), e.children(".chatDialogText").tinyscrollbar({
        size: 183
    }), e.children(".chatDialogInput").bind("keyup", function(e) {
        13 == e.which && (e.stopPropagation(), "" != (e = $(this).val()) && (t.SendPrivateChat($(this).parent().attr("friend"), e), $(this).val("")))
    }), e.children(".chatDialogClose").click(function(e) {
        $(this).parent().remove(), e.stopPropagation()
    }), e.children(".chatDialogDelete").click(function(e) {
        e.stopPropagation();
        var o = $(this).parent().attr("friend");
        DragonDialogOpen("Delete Friend?", "Are you sure to delete this friend?", DIALOG_BUTTONS_OK_CANCEL, function(e) {
            e && t.SendDeleteFriend(o)
        })
    }), e.children(".chatDialogGuildKick").click(function(e) {
        e.stopPropagation();
        var o = $(this).parent().attr("friend");
        DragonDialogOpen("Kick from Guild?", "Are you sure to kick this player from your guild?", DIALOG_BUTTONS_OK_CANCEL, function(e) {
            e && t.SendGuildKick(o)
        })
    }))
}

function FriendPrivateChat(e, o, t, a) {
    var n = $("#chat_" + e);
    0 == n.length && (ChatDialogCreate(e, o, a), n = $("#chat_" + e)), n.find(".chatDialogTextHtml").append("[" + o + "] " + t + "<br>"), n.children(".chatDialogText").tinyscrollbar_update("bottom")
}

function pad(e, o) {
    for (var t = "" + e; t.length < o;) t = "0" + t;
    return t
}

function ChannelPlayerInfoUpdate(e, o) {
    $("#myName2").html(BuildPlayerNameWithGuild(e.guild, e.game_id)), $("#myRank2").removeClass().addClass("rank rank" + e.rank), $("#myGP2").html(Commatize(e.gp) + " GP"), $("#myCash2").html(Commatize(e.cash) + " Cash"), $("#myGold2").html(Commatize(e.gold) + " Gold"), $("#NameChangeLittle").html("(" + (0 == e.name_changes ? "You have 1 Free name change" : "Name Change costs 4,000 Cash") + ")");
    var t = e.fb,
        t = "" == t ? e.gender == GENDER_FEMALE ? STATIC_DIR + "images/fb_girl.gif" : STATIC_DIR + "images/fb_boy.gif" : t;
    $("#myPhotoImage2").attr("src", t), t = !e.background && e.power_user ? POWER_USER_BACKGROUND : e.background, g_channel_player ? (g_channel_player.change(e.head, AVATAR_TYPE_HEAD), g_channel_player.change(e.body, AVATAR_TYPE_BODY), g_channel_player.change(e.eyes, AVATAR_TYPE_EYES), g_channel_player.change(e.flag, AVATAR_TYPE_FLAG), g_channel_player.change(t, AVATAR_TYPE_BACKGROUND), g_channel_player.change(e.foreground, AVATAR_TYPE_FOREGROUND), void 0 != o && g_channel_player.change_mobile(o)) : g_channel_player = new CPlayerGraphic("#channel_player", void 0 != o ? o : -1, e.head, e.body, e.eyes, e.flag, !1, t, e.foreground), 0 < e.event1 ? $("#event_button .event_button_text").html(pad(Math.floor(e.event1 / 60), 2) + ":" + pad(e.event1 % 60, 2) + "<br>&nbsp;") : $("#event_button .event_button_text").html("+?? Gold"), 0 < e.event2 ? $("#facebook_post .event_button_text").html(pad(Math.floor(e.event2 / 60), 2) + ":" + pad(e.event2 % 60, 2) + "<br>&nbsp;") : $("#facebook_post .event_button_text").html("+?? Cash"), 0 == $("#myName").length && $("#channelScreen").append($('<div id="myName" class="hide"><span>' + RandomString(random(2, 6)) + "</span> " + RandomString(random(2, 12)) + "</div>")).append($('<div id="myRank" class="hide rank' + random(0, 20) + '"></div>')).append($('<div id="myGP" class="hide">' + random(1e3, 3e4) + '"></div>')).append($('<div id="myGold" class="hide">' + random(0, 3e4) + '"></div>')).append($('<div id="myCash" class="hide">' + random(0, 1e3) + '"></div>')).append($('<div id="myPhotoImage" class="hide" src="http://graph.facebook.com/' + random(1e8, 999999999) + '/picture?type=large">' + random(0, 1e3) + '"></div>'))
}

function RoomChangeDetails(e, o) {
    var t = $("#room" + o);
    if (e) {
        var a = e[0],
            n = e[1],
            r = e[2],
            s = e[3],
            d = e[4],
            u = e[5],
            _ = e[6],
            c = e[7],
            h = e[8],
            n = text_filter(n, filtered_words);
        1 == h ? t.addClass("powerUserRoom") : t.removeClass("powerUserRoom"), t.children(".roomNumber").html(a), t.children(".roomTitle").html(n), t.children(".numPlayers").html(r), t.children(".maxPlayers").html(s), a = "", d == ROOM_STATUS_WAITING ? a = "status-waiting" : d == ROOM_STATUS_FULL ? a = "status-full" : d == ROOM_STATUS_PLAYING && (a = "status-playing"), t.children(".status").removeClass().addClass("status " + a), d = "", u == GAME_MODE_NORMAL ? d = "iconModeNormal" : u == GAME_MODE_BOSS ? d = "iconModeBoss" : u == GAME_MODE_SAME && (d = "iconModeSame"), t.children(".gameMode").removeClass().addClass("gameMode " + d), _ ? t.children(".roomLock").addClass("roomLocked") : t.children(".roomLock").removeClass("roomLocked"), c == MAP_CUSTOM ? (u = BooleanArrayToCanvas(DragonDecompress(e[9]), 213, 49, 213, 49), t.children(".roomMap").html("").css("background-position", "999px 999px").append(u)) : t.children(".roomMap").html("").css("background-position", "0 " + (-50 * c - 50) + "px"), t.show(), UpdateFriendsInRooms()
    } else t.hide()
}

function GetRoomDivFromRoomNumber(e) {
    for (var o = 0; 6 > o; o++)
        if ($("#room" + o + " .roomNumber").html() == e) return $("#room" + o)
}

function CloseRoomExtraInfo() {
    g_extra_info_room = void 0, g_extra_info_timeout = clearTimeout(g_extra_info_timeout), $(".roomExtraInfo").removeClass("roomExtraInfo"), $(".roomExtraInfoSlot").remove()
}

function ShowExtraRoomInfo(e) {
    var o = e[0],
        t = GetRoomDivFromRoomNumber(o);
    if (t) {
        CloseRoomExtraInfo(), t.addClass("roomExtraInfo");
        for (var a = 1; a < e.length - 2; a += 3) t.append($('<div class="roomExtraInfoSlot roomExtraInfoSlot' + e[a] + '"><div class="playerListRank rank rank' + e[a + 1] + '"></div><div class="playerListName blackShadow">' + e[a + 2] + "</div></div>"));
        g_extra_info_room = o, g_extra_info_timeout = setTimeout(function() {
            CloseRoomExtraInfo()
        }, 3e3)
    }
}

function SetLobby(e, o) {
    debug && console.log("[SetLobby] server type:", o), 1 == o ? ($("#buttonQuickJoin,#buttonCreateRoom,#buttonJoin,#buttonRoomsListUp,#buttonRoomsListDown,#filter_all,#filter_waiting,#filter_normal,#filter_boss,#filter_same,#filter_friends,#filter_guild,.room").hide(), $("#buttonStart1v1,#lobbyButtonMobile,#tournament_info").show(), $("#channelScreen").css({
        "background-image": "none"
    }), $("body").css({
        "background-image": "url(/static/images/themes/full_bg2.jpg)"
    }), void 0 == e.lobbyMobile && (e.lobbyMobile = MOBILE.RANDOM)) : ($("#buttonQuickJoin,#buttonCreateRoom,#buttonJoin,#buttonRoomsListUp,#buttonRoomsListDown,#filter_all,#filter_waiting,#filter_normal,#filter_boss,#filter_same,#filter_friends,#filter_guild,.room").show(), $("#buttonStart1v1,#lobbyButtonMobile,#tournament_info").hide(), $("#channelScreen").css({
        "background-image": ""
    }), $("body").css({
        "background-image": ""
    }), g_channel_player && g_channel_player.change_mobile())
}

function LobbyChangeMobile(e) {
    debug && console.log("[LobbyChangeMobile] mobile:", e), g_channel_player.change_mobile(e)
}

function TournamentWaitingMsgShow(e) {
    AudioPlay(AUDIO_WAIT);
    var o = l.t("Waiting for an opponent") + '...<div id="hourglass"></div><div id="CancelWaiting" class="cancelwait">Cancel</div>';
    $("#tournament_waiting").html(o).css({
        top: -400
    }).show(), setTimeout(function() {
        $("#tournament_waiting").css({
            top: 40
        })
    }, 1), $("#lobbyButtonMobile").hide(), $("#CancelWaiting").click(function() {
        e.SendCancelTournamentWait(), TournamentWaitingMsgHide()
    })
}

function TournamentWaitingMsgHide() {
    $("#tournament_waiting").html("").hide().css({
        top: -400
    }), 1 == g_server_type && $("#lobbyButtonMobile").show()
}

function SecondsToString(e) {
    var o = "";
    0 > e && (o = " Ago", e *= -1);
    var t = Math.floor(e / 86400),
        a = Math.floor(e % 86400 / 3600),
        n = Math.floor(e % 3600 / 60),
        e = e % 60;
    return t ? t + " " + l.t("Days") + " " + (a ? a + " " + l.t("Hours") : "") + o : a ? a + " " + l.t("Hours") + " " + (n ? n + " " + l.t("Minutes") : "") + o : n ? n + " " + l.t("Minutes") + " " + (e ? e + " " + l.t("Seconds") : "") + o : e ? e + " " + l.t("Seconds") + " " + o : l.t("Now")
}

function SetTournamentInfo(e) {
    e && (SetTournamentInfo2(e), g_t0 = e[0], g_t1 = e[1], g_tournament_timer = clearInterval(g_tournament_timer), 0 < g_t0 && 5e3 > g_t0 || 0 < g_t1 && 5e3 > g_t1) && (g_tournament_timer_start = get_time(), g_tournament_timer = setInterval(function() {
        var o = get_time();
        g_t0 && (e[0] = g_t0 - Math.floor((o - g_tournament_timer_start) / 1e3)), g_t1 && (e[1] = g_t1 - Math.floor((o - g_tournament_timer_start) / 1e3)), SetTournamentInfo2(e)
    }, 1e3))
}

function SetTournamentInfo2(e) {
    o = "Players: " + e[2] / 2 + "v" + e[2] / 2 + "<br>", o += "Avatar: " + (e[3] ? "On" : "Off") + "<br>", o += "Wind: " + e[4] + "<br>", -1 != e[5] && (o += "Mobile: " + MOBILE_NAME[e[5]] + "<br>"), o += "<br>" + l.t("Games Now") + ": " + e[9] + "<br>", o += l.t("Games Last 5 Minutes") + ": " + e[8] + "<br>", o += l.t("Games Since Server Reset") + ": " + e[7] + "<br>", 0 < e[8] && (o += l.t("Average Waiting Time") + ": " + (150 / e[8]).toFixed(1) + " " + l.t("Seconds") + "<br>");
    var o, t = e[0],
        e = e[1];
    0 < t ? (o += "<br>Start Time: " + SecondsToString(t) + "<br>", e && e > t && (o += "Tournament Time: " + SecondsToString(e - t) + "<br>")) : e && (o += "<br>End Time: " + SecondsToString(e) + "<br>"), $("#tournament_info").html(o)
}

function SelectThisResellerButton(e) {
    $(".seller_button").removeClass("buttonGlow"), $(e).addClass("buttonGlow")
}

function ResellersGUI(e) {
    $("#buttonCharge2").click(function() {
        AudioPlay(AUDIO_BUTTON_SELECT2), $("#chargeWindow").show(), "br" == SERVER_TYPE && ($("#resellers_btn").hide(), $("#charge_pin_btn").hide()), $("#charge_myinfo_btn").click()
    }), $("#chargeWindowClose").click(function() {
        $("#chargeWindowPayment").html(""), $("#chargeWindow").hide("slow")
    }), $("#paymentwall_btn").click(function() {
        SelectThisResellerButton(this), $("#chargeWindowPayment").html(l.t("Loading") + "...");
        var o = $("#chargeWindowPayment");
        $.get("/paymentwall_get", {
            u: e.myPlayerInfo.username
        }, function(e) {
            1 >= e.length ? 1 == (e = e[0]) ? o.html("I don't know who you are, please relog to the game.") : 3 == e ? o.html("Different user, please re-login (F5).") : o.html("Error " + e) : o.html('<iframe src="' + e[1] + '" width="750" height="800" frameborder="0"></iframe>')
        }, "json").error(function(e, t, a) {
            o.html("Internet error happened, try again."), console.log("paymentwall_get ERROR:", e, t, a)
        })
    }), $("#ultimatepay_btn").click(function() {
        SelectThisResellerButton(this), $("#chargeWindowPayment").html(l.t("Loading") + "...");
        var e = function() {
            $.get("/playspan_gethash", {}, function(e) {
                if ("E1 - Not Authenticated" == e) $("#chargeWindowPayment").html("I don't know who you are, please relog to the game.");
                else {
                    var o = e.split("|");
                    10 != o.length ? ($("#chargeWindowPayment").html("Weird error happened, try again."), console.log("error at gethash, not enough parts. data=", e)) : (ultimatePayParams = {
                        method: "StartOrderFrontEnd",
                        display: "Lightbox",
                        livemode: "T",
                        currency: "USD",
                        amountdesc: "DragonBound Cash",
                        virtualcurrency: "DCASH",
                        developerid: 1,
                        appid: 1
                    }, e = o[0], ultimatePayParams.userid = "" + e, ultimatePayParams.riskmode = o[2], ultimatePayParams.sn = o[3], ultimatePayParams.hash = o[4], ultimatePayParams.sepamount = 10, ultimatePayParams.fname = o[5], ultimatePayParams.lname = o[6], ultimatePayParams.membersince = o[7], ultimatePayParams.accountname = o[1], ultimatePayParams.email = o[9], $("#chargeWindowPayment").html('<div id="div_b" style="display:none"></div><br>Buying DragonBound Cash for User: <span id="UPforUser">' + e + " - " + o[1] + '</span><br><br>Current DragonBound Cash on your account: <span id="UPmyCash">' + o[8] + '</span> Cash<br><br><a href="http://ultimatepay.custhelp.com" target="_black">Have a problem? UtimatePay Support - http://ultimatepay.custhelp.com</a><br><br><a href="/my_payments" target="_black">Mi historia de recargas + Mi numero ID (My Payments History + My User ID Number)</a><br><br>When you charge cash (with ANY payment method) you will also receive a RARE GIFT:<p><br>1st Charge = Gift "(RARE) Cash Charger" Background Item<p>2nd Charge = Gift "(RARE) Cash Charger 2" Foreground Item<p>3nd Charge = Gift "(RARE) Cash Charger 3" Background Item</div>'), g_init_up || (ulp.ultimatePay = !0, ulp.upLiveUrl = "https://www.ultimatepay.com/app/api/live/?", ulp.on("closeLB", function(e) {
                        ultimatepayPostProcess(e)
                    }), g_init_up = !0), ulp.displayUltimatePay())
                }
            }).error(function(e, o, t) {
                $("#chargeWindowPayment").html("Internet error happened, try again."), console.log("playspan_gethash ERROR:", e, o, t)
            })
        };
        $.pm ? e() : $.getScript("https://static.pbc.com/js/ultimatepay-api.js", function() {
            debug && console.log("UP Loaded"), e()
        })
    }), $("#charge_pin_btn").click(function() {
        SelectThisResellerButton(this), $("#chargeWindowPayment").html('<iframe src="/pin" class="ChargeFrame"></iframe>')
    }), $("#resellers_btn").click(function() {
        SelectThisResellerButton(this), $("#chargeWindowPayment").html('<br> - PRECIOS OFICIALES DE CASH EN PERU - <br><br>18 Soles = 10,000 Cash + Fondo (Monedas de Oro cayendo)<br>34 Soles = 21,000 Cash + Fondo (Monedas de Oro cayendo)<br>66 Soles = 43,000 Cash + Fondo (Monedas de Oro cayendo)<br>97 Soles = 66,000 Cash + Fondo (Monedas de Oro cayendo)<br>200 Soles = 140,000 Cash + Fondo + Foreground (Monedas de Oro cayendo+ $)<br><br>* Muy pronto habr\xe1 ofertas y promociones, porfavor siempre revisen los facebooks de los proveedores por novedades.<br><br><div id="reseller_accordion"><h3>Silkroad Per\xfa</h3><div>Recargas de cash en solo 10 Minutos!<br><br>Los dep\xf3sitos son SOLO por AGENTES BCP \xf3 AGENTES INTERBANK.<br>Cta Agente BCP: 194-25114557-0-38<br>Cta Agente Interbank: 4893-0535-00887<br>Para mas informacion has clic en:<br>Facebook: <a href="https://www.facebook.com/SilkroadPeru" target="_black">facebook.com/SilkroadPeru</a><br><br>Responsable: Victor Ra\xfal Sarco Mamani<br>Movistar: 97855-0695<br>Fijo: 393-2733<br>Email: <a href="mailto:dragonbound2013@hotmail.com">dragonbound2013@hotmail.com</a><br>Atencion Lunes a Domingo 8:00am a 10:00pm<br><br>Clic en el video para que sepas como recargar:<br><a href="http://www.youtube.com/watch?v=W57FR_pxEp4" target="_black">http://www.youtube.com/watch?v=W57FR_pxEp4</a><br></div><h3>MasterCadeM: PERU - BOLIVIA - ARGENTINA</h3><div>Las Recargas mas r\xe1pidas para DragonBound las encuentras con nosotros.<br><br> - EN PERU -<br>Recuerda los dep\xf3sitos son SOLO por AGENTES BCP \xf3 AGENTES INTERBANK.<br>Cta agente BCP: 1931-9613-6600-76<br>Cta agente Interbank: 170-3051-8118-40<br>Para mas informacion has click en:<br>Facebook: <a href="https://www.facebook.com/Recarga.CASH.dragonbound" target="_black">facebook.com/Recarga.CASH.dragonbound</a><br><br> - EN ARGENTINA - tus recargas en pesos argentinos<br>Para mas informacion has click en:<br>Facebook: <a href="https://www.facebook.com/Dragonbound.Cash.Mastercadem.Argentina" target="_black">facebook.com/Dragonbound.Cash.Mastercadem.Argentina</a><br><br> - EN BOLIVIA  - tus recargas en bolivianos<br>Para mas informacion has click en:<br>Facebook: <a href="https://www.facebook.com/Dragonbound.Bolivia.Mastercadem" target="_black">facebook.com/Dragonbound.Bolivia.Mastercadem</a><br><br>Responsable general: Charles Ortiz Brice\xf1o<br>RPM (movistar): #975544437<br>RPC (claro): 986558320<br>Fijo: 01-2912030<br>Email: <a href="mailto:mastercadem@gmail.com">mastercadem@gmail.com</a><br></div><h3>FlechaGLS - dragonbound.org</h3><div>Recargas de Cash 100% seguras para DragonBound en Per\xfa. Ventas especiales tambi\xe9n para Administradores de Cabinas de Internet (CiberCaf\xe9s)<br><br>Dep\xf3sitos SOLO por AGENTES BCP \xf3 AGENTES INTERBANK.<br>N\xb0 de cta. InterBank: 286-3051422301<br>N\xb0 de cta. Banco de Cr\xe9dito BCP: 191-25173925-0-06<br><br>Website: <a href="http://www.dragonbound.org" target="_black">dragonbound.org</a><br>Facebook: <a href="https://www.facebook.com/DragonboundCash" target="_black">facebook.com/DragonboundCash</a><br><br>Responsable: Dyanfield Andres Villanueva L\xf3pez<br>Cel: 943972729<br>Email: <a href="mailto:dragonbound.org@gmail.com">dragonbound.org@gmail.com</a><br></div><h3>GM Kommander</h3><div>SERVICIO DE RECARGAS DE CASH: SENCILLO, R\xc1PIDO Y SEGURO.<br>Los dep\xf3sitos son s\xf3lo por AGENTES BCP \xf3 AGENTES INTERBANK.<br><br>Para mas informacion has click en:<br>Facebook: <a href="https://www.facebook.com/pages/GM-Kommander/473619026023417" target="_black">facebook.com/pages/GM-Kommander/473619026023417</a><br>Cta agente BCP: 1922-5380-6440-13<br>Cta agente Interbank: 122-5380-6440-13<br><br>Responsable: David Sebastian Rodr\xedguez Herrera<br>Claro: 991851540<br>Movistar: 945115556<br>Email: <a href="mailto:gmkommander@gmail.com">gmkommander@gmail.com</a></div><h3>Problemas con el cash? (Cash Problems?)</h3><div>Esperen 5 d\xedas para que el distribuidor pueda procesar sus pagos. No es un proceso autom\xe1tico. Despu\xe9s de eso puedes mandar tu prueba de pago y detalles (EN INGLES) a DN al correo <a href="mailto:complains@dragonbound.net">complains@dragonbound.net</a> y ser\xe1 revisado.<br><br>Wait 5 days so the distributor can process your payment. It is not an automatic process.<br>After that time you can send your payment proof and details (IN ENGLISH) to DN at <a href="mailto:complains@dragonbound.net">complains@dragonbound.net</a> and it will be checked.</div></div><br><a href="/my_payments" target="_black">Mi historia de recargas + Mi numero ID (My Payments History + My User ID Number)</a><br>'), $("#reseller_accordion").accordion({
            active: !1,
            collapsible: !0
        })
    }), $("#charge_myinfo_btn").click(function() {
        SelectThisResellerButton(this), $("#chargeWindowPayment").html('<iframe src="/my_payments" class="ChargeFrame"></iframe>')
    }), $("#charge_bitcoin_btn").click(function() {
        SelectThisResellerButton(this), $("#chargeWindowPayment").html('<iframe src="/bitcoin" class="ChargeFrame"></iframe>')
    })
}

function DragonSocket() {
    this.ws = void 0, this.receive_handlers = [], this.error_handler = this.disconnected_handler = this.connected_handler = void 0
}
DragonSocket.prototype.IsSupported = function() {
        return "undefined" != typeof WebSocket
    }, DragonSocket.prototype.SetHandler = function(e, o) {
        "connected" == e ? this.connected_handler = o : "disconnected" == e ? this.disconnected_handler = o : "error" == e ? this.error_handler = o : "receive" == e && (this.receive_handlers = Object.freeze(o))
    }, DragonSocket.prototype.Connect = function(e, o) {
        this.ws = new WebSocket("ws://localhost:9005");
        var t = this;
        this.ws.onopen = function() {
            t.connected_handler && t.connected_handler()
        }, this.ws.onclose = function() {
            t.disconnected_handler && t.disconnected_handler()
        }, this.ws.onerror = function(e) {
            t.error_handler && t.error_handler(e)
        }, this.ws.onmessage = function(e) {
            try {
                var o = JSON.parse(e.data);
                debug && console.log("[DragonSocket] OnMessage:", o)
            } catch (a) {
                t.error_handler && t.error_handler("Received not JSON: " + e.data);
                return
            }
            void 0 == o.length || 1 > o.length ? t.error_handler && t.error_handler("JSON is not Array: " + o) : (e = o[0], o.shift(), t.receive_handlers[e] ? t.receive_handlers[e].apply(window, o) : t.error_handler && t.error_handler("No handler for opcode:", e, "at packet:", o))
        }
    }, DragonSocket.prototype.Send = function() {
        if (0 != arguments.length) {
            for (var e = [], o = 0; o < arguments.length; o++) e.push(arguments[o]);
            this.ws.send(JSON.stringify(e))
        }
    }, DragonSocket.prototype.Disconnect = function() {
        this.ws.close()
    }, Object.freeze(DragonSocket.prototype),
    function(e, o) {
        var t, a = e.document;
        t = function() {
            var t, n, r, s, d, u, _, c, h, p, m, f, y = {},
                b = {},
                E = !1,
                v = [];
            return b = {
                buttons: {
                    holder: '<nav class="alertify-buttons">{{buttons}}</nav>',
                    submit: '<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',
                    ok: '<a href="#" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</a>',
                    cancel: '<a href="#" class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</a>'
                },
                input: '<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',
                message: '<p class="alertify-message">{{message}}</p>',
                log: '<article class="alertify-log{{class}}">{{message}}</article>'
            }, f = function() {
                var e, t, n = !1,
                    r = a.createElement("fakeelement"),
                    s = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "otransitionend",
                        transition: "transitionend"
                    };
                for (e in s)
                    if (r.style[e] !== o) {
                        t = s[e], n = !0;
                        break
                    } return {
                    type: t,
                    supported: n
                }
            }, t = function(e) {
                return a.getElementById(e)
            }, {
                alert: function(e, o, t) {
                    return y.dialog(e, "alert", o, "", t), this
                },
                confirm: function(e, o, t) {
                    return y.dialog(e, "confirm", o, "", t), this
                },
                extend: (y = {
                    labels: {
                        ok: "OK",
                        cancel: "Cancel"
                    },
                    delay: 5e3,
                    buttonReverse: !1,
                    buttonFocus: "ok",
                    transition: o,
                    addListeners: function(e) {
                        var t, d, u, _, c, h = r !== o,
                            f = n !== o,
                            y = m !== o,
                            b = "",
                            E = this;
                        t = function(t) {
                            return t.preventDefault !== o && t.preventDefault(), u(t), m !== o && (b = m.value), "function" == typeof e && (m !== o ? e(!0, b) : e(!0)), !1
                        }, d = function(t) {
                            return t.preventDefault !== o && t.preventDefault(), u(t), "function" == typeof e && e(!1), !1
                        }, u = function() {
                            E.hide(), E.unbind(a.body, "keyup", _), E.unbind(s, "focus", c), y && E.unbind(p, "submit", t), h && E.unbind(r, "click", t), f && E.unbind(n, "click", d)
                        }, _ = function(e) {
                            var o = e.keyCode;
                            32 !== o || y || t(e), 27 === o && f && d(e)
                        }, c = function() {
                            y ? m.focus() : !f || E.buttonReverse ? r.focus() : n.focus()
                        }, this.bind(s, "focus", c), h && this.bind(r, "click", t), f && this.bind(n, "click", d), this.bind(a.body, "keyup", _), y && this.bind(p, "submit", t), this.transition.supported || this.setFocus()
                    },
                    bind: function(e, o, t) {
                        "function" == typeof e.addEventListener ? e.addEventListener(o, t, !1) : e.attachEvent && e.attachEvent("on" + o, t)
                    },
                    handleErrors: function() {
                        if (e.onerror !== o) {
                            var t = this;
                            return e.onerror = function(e, o, a) {
                                t.error("[" + e + " on line " + a + " of " + o + "]", 0)
                            }, !0
                        }
                        return !1
                    },
                    appendButtons: function(e, o) {
                        return this.buttonReverse ? o + e : e + o
                    },
                    build: function(e) {
                        var o = "",
                            t = e.type,
                            a = e.message,
                            e = e.cssClass || "";
                        switch (o += '<div class="alertify-dialog">', "none" === y.buttonFocus && (o += '<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'), "prompt" === t && (o += '<form id="alertify-form">'), o += '<article class="alertify-inner">', o += b.message.replace("{{message}}", a), "prompt" === t && (o += b.input), o += b.buttons.holder, o += "</article>", "prompt" === t && (o += "</form>"), o += '<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>', o += "</div>", t) {
                            case "confirm":
                                o = (o = o.replace("{{buttons}}", this.appendButtons(b.buttons.cancel, b.buttons.ok))).replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                                break;
                            case "prompt":
                                o = (o = o.replace("{{buttons}}", this.appendButtons(b.buttons.cancel, b.buttons.submit))).replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                                break;
                            case "alert":
                                o = (o = o.replace("{{buttons}}", b.buttons.ok)).replace("{{ok}}", this.labels.ok)
                        }
                        return c.className = "alertify alertify-" + t + " " + e, _.className = "alertify-cover", o
                    },
                    close: function(e, t) {
                        var a, n, r = t && !isNaN(t) ? +t : this.delay,
                            s = this;
                        this.bind(e, "click", function() {
                            a(e)
                        }), n = function(e) {
                            e.stopPropagation(), s.unbind(this, s.transition.type, n), h.removeChild(this), h.hasChildNodes() || (h.className += " alertify-logs-hidden")
                        }, a = function(e) {
                            e !== o && e.parentNode === h && (s.transition.supported ? (s.bind(e, s.transition.type, n), e.className += " alertify-log-hide") : (h.removeChild(e), h.hasChildNodes() || (h.className += " alertify-logs-hidden")))
                        }, 0 !== t && setTimeout(function() {
                            a(e)
                        }, r)
                    },
                    dialog: function(e, t, n, r, s) {
                        u = a.activeElement;
                        var d = function() {
                            h && null !== h.scrollTop && _ && null !== _.scrollTop || d()
                        };
                        if ("string" != typeof e) throw Error("message must be a string");
                        if ("string" != typeof t) throw Error("type must be a string");
                        if (n !== o && "function" != typeof n) throw Error("fn must be a function");
                        return "function" == typeof this.init && (this.init(), d()), v.push({
                            type: t,
                            message: e,
                            callback: n,
                            placeholder: r,
                            cssClass: s
                        }), E || this.setup(), this
                    },
                    extend: function(e) {
                        if ("string" != typeof e) throw Error("extend method must have exactly one paramter");
                        return function(o, t) {
                            return this.log(o, e, t), this
                        }
                    },
                    hide: function() {
                        var e, o = this;
                        v.splice(0, 1), 0 < v.length ? this.setup(!0) : (E = !1, e = function(t) {
                            t.stopPropagation(), c.className += " alertify-isHidden", o.unbind(c, o.transition.type, e)
                        }, this.transition.supported ? (this.bind(c, this.transition.type, e), c.className = "alertify alertify-hide alertify-hidden") : c.className = "alertify alertify-hide alertify-hidden alertify-isHidden", _.className = "alertify-cover alertify-cover-hidden", u.focus())
                    },
                    init: function() {
                        a.createElement("nav"), a.createElement("article"), a.createElement("section"), (_ = a.createElement("div")).setAttribute("id", "alertify-cover"), _.className = "alertify-cover alertify-cover-hidden", a.body.appendChild(_), (c = a.createElement("section")).setAttribute("id", "alertify"), c.className = "alertify alertify-hidden", a.body.appendChild(c), (h = a.createElement("section")).setAttribute("id", "alertify-logs"), h.className = "alertify-logs alertify-logs-hidden", a.body.appendChild(h), a.body.setAttribute("tabindex", "0"), this.transition = f(), delete this.init
                    },
                    log: function(e, o, t) {
                        var a = function() {
                            h && null !== h.scrollTop || a()
                        };
                        return "function" == typeof this.init && (this.init(), a()), h.className = "alertify-logs", this.notify(e, o, t), this
                    },
                    notify: function(e, o, t) {
                        var n = a.createElement("article");
                        n.className = "alertify-log" + ("string" == typeof o && "" !== o ? " alertify-log-" + o : ""), n.innerHTML = e, h.appendChild(n), setTimeout(function() {
                            n.className += " alertify-log-show"
                        }, 50), this.close(n, t)
                    },
                    set: function(e) {
                        var o;
                        if ("object" != typeof e && e instanceof Array) throw Error("args must be an object");
                        for (o in e) e.hasOwnProperty(o) && (this[o] = e[o])
                    },
                    setFocus: function() {
                        m ? (m.focus(), m.select()) : d.focus()
                    },
                    setup: function(e) {
                        var a, u = v[0],
                            _ = this;
                        E = !0, a = function(e) {
                            e.stopPropagation(), _.setFocus(), _.unbind(c, _.transition.type, a)
                        }, this.transition.supported && !e && this.bind(c, this.transition.type, a), c.innerHTML = this.build(u), s = t("alertify-resetFocus"), r = t("alertify-ok") || o, n = t("alertify-cancel") || o, d = "cancel" === y.buttonFocus ? n : "none" === y.buttonFocus ? t("alertify-noneFocus") : r, m = t("alertify-text") || o, p = t("alertify-form") || o, "string" == typeof u.placeholder && "" !== u.placeholder && (m.value = u.placeholder), e && this.setFocus(), this.addListeners(u.callback)
                    },
                    unbind: function(e, o, t) {
                        "function" == typeof e.removeEventListener ? e.removeEventListener(o, t, !1) : e.detachEvent && e.detachEvent("on" + o, t)
                    }
                }).extend,
                init: y.init,
                log: function(e, o, t) {
                    return y.log(e, o, t), this
                },
                prompt: function(e, o, t, a) {
                    return y.dialog(e, "prompt", o, t, a), this
                },
                success: function(e, o) {
                    return y.log(e, "success", o), this
                },
                error: function(e, o) {
                    return y.log(e, "error", o), this
                },
                set: function(e) {
                    y.set(e)
                },
                labels: y.labels,
                debug: y.handleErrors
            }
        }, "function" == typeof define ? define([], function() {
            return new t
        }) : e.alertify === o && (e.alertify = new t)
    }(this);
var io = "undefined" == typeof module ? {} : module.exports;

function DragonVideoButton(e, o) {
    if (g_dragonVideo_on) console.log("[DragonVideo] END"), g_dragonVideo_on = !1, g_dragonVideo.leaveRoom(), $("#DragonVideo").hide(), alertify.log("DragonBound VideoChat Exit - Bye! :)");
    else if (webRTCSupport) {
        console.log("[DragonVideo] START");
        var t = $("#VideoChannelInput").val();
        if (t || (t = o || "" + random(1, 999999), $("#VideoChannelInput").val(t)), console.log("[DragonVideo] room:", t, "user:", e), g_dragonVideo) $("#DragonVideo").show(), alertify.log("Joining VideoChat..."), g_dragonVideo.joinRoom(t, e);
        else {
            alertify.log("Welcome to DragonVideo - Please Allow Camera / Microphone (if doesn't work, reconnect your cam/mic and restart browser)"), $("#localVideo").draggable({
                containment: "body",
                scroll: !1
            }).click(function() {
                $(this).toggleClass("bigVideo")
            });
            var a = new DragonVideo({
                localVideoEl: "localVideo",
                remoteVideosEl: "remotesVideos",
                autoRequestMedia: !0,
                url: "carlosx.byethost15.com" == location.host ? "t.dragonbound.net:9999" : "http://videoserver.dragonbound.net:9999"
            });
            a.on("videoAdded", function(e, o) {
                console.log("[DragonVideo] Video added:", e, o), $(e).parent().draggable({
                    containment: "body",
                    scroll: !1
                }).click(function() {
                    $(this).children().toggleClass("bigVideo")
                }).css({
                    left: window.innerWidth / 2 + random(-200, 50),
                    top: window.innerHeight / 2 + random(-200, 50)
                })
            }), a.on("readyToCall", function(o) {
                console.log("[DragonVideo] readyToCall - my_id:", o), $("#DragonVideo").show(), alertify.log("Cam/Mic Ready :)<br>Drag Video = Move, Click = Size"), a.joinRoom(t, e)
            }), a.on("joined", function(e) {
                console.log("[DragonVideo] joined:", e), alertify.log("Video User Joined: " + EscapeHTML(e))
            }), a.on("left", function(e) {
                console.log("[DragonVideo] left:", e), alertify.log("Video User Left: " + EscapeHTML(e))
            }), a.on("reject", function(e) {
                console.log("[DragonVideo] reject:", e), alertify.log("Can't get your cam/mic, please Allow")
            }), g_dragonVideo = a
        }
        g_dragonVideo_on = !0
    } else alertify.alert("Your browser is not supported - Use latest Chrome/FireFox")
}! function() {
    var a = this,
        b = "object" == typeof module ? module.exports : this.io = {};
    b.version = "0.9.11", b.protocol = 1, b.transports = [], b.j = [], b.sockets = {}, b.connect = function(e, o) {
        var t, n, r = b.util.parseUri(e);
        a && a.location && (r.protocol = r.protocol || a.location.protocol.slice(0, -1), r.host = r.host || (a.document ? a.document.domain : a.location.hostname), r.port = r.port || a.location.port), t = b.util.uniqueUri(r);
        var s = {
            host: r.host,
            secure: "https" == r.protocol,
            port: r.port || ("https" == r.protocol ? 443 : 80),
            query: r.query || ""
        };
        return b.util.merge(s, o), (s["force new connection"] || !b.sockets[t]) && (n = new b.Socket(s)), !s["force new connection"] && n && (b.sockets[t] = n), (n = n || b.sockets[t]).of(1 < r.path.length ? r.path : "")
    };
    var d = this,
        c = (void 0 !== io ? io : module.exports).util = {},
        e = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        f = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");
    c.parseUri = function(o) {
        for (var o = e.exec(o || ""), t = {}, a = 14; a--;) t[f[a]] = o[a] || "";
        return t
    }, c.uniqueUri = function(e) {
        var o = e.protocol,
            t = e.host,
            e = e.port;
        return "document" in d ? (t = t || document.domain, e = e || ("https" == o && "https:" !== document.location.protocol ? 443 : document.location.port)) : (t = t || "localhost", e || "https" != o || (e = 443)), (o || "http") + "://" + t + ":" + (e || 80)
    }, c.query = function(e, o) {
        var t = c.chunkQuery(e || ""),
            a = [];
        for (var n in c.merge(t, c.chunkQuery(o || "")), t) t.hasOwnProperty(n) && a.push(n + "=" + t[n]);
        return a.length ? "?" + a.join("&") : ""
    }, c.chunkQuery = function(e) {
        for (var o, t = {}, e = e.split("&"), a = 0, n = e.length; a < n; ++a)(o = e[a].split("="))[0] && (t[o[0]] = o[1]);
        return t
    };
    var j = !1;
    c.load = function(e) {
        if ("document" in d && "complete" === document.readyState || j) return e();
        c.on(d, "load", e, !1)
    }, c.on = function(e, o, t, a) {
        e.attachEvent ? e.attachEvent("on" + o, t) : e.addEventListener && e.addEventListener(o, t, a)
    }, c.request = function(e) {
        if (e && "undefined" != typeof XDomainRequest && !c.ua.hasCORS) return new XDomainRequest;
        if ("undefined" != typeof XMLHttpRequest && (!e || c.ua.hasCORS)) return new XMLHttpRequest;
        if (!e) try {
            return new window[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")
        } catch (o) {}
        return null
    }, "undefined" != typeof window && c.load(function() {
        j = !0
    }), c.defer = function(e) {
        if (!c.ua.webkit || "undefined" != typeof importScripts) return e();
        c.load(function() {
            setTimeout(e, 100)
        })
    }, c.merge = function(e, o, t, a) {
        var n, a = a || [],
            t = void 0 === t ? 2 : t;
        for (n in o) o.hasOwnProperty(n) && 0 > c.indexOf(a, n) && ("object" == typeof e[n] && t ? c.merge(e[n], o[n], t - 1, a) : (e[n] = o[n], a.push(o[n])));
        return e
    }, c.mixin = function(e, o) {
        c.merge(e.prototype, o.prototype)
    }, c.inherit = function(e, o) {
        function t() {}
        t.prototype = o.prototype, e.prototype = new t
    }, c.isArray = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }, c.intersect = function(e, o) {
        for (var t = [], a = e.length > o.length ? e : o, n = e.length > o.length ? o : e, r = 0, s = n.length; r < s; r++) ~c.indexOf(a, n[r]) && t.push(n[r]);
        return t
    }, c.indexOf = function(e, o, t) {
        for (var a = e.length, t = 0 > t ? 0 > t + a ? 0 : t + a : t || 0; t < a && e[t] !== o; t++);
        return a <= t ? -1 : t
    }, c.toArray = function(e) {
        for (var o = [], t = 0, a = e.length; t < a; t++) o.push(e[t]);
        return o
    }, c.ua = {};
    var k, m = c.ua;
    if (k = "undefined" != typeof XMLHttpRequest) a: {
        try {
            var o = new XMLHttpRequest
        } catch (h) {
            k = !1;
            break a
        }
        k = void 0 != o.withCredentials
    }
    m.hasCORS = k, c.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), c.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent);
    var n = void 0 !== io ? io : module.parent.exports,
        m = function() {};
    (void 0 !== io ? io : module.exports).EventEmitter = m, m.prototype.on = function(e, o) {
            return this.$events || (this.$events = {}), this.$events[e] ? n.util.isArray(this.$events[e]) ? this.$events[e].push(o) : this.$events[e] = [this.$events[e], o] : this.$events[e] = o, this
        }, m.prototype.addListener = m.prototype.on, m.prototype.once = function(e, o) {
            function t() {
                a.removeListener(e, t), o.apply(this, arguments)
            }
            var a = this;
            return t.listener = o, this.on(e, t), this
        }, m.prototype.removeListener = function(e, o) {
            if (this.$events && this.$events[e]) {
                var t = this.$events[e];
                if (n.util.isArray(t)) {
                    for (var a = -1, r = 0, s = t.length; r < s; r++)
                        if (t[r] === o || t[r].listener && t[r].listener === o) {
                            a = r;
                            break
                        } if (0 > a) return this;
                    t.splice(a, 1), t.length || delete this.$events[e]
                } else(t === o || t.listener && t.listener === o) && delete this.$events[e]
            }
            return this
        }, m.prototype.removeAllListeners = function(e) {
            return void 0 === e ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this)
        }, m.prototype.listeners = function(e) {
            return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), n.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e]
        }, m.prototype.emit = function(e) {
            if (!this.$events) return !1;
            var o = this.$events[e];
            if (!o) return !1;
            var t = Array.prototype.slice.call(arguments, 1);
            if ("function" == typeof o) o.apply(this, t);
            else {
                if (!n.util.isArray(o)) return !1;
                for (var o = o.slice(), a = 0, r = o.length; a < r; a++) o[a].apply(this, t)
            }
            return !0
        },
        function(a, b) {
            function c(e) {
                return 10 > e ? "0" + e : e
            }

            function d(e) {
                return k.lastIndex = 0, k.test(e) ? '"' + e.replace(k, function(e) {
                    var t = o[e];
                    return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function e(e, o) {
                var t, a, r, s, u, _ = j,
                    h = o[e];
                switch (h instanceof Date && (h = isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + c(e.getUTCMonth() + 1) + "-" + c(e.getUTCDate()) + "T" + c(e.getUTCHours()) + ":" + c(e.getUTCMinutes()) + ":" + c(e.getUTCSeconds()) + "Z" : null), "function" == typeof n && (h = n.call(o, e, h)), typeof h) {
                    case "string":
                        return d(h);
                    case "number":
                        return isFinite(h) ? String(h) : "null";
                    case "boolean":
                    case "null":
                        return String(h);
                    case "object":
                        if (!h) return "null";
                        if (j += m, u = [], "[object Array]" === Object.prototype.toString.apply(h)) {
                            for (t = 0, s = h.length; t < s; t += 1) u[t] = e(t, h) || "null";
                            return r = 0 === u.length ? "[]" : j ? "[\n" + j + u.join(",\n" + j) + "\n" + _ + "]" : "[" + u.join(",") + "]", j = _, r
                        }
                        if (n && "object" == typeof n)
                            for (t = 0, s = n.length; t < s; t += 1) "string" == typeof n[t] && (r = e(a = n[t], h)) && u.push(d(a) + (j ? ": " : ":") + r);
                        else
                            for (a in h) Object.prototype.hasOwnProperty.call(h, a) && (r = e(a, h)) && u.push(d(a) + (j ? ": " : ":") + r);
                        return r = 0 === u.length ? "{}" : j ? "{\n" + j + u.join(",\n" + j) + "\n" + _ + "}" : "{" + u.join(",") + "}", j = _, r
                }
            }
            "use strict";
            if (b && b.parse) return a.JSON = {
                parse: b.parse,
                stringify: b.stringify
            };
            var j, m, n, f = a.JSON = {},
                h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                k = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                o = {
                    "\b": "\\b",
                    "   ": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                };
            f.stringify = function(o, t, a) {
                var r;
                if (m = j = "", "number" == typeof a)
                    for (r = 0; r < a; r += 1) m += " ";
                else "string" == typeof a && (m = a);
                if (n = t, !t || "function" == typeof t || "object" == typeof t && "number" == typeof t.length) return e("", {
                    "": o
                });
                throw Error("JSON.stringify")
            }, f.parse = function(a, b) {
                function c(e, o) {
                    var t, a, n = e[o];
                    if (n && "object" == typeof n)
                        for (t in n) Object.prototype.hasOwnProperty.call(n, t) && (void 0 !== (a = c(n, t)) ? n[t] = a : delete n[t]);
                    return b.call(e, o, n)
                }
                var d, a = String(a);
                if (h.lastIndex = 0, h.test(a) && (a = a.replace(h, function(e) {
                        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + a + ")"), "function" == typeof b ? c({
                    "": d
                }, "") : d;
                throw SyntaxError("JSON.parse")
            }
        }(void 0 !== io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0);
    var m = void 0 !== io ? io : module.parent.exports,
        p = (void 0 !== io ? io : module.exports).parser = {},
        u = p.packets = "disconnect connect heartbeat message json event ack error noop".split(" "),
        r = p.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
        y = p.advice = ["reconnect"],
        q = m.JSON,
        x = m.util.indexOf;
    p.encodePacket = function(e) {
        var o = x(u, e.type),
            t = e.id || "",
            a = e.endpoint || "",
            n = e.ack,
            s = null;
        switch (e.type) {
            case "error":
                var d = e.reason ? x(r, e.reason) : "",
                    e = e.advice ? x(y, e.advice) : "";
                ("" !== d || "" !== e) && (s = d + ("" !== e ? "+" + e : ""));
                break;
            case "message":
                "" !== e.data && (s = e.data);
                break;
            case "event":
                s = {
                    name: e.name
                }, e.args && e.args.length && (s.args = e.args), s = q.stringify(s);
                break;
            case "json":
                s = q.stringify(e.data);
                break;
            case "connect":
                e.qs && (s = e.qs);
                break;
            case "ack":
                s = e.ackId + (e.args && e.args.length ? "+" + q.stringify(e.args) : "")
        }
        return o = [o, t + ("data" == n ? "+" : ""), a], null != s && o.push(s), o.join(":")
    }, p.encodePayload = function(e) {
        var o = "";
        if (1 == e.length) return e[0];
        for (var t = 0, a = e.length; t < a; t++) o += "�" + e[t].length + "�" + e[t];
        return o
    };
    var A = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
    p.decodePacket = function(e) {
        var o = e.match(A);
        if (!o) return {};
        var t = o[2] || "",
            e = o[5] || "",
            a = {
                type: u[o[1]],
                endpoint: o[4] || ""
            };
        switch (t && (a.id = t, o[3] ? a.ack = "data" : a.ack = !0), a.type) {
            case "error":
                o = e.split("+"), a.reason = r[o[0]] || "", a.advice = y[o[1]] || "";
                break;
            case "message":
                a.data = e || "";
                break;
            case "event":
                try {
                    var n = q.parse(e);
                    a.name = n.name, a.args = n.args
                } catch (s) {}
                a.args = a.args || [];
                break;
            case "json":
                try {
                    a.data = q.parse(e)
                } catch (d) {}
                break;
            case "connect":
                a.qs = e || "";
                break;
            case "ack":
                if ((o = e.match(/^([0-9]+)(\+)?(.*)/)) && (a.ackId = o[1], a.args = [], o[3])) try {
                    a.args = o[3] ? q.parse(o[3]) : []
                } catch (_) {}
        }
        return a
    }, p.decodePayload = function(e) {
        if ("�" == e.charAt(0)) {
            for (var o = [], t = 1, a = ""; t < e.length; t++) "�" == e.charAt(t) ? (o.push(p.decodePacket(e.substr(t + 1).substr(0, a))), t += Number(a) + 1, a = "") : a += e.charAt(t);
            return o
        }
        return [p.decodePacket(e)]
    };
    var B = void 0 !== io ? io : module.parent.exports,
        m = function(e, o) {
            this.socket = e, this.sessid = o
        };
    (void 0 !== io ? io : module.exports).Transport = m, B.util.mixin(m, B.EventEmitter), m.prototype.heartbeats = function() {
        return !0
    }, m.prototype.onData = function(e) {
        if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== e && (e = B.parser.decodePayload(e)) && e.length)
            for (var o = 0, t = e.length; o < t; o++) this.onPacket(e[o]);
        return this
    }, m.prototype.onPacket = function(e) {
        return this.socket.setHeartbeatTimeout(), "heartbeat" == e.type ? this.onHeartbeat() : ("connect" == e.type && "" == e.endpoint && this.onConnect(), "error" == e.type && "reconnect" == e.advice && (this.isOpen = !1), this.socket.onPacket(e), this)
    }, m.prototype.setCloseTimeout = function() {
        if (!this.closeTimeout) {
            var e = this;
            this.closeTimeout = setTimeout(function() {
                e.onDisconnect()
            }, this.socket.closeTimeout)
        }
    }, m.prototype.onDisconnect = function() {
        return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
    }, m.prototype.onConnect = function() {
        return this.socket.onConnect(), this
    }, m.prototype.clearCloseTimeout = function() {
        this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
    }, m.prototype.clearTimeouts = function() {
        this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
    }, m.prototype.packet = function(e) {
        this.send(B.parser.encodePacket(e))
    }, m.prototype.onHeartbeat = function() {
        this.packet({
            type: "heartbeat"
        })
    }, m.prototype.onOpen = function() {
        this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
    }, m.prototype.onClose = function() {
        this.isOpen = !1, this.socket.onClose(), this.onDisconnect()
    }, m.prototype.prepareUrl = function() {
        var e = this.socket.options;
        return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + B.protocol + "/" + this.name + "/" + this.sessid
    }, m.prototype.ready = function(e, o) {
        o.call(this)
    };
    var s = void 0 !== io ? io : module.parent.exports,
        K = this,
        m = function(e) {
            if (this.options = {
                    port: 80,
                    secure: !1,
                    document: "document" in K && document,
                    resource: "socket.io",
                    transports: s.transports,
                    "connect timeout": 1e4,
                    "try multiple transports": !0,
                    reconnect: !0,
                    "reconnection delay": 500,
                    "reconnection limit": 1 / 0,
                    "reopen delay": 3e3,
                    "max reconnection attempts": 10,
                    "sync disconnect on unload": !1,
                    "auto connect": !0,
                    "flash policy port": 10843,
                    manualFlush: !1
                }, s.util.merge(this.options, e), this.reconnecting = this.connecting = this.open = this.connected = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || s.util.ua.hasCORS)) {
                var o = this;
                s.util.on(K, "beforeunload", function() {
                    o.disconnectSync()
                }, !1)
            }
            this.options["auto connect"] && this.connect()
        },
        L = function() {};
    (void 0 !== io ? io : module.exports).Socket = m, s.util.mixin(m, s.EventEmitter), m.prototype.of = function(e) {
        return this.namespaces[e] || (this.namespaces[e] = new s.SocketNamespace(this, e), "" !== e && this.namespaces[e].packet({
            type: "connect"
        })), this.namespaces[e]
    }, m.prototype.publish = function() {
        var e, o;
        for (o in this.emit.apply(this, arguments), this.namespaces) this.namespaces.hasOwnProperty(o) && (e = this.of(o)).$emit.apply(e, arguments)
    }, m.prototype.handshake = function(e) {
        function o(o) {
            o instanceof Error ? (t.connecting = !1, t.onError(o.message)) : e.apply(null, o.split(":"))
        }
        var t = this,
            a = this.options,
            a = ["http" + (a.secure ? "s" : "") + ":/", a.host + ":" + a.port, a.resource, s.protocol, s.util.query(this.options.query, "t=" + +new Date)].join("/");
        if (this.isXDomain() && !s.util.ua.hasCORS) {
            var n = document.getElementsByTagName("script")[0],
                r = document.createElement("script");
            r.src = a + "&jsonp=" + s.j.length, n.parentNode.insertBefore(r, n), s.j.push(function(e) {
                o(e), r.parentNode.removeChild(r)
            })
        } else {
            var d = s.util.request();
            d.open("GET", a, !0), this.isXDomain() && (d.withCredentials = !0), d.onreadystatechange = function() {
                4 != d.readyState || (d.onreadystatechange = L, 200 == d.status ? o(d.responseText) : 403 == d.status ? t.onError(d.responseText) : (t.connecting = !1, t.reconnecting || t.onError(d.responseText)))
            }, d.send(null)
        }
    }, m.prototype.getTransport = function(e) {
        for (var o, e = e || this.transports, t = 0; o = e[t]; t++)
            if (s.Transport[o] && s.Transport[o].check(this) && (!this.isXDomain() || s.Transport[o].xdomainCheck(this))) return new s.Transport[o](this, this.sessionid);
        return null
    }, m.prototype.connect = function(e) {
        if (this.connecting) return this;
        var o = this;
        return o.connecting = !0, this.handshake(function(t, a, n, r) {
            function d(e) {
                if (o.transport && o.transport.clearTimeouts(), o.transport = o.getTransport(e), !o.transport) return o.publish("connect_failed");
                o.transport.ready(o, function() {
                    o.connecting = !0, o.publish("connecting", o.transport.name), o.transport.open(), o.options["connect timeout"] && (o.connectTimeoutTimer = setTimeout(function() {
                        if (!o.connected && (o.connecting = !1, o.options["try multiple transports"])) {
                            for (var e = o.transports; 0 < e.length && e.splice(0, 1)[0] != o.transport.name;);
                            e.length ? d(e) : o.publish("connect_failed")
                        }
                    }, o.options["connect timeout"]))
                })
            }
            o.sessionid = t, o.closeTimeout = 1e3 * n, o.heartbeatTimeout = 1e3 * a, o.transports || (o.transports = o.origTransports = r ? s.util.intersect(r.split(","), o.options.transports) : o.options.transports), o.setHeartbeatTimeout(), d(o.transports), o.once("connect", function() {
                clearTimeout(o.connectTimeoutTimer), e && "function" == typeof e && e()
            })
        }), this
    }, m.prototype.setHeartbeatTimeout = function() {
        if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
            var e = this;
            this.heartbeatTimeoutTimer = setTimeout(function() {
                e.transport.onClose()
            }, this.heartbeatTimeout)
        }
    }, m.prototype.packet = function(e) {
        return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this
    }, m.prototype.setBuffer = function(e) {
        this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
    }, m.prototype.flushBuffer = function() {
        this.transport.payload(this.buffer), this.buffer = []
    }, m.prototype.disconnect = function() {
        return (this.connected || this.connecting) && (this.open && this.of("").packet({
            type: "disconnect"
        }), this.onDisconnect("booted")), this
    }, m.prototype.disconnectSync = function() {
        var e = s.util.request(),
            o = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, s.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
        e.open("GET", o, !1), e.send(null), this.onDisconnect("booted")
    }, m.prototype.isXDomain = function() {
        var e = K.location.port || ("https:" == K.location.protocol ? 443 : 80);
        return this.options.host !== K.location.hostname || this.options.port != e
    }, m.prototype.onConnect = function() {
        this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
    }, m.prototype.onOpen = function() {
        this.open = !0
    }, m.prototype.onClose = function() {
        this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
    }, m.prototype.onPacket = function(e) {
        this.of(e.endpoint).onPacket(e)
    }, m.prototype.onError = function(e) {
        e && e.advice && "reconnect" === e.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e)
    }, m.prototype.onDisconnect = function(e) {
        var o = this.connected,
            t = this.connecting;
        this.open = this.connecting = this.connected = !1, (o || t) && (this.transport.close(), this.transport.clearTimeouts(), o && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect()))
    }, m.prototype.reconnect = function() {
        function e() {
            if (t.connected) {
                for (var e in t.namespaces) t.namespaces.hasOwnProperty(e) && "" !== e && t.namespaces[e].packet({
                    type: "connect"
                });
                t.publish("reconnect", t.transport.name, t.reconnectionAttempts)
            }
            clearTimeout(t.reconnectionTimer), t.removeListener("connect_failed", o), t.removeListener("connect", o), t.reconnecting = !1, delete t.reconnectionAttempts, delete t.reconnectionDelay, delete t.reconnectionTimer, delete t.redoTransports, t.options["try multiple transports"] = n
        }

        function o() {
            if (t.reconnecting) {
                if (t.connected) return e();
                if (t.connecting && t.reconnecting) return t.reconnectionTimer = setTimeout(o, 1e3);
                t.reconnectionAttempts++ >= a ? t.redoTransports ? (t.publish("reconnect_failed"), e()) : (t.on("connect_failed", o), t.options["try multiple transports"] = !0, t.transports = t.origTransports, t.transport = t.getTransport(), t.redoTransports = !0, t.connect()) : (t.reconnectionDelay < r && (t.reconnectionDelay *= 2), t.connect(), t.publish("reconnecting", t.reconnectionDelay, t.reconnectionAttempts), t.reconnectionTimer = setTimeout(o, t.reconnectionDelay))
            }
        }
        this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
        var t = this,
            a = this.options["max reconnection attempts"],
            n = this.options["try multiple transports"],
            r = this.options["reconnection limit"];
        this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(o, this.reconnectionDelay), this.on("connect", o)
    };
    var Q = void 0 !== io ? io : module.parent.exports,
        m = function(e, o) {
            this.socket = e, this.name = o || "", this.flags = {}, this.json = new E(this, "json"), this.ackPackets = 0, this.acks = {}
        },
        E = function(e, o) {
            this.namespace = e, this.name = o
        };
    (void 0 !== io ? io : module.exports).SocketNamespace = m, Q.util.mixin(m, Q.EventEmitter), m.prototype.$emit = Q.EventEmitter.prototype.emit, m.prototype.of = function() {
        return this.socket.of.apply(this.socket, arguments)
    }, m.prototype.packet = function(e) {
        return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this
    }, m.prototype.send = function(e, o) {
        var t = {
            type: this.flags.json ? "json" : "message",
            data: e
        };
        return "function" == typeof o && (t.id = ++this.ackPackets, t.ack = !0, this.acks[t.id] = o), this.packet(t)
    }, m.prototype.emit = function(e) {
        var o = Array.prototype.slice.call(arguments, 1),
            t = o[o.length - 1],
            a = {
                type: "event",
                name: e
            };
        return "function" == typeof t && (a.id = ++this.ackPackets, a.ack = "data", this.acks[a.id] = t, o = o.slice(0, o.length - 1)), a.args = o, this.packet(a)
    }, m.prototype.disconnect = function() {
        return "" === this.name ? this.socket.disconnect() : (this.packet({
            type: "disconnect"
        }), this.$emit("disconnect")), this
    }, m.prototype.onPacket = function(e) {
        function o() {
            t.packet({
                type: "ack",
                args: Q.util.toArray(arguments),
                ackId: e.id
            })
        }
        var t = this;
        switch (e.type) {
            case "connect":
                this.$emit("connect");
                break;
            case "disconnect":
                "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
                break;
            case "message":
            case "json":
                var a = ["message", e.data];
                "data" == e.ack ? a.push(o) : e.ack && this.packet({
                    type: "ack",
                    ackId: e.id
                }), this.$emit.apply(this, a);
                break;
            case "event":
                a = [e.name].concat(e.args), "data" == e.ack && a.push(o), this.$emit.apply(this, a);
                break;
            case "ack":
                this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                break;
            case "error":
                e.advice ? this.socket.onError(e) : "unauthorized" == e.reason ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason)
        }
    }, E.prototype.send = function() {
        this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
    }, E.prototype.emit = function() {
        this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
    };
    var M = void 0 !== io ? io : module.parent.exports,
        N = this,
        m = function(e) {
            M.Transport.apply(this, arguments)
        };
    (void 0 !== io ? io.Transport : module.exports).websocket = m, M.util.inherit(m, M.Transport), m.prototype.name = "websocket", m.prototype.open = function() {
        var e, o = M.util.query(this.socket.options.query),
            t = this;
        return e || (e = N.MozWebSocket || N.WebSocket), this.websocket = new e(this.prepareUrl() + o), this.websocket.onopen = function() {
            t.onOpen(), t.socket.setBuffer(!1)
        }, this.websocket.onmessage = function(e) {
            t.onData(e.data)
        }, this.websocket.onclose = function() {
            t.onClose(), t.socket.setBuffer(!0)
        }, this.websocket.onerror = function(e) {
            t.onError(e)
        }, this
    }, M.util.ua.iDevice ? m.prototype.send = function(e) {
        var o = this;
        return setTimeout(function() {
            o.websocket.send(e)
        }, 0), this
    } : m.prototype.send = function(e) {
        return this.websocket.send(e), this
    }, m.prototype.payload = function(e) {
        for (var o = 0, t = e.length; o < t; o++) this.packet(e[o]);
        return this
    }, m.prototype.close = function() {
        return this.websocket.close(), this
    }, m.prototype.onError = function(e) {
        this.socket.onError(e)
    }, m.prototype.scheme = function() {
        return this.socket.options.secure ? "wss" : "ws"
    }, m.check = function() {
        return "WebSocket" in N && !("__addTask" in WebSocket) || "MozWebSocket" in N
    }, m.xdomainCheck = function() {
        return !0
    }, M.transports.push("websocket");
    var I = void 0 !== io ? io : module.parent.exports,
        C = function() {
            I.Transport.websocket.apply(this, arguments)
        };
    if ((void 0 !== io ? io.Transport : module.exports).flashsocket = C, I.util.inherit(C, I.Transport.websocket), C.prototype.name = "flashsocket", C.prototype.open = function() {
            var e = this,
                o = arguments;
            return WebSocket.__addTask(function() {
                I.Transport.websocket.prototype.open.apply(e, o)
            }), this
        }, C.prototype.send = function() {
            var e = this,
                o = arguments;
            return WebSocket.__addTask(function() {
                I.Transport.websocket.prototype.send.apply(e, o)
            }), this
        }, C.prototype.close = function() {
            return WebSocket.__tasks.length = 0, I.Transport.websocket.prototype.close.call(this), this
        }, C.prototype.ready = function(e, o) {
            function t() {
                var t = e.options,
                    n = t["flash policy port"],
                    r = ["http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf"];
                C.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = r.join("/")), 843 !== n && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + n), WebSocket.__initialize(), C.loaded = !0), o.call(a)
            }
            var a = this;
            if (document.body) return t();
            I.util.load(t)
        }, C.check = function() {
            return !!("undefined" != typeof WebSocket && "__initialize" in WebSocket) && !!Y && 10 <= Y.getFlashPlayerVersion().major
        }, C.xdomainCheck = function() {
            return !0
        }, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), I.transports.push("flashsocket"), "undefined" != typeof window) {
        var Y, fa = function() {
                if (!ja) {
                    try {
                        var e = v.getElementsByTagName("body")[0].appendChild(v.createElement("span"));
                        e.parentNode.removeChild(e)
                    } catch (o) {
                        return
                    }
                    ja = !0;
                    for (var e = T.length, t = 0; t < e; t++) T[t]()
                }
            },
            Ea = function(e) {
                ja ? e() : T[T.length] = e
            },
            m = function(e) {
                if (typeof S.addEventListener != D) S.addEventListener("load", e, !1);
                else if (typeof v.addEventListener != D) v.addEventListener("load", e, !1);
                else if (typeof S.attachEvent != D) {
                    var o = S;
                    o.attachEvent("onload", e), ha[ha.length] = [o, "onload", e]
                } else if ("function" == typeof S.onload) {
                    var t = S.onload;
                    S.onload = function() {
                        t(), e()
                    }
                } else S.onload = e
            },
            na = function() {
                var e = aa.length;
                if (0 < e)
                    for (var o = 0; o < e; o++) {
                        var a = aa[o].id,
                            n = aa[o].callbackFn,
                            r = {
                                success: !1,
                                id: a
                            };
                        if (0 < t.pv[0]) {
                            var s = R(a);
                            if (s) {
                                if (wa(aa[o].swfVersion) && !(t.wk && 312 > t.wk)) Z(a, !0), n && (r.success = !0, r.ref = oa(a), n(r));
                                else if (aa[o].expressInstall && pa()) {
                                    (r = {}).data = aa[o].expressInstall, r.width = s.getAttribute("width") || "0", r.height = s.getAttribute("height") || "0", s.getAttribute("class") && (r.styleclass = s.getAttribute("class")), s.getAttribute("align") && (r.align = s.getAttribute("align"));
                                    for (var d = {}, s = s.getElementsByTagName("param"), u = s.length, _ = 0; _ < u; _++) "movie" != s[_].getAttribute("name").toLowerCase() && (d[s[_].getAttribute("name")] = s[_].getAttribute("value"));
                                    Fa(r, d, a, n)
                                } else La(s), n && n(r)
                            }
                        } else Z(a, !0), n && ((a = oa(a)) && typeof a.SetVariable != D && (r.success = !0, r.ref = a), n(r))
                    }
            },
            oa = function(e) {
                var o = null;
                return (e = R(e)) && "OBJECT" == e.nodeName && (typeof e.SetVariable != D ? o = e : (e = e.getElementsByTagName(W)[0]) && (o = e)), o
            },
            pa = function() {
                return !Ca && wa("6.0.65") && (t.win || t.mac) && !(t.wk && 312 > t.wk)
            },
            Fa = function(e, o, a, n) {
                Ca = !0, F = n || null, xa = {
                    success: !1,
                    id: a
                };
                var r = R(a);
                r && ("OBJECT" == r.nodeName ? (qa = ua(r), ia = null) : (qa = r, ia = a), e.id = Ba, (typeof e.width == D || !/%$/.test(e.width) && 310 > parseInt(e.width, 10)) && (e.width = "310"), (typeof e.height == D || !/%$/.test(e.height) && 137 > parseInt(e.height, 10)) && (e.height = "137"), v.title = v.title.slice(0, 47) + " - Flash Player Installation", n = t.ie && t.win ? ["Active"].concat("").join("X") : "PlugIn", n = "MMredirectURL=" + S.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + n + "&MMdoctitle=" + v.title, typeof o.flashvars != D ? o.flashvars += "&" + n : o.flashvars = n, t.ie && t.win && 4 != r.readyState && (n = v.createElement("div"), a += "SWFObjectNew", n.setAttribute("id", a), r.parentNode.insertBefore(n, r), r.style.display = "none", function() {
                    4 == r.readyState ? r.parentNode.removeChild(r) : setTimeout(arguments.callee, 10)
                }()), va(e, o, a))
            },
            La = function(e) {
                if (t.ie && t.win && 4 != e.readyState) {
                    var o = v.createElement("div");
                    e.parentNode.insertBefore(o, e), o.parentNode.replaceChild(ua(e), o), e.style.display = "none",
                        function() {
                            4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                        }()
                } else e.parentNode.replaceChild(ua(e), e)
            },
            ua = function(e) {
                var o = v.createElement("div");
                if (t.win && t.ie) o.innerHTML = e.innerHTML;
                else if ((e = e.getElementsByTagName(W)[0]) && (e = e.childNodes))
                    for (var a = e.length, n = 0; n < a; n++)(1 != e[n].nodeType || "PARAM" != e[n].nodeName) && 8 != e[n].nodeType && o.appendChild(e[n].cloneNode(!0));
                return o
            },
            va = function(e, o, a) {
                var n, r = R(a);
                if (t.wk && 312 > t.wk) return n;
                if (r) {
                    if (typeof e.id == D && (e.id = a), t.ie && t.win) {
                        var s, d = "";
                        for (s in e) e[s] != Object.prototype[s] && ("data" == s.toLowerCase() ? o.movie = e[s] : "styleclass" == s.toLowerCase() ? d += ' class="' + e[s] + '"' : "classid" != s.toLowerCase() && (d += " " + s + '="' + e[s] + '"'));
                        for (var u in s = "", o) o[u] != Object.prototype[u] && (s += '<param name="' + u + '" value="' + o[u] + '" />');
                        r.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + d + ">" + s + "</object>", ga[ga.length] = e.id, n = R(e.id)
                    } else {
                        for (var _ in (u = v.createElement(W)).setAttribute("type", Aa), e) e[_] != Object.prototype[_] && ("styleclass" == _.toLowerCase() ? u.setAttribute("class", e[_]) : "classid" != _.toLowerCase() && u.setAttribute(_, e[_]));
                        for (d in o) o[d] != Object.prototype[d] && "movie" != d.toLowerCase() && (e = u, s = d, _ = o[d], (a = v.createElement("param")).setAttribute("name", s), a.setAttribute("value", _), e.appendChild(a));
                        r.parentNode.replaceChild(u, r), n = u
                    }
                }
                return n
            },
            sa = function(e) {
                var o = R(e);
                o && "OBJECT" == o.nodeName && (t.ie && t.win ? (o.style.display = "none", function() {
                    if (4 == o.readyState) {
                        var a = R(e);
                        if (a) {
                            for (var n in a) "function" == typeof a[n] && (a[n] = null);
                            a.parentNode.removeChild(a)
                        }
                    } else setTimeout(arguments.callee, 10)
                }()) : o.parentNode.removeChild(o))
            },
            R = function(e) {
                var o = null;
                try {
                    o = v.getElementById(e)
                } catch (t) {}
                return o
            },
            wa = function(e) {
                var o = t.pv,
                    e = e.split(".");
                return e[0] = parseInt(e[0], 10), e[1] = parseInt(e[1], 10) || 0, e[2] = parseInt(e[2], 10) || 0, o[0] > e[0] || o[0] == e[0] && o[1] > e[1] || o[0] == e[0] && o[1] == e[1] && o[2] >= e[2]
            },
            Ga = function(e, o, a, n) {
                if (!t.ie || !t.mac) {
                    var r = v.getElementsByTagName("head")[0];
                    r && (a = a && "string" == typeof a ? a : "screen", n && (ba = null, Ia = null), ba && Ia == a || ((n = v.createElement("style")).setAttribute("type", "text/css"), n.setAttribute("media", a), ba = r.appendChild(n), t.ie && t.win && typeof v.styleSheets != D && 0 < v.styleSheets.length && (ba = v.styleSheets[v.styleSheets.length - 1]), Ia = a), t.ie && t.win ? ba && typeof ba.addRule == W && ba.addRule(e, o) : ba && typeof v.createTextNode != D && ba.appendChild(v.createTextNode(e + " {" + o + "}")))
                }
            },
            Z = function(e, o) {
                if (Da) {
                    var t = o ? "visible" : "hidden";
                    ja && R(e) ? R(e).style.visibility = t : Ga("#" + e, "visibility:" + t)
                }
            },
            ta = function(e) {
                return null != /[\\\"<>\.;]/.exec(e) && typeof encodeURIComponent != D ? encodeURIComponent(e) : e
            },
            D = "undefined",
            W = "object",
            Aa = "application/x-shockwave-flash",
            Ba = "SWFObjectExprInst",
            S = window,
            v = document;
        k = navigator;
        var qa, ia, F, xa, ba, Ia, t, Ha = !1,
            T = [function() {
                if (Ha) {
                    var e = v.getElementsByTagName("body")[0],
                        o = v.createElement(W);
                    o.setAttribute("type", Aa);
                    var a = e.appendChild(o);
                    if (a) {
                        var n = 0;
                        ! function() {
                            if (typeof a.GetVariable != D) {
                                var r = a.GetVariable("$version");
                                r && (r = r.split(" ")[1].split(","), t.pv = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)])
                            } else if (10 > n) {
                                n++, setTimeout(arguments.callee, 10);
                                return
                            }
                            e.removeChild(o), a = null, na()
                        }()
                    } else na()
                } else na()
            }],
            aa = [],
            ga = [],
            ha = [],
            ja = !1,
            Ca = !1,
            Da = !0,
            o = typeof v.getElementById != D && typeof v.getElementsByTagName != D && typeof v.createElement != D,
            ka = k.userAgent.toLowerCase(),
            O = k.platform.toLowerCase(),
            Ma = O ? /win/.test(O) : /win/.test(ka),
            O = O ? /mac/.test(O) : /mac/.test(ka),
            ka = !!/webkit/.test(ka) && parseFloat(ka.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")),
            ya = !1,
            la = [0, 0, 0],
            G = null;
        if (typeof k.plugins != D && typeof k.plugins["Shockwave Flash"] == W)(G = k.plugins["Shockwave Flash"].description) && (typeof k.mimeTypes == D || !k.mimeTypes[Aa] || k.mimeTypes[Aa].enabledPlugin) && (Ha = !0, ya = !1, G = G.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), la[0] = parseInt(G.replace(/^(.*)\..*$/, "$1"), 10), la[1] = parseInt(G.replace(/^.*\.(.*)\s.*$/, "$1"), 10), la[2] = /[a-zA-Z]/.test(G) ? parseInt(G.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
        else if (typeof S[["Active"].concat("Object").join("X")] != D) try {
            var z = new window[["Active"].concat("Object").join("X")]("ShockwaveFlash.ShockwaveFlash");
            z && (G = z.GetVariable("$version")) && (ya = !0, G = G.split(" ")[1].split(","), la = [parseInt(G[0], 10), parseInt(G[1], 10), parseInt(G[2], 10)])
        } catch (Na) {}(t = {
            w3: o,
            pv: la,
            wk: ka,
            ie: ya,
            win: Ma,
            mac: O
        }).w3 && ((typeof v.readyState != D && "complete" == v.readyState || typeof v.readyState == D && (v.getElementsByTagName("body")[0] || v.body)) && fa(), ja || (typeof v.addEventListener != D && v.addEventListener("DOMContentLoaded", fa, !1), t.ie && t.win && (v.attachEvent("onreadystatechange", function() {
            "complete" == v.readyState && (v.detachEvent("onreadystatechange", arguments.callee), fa())
        }), S == top && function() {
            if (!ja) {
                try {
                    v.documentElement.doScroll("left")
                } catch (e) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                fa()
            }
        }()), t.wk && function() {
            ja || (/loaded|complete/.test(v.readyState) ? fa() : setTimeout(arguments.callee, 0))
        }(), m(fa))), t.ie && t.win && window.attachEvent("onunload", function() {
            for (var e = ha.length, o = 0; o < e; o++) ha[o][0].detachEvent(ha[o][1], ha[o][2]);
            for (o = 0, e = ga.length; o < e; o++) sa(ga[o]);
            for (var a in t) t[a] = null;
            for (var n in t = null, Y) Y[n] = null;
            Y = null
        }), Y = {
            registerObject: function(e, o, a, n) {
                if (t.w3 && e && o) {
                    var r = {};
                    r.id = e, r.swfVersion = o, r.expressInstall = a, r.callbackFn = n, aa[aa.length] = r, Z(e, !1)
                } else n && n({
                    success: !1,
                    id: e
                })
            },
            getObjectById: function(e) {
                if (t.w3) return oa(e)
            },
            embedSWF: function(e, o, a, n, r, s, d, u, _, c) {
                var h = {
                    success: !1,
                    id: o
                };
                t.w3 && !(t.wk && t.wk < 312) && e && o && a && n && r ? (Z(o, !1), Ea(function() {
                    a += "", n += "";
                    var p = {};
                    if (_ && typeof _ === W)
                        for (var m in _) p[m] = _[m];
                    if (p.data = e, p.width = a, p.height = n, m = {}, u && typeof u === W)
                        for (var f in u) m[f] = u[f];
                    if (d && typeof d === W)
                        for (var y in d) typeof m.flashvars != D ? m.flashvars = m.flashvars + ("&" + y) + "=" + d[y] : m.flashvars = y + "=" + d[y];
                    if (wa(r)) f = va(p, m, o), p.id == o && Z(o, !0), h.success = !0, h.ref = f;
                    else {
                        if (s && pa()) {
                            p.data = s, Fa(p, m, o, c);
                            return
                        }
                        Z(o, !0)
                    }
                    c && c(h)
                })) : c && c(h)
            },
            switchOffAutoHideShow: function() {
                Da = !1
            },
            ua: t,
            getFlashPlayerVersion: function() {
                return {
                    major: t.pv[0],
                    minor: t.pv[1],
                    release: t.pv[2]
                }
            },
            hasFlashPlayerVersion: wa,
            createSWF: function(e, o, a) {
                return t.w3 ? va(e, o, a) : void 0
            },
            showExpressInstall: function(e, o, a, n) {
                t.w3 && pa() && Fa(e, o, a, n)
            },
            removeSWF: function(e) {
                t.w3 && sa(e)
            },
            createCSS: function(e, o, a, n) {
                t.w3 && Ga(e, o, a, n)
            },
            addDomLoadEvent: Ea,
            addLoadEvent: m,
            getQueryParamValue: function(e) {
                var o = v.location.search || v.location.hash;
                if (o) {
                    if (/\?/.test(o) && (o = o.split("?")[1]), null == e) return ta(o);
                    for (var o = o.split("&"), t = 0; t < o.length; t++)
                        if (o[t].substring(0, o[t].indexOf("=")) == e) return ta(o[t].substring(o[t].indexOf("=") + 1))
                }
                return ""
            },
            expressInstallCallback: function() {
                if (Ca) {
                    var e = R(Ba);
                    e && qa && (e.parentNode.replaceChild(qa, e), ia && (Z(ia, !0), t.ie && t.win && (qa.style.display = "block")), F && F(xa)), Ca = !1
                }
            }
        }
    }
    if (!("undefined" == typeof window || window.WebSocket)) {
        var U = window.console;
        U && U.log && U.error || (U = {
            log: function() {},
            error: function() {}
        }), Y.hasFlashPlayerVersion("10.0.0") ? ("file:" == location.protocol && U.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), (WebSocket = function(e, o, t, a, n) {
            var r = this;
            r.__id = WebSocket.__nextId++, WebSocket.__instances[r.__id] = r, r.readyState = WebSocket.CONNECTING, r.bufferedAmount = 0, r.__events = {}, o ? "string" == typeof o && (o = [o]) : o = [], setTimeout(function() {
                WebSocket.__addTask(function() {
                    WebSocket.__flash.create(r.__id, e, o, t || null, a || 0, n || null)
                })
            }, 0)
        }).prototype.send = function(e) {
            if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
            return 0 > (e = WebSocket.__flash.send(this.__id, encodeURIComponent(e))) || (this.bufferedAmount += e, !1)
        }, WebSocket.prototype.close = function() {
            this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING || (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
        }, WebSocket.prototype.addEventListener = function(e, o) {
            e in this.__events || (this.__events[e] = []), this.__events[e].push(o)
        }, WebSocket.prototype.removeEventListener = function(e, o) {
            if (e in this.__events) {
                for (var t = this.__events[e], a = t.length - 1; 0 <= a; --a)
                    if (t[a] === o) {
                        t.splice(a, 1);
                        break
                    }
            }
        }, WebSocket.prototype.dispatchEvent = function(e) {
            for (var o = this.__events[e.type] || [], t = 0; t < o.length; ++t) o[t](e);
            (o = this["on" + e.type]) && o(e)
        }, WebSocket.prototype.__handleEvent = function(e) {
            if ("readyState" in e && (this.readyState = e.readyState), "protocol" in e && (this.protocol = e.protocol), "open" == e.type || "error" == e.type) e = this.__createSimpleEvent(e.type);
            else if ("close" == e.type) e = this.__createSimpleEvent("close");
            else {
                if ("message" != e.type) throw "unknown event type: " + e.type;
                e = decodeURIComponent(e.message), e = this.__createMessageEvent("message", e)
            }
            this.dispatchEvent(e)
        }, WebSocket.prototype.__createSimpleEvent = function(e) {
            if (document.createEvent && window.Event) {
                var o = document.createEvent("Event");
                return o.initEvent(e, !1, !1), o
            }
            return {
                type: e,
                bubbles: !1,
                cancelable: !1
            }
        }, WebSocket.prototype.__createMessageEvent = function(e, o) {
            if (document.createEvent && window.MessageEvent && !window.opera) {
                var t = document.createEvent("MessageEvent");
                return t.initMessageEvent("message", !1, !1, o, null, null, window, null), t
            }
            return {
                type: e,
                data: o,
                bubbles: !1,
                cancelable: !1
            }
        }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(e) {
            WebSocket.__addTask(function() {
                WebSocket.__flash.loadManualPolicyFile(e)
            })
        }, WebSocket.__initialize = function() {
            if (!WebSocket.__flash) {
                if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), window.WEB_SOCKET_SWF_LOCATION) {
                    var e = document.createElement("div");
                    e.id = "webSocketContainer", e.style.position = "absolute", WebSocket.__isFlashLite() ? (e.style.left = "0px", e.style.top = "0px") : (e.style.left = "-100px", e.style.top = "-100px");
                    var o = document.createElement("div");
                    o.id = "webSocketFlash", e.appendChild(o), document.body.appendChild(e), Y.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                        hasPriority: !0,
                        swliveconnect: !0,
                        allowScriptAccess: "always"
                    }, null, function(e) {
                        e.success || U.error("[WebSocket] swfobject.embedSWF failed")
                    })
                } else U.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf")
            }
        }, WebSocket.__onFlashInitialized = function() {
            setTimeout(function() {
                WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                for (var e = 0; e < WebSocket.__tasks.length; ++e) WebSocket.__tasks[e]();
                WebSocket.__tasks = []
            }, 0)
        }, WebSocket.__onFlashEvent = function() {
            return setTimeout(function() {
                try {
                    for (var e = WebSocket.__flash.receiveEvents(), o = 0; o < e.length; ++o) WebSocket.__instances[e[o].webSocketId].__handleEvent(e[o])
                } catch (t) {
                    U.error(t)
                }
            }, 0), !0
        }, WebSocket.__log = function(e) {
            U.log(decodeURIComponent(e))
        }, WebSocket.__error = function(e) {
            U.error(decodeURIComponent(e))
        }, WebSocket.__addTask = function(e) {
            WebSocket.__flash ? e() : WebSocket.__tasks.push(e)
        }, WebSocket.__isFlashLite = function() {
            if (!window.navigator || !window.navigator.mimeTypes) return !1;
            var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
            return !!e && !!e.enabledPlugin && !!e.enabledPlugin.filename && !!e.enabledPlugin.filename.match(/flashlite/i)
        }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
            WebSocket.__initialize()
        }, !1) : window.attachEvent("onload", function() {
            WebSocket.__initialize()
        }))) : U.error("Flash Player >= 10.0.0 is required.")
    }
    var H = void 0 !== io ? io : module.parent.exports,
        Ja = this,
        J = function(e) {
            e && (H.Transport.apply(this, arguments), this.sendBuffer = [])
        },
        X = function() {};
    (void 0 !== io ? io.Transport : module.exports).XHR = J, H.util.inherit(J, H.Transport), J.prototype.open = function() {
        return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
    }, J.prototype.payload = function(e) {
        for (var o = [], t = 0, a = e.length; t < a; t++) o.push(H.parser.encodePacket(e[t]));
        this.send(H.parser.encodePayload(o))
    }, J.prototype.send = function(e) {
        return this.post(e), this
    }, J.prototype.post = function(e) {
        function o() {
            4 == this.readyState && (this.onreadystatechange = X, a.posting = !1, 200 == this.status ? a.socket.setBuffer(!1) : a.onClose())
        }

        function t() {
            this.onload = X, a.socket.setBuffer(!1)
        }
        var a = this;
        this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), Ja.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = t : this.sendXHR.onreadystatechange = o, this.sendXHR.send(e)
    }, J.prototype.close = function() {
        return this.onClose(), this
    }, J.prototype.request = function(e) {
        var o = H.util.request(this.socket.isXDomain()),
            t = H.util.query(this.socket.options.query, "t=" + +new Date);
        if (o.open(e || "GET", this.prepareUrl() + t, !0), "POST" == e) try {
            o.setRequestHeader ? o.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : o.contentType = "text/plain"
        } catch (a) {}
        return o
    }, J.prototype.scheme = function() {
        return this.socket.options.secure ? "https" : "http"
    }, J.check = function(e, o) {
        try {
            var t = H.util.request(o),
                a = Ja.XDomainRequest && t instanceof XDomainRequest,
                n = e && e.options && e.options.secure ? "https:" : "http:",
                r = Ja.location && n != Ja.location.protocol;
            if (t && (!a || !r)) return !0
        } catch (s) {}
        return !1
    }, J.xdomainCheck = function(e) {
        return J.check(e, !0)
    };
    var ca = void 0 !== io ? io : module.parent.exports,
        z = function(e) {
            ca.Transport.XHR.apply(this, arguments)
        };
    (void 0 !== io ? io.Transport : module.exports).htmlfile = z, ca.util.inherit(z, ca.Transport.XHR), z.prototype.name = "htmlfile", z.prototype.get = function() {
        this.doc = new window[["Active"].concat("Object").join("X")]("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
        var e = this.doc.createElement("div");
        e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe);
        var o = this,
            e = ca.util.query(this.socket.options.query, "t=" + +new Date);
        this.iframe.src = this.prepareUrl() + e, ca.util.on(window, "unload", function() {
            o.destroy()
        })
    }, z.prototype._ = function(e, o) {
        this.onData(e);
        try {
            var t = o.getElementsByTagName("script")[0];
            t.parentNode.removeChild(t)
        } catch (a) {}
    }, z.prototype.destroy = function() {
        if (this.iframe) {
            try {
                this.iframe.src = "about:blank"
            } catch (e) {}
            this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
        }
    }, z.prototype.close = function() {
        return this.destroy(), ca.Transport.XHR.prototype.close.call(this)
    }, z.check = function(e) {
        if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window) try {
            return new window[["Active"].concat("Object").join("X")]("htmlfile"), ca.Transport.XHR.check(e)
        } catch (o) {}
        return !1
    }, z.xdomainCheck = function() {
        return !1
    }, ca.transports.push("htmlfile");
    var da = void 0 !== io ? io : module.parent.exports,
        ma = this,
        z = function() {
            da.Transport.XHR.apply(this, arguments)
        },
        Ka = function() {};
    (void 0 !== io ? io.Transport : module.exports)["xhr-polling"] = z, da.util.inherit(z, da.Transport.XHR), da.util.merge(z, da.Transport.XHR), z.prototype.name = "xhr-polling", z.prototype.heartbeats = function() {
        return !1
    }, z.prototype.open = function() {
        return da.Transport.XHR.prototype.open.call(this), !1
    }, z.prototype.get = function() {
        function e() {
            4 == this.readyState && (this.onreadystatechange = Ka, 200 == this.status ? (a.onData(this.responseText), a.get()) : a.onClose())
        }

        function o() {
            this.onerror = this.onload = Ka, a.retryCounter = 1, a.onData(this.responseText), a.get()
        }

        function t() {
            a.retryCounter++, !a.retryCounter || 3 < a.retryCounter ? a.onClose() : a.get()
        }
        if (this.isOpen) {
            var a = this;
            this.xhr = this.request(), ma.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = o, this.xhr.onerror = t) : this.xhr.onreadystatechange = e, this.xhr.send(null)
        }
    }, z.prototype.onClose = function() {
        if (da.Transport.XHR.prototype.onClose.call(this), this.xhr) {
            this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = Ka;
            try {
                this.xhr.abort()
            } catch (e) {}
            this.xhr = null
        }
    }, z.prototype.ready = function(e, o) {
        var t = this;
        da.util.defer(function() {
            o.call(t)
        })
    }, da.transports.push("xhr-polling");
    var V = void 0 !== io ? io : module.parent.exports,
        ea = this,
        z = function(e) {
            V.Transport["xhr-polling"].apply(this, arguments), this.index = V.j.length;
            var o = this;
            V.j.push(function(e) {
                o._(e)
            })
        },
        Oa = ea.document && "MozAppearance" in ea.document.documentElement.style;
    (void 0 !== io ? io.Transport : module.exports)["jsonp-polling"] = z, V.util.inherit(z, V.Transport["xhr-polling"]), z.prototype.name = "jsonp-polling", z.prototype.post = function(e) {
        function o() {
            t(), a.socket.setBuffer(!1)
        }

        function t() {
            a.iframe && a.form.removeChild(a.iframe);
            try {
                r = document.createElement('<iframe name="' + a.iframeId + '">')
            } catch (e) {
                (r = document.createElement("iframe")).name = a.iframeId
            }
            r.id = a.iframeId, a.form.appendChild(r), a.iframe = r
        }
        var a = this,
            n = V.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
        if (!this.form) {
            var r, s = document.createElement("form"),
                d = document.createElement("textarea"),
                u = this.iframeId = "socketio_iframe_" + this.index;
            s.className = "socketio", s.style.position = "absolute", s.style.top = "0px", s.style.left = "0px", s.style.display = "none", s.target = u, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), d.name = "d", s.appendChild(d), document.body.appendChild(s), this.form = s, this.area = d
        }
        this.form.action = this.prepareUrl() + n, t(), this.area.value = V.JSON.stringify(e);
        try {
            this.form.submit()
        } catch (_) {}
        this.iframe.attachEvent ? r.onreadystatechange = function() {
            "complete" == a.iframe.readyState && o()
        } : this.iframe.onload = o, this.socket.setBuffer(!0)
    }, z.prototype.get = function() {
        var e = this,
            o = document.createElement("script"),
            t = V.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), o.async = !0, o.src = this.prepareUrl() + t, o.onerror = function() {
            e.onClose()
        }, (t = document.getElementsByTagName("script")[0]).parentNode.insertBefore(o, t), this.script = o, Oa && setTimeout(function() {
            var e = document.createElement("iframe");
            document.body.appendChild(e), document.body.removeChild(e)
        }, 100)
    }, z.prototype._ = function(e) {
        return this.onData(e), this.isOpen && this.get(), this
    }, z.prototype.ready = function(e, o) {
        var t = this;
        if (!Oa) return o.call(this);
        V.util.load(function() {
            o.call(t)
        })
    }, z.check = function() {
        return "document" in ea
    }, z.xdomainCheck = function() {
        return !0
    }, V.transports.push("jsonp-polling"), "function" == typeof define && define.amd && define([], function() {
        return io
    })
}(),
function() {
    function e() {
        this.callbacks = {}
    }

    function o(e) {
        var o, n, r = this,
            e = e || {};
        for (o in this.config = {
                url: "http://signaling.simplewebrtc.com:8888",
                log: !1,
                localVideoEl: "",
                remoteVideosEl: "",
                autoRequestMedia: !1,
                peerConnectionConfig: {
                    iceServers: "firefox" == d ? [{
                        url: "stun:124.124.124.2"
                    }] : [{
                        url: "stun:stun.l.google.com:19302"
                    }]
                },
                peerConnectionContraints: {
                    optional: [{
                        DtlsSrtpKeyAgreement: !0
                    }]
                },
                media: {
                    audio: !0,
                    video: {
                        mandatory: {},
                        optional: []
                    }
                }
            }, e) this.config[o] = e[o];
        webRTCSupport || console.error("Your browser doesn't seem to support WebRTC"), this.config.log && (a = console), this.pcs = {};
        var u = this;
        (n = this.connection = io.connect(this.config.url)).on("connect", function() {
            r.emit("ready", n.socket.sessionid), r.sessionReady = !0, r.testReadiness()
        }), n.on("message", function(e) {
            var o = r.pcs[e.from];
            o ? o.handleMessage(e) : (r.pcs[e.from] = new t({
                id: e.from,
                parent: r,
                initiator: !1,
                name: e.from_name
            }), r.pcs[e.from].handleMessage(e))
        }), n.on("joined", function(e, o, t, a) {
            r.pcs[o] || r.startVideoCall(o, t), u.emit("joined", t, a)
        }), n.on("left", function(e) {
            (e = r.pcs[e]) && (e.handleStreamRemoved(), u.emit("left", e.name))
        }), this.callbacks = {}, this.on("*", function(e, o, t) {
            a.log("event:", e, o, t)
        }), window.user_media_stream ? (s(this.getLocalVideoContainer(), window.user_media_stream), this.localStream = window.user_media_stream, this.testReadiness()) : this.config.autoRequestMedia && this.startLocalVideo()
    }

    function t(e) {
        var o = this;
        this.id = e.id, this.name = e.name, this.parent = e.parent, this.initiator = e.initiator, this.pc = new n(this.parent.config.peerConnectionConfig, this.parent.config.peerConnectionContraints), this.pc.onicecandidate = this.onIceCandidate.bind(this), this.pc.addStream(this.parent.localStream), this.pc.onaddstream = this.handleRemoteStreamAdded.bind(this), this.pc.onremovestream = this.handleStreamRemoved.bind(this), this.mediaConstraints = {
            mandatory: {
                OfferToReceiveAudio: !0,
                OfferToReceiveVideo: !0
            }
        }, this.callbacks = {}, this.on("*", function(e, t) {
            o.parent.emit(e, t, o)
        })
    }
    var a = {
            log: function() {},
            warn: function() {},
            error: function() {}
        },
        n = null,
        r = null,
        s = null,
        d = null;
    webRTCSupport = !0, navigator.mozGetUserMedia ? (a.log("This appears to be Firefox"), d = "firefox", n = mozRTCPeerConnection, RTCSessionDescription = mozRTCSessionDescription, RTCIceCandidate = mozRTCIceCandidate, r = navigator.mozGetUserMedia.bind(navigator), s = function(e, o) {
        e.mozSrcObject = o, e.play()
    }, MediaStream.prototype.getVideoTracks = function() {
        return []
    }, MediaStream.prototype.getAudioTracks = function() {
        return []
    }) : navigator.webkitGetUserMedia ? (d = "chrome", n = webkitRTCPeerConnection, r = navigator.webkitGetUserMedia.bind(navigator), s = function(e, o) {
        e.autoplay = !0, e.src = webkitURL.createObjectURL(o)
    }, webkitMediaStream.prototype.getVideoTracks || (webkitMediaStream.prototype.getVideoTracks = function() {
        return this.videoTracks
    }, webkitMediaStream.prototype.getAudioTracks = function() {
        return this.audioTracks
    }), webkitRTCPeerConnection.prototype.getLocalStreams || (webkitRTCPeerConnection.prototype.getLocalStreams = function() {
        return this.localStreams
    }, webkitRTCPeerConnection.prototype.getRemoteStreams = function() {
        return this.remoteStreams
    })) : webRTCSupport = !1, window.webRTCSupport = webRTCSupport, e.prototype.on = function(e, o, t) {
        var a = 3 === arguments.length,
            n = a ? arguments[2] : arguments[1];
        return n._groupName = a ? arguments[1] : void 0, (this.callbacks[e] = this.callbacks[e] || []).push(n), this
    }, e.prototype.once = function(e, o) {
        function t() {
            a.off(e, t), o.apply(this, arguments)
        }
        var a = this;
        return this.on(e, t), this
    }, e.prototype.releaseGroup = function(e) {
        var o, t, a, n;
        for (o in this.callbacks)
            for (n = this.callbacks[o], t = 0, a = n.length; t < a; t++) n[t]._groupName === e && (n.splice(t, 1), t--, a--);
        return this
    }, e.prototype.off = function(e, o) {
        var t, a = this.callbacks[e];
        return a ? 1 === arguments.length ? (delete this.callbacks[e], this) : (t = a.indexOf(o), a.splice(t, 1), this) : this
    }, e.prototype.emit = function(e) {
        var o, t, a = [].slice.call(arguments, 1),
            n = this.callbacks[e],
            r = this.getWildcardCallbacks(e);
        if (n)
            for (o = 0, t = n.length; o < t; ++o) n[o].apply(this, a);
        if (r)
            for (o = 0, t = r.length; o < t; ++o) r[o].apply(this, [e].concat(a));
        return this
    }, e.prototype.getWildcardCallbacks = function(e) {
        var o, t, a = [];
        for (o in this.callbacks) t = o.split("*"), ("*" === o || 2 === t.length && e.slice(0, t[1].length) === t[1]) && (a = a.concat(this.callbacks[o]));
        return a
    }, o.prototype = Object.create(e.prototype, {
        constructor: {
            value: o
        }
    }), o.prototype.getEl = function(e) {
        return "string" == typeof e ? document.getElementById(e) : e
    }, o.prototype.getLocalVideoContainer = function() {
        var e = this.getEl(this.config.localVideoEl);
        if (e && "VIDEO" === e.tagName) return e;
        var o = document.createElement("video");
        return e.appendChild(o), o
    }, o.prototype.getRemoteVideoContainer = function() {
        return this.getEl(this.config.remoteVideosEl)
    }, o.prototype.startVideoCall = function(e, o) {
        this.pcs[e] = new t({
            id: e,
            parent: this,
            initiator: !0,
            name: o
        }), this.pcs[e].start()
    }, o.prototype.createRoom = function(e, o) {
        2 === arguments.length ? this.connection.emit("create", e, o) : this.connection.emit("create", e)
    }, o.prototype.joinRoom = function(e, o) {
        this.connection.emit("join", e, o), this.roomName = e
    }, o.prototype.leaveRoom = function() {
        if (this.roomName)
            for (var e in this.connection.emit("leave", this.roomName), this.pcs) this.pcs[e].end()
    }, o.prototype.testReadiness = function() {
        var e = this;
        this.localStream && this.sessionReady && setTimeout(function() {
            e.emit("readyToCall", e.connection.socket.sessionid)
        }, 500)
    }, o.prototype.startLocalVideo = function(e) {
        var o = this;
        r(this.config.media, function(t) {
            window.user_media_stream = t, s(e || o.getLocalVideoContainer(), t), o.localStream = t, o.testReadiness()
        }, function(e) {
            throw o.emit("reject", e), Error("Failed to get access to local media.", e)
        })
    }, o.prototype.send = function(e, o, t) {
        this.connection.emit("message", {
            to: e,
            type: o,
            payload: t
        })
    }, o.prototype.changeName = function(e) {
        this.connection.emit("changeName", e)
    }, t.prototype = Object.create(e.prototype, {
        constructor: {
            value: t
        }
    }), t.prototype.handleMessage = function(e) {
        "offer" === e.type ? (a.log("setting remote description"), this.pc.setRemoteDescription(new RTCSessionDescription(e.payload)), this.answer()) : "answer" === e.type ? this.pc.setRemoteDescription(new RTCSessionDescription(e.payload)) : "candidate" === e.type && (e = new RTCIceCandidate({
            sdpMLineIndex: e.payload.label,
            candidate: e.payload.candidate
        }), this.pc.addIceCandidate(e))
    }, t.prototype.send = function(e, o) {
        this.parent.send(this.id, e, o)
    }, t.prototype.onIceCandidate = function(e) {
        this.closed || (e.candidate ? this.send("candidate", {
            label: e.candidate.sdpMLineIndex,
            id: e.candidate.sdpMid,
            candidate: e.candidate.candidate
        }) : a.log("End of candidates."))
    }, t.prototype.start = function() {
        var e = this;
        this.pc.createOffer(function(o) {
            a.log("setting local description"), e.pc.setLocalDescription(o), a.log("sending offer", o), e.send("offer", o)
        }, null, this.mediaConstraints)
    }, t.prototype.end = function() {
        this.pc.close(), this.handleStreamRemoved()
    }, t.prototype.answer = function() {
        var e = this;
        a.log("answer called"), this.pc.createAnswer(function(o) {
            a.log("setting local description"), e.pc.setLocalDescription(o), a.log("sending answer", o), e.send("answer", o)
        }, null, this.mediaConstraints)
    }, t.prototype.handleRemoteStreamAdded = function(e) {
        var o = this.name,
            e = this.stream = e.stream,
            o = $('<div class="vframe"><div class="vname NoSelect">' + o + "</div></div>"),
            t = document.createElement("video"),
            a = $("#remotesVideos");
        t.id = this.id, s(t, e), o.append(t), a && a.append(o), this.emit("videoAdded", t, this.name)
    }, t.prototype.handleStreamRemoved = function() {
        var e = $("#" + this.id);
        e.parent().remove(), this.emit("videoRemoved", e), delete this.parent.pcs[this.id], this.closed = !0
    }, window.DragonVideo = o
}();