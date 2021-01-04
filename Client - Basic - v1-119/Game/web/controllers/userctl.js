var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../game/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');
var auth = require('../middlewares/auth');
var csrf = require('csurf');
var csrfProtection = csrf({
    cookie: true
});

router.get('/', auth, csrfProtection, function (req, res) {
    var acc_id = req.session.account_id;
    req.db.connection.getConnection(function (errx, conn) {
        if (errx) {
            //conn.release();
            res.redirect('/');
        } else {
            conn.query('SELECT IdAcc, game_id, photo_url, bg_url, country, rank, gp, win, gender, loss FROM users where IdAcc = ?', [acc_id], function (err, rows) {
                //conn.release();
                if (err) {
                    Logger.debug("user: " + err.stack);
                    res.redirect('/');
                } else {
                    if (rows.length > 0) {
                        res.render('settings', {
                            game_id: rows[0].game_id,
                            user_id: acc_id,
                            photo_url: rows[0].photo_url,
                            bg_url: rows[0].bg_url,
                            csrfToken: req.csrfToken()
                        });
                    }
                }
            });
        }
    });
});

router.post('/', auth, csrfProtection, function (req, res) {
    var cont = true;
    var photo_url = req.body.photo_url;
    var page_bg_url = req.body.page_bg_url;
    if (photo_url.length > 60 || page_bg_url.length > 60) {
        res.redirect('/settings');
    }

    if (ignoreCase.startsWith(photo_url, " ")) {
        res.redirect('/settings');
        cont = false;
    }
    if (ignoreCase.endsWith(photo_url, " ")) {
        res.redirect('/settings');
        cont = false;
    }
    if (ignoreCase.startsWith(page_bg_url, " ")) {
        res.redirect('/settings');
        cont = false;
    }
    if (ignoreCase.endsWith(page_bg_url, " ")) {
        res.redirect('/settings');
        cont = false;
    }
    if (cont) {
        var acc_id = req.session.account_id;
        var game_id = req.session.game_id;
        try {
            req.db.connection.getConnection(function (errx, conn) {
                if (errx) {
                    //conn.release();
                    res.redirect('/settings');
                } else {
                    conn.query('UPDATE users SET photo_url = ?, bg_url = ? where IdAcc = ?', [photo_url, page_bg_url, acc_id], function (err, resp) {
                        //conn.release();
                        if (err) {
                            Logger.debug("settings: " + err.stack);
                        } else {}
                        res.redirect('/settings');
                    });
                }
            });
        } catch (e) {
            res.redirect('/settings');
        }
    }
});

module.exports = router;