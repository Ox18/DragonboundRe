import ServerRepository from "../Repository/Server.repository";

class ServerService{
    repo = new ServerRepository();

    async findAll(){
        return this.repo.findAll();
    }
}

export default ServerService;