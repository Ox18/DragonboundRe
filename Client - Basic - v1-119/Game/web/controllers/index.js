var express = require('express'),
    router = express.Router();
var mysql = require('mysql2/promise');
var Logger = require('../../game/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var geoip = require('geoip-lite');

/*
router.use('/guild', require('./guild'));*/


router.use('/user', require('./user'));
router.use('/api', require('./api'));
router.use('/f', require('./facebook'));
/*router.use('/settings', require('./userctl.js'));*/

router.get('/', function (req, res) {
    res.render('index', {});
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/login', function (req, res) {
    res.render('login', {});
});

router.get('/test', function (req, res) {
    res.redirect('/');
});

router.get('/rr', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var data = [];
    req.db.connection.getConnection().then(conn => {
        conn.query('SELECT u.game_id, u.gp, u.rank, g.Name FROM users u LEFT JOIN guild_member m ON m.UserId = u.IdAcc LEFT JOIN guild g ON g.Id = m.Id ORDER BY u.gp DESC limit 0, 29')
            .then(rows => {
                conn.release();
                if (rows.length > 0) {
                    let res0 = rows[0];
                    data.push("1");
                    data.push(1);
                    for (var u in res0) {
                        data.push(res0[u].gp, res0[u].rank, res0[u].game_id, res0[u].Name ? res0[u].Name : "");
                    }
                    res.send(JSON.stringify(data));
                } else {
                    res.send(JSON.stringify([0]));
                }
            });
    });
});

router.get('/ri', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var level = [1484523031262, [1100, 1200, 1500, 1800, 2300, 2800, 3500, 4200, 5100, 6000, 6900, 10042, 15001, 22933, 36938, 64408, 108652, 178473, 283636, 547281, 1629122, 10187573, 14516538, 18555634],
        ["!", "!", "!", "!", "!", 135302, 135077, 163494, 114707, 78796, 58187, 149628, 134666, 119702, 104740, 89776, 59852, 44888, 22444, 14963, 6733, 748, 16, 4, 1, 0, 0, 0, 0, 0, 0, 0],
        [80, 62, 46, 32, 20, 12, 6, 3, 1, 0.1]
    ];
    res.send(JSON.stringify(level));
});

router.get('/s', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (req.session) {
        if (req.session.account_id) {
            req.session.touch();
            var acc_id = req.session.account_id;
            var rank = req.session.rank;
            var acc_session = req.session.acc_session;
            res.send(JSON.stringify([acc_id, rank, 0, acc_session, 'DN', 0]));
        } else {
            res.send(JSON.stringify([0]));
        }
    } else {
        res.send(JSON.stringify([0]));
    }
});

router.get('/f', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify([0]));
});

router.post('/f', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify([0]));
});

router.post('/g', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    req.session.destroy();
    res.send(JSON.stringify([0]));
});

router.post('/ajaxLogin', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var valid_enter = true;
    /*var valid_enter = false;*/
    /*if (req.headers.origin !== "null") {
        if ((req.headers.origin == "http://localhost:8080" || req.headers.origin == "http://www.localhost:8080") || (req.headers.host == "localhost:8080" || req.headers.host == "www.localhost:8080")) {
            valid_enter = true;
        }
    }*/
    if (!valid_enter) {
        Logger.debug("flood " + req.headers.origin + " " + req.headers.host);
        res.status(500).send('Ip Banned!');
        return null;
    }
    var ip = req.headers['x-forwarded-for'];
    var country;
    if (ip) {
        var tmpip = ip.split(',');
        var geo = geoip.lookup(tmpip[0]);
        if (geo)
            country = geo.country;
    }
    var user = req.body.u;
    var password = req.body.p;
    Logger.log("'" + user + "' " + req.body.r);
    if (Buffer.byteLength(user, 'utf8') < 2 || Buffer.byteLength(user, 'utf8') > 30) {
        res.send(JSON.stringify(["Nombre de Usuario incorrecto!"]));
    } else {
        req.db.getAccountByUsername(user)
            .then(function (rows) {
                var data = rows[0][0];
                if (data.Password === password) {
                    req.db.getUserByIdAcc(data.Id)
                        .then(function (rows2) {
                            if (rows2[0].length > 0) {
                                var res1 = rows2[0][0];
                                req.session.cookie.expires = false;
                                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 10));
                                req.session.account_id = data.Id;
                                req.session.rank = res1.rank;
                                req.session.acc_session = data.Session;
                                req.session.game_id = res1.game_id;
                                Logger.log("Login: " + res1.game_id);
                                res.send(JSON.stringify([data.Id, res1.rank, 0, data.Session, country, 0]));
                            } else {
                                res.send(JSON.stringify([0]));
                            }
                        })
                        .catch(function (err) {
                            res.send(JSON.stringify([0]));
                        });
                } else {
                    Logger.log("'" + user + "' password error " + data.Password + " " + password);
                    res.send(JSON.stringify([0]));
                }
            })
            .catch(function (err) {
                res.send(JSON.stringify([0]));
            });
    }
});

router.post('/ajaxRegister', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var valid_enter = true;
    /*var valid_enter = false;*/
    /*if (req.headers.origin !== "null") {
        if ((req.headers.origin == "http://localhost:8080" || req.headers.origin == "http://www.localhost:8080") || (req.headers.host == "localhost:8080" || req.headers.host == "www.localhost:8080")) {
            valid_enter = true;
        }
    }*/
    if (!valid_enter) {
        Logger.debug("floodreg " + req.headers.origin + " " + req.headers.host);
        res.status(500).send('Ip Banned!');
        return null;
    }
    var user = req.body.name;
    if (/\s/g.test(user) === true) {
        res.send(JSON.stringify(["Nombre de usuario no puede contener espacios"]));
        return null;
    }
    if (ignoreCase.startsWith(user, " ")) {
        res.send(JSON.stringify(["Nombre de usuario no puede contener espacios"]));
        return null;
    }
    if (ignoreCase.endsWith(user, " ")) {
        res.send(JSON.stringify(["Nombre de usuario no puede contener espacios"]));
        return null;
    }
    var ip = req.headers['x-forwarded-for'];
    var country;
    if (ip) {
        var tmpip = ip.split(',');
        var geo = geoip.lookup(tmpip[0]);
        if (geo)
            country = geo.country;
    }
    var password = req.body.password;
    var gender = req.body.gender;
    var validate = false;
    if (Buffer.byteLength(gender, 'utf8') < 0 || (gender !== 'm' || gender !== 'f'))
        gender = 'm';
    Logger.log("'" + user + "' " + gender);
    var tmpusrl = user;
    var tmpuser = tmpusrl.toLowerCase();
    if (Buffer.byteLength(user, 'utf8') < 2 || Buffer.byteLength(user, 'utf8') > 30) {
        res.send(JSON.stringify(["Nombre de Usuario incorrecto!"]));
    } else {
        req.db.dontExitsUserByUsername(tmpuser)
            .then(function (rows) {
                req.db.dontExitsUserByGameId(user)
                    .then(function (rows1) {
                        var validate = true;
                        var dt2 = {
                            Email: '',
                            Name: user,
                            Password: password,
                            Username: user,
                            Salt: ':',
                            Session: md5(user + ":" + gender),
                            IsOnline: 0,
                            Birthday: '1990-01-01'
                        };
                        req.db.putAccountFB(dt2)
                            .then(function (result) {
                                var uid = result[0].insertId;
                                var datos = {
                                    game_id: user,
                                    rank: 0,
                                    gp: 1000,
                                    gold: 1000,
                                    cash: 2000,
                                    gender: gender,
                                    unlock: 0,
                                    photo_url: '',
                                    name_changes: 0,
                                    power_user: 0,
                                    plus10gp: 0,
                                    mobile_fox: 0,
                                    country: country,
                                    flowers: 0,
                                    map_pack: 0,
                                    megaphones: 0,
                                    is_muted: 0,
                                    IdAcc: uid
                                };
                                req.db.putUserFB(datos)
                                    .then(function (result2) {
                                        var nnid = result2[0].insertId;
                                        var head = 1;
                                        var body = 2;
                                        if (gender === 'f') {
                                            head = 3;
                                            body = 4;
                                        }
                                        var nxdi = {
                                            Id: nnid,
                                            head: head,
                                            body: body,
                                            eyes: 0,
                                            flag: 0,
                                            background: 0,
                                            foreground: 0
                                        };
                                        req.db.putAvatarUseFB(nxdi)
                                            .then(function (rows4) {
                                                req.session.cookie.expires = false;
                                                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 10));
                                                req.session.account_id = uid;
                                                req.session.rank = dt2.rank;
                                                req.session.acc_session = dt2.Session;
                                                req.session.game_id = user;
                                                res.send(JSON.stringify([uid, dt2.rank, 0, dt2.Session, country, 0]));
                                            })
                                            .catch(function (err) {
                                                Logger.error("" + err.stack);
                                                res.send(JSON.stringify(["Error Servidor"]));
                                            });
                                    }).catch(function (err) {
                                        Logger.error("" + err.stack);
                                        res.send(JSON.stringify(["Error Servidor"]));
                                    });
                            }).catch(function (err) {
                                Logger.error("" + err.stack);
                                res.send(JSON.stringify(["Error Servidor"]));
                            });
                    })
                    .catch(function (err) {
                        res.send(JSON.stringify(["Pruebe con otro Usuario"]));
                    });
            })
            .catch(function (err) {
                res.send(JSON.stringify(["Pruebe con otro Usuario"]));
            });
    }
});

router.get('/w2', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var data = [86, 0, 0, ["High Ranks",0,9001,45,3000,9,24],["Mid Ranks",0,9002,511,3000,7,17],["Beginners",0,9003,970,5000,0,6],["All",0,9004,711,3000],["All",0,9005,1658,3000],["Bunge.",1,9006,352,3000],["All",0,9007,349,3000],["All",0,9008,379,3000],["Aduka.",1,9009,210,3000],["All",0,9010,173,3000],["All",0,9011,193,3000],["Dragon OFF",2,9012,10,4000,11,24,1586995140000,1587002340000],["Avatar On.",7,9013,134,3000],["Avatar Off.",1,9014,749,3000],
        520
    ];
    req.session.touch();
    res.send(JSON.stringify(data));
});

module.exports = router;