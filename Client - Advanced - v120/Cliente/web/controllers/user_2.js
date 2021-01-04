var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');

var db = require('../../Controller/data');

function Commatize(b) {
    return b.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}

function getAvatar(id) {
    //Logger.log("getAvatar: " + id);
    var itm = [];
    var res = [];
    for (var i = 0; i < db.length; i++) {
        var n = db[i];
        if (n[0] == id) {
            itm = n;
            break;
        }
    }
    if (itm !== null && itm.length > 0) {
        res.push(itm[2]);
        res.push(itm[4]);
        res.push(itm[7]);
    }
    return res;
}

function ArrayToObject(a, b) {
    var c, d = b.length, e = {};
    for (c = 0; c < d; c++)
        e[b[c]] = a[c];
    return e
}

router.get('/', function (req, res) {
    res.redirect('/');
});

router.get('/:game_id', function (req, res) {
    var game_id = req.params.game_id;
    Logger.log("user: [" + game_id + "]");
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
                var aceptado = 'no';
                var state_posts = false;
                var user_segundo = 1;
                var player_gp = Commatize(rows[0].gp);
                var guild_user_id = rows[0].IdAcc;
                var guild_name = "No Guild";
                
                /* || *===============[Start of the Avatars User code]================* || */
                var ava_date_body = getAvatar(parseInt(rows[0].body));
                ava_date_body = ArrayToObject(ava_date_body, ["type", "filename", "graphics"]);
                var data_ava_file_body = ava_date_body.filename+'.png';
                if (typeof (ava_date_body.filename) === 'undefined')
                    data_ava_file_body = '';
                var data_ava_graphics_body = JSON.stringify(ava_date_body.graphics);
                if (typeof (data_ava_graphics_body) === 'undefined')
                    data_ava_graphics_body = JSON.stringify([[]]);
                
                var ava_date_head = getAvatar(parseInt(rows[0].head));
                ava_date_head = ArrayToObject(ava_date_head, ["type", "filename", "graphics"]);
                var data_ava_file_head = ava_date_head.filename+'.png';
                if (typeof (ava_date_head.filename) === 'undefined')
                    data_ava_file_head = '';
                var data_ava_graphics_head = JSON.stringify(ava_date_head.graphics);
                if (typeof (data_ava_graphics_head) === 'undefined')
                    data_ava_graphics_head = JSON.stringify([[]]);
                
                var ava_date_background = getAvatar(parseInt(rows[0].background));
                ava_date_background = ArrayToObject(ava_date_background, ["type", "filename", "graphics"]);
                var data_ava_file_background = ava_date_background.filename+'.png';
                if (typeof (ava_date_background.filename) === 'undefined')
                    data_ava_file_background = '';
                var data_ava_graphics_background = JSON.stringify(ava_date_background.graphics);
                if (typeof (data_ava_graphics_background) === 'undefined')
                    data_ava_graphics_background = JSON.stringify([[]]);
                
                var ava_date_eyes = getAvatar(parseInt(rows[0].eyes));
                ava_date_eyes = ArrayToObject(ava_date_eyes, ["type", "filename", "graphics"]);
                var data_ava_file_eyes = ava_date_eyes.filename+'.png';
                if (typeof (ava_date_eyes.filename) === 'undefined')
                    data_ava_file_eyes = '';
                var data_ava_graphics_eyes = JSON.stringify(ava_date_eyes.graphics);
                if (typeof (data_ava_graphics_eyes) === 'undefined')
                    data_ava_graphics_eyes = JSON.stringify([[]]);
                
                var ava_date_foreground = getAvatar(parseInt(rows[0].foreground));
                ava_date_foreground = ArrayToObject(ava_date_foreground, ["type", "filename", "graphics"]);
                var data_ava_file_foreground = ava_date_foreground.filename+'.png';
                if (typeof (ava_date_foreground.filename) === 'undefined')
                    data_ava_file_foreground = '';
                var data_ava_graphics_foreground = JSON.stringify(ava_date_foreground.graphics);
                if (typeof (data_ava_graphics_foreground) === 'undefined')
                    data_ava_graphics_foreground = JSON.stringify([[]]);
                
                var ava_date_flag = getAvatar(parseInt(rows[0].flag));
                ava_date_flag = ArrayToObject(ava_date_flag, ["type", "filename", "graphics"]);
                var data_ava_file_flag = ava_date_flag.filename+'.png';
                if (typeof (ava_date_flag.filename) === 'undefined')
                    data_ava_file_flag = '';
                var data_ava_graphics_flag = JSON.stringify(ava_date_flag.graphics);
                if (typeof (data_ava_graphics_flag) === 'undefined')
                    data_ava_graphics_flag = JSON.stringify([[]]);
                /* || *==============[End of the Avatars User code]=================* || */
                
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
                
                var relationship_state = '';
                
                req.db.getPosteoByIdAcc(parseInt(rows[0].IdAcc))
                    .then(function (resb2) {
                    var rows2 = resb2[0];
                    aceptado = 'se';
                    state_posts = true;
                    user_segundo = rows2[0].user_para;
                    Logger.info('Publications found, sending confirmation message');
                }).catch(function (err) {
                    Logger.debug('Error, no posts were found');
                });
                req.db.connection.getConnection().then(conn => {
                    conn.query('SELECT g.Name FROM guild_member gm INNER JOIN guild g ON gm.Id = g.Id WHERE gm.UserId = ?', [guild_user_id])
                        .then(rows4 => {
                        conn.release();
                        if (rows4[0].length > 0) {
                            var rows_x2 = rows4[0];
                            guild_name = '<a href="/guild/'+rows_x2[0].Name+'">'+rows_x2[0].Name+'</a>';
                        } else {
                            guild_name = 'No Guild';
                        }
                    });
                });
                req.db.connection.getConnection().then(conn => {
                    conn.query('SELECT m.user_id, m.relationship_status, m.relationship_with_id, p.rank, p.photo_url, p.game_id, p.gender, p.IdAcc FROM relationship m INNER JOIN users p ON m.relationship_with_id = p.IdAcc WHERE m.user_id = ?', [guild_user_id])
                        .then(rows5 => {
                        conn.release();
                        if (rows5[0].length > 0) {
                            var rows_x3 = rows5[0];
                            if (rows_x3[0].relationship_status === 's') {
                                relationship_state = '<span class="infoLineData">Single</span>';
                            } else if (rows_x3[0].relationship_status === 'f') {
                                if (rows_x3[0].gender === 'm') {
                                    relationship_state = '<span class="infoLineData">Boyfriend <a href="/u/' + rows_x3[0].IdAcc + '">' + rows_x3[0].game_id + '</a></span>';
                                } else {
                                    relationship_state = '<span class="infoLineData">Girlfriend <a href="/u/' + rows_x3[0].IdAcc + '">' + rows_x3[0].game_id + '</a></span>';
                                }
                            } else if (rows_x3[0].relationship_status === 'e') {
                                relationship_state = '<span class="infoLineData">Engaged <a href="/u/' + rows_x3[0].IdAcc + '">' + rows_x3[0].game_id + '</a></span>';
                            } else if (rows_x3[0].relationship_status === 'm') {
                                relationship_state = '<span class="infoLineData">Married <a href="/u/' + rows_x3[0].IdAcc + '">' + rows_x3[0].game_id + '</a></span>';
                            }
                        } else {
                            guild_name = 'No Guild';
                        }
                    });
                });
                setTimeout(function() {
                    //
                    if (aceptado === 'se') {
                        Logger.info('Loading posts');
                        req.db.getPostsOnlineByIdAcc(parseInt(user_segundo))
                            .then(function (resb3) {
                            var rows3 = resb3[0];
                            
                            var texto_test = "";
                            var i;
                            for (i = 0; i < rows3.length; i++) {
                                texto_test += '<div class="Box">';
                                texto_test += '<form action="/post_action" method="POST">';
                                texto_test += "<input type='hidden' name='csrfmiddlewaretoken' value='5hpTRRAp0ZYRPYIF03ybJNOA5Mjkv5gNqS6I49sbqOM4N4JD7WiQxVXbTbZXtcWz'/>";
                                texto_test += '<input type="hidden" name="PostID" value="'+rows3[i].post_id+'">';
                                texto_test += '<div class="boxTitle ">';
                                texto_test += '<span class="DragonParse PostTitleEmo">(rank'+rows3[i].rank+')</span>';
                                texto_test += '<a class="name" href="/user/'+rows3[i].game_id+'">'+rows3[i].game_id+'</a>';
                                texto_test += '<span class="PostTime">';
                                texto_test += '<script>';
                                texto_test += 'TD('+rows3[i].fecha+')';
                                texto_test += '</script>';
                                texto_test += '</span>';
                                if (rows[0].IdAcc === req.session.account_id || rows3[i].IdAcc === req.session.account_id)
                                    texto_test += '<input type="submit" class="DeletePost glow_button" name="action" value="delete">';
                                texto_test += '</div>';
                                texto_test += '<div class="boxBody boxBodyPost DragonParse">'+rows3[i].texto+'</div>';
                                texto_test += '</form>';
                                texto_test += '</div>';
                            }
                            
                            res.render('info', {
                                game_id: rows[0].game_id,
                                user_id: rows[0].IdAcc,
                                gp: player_gp,
                                country: rows[0].country,
                                rank: rows[0].rank,
                                body_filename: data_ava_file_body,
                                body_graphics: data_ava_graphics_body,
                                head_filename: data_ava_file_head,
                                head_graphics: data_ava_graphics_head,
                                background_filename: data_ava_file_background,
                                background_graphics: data_ava_graphics_background,
                                eyes_filename: data_ava_file_eyes,
                                eyes_graphics: data_ava_graphics_eyes,
                                foreground_filename: data_ava_file_foreground,
                                foreground_graphics: data_ava_graphics_foreground,
                                flag_filename: data_ava_file_flag,
                                flag_graphics: data_ava_graphics_flag,
                                background: rows[0].bg_url,
                                gender: gender,
                                relationship: relationship_state,
                                win: rows[0].win,
                                loss: rows[0].loss,
                                rate: rate,
                                login: login,
                                login_id: loguser,
                                guild: guild_name,
                                pos_state: state_posts,
                                
                                id_page: rows[0].IdAcc,
                                posts: texto_test,
                                
                                user_img: new Buffer(img).toString('base64')
                            });
                        });
                    } else {
                        Logger.info('No posts found');
                        res.render('info', {
                            game_id: rows[0].game_id,
                            user_id: rows[0].IdAcc,
                            gp: player_gp,
                            country: rows[0].country,
                            rank: rows[0].rank,
                            body_filename: data_ava_file_body,
                            body_graphics: data_ava_graphics_body,
                            head_filename: data_ava_file_head,
                            head_graphics: data_ava_graphics_head,
                            background_filename: data_ava_file_background,
                            background_graphics: data_ava_graphics_background,
                            eyes_filename: data_ava_file_eyes,
                            eyes_graphics: data_ava_graphics_eyes,
                            foreground_filename: data_ava_file_foreground,
                            foreground_graphics: data_ava_graphics_foreground,
                            flag_filename: data_ava_file_flag,
                            flag_graphics: data_ava_graphics_flag,
                            background: rows[0].bg_url,
                            gender: gender,
                            relationship: relationship_state,
                            win: rows[0].win,
                            loss: rows[0].loss,
                            rate: rate,
                            login: login,
                            login_id: loguser,
                            guild: guild_name,
                            pos_state: state_posts,
                            id_page: rows[0].IdAcc,
                            posts: '',
                            user_img: new Buffer(img).toString('base64')
                        });
                    }
                    //
                },100);
            }).catch(function (err) {
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