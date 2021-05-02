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
    req.db.getUserByIdAcc(acc_id)
        .then(function (resb) {
        var rows = resb[0];
        res.redirect('/user/'+rows[0].game_id);
    }).catch(function (err) {
        Logger.debug("user: " + err.stack);
        res.redirect('/');
    });
});

module.exports = router;