import PrixUserRepository from "../Repository/PrixUser.repository";

class PrixUserService{
    repo = new PrixUserRepository();

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

export default PrixUserService;