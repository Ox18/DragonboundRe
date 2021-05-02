var cls = require('./class');
var Types = require('../gametypes');

var Messages = {};
module.exports = Messages;

var Message = cls.Class.extend({});

Messages.chatResponse = Message.extend({
    init: function (account, msj, type) {
        this.player = account.player;
        this.msj = msj;
        this.type = type;
    },
    serialize: function () {
        var data = [
            Types.SERVER_OPCODE.chat,
            this.msj
        ];
        if (this.type !== Types.CHAT_TYPE.SYSTEM)
            data.push(this.player.game_id);
        else
            data.push("");

        data.push(this.type);
        if (this.type === Types.CHAT_TYPE.NORMAL || this.type === Types.CHAT_TYPE.GM || this.type === Types.CHAT_TYPE.BUGLE)
            data.push(this.player.guild);
        return data;
    }
});

Messages.roomState = Message.extend({
    init: function (room) {
        this.room = room;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.room_state, [
                this.room.room_type,
                this.room.id,
                this.room.title,
                this.room.password,
                this.room.max_players,
                this.room.game_mode,
                this.room.map,
                this.room.is_avatars_on,
                this.room.max_wind,
                this.room.gp_rate,
                this.room.minimap,
                this.room.is_s1_disabled,
                this.room.is_tele_disabled,
                this.room.is_random_teams,
                this.room.is_dual_plus_disabled
            ],
            1
        ];
    }
});

Messages.changedMobile = Message.extend({
    init: function (account) {
        this.player = account.player;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.changed_mobile,
            this.player.user_id,
            this.player.mobile
        ];
    }
});

Messages.changedReady = Message.extend({
    init: function (account) {
        this.player = account.player;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.changed_ready,
            this.player.user_id,
            this.player.is_ready
        ];
    }
});

Messages.passMaster = Message.extend({
    init: function (account) {
        this.player = account.player;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.pass_master,
            this.player.user_id
        ];
    }
});

Messages.masterTimer = Message.extend({
    init: function (time) {
        this.time = time;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.master_timer,
            this.time
        ];
    }
});

Messages.changedTeam = Message.extend({
    init: function (account) {
        this.player = account.player;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.changed_team,
            0,
            0,
            this.player.user_id,
            this.player.team ? 'B' : 'A'
        ];
    }
});

Messages.playerLeft = Message.extend({
    init: function (account) {
        this.player = account.player;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.player_left,
            0,
            0,
            this.player.user_id
        ];
    }
});

Messages.extraRoomInfo = Message.extend({
    init: function (room) {
        this.room = room;
        this.data = [];
    },
    serialize: function () {
        var self = this;
        self.data.push(self.room.id);
        self.room.forPlayers(function (account) {
            self.data.push(account.player.position);
            self.data.push(account.player.rank);
            self.data.push(account.player.game_id);
        });
        return [
            Types.SERVER_OPCODE.extra_room_info,
            self.data
        ];
    }
});

Messages.roomPlayers = Message.extend({
    init: function (room) {
        this.room = room;
        this.data = [];
    },
    serialize: function () {
        var self = this;
        self.data = [self.room.team_a_gp, self.room.team_b_gp];
        self.data.push([]);
        self.room.forPlayers(function (account) {
            self.data.push(account.player.position);
            self.data.push(account.user_id);
            self.data.push(account.player.game_id);
            self.data.push(account.player.rank);
            self.data.push(account.player.guild);
            self.data.push(account.player.is_master);
            self.data.push(account.player.is_ready);
            self.data.push(account.player.gender);
            self.data.push(account.player.mobile);
            self.data.push([
                account.player.ahead,
                account.player.abody,
                account.player.aeyes,
                account.player.aflag,
                account.player.abackground,
                account.player.aforeground,
            ]);
            self.data.push(account.player.is_bot);
            self.data.push(account.player.power_user);
            self.data.push(account.player.relationship_status);
            self.data.push(account.player.country);
            self.data.push(account.player.photo_url);
        });
        self.data.push(1);
        //console.log(self.data);
        return [
            Types.SERVER_OPCODE.room_players,
            self.data
        ];
    }
});

Messages.roomSlotUpdate = Message.extend({
    init: function (account) {
        this.player = account.player;
    },
    serialize: function () {
        var data = [0, 0];
        data.push([]);
        data.push(this.player.position);
        data.push(this.player.user_id);
        data.push(this.player.game_id);
        data.push(this.player.rank);
        data.push(this.player.guild);
        data.push(this.player.is_master);
        data.push(this.player.is_ready);
        data.push(this.player.gender);
        data.push(this.player.mobile);
        data.push([
            this.player.ahead,
            this.player.abody,
            this.player.aeyes,
            this.player.aflag,
            this.player.abackground,
            this.player.aforeground,
        ]);
        data.push(this.player.is_bot);
        data.push(this.player.power_user);
        data.push(this.player.relationship_status);
        data.push(this.player.country);
        data.push(this.player.photo_url);
        return [
            Types.SERVER_OPCODE.slot_update,
            data
        ];
    }
});

Messages.gameStart = Message.extend({
    init: function (room) {
        var self = this;
        this.room = room;
        this.data = [];
        this.players = [];
        this.room.forPlayers(function (account) {
            let player = account.player;
            let mob_data = Types.MOBILES[account.player.mobile];
            self.players.push([
                player.position,
                player.user_id,
                player.game_id,
                player.guild,
                player.rank,
                player.x,
                player.y,
                player.hp,
                player.shield,
                player.shield_regen,
                mob_data.minang,
                mob_data.maxang,
                player.lastturn,
                player.mobile, [
                    player.ahead,
                    player.abody,
                    player.aeyes,
                    player.aflag,
                    player.abackground,
                    player.aforeground,
                ],
                mob_data.aim[0][0],//aim_s1_ang aim_s1_len aim_s2_ang aim_s2_len aim_ss_ang aim_ss_len 
                mob_data.aim[0][1],
                mob_data.aim[1][0],
                mob_data.aim[1][1],
                mob_data.aim[2][0],
                mob_data.aim[2][1],
                player.relationship_status,
                player.country
            ]);
        });

        //players first_turn thor_x thor_y thor_a thor_d weather wind_power wind_angle map 
        //is_s1_disabled event_game game_mode score
        this.data.push(this.players);
        this.data.push(this.room.game.frist_turn);
        this.data.push(this.room.game.thor.x); // thor_x
        this.data.push(this.room.game.thor.y); // thor_y
        this.data.push(this.room.game.thor.angle); //thor_a
        this.data.push(this.room.game.thor.damage); //thor_d
        this.data.push([0, 0, 0, 0, 0]); //weather
        this.data.push(this.room.game.wind_power);
        this.data.push(this.room.game.wind_angle);
        this.data.push(this.room.map);

        this.data.push(0); //is_s1_disabled
        this.data.push(0); //event_game
        this.data.push(this.room.game_mode); //game_mode
        this.data.push(0); //score
    },

    serialize: function () {
        return [Types.SERVER_OPCODE.game_start, this.data];
    }
});

Messages.gamePlay = Message.extend({
    init: function (account, data, nextplayer, chat) {
        this.account = account;
        this.player = account.player;
        this.nextplayer = nextplayer;
        this.data = data;
        this.chat = chat;
    },
    serialize: function () {
        return [Types.SERVER_OPCODE.play, [
            this.nextplayer.position,
            this.player.position,
            this.player.x,
            this.player.y,
            this.player.look,
            this.player.delay,
            this.nextplayer.position,
            this.chat,
            this.account.room.game.thor.x,
            this.account.room.game.thor.y,
            this.account.room.game.thor.angle, //thor_angle
            this.account.room.game.thor.damage, //thor_damage
            0, //new_weather
            this.account.room.game.wind_power, //wind_power
            this.account.room.game.wind_angle, //wind_angle
            this.data,
            0
        ]];
    }
});

Messages.gameOver = Message.extend({
    init: function (room, team) {
        var self = this;
        this.room = room;
        this.team = team;
        this.data = [];
        this.room.forPlayers(function (account) {
            let player = account.player;
            self.data.push([
                player.position,
                player.id,
                player.game_id,
                player.rank,
                player.win_gp,
                player.win_gold,
                0, //bonus gp
                0 //bonus gold
            ]);
        });
    },
    serialize: function () {
        return [Types.SERVER_OPCODE.game_over, {
            "won": this.team,
            scores: this.data,
            "chat": []
        }];
    }
});

Messages.gameUpdate = Message.extend({
    init: function (account) {
        this.player = account.player;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.update, [
                this.player.position,
                this.player.x,
                this.player.y,
                this.player.look
            ]
        ];
    }
});

Messages.gamePass = Message.extend({
    init: function (account, nextplayer, room) {
        this.account = account;
        this.player = account.player;
        this.nextplayer = nextplayer;
        this.room = room;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.pass, [
                this.nextplayer.position,
                this.player.position,
                this.player.x,
                this.player.y,
                this.player.look,
                this.player.delay,
                this.nextplayer.position, [],
                this.room.game.thor.x,
                this.room.game.thor.y,
                this.room.game.thor.angle, //thor_angle
                this.room.game.thor.damage, //thor_damage
                0,
                this.room.game.wind_power,
                this.room.game.wind_angle
            ]
        ];
    }
});

Messages.myAvatars = Message.extend({
    init: function (account, data) {
        this.player = account.player;
        this.data = data;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.my_avatars, this.data,
            this.player.gold,
            this.player.cash
        ];
    }
});

Messages.loginResponse = Message.extend({
    init: function (account) {
        this.account = account;
        this.player = account.player;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.my_player_info, [
                this.account.user_id,
                this.account.location_type,
                this.account.room_number,
                this.player.game_id,
                this.player.rank,
                this.player.gp,
                this.player.gold,
                this.player.cash,
                this.player.gender,
                this.player.unlock,
                this.player.ahead,
                this.player.abody,
                this.player.aeyes,
                this.player.aflag,
                this.player.abackground,
                this.player.aforeground,
                this.player.event1,
                this.player.event2,
                this.player.photo_url,
                this.player.guild,
                this.player.guild_job,
                this.player.name_changes,
                this.player.power_user,
                this.player.tournament,
                this.player.plus10gp,
                this.player.mobile_fox,
                this.player.country,
                this.player.flowers,
                this.player.relationship_status,
                this.player.relationship_with_id,
                this.player.relationship_with_rank,
                this.player.relationship_with_photo,
                this.player.relationship_with_name,
                this.player.relationship_with_gender,
                this.player.maps_pack,
                this.player.guild_score,
                this.player.megaphones
            ]
        ];
    }
});

Messages.alertResponse = Message.extend({
    init: function (title, msj) {
        this.title = title;
        this.msj = msj;
    },
    serialize: function () {
        return [
            Types.SERVER_OPCODE.alert,
            this.title,
            this.msj
        ];
    }
});

Messages.alert2Response = Message.extend({
    init: function (type, arr) {
        this.type = type;
        this.arr = arr;
    },
    serialize: function () {
        return [Types.SERVER_OPCODE.alert2, this.type, this.arr];
    }
});

Messages.guildResponse = Message.extend({
    init: function (account, members) {
        this.account = account;
        this.members = members;
    },
    serialize: function () {
        var data = [Types.SERVER_OPCODE.guild];
        if (this.account.player.guild !== '' && this.members.length > 0)
            data.push(this.members);
        return data;
    }
});

Messages.friendsResponse = Message.extend({
    init: function (account) {
        this.account = account;
    },
    serialize: function () {
        return [Types.SERVER_OPCODE.friends, [
            //aburren
            /*[1, 0, "Dev", "12345", "b27c2"],
            [2, 0, "Betax", "1234", "b27c2"],
            [62, 0, "NOVA", "1235", "b26c2"],
            [68, 0, "Renco", "1236", "b26c2"],
            [90, 0, "JuanCM", "1237", "b26c2"],
            [459, 0, "FCarlos", "1238", "b26c2"],
            [850, 0, "Yabi", "1239", "b26c2"],
            [1255, 0, "Terry", "1240", "b26c2"],
            [1414, 0, "#HarLeyQuinn~", "1241", "b26c2"],
            [14857, 0, "Franco", "1242", "b26c2"],*/
        ], 3, 1];
    }
});

Messages.pChatResponse = Message.extend({
    init: function (account, game_id, msj) {
        this.id = account.user_id;
        this.game_id = game_id;
        this.msj = msj;
        this.account = account;
    },
    serialize: function () {
        return [Types.SERVER_OPCODE.pchat,
            this.id,
            this.game_id,
            this.msj,
            this.account.rank,
            this.account.guild,
            this.account.country
        ];
    }
});

Messages.InfoResponse = Message.extend({
    init: function (account) {
        this.account = account;
    },
    serialize: function () {
        return [Types.SERVER_OPCODE.info, [
            this.account.user_id,
            this.account.player.game_id,
            this.account.player.flowers,
            this.account.player.rank,
            this.account.player.gp,
            this.account.player.gender,
            this.account.player.photo_url,
            this.account.player.damage_average,
            this.account.player.win_rate,
            this.account.player.win,
            this.account.player.loss,
            this.account.player.guild,
            this.account.player.guild_job,
            this.account.player.relationship_status,
            this.account.player.relationship_with_id,
            this.account.player.relationship_with_rank,
            this.account.player.relationship_with_photo,
            this.account.player.relationship_with_name,
            this.account.player.relationship_with_gender,
            this.account.player.is_my_friend,
            this.account.player.is_my_guild_mate
        ]];
    }
});

Messages.GuildreqResponse = Message.extend({
    init: function (account) {
        this.account = account;
    },
    serialize: function () {
        return [Types.SERVER_OPCODE.guildreq, [
            this.account.player.game_id, [
                this.account.player.ahead,
                this.account.player.abody,
                this.account.player.aeyes,
                this.account.player.aflag,
                this.account.player.abackground,
                this.account.player.aforeground,
            ],
            "4964645674545",
            this.account.player.guild_id,
            this.account.player.guild
        ]];
    }
});