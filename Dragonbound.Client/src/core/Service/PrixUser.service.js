import PrixUserRepository from "../Repository/PrixUser.repository";

class PrixUserService{
    repo = new PrixUserRepository();

    async findById(id){
        return this.repo.findById(id);
    }
}

export default PrixUserService;