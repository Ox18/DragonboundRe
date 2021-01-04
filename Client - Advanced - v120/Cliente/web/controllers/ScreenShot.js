var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');


router.get('/:ScreenShot', function (req, res) {
    var ScreenShot = req.params.ScreenShot;
    Logger.log("ScreenShot: [" + ScreenShot + "]");
    ScreenShot = mysql.escape(ScreenShot).replace("'", "").replace("'", "");
    var tmbuser = ScreenShot;
    var tmusr = tmbuser.toLowerCase();
    if (req.session.account_id) req.session.touch();
    if (Buffer.byteLength(ScreenShot, 'utf8') < 60) {
        try {
            req.db.getMyScreeRoomGameByLetters(tmusr)
                .then(function (resb) {
                var rows = resb[0];
                res.render('screenshot_verified', {
                    DATE: rows[0].partida_screenshot,
                    check_screen: true
                });
                
            }).catch(function (err) {
                res.render('screenshot_verified', {
                    DATE: '',
                    check_screen: false
                });
            });
        } catch (e) {
            Logger.debug("ScreenShot [ERROR]: " + e.stack);
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;