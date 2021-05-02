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
        conn.query('SELECT game_id, gp, gold, cash, name_changes, IdAcc FROM users WHERE IdAcc = ?', [acc_id])
            .then(rows4 => {
            conn.release();
            if (rows4[0].length > 0) {
                var rows_x2 = rows4[0];
                var texto_test = "";
                var i;
                var my_payments = 0;
                
                conn.query('SELECT id, user_id, Name, Date, cash, Info, Reseller FROM my_payments WHERE user_id = ?', [acc_id])
                    .then(rows5 => {
                    conn.release();
                    if (rows5[0].length > 0) {
                        var rows_x3 = rows5[0];
                        my_payments = rows5[0].length;
                        for (i = 0; i < rows_x3.length; i++) {//rows_x3[i].
                            texto_test += '<tr>';
                            texto_test += '<td>'+rows_x3[i].Name+'</td>';
                            texto_test += '<td>';
                            texto_test += '<nobr>';
                            texto_test += '<script>';
                            texto_test += 'TD('+rows_x3[i].Date+')';
                            texto_test += '</script>';
                            texto_test += '</nobr>';
                            texto_test += '</td>';
                            texto_test += '<td class="green">'+Commatize(rows_x3[i].cash)+'</td>';
                            texto_test += '<td class="info">'+rows_x3[i].Info+'</td>';
                            texto_test += '<td>'+rows_x3[i].Reseller+'</td>';
                            texto_test += '<td>'+rows_x3[i].id+'</td>';
                            texto_test += '</tr>';
                        }
                        res.render('payments', {//rows_x2[0].
                            you_made_payments: my_payments,
                            user_name: rows_x2[0].game_id,
                            id_user: rows_x2[0].IdAcc,
                            gp_user: Commatize(rows_x2[0].gp),
                            gold_left: Commatize(rows_x2[0].gold),
                            cash_left: Commatize(rows_x2[0].cash),
                            name_changes: rows_x2[0].name_changes,
                            Payments: texto_test
                        });
                    } else {
                        res.render('payments', {//rows_x2[0].
                            you_made_payments: my_payments,
                            user_name: rows_x2[0].game_id,
                            id_user: rows_x2[0].IdAcc,
                            gp_user: rows_x2[0].gp,
                            gold_left: rows_x2[0].gold,
                            cash_left: rows_x2[0].cash,
                            name_changes: rows_x2[0].name_changes,
                            Payments: texto_test
                        });
                    }
                });
            } else {
                res.redirect('/my_payments');
            }
        });
    });
    /*==============================================================================================================*/
});

module.exports = router;