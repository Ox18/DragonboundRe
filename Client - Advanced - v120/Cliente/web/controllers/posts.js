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


router.get('/', function (req, res) {
    res.redirect('/');
});

router.post('/', function (req, res) {

    var cont = true;
    var id_page = req.body.UserPage;
    var texto = req.body.text;
    var date = Math.round(Date.now() / 1000);
    var acc_id = req.session.account_id;
   
    if (req.body.action === 'post') {
        req.db.getUserByIdAcc(parseInt(id_page))
            .then(function (resb) {
            var rows = resb[0];
            req.db.putPosts(acc_id, id_page, texto, date)
                .then(function (resb) {
                
                res.redirect(req.header('Referer'));

            }).catch(function (err) {
                res.redirect('/');
            });
        }).catch(function (err) {
            res.redirect('/');
        });
    } else if (req.body.action === 'delete') {
        req.db.connection.getConnection().then(conn => {
            var acc_id = req.session.account_id;
            var post_id = parseInt(req.body.PostID);
            Logger.info('Post ID: '+post_id+' - UserID: '+acc_id);
            conn.query('SELECT post_id, user_de, user_para, texto, fecha FROM user_post WHERE post_id = ?', [post_id])
                .then(rows4 => {
                conn.release();
                if (rows4[0].length > 0) {
                    var rows_x2 = rows4[0];
                    if (rows_x2[0].user_de == parseInt(acc_id) || rows_x2[0].user_para == parseInt(acc_id)) {
                        req.db.deletePostsByID(req.body.PostID)
                            .then(function () {
                            res.redirect(req.header('Referer'));
                        }).catch(function (err) {
                            res.redirect('/');
                        });
                    } else {
                        res.send("not your page or your post");
                    }
                } else {
                    res.send("No publication found.");
                }
            });
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;