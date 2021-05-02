var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../game/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');
var graph = require('fbgraph');
var geoip = require('geoip-lite');
var Promise = require('promise');

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var ip = req.headers['x-forwarded-for'];
    var country = "PE";
    if (ip) {
        var tmpip = ip.split(',');
        var geo = geoip.lookup(tmpip[0]);
        if (geo)
            country = geo.country;
    }
    if (req.session) {
        if (req.session.account_id) {
            req.session.touch();
            var acc_id = req.session.account_id;
            var rank = req.session.rank;
            var acc_session = req.session.acc_session;
            res.send(JSON.stringify([acc_id, rank, 0, acc_session, country, 0]));
        } else {
            res.send(JSON.stringify([0]));
        }
    } else {
        res.send(JSON.stringify([0]));
    }
});

router.post('/', function (req, res) {
    if (req.body.a) {
        var ip = req.headers['x-forwarded-for'];
        var country = "PE";
        if (ip) {
            var tmpip = ip.split(',');
            var geo = geoip.lookup(tmpip[0]);
            if (geo)
                country = geo.country;
        }
        graph.setAccessToken(req.body.a);
        graph.get('/me?fields=id,name,birthday,email,gender', function (err, res_fb) {
            if (err) {
                res.send(JSON.stringify([0]));
            } else {
                var id = res_fb.id;
                var name = res_fb.name;
                var email = '';
                var gender = "m";
                var birthday = "1990-01-01";
                if (res_fb.email)
                    email = res_fb.email;
                if (res_fb.gender)
                    if (res_fb.gender === 'female' || res_fb.gender === 'mujer')
                        gender = "f";
                if (res_fb.birthday) {
                    var tmpbirth = res_fb.birthday.split('/');
                    birthday = tmpbirth[2] + "-" + tmpbirth[1] + "-" + tmpbirth[0];
                }

                req.db.getAccountByFBId(id)
                    .then(function (rows) {
                        var res0 = rows[0][0];
                        req.db.getUserByIdAcc(res0.Id)
                            .then(function (rows2) {
                                var res1 = rows2[0][0];
                                req.session.cookie.expires = false;
                                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 10));
                                req.session.account_id = res0.Id;
                                req.session.rank = res1.rank;
                                req.session.acc_session = res0.Session;
                                req.session.game_id = res1.game_id;
                                res.send(JSON.stringify([res0.Id, res1.rank, 0, res0.Session, country, 0]));
                            });
                    })
                    .catch(function (err) {
                        if (err) {} else {
                            var dt2 = {
                                Email: email,
                                Name: name,
                                Password: md5(name + ":fbid:" + id),
                                Salt: ':fbid:',
                                Session: md5(name + ":" + gender),
                                IsOnline: 0,
                                Birthday: birthday,
                                facebook_id: id,
                            };
                            req.db.putAccountFB(dt2)
                                .then(function (result) {
                                    var uid = result[0].insertId;
                                    var datos = {
                                        game_id: name,
                                        rank: 0,
                                        gp: 1000,
                                        gold: 1000,
                                        cash: 2000,
                                        gender: gender,
                                        unlock: 0,
                                        photo_url: '' + id,
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
                                                    req.session.game_id = name;
                                                    res.send(JSON.stringify([uid, dt2.rank, 0, dt2.Session, country, 0]));
                                                });
                                        });
                                });
                        }
                    });
            }
        });
    }
});


module.exports = router;