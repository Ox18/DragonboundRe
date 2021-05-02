var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Box = require('./lib/box');
var Vector = require('./lib/vect');

var db = require('./data');

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
        var _stats = itm[6];
        res.push(_stats.stat_time);
        res.push(_stats.stat_dig);
        res.push(_stats.stat_atk);
        res.push(_stats.stat_life);
        res.push(_stats.stat_def);
        res.push(_stats.stat_item);
        res.push(_stats.stat_shld);
        res.push(_stats.stat_pop);
    }
    return res;
}

function ArrayToObject(a, b) {
    var c, d = b.length, e = {};
    for (c = 0; c < d; c++)
        e[b[c]] = a[c];
    return e
}

function secondsremaining(fechaFin) {
    var dif = Date.now() - fechaFin;
    var Segundos_de_T1_a_T2 = dif / 1000;
    var Segundos_entre_fechas = Math.abs(Segundos_de_T1_a_T2);
    return Segundos_entre_fechas;
}

// player
module.exports = class player {
    constructor(data) {
        var head_one_delay = 0, head_two_delay, body_one_delay, body_two_delay, eyes_one_delay, eyes_two_delay, flag_one_delay, flag_two_delay;
        var head_gold = 0, body_gold, eyes_gold, flag_gold;
        var head_scratch = 0, body_scratch, eyes_scratch, flag_scratch;
        var head_def = 0, body_def, eyes_def, flag_def;
        var head_regen = 0, body_regen, eyes_regen, flag_regen;
        var head_attack = 0, body_attack, eyes_attack, flag_attack;
        /* *====[validation of avatars]====* */
        if (parseInt(data.ahead) !== 0) {
            var state_player_head = getAvatar(parseInt(data.ahead));
            state_player_head = ArrayToObject(state_player_head, ["stat_time", "stat_dig", "stat_atk", "stat_life", "stat_def", "stat_item", "stat_shld", "stat_pop"]);
            head_one_delay = state_player_head.stat_time;
            head_two_delay = state_player_head.stat_item;
            head_gold = state_player_head.stat_pop;
            head_scratch = state_player_head.stat_dig;
            head_def = state_player_head.stat_def;
            head_regen = state_player_head.stat_shld;
            head_attack = state_player_head.stat_atk;
        } else {
            head_one_delay = 0;
            head_two_delay = 0;
            head_gold = 0;
            head_scratch = 0;
            head_def = 0;
            head_regen = 0;
            head_attack = 0;
        }
        //=====================================================================================
        if (parseInt(data.abody) !== 0) {
            var state_player_body = getAvatar(parseInt(data.abody));
            state_player_body = ArrayToObject(state_player_body, ["stat_time", "stat_dig", "stat_atk", "stat_life", "stat_def", "stat_item", "stat_shld", "stat_pop"]);
            body_one_delay = state_player_body.stat_time;
            body_two_delay = state_player_body.stat_item;
            body_gold = state_player_body.stat_pop;
            body_scratch = state_player_body.stat_dig;
            body_def = state_player_body.stat_def;
            body_regen = state_player_body.stat_shld;
            body_attack = state_player_body.stat_atk;
        } else {
            body_one_delay = 0;
            body_two_delay = 0;
            body_gold = 0;
            body_scratch = 0;
            body_def = 0;
            body_regen = 0;
            body_attack = 0;
        }
        //=====================================================================================
        if (parseInt(data.aeyes) !== 0) {
            var state_player_glass = getAvatar(parseInt(data.aeyes));
            state_player_glass = ArrayToObject(state_player_glass, ["stat_time", "stat_dig", "stat_atk", "stat_life", "stat_def", "stat_item", "stat_shld", "stat_pop"]);
            eyes_one_delay = state_player_glass.stat_time;
            eyes_two_delay = state_player_glass.stat_item;
            eyes_gold = state_player_glass.stat_pop;
            eyes_scratch = state_player_glass.stat_dig;
            eyes_def = state_player_glass.stat_def;
            eyes_regen = state_player_glass.stat_shld;
            eyes_attack = state_player_glass.stat_atk;
        } else {
            eyes_one_delay = 0;
            eyes_two_delay = 0;
            eyes_gold = 0;
            eyes_scratch = 0;
            eyes_def = 0;
            eyes_regen = 0;
            eyes_attack = 0;
        }
        //=====================================================================================
        if (parseInt(data.aflag) !== 0) {
            var state_player_flag = getAvatar(parseInt(data.aflag));
            state_player_flag = ArrayToObject(state_player_flag, ["stat_time", "stat_dig", "stat_atk", "stat_life", "stat_def", "stat_item", "stat_shld", "stat_pop"]);
            flag_one_delay = state_player_flag.stat_time;
            flag_two_delay = state_player_flag.stat_item;
            flag_gold = state_player_flag.stat_pop;
            flag_scratch = state_player_flag.stat_dig;
            flag_def = state_player_flag.stat_def;
            flag_regen = state_player_flag.stat_shld;
            flag_attack = state_player_flag.stat_atk;
        } else {
            flag_one_delay = 0;
            flag_two_delay = 0;
            flag_gold = 0;
            flag_scratch = 0;
            flag_def = 0;
            flag_regen = 0;
            flag_attack = 0;
        }
        /* *====[validation of avatars]====* */
        
        /* *====[power of avatars]====* */ // = parseInt();
        this.ava_delay_one = parseInt(head_one_delay + body_one_delay + eyes_one_delay + flag_one_delay);
        this.ava_delay_two = parseInt(head_two_delay + body_two_delay + eyes_two_delay + flag_two_delay);
        this.ava_gold = parseInt(head_gold + body_gold + eyes_gold + flag_gold);
        this.ava_scratch = parseInt(head_scratch + body_scratch + eyes_scratch + flag_scratch);
        this.ava_attack = parseInt(head_attack + body_attack + eyes_attack + flag_attack);
        this.check_my_ava = 0;
        /* *====[power of avatars]====* */
        
        this.hp = 1000;
        this.shield = parseInt(parseInt(head_def + body_def + eyes_def + flag_def) * 7) + 500;
        this.number = 0;
        this.location_type = 0;

        this.unlock = 14;
        this.event1 = 0;
        this.event2 = 0;
        this.name_changes = data.name_changes;
        this.power_user = data.power_user;
        
        this.tournament_server = data.tournament_server;
        this.tournament_start_time = data.tournament_start_time;
        this.tournament_end_time = data.tournament_end_time;
        this.tournament_start_time_server = data.tournament_start_time;//
        this.tournament_end_time_server = data.tournament_end_time;//
        this.tournament_gifts_users = data.tournament_gifts_users;
        this.tournament_state_server = data.tournament_state_server;
        this.tournament_check = data.tournament_check;
        
        if (this.tournament_start_time < Date.now()) {
            this.tournament_start_time = -1;
        } else {
            this.tournament_start_time = secondsremaining(this.tournament_start_time);
        }
        if (this.tournament_end_time < Date.now()) {
            this.tournament_end_time = -1;
        } else {
            this.tournament_end_time = secondsremaining(this.tournament_end_time);
        }
        //player { [Players: 7 = 4v4 Guilds ] - [Players: 8 - 4v4 Teams ] - [Players: 4 - 2v2 Couples (Boy+Girl Teams) ] - [Players: 3 - 2v2 Couples (Relationship Required) ] - [Players: 2 - 1v1 ] }
//start_time end_time players avatar_on max_wind force_mobile name total_games last_5_minutes_games rooms maps game_mode s1 tp save_personal save_guild min_points different_mobiles gifts gp_event
        this.tournament = [this.tournament_start_time, this.tournament_end_time, 2, 0, 0, 0, "", 0, 0, 0, [45], 0, 1, 0, 1, 0, -10, false, [
            {
                "name":"Ash (RARE) [Head+Body] / Trophy Gold (SRARE)",
                "position":[1],
                "avatar_id":[[3092, 3093],[8224]]
            },
            {
                "name":"Trophy Silver (SRARE)",
                "position":[2],
                /*"leader_only":true,*/
                "avatar_id":[[8225]]
            },
            {
                "name":"Lobo [Head+Body]",
                "position":[2, 4],
                /*"leader_only":true,*/
                "avatar_id":[[300, 301]]
            },
            {
                "name":"Trophy Bronze (SRARE)",
                "position":[3],
                "avatar_id":[[8226]]
            },
            {
                "name":"Blue Wings (SRARE)",
                "position":[5, 7],
                "avatar_id":[[3691]]
            },
            {
                "name":"Pikachu (RARE)",
                "position":[8, 15],
                "avatar_id":[[2768]]
            },
            {
                "name":"Charmander (RARE)",
                "position":[16, 20],
                "avatar_id":[[565]]
            },
            {
                "name":"Armor [Flag] / MiniPrix 2019 [Background]",
                "position":[1, 40],
                "avatar_id":[[2767],[2769]]
            }
        ], 200];
        
        this.plus10gp = data.plus10gp;
        this.mobile_fox = 0;
        this.mobile_bee = data.gm;/* ================ [MOBIL PARA GM & RANK SPECIAL] ================ */
        this.random_mobil = 0;
        
        this.saludo_bot = "";

        this.flowers = 0;
        this.is_bot = 0;
        this.mobile = Types.MOBILE.ARMOR;/*Poner El Mobil Que Quieres Que Salga Para Todos*/
        this.is_ready = 0;
        this.is_master = 0;
        this.is_alive = !0;
        this.look = 0;
        this.shield_regen = parseInt(head_regen + body_regen + eyes_regen + flag_regen) * 8;
        this.minang = 0;
        this.maxang = 90;
        this.lastturn = 0;
        this.delay = 0;
        this.team = 0;
        this.is_muted = false;
        this.lstAvatars = [];
        this.box = null;

        this.win_gold = 0;
        this.win_gp = 0;
        this.is_win = 0;
        this.is_loss = 0;


        this.channel_rango = 0;

        this.hasEnteredGame = false;
        this.room = null;
        this.position = 0;

        this.user_id = data.user_id;
        this.reg_id = data.reg_id;
        this.game_id = data.game_id;
        this.rank = data.rank;
        this.gp = data.gp;
        this.gold = data.gold;
        this.cash = data.cash;
        this.gender = data.gender;
        this.room_number = 0;
        this.photo_url = data.photo_url;
        this.ahead = data.ahead;
        this.abody = data.abody;
        this.aeyes = data.aeyes;
        this.aflag = data.aflag;
        this.abackground = data.abackground;
        this.aforeground = data.aforeground;
        this.guild_id = data.guild_id;
        this.guild = data.guild;
        this.guild_job = data.guild_job;
        //this.guild_members = data.guild_members;
        //this.user_friend = data.user_friend;
        this.gm = data.gm;
        this.is_muted = data.is_muted;
        this.country = data.country;
        this.punts_prix_user = data.punts_prix_user;
        this.gm_probability = data.gm_probability
        this.computer_ip = data.computer_ip;
        this.CashCharger = data.CashCharger;
        this.server_tournament_state = data.server_tournament_state;
        this.gifts_holiday = data.gifts_holiday;
        this.user_master_room = 0;
        this.x = 0;
        this.y = 0;
        this.body = 0;
        this.look = 0;
        this.ang = 0;

        this.damage_average = 0;

        this.win = data.win;
        this.loss = data.loss;
        this.win_rate = 100;
        var sumtotal = this.win + this.loss;
        if (sumtotal > 0)
            this.win_rate = Math.round(this.win * 100 / sumtotal);

        this.is_my_friend = 0;//Si son amigos los user's
        this.is_my_guild_mate = 0;
        
        this.item1 = -1;
        this.item2 = -1;
        this.item3 = -1;
        this.scores_lose = 0;

        this.megaphones = data.megaphones; //Cuentos MegaPhones Para Los Usuarios
        this.relationship_status = 's';
        this.relationship_with_id = 0;
        this.relationship_with_rank = 0;
        this.relationship_with_photo = '';
        this.relationship_with_name = '';
        this.relationship_with_gender = '';
        if (this.user_id === data.relation_yo) {
            this.relationship_status = data.relationship_status;
            this.relationship_with_id = data.relationship_with_id;
            this.relationship_with_rank = data.relation_rank;
            this.relationship_with_photo = data.relation_photo;
            this.relationship_with_name = data.relation_name;
            this.relationship_with_gender = data.relation_gender;
        }
        this.Server_Id = data.Server_Id;
        this.historychat = data.historychat;
        this.gameserverevent = data.gameserverevent;
        this.time_event_unix = data.evento_time_unix;
        this.TipEvent = data.TipEvent;
        this.maps_pack = data.maps_pack;
        this.guids_points = data.guild_points;
        this.guild_score = 0;
        this.screenshot = [];
        this.code_screenshot_random = "";
    }

    move() {
        var self = this;
        var xf = self.x; // + 21;
        var yf = self.y; // + 37;
        if (self.box === null) {
            self.box = new Box(new Vector(xf, yf), 36, 40, 0);
        } else {
            self.box.setp(new Vector(xf, yf));
            //self.box.rotate(0);
        }
    }

    setShield(a) {
        this.shield = a;
    }

    disHpShield(hp, sh) {
        this.hp = this.hp - hp;
        this.shield = this.shield - sh;
    }

    setAlive(alive) {
        var self = this;
        self.is_alive = alive;
    }

    addWinGoldWinGp(win_gold, win_gp) {
        this.win_gold = parseInt(win_gold);//Aquí se guarda los Gold que se hacen dentro de la partida
        this.win_gp = parseInt(win_gp);//Aquí se guarda los GP's que se hacen dentro de la partida
    }

    reloadHp() {
        var self = this;
        self.hp = 1500;
        self.shield = self.shield;
        self.is_alive = 1;
        self.delay = 0;
        self.win_gp = 0;
        self.win_gold = 0;
        self.is_win = 0;
        self.is_loss = 0;
    }

    addDelay(delay) {
        var self = this;
        self.delay = self.delay + delay;
    }

    update() {
        var self = this;
        self.move();
    }
};