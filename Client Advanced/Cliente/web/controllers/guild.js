var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');


function Commatize(b) {
    return b.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}


router.get('/', function (req, res) {
    res.redirect('/');
});

router.get('/:game_id', function (req, res) {
    var game_id = req.params.game_id;
    game_id = mysql.escape(game_id).replace("'", "").replace("'", "");
    var tmbuser = game_id;
    var tmusr = tmbuser.toLowerCase();
    if (req.session.account_id) req.session.touch();
    if (Buffer.byteLength(game_id, 'utf8') < 30) {
        try {
            req.db.getGuildByName(tmusr)
                .then(function (resb) {
                var rows = resb[0];
                var login = false;
                var loguser = "";
                var state_edit = false;
                var texto_test = "";
                var lider_guild = ''
                var id_leder = '';
                var i;
                var coins_images = '';
                if (req.session.account_id) {
                    login = true;
                    loguser = req.session.game_id;
                }
                for (i = 0; i < rows.length; i++) {//rows[i]
                    var gender = rows[i].gender;
                    var stylergender = rows[i].gender;
                    if (gender === 'm')
                        gender = "M";
                    else
                        gender = "F";
                    if (stylergender === 'm')
                        stylergender = "male";
                    else
                        stylergender = "female";
                    if (rows[i].Job === 1) {
                        lider_guild = rows[i].game_id;
                        if (req.session.account_id === rows[i].IdAcc)
                            state_edit = true;
                    }
                    if (rows[i].Job === 1)
                        texto_test += '<tr class="LeaderLine">';
                    else if (rows[i].Job === 2)
                        texto_test += '<tr class="SubLeaderLine">';
                    else
                        texto_test += '<tr>';
                    texto_test += '<td class="center">' + parseInt( i + 1 ) + '</td>';
                    texto_test += '<td style="white-space: nowrap"><span class="span_rank rank rank'+rows[i].rank+'"></span> <a class="name" href="/user/'+rows[i].game_id+'">'+rows[i].game_id+'</a></td>';
                    texto_test += '<td class="center '+stylergender+'">'+gender+'</td>';
                    texto_test += '<td class="right">'+Commatize(rows[i].gp)+'</td>';
                    texto_test += '<td class="center nowarp">';
                    if (rows[i].Job === 1)
                        texto_test += '<img src="/static/images/leader_icon.gif">';
                    else if (rows[i].Job === 2)
                        texto_test += '<img src="/static/images/semileader_icon.png">';
                    else {}
                    texto_test += '</td>';
                    texto_test += '</tr>';
                }
                req.db.connection.getConnection().then(conn => {
                    conn.query('SELECT g.Id, g.Name, g.img, g.fondo, gc.user_id, gc.time_coin, gc.date_coin, gc.coin_img, u.game_id FROM guild g INNER JOIN guild_coins gc ON g.Id = gc.guild_id INNER JOIN users u ON gc.user_id = u.IdAcc WHERE g.Name = ?', [tmusr])
                        .then(rows4 => {
                        conn.release();
                        if (rows4[0].length > 0) {
                            let res00 = rows4[0];
                            var ix2;
                            for (i = 0; i < res00.length; i++) {
                                coins_images += '<img src="'+res00[i].coin_img+'">';
                            }
                            res.render('clan', {
                                guild: rows[0].Name,
                                GuildId: rows[0].Id,
                                img: rows[0].img,
                                fondo: rows[0].fondo,
                                about: rows[0].about,
                                website: rows[0].website,
                                points: rows[0].points,
                                guild_menbers: texto_test,
                                guild_lider: lider_guild,
                                edit_state: state_edit,
                                coins_images: coins_images,
                                guild_coins: rows4[0].length,
                                login: login,
                                login_id: loguser
                            });
                        } else {
                            res.render('clan', {
                                guild: rows[0].Name,
                                GuildId: rows[0].Id,
                                img: rows[0].img,
                                fondo: rows[0].fondo,
                                about: rows[0].about,
                                website: rows[0].website,
                                points: rows[0].points,
                                guild_menbers: texto_test,
                                guild_lider: lider_guild,
                                edit_state: state_edit,
                                coins_images: coins_images,
                                guild_coins: 0,
                                login: login,
                                login_id: loguser
                            });
                        }
                    });
                });
            }).catch(function (err) {
                Logger.debug("Guild: " + err.stack);
                res.redirect('/');
                });
        } catch (e) {
            Logger.debug("Guild: " + e.stack);
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/:name_guild', function (req, res) {
    //.replace(/&lt;br&gt;/g, "<br>")
    var name_guild = req.params.name_guild;
    name_guild = mysql.escape(name_guild).replace("'", "").replace("'", "");
    var tmbuser = name_guild;
    var tmusr = tmbuser.toLowerCase();
    
    var cont = true;
    var website_url = req.body.website_url;
    var photo_url = req.body.photo_url;
    var page_bg_url = req.body.page_bg_url;
    var description = req.body.description;
    description = description.toString().replace(/&lt;br&gt;/g, "<br>")
    
    Logger.info('Guild Description: '+description);
    
    if (cont) {
        try {
            if (req.body.EDIT_SETTINGS === 'Save') {
                req.db.getGuildByName(tmusr)
                    .then(function (resb) {
                    var rows = resb[0];
                    req.db.updateGuildById(photo_url, page_bg_url, description, website_url, rows[0].Id)
                        .then(function (resb2) {
                        Logger.info('Edist Guild: '+rows[0].Name);
                        res.redirect('/guild/'+rows[0].Name);
                    }).catch(function (err) {
                        Logger.debug("Guild Error #1: " + err.stack);
                        res.redirect('/');
                    });
                }).catch(function (err) {
                    Logger.debug("Guild Error #2: " + err.stack);
                    res.redirect('/');
                });
            }
         } catch (e) {
            res.redirect('/');
        }
    }
});

module.exports = router;