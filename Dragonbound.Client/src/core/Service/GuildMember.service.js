import GuildMemberRepository from "../Repository/GuildMember.repository";

class GuildMemberService{
    repo = new GuildMemberRepository();

    async findById(id){
        return this.repo.findById(id);
    }
}

export default GuildMemberService;