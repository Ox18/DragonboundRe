import GuildRepository from "../Repository/Guild.repository";

class GuildService{
    repo = new GuildRepository();

    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(params){
        return this.repo.findByQuery(params);
    }
}

export default GuildService;