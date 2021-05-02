let mysql = require('mysql2/promise');
var Logger = require('./lib/logger');
var Promise = require('promise');
// database
module.exports = class DataBase {
    constructor() {
        var self = this;
        this.connection = null;
        this.host = 'localhost';
        this.user = 'root';
        this.password = '';
        this.database = 'dragonbound';
        
        this.connection = mysql.createPool({
            connectionLimit: 500,
            host: self.host,
            user: self.user,
            password: self.password,
            database: self.database
        });
        if (this.connection !== null) {
            Logger.normal("MYSQL Connect!");
        }
    }

    getConnection() {
        return this.connection;
    }

    getAccountByUsername(user) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT Id, Session, Password FROM accounts where Username = ?', [user])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    getUserByIdAcc(id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT rank, game_id, country FROM users where IdAcc = ?', [id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    getUserByIdAccGame(id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT u.Id, u.gm, u.IdAcc, u.country, u.game_id, u.rank, u.gp, u.gold, u.cash, u.name_changes, u.gender, u.photo_url, u.is_muted, u.win, u.loss, ae.head, ae.body, ae.eyes, ae.flag, ae.background, ae.foreground, ac.Session FROM users u INNER JOIN user_avatar_equiped ae ON u.Id = ae.Id INNER JOIN accounts ac ON ac.Id = u.IdAcc WHERE u.IdAcc = ?', [id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    getGuildByIdAcc(id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT m.Id, m.Job, g.Name from guild_member m INNER JOIN guild g ON m.Id = g.Id WHERE m.UserId = ?', [id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    getGuildMembersById(id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT m.Job, u.game_id, u.IdAcc, u.rank, u.gp, u.gender, u.photo_url from guild_member m INNER JOIN guild g ON m.Id = g.Id INNER JOIN users u ON m.UserId = u.IdAcc WHERE g.Id = ?', [id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    getUserAvatarsByIdAcc(id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT Id, UserId, aId, type, is_cash, is_gift, amount, expire_time FROM user_avatars WHERE UserId = ?', [id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    getPlayerData(id, session) {
        var self = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            self.getUserByIdAccGame(id)
                .then(function (rows0) {
                    let rows = rows0[0];
                    if (rows[0].Session === session) {
                        data.user_id = rows[0].IdAcc;
                        data.reg_id = rows[0].Id;
                        data.game_id = rows[0].game_id;
                        data.country = rows[0].country;
                        data.rank = rows[0].rank;
                        data.gp = rows[0].gp;
                        data.gold = rows[0].gold;
                        data.cash = rows[0].cash;
                        data.gender = rows[0].gender;
                        data.name_changes = rows[0].name_changes;
                        data.photo_url = rows[0].photo_url;
                        data.ahead = rows[0].head;
                        data.abody = rows[0].body;
                        data.aeyes = rows[0].eyes;
                        data.aflag = rows[0].flag;
                        data.abackground = rows[0].background;
                        data.aforeground = rows[0].foreground;
                        data.is_muted = rows[0].is_muted;
                        data.win = rows[0].win;
                        data.loss = rows[0].loss;
                        data.gm = rows[0].gm;
                        data.guild_members = [];
                        data.guild = '';
                        data.guild_id = 0;
                        self.getGuildByIdAcc(data.user_id)
                            .then(function (rows2) {
                                let res2 = rows2[0];
                                data.guild_id = res2[0].Id;
                                data.guild = res2[0].Name;
                                data.guild_job = res2[0].Job;
                                data.guild_members.push(data.guild);
                                data.guild_members.push(data.guild_job);
                                self.getGuildMembersById(data.guild_id)
                                    .then(function (rows3) {
                                        var res3 = rows3[0];
                                        for (var ix in res3) {
                                            var data_mem = [
                                                res3[ix].IdAcc,
                                                res3[ix].game_id,
                                                res3[ix].gender,
                                                res3[ix].rank,
                                                res3[ix].gp,
                                                res3[ix].photo_url,
                                                2,
                                                0
                                            ];
                                            data.guild_members.push(data_mem);
                                        }
                                        return resolve(data);
                                    }).catch(function (err) {
                                        return resolve(data);
                                    });
                            })
                            .catch(function (err) {
                                return resolve(data);
                            });
                    } else {
                        return reject();
                    }
                })
                .catch(function (err) {
                    return reject(err);
                });
        });
    }

    getPlayerAvatars(account) {
        var self = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            self.getUserAvatarsByIdAcc(account.user_id)
                .then(function (rows) {
                    if (rows[0].length > 0) {
                        var res0 = rows[0];
                        var lstAvatars = [];
                        for (var xm in res0) {
                            var equip = 0;
                            if (account.player.ahead == res0[xm].aId || account.player.abody == res0[xm].aId || account.player.aeyes == res0[xm].aId || account.player.aflag == res0[xm].aId || account.player.abackground == res0[xm].aId || account.player.aforeground == res0[xm].aId) {
                                equip = 1;
                            }
                            lstAvatars.push([res0[xm].Id, res0[xm].aId, equip, res0[xm].type]);
                        }
                        data.data_list = lstAvatars;
                        return resolve(data);
                    } else {
                        data.data_list = [];
                        return resolve(data);
                    }
                })
                .catch(function (err) {
                    data.data_list = [];
                    return resolve(data);
                });
        });
    }

    getGoldCashByIdAcc(id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT gold, cash FROM users WHERE IdAcc = ?', [id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    putUserAvatars(data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('INSERT into user_avatars SET ?', [data])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    updateGoldCashByIdAcc(sql, mont, id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query(sql, [mont, id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    buyAvatarForAccount(user_id, is_cash, precio, data_insert) {
        var self = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            self.getGoldCashByIdAcc(user_id)
                .then(function (rows) {
                    var res0 = rows[0][0];
                    var gold = res0.gold;
                    var cash = res0.cash;
                    var trans_valido = false;
                    if (is_cash) {
                        if (cash >= precio)
                            trans_valido = true;
                    } else {
                        if (gold >= precio)
                            trans_valido = true;
                    }
                    if (trans_valido) {
                        self.putUserAvatars(data_insert)
                            .then(function (rows2) {
                                var scpt = 'UPDATE users SET cash = cash - ? WHERE IdAcc = ?';
                                if (is_cash === true) {
                                    data.gold = gold - precio;
                                } else {
                                    scpt = 'UPDATE users SET gold = gold - ? WHERE IdAcc = ?';
                                    data.cash = cash - precio;
                                }
                                self.updateGoldCashByIdAcc(scpt, precio, user_id)
                                    .then(function (rows3) {
                                        return resolve(data);
                                    })
                                    .catch(function (err) {
                                        Logger.error("" + err.stack);
                                        return reject(data);
                                    });
                            })
                            .catch(function (err) {
                                Logger.error("" + err.stack);
                                return reject(data);
                            });
                    } else {
                        return reject(data);
                    }
                })
                .catch(function (err) {
                    Logger.error("" + err.stack);
                    return reject(data);
                });
        });
    }

    dontExitsUserByGameId(id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT game_id FROM users WHERE LOWER(`game_id`) = ?', [id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return reject();
                        else
                            return resolve();
                    });
            });
        });
    }

    dontExitsUserByUsername(username) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT Name, Username FROM accounts WHERE LOWER(`Username`) = ?', [username])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return reject();
                        else
                            return resolve();
                    });
            });
        });
    }

    updateGameIdAndCashByIdAcc(nname, discount, user_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('UPDATE users SET game_id = ?, name_changes = name_changes + 1, cash = cash - ? WHERE IdAcc = ?', [nname, discount, user_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    changeName(nname, account) {
        nname = nname.replace('%', '');
        nname = nname.replace('\\', '');
        nname = nname.replace('/', '');
        nname = nname.replace('\'', '');
        nname = nname.replace('"', '');
        nname = nname.replace('<', '');
        nname = nname.replace('>', '');
        nname = nname.replace('|', '');
        nname = nname.replace(',', '');
        nname = nname.replace('.', '');
        nname = nname.replace('+', '');
        nname = nname.replace('-', '');
        var self = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            self.dontExitsUserByGameId(nname)
                .then(function () {
                    var discount = 0;
                    if (account.player.name_changes > 0)
                        discount = 4000;
                    if (account.player.cash < discount) {
                        data.error_cash = true;
                    } else {
                        account.player.name_changes += 1;
                        self.updateGameIdAndCashByIdAcc(nname, discount, account.user_id)
                            .then(function (rows2) {
                                data.change = true;
                                return resolve(data);
                            });
                    }
                })
                .catch(function (err) {
                    return reject();
                });
        });
    }

    dontExistGuildName(name) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT * FROM guild WHERE LOWER(`Name`) = ?', [name])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return reject();
                        else
                            return resolve();
                    });
            });
        });
    }

    putGuild(name) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('INSERT INTO guild SET Name = ?', [name])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    putGuildMember(guild_id, user_id, job) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('INSERT INTO guild_member SET Id = ?, UserId = ?, Job = ?', [guild_id, user_id, job])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    updateUserDiscountGoldForGuild(mont, user_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('UPDATE users SET gold = gold - ? WHERE IdAcc = ?', [mont, user_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    createGuild(name, account) {
        var self = this;
        var data = {};
        var tmpname = name + "";
        var tmplow = tmpname.toLowerCase();
        return new Promise(function (resolve, reject) {
            self.dontExistGuildName(tmplow)
                .then(function (rows) {
                    self.putGuild(name)
                        .then(function (rows1) {
                            var res1 = rows1[0];
                            var nguild_id = res1.insertId;
                            self.putGuildMember(nguild_id, account.user_id, 1)
                                .then(function (rows2) {
                                    self.updateUserDiscountGoldForGuild(500000, account.user_id)
                                        .then(function (rows2) {
                                            account.player.guild = name;
                                            data.complete = true;
                                            return resolve(data);
                                        });
                                });
                        });
                })
                .catch(function (err) {
                    data.error_exist = true;
                    return reject(data);
                });
        });
    }

    deleteGuildMember(user_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('DELETE FROM guild_member WHERE UserId = ?', [user_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    leaveGuild(account) {
        var self = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            self.deleteGuildMember(account.user_id)
                .then(function (rows) {
                    data.complete = true;
                    return resolve(data);
                })
                .catch(function (err) {
                    data.error_querry = true;
                    return reject(data);
                });
        });
    }

    deleteGuildMemberByIdGuild(guild_id, user_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('DELETE FROM guild_member WHERE Id = ? and UserId = ?', [guild_id, user_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    kickGuild(user_id, guild_id) {
        var self = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            self.deleteGuildMemberByIdGuild(guild_id, user_id)
                .then(function (rows) {
                    data.complete = true;
                    return resolve(data);
                })
                .catch(function (err) {
                    data.error_querry = true;
                    return reject(data);
                });
        });
    }

    getGuildById(guild_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT * FROM guild WHERE Id = ?', [guild_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    joinGuild(account, guild_id) {
        var self = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            self.getGuildById(guild_id)
                .then(function (rows) {
                    self.putGuildMember(guild_id, account.user_id, 0)
                        .then(function (rows1) {
                            account.player.guild = rows[0][0].Name;
                            account.player.guild_id = guild_id;
                            account.player.guild_job = 0;
                            data.good = true;
                            return resolve(data);
                        });
                })
                .catch(function (err) {
                    data.error_exist = true;
                    return reject(data);
                });
        });
    }

    updateGoldGpWinLossByIdAcc(win_gold, win_gp, is_win, is_loss, user_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('UPDATE users SET gold = gold + ?, gp = gp + ?, win = win + ?, loss = loss + ? WHERE IdAcc = ?', [win_gold, win_gp, is_win, is_loss, user_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    updateUser(account, callback) {
        var self = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            self.updateGoldGpWinLossByIdAcc(account.player.win_gold, account.player.win_gp, account.player.is_win, account.player.is_loss, account.user_id)
                .then(function (rows) {
                    account.player.win_gold = 0;
                    account.player.win_gp = 0;
                    data.correct = true;
                    return resolve(data);
                });
        });
    }

    getEventLogByIdAcc(user_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT Event1, Event2 FROM event_log WHERE Id = ?', [user_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    updateEventLogByIdAcc(scr, user_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('UPDATE event_log SET ? WHERE Id = ?', [scr, user_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    updateGoldCashEventByIdAcc(gold, cash, user_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('UPDATE users SET cash = cash + ?, gold = gold + ? WHERE IdAcc = ?', [cash, gold, user_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    putEventLogOnIdAcc(scr) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('INSERT INTO event_log SET ?', [scr])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    eventUpdate(account, type, callback) {
        var self = this;
        var date = Date.now;
        var rdata = {};
        return new Promise(function (resolve, reject) {
            self.getEventLogByIdAcc(account.user_id)
                .then(function (rows) {
                    var res0 = rows[0][0];
                    var update = false;
                    if (type === 0) {
                        if (res0.Event1 <= Date.now()) {
                            update = true;
                        }
                    } else if (type === 3) {
                        if (res0.Event2 <= Date.now()) {
                            update = true;
                        }
                    }
                    if (update) {
                        var xevent1 = 0;
                        var xevent2 = 0;
                        var sctp = "";
                        if (type === 0) {
                            xevent1 = date() + (4 * 60 * 60 * 1000);
                        } else if (type === 3) {
                            xevent2 = date() + (1 * 24 * 60 * 60 * 1000);
                        }
                        var datup1 = {
                            Event1: xevent1,
                        };
                        var datup2 = {
                            Event2: xevent2
                        };
                        if (type === 0) {
                            sctp = datup1;
                        } else if (type === 3) {
                            sctp = datup2;
                        }
                        self.updateEventLogByIdAcc(sctp, account.user_id)
                            .then(function (rows2) {
                                var xgold = 1000;
                                var xcash = 2000;
                                if (type === 0) {} else if (type === 3) {
                                    xgold = 1000;
                                    xcash = 3500;
                                }
                                self.updateGoldCashEventByIdAcc(xgold, xcash, account.user_id)
                                    .then(function (rows3) {
                                        rdata.complete = true;
                                        rdata.gold = xgold;
                                        rdata.cash = xcash;
                                        return resolve(rdata);
                                    });
                            });
                    }
                })
                .catch(function (err) {
                    var datup1 = {
                        Id: account.user_id,
                        Event1: 0,
                        Event2: 0
                    };
                    self.putEventLogOnIdAcc(datup1)
                        .then(function (rows0) {
                            return reject(rdata);
                        })
                        .catch(function (err) {
                            return reject(rdata);
                        });
                });
        });
    }

    getUserAvatarById(arr) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT * FROM user_avatars WHERE Id IN (?)', [arr])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    updateUserAvatarEquipById(data, reg_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('UPDATE user_avatar_equiped SET ? WHERE Id = ?', [data, reg_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0 || rows[0].changedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    equipAvatar(arr_up, account, callback) {
        var self = this;
        var rdata = {};
        return new Promise(function (resolve, reject) {
            self.getUserAvatarById(arr_up)
                .then(function (r_data) {
                    var rows = r_data[0];
                    var gst = account.player.gender;
                    var gender = 0;
                    if (gst === 'f')
                        gender = 1;
                    for (var r in rows) {
                        var dx = rows[r];
                        var item_data = account.gameserver.avatars.getAvatar2(dx.aId, gender);
                        if (item_data !== null) {
                            var _xtype = item_data[2];
                            if (_xtype === 0) {
                                account.player.ahead = dx.aId;
                            } else if (_xtype === 1) {
                                account.player.abody = dx.aId;
                            } else if (_xtype === 2) {
                                account.player.aeyes = dx.aId;
                            } else if (_xtype === 3) {
                                account.player.aflag = dx.aId;
                            } else if (_xtype === 4) {
                                account.player.abackground = dx.aId;
                            } else if (_xtype === 5) {
                                account.player.aforeground = dx.aId;
                            }
                        }
                    }
                    var data = {
                        head: account.player.ahead,
                        body: account.player.abody,
                        eyes: account.player.aeyes,
                        flag: account.player.aflag,
                        background: account.player.abackground,
                        foreground: account.player.aforeground
                    };
                    self.updateUserAvatarEquipById(data, account.player.reg_id)
                        .then(function (rows) {
                            rdata.complete = true;
                            return resolve(rdata);
                        });
                })
                .catch(function (err) {
                    return reject();
                });
        });
    }

    getListGM(callback) {

    }





    /* FB */
    getAccountByFBId(id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT Id, Session FROM accounts where facebook_id = ?', [id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    putAccountFB(data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('INSERT into accounts SET ?', [data])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    putUserFB(data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('INSERT into users SET ?', [data])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }

    putAvatarUseFB(data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('INSERT into user_avatar_equiped SET ?', [data])
                    .then(rows => {
                        conn.release();
                        if (rows[0].affectedRows > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }


    /* USER WEB */
    getUserByGameId(game_id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.getConnection().then(conn => {
                conn.query('SELECT IdAcc, game_id, photo_url, bg_url, country, rank, gp, win, gender, loss FROM users where LOWER(`game_id`) = ?', [game_id])
                    .then(rows => {
                        conn.release();
                        if (rows[0].length > 0)
                            return resolve(rows);
                        else
                            return reject();
                    });
            });
        });
    }
};