var express = require('express'),
    router = express.Router();
var _ = require('underscore');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var mysql = require('mysql2/promise');
var Logger = require('../../game/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
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

router.use('/w2', require('./w2'));
router.use('/guild', require('./guild'));
router.use('/user', require('./user'));
router.use('/u', require('./search_user_id'));
router.use('/api', require('./api'));
router.use('/f', require('./facebook'));
router.use('/settings', require('./userctl'));
router.use('/post_action', require('./posts'));
router.use('/me', require('./myplayer'));
router.use('/accounts/password/change', require('./password_change'));
router.use('/accounts/password/change/done', require('./password_change_done'));
router.use('/ban', require('./ban'));
router.use('/pin', require('./pin_code'));
router.use('/my_payments', require('./my_payments'));
router.use('/z', require('./ScreenShot'));
router.use('/cash', require('./cash'));
router.use('/chat', require('./chat'));

router.get('/guild/:guild_id/shop', require('./shopctl.js'));
router.post('/guild/:guild_id/shop', require('./shopctl.js'));

router.get('/you_are_welcome', function (req, res) {
    if (req.session) {
        if (req.session.account_id) {
            res.render('welcome', {
                user: req.session.game_id
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/', function (req, res) {
    res.render('index', {});
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/login', function (req, res) {
    res.render('login', {});
});

router.get('/cash', function (req, res) {
    res.render('cash', {});
});

router.get('/test', function (req, res) {
    res.redirect('/');
});

router.get('/anticheat', function (req, res) {
    res.redirect('/');
});

router.get('/rr', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var b;
    b = new Date().getTime();
    var data = [];
    if (req.query.r == 4 && isNaN(req.query.s)) {
        return null;
    }
    if (req.query.r == 8) {
        req.db.connection.getConnection().then(conn => {
            conn.query('SELECT Id, Name, members, rank, img, fondo, about FROM guild')
                .then(rows1 => {
                conn.release();
                if (rows1[0].length > 0) {
                    let res01 = rows1[0];
                    let next_rank = 0;
                    for (var u in res01) {
                        if (res01[u].members <= 1099) { next_rank = 0; }
                        else if (res01[u].members >= 1100 && res01[u].members <= 1799) { next_rank = 1; }
                        else if (res01[u].members >= 1800 && res01[u].members <= 2499) { next_rank = 2; }
                        else if (res01[u].members >= 2500 && res01[u].members <= 3099) { next_rank = 3; }
                        else if (res01[u].members >= 3100 && res01[u].members <= 3899) { next_rank = 4; }
                        else if (res01[u].members >= 3900 && res01[u].members <= 4399) { next_rank = 5; }
                        else if (res01[u].members >= 4400 && res01[u].members <= 4999) { next_rank = 6; }
                        else if (res01[u].members >= 5000 && res01[u].members <= 5599) { next_rank = 7; }
                        else if (res01[u].members >= 5600 && res01[u].members <= 6099) { next_rank = 8; }
                        else if (res01[u].members >= 6100 && res01[u].members <= 6999) { next_rank = 9; }
                        else if (res01[u].members >= 7000 && res01[u].members <= 7699) { next_rank = 10; }
                        else if (res01[u].members >= 7700 && res01[u].members <= 12462) { next_rank = 11; }
                        else if (res01[u].members >= 12463 && res01[u].members <= 19155) { next_rank = 12; }
                        else if (res01[u].members >= 19156 && res01[u].members <= 31104) { next_rank = 13; }
                        else if (res01[u].members >= 31105 && res01[u].members <= 57843) { next_rank = 14; }
                        else if (res01[u].members >= 57844 && res01[u].members <= 78881) { next_rank = 15; }
                        else if (res01[u].members >= 78882 && res01[u].members <= 117583) { next_rank = 16; }
                        else if (res01[u].members >= 117584 && res01[u].members <= 396573) { next_rank = 17; }
                        else if (res01[u].members >= 396574 && res01[u].members <= 738244) { next_rank = 18; }
                        else if (res01[u].members >= 738245 && res01[u].members <= 1355627) { next_rank = 19; }
                        else if (res01[u].members >= 1355628 && res01[u].members <= 2193433) { next_rank = 20; }
                        else if (res01[u].members >= 2193434 && res01[u].members <= 8632317) { next_rank = 21; }
                        else if (res01[u].members >= 8632318 && res01[u].members <= 19392509) { next_rank = 22; }
                        else if (res01[u].members >= 19392510 && res01[u].members <= 33561221) { next_rank = 23; }
                        else if (res01[u].members >= 33561222) { next_rank = 24; } else {}
                        if (res01[u].rank != next_rank) {
                            if (res01[u].rank <= 25 && res01[u].Name !== 'GM') {
                                var IdGuild = res01[u].Id;
                                conn.query('UPDATE guild SET rank = ? WHERE Id = ?', [next_rank, IdGuild])
                                    .then(rows3 => {
                                    conn.release();
                                    if (rows3[0].affectedRows > 0 || rows3[0].changedRows > 0) {
                                        Logger.info('Guild: ' + res01[u].Name + ' - New Update Rank: ' + next_rank);
                                    } else {
                                        Logger.info('Bug Guild: ' + res01[u].Name + ' - New Update Rank: ' + next_rank);
                                    }
                                    return null;
                                });
                            }
                        }
                    }
                    return null;
                } else {}
            });
            var number_link = parseInt(req.query.s);
            if (number_link === 1)
                number_link = 0;
            conn.query('SELECT Id, Name, members, rank, img, fondo, about FROM guild ORDER BY members DESC limit '+number_link+', 30')
                .then(rows => {
                conn.release();
                if (rows.length > 0) {
                    let res0 = rows[0];
                    data.push("8");
                    data.push(req.query.s);
                    for (var u in res0) {
                        data.push(res0[u].members, res0[u].rank, res0[u].Name);
                    }
                    data.push([b,71,parseInt(Date.now() + (7 * 24 * 60 * 60 * 1000))],b);
                    res.send(JSON.stringify(data));
                } else {
                    res.send(JSON.stringify([0]));
                }
            });
        });
    }
    else if (req.query.r == 1) {
        req.db.connection.getConnection().then(conn => {
            var number_link = parseInt(req.query.s) == 1?0:parseInt(req.query.s);
            conn.query('SELECT u.game_id, u.gp, u.rank, g.Name FROM users u LEFT JOIN guild_member m ON m.UserId = u.IdAcc LEFT JOIN guild g ON g.Id = m.Id ORDER BY u.gp DESC limit '+number_link+', 30')
                .then(rows => {
                conn.release();
                if (rows.length > 0) {
                    let res0 = rows[0];
                    data.push("1");
                    data.push(req.query.s);
                    for (var u in res0) {
                        data.push(res0[u].gp, res0[u].rank, res0[u].game_id, res0[u].Name ? res0[u].Name : "");
                    }
                    data.push([Date.now(),30,null],Date.now());
                    res.send(JSON.stringify(data));
                } else {
                    res.send(JSON.stringify([0]));
                }
            });
        });
    }
    else if (req.query.r == 4) {
        req.db.connection.getConnection().then(conn => {
            var number_link = parseInt(req.query.s);
            if (number_link === 1)
                number_link = 0;
            conn.query('SELECT u.game_id, u.rank, u.prixw, g.Name FROM users u LEFT JOIN guild_member m ON m.UserId = u.IdAcc LEFT JOIN guild g ON g.Id = m.Id WHERE u.prixw != 0 ORDER BY u.prixw DESC limit '+number_link+', 30')
                .then(rows => {
                conn.release();
                if (rows.length > 0) {
                    let res0 = rows[0];
                    data.push("1");
                    data.push(req.query.s);
                    for (var u in res0) {
                        data.push(res0[u].prixw, res0[u].rank, res0[u].game_id, res0[u].Name ? res0[u].Name : "");
                    }
                    data.push([b,30,null],b);
                    res.send(JSON.stringify(data));
                } else {
                    res.send(JSON.stringify([0]));
                }
            });
        });
    }
    else if (req.query.r == 3) {
        req.db.connection.getConnection().then(conn => {
            var number_link = parseInt(req.query.s);
            if (number_link === 1)
                number_link = 0;
            conn.query('SELECT Id, Name, points, rank FROM guild WHERE points != 0 ORDER BY points DESC LIMIT '+number_link+', 30')
                .then(rows => {
                conn.release();
                if (rows.length > 0) {
                    let res0 = rows[0];
                    data.push("8");
                    data.push(req.query.s);
                    for (var u in res0) {
                        data.push(res0[u].points, res0[u].rank, res0[u].Name);
                    }
                    data.push([b,30,null],b);
                    res.send(JSON.stringify(data));
                } else {
                    res.send(JSON.stringify([0]));
                }
            });
        });
    } else {
        res.send(JSON.stringify("Disculpe, por el momento no tenemos una informaci\u00f3n precisa para mostrar en este pedido."));
    }
});

router.get('/rankings', function (req, res) {//"Please login first"
    res.setHeader('Content-Type', 'application/json');
    var data = [];
    if (req.query.type === 'friends') {
        if (req.session) {
            if (req.session.account_id) {
                var game_id = req.session.game_id;
                var rank = req.session.rank;
                var acc_id = req.session.account_id;
                req.db.connection.getConnection().then(conn => {
                    conn.query('SELECT u.IdAcc, u.gp, u.game_id, u.rank FROM users u INNER JOIN friends ds ON u.IdAcc = ds.id_amigo INNER JOIN accounts a ON u.IdAcc = a.Id ANd ds.id_yo = ? ORDER BY u.gp DESC', [acc_id])
                        .then(rows => {
                        conn.release();
                        if (rows[0].length > 0) {
                            let res0 = rows[0];
                            data.push(5);
                            data.push(1);
                            for (var u in res0) {
                                data.push(/*u, */res0[u].gp, res0[u].rank, res0[u].game_id);
                            }
                            res.send(JSON.stringify(data));
                        } else {
                            res.send(JSON.stringify([5, 1,/*1,*/ 1000, rank, game_id]));
                        }
                    });
                });
            } else {
                res.send(JSON.stringify("Please login first"));
            }
        } else {
            res.send(JSON.stringify("Please login first"));
        }
    } else if (req.query.type === 'guild') {
        if (req.session) {
            if (req.session.account_id) {
                var acc_id = req.session.account_id;
                req.db.connection.getConnection().then(conn => {
                    conn.query('SELECT g.Id FROM users u INNER JOIN guild_member m ON m.UserId = u.IdAcc LEFT JOIN guild g ON g.Id = m.Id WHERE u.IdAcc = ?', [acc_id])
                        .then(rowss => {
                        conn.release();
                        if (rowss[0].length > 0) {
                            let res00 = rowss[0];
                            conn.query('SELECT u.game_id, u.IdAcc, u.rank, u.gp from guild_member m INNER JOIN guild g ON m.Id = g.Id INNER JOIN users u ON m.UserId = u.IdAcc WHERE g.Id = ? ORDER BY u.gp DESC', [res00[0].Id])
                                .then(rows => {
                                conn.release();
                                if (rows[0].length > 0) {
                                    let res0 = rows[0];
                                    data.push(6);
                                    data.push(1);
                                    for (var u in res0) {
                                        data.push(/*u, */res0[u].gp, res0[u].rank, res0[u].game_id);
                                    }
                                    res.send(JSON.stringify(data));
                                } else {
                                    res.send(JSON.stringify("You are not in a guild"));
                                }
                            });
                        } else {
                            res.send(JSON.stringify("You are not in a guild"));
                        }
                    });
                });
            } else {
                res.send(JSON.stringify("Please login first"));
            }
        } else {
            res.send(JSON.stringify("Please login first"));
        }
    } else {
        res.send(JSON.stringify("Unknown type"));
    }
});
///
router.get('/ri', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  req.db.connection.getConnection().then(conn => {
    conn.query('SELECT u.game_id, u.gp, u.rank FROM users u ').then(rows => {
      conn.query('SELECT u.rank FROM users u').then(rows2=> {
      
      const rank = rows2[0];
      const countPlayer = [];

      for(let u = 0; u < rank.length; u++){
        countPlayer[rank[u].rank] = countPlayer[rank[u].rank]?countPlayer[rank[u].rank]+1:1;
      } 
          var level = [
            //time
            Date.now(), 
            //gp
            [1100, 1200, 1500, 1800, 2300, 2800, 3500, 4200, 5100, 6000, 6900, 8243, 9981, 12264, 15468, 20522, 27653, 38842, 52356, 80315, 95011, 100300, 336017, 400000],
            //accounts
            [0, 1, "!", "!", "!", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 6],
            //rulers
            [80, 62, 46, 32, 20, 12, 6, 3, 1, 0.1]
          ];
          for(let i = 0; i<level[2].length; i++){
            level[2][i] = countPlayer[i]?countPlayer[i]:"?";
        }
      res.send(JSON.stringify(level));
      });
    });
  });
});
////
router.get('/s', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (req.session) {
        if (req.session.account_id) {
            req.session.touch();
            var acc_id = req.session.account_id;
            var rank = req.session.rank;
            var acc_session = req.session.acc_session;
            res.send(JSON.stringify([acc_id, rank, 0, acc_session, 'PE', 0]));
        } else {
            res.send(JSON.stringify([0]));
        }
    } else {
        res.send(JSON.stringify([0]));
    }
});

router.get('/f', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify([0]));
});

router.post('/f', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify([0]));
});

router.post('/g', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    req.session.destroy();
    res.send(JSON.stringify([0]));
});

router.post('/ajaxLogin', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var valid_enter = true;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    var reg = /([^f:]+)/;
    let ip_result = reg.exec(req.connection.remoteAddress)[0];
    
    
    if (!valid_enter) {
        Logger.debug("flood " + req.headers.origin + " " + req.headers.host);
        res.status(500).send('Ip Banned!');
        return null;
    }
    var country = '';
    if (ip) {
        var tmpip = ip.split(',');
        var geo = geoip.lookup(tmpip[0]);
        if (geo) {
            country = geo.country;
        }
    }
    var user = req.body.u;
    var password = req.body.p;
    Logger.log("'" + user + "' " + req.body.r);
    if (Buffer.byteLength(user, 'utf8') < 2 || Buffer.byteLength(user, 'utf8') > 30) {
        res.send(JSON.stringify(["ERROR :)"]));
    } else {
        req.db.getAccountByUsername(user)
            .then(function (rows) {
                var data = rows[0][0];
                if (data.Password === password) {
                    req.db.getUserByIdAcc(data.Id)
                        .then(function (rows2) {
                            if (rows2[0].length > 0) {
                                var res1 = rows2[0][0];
                                req.session.cookie.expires = false;
                                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 1440));
                                req.session.account_id = data.Id;
                                req.session.rank = res1.rank;
                                req.session.acc_session = data.Session;
                                req.session.game_id = res1.game_id;
                                Logger.log("Login: " + res1.game_id);
                                if (res1.banned === 1) {
                                    req.db.getUserByBannedTest(data.Id)
                                        .then(function (dbplay) {
                                           var dbtt = dbplay[0][0];
                                           if (dbtt.date === 'Forever') {
                                               res.send(JSON.stringify([dbtt.razon, dbtt.date, 0]));
                                               return null;
                                           } else {
                                               if (Date.now() >= parseInt(dbtt.date)) {
                                                   req.db.deleteBannedByIdAcc(data.Id);
                                                   req.db.updateBannedStatus(0, data.Id);
                                                   res.status(500).send('The ban was removed from your account, you are kindly asked to login to your account again.');
                                               } else {
                                                   res.send(JSON.stringify([dbtt.razon, DateBan(parseInt(dbtt.date)), 0]));
                                                   return null;
                                               }
                                           }
                                    });
                                }
                                if (res1.banned === 0) {
                                    res.send(JSON.stringify([data.Id, res1.rank, 0, data.Session, res1.game_id, 0]));
                                    req.db.deleteAvatarExpireByUserId(Date.now(), data.Id);
                                    req.db.updateIpComputerUsers(ip_result, data.Id);
                                    req.db.updateAccountByIpComputer(ip_result, data.Id);
                                    req.db.getRankSpecialByIdAcc(data.Id)
                                        .then(function (dbbplay) {
                                           var dbbtt = dbbplay[0][0];
                                           var time = Date.now();
                                           if (dbbtt.time < time) {
                                               req.db.updateRankSpecialByIdAcc(0, 0, data.Id);
                                               req.db.deleteSistemRankSpecialByIdAcc(data.Id);
                                           }
                                    });
                                }
                            } else {
                                res.send(JSON.stringify([0]));
                            }
                        })
                        .catch(function (err) {
                            res.send(JSON.stringify([0]));
                        });
                } else {
                    Logger.log("'" + user + "' password error " + data.Password + " " + password);
                    res.send(JSON.stringify([0]));
                }
            })
            .catch(function (err) {
                res.send(JSON.stringify([0]));
            });
    }
});

router.post('/ajaxRegister', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var valid_enter = true;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    var reg = /([^f:]+)/;
    let ip_result = reg.exec(req.connection.remoteAddress)[0];
    var password = req.body.password;
    var gender = req.body.gender;
    var country = req.body.my_player_country;
    var user = req.body.name;
    var tmpusrl = user;
    var tmpuser = tmpusrl.toLowerCase();
    

    if (ip_result === '190.42.88.35' || ip_result === '200.8.145.186') {
        res.send(JSON.stringify(['Your IP Was Forbidden In The Game!']));
        return null;
    }
    
    if (!valid_enter) {
        Logger.debug("floodreg " + req.headers.origin + " " + req.headers.host);
        res.status(500).send('Ip Banned!');
        return null;
    }
    if (ignoreCase.startsWith(user, " ") === true || ignoreCase.endsWith(user, " ") === true || /\s/g.test(user) === true) {
        res.send(JSON.stringify("<ul class='errorlist'><li>Nombre<ul><li>No puede contener espacios.</li></ul></li></ul>"));
        return null;
    }
    if(isNaN(password) === false){
        res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Contraseña
                    <ul><li>
                    La contraseña no puede ser totalmente númerica.
                    </li></ul></li></ul>`));
        return null;
    }
    if(user === password){
        res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Nombre
                    <ul><li>
                    El nombre no puede ser igual a la contraseña.
                    </li></ul></li></ul>`));
        return null;
    }
    
    
    var validate = false;
    if (gender === 'm')
        gender = 'm';
    else if (gender === 'f')
        gender = 'f';
    else {
        res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Género
                    <ul><li>
                    Al parecer no has escogido ningún género.
                    </li></ul></li></ul>`));
        return null;
    }
    if (Buffer.byteLength(user, 'utf8') < 2 || Buffer.byteLength(user, 'utf8') > 15) {
        res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Nombre
                    <ul><li>
                    El nombre debe de tener como mínimo 2 letras.
                    </li></ul></li></ul>`));
        return null;
    }
    if(Buffer.byteLength(password, 'utf8') < 4 || Buffer.byteLength(password, 'utf8') > 100) {
        res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Contraseña
                    <ul><li>
                    La contraseña es muy corta. Debe de tener como mínimo 4 letras.
                    </li></ul></li></ul>`));
        return null;
    }
    Logger.log("'" + user + "' " + gender);
    if (Buffer.byteLength(user, 'utf8') < 2 || Buffer.byteLength(user, 'utf8') > 30) {
        res.send(JSON.stringify(["Nombre de Usuario incorrecto!"]));
    } else {
        req.db.dontExitsUserByUsername(tmpuser)
            .then(function (rows) {
                req.db.dontExitsUserByGameId(user)
                    .then(function (rows1) {
                        var validate = true;
                        var dt2 = {
                            Email: '',
                            Name: user,
                            Password: password,
                            Username: user,
                            Salt: ':',
                            Session: md5(user + ":" + gender),
                            IsOnline: 0,
                            Birthday: new Date(),
                            IP: ip_result
                        };
                        req.db.putAccountFB(dt2)
                            .then(function (result) {
                                var uid = result[0].insertId;
                                var datos = {
                                    game_id: user,
                                    rank: 0,
                                    gp: 1000,
                                    gold: 500000,
                                    cash: 30000,
                                    gender: gender,
                                    unlock: 0,
                                    photo_url: '',
                                    name_changes: 0,
                                    power_user: 0,
                                    plus10gp: 0,
                                    mobile_fox: 0,
                                    country: country,
                                    flowers: 0,
                                    map_pack: 0,
                                    megaphones: 0,
                                    is_muted: 0,
                                    IdAcc: uid,
                                    IP: ip_result
                                };
                                req.db.putUserFB(datos)
                                    .then(function (result2) {
                                        var nnid = result2[0].insertId;
                                        var head = 1;
                                        var body = 2;
                                        if (gender === 'f') {
                                            head = 3;
                                            body = 4;
                                        }
                                        var nxdi = {
                                            Id: nnid,
                                            head: head,
                                            body: body,
                                            eyes: 0,
                                            flag: 0,
                                            background: 0,
                                            foreground: 0
                                        };
                                        req.db.putAvatarUseFB(nxdi)
                                            .then(function (rows4) {
                                                req.session.cookie.expires = false;
                                                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 1440));
                                                req.session.account_id = uid;
                                                req.session.rank = datos.rank;
                                                req.session.acc_session = dt2.Session;
                                                req.session.game_id = user;
                                                res.send(JSON.stringify([uid, datos.rank, 0, dt2.Session, datos.game_id, 0]));
                                                req.db.putRelationNew(result[0].insertId);
                                                req.db.putFriends(result[0].insertId, result[0].insertId);
                                            })
                                            .catch(function (err) {
                                                res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Nombre
                    <ul><li>
                    El nombre de usuario ya existe. Pruebe con otro usuario.
                    </li></ul></li></ul>`));
        return null;
                                            });
                                    }).catch(function (err) {
                                        res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Nombre
                    <ul><li>
                    El nombre de usuario ya existe. Pruebe con otro usuario.
                    </li></ul></li></ul>`));
        return null;
                                    });
                            }).catch(function (err) {
                                res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Nombre
                    <ul><li>
                    El nombre de usuario ya existe. Pruebe con otro usuario.
                    </li></ul></li></ul>`));
        return null;
                            });
                    })
                    .catch(function (err) {
                        res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Nombre
                    <ul><li>
                    El nombre de usuario ya existe. Pruebe con otro usuario.
                    </li></ul></li></ul>`));
        return null;
                    });
            })
            .catch(function (err) {
                res.send(JSON.stringify(`
            <ul class='errorlist'>
                <li>Nombre
                    <ul><li>
                    El nombre de usuario ya existe. Pruebe con otro usuario.
                    </li></ul></li></ul>`));
        return null;
            });
    }
});

module.exports = router;