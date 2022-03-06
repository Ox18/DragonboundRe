import GuildMemberRepository from "../Repository/GuildMember.repository";

class GuildMemberService{
    repo = new GuildMemberRepository();

    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(params){
        return this.repo.findByQuery(params);
    }

    async findByUserId(userId){
        return this.repo.findByUserId(userId);
    }
}

export default GuildMemberService;