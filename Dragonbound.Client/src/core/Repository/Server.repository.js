import ServerData from "../Network/data/ServerData";

class ServerRepository{
    findAll(){
        return ServerData;
    }
};

export default ServerRepository;