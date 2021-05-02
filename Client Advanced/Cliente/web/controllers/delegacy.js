var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');

router.get('/guests', function (req, res) {
    if (req.session) {
        if (req.session.account_id) {
            req.db.connection.getConnection().then(conn => {
                var acc_id = req.session.account_id;
                var stars = '<div id="imagen" style="background-image: url(/static/images/heraldica/heraldica_0.png);">';
                conn.query('SELECT gs.from_id, gs.to_id, gs.check_ip, u.game_id, u.photo_url, u.IdAcc, u.IP FROM guests gs INNER JOIN users u ON gs.to_id = u.IdAcc WHERE gs.from_id = ?', [acc_id])
                    .then(rows => {
                    conn.release();
                    if (rows[0].length > 0) {
                        var rows_x1 = rows[0];
                        conn.query('SELECT u.game_id, u.photo_url, u.IdAcc, u.IP, gs.check_ip FROM users u INNER JOIN guests gs ON u.IdAcc = gs.to_id WHERE gs.to_id = ?', [rows_x1[0].to_id])
                            .then(rows_xx2 => {
                            conn.release();
                            if (rows_xx2[0].length > 0) {
                                var rows_x2 = rows_xx2[0];
                                var texto_test = "";
                                var guests_check = 0;
                                var i;
                                //Logger.info('User: ['+req.session.game_id+'] Players Guests Total: '+rows_x1.length);
                                for (i = 0; i < rows_x1.length; i++) {
                                    texto_test += '<div class="caja">';
                                    texto_test += '<div class="memberbox">';
                                    if (rows_x1[i].photo_url !== '') {
                                        texto_test += '<div class="memberphoto secundario" style="background-image: url('+"'"+rows_x1[i].photo_url+"'"+');"></div>';
                                    } else {
                                        texto_test += '<div class="memberphoto secundario" style="background-image: url('+"'/static/images/fb_boy.gif'"+');"></div>';
                                    }
                                    texto_test += '<div class="membername secundario">'+rows_x1[i].game_id+'</div>';
                                    texto_test += '<div class="membersubtitle secundario '+rows_x1[i].check_ip+'">IP: '+rows_x1[i].IP+'</div>';
                                    texto_test += '</div>';
                                    texto_test += '</div>';
                                }
                                
                                
                                conn.query('SELECT gs.from_id, gs.to_id, gs.check_ip, u.game_id, u.photo_url, u.IdAcc, u.IP FROM guests gs INNER JOIN users u ON gs.to_id = u.IdAcc WHERE gs.from_id = ? AND gs.check_ip = ?', [acc_id, 'green'])
                                    .then(rows4 => {
                                    conn.release();
                                    if (rows4[0].length > 0) {
                                        var rows_x4 = rows4[0];
                                        guests_check = rows4[0].length;
                                        //Logger.info('User: ['+req.session.game_id+'] Players Guests Aprobados #2: '+guests_check);
                                        if (guests_check >= 8 && guests_check <= 15) {
                                            stars = '<div id="imagen" style="background-image: url(/static/images/heraldica/heraldica_1.png);">';
                                        } else if (guests_check >= 16 && guests_check <= 23) {
                                            stars = '<div id="imagen" style="background-image: url(/static/images/heraldica/heraldica_2.png);">';
                                        } else if (guests_check >= 24 && guests_check <= 31) {
                                            stars = '<div id="imagen" style="background-image: url(/static/images/heraldica/heraldica_3.png);">';
                                        } else if (guests_check >= 32 && guests_check <= 39) {
                                            stars = '<div id="imagen" style="background-image: url(/static/images/heraldica/heraldica_4.png);">';
                                        } else if (guests_check >= 40) {
                                            stars = '<div id="imagen" style="background-image: url(/static/images/heraldica/heraldica_5.png);">';
                                            req.db.getUserAvatarsByIdAccANDaId(acc_id, 2761).then(function (rowss) {
                                                //
                                            }).catch(function (err) {
                                                req.db.sendGift(acc_id, 2761);
                                                req.db.sendGift(acc_id, 2762);
                                            });
                                        } else {}
                                        
                                        res.render('guests', {
                                            user_id: acc_id,
                                            guests: texto_test,
                                            players: true,
                                            estrellas: stars
                                        });
                                        
                                    } else {
                                        res.render('guests', {
                                            user_id: acc_id,
                                            guests: texto_test,
                                            players: true,
                                            estrellas: '<div id="imagen" style="background-image: url(/static/images/heraldica/heraldica_0.png);">'
                                        });
                                    }
                                });
                            } else {
                                res.redirect('/login');
                            }
                        });
                    } else {
                        res.render('guests', {
                            user_id: acc_id,
                            guests: '',
                            players: false,
                            estrellas: '<div id="imagen" style="background-image: url(/static/images/heraldica/heraldica_0.png);">'
                        });
                    }
                });
            });
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
});

module.exports = router;