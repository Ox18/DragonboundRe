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

router.get('/', auth, csrfProtection, function (req, res) {
    var acc_id = req.session.account_id;
    /*==============================================================================================================*/
    req.db.getSettingsByIdAcc(acc_id)
        .then(function (resb) {
        var rows = resb[0];
        res.render('settings', {
            game_id: rows[0].game_id,
            user_id: rows[0].IdAcc,
            photo_url: rows[0].photo_url,
            bg_url: rows[0].bg_url,
            csrfToken: req.csrfToken()
        });
    }).catch(function (err) {
        Logger.debug("user: " + err.stack);
        res.redirect('/');
    });
    /*==============================================================================================================*/
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
    if (page_bg_url === '') {
        page_bg_url = '/static/images/aqua_bg.jpg';
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
            /*==============================================================================================================*/
            req.db.updateSettingsByIdAcc(photo_url, page_bg_url, acc_id)
                .then(function (resb) {
                res.redirect('/settings');
            });
    /*==============================================================================================================*/
         } catch (e) {
            res.redirect('/settings');
        }
    }
});

module.exports = router;