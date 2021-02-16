
module.exports = class GuildEL{
    constructor(Id, Name){
        if (Id === void 0) { Id = 0; }
        if (Name === void 0) { Name = ""}
        this.Id = Id;
        this.Name = Name;
    }
}