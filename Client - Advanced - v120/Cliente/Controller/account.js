var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Message = require('./lib/message');
var Player = require('./player');
var Bot = require('./bot');
var Game = require('./game');
var Room = require('./room');
var ignoreCase = require('ignore-case');
var mysql = require('mysql');
var Commands = require('./commands');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function pin_code_generador(length, current) {
  current = current ? current : '';
  return length ? pin_code_generador(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 36)) + current) : current;
}

function ArrayToObject(a, b) {
    var c, d = b.length, e = {};
    for (c = 0; c < d; c++)
        e[b[c]] = a[c];
    return e
}

// account
module.exports = class Account {
    constructor(connection, gameserver) {
        this.connection = connection;
        this.gameserver = gameserver;
        this.con_id = connection.id;
        this.login_complete = false;
        this.player = null;
        this.user_id = null;
        this.last_message = 0;
        this.last_chat = "";//Codigo De Spam
        this.strik = 0;
        this.room_number = 0;
        this.location_type = Types.LOCATION.CHANNEL;
        this.hasEnteredGame = false;
        this.room = null;
        this.ready = false;
        this.commands = new Commands(this);

        var self = this;
        connection.listen(function (message) {
            var opcode = parseInt(message[0]);
            try {
                self.Handler(opcode, message);
            } catch (e) {
                Logger.debug("err: " + message);
                Logger.error("" + e.stack);
            }
        });

        connection.onClose(function () {
            if (self.room) {
                self.room.removePlayer(self);
            }
            if (self.exit_callback) {
                self.exit_callback();
            }
        });
    }

    Handler(opcode, message) {
        var self = this;
        switch (opcode) {
            case Types.CLIENT_OPCODE.login:
                {
                    let _ver = parseInt(message[1]);
                    let _id = parseInt(message[2]);
                    let _session = message[3];
                    let _hash = parseInt(message[4]);
                    let _last_win = parseInt(message[5]);
                    //Logger.info('Ver: '+_ver+' - Id: '+_id+' - session: '+_session+' - hash: '+_hash+' - last_win: '+_last_win);
                    if (typeof (_id) !== 'number') {
                        self.sendMessage(new Message.alertResponse(":)", "Que haces? Ctrl+F5"));
                        self.connection.close();
                        return null;
                    }
                    self.gameserver.db.getPlayerData(_id, _session)
                    .then(function (data) {
                        if (data.banned === 1) {
                            self.gameserver.db.getUserByBannedTest(data.user_id)
                                .then(function (dbplaytt) {
                                var ban_inf = dbplaytt[0][0];
                                self.send([17,"Estás Baneado","Motivo: "+ban_inf.razon+"<br><br>Hasta: undefined"]);
                                self.connection.close();
                            });
                        } else if (data.error_mysql || data.error_querry) {
                            self.sendMessage(new Message.alertResponse(":)", "Error Servidor!"));
                            self.connection.close();
                        } else if (data.error_session || data.error_exist) {
                             self.sendMessage(new Message.alertResponse(":)", "Que haces? Ctrl+F5"));
                            self.connection.close();
                        } else {
                            self.send([Types.SERVER_OPCODE.login_profile]);
                            self.gameserver.checkAccountOnlineAndClose(data.user_id, function () {
                                self.send([Types.SERVER_OPCODE.login_avatars]);
                                self.user_id = data.user_id;
                                self.is_muted = data.is_muted;
                                self.player = new Player(data);
                                self.login_complete = true;
                                self.location_type = Types.LOCATION.CHANNEL;
                                self.sendMessage(new Message.loginResponse(self));
                                self.gameserver.addAccount(self);
                                self.gameserver.enter_callback(self);
                                if (self.player.rank >= 0) {
                                    if (self.gameserver.id === 6) {
                                        self.player.tournament = [0,0,0,1,50,-1,"",1788581,953,293,[4,40],0,1,0,0,0,-100000,null,[],100,20,0];
                                        self.sendMessage(new Message.loginResponse(self));
                                    }
                                    else if (self.gameserver.id === 9) {
                                        self.player.tournament = [0,0,0,0,26,2,"",697576,268,102,[9],0,0,0,0,0,-100000,null,[],100,10,0];
                                        self.sendMessage(new Message.loginResponse(self));
                                    }
                                    else if (self.gameserver.id === 13) {
                                        self.player.tournament = [0,0,2,1,26,-1,"",191588,68,25,[0,1,9,13],0,1,1,0,0,-100000,null,[],100,20,0];
                                        self.sendMessage(new Message.loginResponse(self));
                                    }
                                    else if (self.gameserver.id === 14) {
                                        self.player.tournament = [0,0,0,0,26,-1,"",2552814,1367,489,[0,1,9,13],0,1,1,0,0,-100000,null,[],100,20,0];
                                        self.sendMessage(new Message.loginResponse(self));
                                    }
                                     //else if (self.gameserver.id === 99) {
                                    
                                       // self.player.tournament = [0, 0, 0, 1, 0, -2, "", 10, 14, 1, [4,40], 0, 0, 0, 0, 0, 0, false, [], 0];
                                        //self.sendMessage(new Message.loginResponse(self));
                                    //} 
                                    else {}
                                    let next_rank = 0; let check = 0;
                                    
                                            check = 3;
                                    
                                            
                                    self.gameserver.db.myRank(self.player.user_id).then(rows =>{
                                        self.player.rank = rows[0][0].rank;
                                    });
                                            self.sendMessage(new Message.loginResponse(self));
                                            self.gameserver.sendAccountsOnline();
                                    
                                    //////
                                }
                                self.gameserver.db.updateServerByUserId(self.gameserver.id, self.player.user_id);
                                
                            });
                        }
                    })
                    .catch(function (err) {
                        self.connection.close();
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.get_avatar:
                {
                    let _id = message[1];
                    var data = self.gameserver.avatars.getAvatar(_id);
                    if (data !== null) self.send([Types.SERVER_OPCODE.avatar_info, _id, data]);
                    break;
                }
            case Types.CLIENT_OPCODE.get_my_avatars:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    self.gameserver.db.getPlayerAvatars(self)
                    .then(function (data) {
                        if (data.error_mysql || data.error_querry) {} else {
                            var dat = self.gameserver.avatars.getAvatarDataList(data.data_list);
                            self.sendMessage(new Message.myAvatars(self, dat));
                        }
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.chat:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let _msj = message[1];
                    let _team = parseInt(message[2]);
                    let _unk = parseInt(message[3]);
                    let ch = self.location_type == Types.LOCATION.CHANNEL ? true : false;
                    //if (self.player.gm === 1) {/*Solucionar Este Problema*/
                        self.commands.parse(/*_msj*/message);
                    //}
                    var showm = true;
                    if (_msj[0] ==/*=*/ '/'/* && self.player.gm === 1*/)
                        showm = false;

                    if (self.gameserver.chathistory.length > 30)
                        self.gameserver.chathistory = [];

                    if (showm) {
                        if (self.location_type === Types.LOCATION.CHANNEL) {
                            this.Chat(_msj, ch);
                        } else if (self.location_type === Types.LOCATION.ROOM) {
                            if (self.room) {
                                //Logger.log('Chat DBB: '+message);
                                self.room.chat(self, _msj, _team);
                            }
                        }
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.send_bcm:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    let _msj = message[1];
                    if (self.player.is_muted === true || self.player.is_muted >= Date.now()) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.MUTED, []));
                        return null;
                    }
                    else if (self.player.megaphones === 0) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NEED_ITEM, [894, 1, 0, "Megaphone / Horn / Bugle [ExItem]"]));
                        return null;
                    }
                    else if (self.player.rank < 15) {
                        self.sendMessage(new Message.alertResponse("Hola "+this.player.game_id, "Tu Nivel <span class='span_rank rank rank"+self.player.rank+"'></span> Es Muy Bajo Para Utilizar El MegaPhone, El Nivel Especial Debe De Ser Mayor <span class='span_rank rank rank15'></span> Para Que Lo Puedas Utilizar"));
                        return null;
                    } /*else if (self.gameserver.name === 'Prix' && this.player.gm === 0 && self.player.server_tournament_state === 0) {
                        self.sendMessage(new Message.alertResponse("Hola "+this.player.game_id, "El Chat en el Lobby esta prohibido para los usuarios."));
                        return null;
                    }*/ else if (_msj.length > 150) {} else if (self.player.megaphones > 0) {
                        _msj = _msj.replace("<", "");
                        _msj = _msj.replace(">", "");
                        _msj = _msj.replace("alert", "");
                        _msj = _msj.replace("\\", "");
                        _msj = _msj.replace("//", "");
                        _msj = _msj.replace("%", "");
                        self.gameserver.pushBroadcast(new Message.chatResponse(self, _msj, Types.CHAT_TYPE.BUGLE));
                        self.player.megaphones -= 1;
                        self.gameserver.db.updateMegaPoneAbate(self.player.user_id);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.pchat:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let _id = parseInt(message[1]);
                    if (typeof (_id) !== 'number')
                        return null;
                    let _msj = message[2];
                    let account = self.gameserver.getAccountById(_id);
                    if (typeof (account) !== 'undefined' && account !== null) {
                        account.sendMessage(new Message.pChatResponse(self, this.player.game_id, _msj));
                        self.sendMessage(new Message.pChatResponse(account, this.player.game_id, _msj));
                        //Logger.info('Chat Privado [De: '+self.player.game_id+'] - [Para: '+account.player.game_id+'] SMS: '+_msj);
                    } /*else {
                        self.sendMessage(new Message.pChatResponse(account, this.player.game_id, _msj));
                        self.sendMessage(new Message.pChatResponse(account, 'Offline', ' PM será entregado cuando el usuario inicie sesión.'));
                        return null;
                    }*/
                    break;
                }
                
            /*case Types.CLIENT_OPCODE.get_next_avatar:
                {
                    
                    break;
                }*/

            case Types.CLIENT_OPCODE.get_shop_page:
                {
                    let type = message[1];
                    let page = message[2];
                    if (type === null)
                        type = 0;
                    if (page === null)
                        page = 0;
                    var data_page = self.gameserver.avatars.getShopListType(type, page);
                    if (data_page !== null) {
                        self.send(data_page);
                        //self.send([Types.SERVER_OPCODE.next_avatar, 66723, 7454949, 2, 'a', 'Scream']);//Ventana New Avatar
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.buy:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = parseInt(message[1]);
                    let is_cash = message[2];
                    let period = message[3];
                    let user_gift = message[5];
                    let nota_gift = message[6];
                    var tmpgender = 0;
                    if (self.player.gender === 'f')
                        tmpgender = 1;
                    if (user_gift !== '') {
                        self.gameserver.forEachAccount(function (account) {
                            if (account !== null) {
                                if (account.player.game_id === user_gift) {
                                    if (account.player.gender === 'f') {
                                        tmpgender = 1;
                                    } else if (self.player.gender === 'f' && account.player.gender === 'm'){
                                        tmpgender = 0;
                                    } else {}
                                }
                            }
                        });
                    }
                    var item_data = self.gameserver.avatars.getAvatar2(id, tmpgender);
                    if (item_data) {
                        var _iprecio = 99999999999;
                        var valid_precio = false;
                        var errtrampa = false;
                        var dat = Date.now();
                        var timerank = Date.now();
                        var aceptrankspecial = 'no';
                        var rankspecial = 0;
                        var megaponeuses = 0;
                        if (item_data[6] === "")
                            errtrampa = true;
                        if (item_data[6].min_rank > self.player.rank) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NOT_FOR_SELL, []));
                            return null;
                        }
                        if (period === Types.PERIOD.WEEK) {
                            megaponeuses = 30;
                            dat = dat + (7 * 24 * 60 * 60 * 1000);
                            if (is_cash) {
                                _iprecio = item_data[6].cash_week;
                                if (item_data[6].cash_week <= 0)
                                    errtrampa = true;
                            } else {
                                _iprecio = item_data[6].gold_week;
                                if (item_data[6].gold_week <= 0)
                                    errtrampa = true;
                            }
                        } else if (period === Types.PERIOD.MONTH) {
                            megaponeuses = 50;
                            dat = dat + (30 * 24 * 60 * 60 * 1000);
                            if (is_cash) {
                                _iprecio = item_data[6].cash_month;
                                if (item_data[6].cash_month <= 0)
                                    errtrampa = true;
                            } else {
                                _iprecio = item_data[6].gold_month;
                                if (item_data[6].gold_month <= 0)
                                    errtrampa = true;
                            }
                        } else if (period === Types.PERIOD.PERM) {
                            megaponeuses = 100;
                            dat = 0;
                            if (is_cash) {
                                _iprecio = item_data[6].cash_perm;
                                if (item_data[6].cash_perm <= 0)
                                    errtrampa = true;
                            } else {
                                _iprecio = item_data[6].gold_perm;
                                if (item_data[6].gold_perm <= 0)
                                    errtrampa = true;
                            }
                        }
                        if (is_cash) {
                            if (self.player.cash >= _iprecio)
                                valid_precio = true;
                        } else {
                            if (self.player.gold >= _iprecio)
                                valid_precio = true;
                        }
                        if (id === 1066 && self.player.gm === 1 || id === 1067 && self.player.gm === 1 || id === 1068 && self.player.gm === 1)
                            return null;
                        if (user_gift !== '') {
                            self.gameserver.db.getUserByGameId(user_gift).then(function (rows) {
                                var info_user = rows[0][0];
                                let self2 = self.gameserver.getAccountById(parseInt(info_user.IdAcc));
                                if (id === 1066 && self2.player.gm === 1 || id === 1067 && self2.player.gm === 1 || id === 1068 && self2.player.gm === 1)
                                    return null;
                                if (self.player.rank === 26 && is_cash === true || self.player.rank === 27 && is_cash === true || self.player.rank === 31 && is_cash === true) {
                                    self.send([17,"PROHIBITED","This option is prohibited for your rank"]);
                                    return null;
                                }
                                if (valid_precio && !errtrampa) {
                                    let data = {
                                        UserId: self2.user_id,
                                        aId: id,
                                        type: item_data[2],
                                        expire_time: dat,
                                        is_cash: is_cash === true ? 1 : 0,
                                        is_gift: 1,
                                        gift_sent_by: self.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                    if (_iprecio <= 0) {
                                        
                                    } else {
                                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GIFT_SENT, [id]));
                                        Promise.all([
                                            self.gameserver.db.putUserAvatars(data)
                                        ]).then((data) => {});
                                        self.sendMessage(new Message.loginResponse(self));
                                        try {
                                            var name_ava_gift = self.gameserver.avatars.getAvatagift(id);
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [self.player.game_id, id, 0, nota_gift, "forever", name_ava_gift]));
                                            if (id === 464) {
                                                self.gameserver.db.updatePowerUser(self2.player.user_id);
                                                self2.player.power_user = 1;
                                            }
                                            if (id === 893) {
                                                self.gameserver.db.updatePlusGP(self2.player.user_id);
                                                self2.player.plus10gp = 1;
                                            }
                                            if (id === 894) {
                                                self.gameserver.db.updateMegaPone(megaponeuses, self2.player.user_id);
                                                self2.player.megaphones =  megaponeuses;
                                            }
                                            if (id === 1223) {
                                                self.gameserver.db.updateMaps(self2.player.user_id);
                                                self2.player.maps_pack = 1;
                                            }
                                            if (id === 1066) {
                                                timerank = timerank + (10 * 24 * 60 * 60 * 1000);
                                                rankspecial = 28;
                                                aceptrankspecial = 'se';
                                            }
                                            if (id === 1067) {
                                                timerank = timerank + (14 * 24 * 60 * 60 * 1000);
                                                rankspecial = 29;
                                                aceptrankspecial = 'se';
                                            }
                                            if (id === 1068) {
                                                timerank = timerank + (18 * 24 * 60 * 60 * 1000);
                                                rankspecial = 30;
                                                aceptrankspecial = 'se';
                                            }
                                            if (aceptrankspecial === 'se') {
                                                self.gameserver.db.updateRankSpecialByIdAcc(rankspecial, 1, self2.player.user_id);
                                                self.gameserver.db.putSpecialRanksByUserId(self2.player.user_id, self2.player.game_id, rankspecial, _iprecio, timerank);
                                                self2.player.rank = rankspecial;
                                                self2.sendMessage(new Message.loginResponse(self2));
                                                self.gameserver.sendAccountsOnline();
                                            }
                                        } catch(e){Logger.error(e);}
                                        if (is_cash === true) {
                                            self.player.cash = parseInt(self.player.cash - _iprecio);
                                            self.gameserver.db.sendDeleteCash(0, _iprecio, self.player.user_id);
                                        }
                                        else {
                                            self.player.gold = parseInt(self.player.gold - _iprecio);
                                            self.gameserver.db.sendDeleteCash(_iprecio, 0, self.player.user_id);
                                        }
                                        self.sendMessage(new Message.loginResponse(self));
                                    }
                                }
                                else
                                    self.send([40,60]);
                            });
                        } else {
                            if (valid_precio && !errtrampa) {
                                let data = {
                                    UserId: self.user_id,
                                    aId: id,
                                    type: item_data[2],
                                    expire_time: dat,
                                    is_cash: is_cash === true ? 1 : 0,
                                    is_gift: 0,
                                    gift_sent_by: 0,
                                    amount: 0,
                                    date_ava_time: Date.now()
                                };
                                if (_iprecio <= 0) {
                                    
                                } else {
                                    self.gameserver.db.buyAvatarForAccount(self.user_id, is_cash, _iprecio, data)
                                        .then(function (data) {
                                            if (data.error_mysql || data.error_querry) {} else {
                                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.PURCHASED, [id]));
                                                self.gameserver.db.getPlayerAvatars(self).then(function (data) {
                                                    if (data.error_mysql || data.error_querry) {} else {
                                                        var dat = self.gameserver.avatars.getAvatarDataList(data.data_list);
                                                        self.sendMessage(new Message.myAvatars(self, dat));
                                                    }
                                                });
                                                if (id === 464) {
                                                    self.gameserver.db.updatePowerUser(self.player.user_id);
                                                    self.player.power_user = 1;
                                                }
                                                if (id === 893) {
                                                    self.gameserver.db.updatePlusGP(self.player.user_id);
                                                    self.player.plus10gp = 1;
                                                }
                                                if (id === 894) {
                                                    self.gameserver.db.updateMegaPone(megaponeuses, self.player.user_id);
                                                    self.player.megaphones =  megaponeuses;
                                                }
                                                if (id === 1223) {
                                                    self.gameserver.db.updateMaps(self.player.user_id);
                                                    self.player.maps_pack = 1;
                                                }
                                                if (id === 1066) {
                                                    timerank = timerank + (10 * 24 * 60 * 60 * 1000);
                                                    rankspecial = 28;
                                                    aceptrankspecial = 'se';
                                                }
                                                if (id === 1067) {
                                                    timerank = timerank + (14 * 24 * 60 * 60 * 1000);
                                                    rankspecial = 29;
                                                    aceptrankspecial = 'se';
                                                }
                                                if (id === 1068) {
                                                    timerank = timerank + (18 * 24 * 60 * 60 * 1000);
                                                    rankspecial = 30;
                                                    aceptrankspecial = 'se';
                                                }
                                                if (aceptrankspecial === 'se') {
                                                    self.gameserver.db.updateRankSpecialByIdAcc(rankspecial, 1, self.player.user_id);
                                                    self.gameserver.db.putSpecialRanksByUserId(self.player.user_id, self.player.game_id, rankspecial, _iprecio, timerank);
                                                    self.player.rank = rankspecial;
                                                    self.sendMessage(new Message.loginResponse(self));
                                                    self.gameserver.sendAccountsOnline();
                                                }
                                                if (is_cash === true)
                                                    self.player.cash = parseInt(self.player.cash - _iprecio);
                                                else
                                                    self.player.gold = parseInt(self.player.gold - _iprecio);
                                                self.sendMessage(new Message.loginResponse(self));
                                            }
                                        })
                                        .catch(function (err) {
                                            Logger.error("" + err.stack);
                                        });
                                }
                            }
                            else
                                self.send([40,60]);
                        }
                    } else {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.AVATAR_WRONG_GENDER, []));
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.delete_avatar:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    let id = parseInt(message[1]);
                    self.gameserver.db.deleteAvatarById(id)
                        .then(function (data) {
                        if (data.error_mysql || data.error_querry) {}
                        else {
                            self.gameserver.db.getPlayerAvatars(self).then(function (data) {
                                if (data.error_mysql || data.error_querry) {} else {
                                    var dat = self.gameserver.avatars.getAvatarDataList(data.data_list);
                                    self.sendMessage(new Message.myAvatars(self, dat));
                                }
                            });
                            self.send([40,78]);
                        }
                    });
                    break;
                }
                
            /*case Types.CLIENT_OPCODE.quick_join:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    self.gameserver.forEachRooms(function (roomss) {
                        if (roomss.status === Types.ROOM_STATUS.WAITING) {
                            self.gameserver.getRoomById(roomss.id, function (room) {
                                if (room) {
                                    if (room.player_count < room.max_players && room.status === Types.ROOM_STATUS.WAITING) {
                                          if (room.password === "") {
                                              room.joinPlayer(self);
                                              self.location_type = Types.LOCATION.ROOM;
                                              self.room_number = room.id;
                                              return null;
                                          }
                                    }
                                }
                            });
                        }
                    });
                    
                    break;
                }*/
                
            case Types.CLIENT_OPCODE.equip:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var arr_up = message[1];
                    var work = false;
                    for (var idx in arr_up) {
                        if (typeof (arr_up[idx]) !== 'number') {
                            return null;
                        }
                    }

                    if (arr_up.length > 0)
                        work = true;
                    if (self.player.gender === 'm') {
                        self.player.ahead = 1;
                        self.player.abody = 2;
                    } else {
                        self.player.ahead = 3;
                        self.player.abody = 4;
                    }
                    self.player.aeyes = 0;
                    self.player.aflag = 0;
                    self.player.abackground = 0;
                    self.player.aforeground = 0;
                    if (work) {
                        self.gameserver.db.equipAvatar(arr_up, self)
                            .then(function (data) {
                                if (data.error_mysql || data.error_querry) {} else {
                                    if (self.room) {
                                        self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                    }
                                    self.sendMessage(new Message.loginResponse(self));
                                    self.gameserver.sendAccountsOnline();
                                }
                            });
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.event:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let type = parseInt(message[1]);
                    //Logger.info('Type: '+type);
                    if (type !== 0 && type !== 3)
                        return null;

                    if (type === 0 && self.player.event1 >= 1) {
                        return null;
                    } else if (type === 3 && self.player.event2 >= 1) {
                        //self.send([Types.SERVER_OPCODE.daily_cash, 100, 174, [[0,self.player.win_rate+"%",11,20],[7,"Level "+self.player.rank,self.player.rank,24],[1,"0%",0,20],[2,"0%",0,20],[3,"0/10 Days",0,20,[1,1,1,1,0,0,0,0,0,0]],[4,"8.95% (170)",4,50],[5,51,20,20]], -4365547, 0]);
                        return null;
                    }
                    if (type === 0)
                        self.player.event1 = 14400;
                    else if (type === 3)
                        self.player.event2 = 86400;

                    self.gameserver.db.eventUpdate(self, type)
                        .then(function (data) {
                        if (data.error_mysql || data.error_querry) {

                        } else if (data.complete) {
                            self.player.gold = parseInt(self.player.gold + data.gold);
                            self.player.cash = parseInt(self.player.cash + data.cash);
                            self.sendMessage(new Message.loginResponse(self));
                            if (type === 0) {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.WON_EVENT1, [data.cash, data.gold]));
                            } else {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.WON_EVENT2, [data.cash, data.gold]));
                            }
                        }
                    });
                    break;
                }

            case Types.CLIENT_OPCODE.change_name:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var fuck = false;
                    var _nname = message[1];
                    if ((_nname.length > 0 && _nname.length <= 25) === false) {
                        return null;
                    }

                    if (ignoreCase.startsWith(_nname, " ")) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_CHAR, []));
                        return null;
                    }

                    if (ignoreCase.endsWith(_nname, " ")) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_CHAR, []));
                        return null;
                    }

                    if (ignoreCase.startsWith(_nname, "GM") || ignoreCase.startsWith(_nname, "BattleFunny")) {
                        fuck = true;
                    }

                    if (!fuck) {
                        for (let i = 0; i < Types.GAME_ID.length; i++) {
                            if (ignoreCase.equals(_nname, Types.GAME_ID[i]))
                                fuck = true;
                        }
                    }
                    if (self.player.gm === 1)
                        fuck = false;
                    if (fuck) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_CHAR, []));
                    } else if (_nname.length < 25) {
                        if (self.player.user_id === 99) {
                            self.sendMessage(new Message.alertResponse("Prohibited", "you are prohibited from changing your game nickname"));
                            return null;
                        }
                        self.gameserver.db.changeName(_nname, self)
                            .then(function (data) {
                                if (data.change) {
                                    self.player.game_id = _nname;
                                    self.sendMessage(new Message.loginResponse(self));
                                    self.gameserver.sendAccountsOnline();
                                }
                            }).catch(function (data) {
                                if (data.error_mysql || data.error_querry) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_CHAR, []));
                                } else if (data.error_exist) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_ALREADY_EXISTS, []));
                                } else if (data.error_cash) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_NOT_ENOUGH_CASH, []));
                                }
                            });
                    } else {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_LEN, []));
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.tab:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let slot = message[1];
                    if (slot === 0) {
                        //channel
                    } else if (slot === 1) {
                        self.gameserver.db.getFriendsByIdyo(self.player.user_id).then(function (rows) {
                            var my_friends = rows[0];
                            var my_friends_x2 = [];
                            var dato_frind = "";
                            for (var ix in my_friends) {
                                var friend_room = 0;
                                if (my_friends[ix].IsOnline !== 0) {
                                    if (self.gameserver.id === my_friends[ix].IsOnline) {
                                        var my_friend_room = self.gameserver.getAccountById(parseInt(my_friends[ix].IdAcc));
                                        if (typeof (my_friend_room) !== 'undefined') {
                                            friend_room = my_friend_room.player.room_number;
                                        } else {
                                            friend_room = 0;
                                        }
                                    } else {
                                        friend_room = 0;
                                    }
                                } else {
                                    friend_room = 0;
                                }
                                dato_frind = [
                                    my_friends[ix].IdAcc,
                                    my_friends[ix].gp,
                                    my_friends[ix].game_id,
                                    my_friends[ix].photo_url,
                                    "b"+my_friends[ix].rank+"c"+my_friends[ix].IsOnline+"d"+friend_room
                                ];
                                my_friends_x2.push(dato_frind);
                            }
                            //self.sendMessage(new Message.loginResponse(self));
                            self.send([Types.SERVER_OPCODE.friends, my_friends_x2, self.gameserver.id, my_friends.length]);
                        }).catch(function () {
                            self.send([Types.SERVER_OPCODE.friends, [], self.gameserver.id, 8]);
                        });
                    } else if (slot === 2) {
                        if (self.player.guild !== '') {
                            self.gameserver.db.getGuildMembersById(self.player.guild_id).then(function (rows) {
                                var my_members = rows[0];
                                var my_memberss_x2 = [];
                                var dato_member = "";
                                my_memberss_x2.push(self.player.guild);
                                my_memberss_x2.push(self.player.guild_job);
                                for (var ixx in my_members) {
                                    var member_room = 0;
                                    var member_server = my_members[ixx].IsOnline;
                                    if (my_members[ixx].IsOnline !== 0) {
                                        if (self.gameserver.id === my_members[ixx].IsOnline) {
                                            member_server = -1;
                                            var my_friend_room = self.gameserver.getAccountById(parseInt(my_members[ixx].IdAcc));
                                            if (typeof (my_friend_room) !== 'undefined') {
                                                member_room = my_friend_room.player.room_number;
                                            } else {
                                                member_room = 0;
                                            }
                                        } else {
                                            member_room = 0;
                                            member_server = my_members[ixx].IsOnline;
                                        }
                                    } else {
                                        member_room = 0;
                                        member_server = my_members[ixx].IsOnline;
                                    }
                                    dato_member = [
                                        my_members[ixx].IdAcc,
                                        my_members[ixx].game_id,
                                        my_members[ixx].gender,
                                        my_members[ixx].rank,
                                        my_members[ixx].gp,
                                        my_members[ixx].photo_url,
                                        member_server,
                                        member_room
                                    ];
                                    my_memberss_x2.push(dato_member);
                                }
                                //self.sendMessage(new Message.loginResponse(self));
                                self.send([Types.SERVER_OPCODE.guild, my_memberss_x2]);
                            }).catch(function () {
                                self.send([Types.SERVER_OPCODE.guild]);
                            });
                        } else {
                            self.send([Types.SERVER_OPCODE.guild]);
                        }
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guild_create:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let gname = message[1];
                    var info_prix = ArrayToObject(self.player.tournament, "start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event".split(" "));
                    if (self.player.guild !== '') {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ALREADY_IN_GUILD, []));
                    } else if (info_prix.players === 7 && this.tournament_start_time_server <= Date.now() && this.tournament_end_time_server >= Date.now()) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILDS_LOCK, []));
                        return null;
                    } else if (gname.length >= 3 && gname.length <= 6) {
                        gname = mysql.escape(gname).replace("'", "").replace("'", "");
                        if (/\s/g.test(gname) === true) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_NAME_BAD_WORD, []));
                            return null;
                        }
                        if ((self.player.gold >= 500000) === false) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_NO_MONEY, []));
                            return null;
                        }
                        self.gameserver.db.createGuild(gname, self)
                            .then(function (data) {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_CREATED, []));
                                self.sendMessage(new Message.loginResponse(self));
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_NAME_BAD_WORD, []));
                                } else if (data.error_exist) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_ALREADY_EXISTS, []));
                                }
                            });
                    } else {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_BAD_NAME_LEN, []));
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guildinvite:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = parseInt(message[1]);
                    var acc = self.gameserver.getAccountById(id);
                    var info_prix = ArrayToObject(self.player.tournament, "start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event".split(" "));
                    if (info_prix.players === 7 && this.tournament_start_time_server <= Date.now() && this.tournament_end_time_server >= Date.now()) {
                        self.sendMessage(new Message.alertResponse("Lo sentimos", "Esta opción del Guild esta bloqueada durante el torneo. Inténtalo mas tarde."));
                        return null;
                    } else {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_INVITE_SENT, [acc.player.game_id]));
                        if (acc) {
                            if (acc.player.guild === '') {
                                acc.sendMessage(new Message.GuildreqResponse(self));
                            }
                        }
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guild_approved:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = parseInt(message[1]);
                    if (self.player.guild === '') {
                        self.gameserver.db.joinGuild(self, id)
                            .then(function (data) {
                                if (data.good) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.JOINED_GUILD, []));
                                    if (self.room) {
                                        self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                    }
                                }
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {} else if (data.error_exist) {}
                            });
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guild_leave:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    var info_prix = ArrayToObject(self.player.tournament, "start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event".split(" "));
                    
                    if (info_prix.players === 7 && this.tournament_start_time_server <= Date.now() && this.tournament_end_time_server >= Date.now()) {
                        self.sendMessage(new Message.alertResponse("Lo sentimos", "Esta opción del Guild esta bloqueada durante el torneo. Inténtalo mas tarde."));
                        return null;
                    }
                    
                    if (self.player.guild !== '' && self.player.guild_job === 0 || self.player.guild !== '' && self.player.guild_job === 2) {
                        self.gameserver.db.leaveGuild(self.player.user_id)
                            .then(function (data) {
                                if (data.complete) {
                                    self.player.guild = '';
                                    self.player.guild_job = 0;
                                    self.player.guild_id = 0;
                                    if (self.room) {
                                        self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                    } else {
                                        self.sendMessage(new Message.loginResponse(self));
                                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.LEFT_GUILD, []));
                                    }
                                    self.gameserver.sendAccountsOnline();
                                }
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {}
                            });
                    }
                    if (self.player.guild_job === 1) {
                        self.gameserver.db.DeleteNameGuild(self.player.guild, self.player.guild_id)
                            .then(function (data) {
                                if (data.complete) {
                                    self.player.guild = '';
                                    self.player.guild_job = 0;
                                    self.player.guild_id = 0;
                                    if (self.room) {
                                        self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                    } else {
                                        self.sendMessage(new Message.loginResponse(self));
                                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.CLOSED_GUILD, []));
                                    }
                                    self.gameserver.sendAccountsOnline();
                                }
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {}
                            });
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guild_kick:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let guser_id = parseInt(message[1]);
                    var info_prix = ArrayToObject(self.player.tournament, "start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event".split(" "));
                    
                    if (info_prix.players === 7 && this.tournament_start_time_server <= Date.now() && this.tournament_end_time_server >= Date.now()) {
                        self.sendMessage(new Message.alertResponse("Lo sentimos", "Esta opción del Guild esta bloqueada durante el torneo. Inténtalo mas tarde."));
                        return null;
                    }
                    
                    if (self.user_id === guser_id) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.CANT_KICK_YOURSELF, []));
                    } else if (self.player.guild !== '' && self.player.guild_job === 1) {
                        self.gameserver.db.kickGuild(guser_id, self.player.guild_id)
                            .then(function (data) {
                                if (data.complete) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.KICKED_GUILD, []));
                                }
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {}
                            });
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.channel_rooms:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var _strtype = message[1];
                    if (_strtype === "next") {
                        self.player.channel_rango = self.player.channel_rango + 6;
                        if (self.player.channel_rango > 20)
                            self.player.channel_rango = 0;
                        self.gameserver.sendRoomsType(self, self.player.channel_rango, null);
                    } else if (_strtype === "prev") {
                        self.player.channel_rango = self.player.channel_rango - 6;
                        if (self.player.channel_rango < 0)
                            self.player.channel_rango = 0;
                        self.gameserver.sendRoomsType(self, self.player.channel_rango, null);
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.get_room_info:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let room_id = parseInt(message[1]);
                    self.gameserver.getRoomById(room_id, function (room) {
                        if (room) {
                            self.sendMessage(new Message.extraRoomInfo(room));
                        }
                    });
                    break;
                }

            case Types.CLIENT_OPCODE.getinfo:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = parseInt(message[1]);
                    let acc = self.gameserver.getAccountById(id);
                    if (acc) {
                        self.gameserver.db.getMyFriend(self.player.user_id, acc.player.user_id).then(function (rows) {
                            var my_friends = rows[0][0];
                            acc.player.is_my_friend = 1;
                            self.sendMessage(new Message.InfoResponse(acc));
                            //Logger.info("Teste My friend 1");
                        }).catch(function () {
                            acc.player.is_my_friend = 0;
                            self.sendMessage(new Message.InfoResponse(acc));
                            //Logger.info("Teste My friend 2");
                        });
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.channel_join:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    self.location_type = Types.LOCATION.CHANNEL;
                    if (self.room) {
                        if (self.room.status !== null && self.room.status == Types.ROOM_STATUS.PLAYING) {
                            if (self.gameserver.name === 'Holiday') {
                                self.player.gm_probability = 0;
                                self.gameserver.db.updateProbability(0, self.player.user_id);
                            } else if (self.gameserver.name === 'Prix') {
                                self.player.punts_prix_user -= 1;
                                self.sendMessage(new Message.loginResponse(self));
                                self.gameserver.db.updatePrix(self.player.punts_prix_user, self).then(function (data) {
                                    if (data.error_mysql || data.error_querry) {} else {
                                        Logger.info('You have escaped from the game');
                                    }
                                });
                            }
                            self.gameserver.db.updateLeftByIdAcc(1500, 5, 1, self.player.user_id);
                            Logger.info('User: '+self.player.game_id+' has left the Room: '+self.room_number);
                            /*if (self.room.game) {
                                if (self.room.player_count === 2) {
                                    self.room.game.checkDead();
                                } else if (self.room.player_count > 2) {
                                    self.room.game.gamePass(self);
                                }
                            }*/
                            //self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Player "+self.player.game_id+" left the room.", Types.CHAT_TYPE.SYSTEM), self.room);
                            //self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Winning Bonus: Team A = %% GP, Team B = %% GP.", Types.CHAT_TYPE.SYSTEM), self.room);
                        }
                        self.room.removePlayer(self);
                        self.sendMessage(new Message.loginResponse(self));
                        self.player.is_ready = 0;
                        self.player.is_master = 0;
                        self.player.room_number = 0;/*mirar*/
                    }
                    self.gameserver.sendAccountsOnline();
                    if (self.gameserver.server_subtype !== 3) {
                        self.gameserver.forEachAccount(function (account_rooms) {
                            if (account_rooms !== null) {
                                account_rooms.gameserver.sendRooms(account_rooms);
                                account_rooms.sendMessage(new Message.loginResponse(account_rooms));
                            }
                        });
                        self.gameserver.sendRooms(self);
                        if (self.player.random_mobil === parseInt(1)) {
                            self.player.mobile = Types.MOBILE.RANDOM;
                        }
                    }
                    self.player.room_number = 0;
                    self.sendMessage(new Message.loginResponse(self));
                    break;
                }

            case Types.CLIENT_OPCODE.room_join:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = message[1];
                    let password = message[2];
                    var info_prix = ArrayToObject(self.player.tournament, "start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event".split(" "));
                    self.gameserver.getRoomById(id, function (room) {
                        if (room) {
                            if (room.search_team_room === 1 && room.player_count >= 4) {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_FULL, []));
                                return null;
                            } else if (room.search_team_room === 1 && room.room_tournament_playing === 1) {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_PLAYING, []));
                                return null;
                            } else if (room.player_count < room.max_players && room.status === Types.ROOM_STATUS.WAITING) {
                                if (room.look === 1 && self.player.rank !== 26 && self.player.rank !== 27 && self.player.rank !== 31) {
                                    if (room.password !== password)
                                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.WRONG_PASSWORD, []));
                                    else {
                                        room.joinPlayer(self);
                                        self.location_type = Types.LOCATION.ROOM;
                                        self.player.room_number = room.id;
                                    }
                                } else {
                                    room.joinPlayer(self);
                                    self.location_type = Types.LOCATION.ROOM;
                                    self.player.room_number = room.id;
                                    if (self.gameserver.name === 'Guilds Prix') {
                                        if (info_prix.force_mobile !== -1 || info_prix.force_mobile !== -2) {
                                            self.player.mobile = info_prix.force_mobile;
                                        }
                                    }
                                }
                            } else if (room.status === Types.ROOM_STATUS.PLAYING) {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_PLAYING, []));
                            } else {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_FULL, []));
                                /*self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.CANT_JOIN_NEED_AVATAR, ['Rusia 2018']));*/
                                if (self.player.rank === 26 || self.player.rank === 27 || self.player.rank === 31) {
                                    room.joinPlayer(self);
                                    self.location_type = Types.LOCATION.ROOM;
                                    self.player.room_number = room.id;
                                }
                            }
                        } else {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_DOES_NOT_EXIST, []));
                        }
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.room_create:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }

                    /*if ((self.player.rank >= 27) === false) {
                        return null;
                    }*/

                    let id = self.gameserver.getIdforRoom();
                    self.player.room_number = id;/* MIRAR */
                    let title = message[1];
                    let password = message[2];
                    let maxplayers = message[3];
                    let gamemode = message[4];
                    let power = self.player.power_user;
                    self.gameserver.rooms[id] = new Room(id, title, password, maxplayers, gamemode, self.gameserver, power);
                    self.gameserver.getRoomById(id, function (room) {
                        if (room) {
                            if (room.player_count < room.max_players) {
                                self.player.is_master = 1;
                                room.joinPlayer(self);
                                self.player.room_number = room.id;
                                self.location_type = Types.LOCATION.ROOM;
                                if (self.gameserver.server_subtype !== 3)
                                    self.gameserver.sendRooms();
                                if (self.player.power_user === 1)
                                    room.power = 1;
                            }
                        } else {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_DOES_NOT_EXIST, []));
                        }
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.room_options:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    if (self.room) {
                        if (self.room.search_team_room === 1) {
                            return null;
                        }
                        if (self.player.is_master = 1) {
                            self.room.max_players = message[1];
                            self.room.game_mode = message[2];
                            self.room.map = message[3];
                            self.room.is_avatars_on = message[4];
                            self.room.max_wind = message[5];
                            self.room.is_s1_disabled = message[7];/*6*/
                            self.room.is_tele_disabled = message[8];/*7*/
                            self.room.is_random_teams = message[9];/*8*/
                            self.room.is_dual_plus_disabled = message[10];/*9*/
                            self.room.RoomUpdate(self);
                            //Logger.debug("room_options: " + message);
                            //Logger.debug("Avatars: " + message[4]);
                        }
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.tournament_start_game:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    var info_prix = ArrayToObject(self.player.tournament, "start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event".split(" "));
                    
                    var unk1 = message[1];
                    var mobile_prix = info_prix.force_mobile;//info_prix.force_mobile
                    if (info_prix.force_mobile === -1 || info_prix.force_mobile === -2) {
                        mobile_prix = message[2];
                    }
                    //Logger.info('Mobile Prix: '+mobile_prix);
                    let id_bot = parseInt(getRndInteger(80000, 80500));
                    
                    if (typeof (Types.MOBILES[mobile_prix]) != 'undefined' && Types.MOBILES[mobile_prix] !== null) {
                        if (mobile_prix == Types.MOBILE.DRAGON && self.player.rank !== 31 && self.player.rank !== 26) {
                            self.sendMessage(new Message.alertResponse("Non-Selectable Mobile", "You can not select this mobile."));
                            return null;
                        }
                        if (mobile_prix == Types.MOBILE.RANDOM) {
                            var random_number = parseInt(getRndInteger(0, 28));
                            if (random_number === 7)
                                random_number = 26;
                            mobile_prix = random_number;
                        }
                        self.player.mobile = mobile_prix;
                    }
                    
                    if (self.gameserver.name === 'Prix') {
                        if (self.player.tournament_start_time_server >= Date.now()) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.TOURNAMENT_NOT_STARTED, []));
                            return null;
                        }
                        if (self.player.tournament_start_time_server <= Date.now() && self.player.tournament_end_time_server <= Date.now()) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.TOURNAMENT_ENDED, []));
                            return null;
                        }
                        if (self.player.punts_prix_user <= info_prix.min_points) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.DISQUALIFIED_PLAYER, [self.player.punts_prix_user, info_prix.min_points]));
                            return null;
                        }
                    }
                    
                    self.player.tournament_wait_game = 1;
                    self.send([Types.SERVER_OPCODE.tournament_wait, parseInt(getRndInteger(1, 3))]);//self.send([41,parseInt(getRndInteger(1, 3))]);
                    if (self.player.tournament_wait_game == 1) {
                        let id = self.gameserver.getIdforRoom();
                        /* || *===============[Start of the BOT Computer code]================* || */
                        setTimeout(function() {
                            if (self.location_type === Types.LOCATION.CHANNEL && self.player.tournament_wait_game == 1 && self.gameserver.id === 2 || self.location_type === Types.LOCATION.CHANNEL && self.player.tournament_wait_game == 1 && self.gameserver.name === "Bunge.") {
                                self.player.room_number = id;
                                self.gameserver.rooms[id] = new Room(id, "DragonBound", "", 1, 1, self.gameserver);
                                self.gameserver.getRoomById(id, function (room) {
                                    if (room) {
                                        let rank_bot = 26;
                                        if (self.player.rank <= 16)
                                            rank_bot = 27;
                                        var bot_data = {
                                            user_id: id_bot,
                                            reg_id: id_bot,
                                            game_id: 'Clown Stripe',
                                            rank: 1,
                                            gp: 0,
                                            gold: 0,
                                            cash: 0,
                                            gender: "m",
                                            photo_url: "",
                                            ahead: 1,
                                            abody: 2,
                                            aeyes: 0,
                                            aflag: 0,
                                            abackground: 0,
                                            aforeground: 0,
                                            is_muted: 0,
                                            guild: '',
                                            guild_id: 0,
                                            guild_job: 0
                                        };
                                        var plx = new Player(bot_data);
                                        plx.is_bot = 1;
                                        plx.is_ready = 1;
                                        plx.position = 1;
                                        plx.mobile = Types.MOBILE.ARMOR;
                                        plx.scores_lose = 1;
                                        let acc = new Bot(plx);
                                        acc.user_id = id_bot;
                                        acc.gameserver = self.gameserver;
                                        self.gameserver.bots[acc.user_id] = acc;
                                        room.addBot(acc);
                                        /* || *===============[Bot Computer]================* || */
                                        self.player.is_master = 1;
                                        room.joinPlayer(self);
                                        if (room.player_count <= 2) {
                                            self.location_type = Types.LOCATION.ROOM;
                                        } else {
                                            return null;
                                        }
                                        self.player.room_number = room.id;
                                        self.player.tournament_wait_game = 0;
                                        room.is_tele_disabled = 1;
                                        if (self.gameserver.name === 'Bunge.') {
                                            room.map = Types.MAPS_PLAY[4];
                                        } else {
                                            room.map = Types.MAPS_PLAY[41];
                                        }
                                        room.max_wind = info_prix.max_wind;
                                        room.frist_turn = 0;
                                        room.game = new Game(room.id, room, room.gameserver, 0);
                                        if (room.game) {
                                            room.status = Types.ROOM_STATUS.PLAYING;
                                            room.game.start(function (fturn) {
                                                self.player.check_my_ava = info_prix.avatar_on;
                                                if (info_prix.avatar_on === 0) {
                                                    self.player.shield = 0;
                                                    self.player.shield_regen = 0;
                                                }
                                                room.gameserver.pushToRoom(room.id, new Message.gameStart(room));
                                            });
                                            room.game.onGameEnd(function (teamm) {
                                                room.forPlayers(function (accountdbb) {
                                                    if (typeof (accountdbb) !== 'undefined') {
                                                        let playerdbb = accountdbb.player;
                                                        if (teamm === playerdbb.team) {
                                                            //playerdbb.addWinGoldWinGp(200, 10);
                                                            playerdbb.is_win = 1;
                                                            accountdbb.saveWinDB(room.power == 1 ? true : false);
                                                            if (self.gameserver.name === 'Holiday') {
                                                                if (playerdbb.scores_lose !== 1) {
                                                                    playerdbb.gm_probability += 1;
                                                                    self.gameserver.db.updateProbability(playerdbb.gm_probability, playerdbb.user_id);
                                                                }
                                                            }
                                                        } else {
                                                            playerdbb.is_loss = 1;
                                                            accountdbb.saveWinDB(room.power == 1 ? true : false);
                                                            if (self.gameserver.name === 'Holiday') {
                                                                if (playerdbb.scores_lose !== 1) {
                                                                    playerdbb.gm_probability = 0;
                                                                    self.gameserver.db.updateProbability(0, playerdbb.user_id);
                                                                }
                                                            }
                                                        }
                                                    }
                                                });
                                                room.game = null;
                                                room.status = Types.ROOM_STATUS.WAITING;
                                                room.gameserver.pushToRoom(room.id, new Message.roomPlayers(room));
                                                setTimeout(function() {
                                                    self.player.room_number = 0;
                                                    self.location_type = Types.LOCATION.CHANNEL;
                                                    room.removePlayer(self);
                                                    self.sendMessage(new Message.loginResponse(self));
                                                    self.player.is_ready = 0;
                                                    self.player.is_master = 0;
                                                    self.gameserver.sendAccountsOnline();
                                                    self.gameserver.removeRoom(room.id);
                                                    if (self.gameserver.name === 'Holiday') {
                                                        self.gameserver.forEachAccount(function (accounttp) {
                                                            if (accounttp !== null && accounttp.player.user_id === self.player.user_id) {
                                                                var data_game_server = self.gameserver.chathistory.slice(0);
                                                                data_game_server.push(['', '', 9]);
                                                                if (self.gameserver.evento200 === true)
                                                                    data_game_server.push([' El porcentaje de GP & Gold cambiaron a 200%', '[Inicio de Evento', 17]);
                                                                if (self.gameserver.name === 'Holiday') {
                                                                    data_game_server.push([' Búscame, gáname y te llevas un regalo: (gift) '+accounttp.player.gifts_holiday+' Regalos enviados (gift)', 'EasterBunny', 5]);
                                                                    data_game_server.push([' Tienes '+accounttp.player.gm_probability+' ganadas seguidas = 200% GP & Gold! Event probabilidad x'+accounttp.player.gm_probability, '', 6]);
                                                                }
                                                                accounttp.send([Types.SERVER_OPCODE.room_state, [0, data_game_server], 1]);
                                                            }
                                                        });
                                                    }
                                                }, 1000);
                                            });
                                        }
                                    }
                                });
                                return null;
                            }
                        }, 5000);
                        /* || *==============[End of the BOT Computer code]=================* || */
                        /* || *===============[Start of the BOT Holiday code]================* || */
                        var endpoints = 30;
                        if (self.player.gm_probability >= endpoints) {
                            endpoints = parseInt(self.player.gm_probability + 4);
                        }
                        let random_probability_holiday = parseInt(getRndInteger(3, endpoints));
                        var Merry_Christmas = 8273;
                        var Santa_Claus_Head = 8289;
                        var Santa_Claus_Body = 8290;
                        var Ava_Send = 0;
                        if (self.gameserver.name === 'Holiday' && self.player.tournament_wait_game == 1 && self.player.gm_probability === random_probability_holiday/* || self.player.user_id === 1*/) {
                            self.player.room_number = id;
                            self.gameserver.rooms[id] = new Room(id, "(party) Happy Easter (party)", "", 1, 1, self.gameserver);
                            self.gameserver.getRoomById(id, function (room) {
                                if (room) {
                                    var bot_data = {user_id: id_bot, reg_id: id_bot, game_id: 'EasterBunny', rank: 26, gp: 0, gold: 0, cash: 0, gender: "m", photo_url: "1234", ahead: 193, abody: 149, aeyes: 0, aflag: 8046, abackground: 1071, aforeground: 443, is_muted: 0, guild: 'GM', guild_id: 0, guild_job: 0};
                                    if (self.player.rank <= 18) {
                                        bot_data = {user_id: id_bot, reg_id: id_bot, game_id: 'EasterBunny', rank: 27, gp: 0, gold: 0, cash: 0, gender: "f", photo_url: "1234", ahead: 152, abody: 151, aeyes: 0, aflag: 8046, abackground: 1071, aforeground: 443, is_muted: 0, guild: 'GM', guild_id: 0, guild_job: 0};
                                    }
                                    var plx = new Player(bot_data);
                                    plx.is_bot = 1;
                                    plx.is_ready = 1;
                                    plx.position = 1;
                                    plx.mobile = Types.MOBILE.EASTER;
                                    plx.scores_lose = 1;
                                    plx.saludo_bot = "(heart) Feliz Semana Santa, Pasa un tiempo especial con tu familia. (heart)";
                                    let acc = new Bot(plx);
                                    acc.user_id = plx.user_id;
                                    acc.gameserver = self.gameserver;
                                    self.gameserver.bots[acc.user_id] = acc;
                                    room.addBot(acc);
                                    /* || *===============[Bot Holiday]================* || */
                                    self.player.is_master = 1;
                                    room.joinPlayer(self);
                                    if (room.player_count <= 1) {
                                        self.location_type = Types.LOCATION.ROOM;
                                    } else {
                                        return null;
                                    }
                                    self.player.tournament_wait_game = 0;
                                    room.is_tele_disabled = 1;
                                    room.changeTeam(self);
                                    if (self.gameserver.name === 'Bunge.') {
                                        room.map = Types.MAPS_PLAY[4];
                                    } else {
                                         room.map = Types.MAPS_PLAY[43];
                                    }
                                    self.player.room_number = room.id;
                                    room.max_wind = info_prix.max_wind;
                                    room.frist_turn = 0;
                                    room.game = new Game(room.id, room, room.gameserver, 0);
                                    if (room.game) {
                                        room.status = Types.ROOM_STATUS.PLAYING;
                                        room.game.start(function (fturn) {
                                            self.player.check_my_ava = info_prix.avatar_on;
                                            if (info_prix.avatar_on === 0) {
                                                self.player.shield = 0;
                                                self.player.shield_regen = 0;
                                            }
                                            self.gameserver.pushToRoom(room.id, new Message.gameStart(room));
                                            setTimeout(function() {
                                                self.send([0, "Hola!", plx.game_id, 12, plx.guild]);
                                            }, 10000);
                                            setTimeout(function() {
                                                self.send([0, plx.saludo_bot, plx.game_id, 12, plx.guild]);
                                            }, 23000);
                                        });
                                        room.game.onGameEnd(function (teamm) {
                                            room.forPlayers(function (accountdbb) {
                                                if (typeof (accountdbb) !== 'undefined') {
                                                    let playerdbb = accountdbb.player;
                                                    if (teamm === playerdbb.team) {
                                                        //playerdbb.addWinGoldWinGp(200, 10);
                                                        playerdbb.is_win = 1;
                                                        accountdbb.saveWinDB(room.power == 1 ? true : false);
                                                        if (accountdbb.scores_lose !== 1) {
                                                            if (accountdbb.user_id >= 80000)
                                                                return null;
                                                            if (playerdbb.gender === 'm') {
                                                                Ava_Send = 8289;
                                                                Santa_Claus_Head = 8289;
                                                                Santa_Claus_Body = 8290;
                                                            } else {
                                                                Ava_Send = 8289;
                                                                Santa_Claus_Head = 8289;
                                                                Santa_Claus_Body = 8290;
                                                            }
                                                            self.gameserver.db.getUserAvatarsByIdAccANDaId(playerdbb.user_id, Ava_Send).then(function (rowss) {//pin_code_generador
                                                                //Logger.info('The user: '+playerdbb.game_id+' already has the Boss '+plx.game_id+' avatar');
                                                                /*let Pin_code_listo = "DBTP-"+pin_code_generador(4)+"-"+pin_code_generador(4)+"-"+pin_code_generador(4);
                                                                if (Pin_code_listo.length === 19) {
                                                                    self.gameserver.db.getPinCodeByPin(Pin_code_listo).then(function (rowss32) {}).catch(function (err2) {
                                                                        self.gameserver.db.putPinCode(Pin_code_listo, plx.game_id, plx.game_id, plx.user_id, 5000, 'ON').then(function (data32) {
                                                                            accountdbb.send([17,"¡Congratulations!","<font color='yellow'><a color='yellow' href='/pin' target='_blank'>Pin Code</a> Delivered Successfully: </font><br><br><font color='#adff2f'>Pin Code: </font><font color='cyan'>"+Pin_code_listo+"</font><br><br>Thank You!<audio src='/static/images/merry_christmas.mp3' autoplay='true'></audio>"]);
                                                                            accountdbb.gameserver.pushBroadcast(new Message.chatResponse(self, plx.game_id+" sent cash -> DBTP-####-####-#### [Pin Code] to -> "+playerdbb.game_id, Types.CHAT_TYPE.GOLD));
                                                                            self.gameserver.chathistory.push([plx.game_id+" sent cash -> DBTP-####-####-#### [Pin Code] to -> "+playerdbb.game_id,'',Types.CHAT_TYPE.GOLD,'']);
                                                                        });
                                                                    });
                                                                }*/
                                                            }).catch(function (err) {
                                                                //Logger.info('Avatar delivered to the user: '+playerdbb.game_id+' for beating the boss '+plx.game_id);
                                                                //var name_ava_gift_bg = self.gameserver.avatars.getAvatagift(Merry_Christmas);
                                                                var name_ava_gift_hd = self.gameserver.avatars.getAvatagift(Santa_Claus_Head);
                                                                var name_ava_gift_bd = self.gameserver.avatars.getAvatagift(Santa_Claus_Body);
                                                                
                                                                accountdbb.player.gifts_holiday += 1;
                                                                
                                                                //let datasendgift_1 = {UserId: playerdbb.user_id, aId: Merry_Christmas, type: 0, expire_time: 0, is_cash: 0, is_gift: 1, gift_sent_by: plx.user_id, amount: 0, date_ava_time: Date.now()};
                                                                //self.gameserver.db.putUserAvatars(datasendgift_1);
                                                                let datasendgift_2 = {UserId: playerdbb.user_id, aId: Santa_Claus_Head, type: 0, expire_time: 0, is_cash: 0, is_gift: 1, gift_sent_by: plx.user_id, amount: 0, date_ava_time: Date.now()};
                                                                self.gameserver.db.putUserAvatars(datasendgift_2);
                                                                let datasendgift_3 = {UserId: playerdbb.user_id, aId: Santa_Claus_Body, type: 0, expire_time: 0, is_cash: 0, is_gift: 1, gift_sent_by: plx.user_id, amount: 0, date_ava_time: Date.now()};
                                                                self.gameserver.db.putUserAvatars(datasendgift_3);
                                                                
                                                                self.gameserver.db.updateGiftsByHoliday(2, 1);
                                                                
                                                                //accountdbb.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [plx.game_id, Merry_Christmas, 0, "Happy Easter", "forever", name_ava_gift_bg]));
                                                                accountdbb.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [plx.game_id, Santa_Claus_Head, 0, "Happy Easter", "forever", name_ava_gift_hd]));
                                                                accountdbb.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [plx.game_id, Santa_Claus_Body, 0, "Happy Easter", "forever", name_ava_gift_bd]));
                                                                
                                                                //accountdbb.gameserver.pushBroadcast(new Message.chatResponse(self, plx.game_id+" sent gift -> "+name_ava_gift_bg+" [Glass] to -> "+playerdbb.game_id, Types.CHAT_TYPE.GOLD));
                                                                accountdbb.gameserver.pushBroadcast(new Message.chatResponse(self, plx.game_id+" sent gift -> "+name_ava_gift_hd+" [Flag] to -> "+playerdbb.game_id, Types.CHAT_TYPE.GOLD));
                                                                accountdbb.gameserver.pushBroadcast(new Message.chatResponse(self, plx.game_id+" sent gift -> "+name_ava_gift_bd+" [Background] to -> "+playerdbb.game_id, Types.CHAT_TYPE.GOLD));
                                                                
                                                                //self.gameserver.chathistory.push([plx.game_id+" sent gift -> "+name_ava_gift_bg+" [Glass] to -> "+playerdbb.game_id,'',Types.CHAT_TYPE.GOLD,'']);
                                                                self.gameserver.chathistory.push([plx.game_id+" sent gift -> "+name_ava_gift_hd+" [Flag] to -> "+playerdbb.game_id,'',Types.CHAT_TYPE.GOLD,'']);
                                                                self.gameserver.chathistory.push([plx.game_id+" sent gift -> "+name_ava_gift_bd+" [Background] to -> "+playerdbb.game_id,'',Types.CHAT_TYPE.GOLD,'']);
                                                            });
                                                            playerdbb.gm_probability += 1;
                                                            self.gameserver.db.updateProbability(playerdbb.gm_probability, playerdbb.user_id);
                                                        }
                                                    } else {
                                                        playerdbb.is_loss = 1;
                                                        accountdbb.saveWinDB(room.power == 1 ? true : false);
                                                        if (accountdbb.scores_lose !== 1) {
                                                            playerdbb.gm_probability = 0;
                                                            self.gameserver.db.updateProbability(0, playerdbb.user_id);
                                                        }
                                                    }
                                                }
                                            });
                                            room.game = null;
                                            room.status = Types.ROOM_STATUS.WAITING;
                                            room.gameserver.pushToRoom(room.id, new Message.roomPlayers(room));
                                            setTimeout(function() {
                                                self.player.room_number = 0;
                                                self.location_type = Types.LOCATION.CHANNEL;
                                                room.removePlayer(self);
                                                self.sendMessage(new Message.loginResponse(self));
                                                self.player.is_ready = 0;
                                                self.player.is_master = 0;
                                                self.gameserver.sendAccountsOnline();
                                                self.gameserver.removeRoom(room.id);
                                                self.gameserver.forEachAccount(function (accounttp) {
                                                    if (accounttp !== null && accounttp.player.user_id === self.player.user_id) {
                                                        var data_game_server = self.gameserver.chathistory.slice(0);
                                                        data_game_server.push(['', '', 9]);
                                                        if (self.gameserver.evento200 === true)
                                                            data_game_server.push([' El porcentaje de GP & Gold cambiaron a 200%', '[Inicio de Evento', 17]);
                                                        if (self.gameserver.id === 2) {
                                                            data_game_server.push([' Búscame, gáname y te llevas un regalo: (gift) '+accounttp.player.gifts_holiday+' Regalos enviados (gift)', 'EasterBunny', 5]);
                                                            data_game_server.push([' Tienes '+accounttp.player.gm_probability+' ganadas seguidas = 200% GP & Gold! Event probabilidad x'+accounttp.player.gm_probability, '', 6]);
                                                        }
                                                        accounttp.send([Types.SERVER_OPCODE.room_state, [0, data_game_server], 1]);
                                                    }
                                                });
                                            }, 1000);
                                        });
                                    }
                                }
                            });
                            return null;
                        }
                        /* || *==============[End of the BOT Holiday code]=================* || */
                        self.gameserver.forEachAccount(function (accountp) {
                            if (accountp !== null ? accountp.user_id != self.user_id : !1) {
                                if (accountp.player.tournament_wait_game == 1 && self.player.tournament_wait_game == 1) {
                                    if (self.player.computer_ip !== accountp.player.computer_ip) {
                                        self.player.room_number = id;
                                        accountp.player.room_number = id;
                                        self.gameserver.rooms[id] = new Room(id, "(party) Prix Individual (trophy)", "", 2, 0, self.gameserver);
                                        self.gameserver.getRoomById(id, function (room) {
                                            if (room) {
                                                self.player.is_master = 1;
                                                accountp.player.is_master = 0;
                                                room.joinPlayer(self);
                                                room.joinPlayer(accountp);
                                                if (room.player_count <= 2) {
                                                    self.location_type = Types.LOCATION.ROOM;
                                                    accountp.location_type = Types.LOCATION.ROOM;
                                                } else {
                                                    return null;
                                                }
                                                accountp.player.tournament_wait_game = 0;
                                                room.is_tele_disabled = 1;
                                                self.player.tournament_wait_game = 0;
                                                //room.gameStart(self);
                                                if (self.gameserver.name === 'Bunge.') {
                                                    room.map = Types.MAPS_PLAY[4];
                                                } else {
                                                    room.map = Types.MAPS_PLAY[43];//19
                                                }
                                                room.max_wind = info_prix.max_wind;
                                                room.frist_turn = 0;
                                                room.game = new Game(room.id, room, room.gameserver, 0);
                                                room.status = Types.ROOM_STATUS.PLAYING;
                                                room.game.start(function (fturn) {
                                                    self.player.check_my_ava = info_prix.avatar_on;
                                                    accountp.player.check_my_ava = info_prix.avatar_on;
                                                    if (info_prix.avatar_on === 0) {
                                                        self.player.shield = 0;accountp.player.shield = 0;
                                                        self.player.shield_regen = 0;accountp.player.shield_regen = 0;
                                                    }
                                                    room.gameserver.pushToRoom(room.id, new Message.gameStart(room));
                                                    if (self.gameserver.name === 'Holiday') {
                                                        setTimeout(function() {
                                                            self.send([0,self.player.game_id+" ("+self.player.gm_probability+") -VS- "+accountp.player.game_id+" ("+accountp.player.gm_probability+")","",17]);
                                                            accountp.send([0,accountp.player.game_id+" ("+accountp.player.gm_probability+") -VS- "+self.player.game_id+" ("+self.player.gm_probability+")","",17]);
                                                        }, 3000);
                                                    }
                                                    if (self.gameserver.name === 'Prix') {
                                                        setTimeout(function() {
                                                            self.send([0,self.player.game_id+" ("+self.player.punts_prix_user+") -VS- "+accountp.player.game_id+" ("+accountp.player.punts_prix_user+")","",17]);
                                                            accountp.send([0,accountp.player.game_id+" ("+accountp.player.punts_prix_user+") -VS- "+self.player.game_id+" ("+self.player.punts_prix_user+")","",17]);
                                                        }, 3000)
                                                    }
                                                });
                                                room.game.onGameEnd(function (teamm) {
                                                    //Logger.log("Prix Game End: " + room.id + " win team: " + teamm);
                                                    room.forPlayers(function (accountdbb) {
                                                        if (typeof (accountdbb) !== 'undefined') {
                                                            let playerdbb = accountdbb.player;
                                                            if (teamm === playerdbb.team) {
                                                                //playerdbb.addWinGoldWinGp(200, 10);
                                                                playerdbb.is_win = 1;
                                                                accountdbb.saveWinDB(room.power == 1 ? true : false);
                                                                if (self.gameserver.name === 'Holiday') {
                                                                    playerdbb.gm_probability += 1;
                                                                    self.gameserver.db.updateProbability(playerdbb.gm_probability, playerdbb.user_id);
                                                                }
                                                                if (self.gameserver.name === 'Prix') {
                                                                    playerdbb.punts_prix_user = parseInt(playerdbb.punts_prix_user + 1);
                                                                    accountdbb.sendMessage(new Message.loginResponse(accountdbb));
                                                                    self.gameserver.db.updatePrix(playerdbb.punts_prix_user, accountdbb)
                                                                        .then(function (data) {
                                                                        if (data.error_mysql || data.error_querry) {} else {
                                                                            //Logger.info('The '+accountdbb.player.game_id+' user points have been updated');
                                                                        }
                                                                    });
                                                                }
                                                            } else {
                                                                playerdbb.is_loss = 1;
                                                                accountdbb.saveWinDB(room.power == 1 ? true : false);
                                                                if (self.gameserver.name === 'Holiday') {
                                                                    playerdbb.gm_probability = 0;
                                                                    self.gameserver.db.updateProbability(0, playerdbb.user_id);
                                                                }
                                                                if (self.gameserver.name === 'Prix') {
                                                                    playerdbb.punts_prix_user = parseInt(playerdbb.punts_prix_user - 1);
                                                                    accountdbb.sendMessage(new Message.loginResponse(accountdbb));
                                                                    self.gameserver.db.updatePrix(playerdbb.punts_prix_user, accountdbb)
                                                                        .then(function (data) {
                                                                        if (data.error_mysql || data.error_querry) {} else {
                                                                            //Logger.info('The '+accountdbb.player.game_id+' user points have been updated');
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }
                                                    });
                                                    room.game = null;
                                                    room.status = Types.ROOM_STATUS.WAITING;
                                                    room.gameserver.pushToRoom(room.id, new Message.roomPlayers(room));
                                                    setTimeout(function() {
                                                        //Logger.info("Users removed from the room: "+room.id);
                                                        self.player.room_number = 0;accountp.player.room_number = 0;
                                                        accountp.location_type = Types.LOCATION.CHANNEL;self.location_type = Types.LOCATION.CHANNEL;
                                                        room.removePlayer(accountp);room.removePlayer(self);
                                                        accountp.sendMessage(new Message.loginResponse(accountp));self.sendMessage(new Message.loginResponse(self));
                                                        accountp.player.is_ready = 0;self.player.is_ready = 0;
                                                        accountp.player.is_master = 0;self.player.is_master = 0;
                                                        accountp.gameserver.sendAccountsOnline();self.gameserver.sendAccountsOnline();
                                                        self.gameserver.removeRoom(room.id);
                                                        if (self.gameserver.name === 'Holiday') {
                                                            self.gameserver.forEachAccount(function (accounttp) {
                                                                if (accounttp !== null && accounttp.player.user_id === self.player.user_id) {
                                                                    var data_game_server = self.gameserver.chathistory.slice(0);
                                                                    data_game_server.push(['', '', 9]);
                                                                    if (self.gameserver.evento200 === true)
                                                                        data_game_server.push([' El porcentaje de GP & Gold cambiaron a 200%', '[Inicio de Evento', 17]);
                                                                    if (self.gameserver.name === 'Holiday') {
                                                                        data_game_server.push([' Búscame, gáname y te llevas un regalo: (gift) '+accounttp.player.gifts_holiday+' Regalos enviados (gift)', 'EasterBunny', 5]);
                                                                        data_game_server.push([' Tienes '+accounttp.player.gm_probability+' ganadas seguidas = 200% GP & Gold! Event probabilidad x'+accounttp.player.gm_probability, '', 6]);
                                                                    }
                                                                    accounttp.send([Types.SERVER_OPCODE.room_state, [0, data_game_server], 1]);
                                                                }
                                                            });
                                                        }
                                                    }, 1000);
                                                });
                                            } else {
                                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_DOES_NOT_EXIST, []));
                                            }
                                        });
                                        return null;
                                    }
                                }
                            }
                        });
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.tournament_cancel_wait:
                {
                    if (self.player.tournament_wait_game == 1)
                        self.player.tournament_wait_game = 0;
                    break;
                }
            case Types.CLIENT_OPCODE.create_team:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var info_prix = ArrayToObject(self.player.tournament, "start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event".split(" "));
                    
                    if (info_prix.players === 2) {
                        self.sendMessage(new Message.alertResponse("No teams on this server", "Only 1v1 games are allowed on this server right now."));
                        return null;
                    }
                    
                    let id = self.gameserver.getIdforRoom();
                    self.player.room_number = id;/* MIRAR */
                    self.gameserver.rooms[id] = new Room(id, "Team", "", 8, 0, self.gameserver);
                    self.gameserver.getRoomById(id, function (room) {
                        if (room) {
                            if (room.player_count < room.max_players) {
                                self.player.is_master = 1;
                                if (self.gameserver.name === 'Guilds Prix') {
                                    if (info_prix.force_mobile !== -1 || info_prix.force_mobile !== -2) {
                                        self.player.mobile = info_prix.force_mobile;
                                    }
                                }
                                room.search_team_room = 1;
                                room.room_tournament_playing = 0;
                                if (self.gameserver.name === 'Bunge.') {
                                    room.map = Types.MAPS_PLAY[4];
                                } else {
                                    room.map = Types.MAPS_PLAY[5];
                                }
                                room.is_avatars_on = info_prix.avatar_on;
                                room.is_s1_disabled = info_prix.s1;
                                room.is_tele_disabled = info_prix.tp;
                                room.joinPlayer(self);
                                self.location_type = Types.LOCATION.ROOM;
                                self.player.room_number = room.id;
                                self.sendMessage(new Message.loginResponse(self));
                            }
                        } else {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_DOES_NOT_EXIST, []));
                        }
                    });
                    
                    break;
                }
                
            case Types.CLIENT_OPCODE.game_share:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    self.gameserver.db.getMyScreeRoomGameByLetters(self.player.code_screenshot_random).then(function (rows) {
                        self.send([Types.SERVER_OPCODE.game_share, 2, self.player.code_screenshot_random, JSON.stringify(self.player.screenshot)]);
                    }).catch(function () {
                        self.gameserver.db.putMyScreeRoomGame(self.player.code_screenshot_random, JSON.stringify(self.player.screenshot)).then(function (rows) {
                            self.send([Types.SERVER_OPCODE.game_share, 2, self.player.code_screenshot_random, JSON.stringify(self.player.screenshot)]);
                        });
                    });
                    break;
                }
                
            case Types.CLIENT_OPCODE.room_title:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var _title1 = message[1];
                    if (self.room) {
                        self.room.RoomTitle(_title1);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.room_change_ready:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let status = message[1];
                    self.player.is_ready = status === true ? 1 : 0;
                    if (self.room) {
                        self.gameserver.pushToRoom(self.room.id, new Message.changedReady(self));
                        self.room.masterTime(status);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.room_change_team:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    if (self.room) {
                        self.room.changeTeam(self);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.select_bot:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    //Logger.info("mess: " + message);
                    if (self.room) {//33, possition, bot
                        if (self.room.team_bots_count <= 0) {
                            let id = self.gameserver.getIdforBot();
                            var bot_data = {
                                user_id: id,
                                reg_id: 0,
                                game_id: 'Clown Stripe',
                                rank: 1,
                                gp: 0,
                                gold: 0,
                                cash: 0,
                                gender: "m",
                                photo_url: "",
                                ahead: 1,
                                abody: 2,
                                aeyes: 0,
                                aflag: 0,
                                abackground: 0,
                                aforeground: 0,
                                is_muted: 0,
                                guild: '',
                                guild_id: 0,
                                guild_job: 0
                            };
                            var plx = new Player(bot_data);
                            plx.is_bot = 1;
                            plx.is_ready = 1;
                            plx.position = 1;
                            plx.mobile = Types.MOBILE.ARMOR;//AQUI VA EL NOMBRE DEL MOVÍL QUE QUIERES QUE TENGA EL BOSS
                            plx.scores_lose = 1;
                            let acc = new Bot(plx);
                            acc.user_id = id;
                            acc.gameserver = self.gameserver;
                            self.gameserver.bots[acc.user_id] = acc;
                            self.room.addBot(acc);
                        }
                            var plx = new Player(bot_data);
                            plx.is_bot = 1;
                            plx.is_ready = 1;
                            plx.position = 5;
                            plx.mobile = Types.MOBILE.ARMOR;
                            plx.scores_lose = 1;
                            let acc = new Bot(plx);
                            acc.user_id = id;
                            acc.gameserver = self.gameserver;
                            self.gameserver.bots[acc.user_id] = acc;
                            self.room.addBot(acc);
                        }
                        else if (self.room.team_bots_count >= 0) {
                            return null;
                        }
                    }
                    break;
                
            case Types.CLIENT_OPCODE.mobile:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    var _mob = message[1];
                    if (self.room) {
                        if (typeof (Types.MOBILES[_mob]) != 'undefined' && Types.MOBILES[_mob] !== null) {
                            if (self.player.is_master === 1 && self.room.game_mode === Types.GAME_MODE.SAME ) {
                                self.room.forPlayers(function (accountdbp) {
                                    if (accountdbp !== null) {
                                            var prohivido = true;
                                            if (self.player.rank < 26 || self.player.rank === 27 || self.player.rank === 28 || self.player.rank === 29 || self.player.rank === 30)
                                                if (_mob == Types.MOBILE.DRAGON || _mob == Types.MOBILE.COPYLOID || _mob == Types.MOBILE.BEE)
                                                    prohivido = false;
                                            if (prohivido) {
                                                if (_mob == Types.MOBILE.RANDOM) {
                                                    self.player.random_mobil = 1;
                                                    accountdbp.player.random_mobil = 1;
                                                } else if (_mob == Types.MOBILE.BEE) {
                                                    _mob = 1;
                                                    self.send([17,"¡Locked!", "No tienes permitido realizar esta función."]);
                                                } else {
                                                    self.player.random_mobil = 0;
                                                    accountdbp.player.random_mobil = 0;
                                                }
                                                accountdbp.player.mobile = _mob;
                                                self.gameserver.pushToRoom(self.player.room_number, new Message.changedMobile(accountdbp));
                                                return null;
                                            } else {
                                                self.player.mobile = Types.MOBILE.ARMOR;
                                                accountdbp.player.mobile = Types.MOBILE.ARMOR;
                                                self.gameserver.pushToRoom(self.room.id, new Message.changedMobile(self));self.gameserver.pushToRoom(self.room.id, new Message.changedMobile(accountdbp));
                                                return null;
                                            }
                                    }
                                });
                            }
                        }
                        
                        if (typeof (Types.MOBILES[_mob]) != 'undefined' && Types.MOBILES[_mob] !== null) {
                            if (_mob == Types.MOBILE.RANDOM) {
                                self.player.random_mobil = 1;
                            } else {
                                self.player.random_mobil = 0;
                            }
                            self.player.mobile = _mob;
                            self.gameserver.pushToRoom(self.room.id, new Message.changedMobile(self));
                        }
                        
                        if (self.player.rank < 26 || self.player.rank === 27 || self.player.rank === 28 || self.player.rank === 29 || self.player.rank === 30) {
                            if (_mob == Types.MOBILE.DRAGON || _mob == Types.MOBILE.COPYLOID) {
                                self.sendMessage(new Message.alertResponse("Non-Selectable Mobile", "You can not select this mobile."));
                                self.player.mobile = Types.MOBILE.ARMOR;
                                self.gameserver.pushToRoom(self.room.id, new Message.changedMobile(self));
                                return null;
                            }
                        }
                    }
                    break;
                }
                
            case Types.CLIENT_OPCODE.game_start:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    /*if ((self.player.rank >= 27) === false) {
                        return null;
                    }*/
                    
                    if (self.room) {
                        if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                            if (self.room.team_bots_count === 0) {
                                self.sendMessage(new Message.alertResponse("Hola "+this.player.game_id, "Para Empezar La Partida Amenos Debe De Eligir Mínimo Un Boss."));
                                return null;
                            }
                        }
                        
                        if (self.player.is_master === 1) {
                            var TeamRandom = 0;
                            if (self.room.game_mode !== Types.GAME_MODE.BOSS)
                                TeamRandom = getRndInteger(0,1);
                            self.room.frist_turn = TeamRandom;
                            //Guilds Prix
                            var info_prix = ArrayToObject(self.player.tournament, "start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event".split(" "));
                            if (self.room.search_team_room === 1) {//Inicio de codigo del Vs Team
                                if (self.room.player_count < 4 && self.gameserver.name === 'Guilds Prix') {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NOT_4_SAME_GUILD, []));
                                    return null;
                                }
                                
                                if (self.room.player_count === 1 && self.gameserver.name !== 'Prix') {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.FEW_PLAYERS, []));
                                    return null;
                                } else if (self.player.tournament_start_time_server >= Date.now() && self.gameserver.name === 'Guilds Prix') {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.TOURNAMENT_NOT_STARTED, []));
                                    return null;
                                } else if (self.player.tournament_start_time_server <= Date.now() && self.gameserver.name === 'Guilds Prix') {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.TOURNAMENT_ENDED, []));
                                    return null;
                                } else if (self.player.guild === '' && self.gameserver.name === 'Guilds Prix') {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NO_GUILD, []));
                                    return null;
                                } else if (self.player.guild_score <= info_prix.min_points && self.gameserver.name === 'Guilds Prix') {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.DISQUALIFIED_GUILD, [self.player.guild_score, info_prix.min_points]));
                                    return null;
                                } else {
                                    self.room.team_tournament_game = 1;
                                    self.room.forPlayers(function (account1) {
                                        if (self.gameserver.name === 'Guilds Prix') {
                                            if (self.player.guild !== '') {
                                                if (account1.player.guild === self.player.guild) {
                                                    account1.send([Types.SERVER_OPCODE.team_search, 1]);
                                                } else if (account1.player.guild !== self.player.guild) {
                                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NOT_IN_MY_GUILD, []));
                                                    account1.send([Types.SERVER_OPCODE.team_search, 0]);
                                                    self.send([Types.SERVER_OPCODE.team_search, 0]);
                                                    self.room.team_tournament_game = 0;
                                                    return null;
                                                } else {}
                                            }
                                        } else {
                                            account1.send([Types.SERVER_OPCODE.team_search, 1]);
                                        }
                                        //account1.send([Types.SERVER_OPCODE.team_search, 1]);
                                    });
                                    if (self.gameserver.name === 'Guilds Prix') {
                                        self.room.room_players_guild = self.player.guild;//pin_code_generador(9)
                                    } else {
                                        self.room.room_players_guild = pin_code_generador(9);
                                    }
                                    let id = self.gameserver.getIdforRoom();
                                    self.gameserver.forEachRooms(function (rooms_search) {
                                        if (self.room.team_tournament_game === 1) {
                                            if (self.room.id != rooms_search.id) {
                                                if (self.room.team_tournament_game === 1 && rooms_search.team_tournament_game === 1) {
                                                    if (self.room.player_count === rooms_search.player_count) {
                                                        if (self.room.room_players_guild !== rooms_search.room_players_guild) {//
                                                        self.room.team_tournament_game = 0;
                                                        rooms_search.team_tournament_game = 0;
                                                        self.room.forPlayers(function (account1) {
                                                            account1.player.team_tournament_room = self.room.id;
                                                            if (account1.player.is_master === 1) {
                                                                account1.player.user_master_room = 1;
                                                            }
                                                        });
                                                        rooms_search.forPlayers(function (account2) {
                                                            account2.player.team_tournament_room = rooms_search.id;
                                                            if (account2.player.is_master === 1) {
                                                                account2.player.user_master_room = 1;
                                                            }
                                                        });
                                                        self.room.room_tournament_playing = 1;
                                                        rooms_search.room_tournament_playing = 1;
                                                        self.gameserver.rooms[id] = new Room(id, "Team Start", "", 8, 0, self.gameserver);
                                                        self.gameserver.getRoomById(id, function (room) {
                                                            if (room) {
                                                                room.team_tournament_game = 0;
                                                                if (self.gameserver.name === 'Bunge.') {
                                                                    room.map = Types.MAPS_PLAY[4];
                                                                } else {
                                                                    room.map = Types.MAPS_PLAY[5];
                                                                }
                                                                room.is_avatars_on = info_prix.avatar_on;
                                                                room.is_s1_disabled = info_prix.s1;
                                                                room.is_tele_disabled = info_prix.tp;
                                                                
                                                                self.room.forPlayers(function (account1) {
                                                                    account1.send([Types.SERVER_OPCODE.team_search, 0]);
                                                                    account1.location_type = Types.LOCATION.ROOM;
                                                                    account1.player.room_number = room.id;
                                                                    if (self.gameserver.name === 'Guilds Prix') {
                                                                        account1.player.mobile = info_prix.force_mobile;
                                                                    }
                                                                    
                                                                    account1.player.is_master = 0;
                                                                    account1.player.is_ready = 0;
                                                                    
                                                                    room.team_a[account1.user_id] = account1.user_id;
                                                                    account1.player.team = 0;
                                                                    room.team_a_count++;
                                                                    room.player_count++;
                                                                    if ((room.team_a_count + room.team_b_count) != room.player_count) {
                                                                        room.player_count = room.team_a_count + room.team_b_count;
                                                                    }
                                                                    account1.send([Types.SERVER_OPCODE.enter_room]);
                                                                    room.updatePosition().then(function () {
                                                                        account1.room = room;
                                                                        account1.sendMessage(new Message.roomState(room));
                                                                        self.gameserver.pushToRoom(room.id, new Message.roomPlayers(room), null);
                                                                    });
                                                                    
                                                                });
                                                                rooms_search.forPlayers(function (account2) {
                                                                    account2.send([Types.SERVER_OPCODE.team_search, 0]);
                                                                    account2.player.room_number = room.id;
                                                                    account2.location_type = Types.LOCATION.ROOM;
                                                                    if (self.gameserver.name === 'Guilds Prix') {
                                                                        account2.player.mobile = info_prix.force_mobile;
                                                                    }
                                                                    
                                                                    account2.player.is_master = 0;
                                                                    account2.player.is_ready = 0;
                                                                    
                                                                    room.team_b[account2.user_id] = account2.user_id;
                                                                    account2.player.team = 1;
                                                                    room.team_b_count++;
                                                                    account2.send([Types.SERVER_OPCODE.enter_room]);
                                                                    room.updatePosition().then(function () {
                                                                        account2.room = room;
                                                                        account2.sendMessage(new Message.roomState(room));
                                                                        self.gameserver.pushToRoom(room.id, new Message.roomPlayers(room), null);
                                                                    });
                                                                    
                                                                });
                                                                room.frist_turn = 0;
                                                                room.game = new Game(room.id, room, room.gameserver, 0);
                                                                room.status = Types.ROOM_STATUS.PLAYING;
                                                                room.game.start(function (fturn) {
                                                                    room.forPlayers(function (accountbte) {
                                                                        if (typeof (accountbte) !== 'undefined') {
                                                                            if (accountbte.player.mobile === Types.MOBILE.RANDOM) {
                                                                                var random_number = parseInt(getRndInteger(0, 28));
                                                                                if (random_number === Types.MOBILE.RANDOM)
                                                                                    random_number = Types.MOBILE.COPYLOID;
                                                                                accountbte.player.mobile = parseInt(random_number);
                                                                            }
                                                                            accountbte.player.check_my_ava = info_prix.avatar_on;
                                                                            if (info_prix.avatar_on === 0) {
                                                                                accountbte.player.shield = 0;
                                                                                accountbte.player.shield_regen = 0;
                                                                            }
                                                                        }
                                                                    });
                                                                    room.gameserver.pushToRoom(room.id, new Message.gameStart(room));
                                                                });
                                                                room.game.onGameEnd(function (teamm) {
                                                                    room.forPlayers(function (accountdbb) {
                                                                        if (typeof (accountdbb) !== 'undefined') {
                                                                            let playerdbb = accountdbb.player;
                                                                            if (teamm === playerdbb.team) {
                                                                                //playerdbb.addWinGoldWinGp(200, 10);
                                                                                playerdbb.is_win = 1;
                                                                                accountdbb.saveWinDB(room.power == 1 ? true : false);
                                                                                if (self.gameserver.name === 'Guilds Prix' && playerdbb.guild !== '' && info_prix.players === 7 && this.tournament_start_time_server <= Date.now() && this.tournament_end_time_server >= Date.now()) {
                                                                                    playerdbb.guild_score += 1;
                                                                                    self.gameserver.db.updateGuildPrixById(playerdbb.guild_score, playerdbb.guild_id);
                                                                                }
                                                                            } else {
                                                                                playerdbb.is_loss = 1;
                                                                                accountdbb.saveWinDB(room.power == 1 ? true : false);
                                                                                if (self.gameserver.name === 'Guilds Prix' && playerdbb.guild !== '' && info_prix.players === 7 && this.tournament_start_time_server <= Date.now() && this.tournament_end_time_server >= Date.now()) {
                                                                                    playerdbb.guild_score -= 1;
                                                                                    self.gameserver.db.updateGuildPrixById(playerdbb.guild_score, playerdbb.guild_id);
                                                                                }
                                                                            }
                                                                        }
                                                                    });
                                                                    room.game = null;
                                                                    room.status = Types.ROOM_STATUS.WAITING;
                                                                    room.gameserver.pushToRoom(room.id, new Message.roomPlayers(room));
                                                                    setTimeout(function() {
                                                                        self.room.forPlayers(function (account1) {
                                                                            self.gameserver.getRoomById(parseInt(account1.player.team_tournament_room), function (room2) {
                                                                                if (room2) {
                                                                                    setTimeout(function() {
                                                                                        room2.joinPlayer(account1);
                                                                                        room2.team_tournament_game = 0;
                                                                                        room2.room_tournament_playing = 0;
                                                                                        account1.player.room_number = room2.id;
                                                                                        if (account1.player.user_master_room === 1) {
                                                                                            account1.player.is_master = 1;
                                                                                        }
                                                                                        account1.location_type = Types.LOCATION.ROOM;
                                                                                        if (room2.search_team_room === 0) {
                                                                                            room2.search_team_room = 1;
                                                                                        }
                                                                                    }, 2000);
                                                                                }
                                                                            });
                                                                            room.removePlayer(account1);
                                                                            account1.sendMessage(new Message.loginResponse(account1));
                                                                            account1.gameserver.sendAccountsOnline();
                                                                        });
                                                                        rooms_search.forPlayers(function (account2) {
                                                                            self.gameserver.getRoomById(parseInt(account2.player.team_tournament_room), function (room2) {
                                                                                if (room2) {
                                                                                    setTimeout(function() {
                                                                                        room2.joinPlayer(account2);
                                                                                        room2.team_tournament_game = 0;
                                                                                        room2.room_tournament_playing = 0;
                                                                                        account2.player.room_number = room2.id;
                                                                                        if (account2.player.user_master_room === 1) {
                                                                                            account2.player.is_master = 1;
                                                                                        }
                                                                                        account2.location_type = Types.LOCATION.ROOM;
                                                                                        if (room2.search_team_room === 0) {
                                                                                            room2.search_team_room = 1;
                                                                                        }
                                                                                    }, 2000);
                                                                                }
                                                                            });
                                                                            room.removePlayer(account2);
                                                                            account2.sendMessage(new Message.loginResponse(account2));
                                                                            account2.gameserver.sendAccountsOnline();
                                                                        });
                                                                        room.forPlayers(function (accountdbbtp) {
                                                                            if (typeof (accountdbbtp) !== 'undefined') {
                                                                                room.removePlayer(accountdbbtp);
                                                                            }
                                                                        });
                                                                        self.gameserver.removeRoom(room.id);
                                                                    }, 1000);
                                                                });
                                                            }
                                                        });
                                                        return null;
                                                        }//
                                                    }//
                                                }
                                            }
                                        }
                                    });
                                }//Fin Del Codigo Vs Team
                            } else {
                                self.room.gameStart(self);
                            }
                        }
                    }
                    break;
                }
                
            case Types.CLIENT_OPCODE.team_search_cancel:
                {
                    if (self.room) {
                        if (self.room.team_tournament_game === 1) {
                            self.room.team_tournament_game = 0;
                            self.room.forPlayers(function (accountdbp) {
                                if (accountdbp !== null) {
                                    accountdbp.send([Types.SERVER_OPCODE.team_search, 0]);
                                }
                            });
                            //self.send([Types.SERVER_OPCODE.team_search, 0]);
                        }
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.game_items:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    //Logger.info("Items Seleccionados: " + message);
                    //Arreglar Problema De Items
                    var GameItems = message[1];
                    self.player.item1 = GameItems[0];
                    self.player.item2 = GameItems[2];
                    self.player.item3 = GameItems[4];
                    
                    let item_data = [Types.SERVER_OPCODE.items, [
                        [self.player.item1, -1, self.player.item2, -1, self.player.item3, -1], -1
                    ]];
                    self.send(item_data);
                    break;
                }
                
            case Types.CLIENT_OPCODE.game_use_item:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    var item_used_name = "";
                    var item_used = [Types.SERVER_OPCODE.items, [
                        [0, -1, 2, -1, 1, -1], -1
                    ]];
                    
                    //Logger.info('Items: '+message[1]);
                    //Types.ITEM.DUAL_PLUS;
                    if (self.room) {
                        if (message[1] === 0) {
                            if (self.player.item1 === 0) {
                                self.player.item1 = -1;
                                self.player.DUAL = 1;
                                item_used_name = "Dual";
                            } else if (self.player.item1 === 1) {
                                self.player.item1 = -1;
                                self.player.TELEPORT = 1;
                                item_used_name = "Teleport";
                            } else if (self.player.item1 === 2) {
                                self.player.item1 = -1;
                                self.player.DUAL_PLUS = 1;
                                item_used_name = "Dual+";
                            } else {}
                            item_used = [Types.SERVER_OPCODE.items, [
                                [self.player.item1, -1, self.player.item2, -1, self.player.item3, -1], -1
                            ]];
                        }
                        
                        if (message[1] === 2) {
                            if (self.player.item2 === 0) {
                                self.player.item2 = -1;
                                self.player.DUAL = 1;
                                item_used_name = "Dual";
                            } else if (self.player.item2 === 1) {
                                self.player.item2 = -1;
                                self.player.TELEPORT = 1;
                                item_used_name = "Teleport";
                            } else if (self.player.item2 === 2) {
                                self.player.item2 = -1;
                                self.player.DUAL_PLUS = 1;
                                item_used_name = "Dual+";
                            } else {}
                            item_used = [Types.SERVER_OPCODE.items, [
                                [self.player.item1, -1, self.player.item2, -1, self.player.item3, -1], -1
                            ]];
                        }
                        
                        if (message[1] === 4) {
                            if (self.player.item3 === 0) {
                                self.player.item3 = -1;
                                self.player.DUAL = 1;
                                item_used_name = "Dual";
                            } else if (self.player.item3 === 1) {
                                self.player.item3 = -1;
                                self.player.TELEPORT = 1;
                                item_used_name = "Teleport";
                            } else if (self.player.item3 === 2) {
                                self.player.item3 = -1;
                                self.player.DUAL_PLUS = 1;
                                item_used_name = "Dual+";
                            } else {}
                            item_used = [Types.SERVER_OPCODE.items, [
                                [self.player.item1, -1, self.player.item2, -1, self.player.item3, -1], -1
                            ]];
                        }
                        self.gameserver.pushBroadcastChat(new Message.chatResponse(self, this.player.game_id+ " Used Item: "+item_used_name, Types.CHAT_TYPE.SYSTEM), self.room);
                        self.send(item_used);
                    }
                    break;
                }
                
            case Types.CLIENT_OPCODE.game_move:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var _x = message[1];
                    var _y = message[2];
                    var _body = message[3];
                    var _look = message[4];
                    var _ang = message[5];
                    var _time = message[6];
                    if (self.room) {
                        self.player.x = _x;
                        self.player.y = _y;
                        self.player.body = _body;
                        self.player.look = _look;
                        self.player.ang = _ang;
                        self.player.move();
                        self.gameserver.pushToRoom(self.room.id, new Message.gameUpdate(self));
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.game_pass_turn:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let x = message[1];
                    let y = message[2];
                    let body = message[3];
                    let look = message[4];
                    let ang = message[5];
                    let _time1 = message[6];
                    if (self.room) {
                        self.player.x = x;
                        self.player.y = y;
                        self.body = body;
                        self.player.look = look;
                        self.player.ang = ang;
                        self.room.game.gamePass(self);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.game_shoot:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let x = message[1];
                    let y = message[2];
                    let body = message[3];
                    let look = message[4];
                    let ang = message[5];
                    let power = message[6];
                    let time = message[7];
                    let type = message[8];
                    if (self.room) {
                        self.player.x = x;
                        self.player.y = y;
                        self.player.body = body;
                        self.player.look = look;
                        self.player.move();
                        self.room.game.gameShoot(x, y, body, look, ang, power, time, type, self);
                        //Logger.info('x: '+x+' - y: '+y+' - body: '+body+' - look: '+look+' - ang: '+ang+' - power: '+power+' - time: '+time+' - type: '+type+' - self: '+self);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.addfriend:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    let agregar = parseInt(message[1]);
                    let amigo_id = self.gameserver.getAccountById(agregar);
                    let ropa = [self.player.ahead, self.player.abody, self.player.aeyes, self.player.aflag, self.player.aforeground, self.player.abackground];
                    amigo_id.send([Types.SERVER_OPCODE.friendreq, [self.player.user_id, self.player.game_id, ropa]]);
                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.FRIEND_REQUEST_SENT, [amigo_id.player.game_id]));
                    
                    break;
                }
            case Types.CLIENT_OPCODE.friend_approved:
                {
                    var nose = parseInt(message[1]);
                    var envitando_friend = self.gameserver.getAccountById(nose);
                    let ropa = [self.player.ahead, self.player.abody, self.player.aeyes, self.player.aflag, self.player.aforeground, self.player.abackground];
                    let amigo_ropa = [envitando_friend.player.ahead, envitando_friend.player.abody, envitando_friend.player.aeyes, envitando_friend.player.aflag, envitando_friend.player.aforeground, envitando_friend.player.abackground];
                    self.gameserver.db.putFriends(self.player.user_id, envitando_friend.player.user_id);
                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.FRIEND_ADDED, [envitando_friend.player.game_id, amigo_ropa]));
                    self.gameserver.db.putFriends(envitando_friend.player.user_id, self.player.user_id);
                    envitando_friend.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.FRIEND_ADDED, [self.player.game_id, ropa]));
                    break;
                }
            case Types.CLIENT_OPCODE.refresh_friends:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    self.gameserver.db.getFriendsByIdyo(self.player.user_id).then(function (rows) {
                        var my_friends = rows[0];
                        var my_friends_x2 = [];
                        var dato_frind = "";
                        for (var ix in my_friends) {
                            var friend_room = 0;
                            if (my_friends[ix].IsOnline !== 0) {
                                if (self.gameserver.id === my_friends[ix].IsOnline) {
                                    var my_friend_room = self.gameserver.getAccountById(parseInt(my_friends[ix].IdAcc));
                                    if (typeof (my_friend_room) !== 'undefined') {
                                        friend_room = my_friend_room.player.room_number;
                                    } else {
                                        friend_room = 0;
                                    }
                                } else {
                                    friend_room = 0;
                                }
                            } else {
                                friend_room = 0;
                            }
                            dato_frind = [
                                my_friends[ix].IdAcc,
                                my_friends[ix].gp,
                                my_friends[ix].game_id,
                                my_friends[ix].photo_url,
                                "b"+my_friends[ix].rank+"c"+my_friends[ix].IsOnline+"d"+friend_room
                            ];
                            my_friends_x2.push(dato_frind);
                        }
                        //self.sendMessage(new Message.loginResponse(self));
                        self.send([Types.SERVER_OPCODE.friends, my_friends_x2, self.gameserver.id, my_friends.length]);
                    }).catch(function () {
                        self.send([Types.SERVER_OPCODE.friends, [], self.gameserver.id, 8]);
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.refresh_guildies: 
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    
                    if (self.player.guild !== '') {
                        self.gameserver.db.getGuildMembersById(self.player.guild_id).then(function (rows) {
                            var my_members = rows[0];
                            var my_memberss_x2 = [];
                            var dato_member = "";
                            my_memberss_x2.push(self.player.guild);
                            my_memberss_x2.push(self.player.guild_job);
                            for (var ixx in my_members) {
                                var member_room = 0;
                                var member_server = my_members[ixx].IsOnline;
                                if (my_members[ixx].IsOnline !== 0) {
                                    if (self.gameserver.id === my_members[ixx].IsOnline) {
                                        member_server = -1;
                                        var my_friend_room = self.gameserver.getAccountById(parseInt(my_members[ixx].IdAcc));
                                        if (typeof (my_friend_room) !== 'undefined') {
                                            member_room = my_friend_room.player.room_number;
                                        } else {
                                            member_room = 0;
                                        }
                                    } else {
                                        member_room = 0;
                                        member_server = my_members[ixx].IsOnline;
                                    }
                                } else {
                                    member_room = 0;
                                    member_server = my_members[ixx].IsOnline;
                                }
                                dato_member = [
                                    my_members[ixx].IdAcc,
                                    my_members[ixx].game_id,
                                    my_members[ixx].gender,
                                    my_members[ixx].rank,
                                    my_members[ixx].gp,
                                    my_members[ixx].photo_url,
                                    member_server,
                                    member_room
                                ];
                                my_memberss_x2.push(dato_member);
                            }
                            //self.sendMessage(new Message.loginResponse(self));
                            self.send([Types.SERVER_OPCODE.guild, my_memberss_x2]);
                        }).catch(function () {
                            self.send([Types.SERVER_OPCODE.guild]);
                        });
                    } else {
                        self.send([Types.SERVER_OPCODE.guild]);
                    }
                    
                    break;
                }
            case Types.CLIENT_OPCODE.friend_delete:
                {
                    var user_delete = parseInt(message[1]);
                    self.gameserver.db.deleteFriendsByIdFriendYo(user_delete, self.player.user_id);
                    self.gameserver.db.deleteFriendsByIdFriendYo(self.player.user_id, user_delete);
                    self.send([40,26]);
                    self.sendMessage(new Message.loginResponse(self));
                    break;
                }
            case Types.CLIENT_OPCODE.relationship_change: 
                {
                    var rel_tip = message[1];
                    var rel_id = message[2];
                    let player2 = self.gameserver.getAccountById(rel_id);
                    let ropa = [self.player.ahead, self.player.abody, self.player.aeyes, self.player.aflag, self.player.aforeground, self.player.abackground];
                    let Ava_break = 0;
                    self.gameserver.db.getUserAvatarsByIdAcc(self.player.user_id).then(function (rowss) {
                        var avatar_user = rowss[0];
                        var valido = false;
                            for (var xm in avatar_user) {
                                if (rel_tip === 'f') {
                                    if (avatar_user[xm].aId === 1060) {
                                        self.send([40, 76, player2.player.game_id]);
                                        player2.send([44, [rel_tip, self.player.user_id, self.player.game_id, ropa, "hi"]]);
                                    }
                                }
                                if (rel_tip === 'e') {
                                    if (avatar_user[xm].aId === 1061) {
                                        self.send([40, 76, player2.player.game_id]);
                                        player2.send([44, [rel_tip, self.player.user_id, self.player.game_id, ropa, "hi"]]);
                                    }
                                }
                                if (rel_tip === 'm') {
                                    if (avatar_user[xm].aId === 1062) {
                                        self.send([40, 76, player2.player.game_id]);
                                        player2.send([44, [rel_tip, self.player.user_id, self.player.game_id, ropa, "hi"]]);
                                    }
                                }
                                if (rel_tip === 's') {
                                    if (self.player.relationship_status === 'f') {
                                        if (avatar_user[xm].aId === 1063) {
                                            valido = true;
                                            Ava_break = 1063;
                                        }
                                    }
                                    if (self.player.relationship_status === 'e') {
                                        if (avatar_user[xm].aId === 1064) {
                                            valido = true;
                                            Ava_break = 1064;
                                        }
                                    }
                                    if (self.player.relationship_status === 'm') {
                                        if (avatar_user[xm].aId === 1065) {
                                            valido = true;
                                            Ava_break = 1065;
                                        }
                                    }
                                    if (valido) {
                                        var name_ava_gift = self.gameserver.avatars.getAvatagift(Ava_break);
                                        self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "</3 Has usado el item "+'"'+name_ava_gift+' [ExItem]"'+" para terminar con "+self.player.relationship_with_name+", ahora estás soltero(a) de nuevo, Mejor suerte en tu próxima relación, hay muchos peces en el mar... :(", Types.CHAT_TYPE.SYSTEM), self.room);
                                        self.gameserver.db.deleteAvatarByUserID(self.player.user_id, Ava_break);
                                        self.gameserver.db.updateEndRelationByIdAcc('s', 0, self.player.user_id);
                                        self.gameserver.db.updateEndRelationByIdAcc('s', 0, self.player.relationship_with_id);
                                        self.player.relationship_status = 's';
                                        self.player.relationship_with_id = 0;
                                        self.player.relationship_with_rank = 0;
                                        self.player.relationship_with_photo = '';
                                        self.player.relationship_with_name = '';
                                        self.player.relationship_with_gender = '';
                                        self.connection.close();
                                    }
                                }
                            }
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.relationship_approved: 
                {
                    var new_rel_status = message[1];
                    var from_id = message[2];
                    let player2 = self.gameserver.getAccountById(from_id);
                    var casar = false;
                    if (new_rel_status === 'f') {//Enamorados
                        casar = true;
                        self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "["+self.player.game_id+" & "+player2.player.game_id+"] <3 Nueva Pareja <3 [Server "+self.gameserver.id+" Room "+self.room.id+"]", Types.CHAT_TYPE.LOVE));
                        self.gameserver.db.deleteAvatarByUserID(player2.player.user_id, 1060);
                    }
                    if (new_rel_status === 'e') {//Comprometidos
                        casar = true;
                        self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "["+self.player.game_id+" & "+player2.player.game_id+"] <3<3 Comprometidos <3<3 [Server "+self.gameserver.id+" Room "+self.room.id+"]", Types.CHAT_TYPE.LOVE));
                        self.gameserver.db.deleteAvatarByUserID(player2.player.user_id, 1061);
                    }
                    if (new_rel_status === 'm') {//Casados
                        casar = true;
                        self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "["+self.player.game_id+" & "+player2.player.game_id+"] <3<3<3 Casados <3<3<3 Para celebrar su matrimonio a 200% GP & GOLD EVENT empezó por 1 hora en el Server "+self.gameserver.id+" - [Server "+self.gameserver.id+" Room "+self.room.id+"]", Types.CHAT_TYPE.LOVE));
                        self.gameserver.db.deleteAvatarByUserID(player2.player.user_id, 1062);
                        if (Date.now() > self.player.gameserverevent) {
                            let Time_Event = Date.now() + (60 * 1000 * 60);
                            self.gameserver.db.updateTimeByEventServer(Time_Event, 60, 'Casamiento', 1);
                            var event_serv = setTimeout(function () {
                                self.gameserver.forEachAccount(function (account) {
                                    if (account !== null) {
                                        account.player.gameserverevent = Time_Event;
                                        account.gameserver.evento200 = true;
                                        var data_game_server = self.gameserver.chathistory.slice(0);
                                        
                                        data_game_server.push(['', '', 9]);
                                        if (self.gameserver.evento200 === true)
                                            data_game_server.push([' El porcentaje de GP & Gold cambiaron a 200%', '[Inicio de Evento', 17]);
                                        account.send([Types.SERVER_OPCODE.room_state, [0, data_game_server], 1]);
                                    }
                                });
                            }, 4000);
                        }
                    }
                    if (casar) {
                        self.gameserver.db.updateRelationStatusByIdAcc(new_rel_status, from_id, self.player.user_id);
                        self.gameserver.db.updateRelationStatusByIdAcc(new_rel_status, self.player.user_id, from_id);
                        //----------------------------------------------------------//
                        self.player.relationship_status = new_rel_status;
                        self.player.relationship_with_id = player2.player.user_id;
                        self.player.relationship_with_rank = player2.player.rank;
                        self.player.relationship_with_photo = player2.player.photo_url;
                        self.player.relationship_with_name = player2.player.game_id;
                        self.player.relationship_with_gender = player2.player.gender;
                        //----------------------------------------------------------//
                        player2.player.relationship_status = new_rel_status;
                        player2.player.relationship_with_id = self.player.user_id;
                        player2.player.relationship_with_rank = self.player.rank;
                        player2.player.relationship_with_photo = self.player.photo_url;
                        player2.player.relationship_with_name = self.player.game_id;
                        player2.player.relationship_with_gender = self.player.gender;
                        //----------------------------------------------------------//
                        self.sendMessage(new Message.loginResponse(self));
                        self.gameserver.sendAccountsOnline();
                        player2.sendMessage(new Message.loginResponse(player2));
                        player2.gameserver.sendAccountsOnline();
                        //==========================================================//
                        self.room.RoomUpdate(self);
                        self.room.RoomUpdate(player2);
                    }
                    break;
                }
            default:
                {
                    //change_lobby_channel
                    //change_info
                    Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                    break;
                }
        }
    }


    Chat(msj, ch) {
        var self = this;

        var maxlng = 120;
        if (self.player.gm === 1)
            maxlng = 150;

        if (msj.length < 1)
            return null;

        if (msj.length > maxlng)
            return null;
        
        if (self.gameserver.name === 'Prix' && this.player.gm === 0 && this.player.tournament_start_time_server <= Date.now() && this.player.tournament_end_time_server >= Date.now() || self.gameserver.name === 'Guilds Prix' && this.player.gm === 0 && this.player.tournament_start_time_server <= Date.now() && this.player.tournament_end_time_server >= Date.now()) {//Codigo De Spam
            self.sendMessage(new Message.alertResponse("Hola "+this.player.game_id, "El Chat en el Lobby esta prohibido para los usuarios."));
            return null;
        }
        
        if (msj == this.last_chat) {//Codigo De Spam
            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.CANT_DUP_CHAT, []));
            return null;
        }

        if (self.player.is_muted === true || self.player.is_muted >= Date.now()) {
            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.MUTED, []));
            return null;
        }
        if (self.player.rank < 5) {
            if(self.gameserver.id !== 3){
                self.sendMessage(new Message.chatResponse(self, "Nivel mínimo (rank5) es requerido para hablar en este lobby. Juega unas partidas o cambia de server. :)", Types.CHAT_TYPE.SYSTEM, -1));
                return null;
            }
        }

        var date = Date.now();
        var cans = false;
        if (this.last_message < date) {
            cans = true;
            this.last_message = date + 1000;
        } else {
            this.strik += 1;
            if (this.strik > 4) {
                self.player.is_muted = true;
                var FinishDateMuted = Date.now() + (60 * 1000 * 60);
                self.gameserver.db.updateMutedByIdAcc(FinishDateMuted, self.player.user_id);
            }
        }

        if (cans === true && self.player.is_muted !== true && self.player.is_muted != 1 || self.player.gm === 1) {
            var type = Types.CHAT_TYPE.NORMAL; //Types.CHAT_TYPE.GM;
            var save = true;
            var show = true;

            if (self.player.power_user === 1)
                type = Types.CHAT_TYPE.POWER_USER;
            
            if (self.player.gm === 1)
                type = Types.CHAT_TYPE.GM;
            
            if (self.player.rank === 28 && self.player.gm === 1 || self.player.rank === 29 && self.player.gm === 1 || self.player.rank === 30 && self.player.gm === 1)
                type = Types.CHAT_TYPE.SPECIAL;
            var rk = type == 4 || type == 0?this.player.rank:-1;
            if (show) {
                if (ch === true) {
                    if (save === true)
                        self.gameserver.chathistory.push([msj, this.player.game_id, type, rk, this.player.guild]);
                    self.gameserver.pushBroadcastChannel(new Message.chatResponse(self, msj, type, this.player.rank));
                    this.last_chat = msj;//Codigo De Spam
                } else
                    self.gameserver.pushBroadcastChat(new Message.chatResponse(self, msj, type), self.room);
                this.last_chat = msj;//Codigo De Spam
            }
        }
    }

    saveWinDB() {
        var self = this;
        let next_rank = 0; let check = 0;
        if (self.player.gp <= 1099) { next_rank = 0; }
        else if (self.player.gp >= 1100 && self.player.gp <= 1199) { next_rank = 1; }
        else if (self.player.gp >= 1200 && self.player.gp <= 1499) { next_rank = 2; }
        else if (self.player.gp >= 1500 && self.player.gp <= 1799) { next_rank = 3; }
        else if (self.player.gp >= 1800 && self.player.gp <= 2299) { next_rank = 4; }
        else if (self.player.gp >= 2300 && self.player.gp <= 2799) { next_rank = 5; }
        else if (self.player.gp >= 2800 && self.player.gp <= 3499) { next_rank = 6; }
        else if (self.player.gp >= 3500 && self.player.gp <= 4199) { next_rank = 7; }
        else if (self.player.gp >= 4200 && self.player.gp <= 5099) { next_rank = 8; }
        else if (self.player.gp >= 5100 && self.player.gp <= 5999) { next_rank = 9; }
        else if (self.player.gp >= 6000 && self.player.gp <= 6899) { next_rank = 10; }
        else if (self.player.gp >= 6900 && self.player.gp <= 9988) { next_rank = 11; }
        else if (self.player.gp >= 9989 && self.player.gp <= 14597) { next_rank = 12; }
        else if (self.player.gp >= 14598 && self.player.gp <= 21747) { next_rank = 13; }
        else if (self.player.gp >= 21748 && self.player.gp <= 33774) { next_rank = 14; }
        else if (self.player.gp >= 33775 && self.player.gp <= 55925) { next_rank = 15; }
        else if (self.player.gp >= 55926 && self.player.gp <= 90218) { next_rank = 16; }
        else if (self.player.gp >= 90219 && self.player.gp <= 148773) { next_rank = 17; }
        else if (self.player.gp >= 148774 && self.player.gp <= 228490) { next_rank = 18; }
        else if (self.player.gp >= 228491 && self.player.gp <= 414786) { next_rank = 19; }
        else if (self.player.gp >= 414787 && self.player.gp <= 972653) { next_rank = 20; }
        else if (self.player.gp >= 972654 && self.player.gp <= 6237949) { next_rank = 21; }
        else if (self.player.gp >= 6237950 && self.player.gp <= 8318726) { next_rank = 22; }
        else if (self.player.gp >= 8318727 && self.player.gp <= 10581059) { next_rank = 23; }
        else if (self.player.gp >= 10581060) { next_rank = 24; } else {}
        if (self.player.rank != next_rank && self.player.rank < 25) {
            if (self.player.rank <= 24) {
                self.player.scores_lose = 3;
                if(next_rank >= 22 && next_rank <= 24){
                    ///dragones
                    self.gameserver.db.searchRank().then(function(rows){
    let count = rows[0][0].cr;
    if(count > 1){
        if(count > 16){
            if(count > 20){
                if(count > 21){
                    //dragones azul rojo blanco y cetros
                    self.gameserver.db.listuserRank(count).then( rows => {
                let a = rows[0];
                    for(let i = 0; i < a.length; i++){
                        if(i == 0){
                            self.gameserver.db.editRANK(24,a[i].IdAcc).then(()=>{});
                        }else if(i >= 1 && i <= 4){
                            self.gameserver.db.editRANK(23,a[i].IdAcc).then(()=>{});
                        }else if(i >= 5 && i <= 21){
                            self.gameserver.db.editRANK(22,a[i].IdAcc).then(()=>{});
                        }else{
                            self.gameserver.db.editRANK(21,a[i].IdAcc).then(()=>{});
                        }
                    }
                    //upd
                self.gameserver.db.myRank(self.player.user_id).then(rows => {
                    let rankMyUser = rows[0][0].rank;
                    self.player.rank = rankMyUser;
                    
                });
                //upd
                    });
                }else{
                    //dragones azul rojo blanco
                    self.gameserver.db.listuserRank(count).then( rows => {
                let a = rows[0];
                    for(let i = 0; i < a.length; i++){
                        if(i == 0){
                            self.gameserver.db.editRANK(24,a[i].IdAcc).then(()=>{});
                        }else if(i >= 1 && i <= 4){
                            self.gameserver.db.editRANK(23,a[i].IdAcc).then(()=>{});
                        }else{
                            self.gameserver.db.editRANK(22,a[i].IdAcc).then(()=>{});
                        }
                    }
                    //upd
                self.gameserver.db.myRank(self.player.user_id).then(rows => {
                    let rankMyUser = rows[0][0].rank;
                    self.player.rank = rankMyUser;
                    
                });
                //upd
                    });
                }
            }else{
               //azules y rojos
               self.gameserver.db.listuserRank(count).then( rows => {
                let a = rows[0];
                    for(let i = 0; i < a.length; i++){
                        if(i >= 0 && i < (count - 16)){
                            self.gameserver.db.editRANK(23,a[i].IdAcc).then(()=>{});
                        }else{
                            self.gameserver.db.editRANK(22,a[i].IdAcc).then(()=>{});
                        }
                    }
                    //upd
                self.gameserver.db.myRank(self.player.user_id).then(rows => {
                    let rankMyUser = rows[0][0].rank;
                    self.player.rank = rankMyUser;
                    
                });
                //upd
               });
            }
        }else{
            ///solo dragones azules
            self.gameserver.db.listuserRank(count).then( rows => {
                let a = rows[0];
                for(let i = 0; i < a.length; i++){
                    self.gameserver.db.editRANK(22,a[i].IdAcc).then(()=>{});
                }
                //upd
                self.gameserver.db.myRank(self.player.user_id).then(rows => {
                    let rankMyUser = rows[0][0].rank;
                    self.player.rank = rankMyUser;
                    
                });
                //upd
            });

        }
    }else{
        //cetro dorado
        console.log("no sobrepasa el tope de gp:)");
    }
}).then(function(err){});
                    ///dragones
                }else{
                    self.player.rank = next_rank;
                }
                check = 3;
                self.sendMessage(new Message.loginResponse(self));
                self.gameserver.sendAccountsOnline();
            } else {
                self.player.scores_lose = 0;
                self.sendMessage(new Message.loginResponse(self));
                self.gameserver.sendAccountsOnline();
            }
        } else {
            self.player.scores_lose = 0;
            self.sendMessage(new Message.loginResponse(self));
            self.gameserver.sendAccountsOnline();
        }
        self.gameserver.db.updateUser(self)
            .then(function (data) {
                if (data.error_mysql || data.error_querry) {} else {
                    self.player.win_gold = 0;
                    self.player.win_gp = 0;
                    self.player.is_win = 0;
                    self.player.is_loss = 0;
                    self.player.is_ready = 0;
                    self.sendMessage(new Message.loginResponse(self));
                    self.gameserver.sendAccountsOnline();
                    self.room.RoomUpdate(self);
                }
            });
    }

    send(data) {
        this.connection.send(data);
    }

    sendMessage(message) {
        message = message.serialize();
        this.connection.send(message);
    }

    onExit(callback) {
        this.exit_callback = callback;
    }

    update() {
        var self = this;
        if (self.room) {
            var map = self.room.game.map;
            if (self.player.x > map.w || self.player.y > map.h) {
                self.player.is_alive = 0;
            }
            var yf = map.GetUnder(self.player.x, self.player.y);
            if (yf === 0)
                self.player.is_alive = 0;
            else
                self.player.y = yf;

            self.player.move();
            return yf;
        }
    }
    dead() {
        var self = this;
        self.player.is_alive = 0;
        self.room.game.checkDead();
    }
};