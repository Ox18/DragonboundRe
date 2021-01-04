 var express = require('express'),
    router = express.Router();


var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');

var db = require('../../Controller/data');

var auth = require('../middlewares/auth');
var csrf = require('csurf');
var csrfProtection = csrf({
    cookie: true
});

function ArrayToObject(a, b) {
    var c, d = b.length, e = {};
    for (c = 0; c < d; c++)
        e[b[c]] = a[c];
    return e
}

function Commatize(b) {
    return b.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}
router.get('/', auth, csrfProtection, function (req, res) {
    var acc_id = req.session.account_id;
    /*==============================================================================================================*/
    req.db.connection.getConnection().then(conn => {
        conn.query('SELECT game_id, rank, gm, IdAcc FROM users WHERE IdAcc = ?', [acc_id])
            .then(rows4 => {
            conn.release();
            if (rows4[0].length > 0) {
                var rows_x2 = rows4[0];
                var user_state = false;
                if (rows_x2[0].IdAcc === 1 || rows_x2[0].IdAcc === 7) {
                    
                    var rows_table_results = [];
                    var ava_script = [];
                    var ava_type = 0;
                    user_state = true;
                    for (var i = 0; i < db.length; i++) {
                        var n = db[i];
                        var _stats = n[6];
                        if (_stats.min_rank === 31) {
                            
                            if (n[2] === 0 && n[2] === 0) {
                                ava_type = 'h';
                            } else if (n[2] === 0 && n[2] === 1) {
                                ava_type = 'h';
                            } else if (n[2] === 0 && n[2] === 2) {
                                ava_type = 'h';
                            } else if (n[2] === 2 && n[2] === 2) {
                                ava_type = 'g';
                            } else if (n[2] === 4 && n[2] === 2) {
                                ava_type = '1';//1
                            } else if (n[2] === 1 && n[2] === 2) {
                                ava_type = 'b';
                            } else if (n[2] === 1 && n[2] === 0) {
                                ava_type = 'b';
                            } else if (n[2] === 1 && n[2] === 1) {
                                ava_type = 'b';
                            } else if (n[2] === 3 && n[2] === 2) {
                                ava_type = 'f';
                            } else if (n[2] === 5 && n[2] === 2) {
                                ava_type = '2';
                            }
                            
                            rows_table_results += '<tr><th scope="row"> '+n[0]+'</th><td>'+n[5]+'</td><td align="center" valign="middle"><div class="img_ava" id="MyPlayer'+n[0]+'"></div></td></tr>';
                            
                            ava_script += "<script>PlayerAnim($('#MyPlayer"+n[0]+"'), [{file: '"+n[4]+".png',type: '"+ava_type+"',graphics: "+JSON.stringify(n[7])+"}])</script>";
                        }
                    }
                    Logger.info('GM '+rows_x2[0].game_id+' has entered the web of special avatars');
                    res.render('avatars', {//rows_x2[0].
                        avatars: rows_table_results,
                        scrip_ava: ava_script,
                        state_user: user_state
                    });
                } else {
                    Logger.info('The user '+rows_x2[0].game_id+' wanted to enter the web of avatars where he is not allowed to enter');
                    res.render('avatars', {//rows_x2[0].
                        avatars: '',
                        scrip_ava: '',
                        state_user: user_state
                    });
                }
            } else {
                res.redirect('/');
            }
        });
    });
    /*==============================================================================================================*/
});

module.exports = router;