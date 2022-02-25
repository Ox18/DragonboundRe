import ServerRepository from "../Repository/ServerRepository";

class ServerService{
    repo = new ServerRepository();

    async findAll(){
        return this.repo.findAll();
    }
}

export default ServerService;