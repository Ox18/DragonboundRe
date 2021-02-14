// eslint-disable-next-line no-undef
module.exports = class User {
    constructor(Id, game_id, rank, gp, gold, cash, gender, unlock, photo_url, name_changes, power_user, plus10gp, mobile_fox, country, flowers, map_pack, megaphones, is_mute, win, loss, gm, IdAcc, bg_url) {
        if (Id === void 0) { Id = 0; }
        if (game_id === void 0) { game_id = ""; }
        if (rank === void 0) { rank = 0; }
        if (gp === void 0) { gp = 0; }
        if (gold === void 0) { gold = 0; }
        if (cash === void 0) { cash = 0; }
        if (gender === void 0) { gender = "m"; }
        if (unlock === void 0) { unlock = 0; }
        if (photo_url === void 0) { photo_url = ""; }
        if (name_changes === void 0) { name_changes = 0; }
        if (power_user === void 0) { power_user = 0; }
        if (plus10gp === void 0) { plus10gp = 0; }
        if (mobile_fox === void 0) { mobile_fox = 0; }
        if (country === void 0) { country = "PE"; }
        if (flowers === void 0) { flowers = 0; }
        if (map_pack === void 0) { map_pack = 0; }
        if (megaphones === void 0) { megaphones = 0; }
        if (is_mute === void 0) { is_mute = 0; }
        if (win === void 0) { win = 0; }
        if (loss === void 0) { loss = 0; }
        if (gm === void 0) { gm = 0; }
        if (IdAcc === void 0) { IdAcc = 0; }
        if (bg_url === void 0) { bg_url = ""; }
        this.Id = Id;
        this.game_id = game_id;
        this.rank = rank;
        this.gp = gp;
        this.gold = gold;
        this.cash = cash;
        this.gender = gender;
        this.unlock = unlock;
        this.photo_url = photo_url;
        this.name_changes = name_changes;
        this.power_user = power_user;
        this.plus10gp = plus10gp;
        this.mobile_fox = mobile_fox;
        this.country = country;
        this.flowers = flowers;
        this.map_pack = map_pack;
        this.megaphones = megaphones;
        this.is_mute = is_mute;
        this.win = win;
        this.loss = loss;
        this.gm = gm;
        this.IdAcc = IdAcc;
        this.bg_url = bg_url;
        this.total = win + loss;
        this.rate = Math.round(win * 100 / this.total);
    }
}
