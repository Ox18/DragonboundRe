
module.exports = class GuildMemberEL{
    constructor(Id, UserId, Job){
        if (Id === void 0) { Id = 0; }
        if (UserId === void 0) { UserId = 0; }
        if (Job === void 0) { Job = 0; }
        this.Id = Id;
        this.UserId = UserId;
        this.Job = Job;
    }
}