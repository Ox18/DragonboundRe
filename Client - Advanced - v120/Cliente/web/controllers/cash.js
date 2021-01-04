//SELECT c.user_id, c.reseller_sms, c.date_sms, u.IdAcc, u.game_id, u.rank, u.photo_url, u.CashCharger FROM chat_reseller c INNER JOIN users u ON c.user_id = u.IdAcc
var express = require('express'),
    router = express.Router();

var date_end_offer_cash = 1559602800000;

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');
var auth = require('../middlewares/auth');
var csrf = require('csurf');
var csrfProtection = csrf({
    cookie: true
});

function Commatize(b) {
    return b.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}

function getDateTime(date) {
    var d = new Date(date);
    var month = d.getMonth() + 1;
    
    var time = d.getFullYear() + '-' + month + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
    return time
}

router.get('/', auth, csrfProtection, function (req, res) {
    var game_id = req.session.game_id;
    req.db.getUserByGameId(game_id).then(function (resb) {
        var rows = resb[0];
        var check_rank = false;
        var date_offer_cash = false;
        if (date_end_offer_cash >= Date.now()) {
            date_offer_cash = true;
        }
        if (rows[0].rank >= 15) {
            check_rank = true;
        }
        res.render('cash_info', {
            my_cash: Commatize(rows[0].cash),
            check_rank: check_rank,
            error_check: "",
            date_offer_cash: date_offer_cash,
            time_offer_cash: "'"+getDateTime(parseInt(date_end_offer_cash))+"'"
        });
    }).catch(function (err) {
        res.redirect('/');
    });
});

router.post('/', function (req, res) {
    //var msg_send = req.body.date_sms;
    //res.send("Coming Soon :) - Message: "+msg_send);
    if (req.session) {
        if (req.session.account_id) {
            var msg_send = req.body.date_sms;
            var game_id = req.session.game_id;
            var user_id = req.session.account_id;
            var check_rank = false;
            var cont = true;
            var error_sms = "";
            var time_msm = Date.now();
            var date_offer_cash = false;
            if (date_end_offer_cash >= Date.now()) {
                date_offer_cash = true;
            }
            req.db.getUserByGameId(game_id).then(function (resb) {
                var rows = resb[0];
                if (rows[0].rank >= 15) {
                    check_rank = true;
                } else {
                    error_sms = "Error: Tu rango es muy bajo para que puedas comentar.";
                    check_rank = false;
                    cont = false;
                }
                if (msg_send.length > 60 || msg_send.length > 60) {
                    error_sms = "Error: Cantidad máxima de caracteres: 60";
                    cont = false;
                }
                
                if (msg_send === "") {
                    error_sms = "Error: Campo de chat vació.";
                    cont = false;
                }
                
                if (ignoreCase.startsWith(msg_send, " ")) {
                    error_sms = "Error: Campo de chat vació.";
                    cont = false;
                }
                
                if (ignoreCase.endsWith(msg_send, " ")) {
                    error_sms = "Error: Campo de chat vació.";
                    cont = false;
                }
                
                if (cont) {
                    try {
                        req.db.connection.getConnection().then(conn => {
                            conn.query('INSERT INTO chat_reseller SET user_id = ?, reseller_sms = ?, date_sms = ?', [user_id, msg_send, time_msm])
                                .then(rows1 => {
                                conn.release();
                                if (rows1[0].length > 0) {
                                    var rows_x1 = rows1[0];
                                    res.redirect('/cash');
                                } else {
                                    res.redirect('/cash');
                                }
                        });
                    });
                    } catch (e) {
                        res.redirect('/cash');
                    }
                } else {
                    res.render('cash_info', {
                        my_cash: Commatize(rows[0].cash),
                        check_rank: check_rank,
                        error_check: error_sms,
                        date_offer_cash: date_offer_cash,
                        time_offer_cash: "'"+getDateTime(parseInt(date_end_offer_cash))+"'"
                    });
                }
                
            }).catch(function (err) {
                res.redirect('/');
            });
        } else {
            res.send("Please login first");
        }
    } else {
        res.send("Please login first");
    }
});

module.exports = router;