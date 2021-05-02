var express = require('express'),
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../Controller/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');

function Commatize(b) {
    return b.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
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

router.get('/guild/:guild_name/shop', function (req, res) {
    var guild_name = req.params.guild_name;
    guild_name = mysql.escape(guild_name).replace("'", "").replace("'", "");
    var tmbuser = guild_name;
    var tmusr = tmbuser.toLowerCase();
    var user_id = req.session.account_id;
    
    let coins_images = '';
    let purchase_history = '';
    let user_feature = '';
    var login = false;//false
    var loguser = "";
    var user_cash = 0;
    var guild_leader = 0;
    let leader_status = false;
    
    if (req.session.account_id) {
        login = true;
        loguser = req.session.game_id;
    }
    
    Logger.info('Guild Shop: '+tmusr);
    if (req.session.account_id)
        req.session.touch();
    if (Buffer.byteLength(guild_name, 'utf8') < 30) {
        try {
            req.db.connection.getConnection().then(conn => {
                conn.query('SELECT game_id, rank, cash, IdAcc FROM users WHERE IdAcc = ?', [user_id])
                    .then(rows0 => {
                    conn.release();
                    if (rows0[0].length > 0) {
                        var rows_x0 = rows0[0];
                        user_cash = rows_x0[0].cash;
                    } else {
                        user_cash = 0;
                    }
                });
                conn.query('SELECT u.game_id, u.IdAcc, gm.Job FROM users u INNER JOIN guild_member gm ON u.IdAcc = gm.UserId INNER JOIN guild g ON gm.Id = g.Id WHERE u.IdAcc = ? AND g.Name = ?', [user_id, tmusr])
                    .then(rows0_1 => {
                    conn.release();
                    if (rows0_1[0].length > 0) {
                        var rows_x0_1 = rows0_1[0];
                        guild_leader = rows_x0_1[0].Job;
                    } else {
                        guild_leader = 0;
                    }
                });
                conn.query('SELECT Id, Name, img, fondo FROM guild WHERE Name = ?', [tmusr])
                    .then(rows => {
                    conn.release();
                    if (rows[0].length > 0) {
                        var rowsxd = rows[0];
                        conn.query('SELECT g.Id, g.Name, g.img, g.fondo, gc.user_id, gc.time_coin, gc.date_coin, gc.coin_img, u.game_id FROM guild g INNER JOIN guild_coins gc ON g.Id = gc.guild_id INNER JOIN users u ON gc.user_id = u.IdAcc WHERE g.Name = ?', [rowsxd[0].Name])
                            .then(rows1 => {
                            conn.release();
                            if (rows1[0].length > 0) {
                                var rows_x1 = rows1[0];
                                var i;
                                var ix2;
                                var ix3;
                                for (i = 0; i < rows_x1.length; i++) {
                                    coins_images += '<img src="'+rows_x1[i].coin_img+'">';
                                }
                                for (ix2 = 0; ix2 < rows_x1.length; ix2++) {
                                    purchase_history += '<tr><td><nobr><a href="/user/'+rows_x1[ix2].game_id+'">'+rows_x1[ix2].game_id+'</a></nobr></td><td class="nowarp"><span class="tokens">1x</span> '+getDateTime(rows_x1[ix2].time_coin)+'.</td></tr>';
                                }
                                for (ix3 = 0; ix3 < rows_x1.length; ix3++) {
                                    user_feature += '<tr><td><nobr><a href="/user/'+rows_x1[ix3].game_id+'">'+rows_x1[ix3].game_id+'</a></nobr></td><td>'+rows_x1[ix3].date_coin+'</td><td class="tokens center">1</td><td class="nowarp">'+getDateTime(rows_x1[ix3].time_coin)+'.</td></tr>';
                                }
                                if (guild_leader === 1)
                                    leader_status = true;
                                res.render('shop', {
                                    guild: rowsxd[0].Name,
                                    recargar: '',
                                    img: rowsxd[0].img,
                                    fondo: rowsxd[0].fondo,
                                    hisoty_purchase: purchase_history,
                                    feature_user: user_feature,
                                    login: login,
                                    login_id: loguser,
                                    guild_coins: rows1[0].length,
                                    
                                    my_cash: Commatize(user_cash),
                                    coins_images: coins_images,
                                    errorx1: '',
                                    error_x2: '',
                                    error_x3: '',
                                    leader_date: leader_status
                                });
                            } else {
                                res.render('shop', {
                                    guild: rowsxd[0].Name,
                                    recargar: '',
                                    img: rowsxd[0].img,
                                    fondo: rowsxd[0].fondo,
                                    hisoty_purchase: '<tr><td>Nobody bought coins yet, be the first one</td></tr>',
                                    feature_user: '<tr><td></td><td>No purchases yet, ask guild leader to buy something</td></tr>',
                                    login: login,
                                    login_id: loguser,
                                    guild_coins: 0,
                                    
                                    my_cash: Commatize(user_cash),
                                    coins_images: coins_images,
                                    errorx1: '',
                                    error_x2: '',
                                    error_x3: '',
                                    leader_date: leader_status
                                });
                            }
                        });
                    } else {
                        
                    }
                });
            });
        } catch (e) {
            Logger.debug("Guild: " + e.stack);
            res.redirect('/');
        }
    } else {
        Logger.debug("#2 Halgo salido mal URL: "+guild_name);
        res.redirect('/');
    }
});

router.post('/guild/:guild_name/shop', function (req, res) {
    var error_primario = '';
    var error_secundario = '';
    var error_terceario = '';
    var time_coin = new Date();
    var login = false;//false
    var loguser = "";
    if (req.session) {
        if (req.session.account_id) {
            var user_id = req.session.account_id;
            req.db.connection.getConnection().then(conn => {
                conn.query('SELECT game_id, rank, cash, IdAcc FROM users WHERE IdAcc = ?', [user_id])
                    .then(rows => {
                    conn.release();
                    if (rows[0].length > 0) {
                        var rows_x1 = rows[0];
                        /* ===== */
                        var guild_name = req.params.guild_name;
                        guild_name = mysql.escape(guild_name).replace("'", "").replace("'", "");
                        var tmbuser = guild_name;
                        var tmusr = tmbuser.toLowerCase();
                        if (Buffer.byteLength(guild_name, 'utf8') < 30) {
                            try {
                                
                                conn.query('SELECT Id, Name, img, fondo FROM guild WHERE Name = ?', [tmusr])
                                    .then(rows2 => {
                                    conn.release();
                                    if (rows2[0].length > 0) {
                                        var rows_x2 = rows2[0];
                                        
                                        /* ===== */
                                        
                                        var cont = true;
                                        
                                        var guild_tokens = req.body.tokens;
                                        var guild_action = req.body.action;
                                        var guild_info = req.body.info;
                                        Logger.info('Action: '+req.body.action+' *==* Info: '+req.body.info);
                                        /* ===== */
                                        if (req.session.account_id) {
                                            login = true;
                                            loguser = req.session.game_id;
                                        }
                                        if (guild_action === 'BuyTokens') {
                                            var date_coin = 'Promoted to SemiLeader';
                                            if (rows_x1[0].rank === 26 || rows_x1[0].rank === 27 || rows_x1[0].IdAcc === 6127) {
                                                error_primario = 'Oops, you are not allowed to perform this action.';
                                                cont = false;
                                            } else if (rows_x1[0].cash < 10000) {
                                                error_primario = 'Not enough Cash, you have only '+Commatize(rows_x1[0].cash)+' Cash. buy some more and try again';
                                                cont = false;
                                            } else if (rows_x1[0].rank < 17) {
                                                error_primario = 'Sorry, you need to be rank red wand or above to buy guild coins.';
                                                cont = false;
                                            } else {}
                                            
                                            /* |====| */
                                            if (cont) {
                                                conn.query('UPDATE users SET cash = cash - ? WHERE IdAcc = ?', [10000, user_id])
                                                    .then(rows_x3 => {
                                                    conn.release();
                                                    if (rows_x3.length > 0) {
                                                        let res0 = rows_x3[0];
                                                        Logger.info('The user '+rows_x1[0].game_id+' is discounted '+10000+' thousand of cash for the purchase of guild coins.');
                                                        
                                                        conn.query('INSERT into guild_coins SET guild_id = ?, user_id = ?, time_coin = ?, date_coin = ?', [rows_x2[0].Id, user_id, time_coin, date_coin])
                                                            .then(rows_4 => {
                                                            conn.release();
                                                            if (rows_4.length > 0) {
                                                                let res0 = rows_4[0];
                                                                Logger.info('The '+rows_x2[0].Name+' guild successfully won a new currency.');
                                                                res.redirect(req.header('Referer'));
                                                            } else {
                                                                Logger.info('Guild Coind Error #2.');
                                                                res.redirect(req.header('Referer'));
                                                            }
                                                        });
                                                    
                                                    } else {
                                                        res.redirect(req.header('Referer'));
                                                    }
                                                });
                                            } else {
                                                res.render('shop', {
                                                    guild: rows_x2[0].Name,
                                                    recargar: '<meta http-equiv="refresh" content="10">',
                                                    img: rows_x2[0].img,
                                                    fondo: rows_x2[0].fondo,
                                                    hisoty_purchase: '<tr><td>Loading...</td></tr>',
                                                    feature_user: '<tr><td></td><td>Loading...</td></tr>',
                                                    login: login,
                                                    login_id: loguser,
                                                    guild_coins: 'Loading...',
                                                    my_cash: Commatize(rows_x1[0].cash),
                                                    coins_images: 'Loading...',
                                                    errorx1: error_primario,
                                                    error_x2: error_secundario,
                                                    error_x3: error_terceario,
                                                    leader_date: false
                                                });
                                            }
                                            /* |====| */
                                        
                                        } else if (guild_action === 'promoteSubLeader') {
                                            
                                            conn.query('SELECT g.Id, g.Name, g.img, g.fondo, gc.user_id, gc.time_coin, gc.date_coin, gc.coin_img, u.game_id FROM guild g INNER JOIN guild_coins gc ON g.Id = gc.guild_id INNER JOIN users u ON gc.user_id = u.IdAcc WHERE g.Name = ?', [tmusr])
                                                .then(rows_x3 => {
                                                conn.release();
                                                if (rows_x3[0].length > 0) {
                                                    let res00_x1 = rows_x3[0];
                                                    /* |*=====---------------------=====*| */
                                                    conn.query('SELECT u.game_id, u.IdAcc, gm.Job FROM users u INNER JOIN guild_member gm ON u.IdAcc = gm.UserId INNER JOIN guild g ON gm.Id = g.Id WHERE u.IdAcc = ? AND g.Name = ?', [user_id, tmusr])
                                                        .then(rows_x4 => {
                                                        conn.release();
                                                        if (rows_x4[0].length > 0) {
                                                            var rows_x6 = rows_x4[0];
                                                            /* |<*-================-*>| */
                                                            
                                                            /* |*==========*| */
                                                            conn.query('SELECT id, guild_id, user_id, time_coin, date_coin, coin_img FROM guild_coins WHERE guild_id = ? ORDER BY rand() LIMIT ?', [rows_x2[0].Id, 1])
                                                                .then(rows2 => {
                                                                conn.release();
                                                                if (rows2[0].length > 0) {
                                                                    let res0 = rows2[0];
                                                                    var guild2_id = res0[0].id;
                                                                    Logger.info('ID Mostrado para eliminar coins es: '+guild2_id);
                                                                    
                                                                    
                                                                    conn.query('SELECT gm.Id, gm.UserId, gm.Job, u.game_id FROM guild_member gm INNER JOIN users u ON gm.UserId = u.IdAcc WHERE gm.Id = ? AND u.game_id = ?', [rows_x2[0].Id, guild_info])
                                                                        .then(rows3 => {
                                                                        conn.release();
                                                                        if (rows3[0].length > 0) {
                                                                            let res0000 = rows3[0];
                                                                            
                                                                            
                                                                            conn.query('DELETE FROM guild_coins WHERE id = ?', [guild2_id])
                                                                                .then(rows4 => {
                                                                                conn.release();
                                                                                if (rows4[0].affectedRows > 0 || rows4[0].changedRows > 0) {
                                                                                    Logger.info('Guild Coin Eliminado');
                                                                                    var Job = 2;
                                                                                    var userid = res0000[0].UserId;
                                                                                    
                                                                                    
                                                                                    conn.query('UPDATE guild_member SET Job = ? WHERE UserId = ?', [Job, userid])
                                                                                        .then(rows4 => {
                                                                                        conn.release();
                                                                                        if (rows4[0].affectedRows > 0 || rows4[0].changedRows > 0) {
                                                                                            Logger.info('El user: '+res0000[0].game_id+' Ahora es semilider en el guild: '+rows_x2[0].Name);
                                                                                            res.redirect(req.header('Referer'));
                                                                                        } else {
                                                                                            Logger.info('Error al poner como semilider en el guild: '+res0[0].guild_id);
                                                                                            res.redirect(req.header('Referer'));
                                                                                        }
                                                                                    });
                                                                                
                                                                                
                                                                                } else {
                                                                                    Logger.info('Error al eliminar un coin en el guild: '+res0[0].guild_id);
                                                                                    res.redirect(req.header('Referer'));
                                                                                }
                                                                            });
                                                                        
                                                                        
                                                                        } else {
                                                                            Logger.info('El usuario: '+guild_info+' No esta en este mismo Guild');
                                                                            res.redirect(req.header('Referer'));
                                                                        }
                                                                    });
                                                                
                                                                
                                                                } else {
                                                                    res.redirect(req.header('Referer'));
                                                                }
                                                            });
                                                            /* |*==========*| */
                                                            
                                                            /* |<*-================-*>| */
                                                        } else {
                                                            /* |<*-================-*>| */
                                                            res.render('shop', {
                                                                guild: rows_x2[0].Name,
                                                                recargar: '<meta http-equiv="refresh" content="15">',
                                                                img: rows_x2[0].img,
                                                                fondo: rows_x2[0].fondo,
                                                                hisoty_purchase: '<tr><td>Loading...</td></tr>',
                                                                feature_user: '<tr><td></td><td>Loading...</td></tr>',
                                                                login: login,
                                                                login_id: loguser,
                                                                guild_coins: 'Loading...',
                                                                my_cash: Commatize(rows_x1[0].cash),
                                                                coins_images: 'Loading...',
                                                                errorx1: '',
                                                                error_x2: '',
                                                                error_x3: 'You are not the leader of this guild to be able to place this order',
                                                                leader_date: false
                                                            });
                                                            /* |<*-================-*>| */
                                                        }
                                                    });
                                                    /* |*=====---------------------=====*| */
                                                } else {
                                                    /* |*=====---------------------=====*| */
                                                    res.render('shop', {
                                                        guild: rows_x2[0].Name,
                                                        recargar: '<meta http-equiv="refresh" content="15">',
                                                        img: rows_x2[0].img,
                                                        fondo: rows_x2[0].fondo,
                                                        hisoty_purchase: '<tr><td>Loading...</td></tr>',
                                                        feature_user: '<tr><td></td><td>Loading...</td></tr>',
                                                        login: login,
                                                        login_id: loguser,
                                                        guild_coins: 'Loading...',
                                                        my_cash: Commatize(rows_x1[0].cash),
                                                        coins_images: 'Loading...',
                                                        errorx1: '',
                                                        error_x2: '',
                                                        error_x3: 'Not enough Guild Coins, buy some more and try again',
                                                        leader_date: false
                                                    });
                                                    /* |*=====---------------------=====*| */
                                                }
                                            });
                                        } else {
                                            res.send(JSON.stringify("Coming Soon."));
                                        }
                                    
                                    } else {
                                        res.send(JSON.stringify("Oops An undefined error occurred"));
                                    }
                                });
                                
                            } catch (e) {
                                res.redirect('/');
                            }
                        } else {
                            res.redirect('/');
                        }
                    } else {
                        res.send(JSON.stringify("Oops An undefined error occurred"));
                    }
                });
            });
        } else {
            res.send(JSON.stringify("Please login first"));
        }
    } else {
        res.send(JSON.stringify("Please login first"));
    }
});

module.exports = router;