import ServerData from "../Network/data/ServerData";
import Server from "../Model/Server";

class ServerRepository{
    findAll(){
        return ServerData.map(server => Server.fromHashMap(server));
    }
};

export default ServerRepository;