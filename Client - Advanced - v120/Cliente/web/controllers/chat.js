//SELECT c.user_id, c.reseller_sms, c.date_sms, u.IdAcc, u.game_id, u.rank, u.photo_url, u.CashCharger FROM chat_reseller c INNER JOIN users u ON c.user_id = u.IdAcc
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

function getDateHour(date) {
    var d = new Date(date);
    var h = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return h
}

function getDateTime(date) {
    var d = new Date(date);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    
    var h = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    var time = month + ' ' + days + ', ' + year + ', ' + h;
    return time
}

router.get('/', auth, csrfProtection, function (req, res) {
    req.db.connection.getConnection().then(conn => {
        conn.query('SELECT c.user_id, c.reseller_sms, c.date_sms, u.IdAcc, u.game_id, u.rank, u.photo_url, u.CashCharger FROM chat_reseller c INNER JOIN users u ON c.user_id = u.IdAcc ORDER BY c.id DESC')
            .then(rows1 => {
            conn.release();
            if (rows1[0].length > 0) {
                var rows_x1 = rows1[0];
                var texto_test = "";
                var i;
                for (i = 0; i < rows_x1.length; i++) {//'+rows_x1[i].+'          texto_test += '';
                    texto_test += '<div class="user_comment">';
                    if (isNaN(rows_x1[i].photo_url)) {
                        if (rows_x1[i].photo_url.length > 0) {
                            texto_test += '<img class="img_user" src="'+rows_x1[i].photo_url+'">';
                        } else {
                            texto_test += '<img class="img_user" src="/static/images/fb_boy.gif">';
                        }
                    } else if (rows_x1[i].photo_url === "") {
                        texto_test += '<img class="img_user" src="/static/images/fb_boy.gif">';
                    } else {
                        texto_test += '<img class="img_user" src="//graph.facebook.com/v2.2/'+rows_x1[i].photo_url+'/picture?type=large">';
                    }
                    texto_test += '<span class="name_user">'+rows_x1[i].game_id+': </span>';
                    texto_test += '<span class="comment_user">'+rows_x1[i].reseller_sms+'</span>';
                    texto_test += '<span title="'+getDateTime(parseInt(rows_x1[i].date_sms))+'" class="time_chat">'+getDateHour(parseInt(rows_x1[i].date_sms))+'</span>';
                    texto_test += '</div>';
                    //texto_test += '';
                }
                res.render('chat', {
                    chats: texto_test
                });
            } else {
                res.render('chat', {
                    chats: ''
                });
            }
        });
    });
});

module.exports = router;