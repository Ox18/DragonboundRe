import GuildRepository from "../Repository/Guild.repository";

class GuildService{
    repo = new GuildRepository();

    async findById(id){
        return this.repo.findById(id);
    }
}

export default GuildService;