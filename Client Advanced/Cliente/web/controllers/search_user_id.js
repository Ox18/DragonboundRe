var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');

router.get('/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    Logger.log("Searh User: [" + user_id + "]");
    user_id = mysql.escape(user_id).replace("'", "").replace("'", "");
    var tmbuser = user_id;
    var tmusr = tmbuser.toLowerCase();
    if (req.session.account_id) req.session.touch();
    if (Buffer.byteLength(user_id, 'utf8') < 30) {
        try {
            req.db.connection.getConnection().then(conn => {
                conn.query('SELECT game_id FROM users WHERE IdAcc = ?', [tmusr])
                    .then(rows4 => {
                    conn.release();
                    if (rows4[0].length > 0) {
                        var rows_x2 = rows4[0];
                        res.redirect('/user/'+rows_x2[0].game_id);
                    } else {
                        res.send(JSON.stringify("User not found"));
                    }
                });
            });
        } catch (e) {
            Logger.debug("user: " + e.stack);
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;