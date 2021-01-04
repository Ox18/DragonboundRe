var Types = require('./gametypes');
var _ = require('underscore');
var Message = require('./lib/message');
var Logger = require('./lib/logger');
var db = require('./data');

var timeserver = new Date();
var months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var datoservertime = "Mes: "+ months[timeserver.getMonth()]+ " - Día " + timeserver.getDate()+ " - Hora: "+ timeserver.getHours() + " - Minuto: "+ timeserver.getMinutes();

function Commatize(b) {
    return b.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}

function junteall(str) {
    str = str[1];
    str = str.split(" ");
    var complete = [];
    for(var i = 1; i < str.length; i++)
        complete.push(str[i]);
    /*console.log(complete.join(" "));*/
    return complete.join(" ");
}

function randomString(len, charSet) {
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

function AvatarsRandom() {
    var itm = [];
    var AvaId = [];
    for (var i = 0; i < db.length; i++) {
        var n = db[i];
        var _stats = n[6];
        if (_stats.min_rank == 26) {
            //Logger.log('=====||======Avatar ha enviar #0: '+JSON.stringify(n[0]));
            itm.push(n[0]);
        }
        
    }
    //Logger.log('=====||======Avatar ha enviar #1: '+JSON.stringify(itm));
    var rand = itm[(Math.random() * itm.length) | 0];
    //Logger.log('=====||======Avatar ha enviar: '+JSON.stringify(rand));
    return rand;
}

// commands
module.exports = class Commands {
    constructor(account) {
        this.account = account;
        this.room = account.room;
        this.gameserver = account.gameserver;
    }
    
    
    parse(msj) {
        var self = this;
        var data;
        var data2;
        try {
            data = this.cmdargs(msj[1]);
            switch (data[0]) {
                case '/my_time':
                    {
                        if (self.account.player.rank === 26) {
                            self.account.send([0,"Time Server: "+self.account.player.gameserverevent,"",6]);
                        }
                        break;
                    }
                case '/mys_rooms':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.gameserver.forEachRooms(function (rom) {
                                self.account.send([0,"Room: "+rom.id+" - Players: "+rom.player_count+" - Max Players: "+rom.max_players,"",6]);
                            });
                        }
                        break;
                    }
                case '/mys_menbers':
                    {
                        self.account.send([0,"Mys Members: "+self.account.player.guild_members.length,"",6]);
                        break;
                    }
                case '/map_room':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            if (self.account.room) {
                                if (parseInt(data[1]) === 12 || parseInt(data[1]) === 41 || parseInt(data[1]) === 49 || parseInt(data[1]) > 49) {
                                    self.account.send([0,"Oops there was an error, this map is not yet enabled for its use.","",6]);
                                    return null;
                                } else {
                                    self.account.room.map = parseInt(data[1]);
                                    self.account.room.RoomUpdate(self.account);
                                    self.account.room.forPlayers(function (account) {
                                        if (typeof (account) !== 'undefined') {
                                            account.send([0,"GM " + self.account.player.game_id + " has changed the room map.","",6]);
                                        }
                                    });
                                }
                            } else {
                                self.account.send([0,"Oops there was an error, to be able to use this command it must be found inside a room.","",6]);
                            }
                        }
                        break;
                    }
                case '/enter_room':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            var enter_the_room = parseInt(data[1]);
                            self.gameserver.getRoomById(enter_the_room, function (room) {
                                if (room) {
                                    if (room.status !== Types.ROOM_STATUS.PLAYING) {
                                        room.joinPlayer(self.account);
                                        self.account.location_type = Types.LOCATION.ROOM;
                                        self.account.player.position = 8;
                                    } else {
                                        self.account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_PLAYING, []));
                                    }
                                } else {}
                            });
                        }
                        break
                    }
                case '/mobile_room':
                    {
                        if (self.account.player.user_id === 1 || self.account.player.user_id === 10) {
                            var mobile_room = parseInt(data[1]);
                            self.account.room.forPlayers(function (account) {
                                if (typeof (account) !== 'undefined') {
                                    account.player.mobile = mobile_room;
                                    account.send([17,"¡Your mobile was changed!", "El GM "+self.account.player.game_id+" a cambiado tu mobil."]);
                                    account.gameserver.pushToRoom(account.room.id, new Message.roomPlayers(account.room), null);
                                }
                            });
                        }
                        break;
                    }
                case '/room_title':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            var room_id = parseInt(data[1]);
                            var room_title = data[2];
                            if (room_title.length > 30) {
                                self.account.send([0,"Maximum number of characters you can use is less than 30.","",6]);
                                return null;
                            }
                            self.gameserver.getRoomById(room_id, function (room) {
                                room.title = room_title;
                                room.gameserver.pushToRoom(room.id, new Message.roomState(room));
                                room.gameserver.pushToRoom(room.id, new Message.roomPlayers(room), null);
                                self.account.send([0,"The title of room "+room_id+" has been changed successfully.","",6]);
                                self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "The title of this room has been changed by GM "+self.account.player.game_id, Types.CHAT_TYPE.SYSTEM), room);
                                Logger.info('GM '+self.account.player.game_id+' successfully changed the title of room '+room_id+'.');
                            });
                        }
                        break;
                    }
                case '/items':
                    {
                        if (self.account.player.rank === 26) {
                            self.account.send([0,"Item1: "+self.account.player.item1+" - Item2: "+self.account.player.item2+" - Item3: "+self.account.player.item3,"",6]);
                        }
                        break;
                    }
                case '/resetallthegame':
                    {
                        if (self.account.player.rank === 26)
                            process.exit(1);
                        break;
                    }
                case '/prix_state':
                    {
                        if (self.account.player.rank === 26) {
                            let state = parseInt(data[1]);
                            if (state === 0) {
                                let Time_Event = Date.now() + (60 * 1000 * 120);
                                self.gameserver.db.updateStateByPrix(state, 1);
                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Individual Prix started at Server "+self.account.gameserver.id, Types.CHAT_TYPE.SYSTEM));
                                
                                self.gameserver.db.updateTimeByEventServer(Time_Event, 120, 'Prix', 1);
                                self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "[Inicio de Evento] El porcentaje de GP & Gold cambiaron a 200% por 2 Horas.", Types.CHAT_TYPE.SYSTEM));
                                /*==================================================*/
                                self.gameserver.forEachAccount(function (account) {
                                    if (account !== null) {
                                        account.player.gameserverevent = Time_Event;
                                        account.gameserver.evento200 = true;
                                        var data_game_server = self.gameserver.chathistory.slice(0);
                                        data_game_server.push(['', '', 9]);
                                        if (self.account.gameserver.evento200 === true)
                                            data_game_server.push([' El porcentaje de GP & Gold cambiaron a 200%', '[Inicio de Evento', 17]);
                                        account.send([Types.SERVER_OPCODE.room_state, [0, data_game_server], 1]);
                                    }
                                });
                            }
                            if (state === 1) {
                                self.gameserver.db.updateStateByPrix(state, 1);
                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Individual Prix Soon", Types.CHAT_TYPE.SYSTEM));
                            }
                            if (state === 2) {
                                self.gameserver.db.updateStateByPrix(state, 1);
                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Tournament Ended", Types.CHAT_TYPE.SYSTEM));
                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Prix Finished! Calculating final rankings and sending gifts...", Types.CHAT_TYPE.SYSTEM));
                            }
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    account.player.server_tournament_state = state;
                                }
                            });
                        }
                        break;
                    }
                case '/length_server':
                    {
                        if (self.account.player.rank === 26) {
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    self.account.send([0,"Length Server: "+account.length,"",6]);
                                }
                            });
                        }
                        break;
                    }
                case '/server':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    self.account.send([0,"UserID: "+account.user_id+" - User: "+account.player.game_id+" - Rank: (rank"+account.player.rank+") - Win: "+account.player.win+" - Loss: "+account.player.loss,"",6]);
                                }
                            });
                        }
                        break;
                    }
                case '/users_rooms':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    if (account.player.guild === data[1]) {
                                        self.account.send([0,"UserID: "+account.user_id+" - User: "+account.player.game_id+" - Rank: (rank"+account.player.rank+") - Room: "+account.player.room_number+" - IP: "+account.player.computer_ip,"",6]);
                                    }
                                }
                            });
                        }
                        break;
                    }
                case '/ips_users_rooms':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    if (account.player.computer_ip === data[1]) {
                                        self.account.send([0,"UserID: "+account.user_id+" - User: "+account.player.game_id+" - Rank: (rank"+account.player.rank+") - Room: "+account.player.room_number+" - IP: "+account.player.computer_ip,"",6]);
                                    }
                                }
                            });
                        }
                        break;
                    }
                case '/new_update':
                    {
                        if (self.account.player.rank === 26) {
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null && self.account.player.user_id !== account.player.user_id) {
                                    account.send([25,4]);
                                }
                            });
                        }
                        break;
                    }
                case '/gift_team':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31/*self.account.player.user_id === 1*/) {
                            self.account.room.forPlayers(function (account) {
                                var time_unix = Date.now();
                                let item_id = parseInt(AvatarsRandom());
                                let mensaje = "Gracias Por Participar / Thanks For Participating";
                                var position_room = account.player.team ? 'B' : 'A';
                                var name_ava_gift = self.account.gameserver.avatars.getAvatagift(item_id);
                                var check_ava = self.account.gameserver.avatars.getAvatarCheck(item_id);
                                if (check_ava === 31 && self.account.player.user_id !== 1) {
                                    self.account.send([0,"You are not allowed to send the avatar as a gift: "+name_ava_gift,"",6]);
                                    return null;
                                }
                                if ("1569024466132" >= time_unix && self.account.player.user_id === 7) {
                                    self.account.send([0,'You are prohibited from using this command for a temporary period','',6]);
                                    return null;
                                }
                                if (position_room === data[1]) {
                                    if (account.player.user_id !== self.account.player.user_id || typeof (mensaje) !== 'undefined' || mensaje !== '' || mensaje !== ' ') {
                                        //self.gameserver.pushBroadcastChat(new Message.chatResponse(self.account, self.account.player.game_id+" sent gift -> ["+name_ava_gift+"] inside room "+self.account.room.id+" to -> "+account.player.game_id, Types.CHAT_TYPE.GOLD));
                                        account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [self.account.player.game_id, item_id, 0, mensaje, "forever", name_ava_gift]));
                                        let datasendgift = {
                                            UserId: account.player.user_id,
                                            aId: item_id,
                                            type: 0,
                                            expire_time: 0,
                                            is_cash: 0,
                                            is_gift: 1,
                                            gift_sent_by: self.account.player.user_id,
                                            amount: 0,
                                            date_ava_time: Date.now()
                                        };
                                        self.gameserver.db.putUserAvatars(datasendgift);
                                        self.gameserver.db.putCommandsGMGift(data[0], item_id, 0, mensaje, self.account.player.game_id, account.player.game_id, account.player.user_id, datoservertime);
                                    }
                                }
                            });
                        }
                        break;
                    }
                case '/room':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            var enter_room = parseInt(data[1]);
                            self.gameserver.getRoomById(enter_room, function (room) {
                                room.forPlayers(function (account) {
                                    self.gameserver.db.getUserByGameId(account.player.game_id).then(function (rows) {
                                        var info_room_user = rows[0][0];
                                        Logger.info('Player: '+account.player.game_id+' Team: '+account.player.team+' Computer IP: '+info_room_user.IP);
                                        var position_room = account.player.team ? 'B' : 'A';
                                        self.account.send([0,"Name: "+account.player.game_id+" - ID: "+account.player.user_id+" - Team: "+position_room+" - Computer IP: "+info_room_user.IP,"",6]);
                                    });
                                });
                            });
                        }
                        break;
                    }
                case '/kick_a':
                    {
                        //Logger.info('Used Command Kick Team A - User: '+self.account.player.game_id);
                        if (self.account.room)
                        if (self.account.player.is_master === 1) {
                            self.account.room.forPlayers(function (account) {
                                var position_room = account.player.team ? 'B' : 'A';
                                if (position_room === 'A') {
                                    if (self.account.player.room_number == self.gameserver.getAccountById(account.player.user_id).player.room_number)
                                        return;
                                    if (self.account.player.rank === 26 ||self.account.player.rank === 27 ||self.account.player.rank === 31) {
                                        self.gameserver.db.putCommandsGMGift(data[0], 0, 0, "El GM "+self.account.player.game_id+" Kikeo al usuario: ["+account.player.game_id+" en la room: "+self.account.room.id+"]", self.account.player.game_id, account.player.game_id, account.player.user_id, datoservertime);
                                    }
                                    account.location_type = Types.LOCATION.CHANNEL;
                                    account.room.removePlayer(account);
                                    account.sendMessage(new Message.loginResponse(account));
                                    account.player.is_ready = 0;
                                    account.player.is_master = 0;
                                    account.gameserver.sendAccountsOnline();
                                    account.gameserver.sendRooms(account);
                                    account.gameserver.pushBroadcastChat(new Message.chatResponse(account, account.player.game_id+" was kicked out of the room.", Types.CHAT_TYPE.SYSTEM), self.account.room);
                                }
                            });
                        }
                        break;
                    }
                case '/kick_b':
                    {
                        //Logger.info('Used Command Kick Team B - User: '+self.account.player.game_id);
                        if (self.account.room)
                        if (self.account.player.is_master === 1) {
                            self.account.room.forPlayers(function (account) {
                                var position_room = account.player.team ? 'B' : 'A';
                                if (position_room === 'B') {
                                    if (self.account.player.room_number == self.gameserver.getAccountById(account.player.user_id).player.room_number)
                                        return;
                                    if (self.account.player.rank === 26 ||self.account.player.rank === 27 ||self.account.player.rank === 31) {
                                        self.gameserver.db.putCommandsGMGift(data[0], 0, 0, "El GM "+self.account.player.game_id+" Kikeo al usuario: ["+account.player.game_id+" en la room: "+self.account.room.id+"]", self.account.player.game_id, account.player.game_id, account.player.user_id, datoservertime);
                                    }
                                    account.location_type = Types.LOCATION.CHANNEL;
                                    account.room.removePlayer(account);
                                    account.sendMessage(new Message.loginResponse(account));
                                    account.player.is_ready = 0;
                                    account.player.is_master = 0;
                                    account.gameserver.sendAccountsOnline();
                                    account.gameserver.sendRooms(account);
                                    account.gameserver.pushBroadcastChat(new Message.chatResponse(account, account.player.game_id+" was kicked out of the room.", Types.CHAT_TYPE.SYSTEM), self.account.room);
                                }
                            });
                        }
                        break;
                    }
                case '/kick_all':
                    {
                        if (self.account.player.is_master === 1) {
                            self.account.room.forPlayers(function (account) {
                                if (self.account.room.game_mode === Types.GAME_MODE.BOSS) {
                                    var position_room = account.player.team ? 'B' : 'A';
                                    if (position_room === 'A') {
                                        if (self.account.player.room_number == self.gameserver.getAccountById(account.player.user_id).player.room_number)
                                            return;
                                        if (self.account.player.rank === 26 ||self.account.player.rank === 27 ||self.account.player.rank === 31) {
                                            self.gameserver.db.putCommandsGMGift(data[0], 0, 0, "El GM "+self.account.player.game_id+" Kikeo al usuario: ["+account.player.game_id+" en la room: "+self.account.room.id+"]", self.account.player.game_id, account.player.game_id, account.player.user_id, datoservertime);
                                        }
                                        account.location_type = Types.LOCATION.CHANNEL;
                                        account.room.removePlayer(account);
                                        account.sendMessage(new Message.loginResponse(account));
                                        account.player.is_ready = 0;
                                        account.player.is_master = 0;
                                        account.gameserver.sendAccountsOnline();
                                        account.gameserver.sendRooms(account);
                                        account.gameserver.pushBroadcastChat(new Message.chatResponse(account, account.player.game_id+" was kicked out of the room.", Types.CHAT_TYPE.SYSTEM), self.account.room);
                                    }
                                }
                                if (self.account.player.room_number == self.gameserver.getAccountById(account.player.user_id).player.room_number)
                                    return;
                                account.location_type = Types.LOCATION.CHANNEL;
                                account.room.removePlayer(account);
                                account.sendMessage(new Message.loginResponse(account));
                                account.player.is_ready = 0;
                                account.player.is_master = 0;
                                account.gameserver.sendAccountsOnline();
                                account.gameserver.sendRooms(account);
                                account.gameserver.pushBroadcastChat(new Message.chatResponse(account, account.player.game_id+" was kicked out of the room.", Types.CHAT_TYPE.SYSTEM), self.account.room);
                            });
                        }
                        break;
                    }
                case '/mobil':
                    {/*self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31*/
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            if (self.account.room) {
                             
                                var _mob = parseInt(data[1]);
                                if (_mob === 30)
                                    _mob = 1;
                                if (self.account.player.is_master === 1 && self.account.room.game_mode === Types.GAME_MODE.SAME) {
                                    if (typeof (Types.MOBILES[_mob]) != 'undefined' && Types.MOBILES[_mob] !== null) {
                                        self.account.room.forPlayers(function (account) {
                                            if (typeof (account) !== 'undefined') {
                                                account.player.mobile = _mob;
                                                //Logger.log('GM '+self.account.player.game_id+' Ha usado el mobil '+_mob+' en la sala '+self.account.room.id);
                                                //self.gameserver.pushBroadcastChat(new Message.chatResponse(self.account, "The GM "+self.account.player.game_id+" has changed mobile in the room: "+self.account.room.id, Types.CHAT_TYPE.SYSTEM));
                                                //self.gameserver.chathistory.push(["The GM "+self.account.player.game_id+" has changed mobile in the room: "+self.account.room.id,'',Types.CHAT_TYPE.SYSTEM,'']);
                                                account.gameserver.pushToRoom(account.room.id, new Message.roomPlayers(account.room), null);
                                            }
                                        });
                                    }
                                } else {
                                    if (_mob === parseInt(10) && self.account.player.rank !== 31 && self.account.player.rank !== 26) {
                                        //self.sendMessage(new Message.alertResponse("Non-Selectable Mobile", "You can not select this mobile."));
                                        self.account.player.mobile = Types.MOBILE.ARMOR;
                                        self.gameserver.pushToRoom(self.account.room.id, new Message.changedMobile(self.account));
                                        return null;
                                    }
                                    if (typeof (Types.MOBILES[_mob]) != 'undefined' && Types.MOBILES[_mob] !== null) {
                                        if (self.account.room.game === null) {
                                            self.account.player.mobile = _mob;
                                            //Logger.log('GM '+self.account.player.game_id+' Ha usado el mobil '+_mob+' en la sala '+self.account.room.id);
                                            //self.gameserver.pushBroadcastChat(new Message.chatResponse(self.account, "The GM "+self.account.player.game_id+" has changed mobile in the room: "+self.account.room.id, Types.CHAT_TYPE.SYSTEM));
                                            //self.gameserver.chathistory.push(["The GM "+self.account.player.game_id+" has changed mobile in the room: "+self.account.room.id,'',Types.CHAT_TYPE.SYSTEM,'']);
                                            self.gameserver.pushToRoom(self.account.room.id, new Message.changedMobile(self.account));
                                        } else {
                                            self.account.send([0,'Oops Hubo Un Error En El Comando Que Acabas De Escribir.','',6]);
                                        }
                                    }
                                }
                            } else {
                                self.account.send([0,"Before using this command you must first be inside a room.","",6]);
                            }
                        }
                        break;
                    }
                case '/gp':
                    {
                        let self2 = self.gameserver.getAccountById(parseInt(data[1]));
                        let descuento = parseInt(data[2]);
                        self.gameserver.db.getUserByGameId(self2.player.game_id).then(function (rows) {
                            var gp_user = rows[0][0];
                            if (self.account.player.rank === 26) {
                                if (self.account.player.rank === 26 && self2.player.rank === 31 || self.account.player.rank === 27 && self2.player.rank === 31) {
                                    self.account.send([0,'Tu Rango No Tiene Permitido Descontar GPs A Los De Nivel Superior.','',6]);
                                    return null;
                                }
                                var porcentaje = Math.round(gp_user.gp / descuento);
                                self2.player.gp = Math.round(gp_user.gp - porcentaje);
                                self2.sendMessage(new Message.loginResponse(self2));
                                self.account.send([0,'User: '+self2.player.game_id+' -'+descuento+'%GP - GPs Descontados: '+porcentaje,'',6]);
                                self2.send([17,"-"+descuento+"%GP","El GM "+self.account.player.game_id+" Te A Descontado <font color='cyan'>"+porcentaje+" GPs</font> Por Algun Motivo Prohivido En Este Juego."]);
                                self.gameserver.db.updateGPsByIdAcc(porcentaje, self2.player.user_id);
                            }
                        });
                        break;
                    }
                case '/aviso':
                    {
                        if (/*self.account.player.rank === 26 || self.account.player.rank === 27 || */self.account.player.user_id === 10) {
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    self.gameserver.db.putCommandsGMGift(data[0], 0, 0, junteall(msj), self.account.player.game_id, account.player.game_id, account.player.user_id, datoservertime);
                                    account.send([17,"Aviso Del GM "+self.account.player.game_id,""+junteall(msj)]);
                                }
                            });
                        }
                        break;
                    }
                case '/ad':
                    {
                        if (self.account.player.user_id === 1 || self.account.player.user_id === 2 || self.account.player.user_id === 10 || self.account.player.user_id === 4 || self.account.player.user_id === 7) {
                            let self2 = self.gameserver.getAccountById(parseInt(data[1]));
                            self2.send([17,"Aviso Del GM "+self.account.player.game_id,""+data[2]]);
                            Logger.info("El GM "+self.account.player.game_id+" - Le envio al usuario: "+self2.player.game_id+" [UserID: "+self2.player.user_id+"] - Un Aviso: "+data[2]);
                        }
                        break;
                    }
                case '/cash_users':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    account.send([17,"¡PROMOCIÓN!",'Promoción de cash por tiempo limitado, aprovecha esta gran oferta y recibe 2 RANGOS ESPECIALES + 170,000 de cash. <a style="color:#fbf9f9;text-shadow: 0px 0px 2px #ff980099, 0px 0px 3px #ff830057, 0px 0px 7px #ff98005e, 0px 0px 5px #ff9b0066, 0px 0px 8px #ff980059, 0px 0px 8px #ff8f0070;" href="/cash" target="_blank">¡RECARGA YA! - ¡Click Aqui!</a>']);
                                }
                            });
                        }
                        break;
                    }
                case '/ban_ip':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            var ComputerIP = data[1];
                            self.gameserver.db.putComputerIPBanned(ComputerIP, 'Ninguna Específicamente', self.account.player.game_id, self.account.player.user_id);
                            self.account.send([0,"You Prohibited The Income Through Computer IP: "+ComputerIP,"",6]);
                        }
                        break;
                    }
                case '/sge':
                    {
                        if (self.account.player.rank === 26) {
                            self.gameserver.evento200 = !0;
                            Logger.info("evento alterado a :"+(self.gameserver.evento200 ? "true" : "false"));
                            self.gameserver.forEachAccount(function (accountp) {
                                if (accountp.room) {
                                    accountp.room.removePlayer(accountp);
                                }
                                if (accountp.exit_callback) {
                                    accountp.exit_callback();
                                }
                            });
                        }
                        break;
                    }
                case '/ege':
                    {
                        if (self.account.player.rank === 26) {
                            self.gameserver.evento200 = !1;
                            Logger.info("evento alterado a :"+(self.gameserver.evento200 ? "true" : "false"));
                            self.gameserver.forEachAccount(function (accountp) {
                                if (accountp.room) {
                                    accountp.room.removePlayer(accountp);
                                }
                                if (accountp.exit_callback) {
                                    accountp.exit_callback();
                                }
                            });
                        }
                        break;
                    }
                case '/event':
                    {//Listo terminado
                        if (self.account.player.gm === 1 || self.account.player.user_id === 10) {
                            let EvenTime = parseInt(data[1]);
                            if (self.gameserver.evento500 === true) {
                                self.account.send([0,'During the 500% CASH & GOLD event you can not add another type of event :(','',6]);
                                return null;
                            }
                            let Time_Event = Date.now() + (60 * 1000 * EvenTime);
                            self.gameserver.db.updateTimeByEventServer(Time_Event, EvenTime, 'Evento', 1);
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "[Inicio de Evento] El porcentaje de GP & Gold cambiaron a 200% por "+EvenTime+" minutos.", Types.CHAT_TYPE.SYSTEM));
                            self.gameserver.db.putCommandsGMGift(data[0], 0, 0, "El GM: "+self.account.player.game_id+" - puso "+EvenTime+" minutos de evento.", self.account.player.game_id, 0, 0, datoservertime);
                            if (self.gameserver.name === "Prix") {
                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Individual Prix started at Server "+self.account.gameserver.id, Types.CHAT_TYPE.SYSTEM));
                            }
                            /*==================================================*/
                            
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    account.player.gameserverevent = Time_Event;
                                    account.gameserver.evento200 = true;
                                    var data_game_server = self.gameserver.chathistory.slice(0);
                                    
                                    data_game_server.push(['', '', 9]);
                                    if (self.account.gameserver.evento200 === true)
                                        data_game_server.push([' El porcentaje de GP & Gold cambiaron a 200%', '[Inicio de Evento', 17]);
                                    account.send([Types.SERVER_OPCODE.room_state, [0, data_game_server], 1]);
                                }
                            });
                        }
                        break;
                    }
                case '/muted':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            let self2 = self.gameserver.getAccountById(parseInt(data[1]));
                            let DateMuted = parseInt(data[2]);
                            let razon = data[3];
                            let FinishDateMuted = Date.now() + (60 * 1000 * DateMuted);
                            if (DateMuted > 60) {
                                self.account.send([0,'Maximo 60 Minutos.','',6]);
                                return null;
                            } else {
                                if (self2.player.rank === 31 && self.account.player.rank < 31) {
                                    self.account.send([0,'No tienes Permitido Mutear A Rangos Superiores.','',6]);
                                    return null;
                                } else {
                                    self.gameserver.db.updateMutedByIdAcc(FinishDateMuted, self2.player.user_id);
                                    self.account.send([0,'User: '+self2.player.game_id+' Fue Muteado por '+DateMuted+' Minutos.','',6]);
                                    self2.send([0,'Usted a sido silenciado por un GM '+DateMuted+' Minutos, Razón: '+razon,'',6]);
                                    self2.player.is_muted = FinishDateMuted;
                                    self2.sendMessage(new Message.loginResponse(self2));
                                }
                            }
                        }
                        break;
                    }
                case '/dual':
                    {
                        if (self.account.player.rank === 26) {
                            self.account.player.DUAL = 1;
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, self.account.player.game_id+ " Used Item: Dual", Types.CHAT_TYPE.SYSTEM), self.account.room);
                        }
                        break;
                    }
                case '/teleport':
                    {
                        if (self.account.player.rank === 26) {
                            self.account.player.TELEPORT = 1;
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, self.account.player.game_id+ " Used Item: Teleport", Types.CHAT_TYPE.SYSTEM), self.account.room);
                        }
                        break;
                    }
                case '/rank':
                    {
                        if (self.account.player.rank === 26) {
                            self.gameserver.db.putCommandsGMGift(data[0], 0, 0, "El gM: "+self.account.player.game_id+" - uso el rank: "+data[1], self.account.player.game_id, 0, 0, datoservertime);
                            self.account.player.rank = data[1];
                            self.account.sendMessage(new Message.loginResponse(self.account));
                            self.gameserver.sendAccountsOnline();
                        }
                        break;
                    }
                case '/cash':
                    {
                        if (/*self.account.player.rank === 26 || self.account.player.rank === 31*/self.account.player.user_id === parseInt(1)) {
                            let init = data[0];
                            Logger.info("GM "+self.account.player.game_id+" init: "+init);
                            Logger.info("init: "+init);
                            let user_id = parseInt(data[1]);
                            Logger.info("user_id: "+user_id);
                            let cashspecial = data[2];
                            Logger.info("Cash: "+cashspecial);
                            let nota = data[3];
                            Logger.info("mensaje: "+nota);
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, self.account.player.game_id+" sent cash [UserID: "+user_id+"] by GM -> "+self.account.player.game_id, Types.CHAT_TYPE.GOLD));
                            if (typeof (nota) === 'undefined' || nota === '' || nota === ' ') {
                                self.account.send([0,'Oops Hubo Un Error En El Comando Que Acabas De Escribir.','',6]);
                                return null;
                            }
                            if (self.account.player.user_id === user_id) {
                                Logger.info(self.account.player.game_id+", Ha Utilizado El Comando Para El Mismo.");
                                self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "Esta Prohibido Que Te Envies Avatars Tu Mismo."));
                                return null;
                            }
                            if (cashspecial >= 15001) {
                                Logger.info(self.account.player.game_id+", Ha Utilizado El Comando Para El Mismo.");
                                self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "Por Problemas Solo Puedes Enviar Como Maximo 15,000 De Cash ;)."));
                                return null;
                            }
                            self.gameserver.db.getUserByIdAcc(user_id).then(function(acc) {
                                var CashGift = acc[0][0];
                                self.account.send([17,"Cash Enviado!","Monto: "+cashspecial+"<br><br>Nota: "+nota]);
                                Promise.all([
                                    self.gameserver.db.sendCash(cashspecial, user_id)
                                ]).then((data) => {
                                    self.account.sendMessage(new Message.chatResponse(self, "Cash: "+cashspecial+" - User: "+CashGift.game_id, Types.CHAT_TYPE.SYSTEM));
                                });
                                self.account.sendMessage(new Message.loginResponse(self.account));
                                let self2 = self.gameserver.getAccountById(parseInt(user_id));
                                try {
                                    self2.send([17,"Received Cash! :)","You just received <font color='yellow'>"+cashspecial+"</font> Cash from<br><font color='yellow'>"+self.account.player.game_id+"</font>.<br><br>Message <font color='cyan'> "+nota+"</font>.<br><br>Thank You!"]);
                                    self.gameserver.db.putCommandsGMGift(init, 0, cashspecial, nota, self.account.player.game_id, self2.player.game_id, self2.player.user_id, datoservertime);
                                } catch(e){Logger.error(e);}
                            });
                        }
                        break;
                    }
                case '/ban':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 31) {
                            let init = data[0];Logger.info("init: "+init);
                            let user_id = parseInt(data[1]);Logger.info("user_id: "+user_id);
                            let razon = data[2]+" "+" ";Logger.info("razon: "+razon);
                            let tiempo = data[3];Logger.info("tiempo: "+tiempo);
                            let self2 = self.gameserver.getAccountById(parseInt(user_id));
                            if (self.account.player.rank === 26 && self2.player.rank === 26 || self.account.player.rank === 26 && self2.player.rank === 27 || self.account.player.rank === 26 && self2.player.rank === 31) {
                                self.account.send([17,"Error","No Tienes Permitido Banear Un GM"]);
                                return null;
                            } else {
                                if (tiempo === '-e') {
                                    self.account.send([17,"Baneaste a",""+self2.player.game_id+""]);
                                    self2.send([17,"Estás Baneado","Por El GM: "+self.account.player.game_id+"<br><br>Motivo: "+razon+""]);
                                    self.gameserver.db.putBannedByUserId(user_id, razon, 'Forever', self.account.player.game_id, self.account.player.user_id);
                                    self.gameserver.db.updateBannedStatus(1, user_id);
                                    self2.connection.close();
                                } else if (tiempo === '-d') {
                                    var days = parseInt(data[4]);Logger.info("Dias: "+days);
                                    if (days >= 91) {
                                        self.account.send([0,'90 Días de baneo como máximo.','',6]);
                                        return null;
                                    }
                                    var data_days = Date.now() + (days * 24 * 60 * 60 * 1000);
                                    self.account.send([17,"Baneaste a",""+self2.player.game_id+""]);
                                    self2.send([17,"Estás Baneado","Por El GM: "+self.account.player.game_id+"<br><br>Motivo: "+razon+""]);
                                    self.gameserver.db.putBannedByUserId(user_id, razon, data_days, self.account.player.game_id, self.account.player.user_id);
                                    self.gameserver.db.updateBannedStatus(1, user_id);
                                    self2.connection.close();
                                } else {
                                    self.account.send([0,'Oops Hubo Un Error En El Comando Que Acabas De Escribir.','',6]);
                                    return null;
                                }
                            }
                        }
                        break;
                    }
                case '/pin_code':
                    {//randomString
                        if (self.account.player.rank === 26) {
                            var name = data[1];
                            var monto = data[2];
                            var cash = "";
                            var letras = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                            cash = monto.charAt(0)+monto.charAt(1);
                            var PinCode = randomString(2, self.account.player.game_id)+cash+"-"+randomString(4, letras)+"-"+randomString(4, letras)+"-"+randomString(4, letras);
                            if (PinCode.length === 19) {
                                if (monto <= 9999 || monto >= 100000) {
                                    self.account.send([0,"Monto Minimo: 10,000 & Maximo: 99,999","",6]);
                                    return null;
                                } else {
                                    self.gameserver.db.getPinCodeByPin(PinCode).then(function (rowss) {
                                        self.account.send([0,'Oops the Pin Code generated already exists, please try to generate it again.','',6]);
                                        return null;
                                    }).catch(function (err2) {
                                        self.gameserver.db.putPinCode(PinCode, name, self.account.player.game_id, self.account.player.user_id, monto, 'ON').then(function (data32) {
                                            self.account.send([0,"Pin Code: "+PinCode,"",6]);
                                        });
                                    });
                                }
                            } else {
                                self.account.send([0,'Oops Hubo Un Error En El Comando Que Acabas De Escribir.','',6]);
                            }
                        }
                        break;
                    }
                case '/gift_admins':
                    {
                        if (self.account.player.rank === 26) {
                            var itm = [];
                            let user_id = parseInt(data[1]);
                            let self2 = self.gameserver.getAccountById(parseInt(user_id));
                            for (var i = 0; i < db.length; i++) {
                                var n = db[i];
                                if (n[6].min_rank === 26) {
                                    var item_id = n[0];
                                    var name_ava_gift = self.account.gameserver.avatars.getAvatagift(item_id);
                                    //var gift_data = acc[0][0];
                                        //self.account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GIFT_SENT, [item_id]));
                                        let datasendgift = {
                                            UserId: self2.player.user_id,
                                            aId: item_id,
                                            type: 0,
                                            expire_time: 0,
                                            is_cash: 0,
                                            is_gift: 1,
                                            gift_sent_by: self.account.player.user_id,
                                            amount: 0,
                                            date_ava_time: Date.now()
                                        };
                                        Promise.all([
                                            self.gameserver.db.putUserAvatars(datasendgift)
                                        ]).then((data) => {
                                            //self.gameserver.pushBroadcastChat(new Message.chatResponse(self, self.account.player.game_id+" sent gift ["+name_ava_gift+"] to -> "+self2.player.game_id, Types.CHAT_TYPE.GOLD));
                                        });
                                        self.account.sendMessage(new Message.loginResponse(self.account));
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [self.account.player.game_id, item_id, 0, ":)", "forever", name_ava_gift]));
                                        } catch(e){Logger.error(e);}
                               
                                }
                            }
                        }
                        break;
                    }
                case '/gift':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31/*self.account.player.user_id === 1*/) {
                            var time_unix = Date.now();
                            let init = data[0];
                            Logger.info("GM "+self.account.player.game_id+" init: "+init);
                            let user_id = parseInt(data[1]);
                            Logger.info("user_id: "+user_id);
                            let item_id = AvatarsRandom();
                            //let item_id = parseInt(data[2]);
                            Logger.info("item_id: "+item_id);
                            //let mensaje = "Gracias Por Participar / Thanks For Participating";
                            Logger.info("mensaje: "+mensaje);
                            var name_ava_gift = self.account.gameserver.avatars.getAvatagift(item_id);
                            var check_ava = self.account.gameserver.avatars.getAvatarCheck(item_id);
                            Logger.info('Info avatar Rank: '+check_ava);
                            let self2 = self.gameserver.getAccountById(parseInt(user_id));
                            if (parseInt(check_ava) === 31/* && self.account.player.user_id !== 1*/) {
                                self.account.send([0,"You are not allowed to send the avatar as a gift: "+name_ava_gift,"",6]);
                                return null;
                            }
                            if (typeof (mensaje) === 'undefined' || mensaje === '' || mensaje === ' ') {
                                self.account.send([0,'Oops Hubo Un Error En El Comando Que Acabas De Escribir.','',6]);
                                return null;
                            }
                            if (self.account.player.user_id === user_id) {
                                Logger.info(self.account.player.game_id+", Ha Utilizado El Comando Para El Mismo.");
                                self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "Esta Prohibido Que Te Envies Avatars Tu Mismo."));
                                return null;
                            }
                            if ("1569024466132" >= time_unix && self.account.player.user_id === 7) {
                                self.account.send([0,'You are prohibited from using this command for a temporary period','',6]);
                                return null;
                            }
                            if (typeof (self2) === 'undefined') {
                                self.account.send([0,'Oops the user is not connected at this time.','',6]);
                            } else {
                                self.gameserver.db.getUserByIdAcc(user_id).then(function(acc) {
                                    var gift_data = acc[0][0];
                                    self.account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GIFT_SENT, [item_id]));
                                    let datasendgift = {
                                        UserId: self2.player.user_id,
                                        aId: item_id,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                    Promise.all([
                                        self.gameserver.db.putUserAvatars(datasendgift)
                                    ],[
                                        self.gameserver.db.putCommandsGMGift(init, item_id, 0, mensaje, self.account.player.game_id, self2.player.game_id, self2.player.user_id, datoservertime)
                                    ]).then((data) => {
                                        self.account.sendMessage(new Message.chatResponse(self, "Avatar: "+name_ava_gift+", Fue Entregado Al Usuario: ID: "+user_id+" - Name: "+gift_data.game_id, Types.CHAT_TYPE.SYSTEM));
                                      //  self.gameserver.pushBroadcastChat(new Message.chatResponse(self, self.account.player.game_id+" sent gift ["+name_ava_gift+"] to -> "+self2.player.game_id, Types.CHAT_TYPE.GOLD));
                                    });
                                    self.account.sendMessage(new Message.loginResponse(self.account));
                                    try {
                                        self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [self.account.player.game_id, item_id, 0, mensaje, "forever", name_ava_gift]));
                                    } catch(e){Logger.error(e);}
                                });
                            }
                            
                        }
                        break;
                    }
                    
                case '/All_Winners':
                    {
                        if (self.account.player.rank === 26) {
                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Tournament Ended", Types.CHAT_TYPE.SYSTEM));
                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Prix Finished! Calculating final rankings and sending gifts...", Types.CHAT_TYPE.SYSTEM));
                            self.gameserver.db.getUsersPrixByAllWinners(parseInt(0), parseInt(1)).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(3092);
                                    var AvatarName1 = "Ash (RARE) [Head]";
                                    
                                    var PrixAvatar2 = parseInt(3093);
                                    var AvatarName2 = "Ash (RARE) [Body]";
                                    
                                    var PrixAvatar3 = parseInt(8224);
                                    var AvatarName3 = "Trophy Gold (SRARE)";
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName3+"", Types.CHAT_TYPE.GIFT));
                                    
                                    let datasendgift_Number1 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar1,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    let datasendgift_Number2 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                    
                                    let datasendgift_Number3 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar3,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    Promise.all([
                                        self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                    ], [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                    ], [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number3)
                                    ]).then((data) => {
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+info_user[xm].game_id);
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+info_user[xm].game_id);
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar3+" A: "+info_user[xm].game_id);
                                    });
                                            
                                    //self.account.sendMessage(new Message.loginResponse(self.account));
                                    let self2 = self.gameserver.getAccountById(parseInt(info_user[xm].IdAcc));
                                    if (typeof (self2) === 'undefined') {
                                        self.account.send([0,'Oops the user '+info_user[xm].game_id+' is not connected at this time.','',6]);
                                    } else {
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName1]));
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName2]));
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar3, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName3]));
                                        } catch(e){Logger.error(e);}
                                    }
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getUsersPrixByAllWinners(parseInt(1), parseInt(1)).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    /*var PrixAvatar1 = parseInt(300);
                                    var AvatarName1 = "Lobo (RARE) [Head]";
                                    
                                    var PrixAvatar2 = parseInt(301);
                                    var AvatarName2 = "Lobo (RARE) [Body]";*/
                                    
                                    var PrixAvatar3 = parseInt(8225);
                                    var AvatarName3 = "Trophy Silver (SRARE)";
                                    
                                    /*self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));*/
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName3+"", Types.CHAT_TYPE.GIFT));
                                    
                                    /*let datasendgift_Number1 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar1,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    let datasendgift_Number2 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };*/
                                    
                                    let datasendgift_Number3 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar3,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    Promise.all(/*[
                                        self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                    ], [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                    ], */[
                                        self.gameserver.db.putUserAvatars(datasendgift_Number3)
                                    ]).then((data) => {
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+info_user[xm].game_id);
                                        /*Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+info_user[xm].game_id);
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar3+" A: "+info_user[xm].game_id);*/
                                    });
                                            
                                    //self.account.sendMessage(new Message.loginResponse(self.account));
                                    let self2 = self.gameserver.getAccountById(parseInt(info_user[xm].IdAcc));
                                    if (typeof (self2) === 'undefined') {
                                        self.account.send([0,'Oops the user '+info_user[xm].game_id+' is not connected at this time.','',6]);
                                    } else {
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName1]));
                                            /*self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName2]));
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar3, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName3]));*/
                                        } catch(e){Logger.error(e);}
                                    }
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getUsersPrixByAllWinners(parseInt(1), parseInt(3)).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(300);
                                    var AvatarName1 = "Lobo (RARE) [Head]";
                                    
                                    var PrixAvatar2 = parseInt(301);
                                    var AvatarName2 = "Lobo (RARE) [Body]";
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    
                                    let datasendgift_Number1 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar1,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    let datasendgift_Number2 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    Promise.all([
                                        self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                    ], [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                    ]).then((data) => {
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+info_user[xm].game_id);
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+info_user[xm].game_id);
                                    });
                                            
                                    //self.account.sendMessage(new Message.loginResponse(self.account));
                                    let self2 = self.gameserver.getAccountById(parseInt(info_user[xm].IdAcc));
                                    if (typeof (self2) === 'undefined') {
                                        self.account.send([0,'Oops the user '+info_user[xm].game_id+' is not connected at this time.','',6]);
                                    } else {
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName1]));
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName2]));
                                        } catch(e){Logger.error(e);}
                                    }
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getUsersPrixByAllWinners(parseInt(2), parseInt(1)).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(8226);
                                    var AvatarName1 = "Trophy Bronze (SRARE)";
                                    
                                    /*var PrixAvatar2 = parseInt(8299);
                                    var AvatarName2 = "MiniPrix Trico 2019 [Background]";*/
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    /*self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));*/
                                    
                                    let datasendgift_Number1 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar1,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    /*let datasendgift_Number2 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };*/
                                            
                                    Promise.all([
                                        self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                    ]/*, [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                    ]*/).then((data) => {
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+info_user[xm].game_id);
                                        /*Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+info_user[xm].game_id);*/
                                    });
                                            
                                    self.account.sendMessage(new Message.loginResponse(self.account));
                                    let self2 = self.gameserver.getAccountById(parseInt(info_user[xm].IdAcc));
                                    if (typeof (self2) === 'undefined') {
                                        self.account.send([0,'Oops the user '+info_user[xm].game_id+' is not connected at this time.','',6]);
                                    } else {
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName1]));
                                            /*self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName2]));*/
                                        } catch(e){Logger.error(e);}
                                    }
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getUsersPrixByAllWinners(parseInt(4), parseInt(3)).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(3691);
                                    var AvatarName1 = "Blue Wings (SRARE)";
                                    
                                    /*var PrixAvatar2 = parseInt(3093);
                                    var AvatarName2 = "Ash (RARE) [Body]";
                                    
                                    var PrixAvatar3 = parseInt(8224);
                                    var AvatarName3 = "Trophy Gold (SRARE)";*/
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    /*self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName3+"", Types.CHAT_TYPE.GIFT));*/
                                    
                                    let datasendgift_Number1 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar1,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    /*let datasendgift_Number2 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                    
                                    let datasendgift_Number3 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar3,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };*/
                                            
                                    Promise.all([
                                        self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                    ]/*, [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                    ], [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number3)
                                    ]*/).then((data) => {
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+info_user[xm].game_id);
                                        /*Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+info_user[xm].game_id);
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar3+" A: "+info_user[xm].game_id);*/
                                    });
                                            
                                    //self.account.sendMessage(new Message.loginResponse(self.account));
                                    let self2 = self.gameserver.getAccountById(parseInt(info_user[xm].IdAcc));
                                    if (typeof (self2) === 'undefined') {
                                        self.account.send([0,'Oops the user '+info_user[xm].game_id+' is not connected at this time.','',6]);
                                    } else {
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName1]));
                                            /*self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName2]));
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar3, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName3]));*/
                                        } catch(e){Logger.error(e);}
                                    }
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getUsersPrixByAllWinners(parseInt(7), parseInt(8)).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(2768);
                                    var AvatarName1 = "Pikachu (RARE)";
                                    
                                    /*var PrixAvatar2 = parseInt(301);
                                    var AvatarName2 = "Lobo (RARE) [Body]";
                                    
                                    var PrixAvatar3 = parseInt(8225);
                                    var AvatarName3 = "Trophy Silver (SRARE)";*/
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    /*self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName3+"", Types.CHAT_TYPE.GIFT));*/
                                    
                                    let datasendgift_Number1 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar1,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    /*let datasendgift_Number2 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                    
                                    let datasendgift_Number3 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar3,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };*/
                                            
                                    Promise.all([
                                        self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                    ]/*, [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                    ], [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number3)
                                    ]*/).then((data) => {
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+info_user[xm].game_id);
                                        /*Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+info_user[xm].game_id);
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar3+" A: "+info_user[xm].game_id);*/
                                    });
                                            
                                    //self.account.sendMessage(new Message.loginResponse(self.account));
                                    let self2 = self.gameserver.getAccountById(parseInt(info_user[xm].IdAcc));
                                    if (typeof (self2) === 'undefined') {
                                        self.account.send([0,'Oops the user '+info_user[xm].game_id+' is not connected at this time.','',6]);
                                    } else {
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName1]));
                                            /*self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName2]));
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar3, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName3]));*/
                                        } catch(e){Logger.error(e);}
                                    }
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getUsersPrixByAllWinners(parseInt(15), parseInt(5)).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(565);
                                    var AvatarName1 = "Charmander";
                                    
                                    /*var PrixAvatar2 = parseInt(3093);
                                    var AvatarName2 = "Ash (RARE) [Body]";*/
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    /*self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));*/
                                    
                                    let datasendgift_Number1 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar1,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    /*let datasendgift_Number2 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };*/
                                            
                                    Promise.all([
                                        self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                    ]/*, [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                    ]*/).then((data) => {
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+info_user[xm].game_id);
                                        /*Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+info_user[xm].game_id);*/
                                    });
                                            
                                    //self.account.sendMessage(new Message.loginResponse(self.account));
                                    let self2 = self.gameserver.getAccountById(parseInt(info_user[xm].IdAcc));
                                    if (typeof (self2) === 'undefined') {
                                        self.account.send([0,'Oops the user '+info_user[xm].game_id+' is not connected at this time.','',6]);
                                    } else {
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName1]));
                                            /*self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName2]));*/
                                        } catch(e){Logger.error(e);}
                                    }
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getUsersPrixByAllWinners(parseInt(0), parseInt(40)).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(8245);
                                    var AvatarName1 = "Turtle (RARE)";
                                    
                                    var PrixAvatar2 = parseInt(8301);
                                    var AvatarName2 = "MiniPrix 2019 [Background]";
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    
                                    let datasendgift_Number1 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar1,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    let datasendgift_Number2 = {
                                        UserId: info_user[xm].IdAcc,
                                        aId: PrixAvatar2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                            
                                    Promise.all([
                                        self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                    ], [
                                        self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                    ]).then((data) => {
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+info_user[xm].game_id);
                                        Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+info_user[xm].game_id);
                                    });
                                            
                                    //self.account.sendMessage(new Message.loginResponse(self.account));
                                    let self2 = self.gameserver.getAccountById(parseInt(info_user[xm].IdAcc));
                                    if (typeof (self2) === 'undefined') {
                                        self.account.send([0,'Oops the user '+info_user[xm].game_id+' is not connected at this time.','',6]);
                                    } else {
                                        try {
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName1]));
                                            self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix #"+parseInt(xm), "forever", AvatarName2]));
                                        } catch(e){Logger.error(e);}
                                    }
                                }
                            });
                            /*================================================================================================================*/
                        }
                        break;
                    }
                case '/All_Winners2':
                    {
                        if (self.account.player.rank === 26) {
                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Tournament Ended", Types.CHAT_TYPE.SYSTEM));
                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "Prix Finished! Calculating final rankings and sending gifts...", Types.CHAT_TYPE.SYSTEM));
                            self.gameserver.db.getGiftsTournamentByPositions(parseInt(1)).then(function (rowss) {
                                var gifts_tournament = rowss[0];
                                for (var xmn in gifts_tournament) {
                                    Logger.info("AvaIdTournament: "+gifts_tournament[xmn].gift_aId_tournament);
                                    var PrixAvatar1 = parseInt(gifts_tournament[xmn].gift_aId_tournament);
                                    var AvatarName1 = "xD";
                                    self.gameserver.db.getUsersPrixByAllWinners(parseInt(gifts_tournament[xmn].gifts_positions_start), parseInt(gifts_tournament[xmn].gifts_positions_end)).then(function (rows) {
                                        var info_user = rows[0];
                                        for (var i = 0; i < info_user.length; i++) {
                                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(i)+" - "+info_user[i].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                            let datasendgift_Number1 = {
                                                UserId: info_user[i].IdAcc,
                                                aId: gifts_tournament[xmn].gift_aId_tournament,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };
                                            Promise.all([
                                                self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                            ]).then((data) => {
                                                Logger.info("#"+parseInt(i)+" - Gift "+gifts_tournament[xmn].gift_aId_tournament+" A: "+info_user[i].game_id);
                                            });
                                            self.account.sendMessage(new Message.loginResponse(self.account));
                                            let self2 = self.gameserver.getAccountById(parseInt(info_user[i].IdAcc));
                                            if (typeof (self2) === 'undefined') {
                                                self.account.send([0,'Oops the user '+info_user[i].game_id+' is not connected at this time.','',6]);
                                            } else {
                                                try {
                                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", gifts_tournament[xmn].gift_aId_tournament, 0, "Individual Prix #"+parseInt(i), "forever", AvatarName1]));
                                                } catch(e){Logger.error(e);}
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        break;
                    }
                case '/prix':
                    {
                        if (self.account.player.rank === 26) {
                            let init = data[0];
                            Logger.info("init: "+init);
                            /*================================================================================================================*/
                            let Puntos1 = parseInt(data[1]);
                            Logger.info("Puntos1: "+Puntos1);
                            /*================================================================================================================*/
                            let Puntos2 = parseInt(data[2]);
                            Logger.info("Puntos2: "+Puntos2);
                            /*================================================================================================================*/
                            let Puntos3 = parseInt(data[3]);
                            Logger.info("Puntos3: "+Puntos3);
                            /*================================================================================================================*/
                            let Puntos4 = parseInt(data[4]);
                            Logger.info("Puntos4: "+Puntos4);
                            /*================================================================================================================*/
                            self.gameserver.db.getMenbrPrixByPunts(Puntos1).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(3092);
                                    var AvatarName1 = "Ash (RARE) [Head]";
                                    
                                    var PrixAvatar2 = parseInt(3093);
                                    var AvatarName2 = "Ash (RARE) [Body]";
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    
                                    self.gameserver.db.getUserByGameId(info_user[xm].game_id).then(function (rows) {
                                        var user_data = rows[0][0];
                                        
                                        self.gameserver.db.getUserByIdAcc(user_data.IdAcc).then(function(acc) {
                                            var gift_data = acc[0][0];
                                            
                                            let datasendgift_Number1 = {
                                                UserId: user_data.IdAcc,
                                                aId: PrixAvatar1,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };
                                            
                                            let datasendgift_Number2 = {
                                                UserId: user_data.IdAcc,
                                                aId: PrixAvatar2,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };
                                            
                                            Promise.all([
                                                self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                            ], [
                                                self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                            ]).then((data) => {
                                                Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+gift_data.game_id);
                                                Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+gift_data.game_id);
                                            });
                                            
                                            self.account.sendMessage(new Message.loginResponse(self.account));
                                            let self2 = self.gameserver.getAccountById(parseInt(user_data.IdAcc));
                                            if (typeof (self2) === 'undefined') {
                                                self.account.send([0,'Oops the user '+user_data.game_id+' is not connected at this time.','',6]);
                                            } else {
                                                try {
                                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix Boss #"+parseInt(xm), "forever", AvatarName1]));
                                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix Boss #"+parseInt(xm), "forever", AvatarName2]));
                                                } catch(e){Logger.error(e);}
                                            }
                                        });
                                    });
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getMenbrPrixByPunts(Puntos2).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(300);
                                    var AvatarName1 = "Lobo [Head]";
                                    
                                    var PrixAvatar2 = parseInt(301);
                                    var AvatarName2 = "Lobo [Body]";
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    
                                    self.gameserver.db.getUserByGameId(info_user[xm].game_id).then(function (rows) {
                                        var user_data = rows[0][0];
                                        
                                        self.gameserver.db.getUserByIdAcc(user_data.IdAcc).then(function(acc) {
                                            var gift_data = acc[0][0];
                                            
                                            let datasendgift_Number1 = {
                                                UserId: user_data.IdAcc,
                                                aId: PrixAvatar1,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };
                                            
                                            let datasendgift_Number2 = {
                                                UserId: user_data.IdAcc,
                                                aId: PrixAvatar2,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };
                                            
                                            Promise.all([
                                                self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                            ], [
                                                self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                            ]).then((data) => {
                                                Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+gift_data.game_id);
                                                Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+gift_data.game_id);
                                            });
                                            
                                            self.account.sendMessage(new Message.loginResponse(self.account));
                                            let self2 = self.gameserver.getAccountById(parseInt(user_data.IdAcc));
                                            if (typeof (self2) === 'undefined') {
                                                self.account.send([0,'Oops the user '+user_data.game_id+' is not connected at this time.','',6]);
                                            } else {
                                                try {
                                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix Boss #"+parseInt(xm), "forever", AvatarName1]));
                                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix Boss #"+parseInt(xm), "forever", AvatarName2]));
                                                } catch(e){Logger.error(e);}
                                            }
                                        });
                                    });
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getMenbrPrixByPunts(Puntos3).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(8226);
                                    var AvatarName1 = "Trophy Bronze (SRARE) [Flag]";
                                    
                                    //var PrixAvatar2 = parseInt(8213);
                                    //var AvatarName2 = "Aniversario (RARE) [Background]";
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    //self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    
                                    self.gameserver.db.getUserByGameId(info_user[xm].game_id).then(function (rows) {
                                        var user_data = rows[0][0];
                                        
                                        self.gameserver.db.getUserByIdAcc(user_data.IdAcc).then(function(acc) {
                                            var gift_data = acc[0][0];
                                            
                                            let datasendgift_Number1 = {
                                                UserId: user_data.IdAcc,
                                                aId: PrixAvatar1,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };
                                            
                                            /*let datasendgift_Number2 = {
                                                UserId: user_data.IdAcc,
                                                aId: PrixAvatar2,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };*/
                                            
                                            Promise.all([
                                                self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                            ]/*, [
                                                self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                            ]*/).then((data) => {
                                                Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+gift_data.game_id);
                                                //Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+gift_data.game_id);
                                            });
                                            
                                            self.account.sendMessage(new Message.loginResponse(self.account));
                                            let self2 = self.gameserver.getAccountById(parseInt(user_data.IdAcc));
                                            if (typeof (self2) === 'undefined') {
                                                self.account.send([0,'Oops the user '+user_data.game_id+' is not connected at this time.','',6]);
                                            } else {
                                                try {
                                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix Boss #"+parseInt(xm), "forever", AvatarName1]));
                                                    //self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix Boss #"+parseInt(xm), "forever", AvatarName2]));
                                                } catch(e){Logger.error(e);}
                                            }
                                        });
                                    });
                                }
                            });
                            /*================================================================================================================*/
                            self.gameserver.db.getMenbrPrixByPunts(Puntos4).then(function (rows) {
                                var info_user = rows[0];
                                for (var xm in info_user) {
                                    var PrixAvatar1 = parseInt(3995);
                                    var AvatarName1 = "Boomer [Flag]";
                                    
                                    //var PrixAvatar2 = parseInt(8111);
                                    //var AvatarName2 = "Fuleco [Body]";
                                    
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName1+"", Types.CHAT_TYPE.GIFT));
                                    //self.gameserver.pushBroadcast(new Message.chatResponse(self.account,"#"+parseInt(xm)+" - "+info_user[xm].game_id+" - (gift) "+AvatarName2+"", Types.CHAT_TYPE.GIFT));
                                    
                                    self.gameserver.db.getUserByGameId(info_user[xm].game_id).then(function (rows) {
                                        var user_data = rows[0][0];
                                        
                                        self.gameserver.db.getUserByIdAcc(user_data.IdAcc).then(function(acc) {
                                            var gift_data = acc[0][0];
                                            
                                            let datasendgift_Number1 = {
                                                UserId: user_data.IdAcc,
                                                aId: PrixAvatar1,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };
                                            
                                            /*let datasendgift_Number2 = {
                                                UserId: user_data.IdAcc,
                                                aId: PrixAvatar2,
                                                type: 0,
                                                expire_time: 0,
                                                is_cash: 0,
                                                is_gift: 1,
                                                gift_sent_by: self.account.player.user_id,
                                                amount: 0,
                                                date_ava_time: Date.now()
                                            };*/
                                            
                                            Promise.all([
                                                self.gameserver.db.putUserAvatars(datasendgift_Number1)
                                            ]/*, [
                                                self.gameserver.db.putUserAvatars(datasendgift_Number2)
                                            ]*/).then((data) => {
                                                Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar1+" A: "+gift_data.game_id);
                                                //Logger.info("#"+parseInt(xm)+" - Gift "+PrixAvatar2+" A: "+gift_data.game_id);
                                            });
                                            
                                            self.account.sendMessage(new Message.loginResponse(self.account));
                                            let self2 = self.gameserver.getAccountById(parseInt(user_data.IdAcc));
                                            if (typeof (self2) === 'undefined') {
                                                self.account.send([0,'Oops the user '+user_data.game_id+' is not connected at this time.','',6]);
                                            } else {
                                                try {
                                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar1, 0, "Individual Prix Boss #"+parseInt(xm), "forever", AvatarName1]));
                                                    //self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR,["", PrixAvatar2, 0, "Individual Prix Boss #"+parseInt(xm), "forever", AvatarName2]));
                                                } catch(e){Logger.error(e);}
                                            }
                                        });
                                    });
                                }
                            });
                        }
                        break;
                    }
                case '/recarga':
                    {
                        if (self.account.player.rank === 26) {
                            var user_id = data[1];
                            var cash = parseInt(data[2]);
                            var mensaje = "Gracias Por Confiar En Nosotros. / Thanks For Trusting Us.";
                            let self2 = self.gameserver.getAccountById(parseInt(user_id));
                            let valido = false;
                            let validate_without_cash = false;
                            let DateAvaId = 0;
                            let DateAvaId_2 = 0;
                            let double_gift = false;
                            let name_ava_gift = self.account.gameserver.avatars.getAvatagift(parseInt(0));
                            let name_ava_gift_2 = self.account.gameserver.avatars.getAvatagift(parseInt(0));
                            if (self2.player.CashCharger === 0) {
                                DateAvaId = parseInt(4983);
                                valido = true;
                            }
                            else if (self2.player.CashCharger === 1) {
                                DateAvaId = parseInt(4817);
                                valido = true;
                            }
                            else if (self2.player.CashCharger === 2) {
                                DateAvaId = parseInt(4816);
                                valido = true;
                            }
                            else if (self2.player.CashCharger === 3) {
                                DateAvaId = parseInt(3492);
                                valido = true;
                            }
                            else if (self2.player.CashCharger === 4) {
                                DateAvaId = parseInt(3813);
                                valido = true;
                            }
                            else if (self2.player.CashCharger === 5) {
                                DateAvaId = parseInt(3628);
                                valido = true;
                            }
                            else if (self2.player.CashCharger === 6) {
                                DateAvaId = parseInt(3627);
                                valido = true;
                            }
                            else if (self2.player.CashCharger === 7) {
                                DateAvaId = parseInt(8148);
                                valido = true;
                            }
                            else if (self2.player.CashCharger === 8) {
                                DateAvaId = parseInt(8413);
                                DateAvaId_2 = parseInt(8414);
                                valido = true;
                                double_gift = true;
                            }
                            else {
                                valido = true;
                                validate_without_cash = true;
                            }
                            if (valido) {
                                if (double_gift) {
                                    name_ava_gift = self.account.gameserver.avatars.getAvatagift(DateAvaId);
                                    name_ava_gift_2 = self.account.gameserver.avatars.getAvatagift(DateAvaId_2);
                                } else {
                                    name_ava_gift = self.account.gameserver.avatars.getAvatagift(DateAvaId);
                                }
                                self.gameserver.db.sendCash(cash, user_id);
                                if (validate_without_cash) {
                                    self2.send([17,"Received Cash! :)","You just received <font color='yellow'>"+cash+"</font> Cash from<br><font color='yellow'>"+self.account.player.game_id+"</font>.<br><br>Thank You!"]);
                                }
                                if (double_gift) {
                                    self2.send([17, "Received Cash! :)", "You just received <font color='yellow'>"+cash+"</font> Cash from<br><font color='yellow'>"+self.account.player.game_id+"</font>.<br><br>And received gift <font color='cyan'>Set Pikachu (RARE)</font>.<br><br>Thank You!"]);
                                    let datasendgift = {
                                        UserId: user_id,
                                        aId: DateAvaId,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                    self.gameserver.db.putUserAvatars(datasendgift);
                                    let datasendgift2 = {
                                        UserId: user_id,
                                        aId: DateAvaId_2,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                    self.gameserver.db.putUserAvatars(datasendgift2);
                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [self.account.player.game_id, DateAvaId, 0, mensaje, "forever", name_ava_gift]));
                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [self.account.player.game_id, DateAvaId, 0, mensaje, "forever", name_ava_gift_2]));
                                }
                                if (double_gift === false && validate_without_cash === false) {
                                    self2.send([17, "Received Cash! :)", "You just received <font color='yellow'>"+cash+"</font> Cash from<br><font color='yellow'>"+self.account.player.game_id+"</font>.<br><br>And received gift <font color='cyan'>"+name_ava_gift+"</font>.<br><br>Thank You!"]);
                                    let datasendgift = {
                                        UserId: user_id,
                                        aId: DateAvaId,
                                        type: 0,
                                        expire_time: 0,
                                        is_cash: 0,
                                        is_gift: 1,
                                        gift_sent_by: self.account.player.user_id,
                                        amount: 0,
                                        date_ava_time: Date.now()
                                    };
                                    self.gameserver.db.putUserAvatars(datasendgift);
                                    self2.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.RECEIVED_AVATAR, [self.account.player.game_id, DateAvaId, 0, mensaje, "forever", name_ava_gift]));
                                }
                                self.gameserver.db.updateCashChargeById(user_id);
                                self.account.send([0, "Cash Enviado Con Exito :)", "", 6]);
                                self2.player.cash += cash;
                                self2.sendMessage(new Message.loginResponse(self2));
                            }
                        }
                        if (self.account.player.rank === 26 || self.account.player.rank === 27) {
                            self.account.send([0, "Tu Rango No Esta Permitido, Para Que Puedas Utilizar Este Comando.", "", 6]);
                            return null;
                        }
                        break;
                    }
                case '/kick':
                    {
                        Logger.info("El User: "+self.account.player.game_id+" Ha Usado El Comando Kick");
                        if(self.account.player.is_master === 1) {
                            self.gameserver.db.getUserByGameId(junteall(msj)).then(function (rows) {
                                var data_kick = rows[0][0];
                                if(self.account.player.room_number == self.gameserver.getAccountById(data_kick.IdAcc).player.room_number)
                                    return;
                                let self2 = self.gameserver.getAccountById(parseInt(data_kick.IdAcc));
                                if (self.account.player.rank === 26 ||self.account.player.rank === 27 ||self.account.player.rank === 31) {
                                    //self.gameserver.db.putCommandsGMGift(data[0], 0, 0, "El GM "+self.account.player.game_id+" Kikeo al usuario: ["+self2.player.game_id+" en la room: "+self.account.room.id+"]", self.account.player.game_id, self2.player.game_id, self2.player.user_id, datoservertime);
                                }
                                self2.location_type = Types.LOCATION.CHANNEL;
                                self2.room.removePlayer(self2);
                                self2.sendMessage(new Message.loginResponse(self2));
                                self2.player.is_ready = 0;
                                self2.player.is_master = 0;
                                self2.gameserver.sendAccountsOnline();
                                self2.gameserver.sendRooms(self2);
                                self2.gameserver.pushBroadcastChat(new Message.chatResponse(self2, junteall(msj)+" was kicked out of the room.", Types.CHAT_TYPE.SYSTEM), self.account.room);
                            }).catch(function (err) {});
                        }
                        break;
                    }
                case '/master':
                    {
                        //Logger.info("El User: "+self.account.player.game_id+" Ha Usado El Comando Master");
                        if (self.account.player.is_master === 1) {
                            self.account.room.found_master = false;
                            self.gameserver.db.getUserByGameId(junteall(msj)).then(function (rows) {
                                var data_kick = rows[0][0];
                                let self2 = self.gameserver.getAccountById(parseInt(data_kick.IdAcc));
                                self.account.room.getOnePlayer(parseInt(data_kick.IdAcc))
                                    .then(function (p) {
                                        if (self.account.room.found_master === false) {
                                            self2.player.is_master = 1;
                                            self.account.player.is_master = 0;
                                            self.account.room.found_master = true;
                                            self.gameserver.pushToRoom(self.account.room.id, new Message.passMaster(self2));
                                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Master de la sala se transfirió a "+self2.player.game_id, Types.CHAT_TYPE.SYSTEM), self.account.room);
                                        }
                                });
                            }).catch(function (err) {});
                        }
                        break;
                    }
                /*case '/foto_perfil':
                    {
                        let photo_url = data[1];
                        if (typeof (photo_url) === 'undefined' || photo_url === '' || photo_url === ' ') {
                            self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "Debes De Colocar La Url De Tu Imagen.<br><br>Web Recomendada Para Generarle Una Url Para Tu Imagen: <a href='https://imgur.com/' target='_blank'>Imgur</a>"));
                            return null;
                        }
                        let acc_id = self.account.player.game_id;
                        let foto_url = photo_url.charAt(photo_url.length-4)+photo_url.charAt(photo_url.length-3)+photo_url.charAt(photo_url.length-2)+photo_url.charAt(photo_url.length-1);
                        if (foto_url === '.gif' || foto_url === '.jpeg' || foto_url === '.jpg' || foto_url === '.png') {
                            self.gameserver.db.updatePhotoUrlByIdAcc(photo_url, self.account.user_id);
                            self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "Tu Foto Fue Subida Correctamente.<br><br>Img Url: "+photo_url));
                            self.account.player.photo_url = photo_url;
                            self.account.sendMessage(new Message.loginResponse(self.account));
                            self.gameserver.sendAccountsOnline();
                        } else
                            self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "La Url Que Has Colocado No Termina En Formato de Imagen Como (.gif, .jpeg, .jpg ó .png)"));
                        break;
                    }
                case '/fondo_user':
                    {
                        let bg_url = data[1];
                        if (typeof (bg_url) === 'undefined' || bg_url === '' || bg_url === ' ') {
                            self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "Debes De Colocar La Url De Tu Imagen.<br><br>Web Recomendada Para Generarle Una Url Para Tu Imagen: <a href='https://imgur.com/' target='_blank'>Imgur</a>"));
                            return null;
                        }
                        let id_acc = self.account.player.game_id;
                        let img_url = bg_url.charAt(bg_url.length-4)+bg_url.charAt(bg_url.length-3)+bg_url.charAt(bg_url.length-2)+bg_url.charAt(bg_url.length-1);
                        if (img_url === '.gif' || img_url === '.jpeg' || img_url === '.jpg' || img_url === '.png') {
                            self.gameserver.db.updateBGUrlByIdAcc(bg_url, self.account.user_id)
                                .then(function (data) {
                                if (data.error_mysql || data.error_querry) {} else {
                                    self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "Tu Fondo Fue Subido Correctamente."));
                                }
                            }).catch(function (err) {Logger.error("" + err.stack);});
                        } else
                            self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "La Url Que Has Colocado No Termina En Formato de Imagen Como (.gif, .jpeg, .jpg ó .png)"));
                        break;
                    }*/
                case '/botar':
                     {
                        if (self.account.player.rank === 25 || self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            let init = data[0];
                            let user_name = junteall(msj);
                            self.gameserver.db.getUserByGameId(user_name).then(function(acc) {
                                var botar_user = acc[0][0];
                                if (self.gameserver.name === 'Prix' && self.account.player.tournament_start_time_server <= Date.now() && self.account.player.tournament_end_time_server >= Date.now() || self.gameserver.name === 'Guilds Prix' && self.account.player.tournament_start_time_server <= Date.now() && self.account.player.tournament_end_time_server >= Date.now()) {
                                    self.gameserver.pushBroadcastChat(new Message.chatResponse(self.account, "Jugador: "+junteall(msj)+" - Expelled By The GM: "+self.account.player.game_id, Types.CHAT_TYPE.BOT));
                                    self.gameserver.chathistory.push(["Jugador: "+junteall(msj)+" - Expelled By The GM: "+self.account.player.game_id, self.account.player.game_id, Types.CHAT_TYPE.BOT, self.account.player.guild]);
                                }
                                //self.account.sendMessage(new Message.alertResponse("Hola "+self.account.player.game_id, "Has Botado Del Servidor Al Usuario: "+user_name+", Exitosamente"));
                                self.account.sendMessage(new Message.chatResponse(self, "Usuario: "+user_name+", Expulsado Del Servidor.", Types.CHAT_TYPE.SYSTEM));
                                let self2 = self.gameserver.getAccountById(parseInt(botar_user.IdAcc));
                                var my_room = 0;
                                if (self2.player.room_number != 0)
                                    my_room = self2.player.room_number;
                                if (self.account.player.rank === 26 ||self.account.player.rank === 27 ||self.account.player.rank === 31) {
                                    self.gameserver.db.putCommandsGMGift(data[0], 0, 0, "El GM "+self.account.player.game_id+" boto al usuario: ["+self2.player.game_id+" en la room: "+my_room+"]", self.account.player.game_id, self2.player.game_id, self2.player.user_id, datoservertime);
                                }
                                self2.sendMessage(new Message.alertResponse("Hola "+botar_user.game_id, "Has Sido Expulsado Del Servidor Por X Motivos, Por El GM "+self.account.player.game_id));
                                self2.connection.close();
                                
                            });
                        }
                        break;
                    }
                case'/add':
                    {
                        self.gameserver.db.getUserByGameId(junteall(msj)).then(function (rows) {
                            var friend_user = rows[0][0];
                            if (self.account.player.user_id === friend_user.IdAcc) {
                                self.account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.CANT_FRIEND_YOURSELF, []));
                                return null;
                            }
                            if (self.account.player.rank < 26 && friend_user.rank === 26 || self.account.player.rank < 26 && friend_user.rank === 27 || self.account.player.rank < 26 && friend_user.rank === 31) {
                                self.account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.CANT_FRIEND_GM, []));
                                return null;
                            }
                            if (friend_user.block_friend === 1) {
                                self.account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ADD_FRIEND_OFFLINE, []));
                                return null;
                            }
                            if (friend_user.block_friend === 0) {
                                let amigo_id = self.gameserver.getAccountById(friend_user.IdAcc);
                                let ropa = [self.account.player.ahead, self.account.player.abody, self.account.player.aeyes, self.account.player.aflag, self.account.player.aforeground, self.account.player.abackground];
                                amigo_id.send([Types.SERVER_OPCODE.friendreq, [self.account.player.user_id,self.account.player.game_id,ropa]]);
                                self.account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.FRIEND_REQUEST_SENT, [amigo_id.player.game_id]));
                            }
                        });
                        
                        break;
                    }
                case'/block_friend_requests':
                    {
                        self.gameserver.db.getUserByGameId(self.account.player.game_id).then(function (rows) {
                            var friend_user = rows[0][0];
                            if (friend_user.block_friend === 1) {
                                self.account.send([0," Friend requests ALLOWED :)","",6]);
                                self.gameserver.db.updateBlockFriendByIdAcc(0, self.account.player.user_id);
                            }
                            if (friend_user.block_friend === 0) {
                                self.account.send([0," Friend requests BLOCKED :(","",6]);
                                self.gameserver.db.updateBlockFriendByIdAcc(1, self.account.player.user_id);
                            }
                        });
                        
                        break;
                    }
                case '/users_ip':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.gameserver.db.getIpBannedById(junteall(msj)).then(function (rows) {
                                var users_ip = rows[0];
                                for (var xm in users_ip) {//game_id, rank, IdAcc, IP
                                    self.account.send([0,"User: "+users_ip[xm].game_id+" - ID: "+users_ip[xm].IdAcc+" - Rank: (rank"+users_ip[xm].rank+") - Computer IP: "+users_ip[xm].IP,"",6]);
                                }
                            });
                        }
                        break;
                    }
                case '/info':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.gameserver.db.getUserByGameId(junteall(msj)).then(function (rows) {
                                var info_user = rows[0][0];
                                self.account.send([0,"User: "+junteall(msj)+" - Id: "+info_user.IdAcc+" - Win: "+info_user.win+" - Loss: "+info_user.loss+" - Computer IP: "+info_user.IP,"",6]);
                            });
                        }
                        break;
                    }
                case '/info2':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.gameserver.db.getUserByGameId(junteall(msj)).then(function (rows) {
                                var info_user2 = rows[0][0];
                                let self2 = self.gameserver.getAccountById(parseInt(info_user2.IdAcc));
                                self.account.send([0,"User: "+info_user2.game_id+" - ID: "+info_user2.IdAcc+" | "+Commatize(info_user2.cash)+" Cash | "+Commatize(info_user2.gold)+" Gold | GP: "+Commatize(info_user2.gp)+" | Win Rate: "+self2.player.win_rate+"% | IP Computer: "+info_user2.IP,"",6]);
                            });
                        }
                        break;
                    }
                case '/bcm':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            if (data[1] !== null && data[1].length > 0) {
                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, junteall(msj), Types.CHAT_TYPE.GM_BUGLE));
                            }
                        }
                        break;
                    }
                case '/sv':
                    {
                        if (self.account.player.rank === 26) {
                            if (data[1] !== null && data[1].length > 0) {
                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, junteall(msj), Types.CHAT_TYPE.SYSTEM));
                            }
                        }
                        break;
                    }
                case '/bot':
                    {
                        if (self.account.player.gm === 1) {
                            if (self.account.player.is_muted === true || self.account.player.is_muted >= Date.now()) {
                                self.account.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.MUTED, []));
                                return null;
                            } else {
                                if (data[1] !== null && data[1].length > 0)
                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account, junteall(msj), Types.CHAT_TYPE.BOT));
                            }
                        }
                            break;
                    }
                case '/love':
                    {
                        if (self.account.player.rank === 31) {
                            if (data[1] !== null && data[1].length > 0) {
                                self.gameserver.forEachAccount(function (account) {
                                    if (account !== null) {
                                        account.send([0, junteall(msj), self.account.player.game_id, 12, self.account.player.guild]);
                                    }
                                });
                            }
                        }
                        break;
                    }
                
                case '/chat_gift':
                    {
                        if (self.account.player.rank === 26) {
                            if (data[1] !== null && data[1].length > 0)
                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, junteall(msj), Types.CHAT_TYPE.GIFT));
                        }
                        break;
                    }
                case '/clear':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            if (self.gameserver.name === "Holiday" && self.account.player.rank !== 31) {//At the moment this command has been blocked for your rank on this server
                                self.account.send([0,"At the moment this command has been blocked for your rank on this server. :(","",6]);
                                return null;
                            }
                            if (self.account.player.user_id !== 1) {
                                if (self.gameserver.name === 'Prix' && self.account.player.tournament_start_time_server <= Date.now() && self.account.player.tournament_end_time_server >= Date.now() || self.gameserver.name === 'Guilds Prix' && self.account.player.tournament_start_time_server <= Date.now() && self.account.player.tournament_end_time_server >= Date.now()) {
                                    self.account.send([0,"At the moment this command has been blocked during the tournament. :(","",6]);
                                    return null;
                                }
                            }
                            self.gameserver.forEachAccount(function (account) {
                                if (account !== null) {
                                    self.gameserver.chathistory = [];
                                    var data_game_server = self.gameserver.chathistory.slice(0);
                                    data_game_server.push(['', '', 9]);
                                    if (self.gameserver.evento200 === true)
                                        data_game_server.push([' El porcentaje de GP & Gold cambiaron a 200%', '[Inicio de Evento', 17]);
                                    if (self.gameserver.evento500 === true)
                                        data_game_server.push([' El porcentaje de GP & Gold cambiaron a 500%', '[Inicio de Evento', 17]);
                                    account.send([Types.SERVER_OPCODE.room_state, [0, data_game_server], 1]);
                                }
                            });
                        }
                        break;
                    }
                case '/power':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.power = 1;
                            self.account.room.RoomUpdate(self);
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Power: On", Types.CHAT_TYPE.SYSTEM), self.account.room);
                        }
                        break;
                    }
                case '/on4':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 8;
                            self.account.room.RoomUpdate(self);
                            self.account.room.status = Types.ROOM_STATUS.WAITING;
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Room: 4 Vs 4", Types.CHAT_TYPE.SYSTEM), self.account.room);
                        }
                        break;
                    }
                case '/on3':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 6;
                            self.account.room.RoomUpdate(self);
                            self.account.room.status = Types.ROOM_STATUS.WAITING;
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Room: 3 Vs 3", Types.CHAT_TYPE.SYSTEM), self.account.room);
                        }
                        break;
                    }
                case '/on2':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 4;
                            self.account.room.RoomUpdate(self);
                            self.account.room.status = Types.ROOM_STATUS.WAITING;
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Room: 2 Vs 2", Types.CHAT_TYPE.SYSTEM), self.account.room);
                        }
                        break;
                    }
                case '/on1':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 2;
                            self.account.room.RoomUpdate(self);
                            self.account.room.status = Types.ROOM_STATUS.WAITING;
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Room: 1 Vs 1", Types.CHAT_TYPE.SYSTEM), self.account.room);
                        }
                        break;
                    }
                case '/on':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 0;
                            self.account.room.RoomUpdate(self);
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "Room: 0 Vs 0", Types.CHAT_TYPE.SYSTEM), self.account.room);
                        }
                        break;
                    }
                case '/bug':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            if (typeof (self.account.room.game) !== 'undefined') {
                                self.account.room.game.gamePass(null);
                            }
                        }
                        break;
                    }
                    
                case '/start':
                    {
                        if (self.account.player.rank === 31 && typeof (self.account.room) !== 'undefined') {
                            if (typeof (self.account.room.game) !== 'undefined') {
                                self.account.room.gameStart(self);
                            }
                        }
                        break;
                    }
                case '/password':
                    {
                        if (self.account.player.is_master == 1) {
                            if (typeof (self.account.room) !== 'undefined') {
                                if (typeof (self.account.room.game) !== 'undefined') {
                                    self.account.room.password = data[1];
                                    self.account.room.RoomUpdate(self);
                                    self.gameserver.pushBroadcastChat(new Message.chatResponse(self, " Room password changed to: "+data[1], Types.CHAT_TYPE.SYSTEM), self.account.room);
                                }
                            }
                        }
                        break;
                    }
                case '/?':
                case '/help':
                case '/ayuda':
                    {
                        if (self.account.player.rank === 26 || self.account.player.rank === 27 || self.account.player.rank === 31) {
                            self.account.send([0," GM Commands:<br>/bcm Text<br>/bot Text<br>/botar Name<br>/on = [Room: 0 Vs 0]<br>/on1 = [Room: 1 Vs 1]<br>/on2 = [Room: 2 Vs 2]<br>/on3 = [Room: 3 Vs 3]<br>/on4 = [Room: 4 Vs 4]<br>/power = [Power Room: On]<br>/info - /info2 Name = [Info User]<br>/payer Name = [Id User]<br>/gift UserID<br>/cash UserID Monto "+'"Text"'+"<br>/ban UserID "+'"Motivo"'+" "+'"Time = [-e ó -d]"'+"<br>-e = permanentemente [ imgur.com/wKZoZgi.png ]<br>-d = por dias [ imgur.com/GTPPpt7.png ]<br>/recarga UserID MontoCash<br>/pin_code Propetario Monto<br>/server<br>/gift_team Team = [A ó B]<br>/room RoomId<br>/gp UserID GPDeDescuento<br>/muted UserID Minutes "+'"Text"'+"<br>/room_title RoomID "+'"Titulo"'+"<br>/map_room MapID<br>/users_ip IP<br>/mobil IdMobil<br>/ad UserID "+'"Text"'+"","",6]);
                        }
                        if (self.account.player.rank === 28 || self.account.player.rank === 29 || self.account.player.rank === 30) {
                            self.account.send([0," User Commands:<br>/foto_perfil Link_Url<br>/fondo_user Link_Url<br>/kick [Name], /kick_a, /kick_b, /kick_all<br>/master [Name]<br>/password [pw]<br>/add [Name]<br>/block_friend_requests<br>/bot Text","",6]);
                        }
                        if (self.account.player.gm === 0) {
                            self.account.send([0," User Commands:<br>/kick [Name], /kick_a, /kick_b, /kick_all<br>/master [Name]<br>/guild_pf Link_Url = Guild Img Profile<br>/guild_bg Link_Url = Guild Img Background<br>/password [pw]<br>/add [Name]<br>/block_friend_requests","",6]);
                        }
                        break;
                    }
                case '/reset':
                    {
                        if (self.account.player.rank === 26) {
                            self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 10 Minutes.", Types.CHAT_TYPE.SYSTEM));
                             var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 9 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 60000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 8 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 120000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 7 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 180000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 6 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 240000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 5 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 300000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 4 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 360000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 3 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 420000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 2 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 480000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update In 1 Minutes.", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 540000);
                            var reset2 = setTimeout(function () {
                                 self.gameserver.pushBroadcastChat(new Message.chatResponse(self, "New Update Now! :)", Types.CHAT_TYPE.SYSTEM));
                                 reset2 = null;
                             }, 600000);
                            var reset2 = setTimeout(function () {
                                 process.exit(1);
                                 reset2 = null;
                             }, 630000);
                         }
                         break;
                    }
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    cmdargs(str) {
        var args = [];
        var nred = false;
        var part = '';
        for (var i = 0; i < str.length + 1; i++) {
            if (str.charAt(i) === " " && nred === false || i === str.length) {
                args.push(part);
                part = '';
            } else {
                if (str.charAt(i) === '\"') {
                    nred = !nred;
                } else {
                    part += str.charAt(i);
                }
            }
        }
        return args;
    }
};