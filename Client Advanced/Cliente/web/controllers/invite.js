var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');
var geoip = require('geoip-lite');

//<div class="green buyroom">The user you searched for does not exist.</div>
router.get('/bid', function (req, res) {
    if (typeof (req.query.invite) === "undefined" || req.query.invite === '' || req.query.invite === '0') {
        Logger.info('Probando #1 con exito');
        res.redirect('/bid?invite=1');
    } else {
        if (isNaN(req.query.invite)) {
            res.redirect('/bid?invite=1');
        } else {
            req.db.connection.getConnection().then(conn => {
                var search = req.query.invite;
                Logger.info('Search for User: '+search);
                conn.query('SELECT game_id, rank, IdAcc FROM users WHERE IdAcc = ?', [search])
                    .then(rows => {
                    conn.release();
                    if (rows[0].length > 0) {
                        var rowss = rows[0];
                        res.render('invitation', {
                            by: rowss[0].game_id,
                            rank: rowss[0].rank,
                            error: ''
                        });
                    } else {
                        res.redirect('/bid?invite=1');
                    }
                });
            });
        }
    }
});

router.post('/bid', function (req, res) {
    if (typeof (req.query.invite) === "undefined" || req.query.invite === '' || req.query.invite === '0') {
        Logger.info('Probando #1 con exito');
        res.redirect('/bid?invite=1');
    } else {
        if (isNaN(req.query.invite)) {
            res.redirect('/bid?invite=1');
        } else {
            req.db.connection.getConnection().then(conn => {
                var search = req.query.invite;
                Logger.info('Search for User: '+search);
                conn.query('SELECT game_id, rank, IdAcc FROM users WHERE IdAcc = ?', [search])
                    .then(rows => {
                    conn.release();
                    if (rows[0].length > 0) {
                        var rowss = rows[0];
                        
                        var user = req.body.username;
                        var password = req.body.pass;
                        var gender = req.body.gender;
                        
                        
                        
                        var valid_enter = true;
                        var error_text = '';
                        
                        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
                        var reg = /([^f:]+)/;
                        let ip_result = reg.exec(req.connection.remoteAddress)[0];
                        
                        if (/\s/g.test(user) === true) {
                            error_text = "Nombre de usuario no puede contener espacios";
                            valid_enter = false;
                        }
                        if (ignoreCase.startsWith(user, " ")) {
                            error_text = "Nombre de usuario no puede contener espacios";
                            valid_enter = false;
                        }
                        if (ignoreCase.endsWith(user, " ")) {
                            error_text = "Nombre de usuario no puede contener espacios";
                            valid_enter = false;
                        }
                        if (Buffer.byteLength(user, 'utf8') < 2 || Buffer.byteLength(user, 'utf8') > 30) {
                            error_text = "Nombre de Usuario incorrecto!";
                            valid_enter = false;
                        }
                        var country = 'BOT';
                        if (ip) {
                            var tmpip = ip.split(',');
                            var geo = geoip.lookup(tmpip[0]);
                            if (geo)
                                country = geo.country;
                        }
                        var validate = false;
                        
                        if (gender === 'm')
                            gender = 'm';
                        else if (gender === 'f')
                            gender = 'f';
                        else {
                            //error_text = "Oops tuvimos un error de su registro, se le pide amablemente volverse a registrar :)";
                            valid_enter = false;
                        }
                        Logger.log("Register Invite: '" + user + "' " + gender);
                        var tmpusrl = user;
                        var tmpuser = tmpusrl.toLowerCase();
                        if (valid_enter === false) {
                            res.render('invitation', {
                                by: rowss[0].game_id,
                                rank: rowss[0].rank,
                                error: '<div class="green buyroom">'+error_text+'</div>'
                            });
                        } else {
                            Logger.log("Register Invite: '" + user + "' " + gender + " Exitoso.");
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
                                        Birthday: new Date(),
                                        IP: ip_result
                                    };
                                    req.db.putAccountFB(dt2)
                                        .then(function (result) {
                                        var uid = result[0].insertId;
                                        var datos = {
                                            game_id: user,
                                            rank: 0,
                                            gp: 1000,
                                            gold: 20000,
                                            cash: 30000,
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
                                            IdAcc: uid,
                                            IP: ip_result
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
                                                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 1440));
                                                req.session.account_id = uid;
                                                req.session.rank = datos.rank;
                                                req.session.acc_session = dt2.Session;
                                                req.session.game_id = user;
                                                req.db.putRelationNew(result2[0].insertId);
                                                //red
                                                conn.query('SELECT Id, game_id, IdAcc FROM users WHERE IP = ?', [ip_result])
                                                    .then(rows2xD => {
                                                    conn.release();
                                                    if (rows2xD[0].length === 1) {
                                                        var rows_x2 = rows2xD[0];
                                                        conn.query('INSERT INTO guests SET from_id = ?, to_id = ?, check_ip = ?', [rowss[0].IdAcc, result[0].insertId, 'green'])
                                                            .then(rows2_x2 => {
                                                            conn.release();
                                                            if (rows2_x2[0].affectedRows > 0)
                                                                res.redirect('/you_are_welcome');
                                                            else
                                                                res.redirect('/');
                                                        });
                                                    } else {
                                                        conn.query('INSERT INTO guests SET from_id = ?, to_id = ?, check_ip = ?', [rowss[0].IdAcc, result[0].insertId, 'red'])
                                                            .then(rows2_x2 => {
                                                            conn.release();
                                                            if (rows2_x2[0].affectedRows > 0)
                                                                res.redirect('/you_are_welcome');
                                                            else
                                                                res.redirect('/');
                                                        });
                                                    }
                                                });
                                            }).catch(function (err) {
                                                res.render('invitation', {
                                                    by: rowss[0].game_id,
                                                    rank: rowss[0].rank,
                                                    error: '<div class="green buyroom">Error Servidor</div>'
                                                });
                                            });
                                        }).catch(function (err) {
                                            res.render('invitation', {
                                                by: rowss[0].game_id,
                                                rank: rowss[0].rank,
                                                error: '<div class="green buyroom">Error Servidor</div>'
                                            });
                                        });
                                    }).catch(function (err) {
                                        res.render('invitation', {
                                            by: rowss[0].game_id,
                                            rank: rowss[0].rank,
                                            error: '<div class="green buyroom">Error Servidor</div>'
                                        });
                                    });
                                }).catch(function (err) {
                                    res.render('invitation', {
                                        by: rowss[0].game_id,
                                        rank: rowss[0].rank,
                                        error: '<div class="green buyroom">Pruebe con otro Usuario</div>'
                                    });
                                });
                            }).catch(function (err) {
                                res.render('invitation', {
                                    by: rowss[0].game_id,
                                    rank: rowss[0].rank,
                                    error: '<div class="green buyroom">Pruebe con otro Usuario</div>'
                                });
                            });
                        }
                    } else {
                        res.redirect('/bid?invite=1');
                    }
                });
            });
        }
    }
});

module.exports = router;