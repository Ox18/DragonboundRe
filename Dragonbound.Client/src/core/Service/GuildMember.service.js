import GuildMemberRepository from "../Repository/GuildMember.repository";

class GuildMemberService{
    repo = new GuildMemberRepository();

    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(querys){
        return this.repo.findByQuery(querys);
    }

    async findByUserId(userId){
        return this.repo.findByUserId(userId);
    }
}

export default GuildMemberService;