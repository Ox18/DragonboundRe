module.exports = class UserAvatarEL{
    constructor(Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time){
        if (Id === void 0) { Id = 0; }
        if (UserId === void 0) { UserId = 0; }
        if (aId === void 0) { aId = 0; }
        if (type === void 0) { type = 0; }
        if (expire === void 0) { expire = Date.now(); }
        if (is_cash === void 0) { is_cash = 0; }
        if (is_gift === void 0) { is_gift = 0; }
        if (amount === void 0) { amount = 0; }
        if (expire_time === void 0) { expire = BigInt(0); }
        this.Id = Id;
        this.UserId = UserId;
        this.aId = aId;
        this.type = type;
        this.expire = expire;
        this.is_cash = is_cash;
        this.is_gift = is_gift;
        this.amount = amount;
        this.expire_time = expire_time;
    }
}