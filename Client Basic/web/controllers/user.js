var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../game/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');


router.get('/', function (req, res) {
    res.redirect('/');
});

router.get('/:game_id', function (req, res) {
    var game_id = req.params.game_id;
    Logger.log("user: '" + game_id + "'");
    game_id = mysql.escape(game_id).replace("'", "").replace("'", "");
    var tmbuser = game_id;
    var tmusr = tmbuser.toLowerCase();
    if (req.session.account_id) req.session.touch();
    if (Buffer.byteLength(game_id, 'utf8') < 30) {
        try {
            req.db.getUserByGameId(tmusr)
                .then(function (resb) {
                    var rows = resb[0];
                    var login = false;
                    var img = "/static/images/fb_boy.gif";
                    var back = "/static/images/aqua_bg.jpg";
                    var loguser = "";
                    if (req.session.account_id) {
                        login = true;
                        loguser = req.session.game_id;
                    }
                    var gender = rows[0].gender;
                    if (gender === 'm')
                        gender = "Male";
                    else
                        gender = "Female";
                    var rate = 100;
                    var total = rows[0].win + rows[0].loss;
                    if (total > 0)
                        rate = Math.round(rows[0].win * 100 / total);
                    if (rows[0].photo_url.length > 0)
                        img = rows[0].photo_url;
                    res.render('info', {
                        game_id: rows[0].game_id,
                        user_id: rows[0].IdAcc,
                        gp: rows[0].gp,
                        country: rows[0].country,
                        rank: rows[0].rank,
                        background: rows[0].bg_url,
                        gender: gender,
                        win: rows[0].win,
                        loss: rows[0].loss,
                        rate: rate,
                        login: login,
                        login_id: loguser,
                        user_img: new Buffer(img).toString('base64')
                    });
                })
                .catch(function (err) {
                    Logger.debug("user: " + e.stack);
                    res.redirect('/');
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