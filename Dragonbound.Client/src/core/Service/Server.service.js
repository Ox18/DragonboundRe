import ServerRepository from "../Repository/Server.repository";

class ServerService{
    repo = new ServerRepository();

    async findAll(){
        return this.repo.findAll();
    }

    async findByQuery(querys){
        return this.repo.findByQuery(querys);
    }

    async findById(id){
        return this.repo.findById(id);
    }
}

export default ServerService;