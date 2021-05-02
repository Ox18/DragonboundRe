var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Box = require('./lib/box');
var Vector = require('./lib/vect');

// player
module.exports = class player {
    constructor(data) {
        this.hp = 1000;
        this.shield = 500;
        this.number = 0;
        this.location_type = 0;

        this.unlock = 14;
        this.event1 = 0;
        this.event2 = 0;
        this.name_changes = 0;
        this.power_user = 0;
        this.tournament = 0;
        this.plus10gp = 0;
        this.mobile_fox = 0;

        this.flowers = 0;
        this.is_bot = 0;
        this.mobile = Types.MOBILE.ARMOR;
        this.is_ready = 0;
        this.is_master = 0;
        this.is_alive = !0;
        this.look = 0;
        this.shield_regen = 0;
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
        this.room_number = data.room_number;
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
        this.guild_members = data.guild_members;
        this.gm = data.gm;
        this.is_muted = data.is_muted;
        this.country = data.country;

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

        this.is_my_friend = 0;
        this.is_my_guild_mate = 0;

        this.megaphones = 1;
        this.relationship_status = 's';
        this.relationship_with_id = 0;
        this.relationship_with_rank = 0;
        this.relationship_with_photo = '';
        this.relationship_with_name = '';
        this.relationship_with_gender = '';
        if (this.user_id === 1) {
            this.relationship_status = 'm';
            this.relationship_with_id = 850;
            this.relationship_with_rank = 26;
            this.relationship_with_photo = 'http://image.prntscr.com/image/ed024f398bf14facbfac8bf0340e5c7b.jpg';
            this.relationship_with_name = 'Yabi';
            this.relationship_with_gender = 'f';
        } else if (this.user_id === 850) {
            this.relationship_status = 'm';
            this.relationship_with_id = 1;
            this.relationship_with_rank = 27;
            this.relationship_with_photo = 'http://i.imgur.com/WKLv6jI.jpg';
            this.relationship_with_name = 'Dev';
            this.relationship_with_gender = 'fm';
        } else if (this.user_id === 36) {
            this.relationship_status = 'm';
            this.relationship_with_id = 2;
            this.relationship_with_rank = 27;
            this.relationship_with_photo = 'http://i.imgur.com/rDvaR5P.png';
            this.relationship_with_name = 'Betax';
            this.relationship_with_gender = 'm';
        } else if (this.user_id === 2) {
            this.relationship_status = 'm';
            this.relationship_with_id = 36;
            this.relationship_with_rank = 12;
            this.relationship_with_photo = 'http://i.imgur.com/LpEEVkG.gif';
            this.relationship_with_name = 'Frostwhisper';
            this.relationship_with_gender = 'm';
        }
        this.maps_pack = 0;
        this.guild_score = 0;
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
        this.win_gold = parseInt(this.win_gold + win_gold);
        this.win_gp = parseInt(this.win_gp + win_gp);
    }

    reloadHp() {
        var self = this;
        self.hp = 1500;
        self.shield = 500;
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