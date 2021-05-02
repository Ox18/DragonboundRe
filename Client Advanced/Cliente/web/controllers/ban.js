var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var geoip = require('geoip-lite');

function DateBan(TimeBan) {
    var datetime = new Date(TimeBan);
    
    var year    = datetime.getFullYear();
    var month   = datetime.getMonth() + 1; // (0-11)
    var date    = datetime.getDate();
    var hour    = datetime.getHours();
    var minute  = datetime.getMinutes();
    var second  = datetime.getSeconds();
    
    var ResultBan = year + "/" + addZero(month) + "/" + addZero(date) + " " + addZero(hour) + ":" + addZero(minute) + ":" + addZero(second);
    
    return ResultBan;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i
  };  
  return i;
}

router.get('/', function (req, res) {
    req.db.connection.getConnection().then(conn => {
        conn.query('SELECT u.rank, u.game_id, u.IdAcc, b.razon, b.date FROM users u INNER JOIN banned b ON b.UserId = u.IdAcc')
            .then(rows4 => {
            conn.release();
            if (rows4[0].length > 0) {
                var rows_x2 = rows4[0];
                var i;
                var texto_test = '';
                var date_state = '';
                for (i = 0; i < rows_x2.length; i++) {
                    if (rows_x2[i].date === 'Forever') {
                        date_state = '<td class="forever">' + rows_x2[i].date + '</td>';
                    } else {
                        date_state = '<td class="days">' + DateBan(parseInt(rows_x2[i].date)) + '</td>';
                    }
                    texto_test += '<tr><td>' + parseInt( i + 1 ) + '</td><td>' + rows_x2[i].game_id + '</td><td>' + rows_x2[i].IdAcc + '</td><td>' + rows_x2[i].razon + '</td>' + date_state + '<td><img class="img_rank" src="/static/banned_ranks/' + rows_x2[i].rank + '.gif" ></td></tr>';
                }
                res.render('desban', {
                    baneados: texto_test
                });
            } else {
                res.render('desban', {
                    baneados: texto_test
                });
            }
        });
    });
});

module.exports = router;