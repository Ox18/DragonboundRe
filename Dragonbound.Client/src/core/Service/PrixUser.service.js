import PrixUserRepository from "../Repository/PrixUser.repository";

class PrixUserService{
    repo = new PrixUserRepository();

    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(querys){
        return this.repo.findByQuery(querys);
    }
}

export default PrixUserService;