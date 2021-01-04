var express = require('express'),
    router = express.Router();

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
router.get('/', auth, csrfProtection, function (req, res) {
    var acc_id = req.session.account_id;
    /*==============================================================================================================*/
    req.db.connection.getConnection().then(conn => {
        conn.query('SELECT game_id, cash, IdAcc FROM users WHERE IdAcc = ?', [acc_id])
            .then(rows4 => {
            conn.release();
            if (rows4[0].length > 0) {
                var rows_x2 = rows4[0];
                res.render('pincode', {//rows_x2[0].
                    user_name: rows_x2[0].game_id,
                    user_id: rows_x2[0].IdAcc,
                    user_cash: Commatize(rows_x2[0].cash),
                    user_by: '',
                    error_pin: '',
                    pin_code: ''
                });
            } else {
                res.redirect('/pin');
            }
        });
    });
    /*==============================================================================================================*/
});

router.post('/', function (req, res) {//PIN code not found 
    var cont = true;
    var pins_code = req.body.pin;
    if (pins_code.length > 60) {
        res.redirect('/pin');
    }

    if (ignoreCase.startsWith(pins_code, " ")) {
        res.redirect('/pin');
        cont = false;
    }
    if (ignoreCase.endsWith(pins_code, " ")) {
        res.redirect('/pin');
        cont = false;
    }
    if (pins_code === '') {
        res.redirect('/pin');
        cont = false;
    }
    if (ignoreCase.startsWith(pins_code, " ")) {
        res.redirect('/pin');
        cont = false;
    }
    if (ignoreCase.endsWith(pins_code, " ")) {
        res.redirect('/pin');
        cont = false;
    }
    if (cont) {
        var acc_id = req.session.account_id;
        var user_name = req.session.game_id;
        var time_data = Math.round(Date.now() / 1000);
        try {
            /*==============================================================================================================*/
            if (pins_code === 'BP10-2345-UVWX-3456') {
                req.db.connection.getConnection().then(conn => {
                    conn.query('SELECT game_id, cash, IdAcc FROM users WHERE IdAcc = ?', [acc_id])
                        .then(rows4 => {
                        conn.release();
                        if (rows4[0].length > 0) {
                            var rows_x2 = rows4[0];
                            res.render('pincode', {//rows_x2[0].
                                user_name: rows_x2[0].game_id,
                                user_id: rows_x2[0].IdAcc,
                                user_cash: Commatize(rows_x2[0].cash),
                                user_by: '',
                                error_pin: '',
                                pin_code: '<div id="pin_box"><div id="pin_title">DragonBound PIN Card</div><div id="pin_code">BP10-2345-UVWX-3456</div><div id="pin_cash"><span class="yellow">10000 CASH</span></div><div id="pin_reseller">(By: DragonBound)</div><div class="red" id="pin_used">Used By: 1 - DragonBound</div></div>'
                            });
                        } else {
                            res.redirect('/pin');
                        }
                    });
                });
            } else {
                req.db.connection.getConnection().then(conn => {
                    conn.query('SELECT id, pin, seller, gm, gm_id, used_by, rode, state, date_time FROM pin_code WHERE pin = ?', [pins_code])
                        .then(rows5 => {
                        conn.release();
                        if (rows5[0].length > 0) {
                            var rows_x3 = rows5[0];
                            if (rows_x3[0].state === 'ON') {
                                var state = 'OFF';
                                var pin_code_id = rows_x3[0].id;
                                conn.query('UPDATE pin_code SET state = ?, used_by = ?, date_time = ? WHERE id = ?', [state, acc_id, time_data, pin_code_id])
                                    .then(rows6 => {
                                    conn.release();
                                    if (rows6[0].affectedRows > 0 || rows6[0].changedRows > 0) {
                                        var rows_x4 = rows6[0];
                                        var cash_recived = rows_x3[0].rode;
                                        conn.query('UPDATE users SET cash = cash + ? WHERE IdAcc = ?', [cash_recived, acc_id])
                                            .then(rows7 => {
                                            conn.release();
                                            if (rows7[0].affectedRows > 0 || rows7[0].changedRows > 0) {
                                                var rows_x5 = rows7[0];
                                                var info_pin_code = 'Pin Code';
                                                var reseller = rows_x3[0].gm;
                                                conn.query('INSERT into my_payments SET user_id = ?, Name = ?, Date = ?, cash = ?, Info = ?, Reseller = ?', [acc_id, user_name, time_data, cash_recived, info_pin_code, reseller])
                                                    .then(rows8 => {
                                                    conn.release();
                                                    if (rows8[0].affectedRows > 0) {
                                                        var rows_x6 = rows8[0];
                                                        conn.query('SELECT game_id, cash, IdAcc FROM users WHERE IdAcc = ?', [acc_id])
                                                            .then(rows9 => {
                                                            conn.release();
                                                            if (rows9[0].length > 0) {
                                                                var rows_x7 = rows9[0];
                                                                res.render('pincode', {
                                                                    user_name: rows_x7[0].game_id,
                                                                    user_id: rows_x7[0].IdAcc,
                                                                    user_cash: Commatize(rows_x7[0].cash),
                                                                    user_by: '',
                                                                    error_pin: '',
                                                                    pin_code: '<div id="pin_box"><div id="pin_title">DragonBound PIN Card</div><div id="pin_code">'+rows_x3[0].pin+'</div><div id="pin_cash"><span class="yellow">'+cash_recived+' CASH</span></div><div id="pin_reseller">(By: '+rows_x3[0].seller+')</div><div class="red" id="pin_used">Used By: 1 - '+rows_x7[0].game_id+'</div></div>'
                                                                });
                                                            } else {
                                                                res.redirect('/pin');
                                                            }
                                                        });
                                                    } else {
                                                        res.redirect('/pin');
                                                    }
                                                });
                                            } else {
                                                res.redirect('/pin');
                                            }
                                        });
                                    } else {
                                        res.redirect('/pin');
                                    }
                                });
                            } else {
                                req.db.connection.getConnection().then(conn => {
                                    conn.query('SELECT p.id, p.pin, p.seller, p.gm, p.gm_id, p.used_by, p.rode, p.state, p.date_time, u.game_id, u.IdAcc FROM pin_code p INNER JOIN users u ON u.IdAcc = p.gm_id WHERE p.pin = ?', [pins_code])
                                        .then(rows_xd => {
                                        conn.release();
                                        if (rows_xd[0].length > 0) {
                                            var rows_xd = rows_xd[0];
                                            var used_by = rows_xd[0].used_by;
                                            conn.query('SELECT game_id, cash, IdAcc FROM users WHERE IdAcc = ?', [used_by])
                                                .then(rows_x2 => {
                                                conn.release();
                                                if (rows_x2[0].length > 0) {
                                                    var rows_x9 = rows_x2[0];
                                                    conn.query('SELECT game_id, cash, IdAcc FROM users WHERE IdAcc = ?', [acc_id])
                                                        .then(rows_xdd => {
                                                        conn.release();
                                                        if (rows_xdd[0].length > 0) {
                                                            var rows_xd9 = rows_xdd[0];
                                                            res.render('pincode', {
                                                                user_name: rows_xd9[0].game_id,
                                                                user_id: rows_xd9[0].IdAcc,
                                                                user_cash: Commatize(rows_xd9[0].cash),
                                                                user_by: '<div class="red buyroom">PIN Code used at <span class="yellow"><script>TD('+rows_xd[0].date_time+')</script></span><br>Sent by: <span class="yellow">'+rows_xd[0].game_id+'</span> <span class="green">(ID '+rows_xd[0].IdAcc+')</span> --> To: <span class="yellow">'+rows_x9[0].game_id+'</span> <span class="green">(ID '+rows_x9[0].IdAcc+')</span></div>',
                                                                error_pin: '',
                                                                pin_code: ''
                                                            });
                                                        } else {
                                                            res.redirect('/pin');
                                                        }
                                                    });
                                                } else {
                                                    res.redirect('/pin');
                                                }
                                            });
                                        } else {
                                            res.redirect('/pin');
                                        }
                                    });
                                });
                            }
                        } else {
                            req.db.connection.getConnection().then(conn => {
                                conn.query('SELECT game_id, cash, IdAcc FROM users WHERE IdAcc = ?', [acc_id])
                                    .then(rows4 => {
                                    conn.release();
                                    if (rows4[0].length > 0) {
                                        var rows_x2 = rows4[0];
                                        res.render('pincode', {
                                            user_name: rows_x2[0].game_id,
                                            user_id: rows_x2[0].IdAcc,
                                            user_cash: Commatize(rows_x2[0].cash),
                                            user_by: '',
                                            error_pin: 'PIN code not found ',
                                            pin_code: ''
                                        });
                                    } else {
                                        res.redirect('/pin');
                                    }
                                });
                            });
                        }
                    });
                });
            }
            /*==============================================================================================================*/
         } catch (e) {
            res.redirect('/settings');
        }
    }
});

module.exports = router;